"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Search } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-brand-light/20 blur-[100px]" />
                <div className="absolute top-40 -left-20 w-[400px] h-[400px] rounded-full bg-brand-dark/10 blur-[80px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center lg:text-right"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-6 border border-brand-light/20 text-brand-dark text-sm font-bold shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-brand-light animate-pulse" />
                            أحدث الأجهزة في السوق العراقي 🇮🇶
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.2] mb-6">
                            قارن، اختار، <br />
                            <span className="text-gradient">واشتري بذكاء</span>
                        </h1>

                        <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                            نقارن لك أفضل الهواتف الذكية واللابتوبات المتوفرة في العراق.
                            اكتشف الأسعار الحقيقية، الميزات، واختر الأنسب لميزانيتك واحتياجاتك بخطوات بسيطة.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <button className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-light to-brand-dark text-white font-bold text-lg shadow-lg shadow-brand-light/30 hover:shadow-brand-light/50 transition-all hover:-translate-y-1 flex items-center justify-center gap-2 group">
                                <Search className="w-5 h-5" />
                                <span>تصفح الأجهزة</span>
                            </button>

                            <button className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-panel text-slate-800 font-bold text-lg hover:bg-white/80 transition-all flex items-center justify-center gap-2 group">
                                <span>المقارنة الذكية</span>
                                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </motion.div>

                    {/* 3D Floating Mockup Area */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative h-[400px] lg:h-[500px] flex items-center justify-center perspective-[1000px]"
                    >
                        <motion.div
                            animate={{
                                y: [-15, 15, -15],
                                rotateX: [5, -5, 5],
                                rotateY: [-5, 5, -5]
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="relative w-full max-w-md aspect-[4/5] glass-panel rounded-3xl border border-white/40 shadow-2xl p-6 flex flex-col overflow-hidden"
                            style={{
                                transformStyle: "preserve-3d"
                            }}
                        >
                            {/* Fake UI inside the mockup */}
                            <div className="flex justify-between items-center mb-8 opacity-70">
                                <div className="w-8 h-8 rounded-full bg-slate-200" />
                                <div className="w-24 h-4 rounded-full bg-slate-200" />
                            </div>

                            <div className="space-y-4 flex-1">
                                <div className="w-full h-40 rounded-xl bg-gradient-to-tr from-brand-light/20 to-brand-dark/20 animate-pulse border border-white/50" />
                                <div className="w-3/4 h-6 rounded-md bg-slate-200" />
                                <div className="w-1/2 h-4 rounded-md bg-slate-100" />
                            </div>

                            <div className="mt-auto pt-6 flex justify-between items-center border-t border-slate-100/50">
                                <div className="w-20 h-8 rounded-lg bg-brand-light/20" />
                                <div className="w-10 h-10 rounded-full bg-brand-dark/10" />
                            </div>

                            {/* Floating badges around the mockup */}
                            <motion.div
                                className="absolute -right-6 top-20 glass-panel px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                            >
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
                                    $
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 font-bold">أفضل سعر</div>
                                    <div className="font-black text-slate-800">-15% خصم</div>
                                </div>
                            </motion.div>

                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
