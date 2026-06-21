"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();
    return (
        <button 
            onClick={() => router.back()} 
            className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-dark transition-colors font-bold bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm cursor-pointer"
        >
            <ArrowRight className="w-5 h-5" /> رجوع
        </button>
    );
}
