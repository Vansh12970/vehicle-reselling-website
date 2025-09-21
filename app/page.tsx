import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutUsSection } from "@/components/about-us-section"
import { WhyChooseSection } from "@/components/why-choose-section"
import { CustomerReviewsSection } from "@/components/customer-reviews-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <AboutUsSection />
        <WhyChooseSection />
        <CustomerReviewsSection />
      </main>
      <Footer />
    </div>
  )
}
