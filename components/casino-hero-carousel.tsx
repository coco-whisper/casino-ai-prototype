"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const featuredCasinos = [
  {
    id: 1,
    name: "Lucky Spin Casino",
    image: "/casino-logo-lucky.jpg",
    offer: "100% up to $1000 + 50 Free Spins",
    rating: 4.8,
    highlight: "Exclusive Crypto Bonuses",
  },
  {
    id: 2,
    name: "Golden Dice Gaming",
    image: "/casino-logo-golden-dice.jpg",
    offer: "200% up to $2000 + No Deposit Bonus",
    rating: 4.6,
    highlight: "Best Esports Betting",
  },
  {
    id: 3,
    name: "Diamond Crown Casino",
    image: "/casino-logo-diamond.jpg",
    offer: "$3000 Welcome Package + 20% Cashback",
    rating: 4.9,
    highlight: "VIP Live Casino Experience",
  },
]

export function CasinoHeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredCasinos.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredCasinos.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredCasinos.length) % featuredCasinos.length)
  }

  return (
    <section className="bg-gradient-to-b from-background to-secondary/20 py-12">
      <div className="container mx-auto px-4">
        <div className="relative">
          <Card className="overflow-hidden border-primary/20">
            <div className="relative h-[400px] md:h-[500px]">
              {featuredCasinos.map((casino, index) => (
                <div
                  key={casino.id}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="h-full bg-gradient-to-r from-background via-background/95 to-background/80 flex items-center">
                    <div className="absolute inset-0 opacity-20">
                      <img
                        src={casino.image || "/placeholder.svg"}
                        alt={casino.name}
                        className="w-full h-full object-cover blur-sm"
                      />
                    </div>

                    <div className="relative z-10 container mx-auto px-8 md:px-16">
                      <div className="max-w-2xl space-y-6">
                        <div className="inline-flex items-center gap-2 bg-primary/20 px-4 py-2 rounded-full border border-primary/40">
                          <Star className="w-4 h-4 fill-primary text-primary" />
                          <span className="text-sm font-semibold text-primary">Featured Casino</span>
                        </div>

                        <h2 className="text-5xl md:text-6xl font-bold text-balance">{casino.name}</h2>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${
                                  i < Math.floor(casino.rating) ? "fill-primary text-primary" : "text-muted"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-lg font-semibold">{casino.rating}/5</span>
                        </div>

                        <p className="text-2xl text-primary font-semibold">{casino.offer}</p>

                        <p className="text-lg text-muted-foreground">{casino.highlight}</p>

                        <div className="flex gap-4">
                          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                            Claim Bonus
                          </Button>
                          <Button size="lg" variant="outline">
                            Learn More
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-background hover:border-primary"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-background hover:border-primary"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {featuredCasinos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? "bg-primary w-8" : "bg-muted hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
