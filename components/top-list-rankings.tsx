"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { casinos } from "@/lib/casino-data"
import { Star, CheckCircle2, Trophy, TrendingUp, Award, ChevronRight, Sparkles } from "lucide-react"

type SortOption = "rating" | "bonuses" | "payments" | "games"

export function TopListRankings() {
  const [sortBy, setSortBy] = useState<SortOption>("rating")

  const sortedCasinos = [...casinos].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "bonuses":
        return b.bonuses.length - a.bonuses.length
      case "payments":
        return b.payments.length - a.payments.length
      case "games":
        return b.gameTypes.length - a.gameTypes.length
      default:
        return 0
    }
  })

  const topThree = sortedCasinos.slice(0, 3)
  const restOfList = sortedCasinos.slice(3)

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 animate-pulse">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-primary">Updated Daily</span>
        </div>
        <h2 className="text-4xl font-bold">Complete Casino Rankings</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Compare and discover the best online casinos ranked by various metrics
        </p>
      </div>

      <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-primary/20">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span className="font-semibold">Sort Rankings By:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              variant={sortBy === "rating" ? "default" : "outline"}
              onClick={() => setSortBy("rating")}
              className={`transition-all ${
                sortBy === "rating"
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "hover:border-primary/50"
              }`}
            >
              <Star className="w-4 h-4 mr-2" />
              User Rating
            </Button>
            <Button
              variant={sortBy === "bonuses" ? "default" : "outline"}
              onClick={() => setSortBy("bonuses")}
              className={`transition-all ${
                sortBy === "bonuses"
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "hover:border-primary/50"
              }`}
            >
              <Award className="w-4 h-4 mr-2" />
              Bonus Offers
            </Button>
            <Button
              variant={sortBy === "payments" ? "default" : "outline"}
              onClick={() => setSortBy("payments")}
              className={`transition-all ${
                sortBy === "payments"
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "hover:border-primary/50"
              }`}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Payment Options
            </Button>
            <Button
              variant={sortBy === "games" ? "default" : "outline"}
              onClick={() => setSortBy("games")}
              className={`transition-all ${
                sortBy === "games"
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "hover:border-primary/50"
              }`}
            >
              <Trophy className="w-4 h-4 mr-2" />
              Game Variety
            </Button>
          </div>
        </div>
      </Card>

      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-2">Top 3 Winners</h3>
          <p className="text-muted-foreground">The absolute best casinos this month</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topThree.map((casino, index) => {
            const rankColors = [
              "from-yellow-500/20 via-yellow-400/10 to-yellow-600/20 border-yellow-500/40",
              "from-gray-400/20 via-gray-300/10 to-gray-500/20 border-gray-400/40",
              "from-amber-700/20 via-amber-600/10 to-amber-800/20 border-amber-700/40",
            ]
            const rankIcons = ["🥇", "🥈", "🥉"]
            const rankLabels = ["Winner", "Runner-up", "Third Place"]
            const podiumHeights = ["md:mt-0", "md:mt-6", "md:mt-6"]
            const scaleClasses = ["md:scale-105", "md:scale-100", "md:scale-100"]

            return (
              <Card
                key={casino.id}
                className={`${scaleClasses[index]} p-8 bg-gradient-to-br ${rankColors[index]} border-2 ${podiumHeights[index]} relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 group`}
              >
                <div className="absolute top-0 right-0 text-8xl opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  {rankIcons[index]}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center text-2xl font-bold text-primary-foreground shadow-lg">
                        {index + 1}
                      </div>
                      {casino.verified && (
                        <div className="flex flex-col items-center">
                          <CheckCircle2 className="w-6 h-6 text-primary" />
                          <span className="text-xs text-primary font-semibold mt-1">Verified</span>
                        </div>
                      )}
                    </div>
                    <Badge className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
                      {index === 0 && <Trophy className="w-3 h-3 mr-1" />}
                      {rankLabels[index]}
                    </Badge>
                  </div>

                  <div className="w-32 h-32 bg-background rounded-xl flex items-center justify-center mx-auto overflow-hidden shadow-lg border-2 border-primary/20">
                    <img
                      src={casino.logo || "/placeholder.svg"}
                      alt={casino.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="text-center space-y-4">
                    <h3 className="text-2xl font-bold">{casino.name}</h3>
                    <div className="flex items-center justify-center gap-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(casino.rating) ? "fill-primary text-primary" : "text-muted-foreground/30"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xl font-bold text-primary">{casino.rating}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{casino.description}</p>

                    <div className="space-y-3 pt-2">
                      <div className="text-sm font-semibold text-primary bg-primary/10 px-4 py-3 rounded-lg border border-primary/20">
                        {casino.bonuses[0]}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-card/50 px-3 py-2 rounded">
                          <div className="font-bold text-primary">{casino.payments.length}</div>
                          <div className="text-muted-foreground">Payments</div>
                        </div>
                        <div className="bg-card/50 px-3 py-2 rounded">
                          <div className="font-bold text-primary">{casino.gameTypes.length}</div>
                          <div className="text-muted-foreground">Game Types</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-lg group-hover:shadow-primary/30 transition-all">
                    Visit Casino
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-2">All Casino Rankings</h3>
          <p className="text-muted-foreground">Comprehensive list of all rated casinos</p>
        </div>

        {sortedCasinos.map((casino, index) => (
          <Card
            key={casino.id}
            className={`p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 group ${
              index < 3 ? "border-primary/30 bg-gradient-to-r from-card to-card/80" : ""
            }`}
          >
            <div className="flex flex-col lg:flex-row gap-6 items-start">
              <div className="flex-shrink-0">
                <div
                  className={`w-20 h-20 rounded-xl flex items-center justify-center text-3xl font-bold shadow-lg transition-transform group-hover:scale-110 ${
                    index < 3
                      ? "bg-gradient-to-br from-primary to-primary/70 text-primary-foreground"
                      : "bg-secondary text-foreground"
                  }`}
                >
                  {index + 1}
                </div>
              </div>

              <div className="flex-shrink-0">
                <div className="w-28 h-28 bg-secondary rounded-xl flex items-center justify-center overflow-hidden border-2 border-primary/20 shadow-md">
                  <img
                    src={casino.logo || "/placeholder.svg"}
                    alt={casino.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-2xl font-bold">{casino.name}</h3>
                      {casino.verified && <CheckCircle2 className="w-5 h-5 text-primary" />}
                      {casino.featured && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                          Featured
                        </Badge>
                      )}
                      {index < 3 && (
                        <Badge className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
                          <Trophy className="w-3 h-3 mr-1" />
                          Top {index + 1}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(casino.rating) ? "fill-primary text-primary" : "text-muted-foreground/30"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-lg font-bold text-primary">{casino.rating}/5</span>
                      <span className="text-sm text-muted-foreground">(1,250+ reviews)</span>
                    </div>
                  </div>

                  <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground whitespace-nowrap shadow-lg group-hover:shadow-primary/20">
                    Visit Casino
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                <p className="text-muted-foreground leading-relaxed">{casino.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
                    <div className="font-semibold text-primary mb-1 text-sm">Welcome Bonus</div>
                    <div className="text-sm text-foreground font-medium">{casino.bonuses[0]}</div>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
                    <div className="font-semibold text-primary mb-1 text-sm">Payment Methods</div>
                    <div className="text-sm text-foreground font-medium">{casino.payments.length} options</div>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
                    <div className="font-semibold text-primary mb-1 text-sm">Game Types</div>
                    <div className="text-sm text-foreground font-medium">{casino.gameTypes.length} categories</div>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
                    <div className="font-semibold text-primary mb-1 text-sm">Providers</div>
                    <div className="text-sm text-foreground font-medium">{casino.providers.join(", ")}</div>
                  </div>
                </div>

                {casino.bonuses.length > 1 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {casino.bonuses.slice(1, 4).map((bonus, i) => (
                      <Badge key={i} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        {bonus}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
