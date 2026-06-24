"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();
    return (
        <button 
            onClick={() => router.back()} 
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-bold bg-[#0a0a0a] hover:bg-white/5 px-4 py-2 rounded-xl border border-white/10 shadow-sm cursor-pointer"
        >
            <ArrowRight className="w-5 h-5" /> رجوع
        </button>
    );
}
