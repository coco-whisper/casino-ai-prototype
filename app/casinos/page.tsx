import { CasinoFilters } from "@/components/casino-filters"
import { CasinoHeroCarousel } from "@/components/casino-hero-carousel"

export default function CasinosPage() {
  return (
    <main className="min-h-screen">
      <CasinoHeroCarousel />

      <section className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-balance">Casino Directory</h1>
            <p className="text-muted-foreground mt-2">Browse and filter through our verified casino partners</p>
          </div>

          <CasinoFilters />
        </div>
      </section>
    </main>
  )
}
