"use client";

import { motion } from "framer-motion";
import { Sparkles, Gamepad2, BookOpen, Camera, ArrowLeft } from "lucide-react";

export default function Assistant() {
    const usages = [
        { id: "gaming", label: "ألعاب (Gaming)", icon: <Gamepad2 className="w-5 h-5" />, color: "bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200" },
        { id: "study", label: "دراسة وعمل", icon: <BookOpen className="w-5 h-5" />, color: "bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200" },
        { id: "photo", label: "تصوير احترافي", icon: <Camera className="w-5 h-5" />, color: "bg-rose-100 text-rose-700 hover:bg-rose-200 border-rose-200" },
    ];

    return (
        <section className="py-20 relative">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative rounded-[2rem] overflow-hidden glass-panel bg-gradient-to-br from-brand-light/10 to-brand-dark/5 border border-white shadow-2xl p-8 md:p-12"
                >
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-light/20 rounded-full blur-[80px] -z-10" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-dark/20 rounded-full blur-[80px] -z-10" />

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white shadow-md mb-6 relative">
                                <div className="absolute inset-0 bg-brand-light/20 animate-ping rounded-2xl" />
                                <Sparkles className="w-7 h-7 text-brand-dark relative z-10" />
                            </div>

                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                                محتار.. شنو <span className="text-gradient">أشتري؟</span>
                            </h2>
                            <p className="text-slate-600 font-medium text-lg leading-relaxed mb-8">
                                المساعد الذكي راح يختار لك أفضل جهاز يناسب احتياجاتك وميزانيتك بدقة عالية، بدون ما تدوخ بين المواصفات.
                            </p>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-3">شرحللنة استخدامك الأكثر:</label>
                                    <div className="flex flex-wrap gap-3">
                                        {usages.map((usage) => (
                                            <button
                                                key={usage.id}
                                                className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all font-bold text-sm ${usage.color}`}
                                            >
                                                {usage.icon}
                                                {usage.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-3">شكد ميزانيتك التقريبية؟</label>
                                    <div className="relative">
                                        <input
                                            type="range"
                                            min="200"
                                            max="2000"
                                            step="50"
                                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-dark"
                                        />
                                        <div className="flex justify-between text-xs font-bold text-slate-400 mt-2">
                                            <span>$200</span>
                                            <span>$1000+</span>
                                            <span>$2000</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button className="mt-8 w-full py-4 rounded-xl bg-slate-900 text-white font-bold text-lg hover:bg-slate-800 transition-colors flex justify-center items-center gap-2 group shadow-xl shadow-slate-900/20">
                                <span>ابحث لي عن الأفضل</span>
                                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            </button>
                        </div>

                        <div className="hidden md:flex justify-center relative">
                            <motion.div
                                animate={{ y: [-10, 10, -10] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className="w-full max-w-sm aspect-square rounded-[3rem] bg-white/40 border border-white shadow-2xl backdrop-blur-xl flex flex-col items-center justify-center p-8 text-center"
                            >
                                <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mb-6 shadow-inner border border-white">
                                    <span className="text-4xl">🤖</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">جاري تحليل البيانات...</h3>
                                <p className="text-slate-500 font-medium text-sm">
                                    نقوم بمقارنة أكثر من 500 جهاز لمعرفة الأنسب لك.
                                </p>

                                {/* Simulated progress UI */}
                                <div className="w-full space-y-3 mt-8">
                                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden border border-white/50">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-brand-light to-brand-dark"
                                            initial={{ width: "0%" }}
                                            animate={{ width: "65%" }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                    </div>
                                    <div className="flex justify-between text-xs font-bold text-slate-400">
                                        <span>مقارنة المعالجات</span>
                                        <span>65%</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
