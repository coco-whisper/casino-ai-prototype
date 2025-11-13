import { TopListHeroCarousel } from "@/components/top-list-hero-carousel"
import { TopListRankings } from "@/components/top-list-rankings"

export default function TopListPage() {
  return (
    <main className="min-h-screen">
      <TopListHeroCarousel />

      <section className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-balance mb-3">Top Rated Casinos</h1>
            <p className="text-muted-foreground">
              Discover the highest-rated online casinos based on user reviews, bonuses, game selection, and overall
              experience
            </p>
          </div>

          <TopListRankings />
        </div>
      </section>
    </main>
  )
}
