'use client';

import { useState } from 'react';
import { Settings, Save, Globe, Phone, Mail, MapPin } from 'lucide-react';

export default function AdminSettingsPage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate save
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        }, 1000);
    };

    return (
        <div className="space-y-8" dir="rtl">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">إعدادات الموقع</h2>
                <p className="text-gray-500">إدارة المعلومات الأساسية وبيانات التواصل.</p>
            </div>

            <form onSubmit={handleSave} className="max-w-2xl space-y-6">
                {/* Contact Info Section */}
                <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm space-y-6">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2 border-b border-gray-50 pb-4">
                        <Globe size={20} className="text-primary-600" />
                        بيانات التواصل الإجتماعي
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">رقم الهاتف</label>
                            <div className="relative">
                                <Phone size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input type="text" className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 pr-10 pl-4 outline-none focus:ring-2 focus:ring-primary-500" placeholder="+966..." />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">البريد الإلكتروني</label>
                            <div className="relative">
                                <Mail size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input type="email" className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 pr-10 pl-4 outline-none focus:ring-2 focus:ring-primary-500" placeholder="info@belqees.com" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">العنوان الفيزيائي</label>
                        <div className="relative">
                            <MapPin size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input type="text" className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 pr-10 pl-4 outline-none focus:ring-2 focus:ring-primary-500" placeholder="الرياض، المملكة العربية السعودية" />
                        </div>
                    </div>
                </div>

                {/* SEO Section */}
                <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm space-y-6">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2 border-b border-gray-50 pb-4">
                        <Settings size={20} className="text-primary-600" />
                        إعدادات المحرك البحث (SEO)
                    </h3>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">وصف الموقع</label>
                        <textarea className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 px-4 outline-none focus:ring-2 focus:ring-primary-500 min-h-[100px]" placeholder="بلقيس ميديا هي شركة إعلامية رائدة..." />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 bg-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 disabled:opacity-50"
                    >
                        {loading ? 'جاري الحفظ...' : (
                            <>
                                <Save size={20} />
                                حفظ التغييرات
                            </>
                        )}
                    </button>
                    {success && (
                        <span className="text-green-600 font-medium animate-fade-in">تم الحفظ بنجاح!</span>
                    )}
                </div>
            </form>
        </div>
    );
}
