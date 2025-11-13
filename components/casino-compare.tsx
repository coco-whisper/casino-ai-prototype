"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { casinos, type Casino } from "@/lib/casino-data"
import { Star, CheckCircle2, X, Sparkles, Trophy, CreditCard, Gamepad2, Gift, Globe } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

export function CasinoCompare() {
  const [selectedCasinos, setSelectedCasinos] = useState<Casino[]>([])
  const [showAnalysis, setShowAnalysis] = useState(false)

  const availableCasinos = casinos.filter((c) => !selectedCasinos.find((sc) => sc.id === c.id))

  const addCasino = (casinoId: string) => {
    if (selectedCasinos.length >= 3) return
    const casino = casinos.find((c) => c.id === casinoId)
    if (casino) {
      setSelectedCasinos([...selectedCasinos, casino])
      setShowAnalysis(false)
    }
  }

  const removeCasino = (casinoId: string) => {
    setSelectedCasinos(selectedCasinos.filter((c) => c.id !== casinoId))
    setShowAnalysis(false)
  }

  const analyzeComparison = () => {
    setShowAnalysis(true)
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[0, 1, 2].map((index) => (
          <Card key={index} className="overflow-hidden border-2 hover:border-primary/50 transition-colors">
            {selectedCasinos[index] ? (
              <div className="relative">
                <div className="h-32 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative overflow-hidden">
                  <Image
                    src={selectedCasinos[index].logo || "/placeholder.svg"}
                    alt={selectedCasinos[index].name}
                    width={120}
                    height={80}
                    className="object-contain"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 bg-background/80 hover:bg-background"
                    onClick={() => removeCasino(selectedCasinos[index].id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-lg">{selectedCasinos[index].name}</h3>
                    {selectedCasinos[index].verified && (
                      <Badge className="bg-primary text-primary-foreground">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(selectedCasinos[index].rating)
                            ? "fill-primary text-primary"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                    <span className="text-sm font-semibold ml-1">{selectedCasinos[index].rating}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {selectedCasinos[index].bonuses.slice(0, 2).map((bonus, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {bonus}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Select onValueChange={addCasino}>
                <SelectTrigger className="h-full min-h-[240px] border-2 border-dashed hover:border-primary/50 transition-colors">
                  <SelectValue
                    placeholder={
                      <div className="flex flex-col items-center justify-center gap-3 py-8">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <Sparkles className="w-8 h-8 text-primary" />
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-lg mb-1">Casino Slot {index + 1}</div>
                          <p className="text-sm text-muted-foreground">Click to select a casino</p>
                        </div>
                      </div>
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {availableCasinos.map((casino) => (
                    <SelectItem key={casino.id} value={casino.id}>
                      <div className="flex items-center gap-3 py-1">
                        <Image
                          src={casino.logo || "/placeholder.svg"}
                          alt={casino.name}
                          width={40}
                          height={30}
                          className="object-contain"
                        />
                        <div>
                          <div className="font-medium">{casino.name}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <Star className="w-3 h-3 fill-primary text-primary" />
                            {casino.rating}
                          </div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button
          onClick={analyzeComparison}
          disabled={selectedCasinos.length < 2}
          size="lg"
          className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold px-8 py-6 text-lg disabled:from-muted disabled:to-muted"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          {selectedCasinos.length < 2 ? "Select at least 2 casinos" : "Analyze & Compare"}
        </Button>
      </div>

      {showAnalysis && selectedCasinos.length >= 2 && (
        <div className="space-y-6">
          {/* Quick Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedCasinos.map((casino, idx) => (
              <Card
                key={casino.id}
                className={`p-6 relative overflow-hidden ${idx === 0 ? "border-primary border-2" : ""}`}
              >
                {idx === 0 && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-primary text-primary-foreground">
                      <Trophy className="w-3 h-3 mr-1" />
                      Best Choice
                    </Badge>
                  </div>
                )}
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={casino.logo || "/placeholder.svg"}
                    alt={casino.name}
                    width={60}
                    height={40}
                    className="object-contain"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{casino.name}</h3>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(casino.rating) ? "fill-primary text-primary" : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                      <span className="text-sm font-semibold ml-1">{casino.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Gift className="w-4 h-4 text-primary" />
                    <span>{casino.bonuses.length} bonuses available</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Gamepad2 className="w-4 h-4 text-primary" />
                    <span>{casino.gameTypes.length} game types</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Payments Comparison */}
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                Payment Methods
              </h3>
              <div className="space-y-3">
                {selectedCasinos.map((casino) => (
                  <div key={casino.id} className="space-y-2">
                    <div className="font-medium text-sm">{casino.name}</div>
                    <div className="flex flex-wrap gap-2">
                      {casino.payments.map((payment) => (
                        <Badge key={payment} variant="secondary" className="text-xs">
                          {payment}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Game Types Comparison */}
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-primary" />
                Game Types
              </h3>
              <div className="space-y-3">
                {selectedCasinos.map((casino) => (
                  <div key={casino.id} className="space-y-2">
                    <div className="font-medium text-sm">{casino.name}</div>
                    <div className="flex flex-wrap gap-2">
                      {casino.gameTypes.map((game) => (
                        <Badge key={game} variant="secondary" className="text-xs">
                          {game}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Bonuses Comparison */}
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Gift className="w-5 h-5 text-primary" />
                Welcome Bonuses
              </h3>
              <div className="space-y-3">
                {selectedCasinos.map((casino) => (
                  <div key={casino.id} className="p-3 bg-secondary rounded-lg">
                    <div className="font-medium text-sm mb-1">{casino.name}</div>
                    <div className="text-primary font-bold">{casino.bonuses[0]}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Countries Comparison */}
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                Available Countries
              </h3>
              <div className="space-y-3">
                {selectedCasinos.map((casino) => (
                  <div key={casino.id} className="space-y-2">
                    <div className="font-medium text-sm">{casino.name}</div>
                    <div className="flex flex-wrap gap-2">
                      {casino.countries.map((country) => (
                        <Badge key={country} variant="outline" className="text-xs">
                          {country}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card className="p-8 bg-gradient-to-br from-primary/10 via-background to-background border-primary/30">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-2xl mb-3">AI Recommendation</h3>
                <div className="space-y-4">
                  {(() => {
                    const bestRated = selectedCasinos.reduce((prev, current) =>
                      current.rating > prev.rating ? current : prev,
                    )
                    const mostBonuses = selectedCasinos.reduce((prev, current) =>
                      current.bonuses.length > prev.bonuses.length ? current : prev,
                    )
                    const mostPayments = selectedCasinos.reduce((prev, current) =>
                      current.payments.length > prev.payments.length ? current : prev,
                    )

                    return (
                      <>
                        <div className="p-4 bg-background rounded-lg border border-primary/20">
                          <div className="flex items-center gap-2 mb-2">
                            <Trophy className="w-5 h-5 text-primary" />
                            <h4 className="font-semibold">Overall Winner</h4>
                          </div>
                          <p className="text-primary font-bold text-lg mb-1">{bestRated.name}</p>
                          <p className="text-sm text-muted-foreground">
                            With a rating of {bestRated.rating}/5.0, this casino offers the best overall experience with
                            excellent reliability and user satisfaction.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 bg-background rounded-lg">
                            <h4 className="font-semibold mb-2 text-sm">Best for Bonuses</h4>
                            <p className="text-primary font-medium">{mostBonuses.name}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {mostBonuses.bonuses.length} different bonus offers
                            </p>
                          </div>

                          <div className="p-4 bg-background rounded-lg">
                            <h4 className="font-semibold mb-2 text-sm">Most Payment Options</h4>
                            <p className="text-primary font-medium">{mostPayments.name}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {mostPayments.payments.length} payment methods supported
                            </p>
                          </div>
                        </div>
                      </>
                    )
                  })()}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
