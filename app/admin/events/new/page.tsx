'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import {
    Calendar,
    ArrowRight,
    Save,
    MapPin,
    Clock,
    FileText,
    Image as ImageIcon,
    Loader2
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/utils/cn';
import ImageUpload from '@/components/admin/ImageUpload';

export default function NewEventPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '',
        date: '',
        time: '',
        location: '',
        image: '',
        published: false
    });

    const [isSlugCustom, setIsSlugCustom] = useState(false);

    const generateSlug = (text: string) => {
        return text
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\u0600-\u06FF\w-]+/g, '') // Allow Arabic characters
            .replace(/--+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setFormData(prev => {
            const newFormData = { ...prev, title };
            if (!isSlugCustom) {
                newFormData.slug = generateSlug(title);
            }
            return newFormData;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error: insertError } = await supabase
                .from('events')
                .insert([{
                    id: crypto.randomUUID(),
                    ...formData,
                    date: new Date(formData.date).toISOString(),
                    updatedAt: new Date().toISOString()
                }]);

            if (insertError) {
                console.error('Supabase Insert Error:', insertError);
                throw insertError;
            }

            router.push('/admin/events');
            router.refresh();
        } catch (err) {
            console.error('Error creating event:', err);
            alert('حدث خطأ أثناء إضافة الفعالية. تأكد من أن الـ Slug فريد.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8" dir="rtl">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <Link
                        href="/admin/events"
                        className="flex items-center gap-2 text-gray-500 hover:text-primary-600 transition-colors mb-2 group"
                    >
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        العودة للفعاليات
                    </Link>
                    <h2 className="text-3xl font-bold text-gray-900 font-heading">إضافة فعالية جديدة</h2>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                        {/* Title */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                <FileText size={16} />
                                عنوان الفعالية
                            </label>
                            <input
                                required
                                type="text"
                                value={formData.title}
                                onChange={handleTitleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                placeholder="مثلاً: منتدى الإعلام الرقمي 2024"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-bold text-gray-700">الرابط الدائم (Slug)</label>
                                {isSlugCustom && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsSlugCustom(false);
                                            setFormData(prev => ({ ...prev, slug: generateSlug(prev.title) }));
                                        }}
                                        className="text-xs text-primary-600 hover:underline"
                                    >
                                        إعادة ضبط تلقائي
                                    </button>
                                )}
                            </div>
                            <input
                                required
                                type="text"
                                value={formData.slug}
                                onChange={(e) => {
                                    setIsSlugCustom(true);
                                    setFormData({ ...formData, slug: e.target.value });
                                }}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all font-mono text-sm"
                                placeholder="digital-media-forum-2024"
                            />
                            <p className="text-xs text-gray-400 mr-1">
                                سيظهر هذا الرابط كـ: <span className="text-gray-600 font-mono">/events/{formData.slug || '...'}</span>
                            </p>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">وصف الفعالية</label>
                            <textarea
                                rows={6}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                placeholder="اكتب تفاصيل الفعالية هنا..."
                            ></textarea>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                        <h3 className="font-bold text-gray-900 border-b border-gray-50 pb-4">معلومات الموقع والوقت</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <Calendar size={16} />
                                    التاريخ
                                </label>
                                <input
                                    required
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <Clock size={16} />
                                    الوقت (اختياري)
                                </label>
                                <input
                                    type="text"
                                    value={formData.time}
                                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                    placeholder="10:00 AM"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                <MapPin size={16} />
                                الموقع
                            </label>
                            <input
                                type="text"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                placeholder="دبي، الإمارات العربية المتحدة"
                            />
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                        <h3 className="font-bold text-gray-900 border-b border-gray-50 pb-4">الصورة والحالة</h3>

                        {/* Image Upload */}
                        <ImageUpload
                            value={formData.image}
                            onChange={(url) => setFormData({ ...formData, image: url })}
                            label="صورة الفعالية"
                        />

                        {/* Published Toggle */}
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <span className="text-sm font-bold text-gray-700">نشر الفعالية</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={formData.published}
                                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white py-4 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                            حفظ الفعالية
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
