# Gemini AI File Analysis Setup

This dashboard now includes Google Gemini AI integration for analyzing uploaded files and answering questions about their content.

## Setup Instructions

1. **Get a Google Gemini API Key:**
   - Visit: https://makersuite.google.com/app/apikey
   - Sign in with your Google account
   - Create a new API key

2. **Add the API Key:**
   - Edit the `.env.local` file in the project root
   - Replace `your_api_key_here` with your actual API key:
     ```
     GOOGLE_API_KEY=your_actual_api_key_here
     ```

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```

## Features

### File Upload & Analysis
- **Supported Files:** Images (JPG, PNG, etc.) and PDFs
- **Upload Methods:** Drag & drop or click to browse
- **Auto Analysis:** Files are automatically analyzed by Gemini AI to generate relevant hashtags
- **File Selection:** Click on uploaded files to select/deselect them for context

### Chat Interface
- **Context-Aware:** Questions are answered based on selected files
- **Multi-Modal:** Supports both text (PDF) and image analysis
- **Chat History:** Maintains conversation history for the session
- **Fallback:** If no files are selected, uses contextual responses

### How to Use

1. **Upload Files:**
   - Drag and drop or click "Browse Files" in the left sidebar
   - Wait for analysis to complete (hashtags will appear)

2. **Select Files for Context:**
   - Click on uploaded files to select/deselect them
   - Selected files (highlighted in blue) will be used as context

3. **Ask Questions:**
   - Type your question in the chat input
   - Questions will be answered based on the content of selected files
   - For general questions, add "busca en la web" to use general knowledge

## Technical Implementation

- **Frontend:** Next.js 15 with React 19
- **UI:** Tailwind CSS with shadcn/ui components
- **AI Model:** Google Gemini 1.5 Flash
- **File Processing:** Multer for uploads, pdf-parse for PDFs
- **Storage:** In-memory (for development)

## Notes

- Files are stored in memory during development - they'll be lost on server restart
- For production, consider using a database for file storage
- The Google login functionality has been removed as requested
- Session management is basic - consider implementing proper session storage for production

## Troubleshooting

- **"Error uploading files":** Check that your API key is set correctly in `.env.local`
- **"Session not found":** The server may have restarted, try uploading files again
- **No response from AI:** Ensure at least one file is selected and the API key is valid