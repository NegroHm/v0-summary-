'use client'

import { useState, useEffect } from 'react'

const universityAbbreviations = ['UDA', 'UTN', 'UC', 'UBA', 'UNC', 'UNLP']
const colors = [
  'text-red-500',
  'text-blue-500', 
  'text-green-500',
  'text-purple-500',
  'text-orange-500',
  'text-pink-500'
]

export function AnimatedUniversityHeader() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % universityAbbreviations.length)
        setIsVisible(true)
      }, 300)
    }, 2000) // Change every 2 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center px-2">
      <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
        <span className="block sm:inline">Summary + </span>
        <span 
          key={currentIndex}
          className={`inline-block transition-all duration-300 ease-in-out ${
            isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2'
          } ${colors[currentIndex]} font-extrabold drop-shadow-lg`}
        >
          {universityAbbreviations[currentIndex]}
        </span>
      </h1>
      <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
        AI-powered study platform for university students
      </p>
    </div>
  )
}