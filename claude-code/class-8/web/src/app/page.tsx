import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { FlashDeals } from "@/components/flash-deals";
import { HowItWorks } from "@/components/how-it-works";
import { PopularItems } from "@/components/popular-items";
import { FeaturedRestaurants } from "@/components/featured-restaurants";
import { SearchByFood } from "@/components/search-by-food";
import { FeaturesStrip } from "@/components/features-strip";
import { AppDownload } from "@/components/app-download";
import { BestDeals } from "@/components/best-deals";
import { CtaBanner } from "@/components/cta-banner";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <FlashDeals />
        <HowItWorks />
        <PopularItems />
        <FeaturedRestaurants />
        <SearchByFood />
        <div className="bg-white pt-4 md:pt-8">
          <FeaturesStrip />
        </div>
        <AppDownload />
        <BestDeals />
        <CtaBanner />
      </main>
      <SiteFooter />
    </>
  );
}
