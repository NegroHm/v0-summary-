'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Calendar, Clock, BookOpen, Target, CheckCircle, Loader2, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface StudyUnit {
  id: string
  name: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  estimatedHours: number
  topics: string[]
  priority: number
}

interface StudySchedule {
  date: string
  units: {
    unit: StudyUnit
    timeSlot: string
    duration: number
  }[]
}

const mockUnits: StudyUnit[] = [
  {
    id: '1',
    name: 'Linear Algebra Fundamentals',
    difficulty: 'Medium',
    estimatedHours: 8,
    topics: ['Vectors', 'Matrix Operations', 'Determinants', 'Eigenvalues'],
    priority: 1
  },
  {
    id: '2', 
    name: 'Calculus Integration',
    difficulty: 'Hard',
    estimatedHours: 12,
    topics: ['Integration by Parts', 'Substitution', 'Partial Fractions', 'Applications'],
    priority: 2
  },
  {
    id: '3',
    name: 'Statistics & Probability',
    difficulty: 'Easy',
    estimatedHours: 6,
    topics: ['Distributions', 'Hypothesis Testing', 'Confidence Intervals', 'Regression'],
    priority: 3
  }
]

export function StudyMapSimulator() {
  const [examDate, setExamDate] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [schedule, setSchedule] = useState<StudySchedule[]>([])
  const [showResults, setShowResults] = useState(false)

  const generateStudyMap = async () => {
    if (!examDate) return
    
    setIsGenerating(true)
    setProgress(0)
    setShowResults(false)

    // Simulate loading progress
    const steps = [
      'Analyzing course content...',
      'Identifying key topics...',
      'Calculating optimal time allocation...',
      'Creating study schedule...',
      'Syncing with Google Calendar...'
    ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setProgress((i + 1) * 20)
    }

    // Generate mock schedule
    const examDateTime = new Date(examDate)
    const today = new Date()
    const daysUntilExam = Math.ceil((examDateTime.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    
    const generatedSchedule: StudySchedule[] = []
    
    for (let day = 0; day < Math.min(daysUntilExam - 1, 14); day++) {
      const studyDate = new Date(today)
      studyDate.setDate(today.getDate() + day)
      
      const dailyUnits = mockUnits.slice(0, Math.min(2, mockUnits.length))
      const timeSlots = ['9:00 AM - 11:00 AM', '2:00 PM - 4:00 PM', '7:00 PM - 9:00 PM']
      
      generatedSchedule.push({
        date: studyDate.toISOString().split('T')[0],
        units: dailyUnits.map((unit, index) => ({
          unit,
          timeSlot: timeSlots[index % timeSlots.length],
          duration: Math.floor(unit.estimatedHours / Math.ceil(daysUntilExam / 7))
        }))
      })
    }

    setSchedule(generatedSchedule)
    setProgress(100)
    
    setTimeout(() => {
      setIsGenerating(false)
      setShowResults(true)
    }, 500)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500'
      case 'Medium': return 'bg-yellow-500'
      case 'Hard': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Study Map Generator</h2>
        <p className="text-muted-foreground">Create an optimized study schedule for your upcoming exam</p>
      </div>

      {!showResults && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Exam Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Exam Date</label>
              <Input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full"
              />
            </div>

            {examDate && (
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Detected Study Units:</h4>
                <div className="space-y-2">
                  {mockUnits.map((unit) => (
                    <div key={unit.id} className="flex items-center justify-between">
                      <span className="text-sm">{unit.name}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {unit.estimatedHours}h
                        </Badge>
                        <div className={`w-2 h-2 rounded-full ${getDifficultyColor(unit.difficulty)}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button 
              onClick={generateStudyMap}
              disabled={!examDate || isGenerating}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Generating Study Map...
                </>
              ) : (
                <>
                  <Target className="w-4 h-4 mr-2" />
                  Generate Smart Study Map
                </>
              )}
            </Button>

            {isGenerating && (
              <div className="space-y-2">
                <Progress value={progress} className="w-full" />
                <p className="text-sm text-muted-foreground text-center">
                  {progress < 20 && 'Analyzing course content...'}
                  {progress >= 20 && progress < 40 && 'Identifying key topics...'}
                  {progress >= 40 && progress < 60 && 'Calculating optimal time allocation...'}
                  {progress >= 60 && progress < 80 && 'Creating study schedule...'}
                  {progress >= 80 && 'Syncing with Google Calendar...'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {showResults && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-foreground">Your Personalized Study Map</h3>
            <Button variant="outline" size="sm" onClick={() => setShowResults(false)}>
              Create New Map
            </Button>
          </div>

          <div className="grid gap-4">
            {schedule.slice(0, 7).map((day, index) => (
              <Card key={day.date} className="border-l-4 border-l-primary">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">
                      {new Date(day.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </h4>
                    <Badge variant="secondary">Day {index + 1}</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    {day.units.map((session, sessionIndex) => (
                      <div key={sessionIndex} className="flex items-center justify-between bg-muted/30 rounded-lg p-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <BookOpen className="w-4 h-4 text-primary" />
                            <span className="font-medium text-sm">{session.unit.name}</span>
                            <div className={`w-2 h-2 rounded-full ${getDifficultyColor(session.unit.difficulty)}`} />
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Topics: {session.unit.topics.slice(0, 2).join(', ')}
                            {session.unit.topics.length > 2 && '...'}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-sm">
                            <Clock className="w-3 h-3" />
                            <span>{session.timeSlot}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {session.duration}h session
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-primary" />
                <span className="font-semibold text-primary">Study Map Generated!</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Your personalized study schedule has been created and synced to Google Calendar. 
                Each session is optimized based on topic difficulty and your learning patterns.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button size="sm" className="flex-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  Open Google Calendar
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Download PDF Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}