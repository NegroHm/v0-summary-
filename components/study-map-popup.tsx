'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Calendar, Clock, BookOpen, Target, CheckCircle } from 'lucide-react'

export function StudyMapPopup() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-4">
          Learn How It Works
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <Target className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            <span className="leading-tight">Smart Study Maps + Google Calendar Integration</span>
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base pt-4">
            Our flagship feature that revolutionizes how you organize and schedule your study time.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 sm:space-y-6 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-3 sm:space-y-4">
              <h3 className="font-semibold text-base sm:text-lg flex items-center gap-2">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                Study Map Creation
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Upload your course materials and syllabi
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  AI automatically identifies units and topics
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Organize content by difficulty and priority
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Set study goals and deadlines
                </li>
              </ul>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <h3 className="font-semibold text-base sm:text-lg flex items-center gap-2">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                Google Calendar Sync
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  Automatically schedule study sessions
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  Smart time allocation based on difficulty
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  Adaptive scheduling around your commitments
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  Reminders and progress tracking
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 sm:p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <span className="font-semibold text-primary text-sm sm:text-base">Smart Time Management</span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Our AI analyzes your study patterns, course deadlines, and personal schedule to create 
              an optimal study timeline that maximizes retention and minimizes stress.
            </p>
          </div>

          <div className="flex justify-center pt-4">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 w-full sm:w-auto text-sm sm:text-base"
              onClick={() => setOpen(false)}
            >
              Try Study Maps Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}