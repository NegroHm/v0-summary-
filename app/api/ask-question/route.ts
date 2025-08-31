import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
  console.error('GOOGLE_API_KEY is not set in environment variables');
}

const genAI = new GoogleGenerativeAI(apiKey || '');
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  },
});

// Access the same storage as upload route (in production, use a database)
declare global {
  var fileStorage: { [key: string]: { files: { [fileId: string]: any }, chatHistory: any[] } } | undefined;
}

// Initialize storage if not exists
if (!global.fileStorage) {
  global.fileStorage = {};
}

export async function POST(request: NextRequest) {
  try {
    const { question, selectedFileIds, sessionId } = await request.json();
    
    console.log('API request received:', { 
      hasQuestion: !!question, 
      selectedFileIds, 
      sessionId,
      storageExists: !!global.fileStorage,
      hasApiKey: !!apiKey 
    });
    
    if (!apiKey) {
      console.error('GOOGLE_API_KEY not configured');
      return NextResponse.json({ error: 'API key de Gemini no configurada. Revisa tu archivo .env.local' }, { status: 500 });
    }
    
    if (!question || !selectedFileIds || selectedFileIds.length === 0) {
      console.error('Missing required data:', { question: !!question, selectedFileIds, sessionId });
      return NextResponse.json({ error: 'Faltan datos: pregunta o archivos seleccionados.' }, { status: 400 });
    }

    const session = global.fileStorage![sessionId];
    if (!session) {
      console.error('Session not found:', { sessionId, availableSessions: Object.keys(global.fileStorage || {}) });
      return NextResponse.json({ error: 'Sesión no encontrada. Por favor, sube los archivos de nuevo.' }, { status: 404 });
    }
    
    console.log('Session found:', { 
      sessionId, 
      filesInSession: Object.keys(session.files).length,
      selectedFileIds: selectedFileIds,
      chatHistoryLength: session.chatHistory.length 
    });

    let context = "";
    const imageParts: any[] = [];
    const fileDescriptions: string[] = [];

    selectedFileIds.forEach((fileId: string) => {
      const file = session.files[fileId];
      if (file) {
        console.log('Processing file:', { 
          fileId, 
          fileName: file.originalname, 
          isImage: file.isImage, 
          mimeType: file.mimeType,
          hasContent: !!file.fileContent
        });
        if (file.isImage) {
          // For images, add them as media parts and describe in context
          const imageMimeType = file.mimeType || 'image/jpeg';
          imageParts.push({ inlineData: { data: file.fileContent, mimeType: imageMimeType } });
          fileDescriptions.push(`- ${file.originalname}: Imagen adjunta que puedes ver y analizar`);
        } else if (file.mimeType === 'application/pdf') {
          // For PDFs, add them as media parts and describe in context
          imageParts.push({ inlineData: { data: file.fileContent, mimeType: 'application/pdf' } });
          fileDescriptions.push(`- ${file.originalname}: Documento PDF adjunto que puedes leer`);
        } else {
          // For text files, include content directly
          context += `\n\n--- ARCHIVO: ${file.originalname} ---\n`;
          context += `${file.fileContent.substring(0, 4000)}\n`;
          context += `--- FIN DE ${file.originalname} ---\n\n`;
          fileDescriptions.push(`- ${file.originalname}: Archivo de texto incluido en el contexto`);
        }
      } else {
        console.error('File not found in session:', { 
          fileId, 
          sessionId, 
          availableFiles: Object.keys(session.files) 
        });
      }
    });

    if (fileDescriptions.length > 0) {
      context = `Archivos disponibles para análisis:\n${fileDescriptions.join('\n')}\n\n${context}`;
    }

    const searchWeb = question.toLowerCase().includes('busca en la web');
    const hasImages = imageParts.some(part => part.inlineData?.mimeType?.startsWith('image'));
    const hasPDFs = imageParts.some(part => part.inlineData?.mimeType === 'application/pdf');
    
    let baseInstruction = searchWeb ? 
      "Responde la siguiente pregunta del usuario. Puedes usar tu conocimiento general. " : 
      "Responde la siguiente pregunta del usuario basándote en el contenido de los archivos proporcionados. ";
    
    if (hasImages && hasPDFs) {
      baseInstruction += "IMPORTANTE: Puedes ver y analizar imágenes, así como leer documentos PDF. Todos los archivos están disponibles para tu análisis. ";
    } else if (hasImages) {
      baseInstruction += "IMPORTANTE: Puedes ver y analizar las imágenes proporcionadas. ";
    } else if (hasPDFs) {
      baseInstruction += "IMPORTANTE: Puedes leer y analizar los documentos PDF proporcionados. ";
    }
    
    baseInstruction += "Si te preguntan sobre un archivo específico, analiza ese archivo directamente. ";
    
    const chat = model.startChat({ 
      history: session.chatHistory.map(turn => ({ 
        role: turn.role, 
        parts: [{ text: turn.content }] 
      })) 
    });
    
    let prompt = `${baseInstruction}\n\n${context}\n\nPregunta del usuario: "${question}"`;
    
    // Add explicit instructions based on content types
    if (hasImages && hasPDFs) {
      prompt += `\n\nNOTA: Tienes imágenes y PDFs adjuntos en este mensaje. Puedes verlos y analizarlos directamente.`;
    } else if (hasImages) {
      prompt += `\n\nNOTA: Tienes imágenes adjuntas en este mensaje que puedes ver y analizar.`;
    } else if (hasPDFs) {
      prompt += `\n\nNOTA: Tienes documentos PDF adjuntos en este mensaje que puedes leer.`;
    }
    
    console.log('Processing question with files:', { 
      question, 
      selectedFileCount: selectedFileIds.length,
      sessionId,
      imagePartsCount: imageParts.length,
      hasImages,
      hasPDFs,
      contextLength: context.length
    });
    
    // Create the message parts - always include the text prompt, plus any image/PDF parts
    const messageParts = [{ text: prompt }, ...imageParts];
    
    console.log('Sending to Gemini:', {
      promptLength: prompt.length,
      messagePartsCount: messageParts.length,
      imagePartsCount: imageParts.length
    });
    
    const result = await chat.sendMessage(messageParts);
    const answer = result.response.text();

    session.chatHistory.push({ role: 'user', content: question });
    session.chatHistory.push({ role: 'model', content: answer });

    return NextResponse.json({ answer });
    
  } catch (error) {
    console.error('Error en el chat:', error);
    
    // More detailed error logging
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Stack:', error.stack);
    }
    
    return NextResponse.json({ 
      error: 'Error al procesar la pregunta: ' + (error instanceof Error ? error.message : 'Error desconocido') 
    }, { status: 500 });
  }
}
