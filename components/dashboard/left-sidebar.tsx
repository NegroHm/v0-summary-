'use client'

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Flame, Upload, FileText, Clock, CheckCircle, Hash, Trash2, X } from "lucide-react"
import { useState } from "react"

// We'll generate recent files from uploaded files
const getRecentFiles = (uploadedFiles: UploadedFile[]) => {
  return uploadedFiles.slice(-5).reverse().map((file, index) => ({
    name: file.name,
    time: "Just uploaded",
    size: "Processing...",
    id: file.id
  }))
}

interface UploadedFile {
  id: string;
  name: string;
  hashtags: string[];
  selected: boolean;
}

interface LeftSidebarProps {
  onFilesUploaded?: (files: UploadedFile[], sessionId: string) => void;
  onFileSelectionChange?: (selectedFiles: UploadedFile[]) => void;
}

export function LeftSidebar({ onFilesUploaded, onFileSelectionChange }: LeftSidebarProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [sessionId, setSessionId] = useState<string>('')
  const [deletedFileIds, setDeletedFileIds] = useState<string[]>([]);

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
      uploadFiles(files)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      uploadFiles(Array.from(files))
    }
  }

  const uploadFiles = async (files: File[]) => {
    setIsUploading(true)
    setUploadProgress(0)

    try {
      const formData = new FormData()
      files.forEach(file => formData.append('files', file))
      
      // If we have an existing session, send it
      if (sessionId) {
        formData.append('sessionId', sessionId)
      }

      const response = await fetch('/api/upload-and-analyze', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        throw new Error(errorData.error || `Server error: ${response.status}`)
      }

      const data = await response.json()
      let newFilesWithSelection: UploadedFile[] = data.files.map((file: any) => ({ ...file, selected: true }))
      
      // Filter out locally deleted files
      newFilesWithSelection = newFilesWithSelection.filter(file => !deletedFileIds.includes(file.id));

      const combinedFiles = newFilesWithSelection;
      
      setUploadedFiles(combinedFiles)
      setSessionId(data.sessionId)
      setUploadProgress(100)
      
      console.log('Upload completed:', {
        newFiles: newFilesWithSelection.length,
        totalFiles: combinedFiles.length,
        sessionId: data.sessionId,
        totalInSession: data.totalFilesInSession
      })
      
      onFilesUploaded?.(combinedFiles, data.sessionId)
      onFileSelectionChange?.(combinedFiles.filter(file => file.selected))
      
    } catch (error) {
      console.error('Error uploading files:', error)
      alert(`Error uploading files: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsUploading(false)
    }
  }

  const toggleFileSelection = (fileId: string) => {
    const updatedFiles = uploadedFiles.map(file => 
      file.id === fileId ? { ...file, selected: !file.selected } : file
    )
    setUploadedFiles(updatedFiles)
    onFileSelectionChange?.(updatedFiles.filter(file => file.selected))
  }

  const handleFileClick = (fileId: string) => {
    toggleFileSelection(fileId)
  }

  const clearAllFiles = () => {
    setUploadedFiles([])
    setSessionId('')
    onFilesUploaded?.([], '')
    onFileSelectionChange?.([])
  }

  const deleteFile = (fileId: string) => {
    const updatedFiles = uploadedFiles.filter(file => file.id !== fileId)
    setUploadedFiles(updatedFiles)
    setDeletedFileIds(prev => [...prev, fileId]); // Remember deleted file
    onFileSelectionChange?.(updatedFiles.filter(file => file.selected))
    
    console.log('File deleted:', { fileId, remainingFiles: updatedFiles.length })
    
    // If no files left, clear the session
    if (updatedFiles.length === 0) {
      setSessionId('')
      onFilesUploaded?.([], '')
      console.log('All files deleted, session cleared')
    }
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
                  accept="image/*,application/pdf"
                  multiple
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
            <div className="mt-3 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm text-foreground">Uploaded Files</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFiles}
                  className="h-6 px-2 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Clear All
                </Button>
              </div>
              {uploadedFiles.map((file) => (
                <div 
                  key={file.id} 
                  className={`group p-3 border rounded-lg transition-all relative ${
                    file.selected ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'
                  }`}
                >
                  <div 
                    className="cursor-pointer"
                    onClick={() => handleFileClick(file.id)}
                  >
                    <div className="flex items-center space-x-2 mb-2 pr-6">
                      <CheckCircle className={`w-4 h-4 flex-shrink-0 ${file.selected ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className="text-sm font-medium truncate">{file.name}</span>
                    </div>
                    {file.hashtags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {file.hashtags.map((hashtag, index) => (
                          <span key={index} className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-muted rounded-full">
                            <Hash className="w-3 h-3" />
                            {hashtag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteFile(file.id)
                    }}
                    className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/10 hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </Button>
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
            {uploadedFiles.length > 0 ? (
              getRecentFiles(uploadedFiles).map((file, index) => (
                <div
                  key={file.id}
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
              ))
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No files uploaded yet</p>
                <p className="text-xs">Upload files to see them here</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}