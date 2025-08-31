'use client'

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { LeftSidebar } from "@/components/dashboard/left-sidebar"
import { ChatInterface } from "@/components/dashboard/chat-interface"
import { RightSidebar } from "@/components/dashboard/right-sidebar"
import { useState } from "react"

interface UploadedFile {
  id: string;
  name: string;
  hashtags: string[];
  selected: boolean;
}

export default function DashboardPage() {
  const [sessionId, setSessionId] = useState<string>("")
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])

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

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Sidebar */}
        <div className="w-80 border-r border-border bg-card">
          <LeftSidebar 
            onFilesUploaded={handleFilesUploaded}
            onFileSelectionChange={handleFileSelectionChange}
          />
        </div>

        {/* Center Column - Chat Interface */}
        <div className="flex-1 flex flex-col">
          <ChatInterface 
            sessionId={sessionId}
            selectedFiles={uploadedFiles}
          />
        </div>

        {/* Right Sidebar */}
        <div className="w-80 border-l border-border bg-card">
          <RightSidebar />
        </div>
      </div>
    </div>
  )
}