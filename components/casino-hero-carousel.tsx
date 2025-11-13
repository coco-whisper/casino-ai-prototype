"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import PokerCarouselImage from "@/public/assets/images/poker.jpg";
import CasinoCarouselImage from "@/public/assets/images/casino.jpg";
import SlotsCarouselImage from "@/public/assets/images/slots.jpg";
import LiveCasinoCarouselImage from "@/public/assets/images/casino-live.jpg";
import PokerCasinoCarouselImage from "@/public/assets/images/casino-poker.jpg";
import CafeCasinoCarouselImage from "@/public/assets/images/casino-cafe.jpg";

const featuredCasinos = [
  {
    id: 1,
    name: "Lucky Spin Casino",
    image: PokerCarouselImage,
    offer: "100% up to $1000 + 50 Free Spins",
    rating: 4.8,
    highlight: "Exclusive Crypto Bonuses",
  },
  {
    id: 2,
    name: "Golden Dice Gaming",
    image: CasinoCarouselImage,
    offer: "200% up to $2000 + No Deposit Bonus",
    rating: 4.6,
    highlight: "Best Esports Betting",
  },
  {
    id: 3,
    name: "Diamond Crown Casino",
    image: SlotsCarouselImage,
    offer: "$3000 Welcome Package + 20% Cashback",
    rating: 4.9,
    highlight: "VIP Live Casino Experience",
  },
  {
    id: 4,
    name: "Live Casino",
    image: LiveCasinoCarouselImage,
    offer: "100% up to $1000 + 50 Free Spins",
    rating: 4.8,
    highlight: "Exclusive Crypto Bonuses",
  },
  {
    id: 5,
    name: "Poker Casino",
    image: PokerCasinoCarouselImage,
    offer: "100% up to $1000 + 50 Free Spins",
    rating: 4.8,
    highlight: "Exclusive Crypto Bonuses",
  },
  {
    id: 6,
    name: "Cafe Casino",
    image: CafeCasinoCarouselImage,
    offer: "100% up to $1000 + 50 Free Spins",
    rating: 4.8,
    highlight: "Exclusive Crypto Bonuses",
  },
];

export function CasinoHeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredCasinos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredCasinos.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + featuredCasinos.length) % featuredCasinos.length
    );
  };

  return (
    <section className="bg-gradient-to-b from-background to-secondary/20 py-12">
      <div className="container mx-auto px-4">
        <div className="relative">
          <Card className="overflow-hidden border-0 py-0">
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
                        src={casino.image.src || "/placeholder.svg"}
                        alt={casino.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="relative z-10 container mx-auto px-8 md:px-16">
                      <div className="max-w-2xl space-y-6">
                        <div className="inline-flex items-center gap-2 bg-primary/20 px-4 py-2 rounded-full border border-primary/40">
                          <Star className="w-4 h-4 fill-primary text-primary" />
                          <span className="text-sm font-semibold text-primary">
                            Featured Casino
                          </span>
                        </div>

                        <h2 className="text-5xl md:text-6xl font-bold text-balance">
                          {casino.name}
                        </h2>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${
                                  i < Math.floor(casino.rating)
                                    ? "fill-primary text-primary"
                                    : "text-muted"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-lg font-semibold">
                            {casino.rating}/5
                          </span>
                        </div>

                        <p className="text-2xl text-primary font-semibold">
                          {casino.offer}
                        </p>

                        <p className="text-lg text-muted-foreground">
                          {casino.highlight}
                        </p>

                        <div className="flex gap-4">
                          <Button
                            size="lg"
                            className="bg-primary hover:bg-primary/90 text-primary-foreground"
                          >
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

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {featuredCasinos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide
                    ? "bg-primary w-8"
                    : "bg-muted hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
