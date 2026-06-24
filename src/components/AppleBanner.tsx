"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ShieldCheck, Truck, Headphones, Award } from "lucide-react";
import Link from "next/link";
import type { HeroContent } from "@/lib/types";

const defaultBanner: HeroContent = {
  id: 0,
  title: "أداء بلا حدود.\nتقنية بلا تنازل.",
  subtitle: "نختار لك الأفضل من قطع الكمبيوتر لأداء استثنائي وتجربة لا مثيل لها.",
  badge_title: "",
  badge_text: "",
  badge_visible: false,
  cta_text: "تسوق الآن",
  cta_link: "/#pc",
  secondary_cta_text: "",
  secondary_cta_link: "",
  hero_image_url: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=2070&auto=format&fit=crop", // A nice PC background
  hero_icon: "Monitor"
};

export default function AppleBanner({ initialData }: { initialData?: HeroContent[] }) {
  const [banners, setBanners] = useState<HeroContent[]>(initialData && initialData.length > 0 ? initialData : [defaultBanner]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("/api/hero")
      .then((res) => res.json())
      .then((data: HeroContent[]) => {
        if (data && !("error" in data) && Array.isArray(data) && data.length > 0) {
          setBanners(data);
        }
      })
      .catch((err) => console.error("Failed to fetch banner content:", err));
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 15000); 
    return () => clearInterval(interval);
  }, [banners.length]);

  const currentBanner = banners[currentIndex] || defaultBanner;
  
  const splitTitle = currentBanner.title ? currentBanner.title.split(/(?<=\.)|\n/).map(s => s.trim()).filter(Boolean) : [];

  const features = [
    { icon: <Award className="w-5 h-5 md:w-6 md:h-6" />, title: "جودة مضمونة", desc: "منتجات أصلية من أفضل العلامات التجارية" },
    { icon: <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />, title: "تسوق آمن", desc: "دفع آمن وحماية كاملة لبياناتك" },
    { icon: <Truck className="w-5 h-5 md:w-6 md:h-6" />, title: "شحن سريع", desc: "توصيل سريع لجميع الطلبات" },
    { icon: <Headphones className="w-5 h-5 md:w-6 md:h-6" />, title: "دعم متخصص", desc: "فريق دعم جاهز لمساعدتك دائماً" }
  ];

  return (
    <section className="relative w-full bg-[#050505] text-white flex flex-col justify-between z-10">
      
      {/* Banner Area */}
      <div className="relative w-full flex flex-col md:block md:aspect-video bg-[#050505]">
        
        {/* Full-width Background Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`bg-${currentIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full aspect-video md:absolute md:inset-0 z-0 relative mt-24 md:mt-0"
          >
            {currentBanner.hero_image_url && (
              <>
                <img 
                  src={currentBanner.hero_image_url} 
                  alt="Hero Background" 
                  className="w-full h-full object-cover object-center"
                />
                {/* Subtle gradient overlay to ensure text readability */}
                <div className="hidden md:block absolute inset-0 bg-gradient-to-l from-black/90 via-black/50 to-transparent" />
                <div className="md:hidden absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
                <div className="hidden md:block absolute inset-0 bg-black/20" />
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Content Overlay */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-center pt-8 pb-16 md:absolute md:inset-0 md:py-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${currentIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-2xl text-right flex flex-col items-start"
            >
              {/* Render Title if provided */}
              {splitTitle.length > 0 && (
                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-[4.5rem] font-black leading-[1.2] tracking-tight mb-4 md:mb-6 text-white drop-shadow-lg">
                  {splitTitle.map((line, idx) => (
                    <span key={idx} className="block text-white">{line}</span>
                  ))}
                </h1>
              )}

              {/* Render Subtitle if provided */}
              {currentBanner.subtitle && (
                <p className="text-base sm:text-lg md:text-xl text-zinc-300 md:text-zinc-200 font-medium mb-8 md:mb-10 max-w-lg leading-relaxed drop-shadow-md">
                  {currentBanner.subtitle}
                </p>
              )}

              {/* CTA Button */}
              {currentBanner.cta_text && (
                <Link 
                  href={currentBanner.cta_link || "/#pc"} 
                  className="group relative flex items-center justify-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-white text-black rounded-2xl font-bold text-base md:text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] mt-2 md:mt-4"
                >
                  <span className="relative z-10">{currentBanner.cta_text}</span>
                  <ArrowLeft className="w-5 h-5 relative z-10 transition-transform group-hover:-translate-x-2" />
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-200 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Dots if multiple banners */}
        {banners.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full shadow-sm ${
                  currentIndex === idx 
                    ? "w-8 h-2 bg-white" 
                    : "w-2 h-2 bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* 4 Features Bar */}
      <div className="relative z-20 w-full bg-[#050505] py-8 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10">
            {features.map((feature, idx) => (
              <div 
                key={idx}
                className="flex items-start gap-4 lg:gap-5"
              >
                <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border border-zinc-800 bg-zinc-900/80 flex items-center justify-center text-zinc-300">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm md:text-base mb-1">{feature.title}</h3>
                  <p className="text-zinc-500 text-xs md:text-sm leading-relaxed max-w-[180px]">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
