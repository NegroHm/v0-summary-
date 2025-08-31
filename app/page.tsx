'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedUniversityHeader } from "@/components/animated-university-header"
import { StudyMapPopup } from "@/components/study-map-popup"
import { Brain, FileText, Map, Search, TrendingUp, Users, Upload, Zap, Target, Trophy, Crown, Calendar } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-base sm:text-lg">S+</span>
              </div>
              <span className="text-lg sm:text-xl font-semibold text-foreground">Summary+</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden sm:block">
                <ThemeToggle />
              </div>
              <Button variant="outline" size="sm" className="hidden xs:inline-flex" asChild>
                <Link href="/dashboard">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/dashboard">
                  <span className="hidden xs:inline">Get Started</span>
                  <span className="xs:hidden">Start</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-3 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <AnimatedUniversityHeader />
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto" asChild>
              <Link href="/dashboard">Get Started Free</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base sm:text-lg px-6 sm:px-8 bg-transparent w-full sm:w-auto">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 sm:py-16 lg:py-20 px-3 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Powerful AI Study Tools</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Everything you need to transform your study experience and achieve academic excellence
            </p>
          </div>

          {/* Featured Study Maps - Main Feature */}
          <div className="mb-8 sm:mb-12">
            <Card className="border-2 border-primary bg-gradient-to-br from-primary/5 to-primary/10 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                <div className="flex items-center gap-1 bg-primary text-primary-foreground px-2 sm:px-3 py-1 rounded-full text-xs font-semibold">
                  <Crown className="w-3 h-3" />
                  <span className="hidden xs:inline">FLAGSHIP FEATURE</span>
                  <span className="xs:hidden">TOP</span>
                </div>
              </div>
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                  <div className="order-2 lg:order-1">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary rounded-xl flex items-center justify-center mb-4 sm:mb-6 mx-auto lg:mx-0">
                      <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4 text-center lg:text-left">
                      Smart Study Maps + Calendar Sync
                    </h3>
                    <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg text-center lg:text-left">
                      Our revolutionary feature that automatically organizes your study units and schedules them 
                      in Google Calendar with optimal time allocation.
                    </p>
                    <div className="flex flex-col gap-3 max-w-sm mx-auto lg:max-w-none lg:mx-0">
                      <StudyMapPopup />
                      <Button className="bg-gradient-to-r from-primary to-primary/80 text-sm sm:text-base">
                        <span className="hidden sm:inline">Upgrade to Pro - $9.99/month</span>
                        <span className="sm:hidden">Pro - $9.99/mo</span>
                      </Button>
                    </div>
                  </div>
                  <div className="bg-background/50 rounded-lg p-4 sm:p-6 border border-primary/20 order-1 lg:order-2">
                    <h4 className="font-semibold mb-3 sm:mb-4 text-primary text-center lg:text-left">Key Benefits:</h4>
                    <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                      <li className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>Automatic unit and topic organization</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        <span>Google Calendar integration</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-purple-500 flex-shrink-0" />
                        <span>Adaptive study scheduling</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-orange-500 flex-shrink-0" />
                        <span>Progress tracking & reminders</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 sm:mb-4 mx-auto sm:mx-0">
                  <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 text-center sm:text-left">AI-Powered Summaries</h3>
                <p className="text-muted-foreground mb-4 text-sm sm:text-base text-center sm:text-left">
                  Instantly generate comprehensive summaries from your lecture notes and textbooks
                </p>
                <Button variant="outline" size="sm" className="w-full text-xs sm:text-sm">
                  <span className="hidden sm:inline">Try Free - Then $4.99/month</span>
                  <span className="sm:hidden">Free Trial - $4.99/mo</span>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 sm:mb-4 mx-auto sm:mx-0">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 text-center sm:text-left">Practice Exam Generation</h3>
                <p className="text-muted-foreground mb-4 text-sm sm:text-base text-center sm:text-left">
                  Create custom practice tests and quizzes based on your study materials
                </p>
                <Button variant="outline" size="sm" className="w-full text-xs sm:text-sm">
                  <span className="hidden sm:inline">Try Free - Then $4.99/month</span>
                  <span className="sm:hidden">Free Trial - $4.99/mo</span>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 sm:mb-4 mx-auto sm:mx-0">
                  <Search className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 text-center sm:text-left">Intelligent Search</h3>
                <p className="text-muted-foreground mb-4 text-sm sm:text-base text-center sm:text-left">
                  Find specific information across all your notes with semantic search
                </p>
                <Button variant="outline" size="sm" className="w-full text-xs sm:text-sm">
                  <span className="hidden sm:inline">Try Free - Then $4.99/month</span>
                  <span className="sm:hidden">Free Trial - $4.99/mo</span>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow sm:col-span-2 lg:col-span-1">
              <CardContent className="p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 sm:mb-4 mx-auto sm:mx-0">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 text-center sm:text-left">Progress Tracking</h3>
                <p className="text-muted-foreground mb-4 text-sm sm:text-base text-center sm:text-left">Monitor your study habits and track improvement over time</p>
                <Button variant="outline" size="sm" className="w-full text-xs sm:text-sm">
                  <span className="hidden sm:inline">Try Free - Then $4.99/month</span>
                  <span className="sm:hidden">Free Trial - $4.99/mo</span>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 sm:mb-4 mx-auto sm:mx-0">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 text-center sm:text-left">Collaborative Learning</h3>
                <p className="text-muted-foreground mb-4 text-sm sm:text-base text-center sm:text-left">Share notes and study together with classmates in your courses</p>
                <Button variant="outline" size="sm" className="w-full text-xs sm:text-sm">
                  <span className="hidden sm:inline">Try Free - Then $4.99/month</span>
                  <span className="sm:hidden">Free Trial - $4.99/mo</span>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 sm:mb-4 mx-auto sm:mx-0">
                  <Map className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 text-center sm:text-left">Visual Mind Maps</h3>
                <p className="text-muted-foreground mb-4 text-sm sm:text-base text-center sm:text-left">
                  Create visual connections between concepts for better understanding
                </p>
                <Button variant="outline" size="sm" className="w-full text-xs sm:text-sm">
                  <span className="hidden sm:inline">Try Free - Then $4.99/month</span>
                  <span className="sm:hidden">Free Trial - $4.99/mo</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">Four simple steps to transform your study experience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">1. Upload</h3>
              <p className="text-muted-foreground">Upload your lecture notes, PDFs, and study materials</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">2. AI Processing</h3>
              <p className="text-muted-foreground">Our AI analyzes and understands your content</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">3. Study Tools</h3>
              <p className="text-muted-foreground">Generate summaries, exams, and study materials</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">4. Academic Success</h3>
              <p className="text-muted-foreground">Achieve better grades with efficient studying</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8">Why Students Choose Summary+</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">75%</div>
              <p className="text-muted-foreground">Less time studying</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">92%</div>
              <p className="text-muted-foreground">Improved test scores</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10k+</div>
              <p className="text-muted-foreground">Students helped</p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-8">
            <h3 className="text-xl font-semibold text-foreground mb-4">Our Design Philosophy</h3>
            <p className="text-muted-foreground text-pretty">
              We believe in the power of simplicity. Our ultra-minimalist design eliminates distractions, allowing you
              to focus entirely on what matters most: your learning. Every element serves a purpose, every interaction
              is intentional, and every feature is designed to enhance your academic journey without overwhelming you.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Transform Your Study Experience?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of students who are already studying smarter, not harder
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/dashboard">Get Started Free</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">S+</span>
              </div>
              <span className="text-xl font-semibold text-foreground">Summary+</span>
            </div>
            <div className="text-sm text-muted-foreground">© 2024 Summary+. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
