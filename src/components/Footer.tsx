"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Footer() {
    const [logoUrl, setLogoUrl] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/settings")
            .then((res) => res.json())
            .then((data) => {
                if (data && data.logo_url) {
                    setLogoUrl(data.logo_url);
                }
            })
            .catch(() => {});
    }, []);

    return (
        <footer className="bg-slate-100/50 text-slate-600 border-t border-slate-200 mt-20 relative overflow-hidden glass-panel font-sans pb-8">
            {/* Glow effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-brand-light/50 to-transparent opacity-50" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-brand-light/5 rounded-full blur-[120px] -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 items-start">

                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-6 cursor-pointer">
                            {logoUrl ? (
                                <img src={logoUrl} alt="Logo" className="h-12 object-contain" />
                            ) : (
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-light to-brand-dark flex items-center justify-center shadow-lg shadow-brand-light/20">
                                    <span className="text-white font-bold text-2xl">TC</span>
                                </div>
                            )}
                            <span className="font-black text-3xl tracking-tight text-slate-900">
                                <span className="text-brand-dark">مركز الروان</span>
                            </span>
                        </div>
                        <p className="text-slate-600 text-base leading-relaxed max-w-sm font-medium">
                            المنصة الأولى في العراق لمقارنة الأجهزة التقنية وبناء تجميعات الـ PC. نساعدك في اتخاذ القرار الصحيح بناءً على أسعار السوق الحقيقية ومواصفات الأجهزة بشفافية تامة.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-slate-900 font-bold text-lg mb-6">روابط سريعة</h4>
                        <ul className="space-y-4 text-base font-semibold text-slate-600">
                            <li><Link href="/#pc" className="hover:text-brand-dark hover:translate-x-1 inline-block transition-all">تجميعات PC</Link></li>
                            <li><Link href="/#monitors" className="hover:text-brand-dark hover:translate-x-1 inline-block transition-all">الشاشات الاحترافية</Link></li>
                            <li><Link href="/#accessories" className="hover:text-brand-dark hover:translate-x-1 inline-block transition-all">قطع وإكسسوارات</Link></li>
                            <li><Link href="/compare" className="hover:text-brand-dark hover:translate-x-1 inline-block transition-all">المقارنة الذكية</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-slate-900 font-bold text-lg mb-6">تواصل معنا</h4>
                        <ul className="space-y-4 text-base font-semibold text-slate-600">
                            <li><a href="#" className="hover:text-brand-dark hover:translate-x-1 inline-block transition-all">فيسبوك</a></li>
                            <li><a href="#" className="hover:text-brand-dark hover:translate-x-1 inline-block transition-all">انستغرام</a></li>
                            <li><a href="#" className="hover:text-brand-dark hover:translate-x-1 inline-block transition-all">تليكرام</a></li>
                            <li><a href="#" className="hover:text-brand-dark hover:translate-x-1 inline-block transition-all">واتساب (للدعم والطلبات)</a></li>
                        </ul>
                    </div>

                </div>

                <div className="mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-semibold text-slate-500">
                    <p>© {new Date().getFullYear()} مركز الروان. جميع الحقوق محفوظة.</p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <Link href="/terms" className="hover:text-brand-dark transition-colors">شروط الاستخدام</Link>
                        <Link href="/privacy" className="hover:text-brand-dark transition-colors">سياسة الخصوصية</Link>
                        <Link href="/refund" className="hover:text-brand-dark transition-colors">سياسة الاسترجاع والاستبدال</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
