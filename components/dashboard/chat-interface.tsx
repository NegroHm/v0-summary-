"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Brain, FileText, Map, Search, Loader2, BookOpen, Target, Lightbulb, Lock, Crown } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { StudyMapSimulator } from "@/components/study-map-simulator"
import { useSubscription } from "@/lib/subscription-context"
import { ProUpgradeModal } from "@/components/subscription/pro-upgrade-modal"

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
  isTyping?: boolean
  messageType?: "text" | "summary" | "exam" | "study-tip" | "encouragement"
}

interface ChatContext {
  currentSubject?: string
  recentTopics: string[]
  studyGoals: string[]
  lastAction?: string
}

const aiResponses = {
  summary: [
    "I'll help you generate a comprehensive summary. Please upload a document or paste your notes, and I'll create a concise overview highlighting the key concepts and main points.",
    "Perfect! I can create different types of summaries - bullet points, paragraph form, or concept maps. What format would work best for your study style?",
    "Great choice! I'll analyze your content and create a structured summary that focuses on the most important concepts and their relationships.",
  ],
  exam: [
    "Let's create a practice exam! I can generate multiple choice, short answer, or essay questions. What subject and difficulty level are you targeting?",
    "Excellent! I'll create questions that test both your understanding and application of concepts. Would you like me to focus on any specific topics or chapters?",
    "I'll design a comprehensive practice test that mirrors real exam conditions. This will help you identify knowledge gaps and build confidence.",
  ],
  map: [
    "I can create a visual study map to help you see connections between concepts. This is perfect for understanding complex relationships and preparing for comprehensive exams.",
    "Study maps are excellent for visual learners! I'll organize your content into interconnected nodes showing how different concepts relate to each other.",
    "Let me build a concept map that shows the hierarchical structure of your subject matter, making it easier to understand and remember.",
  ],
  search: [
    "I'm ready to search through all your uploaded notes and documents. Just tell me what specific information, concept, or topic you're looking for.",
    "My search goes beyond keywords - I understand context and can find related concepts even if they use different terminology. What would you like to find?",
    "I can help you locate specific information across all your study materials. What topic or concept are you trying to review?",
  ],
  studyTips: [
    "Here's a proven study technique: Use the Pomodoro method - study for 25 minutes, then take a 5-minute break. This helps maintain focus and retention.",
    "Try active recall: Instead of just re-reading notes, test yourself by covering sections and trying to remember the content. This strengthens memory pathways.",
    "Create connections between new information and what you already know. The brain remembers information better when it's linked to existing knowledge.",
    "Use spaced repetition: Review material at increasing intervals (1 day, 3 days, 1 week, 2 weeks). This optimizes long-term retention.",
  ],
  encouragement: [
    "You're making great progress! Consistent study habits like yours lead to academic success. Keep up the excellent work!",
    "Remember, every expert was once a beginner. Your dedication to learning is admirable and will pay off in your academic journey.",
    "I can see you're putting in serious effort. That persistence and commitment to learning will serve you well beyond your studies.",
    "Your study streak shows real dedication! This kind of consistency is what separates successful students from the rest.",
  ],
}

const subjectKeywords = {
  biology: ["biology", "cell", "dna", "organism", "evolution", "genetics", "anatomy"],
  chemistry: ["chemistry", "molecule", "atom", "reaction", "compound", "element", "bond"],
  physics: ["physics", "force", "energy", "motion", "wave", "particle", "quantum"],
  mathematics: ["math", "equation", "formula", "calculus", "algebra", "geometry", "statistics"],
  history: ["history", "war", "revolution", "empire", "civilization", "culture", "timeline"],
  literature: ["literature", "novel", "poem", "author", "character", "theme", "analysis"],
}

export function ChatInterface() {
  const { isPro, showUpgradeModal, setShowUpgradeModal, upgradeToPro } = useSubscription()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: isPro 
        ? "Hello! Welcome back, Pro member. I'm ready to help with unlimited conversations and advanced features!"
        : "Hello! I'm your AI study assistant. You have 3 free conversations today. Upgrade to Pro for unlimited access to Study Maps and AI conversations!",
      isUser: false,
      timestamp: new Date(),
      messageType: "text",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [chatContext, setChatContext] = useState<ChatContext>({
    recentTopics: [],
    studyGoals: [],
  })
  const [conversationsLeft, setConversationsLeft] = useState(isPro ? Infinity : 3)
  const [showStudyMap, setShowStudyMap] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const detectSubject = (text: string): string | undefined => {
    const lowerText = text.toLowerCase()
    for (const [subject, keywords] of Object.entries(subjectKeywords)) {
      if (keywords.some((keyword) => lowerText.includes(keyword))) {
        return subject
      }
    }
    return undefined
  }

  const generateContextualResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()
    const detectedSubject = detectSubject(input)

    if (detectedSubject && detectedSubject !== chatContext.currentSubject) {
      setChatContext((prev) => ({ ...prev, currentSubject: detectedSubject }))
      return `Great! I see you're working on ${detectedSubject}. I'm well-versed in this subject and can help you with concepts, practice problems, and study strategies. What specific topic would you like to focus on?`
    }

    // Context-aware responses
    if (input.includes("difficult") || input.includes("hard") || input.includes("struggling")) {
      return `I understand this material can be challenging. Let's break it down into smaller, manageable pieces. What specific concept is giving you trouble? I can provide step-by-step explanations and study strategies.`
    }

    if (input.includes("exam") || input.includes("test") || input.includes("quiz")) {
      const subject = chatContext.currentSubject || "your subject"
      return `Preparing for a ${subject} exam? I can help you create a study plan, generate practice questions, and identify key concepts to focus on. When is your exam scheduled?`
    }

    if (input.includes("time") || input.includes("schedule") || input.includes("plan")) {
      return `Time management is crucial for academic success! I can help you create a personalized study schedule. How much time do you have available for studying each day?`
    }

    if (input.includes("grade") || input.includes("score") || input.includes("improve")) {
      return `I'm here to help you improve your academic performance! Let's identify your learning style and create targeted study strategies. What areas do you feel need the most improvement?`
    }

    // Default contextual responses
    const responses = [
      "That's an interesting question! Could you provide more details so I can give you the most helpful response?",
      "I'd love to help you with that. Can you tell me more about what you're studying or what specific help you need?",
      "Great question! To give you the best assistance, could you share more context about your current studies?",
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleSendMessage = () => {
    if (!inputValue.trim() || isTyping) return

    if (!isPro && conversationsLeft <= 0) {
      setShowUpgradeModal(true)
      return
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    if (!isPro) {
      setConversationsLeft(prev => prev - 1)
    }

    // Update context with recent topics
    const detectedSubject = detectSubject(inputValue)
    if (detectedSubject) {
      setChatContext((prev) => ({
        ...prev,
        currentSubject: detectedSubject,
        recentTopics: [...prev.recentTopics.slice(-4), detectedSubject],
      }))
    }

    const currentInput = inputValue
    setInputValue("")
    simulateAIResponse(currentInput)
  }

  const simulateAIResponse = (userInput: string) => {
    setIsTyping(true)

    // Add typing indicator
    const typingMessage: Message = {
      id: "typing",
      content: "",
      isUser: false,
      timestamp: new Date(),
      isTyping: true,
    }
    setMessages((prev) => [...prev, typingMessage])

    setTimeout(
      () => {
        // Remove typing indicator and add actual response
        setMessages((prev) => prev.filter((msg) => msg.id !== "typing"))

        let response = generateContextualResponse(userInput)
        let messageType: Message["messageType"] = "text"

        const input = userInput.toLowerCase()

        // Specific response patterns
        if (input.includes("summary") || input.includes("summarize")) {
          response = aiResponses.summary[Math.floor(Math.random() * aiResponses.summary.length)]
          messageType = "summary"
        } else if (input.includes("exam") || input.includes("test") || input.includes("quiz")) {
          response = aiResponses.exam[Math.floor(Math.random() * aiResponses.exam.length)]
          messageType = "exam"
        } else if (input.includes("map") || input.includes("visual") || input.includes("diagram")) {
          response = aiResponses.map[Math.floor(Math.random() * aiResponses.map.length)]
        } else if (input.includes("search") || input.includes("find")) {
          response = aiResponses.search[Math.floor(Math.random() * aiResponses.search.length)]
        } else if (input.includes("hello") || input.includes("hi")) {
          const subject = chatContext.currentSubject
            ? ` I see you've been working on ${chatContext.currentSubject} recently.`
            : ""
          response = `Hello! I'm excited to help you study more effectively.${subject} What would you like to work on today?`
        } else if (input.includes("help")) {
          response =
            "I'm here to help! I can generate summaries, create practice exams, build study maps, search through your notes, and provide study tips. What would you like to start with?"
        } else if (input.includes("tip") || input.includes("advice") || input.includes("how to study")) {
          response = aiResponses.studyTips[Math.floor(Math.random() * aiResponses.studyTips.length)]
          messageType = "study-tip"
        } else if (input.includes("thank") || input.includes("good") || input.includes("great")) {
          response = aiResponses.encouragement[Math.floor(Math.random() * aiResponses.encouragement.length)]
          messageType = "encouragement"
        }

        const aiResponse: Message = {
          id: Date.now().toString(),
          content: response,
          isUser: false,
          timestamp: new Date(),
          messageType,
        }

        setMessages((prev) => [...prev, aiResponse])
        setIsTyping(false)

        // Occasionally provide study tips
        if (Math.random() < 0.3 && messageType === "text") {
          setTimeout(() => {
            const tipMessage: Message = {
              id: (Date.now() + 1).toString(),
              content: `💡 Study Tip: ${aiResponses.studyTips[Math.floor(Math.random() * aiResponses.studyTips.length)]}`,
              isUser: false,
              timestamp: new Date(),
              messageType: "study-tip",
            }
            setMessages((prev) => [...prev, tipMessage])
          }, 2000)
        }
      },
      1500 + Math.random() * 1000,
    )
  }

  const handleActionButton = (action: string) => {
    if (isTyping) return

    if (action === 'map') {
      if (!isPro) {
        setShowUpgradeModal(true)
        return
      }
      setShowStudyMap(true)
      return
    }

    if (!isPro && conversationsLeft <= 0) {
      setShowUpgradeModal(true)
      return
    }

    setChatContext((prev) => ({ ...prev, lastAction: action }))
    if (!isPro) {
      setConversationsLeft(prev => prev - 1)
    }

    const responses = {
      summary: aiResponses.summary[Math.floor(Math.random() * aiResponses.summary.length)],
      exam: aiResponses.exam[Math.floor(Math.random() * aiResponses.exam.length)],
      map: aiResponses.map[Math.floor(Math.random() * aiResponses.map.length)],
      search: aiResponses.search[Math.floor(Math.random() * aiResponses.search.length)],
    }

    setIsTyping(true)

    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now().toString(),
        content: responses[action as keyof typeof responses],
        isUser: false,
        timestamp: new Date(),
        messageType: action as Message["messageType"],
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 800)
  }

  const getMessageIcon = (messageType?: Message["messageType"]) => {
    switch (messageType) {
      case "summary":
        return <BookOpen className="w-4 h-4 text-blue-500" />
      case "exam":
        return <Target className="w-4 h-4 text-green-500" />
      case "study-tip":
        return <Lightbulb className="w-4 h-4 text-yellow-500" />
      case "encouragement":
        return <span className="text-lg">🌟</span>
      default:
        return null
    }
  }

  if (showStudyMap) {
    return (
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-border bg-card">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Study Map Generator</h2>
            <Button variant="ghost" size="sm" onClick={() => setShowStudyMap(false)}>
              ← Back to Chat
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <StudyMapSimulator />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Usage Limit Indicator */}
      <div className="p-4 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {isPro ? (
                <>
                  <Crown className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-primary font-semibold">
                    Pro Member - Unlimited Access
                  </span>
                </>
              ) : conversationsLeft > 0 ? (
                <>
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm text-muted-foreground">
                    {conversationsLeft} conversations remaining today
                  </span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-red-500">Daily limit reached</span>
                </>
              )}
            </div>
          </div>
          {!isPro && (
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-primary to-primary/80"
              onClick={() => setShowUpgradeModal(true)}
            >
              <Crown className="w-3 h-3 mr-1" />
              Upgrade Pro
            </Button>
          )}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[70%] rounded-lg p-4 transition-all duration-200 ${
                message.isUser ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-muted/80"
              } ${message.isTyping ? "animate-pulse" : ""}`}
            >
              {message.isTyping ? (
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">AI is thinking...</span>
                </div>
              ) : (
                <>
                  <div className="flex items-start space-x-2">
                    {!message.isUser && getMessageIcon(message.messageType)}
                    <div className="flex-1">
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Context Display */}
      {chatContext.currentSubject && (
        <div className="px-6 py-2 border-t border-border bg-muted/20">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <BookOpen className="w-4 h-4" />
            <span>Currently studying: {chatContext.currentSubject}</span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="p-4 sm:p-6 border-t border-border">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-4">
          <Button
            variant="outline"
            className={`flex items-center space-x-2 h-10 sm:h-12 bg-transparent transition-all duration-200 active:scale-95 ${
              !isPro && conversationsLeft <= 0 
                ? 'opacity-50 cursor-not-allowed hover:bg-muted/20' 
                : 'hover:bg-primary/5 hover:border-primary/50'
            }`}
            onClick={() => handleActionButton("summary")}
            disabled={isTyping || (!isPro && conversationsLeft <= 0)}
          >
            {!isPro && conversationsLeft <= 0 ? <Lock className="w-4 h-4 text-muted-foreground" /> : <Brain className="w-4 h-4" />}
            <span className="text-xs sm:text-sm">
              <span className="hidden sm:inline">Generate </span>Summary
            </span>
          </Button>
          <Button
            variant="outline"
            className={`flex items-center space-x-2 h-10 sm:h-12 bg-transparent transition-all duration-200 active:scale-95 ${
              !isPro && conversationsLeft <= 0 
                ? 'opacity-50 cursor-not-allowed hover:bg-muted/20' 
                : 'hover:bg-primary/5 hover:border-primary/50'
            }`}
            onClick={() => handleActionButton("exam")}
            disabled={isTyping || (!isPro && conversationsLeft <= 0)}
          >
            {!isPro && conversationsLeft <= 0 ? <Lock className="w-4 h-4 text-muted-foreground" /> : <FileText className="w-4 h-4" />}
            <span className="text-xs sm:text-sm">
              <span className="hidden sm:inline">Create </span>Exam
            </span>
          </Button>
          <Button
            variant="outline"
            className={`flex items-center space-x-2 h-10 sm:h-12 transition-all duration-200 active:scale-95 relative ${
              isPro 
                ? 'bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 border-yellow-400/50 hover:from-yellow-400/30 hover:to-yellow-600/30'
                : 'bg-gradient-to-r from-primary/10 to-primary/5 border-primary/30 hover:from-primary/20 hover:to-primary/10'
            }`}
            onClick={() => handleActionButton("map")}
            disabled={isTyping}
          >
            <Crown className={`w-3 h-3 absolute -top-1 -right-1 ${isPro ? 'text-yellow-500' : 'text-primary'}`} />
            <Map className={`w-4 h-4 ${isPro ? 'text-yellow-600' : 'text-primary'}`} />
            <span className={`text-xs sm:text-sm font-medium ${isPro ? 'text-yellow-600' : 'text-primary'}`}>
              Study Map{isPro ? ' Pro' : ''}
            </span>
          </Button>
          <Button
            variant="outline"
            className={`flex items-center space-x-2 h-10 sm:h-12 bg-transparent transition-all duration-200 active:scale-95 ${
              !isPro && conversationsLeft <= 0 
                ? 'opacity-50 cursor-not-allowed hover:bg-muted/20' 
                : 'hover:bg-primary/5 hover:border-primary/50'
            }`}
            onClick={() => handleActionButton("search")}
            disabled={isTyping || (!isPro && conversationsLeft <= 0)}
          >
            {!isPro && conversationsLeft <= 0 ? <Lock className="w-4 h-4 text-muted-foreground" /> : <Search className="w-4 h-4" />}
            <span className="text-xs sm:text-sm">
              <span className="hidden sm:inline">Search </span>Notes
            </span>
          </Button>
        </div>

        {/* Chat Input */}
        <div className="flex space-x-2">
          <Input
            placeholder={`Ask me anything about ${chatContext.currentSubject || "your studies"}...`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            disabled={isTyping}
          />
          <Button
            onClick={handleSendMessage}
            size="icon"
            disabled={isTyping || !inputValue.trim()}
            className="transition-all duration-200 hover:scale-105 active:scale-95"
          >
            {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Pro Upgrade Modal */}
      <ProUpgradeModal 
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        onSubscribe={upgradeToPro}
      />
    </div>
  )
}
