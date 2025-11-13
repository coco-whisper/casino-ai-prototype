"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, TrendingUp, Award, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    icon: TrendingUp,
    title: "Smart Comparison",
    description: "Compare casinos side-by-side with AI-powered insights",
    gradient: "from-primary/20 to-cyan-500/20",
  },
  {
    icon: Award,
    title: "Find the Best Deals",
    description: "Discover which casino offers the highest bonuses and best games",
    gradient: "from-primary/20 to-blue-500/20",
  },
  {
    icon: Shield,
    title: "Verified & Trusted",
    description: "All casinos are verified for safety and reliability",
    gradient: "from-primary/20 to-purple-500/20",
  },
]

export function CompareHeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative w-full bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative container mx-auto px-4">
        <div className="h-[300px] flex items-center justify-center">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="h-full flex flex-col items-center justify-center text-center px-4">
                <div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${slide.gradient} flex items-center justify-center mb-6 border border-primary/20`}
                >
                  <slide.icon className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{slide.title}</h2>
                <p className="text-lg text-muted-foreground max-w-2xl text-pretty">{slide.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background"
          onClick={prevSlide}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background"
          onClick={nextSlide}
        >
          <ChevronRight className="w-5 h-5" />
        </Button>

        {/* Dots Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? "w-8 bg-primary" : "w-2 bg-primary/30"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
