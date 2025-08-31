import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { UserProvider } from "@/lib/user-context"
import { SubscriptionProvider } from "@/lib/subscription-context"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Summary+ | Transform Your Notes Into Knowledge",
  description:
    "AI-powered study assistant for university students. Share notes, generate summaries, create practice exams, and boost your academic success.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${inter.variable} antialiased`}>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <UserProvider>
              <SubscriptionProvider>
                {children}
              </SubscriptionProvider>
            </UserProvider>
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
