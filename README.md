# University Study Platform

An intelligent study companion platform for university students featuring AI-powered document analysis, ranking systems, and comprehensive study tools.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/apuntesuda-4220s-projects/v0-sumarry)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/KfOcsmMZfQT)

## 🚀 Features

### 🤖 AI-Powered Document Analysis
- **Multi-Modal AI**: Upload PDFs and images for intelligent analysis using Google Gemini AI
- **Smart Summaries**: Generate comprehensive summaries from your study materials
- **Practice Exams**: Create custom exams based on your uploaded content
- **Contextual Q&A**: Ask questions about your documents and get detailed answers
- **Study Maps**: Visual concept mapping for better understanding (Pro feature)

### 📊 Student Rankings & Competition
- **Three-Level Rankings**: National, State, and University level competitions
- **Real-Time Leaderboards**: Track your progress against peers
- **Study Statistics**: Monitor hours studied, exams taken, and notes uploaded
- **Progress Tracking**: Daily and weekly study goals with visual progress indicators

### 💎 Pro Subscription Features
- **Unlimited Conversations**: No daily limits on AI interactions
- **Advanced Study Maps**: Visual concept mapping tools
- **Priority Support**: Enhanced customer support
- **Pro User Badges**: Special visual indicators and golden avatars

### 📱 Mobile-First Design
- **Responsive Layout**: Optimized for all screen sizes
- **Touch-Friendly Interface**: Mobile navigation with collapsible sidebars
- **Progressive Enhancement**: Desktop features available on larger screens

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI with shadcn/ui
- **AI Integration**: Google Gemini 1.5 Flash
- **File Processing**: Multer for uploads, pdf-parse for text extraction
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics

## 🏗️ Project Structure

```
├── app/
│   ├── api/                    # API routes
│   │   ├── ask-question/       # Gemini AI Q&A endpoint
│   │   └── upload-and-analyze/ # File upload and analysis
│   ├── dashboard/              # Main dashboard page
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Landing page
├── components/
│   ├── dashboard/             # Dashboard-specific components
│   │   ├── chat-interface.tsx  # AI chat interface
│   │   ├── left-sidebar.tsx    # File upload sidebar
│   │   └── right-sidebar.tsx   # Stats and rankings
│   ├── ranking/               # Student ranking system
│   ├── subscription/          # Pro upgrade modals
│   ├── ui/                    # Reusable UI components
│   └── user/                  # User profile components
├── lib/
│   ├── subscription-context.tsx # Pro subscription state
│   ├── user-context.tsx       # User data management
│   ├── types.ts               # TypeScript definitions
│   └── utils.ts               # Utility functions
└── public/                    # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm
- Google Gemini API key (for AI features)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd v0-summary-
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables:**
   
   Create a `.env.local` file in the project root:
   ```env
   GOOGLE_API_KEY=your_gemini_api_key_here
   ```

   To get a Google Gemini API key:
   - Visit: https://makersuite.google.com/app/apikey
   - Sign in with your Google account
   - Create a new API key

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 How to Use

### File Upload & AI Analysis

1. **Upload Documents:**
   - Use the left sidebar to drag & drop or browse for files
   - Supported formats: PDFs, JPG, PNG, and other images
   - Files are automatically analyzed by AI to generate relevant hashtags

2. **Select Files for Context:**
   - Click on uploaded files to select/deselect them
   - Selected files (highlighted in blue) provide context for AI conversations

3. **Ask Questions:**
   - Type questions in the chat interface
   - AI will answer based on your selected documents
   - Generate summaries, create practice exams, or get explanations

### Study Features

1. **Rankings:**
   - View your position in National, State, and University rankings
   - Compete with other students in your region
   - Track study statistics and progress

2. **Pro Features:**
   - Upgrade for unlimited AI conversations
   - Access advanced study mapping tools
   - Get priority support and exclusive features

### Mobile Usage

- Tap the navigation buttons to toggle sidebars
- Optimized touch interface for mobile study sessions
- Responsive design maintains functionality across all devices

## 🏆 Study System

### Ranking Levels
- **National**: Complete against students nationwide
- **State/Province**: Regional competition within your area
- **University**: Campus-specific leaderboards

### Point System
- **Daily Goals**: 50 points per day
- **Weekly Goals**: 350 points per week
- **Activities**: Points earned through study sessions, document uploads, and AI interactions

### Pro Subscription ($10/month)
- Unlimited AI conversations
- Advanced study mapping tools
- Priority customer support
- Exclusive Pro user badges

## 🔧 API Endpoints

### `/api/upload-and-analyze`
- **Method**: POST
- **Purpose**: Upload files and get AI analysis with hashtags
- **Returns**: Session ID and analyzed file data

### `/api/ask-question`
- **Method**: POST
- **Purpose**: Ask questions about uploaded documents
- **Body**: `{ question, selectedFileIds, sessionId }`
- **Returns**: AI-generated answer based on document context

## 🎨 Customization

### Themes
- Built-in dark/light mode support
- Customizable via Tailwind CSS variables
- Responsive design system with mobile-first approach

### UI Components
- All components built with Radix UI primitives
- Styled using shadcn/ui component library
- Consistent design system throughout the application

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository:**
   - Import your repository to Vercel
   - Configure environment variables in Vercel dashboard

2. **Environment Variables:**
   ```env
   GOOGLE_API_KEY=your_gemini_api_key_here
   ```

3. **Deploy:**
   - Vercel will automatically build and deploy
   - Updates push automatically from the main branch

### Manual Deployment

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Start production server:**
   ```bash
   npm start
   ```

## 🔍 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style
- TypeScript for type safety
- Functional React components with hooks
- Tailwind CSS for styling
- ESLint for code quality

## 📝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## ⚠️ Important Notes

### Development Limitations
- **File Storage**: Files are stored in memory during development
- **Session Management**: Basic session handling for development purposes
- **AI Limits**: Dependent on Google Gemini API quotas and limits

### Production Considerations
- Implement persistent file storage (database/cloud storage)
- Add proper session management and user authentication
- Consider implementing rate limiting for AI API calls
- Add comprehensive error handling and logging

## 🆘 Troubleshooting

### Common Issues

**Styles not loading:**
- Restart the development server: `npm run dev`
- Clear browser cache and hard refresh

**AI not responding:**
- Verify `GOOGLE_API_KEY` is set in `.env.local`
- Ensure at least one file is selected for context
- Check the browser console for error messages

**File upload failing:**
- Check API key configuration
- Verify file format is supported (PDF, JPG, PNG)
- Try uploading smaller files (< 10MB recommended)

**Mobile layout issues:**
- Clear browser cache
- Ensure latest browser version
- Check responsive breakpoints in developer tools

## 📄 License

This project is created using v0.app and is subject to its terms of service.

## 🔗 Links

- **Live Demo**: [Vercel Deployment](https://vercel.com/apuntesuda-4220s-projects/v0-sumarry)
- **v0 Project**: [Continue Building](https://v0.app/chat/projects/KfOcsmMZfQT)
- **Google Gemini AI**: [Get API Key](https://makersuite.google.com/app/apikey)

---

*Built with ❤️ using v0.app, Next.js, and Google Gemini AI*