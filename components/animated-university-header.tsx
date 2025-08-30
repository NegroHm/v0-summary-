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
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center">
      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6">
        Summary +{' '}
        <span 
          className={`inline-block transition-all duration-300 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          } ${colors[currentIndex]} font-extrabold`}
        >
          {universityAbbreviations[currentIndex]}
        </span>
      </h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
        La plataforma de estudios impulsada por IA para estudiantes universitarios
      </p>
    </div>
  )
}