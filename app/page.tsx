import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { Brain, FileText, Map, Search, TrendingUp, Users, Upload, Zap, Target, Trophy } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">S+</span>
              </div>
              <span className="text-xl font-semibold text-foreground">Summary+</span>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button variant="outline" asChild>
                <Link href="/dashboard">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/dashboard">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6 text-balance">
            Transform your notes into knowledge with AI
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            The ultimate study companion for university students. Upload your notes, generate AI-powered summaries,
            create practice exams, and accelerate your academic success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/dashboard">Get Started Free</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">Powerful AI Study Tools</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to transform your study experience and achieve academic excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">AI-Powered Summaries</h3>
                <p className="text-muted-foreground">
                  Instantly generate comprehensive summaries from your lecture notes and textbooks
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Practice Exam Generation</h3>
                <p className="text-muted-foreground">
                  Create custom practice tests and quizzes based on your study materials
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Map className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Smart Study Maps</h3>
                <p className="text-muted-foreground">
                  Visualize connections between concepts with AI-generated mind maps
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Intelligent Search</h3>
                <p className="text-muted-foreground">
                  Find specific information across all your notes with semantic search
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Progress Tracking</h3>
                <p className="text-muted-foreground">Monitor your study habits and track improvement over time</p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Collaborative Learning</h3>
                <p className="text-muted-foreground">Share notes and study together with classmates in your courses</p>
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
