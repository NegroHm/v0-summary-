"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Flame, Upload, FileText, Clock, CheckCircle } from "lucide-react"
import { useState } from "react"

const recentFiles = [
  { name: "Biology Chapter 12.pdf", time: "2 hours ago", size: "2.4 MB", id: "1" },
  { name: "Chemistry Notes.docx", time: "1 day ago", size: "1.8 MB", id: "2" },
  { name: "Physics Formulas.pdf", time: "2 days ago", size: "3.1 MB", id: "3" },
  { name: "Math Problem Set.pdf", time: "3 days ago", size: "1.2 MB", id: "4" },
  { name: "History Essay Draft.docx", time: "1 week ago", size: "2.7 MB", id: "5" },
]

export function LeftSidebar() {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      simulateFileUpload(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      simulateFileUpload(files[0])
    }
  }

  const simulateFileUpload = (file: File) => {
    setIsUploading(true)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setUploadedFiles((prev) => [...prev, file.name])

          // Simulate AI processing notification
          setTimeout(() => {
            console.log(`[v0] AI processing complete for ${file.name}`)
          }, 1000)

          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleFileClick = (fileId: string) => {
    console.log(`[v0] Opening file with ID: ${fileId}`)
    // Simulate file opening
  }

  return (
    <div className="p-6 space-y-6">
      {/* Study Streak */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center animate-pulse">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">7</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Today's Goal</span>
              <span>2/3 hours</span>
            </div>
            <Progress value={67} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* File Upload Area */}
      <Card>
        <CardContent className="p-4">
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
              isDragOver
                ? "border-primary bg-primary/5 scale-105"
                : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/20"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {isUploading ? (
              <div className="space-y-3">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-sm text-muted-foreground">Uploading...</p>
                <Progress value={uploadProgress} className="w-full" />
                <p className="text-xs text-muted-foreground">{uploadProgress}%</p>
              </div>
            ) : (
              <>
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-2">Drag & drop files here or</p>
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handleFileSelect}
                  accept=".pdf,.doc,.docx,.txt"
                />
                <Button variant="outline" size="sm" asChild>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    Browse Files
                  </label>
                </Button>
              </>
            )}
          </div>

          {uploadedFiles.length > 0 && (
            <div className="mt-3 space-y-2">
              {uploadedFiles.map((fileName, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm text-green-600 dark:text-green-400">
                  <CheckCircle className="w-4 h-4" />
                  <span>{fileName} uploaded successfully</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Files */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold text-foreground mb-3">Recent Files</h3>
          <div className="space-y-2">
            {recentFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                onClick={() => handleFileClick(file.id)}
              >
                <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                  <FileText className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate hover:text-primary transition-colors">
                    {file.name}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{file.time}</span>
                    <span>•</span>
                    <span>{file.size}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
