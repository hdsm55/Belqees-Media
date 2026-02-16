'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import {
    ArrowRight,
    Save,
    FileText,
    Image as ImageIcon,
    Loader2,
    Video,
    Tag,
    Trash2
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/utils/cn';
import ImageUpload from '@/components/admin/ImageUpload';

export default function NewPortfolioPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '',
        category: '',
        images: [] as string[],
        videos: [] as string[],
        published: false
    });

    const generateSlug = (text: string) => {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setFormData(prev => ({
            ...prev,
            title,
            slug: prev.slug || generateSlug(title)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error: insertError } = await supabase
                .from('portfolio')
                .insert([{
                    id: crypto.randomUUID(),
                    ...formData,
                    updatedAt: new Date().toISOString()
                }]);

            if (insertError) {
                console.error('Supabase Insert Error:', insertError);
                throw insertError;
            }

            router.push('/admin/portfolio');
            router.refresh();
        } catch (err) {
            console.error('Error creating portfolio item:', err);
            alert('حدث خطأ أثناء إضافة المشروع. تأكد من أن الـ Slug فريد.');
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
                        href="/admin/portfolio"
                        className="flex items-center gap-2 text-gray-500 hover:text-primary-600 transition-colors mb-2 group"
                    >
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        العودة لمعرض الأعمال
                    </Link>
                    <h2 className="text-3xl font-bold text-gray-900 font-heading">إضافة مشروع جديد</h2>
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
                                عنوان المشروع
                            </label>
                            <input
                                required
                                type="text"
                                value={formData.title}
                                onChange={handleTitleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                placeholder="مثلاً: فيلم وثائقي عن الصحراء"
                            />
                        </div>

                        {/* Slug */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">الرابط الدائم (Slug)</label>
                            <input
                                required
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all font-mono text-sm"
                                placeholder="desert-documentary"
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">وصف المشروع</label>
                            <textarea
                                rows={6}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                placeholder="اكتب تفاصيل المشروع هنا..."
                            ></textarea>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                        <h3 className="font-bold text-gray-900 border-b border-gray-50 pb-4">الروابط والوسائط</h3>
                        <div className="space-y-4">
                            <div className="space-y-4">
                                <ImageUpload
                                    value=""
                                    onChange={(url) => {
                                        if (url) setFormData(prev => ({ ...prev, images: [...prev.images, url] }));
                                    }}
                                    label="تحميل صورة للمشروع"
                                />

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                        <ImageIcon size={16} />
                                        روابط الصور (مفصولة بفاصلة)
                                    </label>
                                    <textarea
                                        value={formData.images.join(', ')}
                                        onChange={(e) => setFormData({ ...formData, images: e.target.value.split(',').map(s => s.trim()).filter(s => s !== '') })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all font-mono text-xs"
                                        placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
                                    />
                                    {formData.images.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {formData.images.map((img, i) => (
                                                <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-100 group">
                                                    <img src={img} className="w-full h-full object-cover" />
                                                    <button
                                                        type="button"
                                                        onClick={() => setFormData(prev => ({ ...prev, images: prev.images.filter((_, idx) => idx !== i) }))}
                                                        className="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-1"
                                                    >
                                                        <Trash2 size={12} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                    <Video size={16} />
                                    روابط الفيديو (مفصولة بفاصلة)
                                </label>
                                <textarea
                                    value={formData.videos.join(', ')}
                                    onChange={(e) => setFormData({ ...formData, videos: e.target.value.split(',').map(s => s.trim()).filter(s => s !== '') })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all font-mono text-xs"
                                    placeholder="https://youtube.com/watch?v=xxx, https://vimeo.com/xxx"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                        <h3 className="font-bold text-gray-900 border-b border-gray-50 pb-4">التصنيف والحالة</h3>

                        {/* Category */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                <Tag size={16} />
                                التصنيف
                            </label>
                            <input
                                type="text"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                                placeholder="وثائقي، تجاري، إلخ"
                            />
                        </div>

                        {/* Published Toggle */}
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <span className="text-sm font-bold text-gray-700">نشر المشروع</span>
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
                            حفظ المشروع
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
