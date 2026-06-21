"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function AppleBanner() {
  const [title, setTitle] = useState("تيتانيوم.\nقوي. خفيف. برو.");
  const [subtitle, setSubtitle] = useState("اكتشف iPhone 15 Pro مع هيكل التيتانيوم الفضائي، شريحة A17 Pro الخارقة، وزر الإجراءات الجديد.");
  const [topLabel, setTopLabel] = useState("أقوى إصدار");
  const [badgeText, setBadgeText] = useState("");
  const [badgeVisible, setBadgeVisible] = useState(true);
  const [ctaText, setCtaText] = useState("اشترِ الآن");
  const [ctaLink, setCtaLink] = useState("/compare");
  const [secondaryCtaText, setSecondaryCtaText] = useState("اعرف المزيد");
  const [secondaryCtaLink, setSecondaryCtaLink] = useState("/learn-more");
  const [heroImageUrl, setHeroImageUrl] = useState("");

  useEffect(() => {
    fetch("/api/hero")
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          if (data.title) setTitle(data.title);
          if (data.subtitle) setSubtitle(data.subtitle);
          if (data.badge_title !== undefined) setTopLabel(data.badge_title);
          if (data.badge_text !== undefined) setBadgeText(data.badge_text);
          if (data.badge_visible !== undefined) setBadgeVisible(data.badge_visible);
          if (data.cta_text) setCtaText(data.cta_text);
          if (data.cta_link) setCtaLink(data.cta_link);
          if (data.secondary_cta_text) setSecondaryCtaText(data.secondary_cta_text);
          if (data.secondary_cta_link) setSecondaryCtaLink(data.secondary_cta_link);
          if (data.hero_image_url) setHeroImageUrl(data.hero_image_url);
        }
      })
      .catch((err) => console.error("Failed to fetch banner content:", err));
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-black text-white pt-24 pb-16 md:pt-32 md:pb-24 flex items-center justify-center">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 overflow-hidden flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 90, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-gradient-to-tr from-slate-600 via-slate-800 to-zinc-500 rounded-full blur-[80px] md:blur-[120px] opacity-40 mix-blend-screen"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
            rotate: [90, 0, 90]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-gradient-to-bl from-zinc-700 via-slate-600 to-black rounded-full blur-[70px] md:blur-[100px] opacity-30 mix-blend-screen"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center w-full">
        {/* Smart Badge / Floating Pill */}
        {badgeVisible && (topLabel || badgeText) && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 md:mb-8 mt-2 inline-flex items-center gap-3 px-4 py-1.5 md:py-2 rounded-full bg-zinc-900/80 border border-zinc-700/50 backdrop-blur-md shadow-2xl overflow-hidden group"
          >
            {topLabel && (
              <span className="bg-gradient-to-r from-brand-dark to-cyan-500 text-transparent bg-clip-text font-black text-xs md:text-sm uppercase tracking-wider relative">
                {topLabel}
                <div className="absolute inset-0 bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </span>
            )}
            
            {topLabel && badgeText && <span className="w-px h-4 bg-zinc-700/50" />}
            
            {badgeText && (
              <span className="text-zinc-300 font-bold text-xs md:text-sm">
                {badgeText}
              </span>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          </motion.div>
        )}

        {/* Main Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="whitespace-pre-line text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4 md:mb-6 bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent"
          style={{ lineHeight: 1.15 }}
        >
          {title}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-xl mx-auto font-medium mb-8 md:mb-10 px-4"
        >
          {subtitle}
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full sm:w-auto"
        >
          <Link href={ctaLink} className="w-full sm:w-auto group relative px-8 py-3.5 bg-white text-black rounded-full font-bold text-base md:text-lg overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-lg">
            <span className="relative z-10 flex items-center justify-center">{ctaText}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-200 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          
          {secondaryCtaText && (
            <Link href={secondaryCtaLink} className="group flex items-center justify-center gap-2 text-white font-medium text-base md:text-lg hover:text-zinc-300 transition-colors py-2">
              <span>{secondaryCtaText}</span>
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:-translate-x-1" />
            </Link>
          )}
        </motion.div>

        {/* Mockup / Visual Area */}
        {heroImageUrl ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 md:mt-16 relative w-fit mx-auto max-w-[95%] lg:max-w-6xl rounded-2xl md:rounded-3xl border border-zinc-800 bg-zinc-900/80 p-1 md:p-2 shadow-2xl overflow-hidden flex flex-col items-center justify-center"
          >
             <div className="rounded-xl md:rounded-[1.25rem] overflow-hidden relative border border-zinc-800/50 bg-black flex items-center justify-center">
               <motion.div
                 animate={{ rotate: 360 }}
                 transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent blur-3xl opacity-50"
               />
               <img 
                 src={heroImageUrl} 
                 alt="Hero Banner Mockup" 
                 className="max-w-full h-auto max-h-[75vh] relative z-10 drop-shadow-2xl rounded-xl md:rounded-[1.25rem]"
                 style={{ display: "block" }}
               />
             </div>
             <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 md:mt-16 relative w-full max-w-2xl aspect-[4/3] sm:aspect-video rounded-[2rem] md:rounded-[3rem] border border-zinc-800 bg-gradient-to-b from-zinc-900 to-black p-3 md:p-6 shadow-2xl overflow-hidden mx-4 sm:mx-0 flex items-center justify-center"
          >
             <div className="w-full h-full rounded-[1.5rem] md:rounded-[2rem] overflow-hidden relative border border-zinc-800/50 bg-black flex items-center justify-center">
                <motion.div
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage: "radial-gradient(circle at center, #3f3f46 0%, #000000 50%)",
                    backgroundSize: "200% 200%"
                  }}
                />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                      className="w-[200%] h-[200%] absolute bg-gradient-to-r from-transparent via-white/5 to-transparent blur-2xl md:blur-[40px]"
                    />
                    <span className="relative z-10 text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-600">A17 Pro</span>
                </div>
             </div>
             
             <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
          </motion.div>
        )}

      </div>
    </section>
  );
}
