import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  Clock4,
  GaugeCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { CasinoCompare } from "@/components/casino-compare";
import { CompareHeroCarousel } from "@/components/compare-hero-carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Benefit = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type Step = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type Signal = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const heroBenefits: Benefit[] = [
  {
    title: "AI-Powered Insights",
    description:
      "Score casinos by bonuses, games, payments, and trust signals in seconds.",
    icon: Sparkles,
  },
  {
    title: "Verified & Transparent",
    description:
      "Every casino is vetted for safety, fairness, and responsible gaming.",
    icon: ShieldCheck,
  },
  {
    title: "Live Bonus Tracking",
    description:
      "See which operators currently deliver the biggest welcome offers.",
    icon: Clock4,
  },
];

const processSteps: Step[] = [
  {
    title: "Choose Casinos",
    description: "Pick two or three casinos you want to evaluate side-by-side.",
    icon: CheckCircle2,
  },
  {
    title: "Compare Everything",
    description:
      "Review bonuses, game libraries, payment options, and country coverage.",
    icon: BarChart3,
  },
  {
    title: "Get AI Advice",
    description:
      "Let our assistant highlight the best fit based on your priorities.",
    icon: Bot,
  },
];

const trustSignals: Signal[] = [
  {
    title: "25+ Casinos Vetted",
    description:
      "Only licensed, reputable brands pass our internal compliance checks.",
    icon: ShieldCheck,
  },
  {
    title: "6K+ Comparisons Run",
    description:
      "Players rely on our tool to uncover the strongest offers every week.",
    icon: GaugeCircle,
  },
  {
    title: "Real-Time Updates",
    description:
      "Bonus data refreshes automatically when casinos change their deals.",
    icon: Clock4,
  },
];

const highlightStats = [
  { value: "25+", label: "Verified casinos" },
  { value: "60+", label: "Bonus offers tracked" },
  { value: "40+", label: "Payment methods covered" },
  { value: "6k+", label: "AI comparisons run" },
];

export default function ComparePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),transparent_55%)]" />
        <div className="relative container mx-auto px-4 pb-16 pt-20 lg:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_minmax(0,1fr)]">
            <div className="space-y-8">
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary hover:bg-primary/10"
              >
                AI Casino Intelligence
              </Badge>
              <div className="space-y-5">
                <h1 className="text-4xl font-bold tracking-tight text-balance md:text-5xl lg:text-6xl">
                  Compare Casinos{" "}
                  <span className="text-primary">Side-by-Side</span> with AI
                  Clarity
                </h1>
                <p className="text-lg text-muted-foreground md:text-xl">
                  Cut through the noise and discover which casino truly fits
                  your playstyle. Our AI engine analyses bonuses, games,
                  payments, and compliance so you can join with confidence.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {heroBenefits.map((benefit) => (
                  <div
                    key={benefit.title}
                    className="group rounded-2xl border bg-background/80 p-5 shadow-sm backdrop-blur transition hover:border-primary/40 hover:shadow-lg"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <benefit.icon className="h-6 w-6" />
                    </div>
                    <h2 className="text-lg font-semibold">{benefit.title}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <Button size="lg" className="gap-2" asChild>
                  <Link href="#compare-tool">
                    Start Comparing
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="gap-2" asChild>
                  <Link href="#how-it-works">See How It Works</Link>
                </Button>
                <Badge variant="outline" className="bg-background/80">
                  <Sparkles className="mr-1 h-4 w-4 text-primary" />
                  Updated daily
                </Badge>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {highlightStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border bg-background/70 p-4 text-center backdrop-blur"
                  >
                    <div className="text-2xl font-bold text-primary md:text-3xl">
                      {stat.value}
                    </div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl lg:h-56 lg:w-56" />
              <div className="relative rounded-3xl border border-primary/10 bg-background/70 p-3 shadow-lg backdrop-blur">
                <CompareHeroCarousel />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="container mx-auto px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr,1.1fr]">
          <div className="space-y-6">
            <Badge
              variant="outline"
              className="w-fit bg-primary/5 text-primary"
            >
              How it works
            </Badge>
            <h2 className="text-3xl font-bold md:text-4xl">
              Find your best-fit casino in three guided steps.
            </h2>
            <p className="text-muted-foreground md:text-lg">
              Our comparison engine was built with seasoned players and
              newcomers in mind. Just select the casinos you have in mind and
              we&apos;ll surface the differences that matter.
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              {trustSignals.map((signal) => (
                <div
                  key={signal.title}
                  className="rounded-2xl border bg-background/80 p-5 backdrop-blur"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <signal.icon className="h-5 w-5" />
                  </div>
                  <div className="font-semibold">{signal.title}</div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {signal.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 rounded-3xl border bg-background/70 p-8 shadow-sm backdrop-blur">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className="group grid gap-4 rounded-2xl border border-dashed border-muted-foreground/30 bg-background/80 p-6 transition hover:border-primary/40 hover:bg-background"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                      Step {index + 1}
                    </p>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground md:text-base">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="compare-tool" className="relative py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.08),transparent_60%)]" />
        <div className="relative container mx-auto px-4">
          <div className="mx-auto max-w-5xl rounded-[32px] border border-primary/20 bg-background/80 p-6 shadow-xl backdrop-blur md:p-10">
            <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <Badge
                  variant="outline"
                  className="mb-3 bg-primary/5 text-primary"
                >
                  Your comparison cockpit
                </Badge>
                <h2 className="text-3xl font-bold md:text-4xl">
                  Launch the Casino Comparison
                </h2>
                <p className="mt-3 max-w-2xl text-muted-foreground md:text-lg">
                  Add up to three casinos to compare their headline bonuses,
                  loyalty perks, payment methods, game selection, and regional
                  availability—then let AI highlight the winner for you.
                </p>
              </div>
              <Button size="lg" className="gap-2" asChild>
                <Link href="#compare-tool">
                  Start now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <CasinoCompare />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20">
        <div className="rounded-3xl border bg-background/80 p-10 text-center shadow-sm backdrop-blur">
          <h3 className="text-2xl font-semibold md:text-3xl">
            Need a personalised recommendation?
          </h3>
          <p className="mt-3 text-muted-foreground md:text-lg">
            Share your favourite games, budget, and preferred payment methods
            with our concierge team and receive a tailored short-list within
            minutes.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button size="lg" className="gap-2" variant="outline" asChild>
              <Link href="/contact">
                Talk to casino expert
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Response time &lt; 10 minutes
            </Badge>
          </div>
        </div>
      </section>
    </main>
  );
}
