'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Crown, 
  MessageSquare, 
  FileText, 
  Calendar, 
  Trophy, 
  Sparkles, 
  Check, 
  X,
  Zap,
  Target,
  Star
} from 'lucide-react'

interface ProUpgradeModalProps {
  isOpen: boolean
  onClose: () => void
  onSubscribe?: () => void
}

const proFeatures = [
  {
    icon: <MessageSquare className="w-5 h-5 text-primary" />,
    title: 'Unlimited AI Messages',
    description: 'No daily conversation limits',
    highlight: 'No restrictions'
  },
  {
    icon: <FileText className="w-5 h-5 text-primary" />,
    title: 'Personalized Summaries',
    description: 'AI adapted to your learning style',
    highlight: 'Exclusive algorithm'
  },
  {
    icon: <Calendar className="w-5 h-5 text-primary" />,
    title: 'Smart Study Maps',
    description: 'Automatic Google Calendar sync',
    highlight: 'Flagship feature'
  },
  {
    icon: <Trophy className="w-5 h-5 text-primary" />,
    title: 'Exclusive Pro Ranking',
    description: 'Golden badge and privileged position',
    highlight: 'VIP status'
  },
  {
    icon: <Target className="w-5 h-5 text-primary" />,
    title: 'Predictive Analytics',
    description: 'Exam performance prediction',
    highlight: 'Pro only'
  },
  {
    icon: <Sparkles className="w-5 h-5 text-primary" />,
    title: 'Priority Support',
    description: 'Preferential 24/7 assistance',
    highlight: 'Immediate access'
  }
]

const freeVsProComparison = [
  { feature: 'Daily conversations', free: '3 maximum', pro: 'Unlimited' },
  { feature: 'Summary generation', free: 'Basic', pro: 'Personalized' },
  { feature: 'Study maps', free: '❌', pro: '✅ With Calendar' },
  { feature: 'Special ranking', free: '❌', pro: '✅ Pro Badge' },
  { feature: 'Predictive analytics', free: '❌', pro: '✅ Exclusive' },
  { feature: 'Support', free: 'Basic email', pro: 'Priority 24/7' }
]

export function ProUpgradeModal({ isOpen, onClose, onSubscribe }: ProUpgradeModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubscribe = async () => {
    setIsProcessing(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsProcessing(false)
    onSubscribe?.()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto mx-2 sm:mx-4 lg:mx-auto w-[calc(100vw-1rem)] sm:w-[calc(100vw-2rem)] lg:w-full">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Crown className="w-6 h-6 text-primary" />
            Upgrade to Summary+ Pro
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Hero Section */}
          <div className="text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Crown className="w-8 h-8 text-primary" />
              <span className="text-3xl font-bold text-primary">$10</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <p className="text-muted-foreground mb-4 text-sm sm:text-base">
              Unlock Summary+'s full potential and lead the rankings
            </p>
            <Badge className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-xs sm:text-sm">
              <Sparkles className="w-3 h-3 mr-1" />
              Flagship Feature Included
            </Badge>
          </div>

          {/* Pro Features Grid */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              Exclusive Pro Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {proFeatures.map((feature, index) => (
                <Card key={index} className="border-primary/20 hover:border-primary/40 transition-colors">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg flex-shrink-0">
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-xs sm:text-sm mb-1 leading-tight">{feature.title}</h4>
                        <p className="text-xs text-muted-foreground mb-2 leading-relaxed">{feature.description}</p>
                        <Badge variant="secondary" className="text-xs px-2 py-0.5">
                          {feature.highlight}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Comparison Table */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4">Free vs Pro Comparison</h3>
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-2 sm:p-4 font-semibold text-xs sm:text-sm">Feature</th>
                        <th className="text-center p-2 sm:p-4 font-semibold text-xs sm:text-sm">Free</th>
                        <th className="text-center p-2 sm:p-4 font-semibold text-primary text-xs sm:text-sm">Pro</th>
                      </tr>
                    </thead>
                    <tbody>
                      {freeVsProComparison.map((item, index) => (
                        <tr key={index} className="border-b border-border last:border-b-0">
                          <td className="p-2 sm:p-4 text-xs sm:text-sm font-medium">{item.feature}</td>
                          <td className="p-2 sm:p-4 text-center text-xs sm:text-sm text-muted-foreground">{item.free}</td>
                          <td className="p-2 sm:p-4 text-center text-xs sm:text-sm text-primary font-semibold">{item.pro}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Social Proof */}
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-primary" />
              <span className="font-semibold text-xs sm:text-sm">What our Pro users say:</span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground italic leading-relaxed">
              "Study maps with Google Calendar saved me 15 hours per week. 
              Now I'm in the national top 10!" - Ana G., UBA
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={handleSubscribe}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-sm sm:text-lg py-4 sm:py-6"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <Crown className="w-5 h-5 mr-2" />
                  Upgrade to Pro - $10/mes
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full sm:w-auto text-sm sm:text-base"
            >
              Continue with Free
            </Button>
          </div>

          {/* Guarantee */}
          <div className="text-center text-xs text-muted-foreground space-y-1">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Check className="w-3 h-3 text-green-500" />
              <span>30-day satisfaction guarantee</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <Check className="w-3 h-3 text-green-500" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
