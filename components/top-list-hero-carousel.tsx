"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { casinos } from "@/lib/casino-data"
import { ChevronLeft, ChevronRight, Star, Trophy, CheckCircle2, TrendingUp } from "lucide-react"

export function TopListHeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const topCasinos = casinos.slice(0, 5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % topCasinos.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [topCasinos.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % topCasinos.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + topCasinos.length) % topCasinos.length)
  }

  return (
    <section className="relative bg-gradient-to-br from-background via-background to-primary/5 py-16 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-primary/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
            <Trophy className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">Top Rated Casinos 2024</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-balance bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Best Online Casinos
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the highest-rated casinos with exclusive bonuses and premium gaming experiences
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {topCasinos.map((casino, index) => (
                <div key={casino.id} className="w-full flex-shrink-0">
                  <Card className="bg-gradient-to-br from-card to-card/50 border-2 border-primary/20 p-8 md:p-12">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                      {/* Left Side - Casino Info */}
                      <div className="space-y-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center text-3xl font-bold text-primary-foreground shadow-lg">
                              {index + 1}
                            </div>
                            {casino.verified && (
                              <div className="flex flex-col items-start">
                                <CheckCircle2 className="w-6 h-6 text-primary mb-1" />
                                <span className="text-xs text-primary font-semibold">Verified</span>
                              </div>
                            )}
                          </div>
                          {index === 0 && (
                            <Badge className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-sm py-1 px-3">
                              <Trophy className="w-4 h-4 mr-1" />
                              Top Choice
                            </Badge>
                          )}
                        </div>

                        <div>
                          <h2 className="text-4xl font-bold mb-3">{casino.name}</h2>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-5 h-5 ${
                                    i < Math.floor(casino.rating)
                                      ? "fill-primary text-primary"
                                      : "text-muted-foreground/30"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-2xl font-bold text-primary">{casino.rating}</span>
                            <span className="text-sm text-muted-foreground">(2,450 reviews)</span>
                          </div>
                          <p className="text-muted-foreground leading-relaxed">{casino.description}</p>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
                            <div className="text-2xl font-bold text-primary mb-1">{casino.bonuses.length}+</div>
                            <div className="text-xs text-muted-foreground">Bonus Offers</div>
                          </div>
                          <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
                            <div className="text-2xl font-bold text-primary mb-1">{casino.gameTypes.length}</div>
                            <div className="text-xs text-muted-foreground">Game Categories</div>
                          </div>
                          <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
                            <div className="text-2xl font-bold text-primary mb-1">{casino.payments.length}</div>
                            <div className="text-xs text-muted-foreground">Payment Options</div>
                          </div>
                          <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
                            <div className="text-2xl font-bold text-primary mb-1">{casino.providers.length}</div>
                            <div className="text-xs text-muted-foreground">Game Providers</div>
                          </div>
                        </div>

                        <Button
                          size="lg"
                          className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground text-lg font-semibold shadow-lg shadow-primary/20"
                        >
                          <TrendingUp className="w-5 h-5 mr-2" />
                          Visit Casino Now
                        </Button>
                      </div>

                      {/* Right Side - Featured Info */}
                      <div className="space-y-4">
                        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20">
                          <div className="text-sm font-semibold text-primary mb-2">Welcome Bonus</div>
                          <div className="text-2xl font-bold mb-4">{casino.bonuses[0]}</div>
                          <div className="space-y-2">
                            {casino.bonuses.slice(1, 4).map((bonus, i) => (
                              <div key={i} className="flex items-start gap-2 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                <span className="text-muted-foreground">{bonus}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Card className="p-6 bg-card/50">
                          <div className="text-sm font-semibold mb-3">Payment Methods</div>
                          <div className="flex flex-wrap gap-2">
                            {casino.payments.map((payment, i) => (
                              <Badge
                                key={i}
                                variant="secondary"
                                className="bg-primary/10 text-primary border-primary/20"
                              >
                                {payment}
                              </Badge>
                            ))}
                          </div>
                        </Card>

                        <Card className="p-6 bg-card/50">
                          <div className="text-sm font-semibold mb-3">Popular Games</div>
                          <div className="flex flex-wrap gap-2">
                            {casino.gameTypes.slice(0, 4).map((game, i) => (
                              <Badge key={i} variant="outline">
                                {game}
                              </Badge>
                            ))}
                          </div>
                        </Card>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur border-2 border-primary/20 hover:bg-primary hover:border-primary hover:text-primary-foreground shadow-lg"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur border-2 border-primary/20 hover:bg-primary hover:border-primary hover:text-primary-foreground shadow-lg"
            onClick={nextSlide}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {topCasinos.map((_, index) => (
              <button
                key={index}
                className={`transition-all duration-300 ${
                  currentSlide === index ? "w-8 h-2 bg-primary" : "w-2 h-2 bg-muted-foreground/30"
                } rounded-full`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
