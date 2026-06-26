export const revalidate = 0;

import Navbar from "@/components/Navbar";
import AppleBanner from "@/components/AppleBanner";
import PCsSection from "@/components/PCsSection";
import MonitorsSection from "@/components/MonitorsSection";
import AccessoriesSection from "@/components/AccessoriesSection";
import Footer from "@/components/Footer";
import { getHeroContent } from "@/lib/data";

import BrandsMarquee from "@/components/BrandsMarquee";

export default async function Home() {
  const heroContent = await getHeroContent();

  return (
    <div className="min-h-screen flex flex-col relative font-sans">
      <Navbar />

      <main className="flex-1">
        <AppleBanner initialData={heroContent} />

        {/* Brands Marquee */}
        <BrandsMarquee />

        {/* Subtle separator */}
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="h-px w-full bg-white/5" />
        </div>

        {/* Product Sections */}
        <PCsSection />
        
        {/* Subtle separator */}
        <div className="max-w-4xl mx-auto px-8 w-full py-8">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <MonitorsSection />
        
        {/* Subtle separator */}
        <div className="max-w-4xl mx-auto px-8 w-full py-8">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <AccessoriesSection />
      </main>

      <Footer />
    </div>
  );
}
