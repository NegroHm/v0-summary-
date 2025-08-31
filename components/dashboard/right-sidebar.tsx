"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { FileText, Clock, Trophy, Calendar, TrendingUp, Target } from "lucide-react"
import { useState, useEffect } from "react"
import { RankingDashboard } from "@/components/ranking/ranking-dashboard"
import { useSubscription } from "@/lib/subscription-context"
import { ProUpgradeModal } from "@/components/subscription/pro-upgrade-modal"

export function RightSidebar() {
  const { isPro, showUpgradeModal, setShowUpgradeModal, upgradeToPro } = useSubscription()
  const [examDays, setExamDays] = useState(5)
  const [studyProgress, setStudyProgress] = useState(60)
  const [dailyGoalProgress, setDailyGoalProgress] = useState(80)
  const [weeklyGoalProgress, setWeeklyGoalProgress] = useState(280)
  const [activeTab, setActiveTab] = useState<'stats' | 'ranking'>('stats')

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const examDate = new Date()
      examDate.setDate(now.getDate() + 5)
      examDate.setHours(9, 0, 0, 0) // 9 AM exam time

      const timeDiff = examDate.getTime() - now.getTime()
      const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24))
      setExamDays(Math.max(0, daysRemaining))
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const handleQuickAction = (action: string) => {
    console.log(`[v0] Quick action triggered: ${action}`)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Tab Navigation */}
      <div className="p-4 border-b border-border">
        <div className="grid grid-cols-2 gap-1 bg-muted/30 p-1 rounded-lg">
          <Button
            variant={activeTab === 'stats' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('stats')}
            className="h-8"
          >
            Statistics
          </Button>
          <Button
            variant={activeTab === 'ranking' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('ranking')}
            className="h-8"
          >
            Rankings
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeTab === 'stats' ? (
          <div className="p-6 space-y-6">
      {/* Study Statistics */}
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span>Study Statistics</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between hover:bg-muted/20 p-2 rounded-lg transition-colors">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Notes Uploaded</span>
            </div>
            <span className="font-semibold text-lg">24</span>
          </div>

          <div className="flex items-center justify-between hover:bg-muted/20 p-2 rounded-lg transition-colors">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Hours Studied</span>
            </div>
            <span className="font-semibold text-lg">47.5</span>
          </div>

          <div className="flex items-center justify-between hover:bg-muted/20 p-2 rounded-lg transition-colors">
            <div className="flex items-center space-x-2">
              <Trophy className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Exams Taken</span>
            </div>
            <span className="font-semibold text-lg">12</span>
          </div>
        </CardContent>
      </Card>

      {/* Next Exam Countdown */}
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-primary" />
            <span>Next Exam</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Biology Midterm</span>
            </div>
            <div
              className={`text-3xl font-bold mb-2 transition-colors duration-200 ${
                examDays <= 2 ? "text-red-500" : examDays <= 5 ? "text-orange-500" : "text-primary"
              }`}
            >
              {examDays}
            </div>
            <div className="text-sm text-muted-foreground">Days Remaining</div>
            <Progress value={studyProgress} className="mt-3 transition-all duration-300" />
            <div className="text-xs text-muted-foreground mt-1">{studyProgress}% prepared</div>
            {examDays <= 3 && (
              <div className="mt-2 text-xs text-orange-600 dark:text-orange-400 animate-pulse">
                ⚠️ Exam approaching soon!
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Points Balance */}
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-primary" />
            <span>Study Points</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">1,247</div>
            <div className="text-sm text-muted-foreground mb-3">Total Points</div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center hover:bg-muted/20 p-1 rounded transition-colors">
                <span className="text-muted-foreground">Daily Goal</span>
                <span className="text-green-600 dark:text-green-400 font-medium">50/50 ✓</span>
              </div>
              <div className="flex justify-between items-center hover:bg-muted/20 p-1 rounded transition-colors">
                <span className="text-muted-foreground">Weekly Goal</span>
                <span className="text-foreground font-medium">{weeklyGoalProgress}/350</span>
              </div>
            </div>
            <Progress value={dailyGoalProgress} className="mt-3" />
            <div className="text-xs text-muted-foreground mt-1">
              {Math.round((weeklyGoalProgress / 350) * 100)}% weekly progress
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="hover:shadow-md transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start p-3 h-auto hover:bg-primary/5 hover:border-primary/20 transition-all duration-200 active:scale-[0.98]"
            onClick={() => handleQuickAction("review")}
          >
            <div className="text-left">
              <div className="text-sm font-medium text-foreground">Review Today's Notes</div>
              <div className="text-xs text-muted-foreground">3 files ready</div>
            </div>
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start p-3 h-auto hover:bg-primary/5 hover:border-primary/20 transition-all duration-200 active:scale-[0.98]"
            onClick={() => handleQuickAction("quiz")}
          >
            <div className="text-left">
              <div className="text-sm font-medium text-foreground">Practice Quiz</div>
              <div className="text-xs text-muted-foreground">Biology Chapter 12</div>
            </div>
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start p-3 h-auto hover:bg-primary/5 hover:border-primary/20 transition-all duration-200 active:scale-[0.98]"
            onClick={() => handleQuickAction("study-group")}
          >
            <div className="text-left">
              <div className="text-sm font-medium text-foreground">Study Group</div>
              <div className="text-xs text-muted-foreground">Join Chemistry session</div>
            </div>
          </Button>
        </CardContent>
      </Card>
          </div>
        ) : (
          <RankingDashboard />
        )}
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
