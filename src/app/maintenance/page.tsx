"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Wrench, Cpu, Settings, Fan, Droplets, MonitorSpeaker, Box, ArrowLeft, ShieldCheck, Clock, Zap, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useToast } from "@/lib/ToastContext";

const services = [
  {
    id: 1,
    title: "صيانة وتجميع قطع الـ PC",
    description: "فحص شامل وإصلاح كافة قطع الكمبيوتر مع تقديم استشارات لترقية القطع لأفضل أداء ممكن.",
    icon: <Cpu className="w-8 h-8" />,
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-400"
  },
  {
    id: 2,
    title: "صيانة حاسبة كاملة",
    description: "تشخيص الأعطال البرمجية والمادية للحاسبة بالكامل وإصلاحها لتعود كأنها جديدة.",
    icon: <Box className="w-8 h-8" />,
    gradient: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400"
  },
  {
    id: 3,
    title: "تحديثات وصيانة كارت الشاشة",
    description: "تحديث تعريفات الـ GPU، تنظيف المشتت الحراري، وتغيير المعجون لضمان أفضل إطارات (FPS).",
    icon: <MonitorSpeaker className="w-8 h-8" />,
    gradient: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-400"
  },
  {
    id: 4,
    title: "تحديثات وبرمجة البايوس",
    description: "تحديث الـ BIOS/UEFI لتجنب مشاكل التوافقية وللحصول على أحدث التحسينات الأمنية والأداء.",
    icon: <Settings className="w-8 h-8" />,
    gradient: "from-orange-500/20 to-amber-500/20",
    iconColor: "text-orange-400"
  },
  {
    id: 5,
    title: "تنظيف الجهاز وتغيير المعجون",
    description: "إزالة الغبار بالكامل وتغيير المعجون الحراري للمعالج (CPU) وكارت الشاشة بأجود الأنواع العالمية.",
    icon: <Fan className="w-8 h-8" />,
    gradient: "from-zinc-400/20 to-slate-400/20",
    iconColor: "text-zinc-300"
  },
  {
    id: 6,
    title: "تركيب أنظمة تبريد مائي",
    description: "تصميم وتركيب أنظمة التبريد المائي المفتوح والمغلق (Custom Water Cooling) بأناقة واحترافية.",
    icon: <Droplets className="w-8 h-8" />,
    gradient: "from-sky-500/20 to-blue-500/20",
    iconColor: "text-sky-400"
  }
];

export default function MaintenancePage() {
  const [whatsappLink, setWhatsappLink] = useState("");
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerDetails, setCustomerDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.social_links && data.social_links.whatsapp) {
          setWhatsappLink(data.social_links.whatsapp);
        }
      })
      .catch(() => {});
  }, []);

  const handleBookService = (service: typeof services[0]) => {
    setSelectedService(service);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const message = `🛠️ *طلب صيانة جديد*\n\n` +
      `▪️ الخدمة: ${selectedService?.title}\n` +
      `👤 الاسم: ${customerName}\n` +
      `📞 رقم الموبايل: ${customerPhone}\n\n` +
      `📝 تفاصيل المشكلة:\n${customerDetails}`;

    try {
        const res = await fetch("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderText: message }),
        });
        const data = await res.json();
        
        if (data.success) {
            toast.success("تم إرسال طلب الصيانة بنجاح! سنتواصل معك قريباً.");
            setSelectedService(null);
            setCustomerName("");
            setCustomerPhone("");
            setCustomerDetails("");
        } else {
            toast.error("عذراً، حدث خطأ أثناء إرسال الطلب: " + (data.error || "خطأ غير معروف"));
        }
    } catch (error) {
        toast.error("حدث خطأ في الاتصال بالسيرفر. يرجى المحاولة مرة أخرى.");
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white/20 font-sans flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 relative overflow-hidden z-10">
        {/* Background Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
        
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-bold text-zinc-300 mb-8 backdrop-blur-md">
                <Wrench className="w-4 h-4" />
                <span>المركز المعتمد للصيانة في العراق</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-8 tracking-tight leading-tight">
                عناية متكاملة لجهازك، <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">
                  لأداء يدوم طويلاً.
                </span>
              </h1>
              <p className="text-zinc-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
                نقدم خدمات صيانة احترافية شاملة للكمبيوتر وقطع الـ PC. فريقنا المختص جاهز لإعادة إحياء جهازك وجعله بأفضل حالاته وفق أعلى المعايير.
              </p>
            </motion.div>
          </div>

          {/* Features / Guarantees bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="flex flex-wrap justify-center gap-6 md:gap-12 mb-20 pb-12 border-b border-white/5"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <ShieldCheck className="w-5 h-5 text-zinc-300" />
              </div>
              <span className="font-bold text-zinc-300 text-sm md:text-base">ضمان على الصيانة</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <Clock className="w-5 h-5 text-zinc-300" />
              </div>
              <span className="font-bold text-zinc-300 text-sm md:text-base">سرعة في الإنجاز</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <Zap className="w-5 h-5 text-zinc-300" />
              </div>
              <span className="font-bold text-zinc-300 text-sm md:text-base">أداء فائق بعد الصيانة</span>
            </div>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index, ease: "easeOut" }}
                className="group relative h-full flex"
              >
                {/* Hover Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 rounded-3xl -z-10`} />
                
                {/* Card Content */}
                <div className="relative w-full bg-[#0a0a0a]/80 backdrop-blur-md border border-white/5 group-hover:border-white/10 rounded-3xl p-8 transition-all duration-500 flex flex-col items-start overflow-hidden">
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-[#111111] border border-white/5 flex items-center justify-center mb-8 shadow-xl ${service.iconColor} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                    {service.icon}
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-zinc-100 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-medium mb-8 flex-grow">
                    {service.description}
                  </p>

                  <button 
                    onClick={() => handleBookService(service)}
                    className="flex items-center gap-2 text-sm font-bold text-zinc-300 group-hover:text-white transition-colors mt-auto cursor-pointer"
                  >
                    <span>احجز الخدمة</span>
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-32 relative rounded-3xl overflow-hidden border border-white/10 group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 to-[#0a0a0a] z-0" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=2070&auto=format&fit=crop')] opacity-10 group-hover:opacity-20 transition-opacity duration-700 bg-cover bg-center mix-blend-overlay z-0" />
            
            <div className="relative z-10 px-6 py-16 md:py-24 text-center flex flex-col items-center">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6">هل جهازك يحتاج إلى صيانة؟</h2>
              <p className="text-zinc-400 text-lg md:text-xl font-medium max-w-2xl mb-10 leading-relaxed">
                لا تتردد في التواصل معنا للحصول على استشارة مجانية وفحص شامل لجهازك. فريقنا متواجد دائماً لتقديم الدعم الفني لك.
              </p>
              <button 
                onClick={() => whatsappLink ? window.open(whatsappLink, "_blank") : toast.error("الرابط غير متوفر")}
                className="px-8 py-4 bg-white text-black rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] flex items-center gap-3"
              >
                <Zap className="w-5 h-5" />
                <span>تواصل مع الدعم الفني</span>
              </button>
            </div>
          </motion.div>

        </div>
      </main>

      {/* Booking Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden"
            >
              <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${selectedService.gradient}`} />
              
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-black text-white mb-2">حجز موعد صيانة</h3>
                  <p className="text-zinc-400 text-sm font-medium">خدمة: {selectedService.title}</p>
                </div>
                <button 
                  onClick={() => setSelectedService(null)}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-zinc-300 mb-2">الاسم الكريم</label>
                  <input 
                    type="text" 
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 focus:bg-white/5 transition-all"
                    placeholder="مثال: أحمد العراقي"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-zinc-300 mb-2">رقم الموبايل</label>
                  <input 
                    type="tel" 
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 focus:bg-white/5 transition-all text-left"
                    placeholder="مثال: 07800000000"
                    dir="ltr"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-zinc-300 mb-2">تفاصيل المشكلة أو الطلب</label>
                  <textarea 
                    required
                    rows={4}
                    value={customerDetails}
                    onChange={(e) => setCustomerDetails(e.target.value)}
                    className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 focus:bg-white/5 transition-all resize-none"
                    placeholder="اشرح لنا المشكلة التي تواجهها أو نوع التطوير المطلوب..."
                  />
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-70"
                  >
                    <span>{isSubmitting ? "جاري الإرسال..." : "تأكيد وإرسال الطلب"}</span>
                  </button>
                  <p className="text-center text-zinc-500 text-xs mt-4">
                    سيتم إرسال طلبك مباشرة إلى فريق الدعم الفني، وسنتواصل معك بأقرب وقت.
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
