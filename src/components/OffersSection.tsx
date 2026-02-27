"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, Timer, ArrowLeft, Tag } from "lucide-react";

interface Offer {
    id: string;
    title: string;
    desc_text: string;
    image_color: string;
    badge: string;
    time_left: string;
}

export default function OffersSection() {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/offers")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setOffers(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch offers", err);
                setLoading(false);
            });
    }, []);

    if (loading || offers.length === 0) return null;
    return (
        <section id="offers" className="py-20 relative overflow-hidden bg-brand-light/5 border-y border-brand-light/10">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-light/20 text-brand-dark text-sm font-black mb-4 border border-brand-light/30 shadow-sm">
                            <Zap className="w-4 h-4 text-brand-dark animate-pulse" />
                            العروض الذكية
                        </div>
                        <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mb-4 leading-tight">
                            أقوى التخفيضات <span className="text-gradient">والعروض الحصرية</span>
                        </h2>
                        <p className="text-slate-600 font-medium text-lg leading-relaxed">
                            جمعنا لك أفضل العروض الحالية من أشهر المتاجر في العراق. صفقات لا تفوّت لفترة محدودة فقط!
                        </p>
                    </div>
                    <button className="flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors shrink-0 shadow-lg shadow-slate-900/20">
                        مشاهدة كل العروض
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {offers.map((offer, index) => (
                        <motion.div
                            key={offer.id}
                            initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="group relative rounded-3xl overflow-hidden glass-panel border border-white p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-white/60"
                        >
                            <div className={`w-full sm:w-48 aspect-square sm:aspect-auto sm:h-full rounded-2xl ${offer.image_color} relative overflow-hidden shadow-inner flex-shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-500`}>
                                <Tag className="w-16 h-16 text-white/50 absolute rotate-12" />
                                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full blur-xl absolute" />
                            </div>

                            <div className="flex-1 flex flex-col justify-center w-full">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded-md text-xs font-bold border border-red-200">
                                        {offer.badge}
                                    </span>
                                    <div className="flex items-center gap-1 text-slate-500 text-xs font-bold bg-slate-100 px-2 py-1 rounded-md">
                                        <Timer className="w-3.5 h-3.5" />
                                        ينتهي خلال: {offer.time_left}
                                    </div>
                                </div>

                                <h3 className="text-2xl font-black text-slate-900 mb-2 group-hover:text-brand-dark transition-colors">
                                    {offer.title}
                                </h3>
                                <p className="text-slate-600 font-medium text-sm leading-relaxed mb-6">
                                    {offer.desc_text}
                                </p>

                                <button className="w-full sm:w-auto mt-auto py-3 px-6 rounded-xl bg-brand-dark text-white font-bold text-sm hover:bg-blue-700 transition-colors shadow-md shadow-brand-dark/20 text-center">
                                    اغتنم العرض الآن
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
