export const revalidate = 0;

import Navbar from "@/components/Navbar";
import AppleBanner from "@/components/AppleBanner";
import PCsSection from "@/components/PCsSection";
import MonitorsSection from "@/components/MonitorsSection";
import AccessoriesSection from "@/components/AccessoriesSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative font-sans">
      <Navbar />

      <main className="flex-1">
        <AppleBanner />

        {/* Subtle separator */}
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="h-px w-full bg-slate-200" />
        </div>

        {/* Product Sections */}
        <PCsSection />
        
        {/* Subtle separator */}
        <div className="max-w-4xl mx-auto px-8 w-full py-8">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
        </div>

        <MonitorsSection />
        
        {/* Subtle separator */}
        <div className="max-w-4xl mx-auto px-8 w-full py-8">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
        </div>

        <AccessoriesSection />
      </main>

      <Footer />
    </div>
  );
}
