'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { Trophy, Medal, Award, Crown, Star, TrendingUp } from 'lucide-react'

interface RankingUser {
  id: string
  name: string
  university: string
  province: string
  country: string
  points: number
  avatar?: string
  badge?: 'gold' | 'silver' | 'bronze'
  streak?: number
  isPro?: boolean
}

const mockNationalRanking: RankingUser[] = [
  { id: '1', name: 'Ana García', university: 'UBA', province: 'Buenos Aires', country: 'Argentina', points: 2847, badge: 'gold', streak: 15, isPro: true },
  { id: '2', name: 'Carlos Mendoza', university: 'UTN', province: 'Córdoba', country: 'Argentina', points: 2531, badge: 'silver', streak: 12, isPro: true },
  { id: '3', name: 'María Rodríguez', university: 'UC', province: 'Santiago', country: 'Chile', points: 2298, badge: 'bronze', streak: 8 },
  { id: '4', name: 'Diego López', university: 'UNC', province: 'Córdoba', country: 'Argentina', points: 1987, streak: 6, isPro: true },
  { id: '5', name: 'Sofía Martín', university: 'UNLP', province: 'Buenos Aires', country: 'Argentina', points: 1764, streak: 10 },
  { id: '6', name: 'Luis Torres', university: 'UDA', province: 'Mendoza', country: 'Argentina', points: 1532, streak: 4, isPro: true },
  { id: '7', name: 'Valeria Castro', university: 'UTN', province: 'Santa Fe', country: 'Argentina', points: 1421, streak: 7 },
  { id: '8', name: 'Roberto Silva', university: 'UBA', province: 'Buenos Aires', country: 'Argentina', points: 1298, streak: 3, isPro: true }
]

const mockProvincialRanking: RankingUser[] = [
  { id: '1', name: 'Ana García', university: 'UBA', province: 'Buenos Aires', country: 'Argentina', points: 2847, badge: 'gold', streak: 15, isPro: true },
  { id: '5', name: 'Sofía Martín', university: 'UNLP', province: 'Buenos Aires', country: 'Argentina', points: 1764, badge: 'silver', streak: 10 },
  { id: '8', name: 'Roberto Silva', university: 'UBA', province: 'Buenos Aires', country: 'Argentina', points: 1298, badge: 'bronze', streak: 3, isPro: true },
  { id: '9', name: 'Lucía Fernández', university: 'UNLP', province: 'Buenos Aires', country: 'Argentina', points: 987, streak: 5 },
  { id: '10', name: 'Pedro Morales', university: 'UBA', province: 'Buenos Aires', country: 'Argentina', points: 856, streak: 2 }
]

const mockUniversityRanking: RankingUser[] = [
  { id: '1', name: 'Ana García', university: 'UBA', province: 'Buenos Aires', country: 'Argentina', points: 2847, badge: 'gold', streak: 15, isPro: true },
  { id: '8', name: 'Roberto Silva', university: 'UBA', province: 'Buenos Aires', country: 'Argentina', points: 1298, badge: 'silver', streak: 3, isPro: true },
  { id: '10', name: 'Pedro Morales', university: 'UBA', province: 'Buenos Aires', country: 'Argentina', points: 856, badge: 'bronze', streak: 2 },
  { id: '11', name: 'Carmen Ruiz', university: 'UBA', province: 'Buenos Aires', country: 'Argentina', points: 743, streak: 4 },
  { id: '12', name: 'Miguel Herrera', university: 'UBA', province: 'Buenos Aires', country: 'Argentina', points: 621, streak: 1, isPro: true }
]

type RankingLevel = 'nacional' | 'provincial' | 'universidad'

export function RankingDashboard() {
  const [activeLevel, setActiveLevel] = useState<RankingLevel>('nacional')
  
  const getRankingData = () => {
    switch (activeLevel) {
      case 'nacional':
        return mockNationalRanking
      case 'provincial':
        return mockProvincialRanking
      case 'universidad':
        return mockUniversityRanking
      default:
        return mockNationalRanking
    }
  }

  const getRankingTitle = () => {
    switch (activeLevel) {
      case 'nacional':
        return 'National Ranking'
      case 'provincial':
        return 'State Ranking - Buenos Aires'
      case 'universidad':
        return 'University Ranking - UBA'
      default:
        return 'National Ranking'
    }
  }

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />
      default:
        return <div className="w-5 h-5 flex items-center justify-center text-muted-foreground font-bold text-sm">#{position}</div>
    }
  }

  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case 'gold':
        return 'bg-yellow-500'
      case 'silver':
        return 'bg-gray-400'
      case 'bronze':
        return 'bg-amber-600'
      default:
        return 'bg-primary'
    }
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Trophy className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">Rankings</h2>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base">Compete and stand out as the most collaborative student</p>
      </div>

      {/* Level Selector */}
      <div className="grid grid-cols-3 gap-2">
        <Button
          variant={activeLevel === 'nacional' ? 'default' : 'outline'}
          onClick={() => setActiveLevel('nacional')}
          className="flex flex-col h-auto py-3 px-2"
        >
          <div className="font-semibold text-xs sm:text-sm">National</div>
          <div className="text-xs text-muted-foreground">Argentina</div>
        </Button>
        <Button
          variant={activeLevel === 'provincial' ? 'default' : 'outline'}
          onClick={() => setActiveLevel('provincial')}
          className="flex flex-col h-auto py-3 px-2"
        >
          <div className="font-semibold text-xs sm:text-sm">State</div>
          <div className="text-xs text-muted-foreground">Buenos Aires</div>
        </Button>
        <Button
          variant={activeLevel === 'universidad' ? 'default' : 'outline'}
          onClick={() => setActiveLevel('universidad')}
          className="flex flex-col h-auto py-3 px-2"
        >
          <div className="font-semibold text-xs sm:text-sm">University</div>
          <div className="text-xs text-muted-foreground">UBA</div>
        </Button>
      </div>

      {/* Current User Stats */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10 bg-primary text-primary-foreground">
                <div className="flex items-center justify-center w-full h-full font-semibold">
                  YU
                </div>
              </Avatar>
              <div>
                <div className="font-semibold text-foreground text-sm sm:text-base">Your Position</div>
                <div className="text-sm text-muted-foreground">
                  {activeLevel === 'nacional' && '#847 National'}
                  {activeLevel === 'provincial' && '#23 Buenos Aires'}
                  {activeLevel === 'universidad' && '#12 UBA'}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-primary" />
                <span className="font-bold text-lg">324</span>
                <span className="text-sm text-muted-foreground">pts</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="w-3 h-3" />
                <span>+47 this week</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ranking List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            {getRankingTitle()}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-0">
            {getRankingData().map((user, index) => {
              const position = index + 1
              const isTopThree = position <= 3
              
              return (
                <div
                  key={user.id}
                  className={`flex items-center justify-between p-4 border-b border-border last:border-b-0 transition-colors hover:bg-muted/30 ${
                    isTopThree ? 'bg-muted/20' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8">
                      {getRankIcon(position)}
                    </div>
                    
                    <div className="relative">
                      <Avatar className={`w-8 h-8 ${user.isPro ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 ring-2 ring-yellow-400/50' : 'bg-muted'}`}>
                        <div className={`flex items-center justify-center w-full h-full text-xs font-semibold ${user.isPro ? 'text-white' : 'text-muted-foreground'}`}>
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      </Avatar>
                      {user.isPro && (
                        <Crown className="w-3 h-3 text-yellow-500 absolute -top-1 -right-1 bg-background rounded-full p-0.5" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-foreground">{user.name}</span>
                        {user.isPro && (
                          <Badge className="text-xs bg-gradient-to-r from-yellow-400 to-yellow-600 text-white border-0">
                            PRO
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {activeLevel === 'nacional' && `${user.university} • ${user.province}`}
                        {activeLevel === 'provincial' && user.university}
                        {activeLevel === 'universidad' && 'Facultad de Ingeniería'}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-primary" />
                      <span className="font-bold text-sm">{user.points.toLocaleString()}</span>
                    </div>
                    {user.streak && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span>{user.streak} days</span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Point System Info */}
      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <Star className="w-4 h-4 text-primary" />
            How to earn points
          </h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Summary created</span>
              <span className="font-semibold">+10 pts</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Exam practiced</span>
              <span className="font-semibold">+15 pts</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Study map</span>
              <span className="font-semibold">+25 pts</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Daily streak</span>
              <span className="font-semibold">+5 pts</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Share notes</span>
              <span className="font-semibold">+20 pts</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Help classmate</span>
              <span className="font-semibold">+30 pts</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}