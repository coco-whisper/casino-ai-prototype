"use client";

import type React from "react";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { casinos, filterOptions, type Casino } from "@/lib/casino-data";
import {
  Star,
  CheckCircle2,
  ChevronDown,
  Landmark,
  CreditCard,
  Gamepad2,
  Gift,
  Sparkles,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Image from "next/image";
import FishingGameBackgroundImage from "@/public/assets/images/filter-background/fishing-game.png";
import SlotsBackgroundImage from "@/public/assets/images/filter-background/slots.jpg";
import AustraliaFlagImage from "@/public/assets/images/countries/australia.jpg";
import BangladeshFlagImage from "@/public/assets/images/countries/bangladesh.jpg";
import BrazilFlagImage from "@/public/assets/images/countries/brazil.jpg";
import CanadaFlagImage from "@/public/assets/images/countries/canada.jpg";

const countryFlags: Record<string, string> = {
  Australia: "🇦🇺",
  Bangladesh: "🇧🇩",
  Brazil: "🇧🇷",
  Canada: "🇨🇦",
};

const countryBackgrounds: Record<string, string> = {
  Australia: AustraliaFlagImage.src,
  Bangladesh: BangladeshFlagImage.src,
  Brazil: BrazilFlagImage.src,
  Canada: CanadaFlagImage.src,
};

const paymentIcons: Record<string, string> = {
  USDT: "/icons/usdt.svg",
  BITCOIN: "/icons/bitcoin.svg",
  ETHERIUM: "/icons/bitcoin.svg", // Using bitcoin icon for Ethereum as well
  "BANK VISA": "/icons/bank.svg",
  VISA: "/icons/visa.svg",
  PAYPAL: "/icons/paypal.svg",
};

const gameTypeIcons: Record<string, string> = {
  Slots: "/icons/slots.svg",
  "Live Casino": "/icons/live-casino.svg",
  Sports: "/icons/sports.svg",
  Esports: "/icons/esports.svg",
  "Fishing Games": "/icons/fishing.svg",
  Poker: "/icons/poker.svg",
  Lottery: "/icons/lottery.svg",
};

const gameTypeBackgrounds: Record<string, string> = {
  Slots: SlotsBackgroundImage.src,
  "Fishing Games": FishingGameBackgroundImage.src,
};

const bonusTypeIcons: Record<string, string> = {
  "Welcome Bonus": "/icons/welcome-bonus.svg",
  "No Deposit Bonus": "/icons/no-deposit-bonus.svg",
  "Free Credit Casinos": "/icons/free.svg", // Updated to use new free-bonus icon
  "Cashback Bonus": "/icons/cash.svg",
  Reload: "/icons/reload.svg",
  "Daily Bonus": "/icons/daily.svg",
  VIP: "/icons/vip.svg",
  "Crypto Deposit Bonus": "/icons/crypto.svg",
};

const providerLogos: Record<string, string> = {
  "PG Soft": "PG",
  "Pragmatic Play": "PP",
  JILI: "JL",
  Evolution: "EV",
};

type FilterCategory =
  | "countries"
  | "payments"
  | "gameTypes"
  | "bonusTypes"
  | "providers";

interface Filters {
  countries: string[];
  payments: string[];
  gameTypes: string[];
  bonusTypes: string[];
  providers: string[];
}

export function CasinoFilters() {
  const [filters, setFilters] = useState<Filters>({
    countries: [],
    payments: [],
    gameTypes: [],
    bonusTypes: [],
    providers: [],
  });

  const [openFilters, setOpenFilters] = useState<
    Record<FilterCategory, boolean>
  >({
    countries: true,
    payments: true,
    gameTypes: true,
    bonusTypes: true,
    providers: true,
  });

  const toggleFilter = (category: FilterCategory, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((v) => v !== value)
        : [...prev[category], value],
    }));
  };

  const clearFilters = () => {
    setFilters({
      countries: [],
      payments: [],
      gameTypes: [],
      bonusTypes: [],
      providers: [],
    });
  };

  const filteredCasinos = useMemo(() => {
    return casinos.filter((casino) => {
      if (filters.countries.length > 0) {
        if (!filters.countries.some((c) => casino.countries.includes(c)))
          return false;
      }
      if (filters.payments.length > 0) {
        if (!filters.payments.some((p) => casino.payments.includes(p)))
          return false;
      }
      if (filters.gameTypes.length > 0) {
        if (!filters.gameTypes.some((g) => casino.gameTypes.includes(g)))
          return false;
      }
      if (filters.bonusTypes.length > 0) {
        if (!filters.bonusTypes.some((b) => casino.bonusTypes.includes(b)))
          return false;
      }
      if (filters.providers.length > 0) {
        if (!filters.providers.some((p) => casino.providers.includes(p)))
          return false;
      }
      return true;
    });
  }, [filters]);

  const activeFilterCount = Object.values(filters).flat().length;

  const FilterSection = ({
    title,
    category,
    options,
    iconMap,
    backgroundMap,
    icon: Icon,
  }: {
    title: string;
    category: FilterCategory;
    options: string[];
    iconMap?: Record<string, string>;
    backgroundMap?: Record<string, string>;
    icon?: React.ComponentType<{ className?: string }>;
  }) => (
    <Collapsible
      open={openFilters[category]}
      onOpenChange={(open) =>
        setOpenFilters((prev) => ({ ...prev, [category]: open }))
      }
    >
      <CollapsibleTrigger className="w-full cursor-pointer">
        <div className="flex items-center justify-between py-3 hover:text-primary transition-colors">
          <div className="flex items-center gap-2">
            {Icon && <Icon className="w-4 h-4" />}
            <span className="font-semibold">{title}</span>
          </div>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              openFilters[category] ? "rotate-180" : ""
            }`}
          />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2 pb-4 cursor-pointer">
        <div className="grid grid-cols-1 gap-2">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => toggleFilter(category, option)}
              className={`w-full text-left px-3 py-3 rounded-lg cursor-pointer text-sm transition-all flex items-center gap-3 relative overflow-hidden group ${
                filters[category].includes(option)
                  ? "text-primary shadow-md scale-[1.02] border-2 border-primary"
                  : "bg-secondary hover:bg-accent hover:scale-[1.01] border-2 border-transparent"
              }`}
            >
              {backgroundMap && backgroundMap[option] && (
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 group-hover:opacity-40 transition-opacity"
                  style={{
                    backgroundImage: `url(${backgroundMap[option]})`,
                  }}
                />
              )}
              <div
                className={`absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity ${
                  filters[category].includes(option) ? "opacity-30" : ""
                }`}
                style={{
                  background:
                    backgroundMap && backgroundMap[option]
                      ? "linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1))"
                      : "radial-gradient(circle at 30% 50%, rgba(184, 244, 0, 0.15) 0%, transparent 70%)",
                }}
              />

              {iconMap && (
                <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center relative z-10">
                  {iconMap[option]?.startsWith("/icons/") ? (
                    <Image
                      src={iconMap[option] || "/placeholder.svg"}
                      alt={option}
                      width={40}
                      height={40}
                      className="w-10 h-10 object-contain drop-shadow-lg"
                    />
                  ) : (
                    <span className="text-2xl drop-shadow-md">
                      {iconMap[option]}
                    </span>
                  )}
                </span>
              )}
              <span className="flex-1 relative z-10 font-medium">{option}</span>
              {filters[category].includes(option) && (
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 relative z-10" />
              )}
            </button>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Filters Sidebar */}
      <aside className="lg:col-span-1">
        <Card className="p-6 sticky top-20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg">Filters</h2>
            {activeFilterCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-xs"
              >
                Clear All
              </Button>
            )}
          </div>

          {activeFilterCount > 0 && (
            <div className="mb-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
              <div className="text-sm font-medium text-primary">
                {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""}{" "}
                active
              </div>
            </div>
          )}

          <div className="space-y-1 divide-y divide-border">
            <FilterSection
              title="Country"
              category="countries"
              options={filterOptions.countries}
              iconMap={countryFlags}
              backgroundMap={countryBackgrounds}
              icon={Landmark}
            />
            <FilterSection
              title="Payment Method"
              category="payments"
              options={filterOptions.payments}
              iconMap={paymentIcons}
              icon={CreditCard}
            />
            <FilterSection
              title="Game Type"
              category="gameTypes"
              options={filterOptions.gameTypes}
              iconMap={gameTypeIcons}
              backgroundMap={gameTypeBackgrounds}
              icon={Gamepad2}
            />
            <FilterSection
              title="Bonus Type"
              category="bonusTypes"
              options={filterOptions.bonusTypes}
              iconMap={bonusTypeIcons}
              icon={Gift}
            />
            <FilterSection
              title="Provider"
              category="providers"
              options={filterOptions.providers}
              iconMap={providerLogos}
              icon={Sparkles}
            />
          </div>
        </Card>
      </aside>

      {/* Casino List */}
      <div className="lg:col-span-3">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-muted-foreground">
            Showing {filteredCasinos.length} of {casinos.length} casinos
          </p>
        </div>

        <div className="space-y-4">
          {filteredCasinos.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">
                No casinos match your filters. Try adjusting your criteria.
              </p>
            </Card>
          ) : (
            filteredCasinos.map((casino) => (
              <CasinoCard key={casino.id} casino={casino} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function CasinoCard({ casino }: { casino: Casino }) {
  return (
    <Card className="p-6 hover:border-primary/50 transition-colors">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <div className="w-32 h-32 bg-secondary rounded-lg flex items-center justify-center overflow-hidden">
            <img
              src={casino.logo || "/placeholder.svg"}
              alt={casino.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-2xl font-bold">{casino.name}</h3>
                {casino.verified && (
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                )}
                {casino.featured && (
                  <Badge
                    variant="default"
                    className="bg-primary text-primary-foreground"
                  >
                    Featured
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(casino.rating)
                          ? "fill-primary text-primary"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold">{casino.rating}/5</span>
              </div>
            </div>

            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Visit Casino
            </Button>
          </div>

          <p className="text-muted-foreground">{casino.description}</p>

          <div className="space-y-3">
            <div>
              <div className="text-sm font-semibold mb-2">Bonuses:</div>
              <div className="flex flex-wrap gap-2">
                {casino.bonuses.map((bonus, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="bg-primary/10 text-primary border-primary/20"
                  >
                    {bonus}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="font-semibold mb-1">Payments</div>
                <div className="text-muted-foreground">
                  {casino.payments.slice(0, 3).join(", ")}
                  {casino.payments.length > 3 &&
                    ` +${casino.payments.length - 3}`}
                </div>
              </div>
              <div>
                <div className="font-semibold mb-1">Games</div>
                <div className="text-muted-foreground">
                  {casino.gameTypes.slice(0, 2).join(", ")}
                  {casino.gameTypes.length > 2 &&
                    ` +${casino.gameTypes.length - 2}`}
                </div>
              </div>
              <div>
                <div className="font-semibold mb-1">Providers</div>
                <div className="text-muted-foreground">
                  {casino.providers.slice(0, 2).join(", ")}
                  {casino.providers.length > 2 &&
                    ` +${casino.providers.length - 2}`}
                </div>
              </div>
              <div>
                <div className="font-semibold mb-1">Countries</div>
                <div className="text-muted-foreground">
                  {casino.countries.slice(0, 2).join(", ")}
                  {casino.countries.length > 2 &&
                    ` +${casino.countries.length - 2}`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
