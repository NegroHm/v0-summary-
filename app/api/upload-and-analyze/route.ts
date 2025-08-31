import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import crypto from 'crypto';

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

// In-memory storage for uploaded files (in production, use a database)
declare global {
  var fileStorage: { [key: string]: { files: { [fileId: string]: any }, chatHistory: any[] } } | undefined;
}

if (!global.fileStorage) {
  global.fileStorage = {};
}

export async function POST(request: NextRequest) {
  try {
    if (!apiKey) {
      console.error('GOOGLE_API_KEY not configured in upload route');
      return NextResponse.json({ error: 'API key de Gemini no configurada. Revisa tu archivo .env.local' }, { status: 500 });
    }
    
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const existingSessionId = formData.get('sessionId') as string;
    
    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No se han subido archivos.' }, { status: 400 });
    }

    // Use existing session ID or generate new one
    let sessionId = existingSessionId;
    if (!sessionId) {
      // No session provided, create new one
      sessionId = crypto.randomBytes(16).toString('hex');
      global.fileStorage![sessionId] = { files: {}, chatHistory: [] };
    } else {
      // Session provided, check if it exists
      if (!global.fileStorage![sessionId]) {
        // Session doesn't exist, create it
        global.fileStorage![sessionId] = { files: {}, chatHistory: [] };
      }
      // If session exists, we'll add to it
    }
    
    console.log('Using session:', { sessionId, isNewSession: !existingSessionId, existingFileCount: Object.keys(global.fileStorage![sessionId].files).length });

    const processedFilesPromises = files.map(async (file) => {
      const fileId = crypto.randomBytes(8).toString('hex');
      
      // Check file size (limit to 10MB)
      if (file.size > 10 * 1024 * 1024) {
        console.log(`File ${file.name} is too large: ${file.size} bytes`);
        return null;
      }
      
      const buffer = Buffer.from(await file.arrayBuffer());
      let fileContent: string | Buffer, initialPrompt: any, isImage = false;

      if (file.type.startsWith('image/')) {
        isImage = true;
        fileContent = buffer.toString('base64');
        console.log('Processing image:', { name: file.name, type: file.type, size: buffer.length });
        initialPrompt = [
          "Genera 5 hashtags relevantes en español sobre esta imagen, separados por comas. Responde únicamente con los hashtags.",
          { inlineData: { data: fileContent, mimeType: file.type } }
        ];
      } else if (file.type === 'application/pdf') {
        // Send PDF directly to Gemini as base64 - Gemini can read PDFs natively
        isImage = false;
        fileContent = buffer.toString('base64');
        initialPrompt = [
          "Genera 5 hashtags relevantes en español sobre el contenido de este documento PDF, separados por comas. Responde únicamente con los hashtags.",
          { inlineData: { data: fileContent, mimeType: file.type } }
        ];
      } else {
        console.log(`Unsupported file type: ${file.type} for file: ${file.name}`);
        return null;
      }

      let hashtags: string[] = [];
      try {
        const result = await model.generateContent(initialPrompt);
        const responseText = result.response.text();
        hashtags = responseText ? responseText.trim().split(',').map(h => h.trim().replace(/^#/, '')) : [];
        console.log(`Generated hashtags for ${file.name}:`, hashtags);
      } catch (hashtagError) {
        console.error(`Error generating hashtags for ${file.name}:`, hashtagError);
        hashtags = ['documento', 'archivo'];
      }
      
      global.fileStorage![sessionId].files[fileId] = { 
        originalname: file.name, 
        isImage, 
        fileContent,
        mimeType: file.type,
        hashtags: hashtags,
        uploadTime: new Date().toISOString()
      };
      
      return { id: fileId, name: file.name, hashtags };
    });

    const newFiles = (await Promise.all(processedFilesPromises)).filter(f => f !== null);
    
    // Return all files in the session with their stored hashtags
    const allFiles = Object.entries(global.fileStorage![sessionId].files).map(([fileId, file]) => ({
      id: fileId,
      name: file.originalname,
      hashtags: file.hashtags || []
    }));
    
    return NextResponse.json({ 
      files: allFiles, 
      newFiles: newFiles,
      sessionId,
      totalFilesInSession: Object.keys(global.fileStorage![sessionId].files).length
    });

  } catch (error) {
    console.error('Error en el análisis inicial:', error);
    
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      if (error.message.includes('API_KEY')) {
        return NextResponse.json({ error: 'API key de Gemini inválida o no configurada correctamente.' }, { status: 500 });
      }
      if (error.message.includes('quota') || error.message.includes('limit')) {
        return NextResponse.json({ error: 'Has excedido el límite de la API de Gemini. Intenta más tarde.' }, { status: 429 });
      }
    }
    
    return NextResponse.json({ 
      error: 'Error durante el análisis de los archivos: ' + (error instanceof Error ? error.message : 'Error desconocido')
    }, { status: 500 });
  }
}