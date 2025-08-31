'use client'

import { useState, useEffect } from 'react'
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { LeftSidebar } from "@/components/dashboard/left-sidebar"
import { ChatInterface } from "@/components/dashboard/chat-interface"
import { RightSidebar } from "@/components/dashboard/right-sidebar"
import { Button } from "@/components/ui/button"
import { Menu, X, FileText, Settings } from "lucide-react"

interface UploadedFile {
  id: string;
  name: string;
  hashtags: string[];
  selected: boolean;
}

export default function DashboardPage() {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false)
  const [sessionId, setSessionId] = useState<string>("")
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])

  // Prevent body scroll when sidebars are open
  useEffect(() => {
    if (leftSidebarOpen || rightSidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [leftSidebarOpen, rightSidebarOpen])

  const closeBothSidebars = () => {
    setLeftSidebarOpen(false)
    setRightSidebarOpen(false)
  }

  const toggleLeftSidebar = () => {
    if (rightSidebarOpen) setRightSidebarOpen(false)
    setLeftSidebarOpen(!leftSidebarOpen)
  }

  const toggleRightSidebar = () => {
    if (leftSidebarOpen) setLeftSidebarOpen(false)
    setRightSidebarOpen(!rightSidebarOpen)
  }

  const handleFilesUploaded = (files: UploadedFile[], newSessionId: string) => {
    setUploadedFiles(prev => [...prev, ...files])
    setSessionId(newSessionId)
  }

  const handleFileSelectionChange = (selectedFiles: UploadedFile[]) => {
    setUploadedFiles(prev => 
      prev.map(file => ({
        ...file,
        selected: selectedFiles.some(sf => sf.id === file.id)
      }))
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      {/* Mobile Navigation */}
      <div className="lg:hidden border-b border-border bg-card px-4 py-3">
        <div className="flex items-center justify-between">
          <Button 
            variant={leftSidebarOpen ? "default" : "ghost"}
            size="sm"
            onClick={toggleLeftSidebar}
            className="flex items-center gap-2 transition-all duration-200"
          >
            <Menu className="w-4 h-4" />
            <span>Files</span>
          </Button>
          
          <div className="text-xs text-muted-foreground font-medium">
            Tap to navigate
          </div>
          
          <Button 
            variant={rightSidebarOpen ? "default" : "ghost"}
            size="sm"
            onClick={toggleRightSidebar}
            className="flex items-center gap-2 transition-all duration-200"
          >
            <FileText className="w-4 h-4" />
            <span>Stats</span>
          </Button>
        </div>
      </div>

      <div className="relative flex h-[calc(100vh-7rem)] lg:h-[calc(100vh-4rem)]">
        {/* Left Sidebar - Mobile Overlay */}
        <div className={`
          fixed inset-y-0 left-0 z-50 w-80 bg-card border-r border-border transform transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0 lg:z-auto lg:w-80
          ${leftSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="lg:hidden absolute top-4 right-4 z-10">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={closeBothSidebars}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <LeftSidebar 
            onFilesUploaded={handleFilesUploaded}
            onFileSelectionChange={handleFileSelectionChange}
          />
        </div>

        {/* Mobile Overlay - Unified for both sidebars */}
        {(leftSidebarOpen || rightSidebarOpen) && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
            onClick={closeBothSidebars}
          />
        )}

        {/* Center Column - Chat Interface */}
        <div className="flex-1 flex flex-col min-w-0">
          <ChatInterface 
            sessionId={sessionId}
            selectedFiles={uploadedFiles}
          />
        </div>

        {/* Right Sidebar - Mobile Overlay */}
        <div className={`
          fixed inset-y-0 right-0 z-50 w-80 bg-card border-l border-border transform transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0 lg:z-auto lg:w-80
          ${rightSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
          <div className="lg:hidden absolute top-4 left-4 z-10">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={closeBothSidebars}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <RightSidebar />
        </div>
      </div>
    </div>
  )
}