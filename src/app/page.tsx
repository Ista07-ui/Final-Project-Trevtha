import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import SeasonalDeals from "@/components/SeasonalDeals";
import HotDealsPromo from "@/components/HotDealsPromo";
import CuratedActivities from "@/components/CuratedActivities";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1">
        <Hero />
        <section className="max-w-7xl mx-auto px-6 py-12">
          <Categories />
          <SeasonalDeals />
          <HotDealsPromo />
          <CuratedActivities />
        </section>
      </main>
      <Footer />
    </div>
  );
}
