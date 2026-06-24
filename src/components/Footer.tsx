"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Footer() {
    const [logoUrl, setLogoUrl] = useState<string | null>(null);
    const [socialLinks, setSocialLinks] = useState<any>(null);

    useEffect(() => {
        fetch("/api/settings")
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    if (data.logo_url) setLogoUrl(data.logo_url);
                    if (data.social_links) setSocialLinks(data.social_links);
                }
            })
            .catch(() => {});
    }, []);

    return (
        <footer className="bg-[#050505] text-zinc-400 border-t border-white/10 mt-20 relative overflow-hidden font-sans pb-8">
            {/* Glow effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-white/5 rounded-full blur-[120px] -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 items-start">

                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-6 cursor-pointer">
                            {logoUrl ? (
                                <img src={logoUrl} alt="Logo" className="h-12 object-contain brightness-0 invert" />
                            ) : (
                                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
                                    <span className="text-white font-bold text-2xl">TC</span>
                                </div>
                            )}
                            <span className="font-black text-3xl tracking-tight text-white">
                                <span>مركز الروان</span>
                            </span>
                        </div>
                        <p className="text-zinc-400 text-base leading-relaxed max-w-sm font-medium">
                            المنصة الأولى في العراق لمقارنة الأجهزة التقنية وبناء تجميعات الـ PC. نساعدك في اتخاذ القرار الصحيح بناءً على أسعار السوق الحقيقية ومواصفات الأجهزة بشفافية تامة.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">روابط سريعة</h4>
                        <ul className="space-y-4 text-base font-semibold text-zinc-400">
                            <li><Link href="/#pc" className="hover:text-white hover:translate-x-1 inline-block transition-all">تجميعات PC</Link></li>
                            <li><Link href="/#monitors" className="hover:text-white hover:translate-x-1 inline-block transition-all">الشاشات الاحترافية</Link></li>
                            <li><Link href="/#accessories" className="hover:text-white hover:translate-x-1 inline-block transition-all">قطع وإكسسوارات</Link></li>
                            <li><Link href="/compare" className="hover:text-white hover:translate-x-1 inline-block transition-all">المقارنة الذكية</Link></li>
                        </ul>
                    </div>

                    {socialLinks && Object.values(socialLinks).some(link => !!link) && (
                        <div>
                            <h4 className="text-white font-bold text-lg mb-6">تواصل معنا</h4>
                            <ul className="space-y-4 text-base font-semibold text-zinc-400">
                                {socialLinks.facebook && <li><a href={socialLinks.facebook} target="_blank" rel="noreferrer" className="hover:text-white hover:translate-x-1 inline-block transition-all">فيسبوك</a></li>}
                                {socialLinks.instagram && <li><a href={socialLinks.instagram} target="_blank" rel="noreferrer" className="hover:text-white hover:translate-x-1 inline-block transition-all">انستغرام</a></li>}
                                {socialLinks.telegram && <li><a href={socialLinks.telegram} target="_blank" rel="noreferrer" className="hover:text-white hover:translate-x-1 inline-block transition-all">تليكرام</a></li>}
                                {socialLinks.whatsapp && <li><a href={socialLinks.whatsapp} target="_blank" rel="noreferrer" className="hover:text-white hover:translate-x-1 inline-block transition-all">واتساب</a></li>}
                                {socialLinks.tiktok && <li><a href={socialLinks.tiktok} target="_blank" rel="noreferrer" className="hover:text-white hover:translate-x-1 inline-block transition-all">تيك توك</a></li>}
                            </ul>
                        </div>
                    )}

                </div>

                <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-semibold text-zinc-500">
                    <p>© {new Date().getFullYear()} مركز الروان. جميع الحقوق محفوظة.</p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <Link href="/terms" className="hover:text-white transition-colors">شروط الاستخدام</Link>
                        <Link href="/privacy" className="hover:text-white transition-colors">سياسة الخصوصية</Link>
                        <Link href="/refund" className="hover:text-white transition-colors">سياسة الاسترجاع والاستبدال</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
