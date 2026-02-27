export default function Footer() {
    return (
        <footer className="bg-slate-100/50 text-slate-600 border-t border-slate-200 mt-20 relative overflow-hidden glass-panel">
            {/* Glow effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-brand-light/50 to-transparent opacity-50" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-brand-light/5 rounded-full blur-[120px] -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 items-start">

                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-light to-brand-dark flex items-center justify-center shadow-lg shadow-brand-light/20">
                                <span className="text-white font-bold text-xl">TC</span>
                            </div>
                            <span className="font-bold text-2xl tracking-tight text-slate-900">
                                تك<span className="text-brand-dark">كومبير</span>
                            </span>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed max-w-sm font-medium">
                            المنصة الأولى في العراق لمقارنة الأجهزة التقنية. نساعدك في اتخاذ القرار الصحيح بناءً على أسعار السوق الحقيقية ومواصفات الأجهزة بشفافية تامة.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-slate-900 font-bold mb-4">روابط سريعة</h4>
                        <ul className="space-y-3 text-sm font-medium text-slate-600">
                            <li><a href="#" className="hover:text-brand-dark transition-colors">مقارنة الهواتف</a></li>
                            <li><a href="#" className="hover:text-brand-dark transition-colors">مقارنة اللابتوبات</a></li>
                            <li><a href="#" className="hover:text-brand-dark transition-colors">المساعد الذكي</a></li>
                            <li><a href="#" className="hover:text-brand-dark transition-colors">عروض المحلات</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-slate-900 font-bold mb-4">تواصل معنا</h4>
                        <ul className="space-y-3 text-sm font-medium text-slate-600">
                            <li><a href="#" className="hover:text-brand-dark transition-colors">فيسبوك</a></li>
                            <li><a href="#" className="hover:text-brand-dark transition-colors">انستغرام</a></li>
                            <li><a href="#" className="hover:text-brand-dark transition-colors">تليكرام</a></li>
                            <li><a href="#" className="hover:text-brand-dark transition-colors">اتصل بنا</a></li>
                        </ul>
                    </div>

                </div>

                <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-slate-500">
                    <p>© {new Date().getFullYear()} تك كومبير (TechCompare IQ). جميع الحقوق محفوظة.</p>
                    <div className="flex gap-4">
                        <a href="/terms" target="_blank" rel="noopener noreferrer" className="hover:text-brand-dark transition-colors">شروط الاستخدام</a>
                        <a href="/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-brand-dark transition-colors">سياسة الخصوصية</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
