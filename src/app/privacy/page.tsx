import React from "react";

export const metadata = {
    title: "سياسة الخصوصية | Al-Rwan Center",
    description: "سياسة الخصوصية وحماية البيانات في منصة  مركز الروان.",
};

import BackButton from "@/components/BackButton";

export default function PrivacyPage() {
    return (
        <div className="pt-24 pb-24 bg-[#000000] min-h-screen font-sans">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <BackButton />
                </div>
                <div className="bg-[#0a0a0a] rounded-3xl p-8 md:p-12 shadow-xl border border-white/10">
                    <h1 className="text-3xl md:text-4xl font-black text-white mb-8 border-b border-white/10 pb-6">
                        سياسة الخصوصية
                    </h1>
                    
                    <div className="text-zinc-400 space-y-6 text-lg leading-relaxed">
                        <p className="font-bold text-white text-xl">
                            خصوصيتك مهمة جداً بالنسبة لنا. في مركز الروان، نلتزم بحماية معلوماتك الشخصية.
                        </p>
                        
                        <h3 className="text-xl font-bold text-white mt-8 mb-4">1. المعلومات التي نجمعها</h3>
                        <p>
                            نقوم بجمع المعلومات التي تقدمها لنا طواعية عند التواصل معنا لغرض الشراء (مثل الاسم، رقم الهاتف، وعنوان التوصيل). كما يتم جمع بيانات مجهولة الهوية لتتبع أداء الموقع وتحسين تجربة المستخدم.
                        </p>

                        <h3 className="text-xl font-bold text-white mt-8 mb-4">2. كيف نستخدم معلوماتك</h3>
                        <p>
                            تُستخدم المعلومات لتنفيذ طلبات الشراء الخاصة بك، الرد على استفساراتك، وتقديم خدمة عملاء أفضل. نحن لا نقوم ببيع أو تأجير معلوماتك لأي طرف ثالث بأي شكل من الأشكال.
                        </p>

                        <h3 className="text-xl font-bold text-white mt-8 mb-4">3. أمان البيانات</h3>
                        <p>
                            نتخذ تدابير أمنية صارمة لحماية بياناتك من الوصول غير المصرح به أو التعديل أو التدمير. يتم حفظ بياناتك على خوادم آمنة ومحمية بأحدث تقنيات التشفير.
                        </p>

                        <h3 className="text-xl font-bold text-white mt-8 mb-4">4. التغييرات في سياسة الخصوصية</h3>
                        <p>
                            نحتفظ بالحق في تحديث أو تغيير سياستنا للخصوصية في أي وقت. سيتم نشر أي تغييرات في هذه الصفحة، وننصحك بمراجعتها بشكل دوري لتبقى على اطلاع بكيفية حماية معلوماتك.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
