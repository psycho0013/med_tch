export const revalidate = 0;

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AndroidSection from "@/components/AndroidSection";
import IOSSection from "@/components/IOSSection";
import LaptopsSection from "@/components/LaptopsSection";
import PCsSection from "@/components/PCsSection";
import AppleWatchesSection from "@/components/AppleWatchesSection";
import OtherWatchesSection from "@/components/OtherWatchesSection";
import MonitorsSection from "@/components/MonitorsSection";
import AccessoriesSection from "@/components/AccessoriesSection";
import OffersSection from "@/components/OffersSection";
import Assistant from "@/components/Assistant";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative font-sans">
      <Navbar />

      <main className="flex-1">
        <Hero />

        {/* Subtle separator */}
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="h-px w-full bg-slate-200" />
        </div>

        {/* Expanded Product Sections */}
        <AndroidSection />
        <IOSSection />

        {/* Subtle separator */}
        <div className="max-w-4xl mx-auto px-8 w-full py-8">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
        </div>

        <LaptopsSection />
        <PCsSection />
        <MonitorsSection />
        {/* Subtle separator */}
        <div className="max-w-4xl mx-auto px-8 w-full py-8">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
        </div>

        {/* Watches Section */}
        <AppleWatchesSection />
        <OtherWatchesSection />

        <OffersSection />
        <Assistant />
      </main>

      <Footer />
    </div>
  );
}
