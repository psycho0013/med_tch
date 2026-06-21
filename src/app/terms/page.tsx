import React from "react";

export const metadata = {
    title: "شروط الاستخدام | Al-Rwan Center",
    description: "شروط الاستخدام والأحكام الخاصة بمنصة  مركز الروان.",
};

import BackButton from "@/components/BackButton";

export default function TermsPage() {
    return (
        <div className="pt-24 pb-24 bg-slate-50 min-h-screen font-sans">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <BackButton />
                </div>
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100">
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 border-b border-slate-100 pb-6">
                        شروط الاستخدام
                    </h1>
                    
                    <div className="text-slate-600 space-y-6 text-lg leading-relaxed">
                        <p className="font-bold text-slate-800 text-xl">
                            مرحباً بك في منصة  مركز الروان. باستخدامك لموقعنا، فإنك توافق على الالتزام بالشروط والأحكام التالية:
                        </p>
                        
                        <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">1. قبول الشروط</h3>
                        <p>
                            من خلال الوصول إلى الموقع واستخدامه، فإنك توافق على الالتزام بشروط الاستخدام هذه وجميع القوانين واللوائح المعمول بها. إذا كنت لا توافق على أي من هذه الشروط، يُحظر عليك استخدام الموقع.
                        </p>

                        <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">2. الأسعار وتوفر المنتجات</h3>
                        <p>
                            نحن في  مركز الروان نبذل قصارى جهدنا لضمان دقة الأسعار وتوافر القطع، ولكن نظراً لتقلبات السوق السريعة، قد تتغير الأسعار دون إشعار مسبق. الأسعار النهائية وتوفر المنتجات سيتم تأكيده عند إتمام طلبك عبر فريقنا.
                        </p>

                        <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">3. حقوق الملكية الفكرية</h3>
                        <p>
                            جميع المحتويات المعروضة على الموقع (النصوص، التصاميم، الشعارات، الصور، والبرمجيات) هي ملك لمنصة  مركز الروان ومحمية بقوانين حقوق النشر. لا يُسمح بإعادة استخدامها دون إذن صريح.
                        </p>

                        <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">4. إخلاء المسؤولية</h3>
                        <p>
                            يتم تقديم المواد الموجودة على موقعنا &quot;كما هي&quot;. لا نقدم أي ضمانات، صريحة أو ضمنية، ونخلي مسؤوليتنا عن جميع الضمانات الأخرى بما في ذلك الضمانات الضمنية أو القابلية للتسويق لملاءمة غرض معين.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
