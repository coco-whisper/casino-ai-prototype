import { CasinoCompare } from "@/components/casino-compare"
import { CompareHeroCarousel } from "@/components/compare-hero-carousel"

export default function ComparePage() {
  return (
    <main className="min-h-screen">
      <CompareHeroCarousel />

      <section className="container mx-auto px-4 py-12">
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-balance mb-4">
              Compare <span className="text-primary">Top Casinos</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Select 2-3 casinos and get an instant AI-powered comparison to find your perfect match
            </p>
          </div>

          <CasinoCompare />
        </div>
      </section>
    </main>
  )
}
