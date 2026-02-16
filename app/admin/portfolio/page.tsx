'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import {
    Briefcase,
    Plus,
    Trash2,
    ExternalLink,
    RefreshCw,
    Eye,
    EyeOff,
    Image as ImageIcon
} from 'lucide-react';
import { cn } from '@/utils/cn';
import Link from 'next/link';

interface PortfolioItem {
    id: string;
    title: string;
    category: string;
    published: boolean;
    image?: string;
    slug: string;
    createdAt: string;
}

export default function AdminPortfolioPage() {
    const [items, setItems] = useState<PortfolioItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchPortfolio = async () => {
        try {
            setRefreshing(true);
            const { data, error } = await supabase
                .from('portfolio')
                .select('*')
                .order('createdAt', { ascending: false });

            if (error) {
                console.error('Supabase Error:', error);
                throw error;
            }
            setItems(data || []);
        } catch (err) {
            console.error('Error fetching portfolio:', err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const deleteItem = async (id: string) => {
        if (!confirm('هل أنت متأكد من حذف هذا العمل؟')) return;

        try {
            const { error } = await supabase
                .from('portfolio')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setItems(items.filter(i => i.id !== id));
        } catch (err) {
            alert('حدث خطأ أثناء الحذف');
        }
    };

    const togglePublish = async (id: string, currentStatus: boolean) => {
        try {
            const { error } = await supabase
                .from('portfolio')
                .update({ published: !currentStatus })
                .eq('id', id);

            if (error) throw error;
            setItems(items.map(i => i.id === id ? { ...i, published: !currentStatus } : i));
        } catch (err) {
            alert('حدث خطأ أثناء التحديث');
        }
    };

    useEffect(() => {
        fetchPortfolio();
    }, []);

    return (
        <div className="space-y-8" dir="rtl">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">إدارة معرض الأعمال</h2>
                    <p className="text-gray-500">إدارة المشاريع والأعمال المعروضة في الموقع.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={fetchPortfolio}
                        disabled={refreshing}
                        className="p-2 text-gray-400 hover:text-primary-600 transition-colors rounded-lg hover:bg-primary-50"
                    >
                        <RefreshCw size={24} className={refreshing ? "animate-spin" : ""} />
                    </button>
                    <Link href="/admin/portfolio/new" className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-xl hover:bg-primary-700 transition-colors shadow-sm">
                        <Plus size={20} />
                        إضافة عمل جديد
                    </Link>
                </div>
            </div>

            {loading ? (
                <div className="py-20 flex flex-col items-center justify-center text-gray-400">
                    <div className="w-10 h-10 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin mb-4" />
                    <p>جاري تحميل الأعمال...</p>
                </div>
            ) : items.length === 0 ? (
                <div className="py-20 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-100 rounded-2xl">
                    <Briefcase size={64} strokeWidth={1} className="mb-4 opacity-20" />
                    <p className="text-lg">لا توجد أي أعمال مضافة حالياً</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <div key={item.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
                            {/* Image Preview */}
                            <div className="h-48 bg-gray-100 relative">
                                {item.image ? (
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                        <ImageIcon size={48} />
                                    </div>
                                )}
                                <div className="absolute top-3 left-3 flex gap-2">
                                    <button
                                        onClick={() => togglePublish(item.id, item.published)}
                                        className={cn(
                                            "p-2 rounded-lg backdrop-blur-md transition-all",
                                            item.published
                                                ? "bg-green-500/80 text-white"
                                                : "bg-gray-500/80 text-white"
                                        )}
                                        title={item.published ? "إيقاف النشر" : "نشر"}
                                    >
                                        {item.published ? <Eye size={16} /> : <EyeOff size={16} />}
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5 space-y-3">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <span className="text-[10px] uppercase tracking-wider font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded">
                                            {item.category}
                                        </span>
                                        <h3 className="font-bold text-gray-900 mt-1 line-clamp-1">{item.title}</h3>
                                    </div>
                                    <a
                                        href={`/portfolio/${item.slug}`}
                                        target="_blank"
                                        className="text-gray-400 hover:text-primary-600"
                                    >
                                        <ExternalLink size={18} />
                                    </a>
                                </div>

                                <div className="flex items-center justify-end pt-4 border-t border-gray-50 gap-2">
                                    <button className="flex-1 text-sm font-medium py-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors">
                                        تعديل
                                    </button>
                                    <button
                                        onClick={() => deleteItem(item.id)}
                                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
