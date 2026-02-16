'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import {
    Wrench,
    Plus,
    Trash2,
    RefreshCw,
    Eye,
    EyeOff,
    Settings2
} from 'lucide-react';
import { cn } from '@/utils/cn';

interface Service {
    id: string;
    title: string;
    description: string;
    published: boolean;
    order: number;
}

export default function AdminServicesPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchServices = async () => {
        try {
            setRefreshing(true);
            const { data, error } = await supabase
                .from('services')
                .select('*')
                .order('order', { ascending: true });

            if (error) throw error;
            setServices(data || []);
        } catch (err) {
            console.error('Error fetching services:', err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const deleteService = async (id: string) => {
        if (!confirm('هل أنت متأكد من حذف هذه الخدمة؟')) return;

        try {
            const { error } = await supabase
                .from('services')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setServices(services.filter(s => s.id !== id));
        } catch (err) {
            alert('حدث خطأ أثناء الحذف');
        }
    };

    const togglePublish = async (id: string, currentStatus: boolean) => {
        try {
            const { error } = await supabase
                .from('services')
                .update({ published: !currentStatus })
                .eq('id', id);

            if (error) throw error;
            setServices(services.map(s => s.id === id ? { ...s, published: !currentStatus } : s));
        } catch (err) {
            alert('حدث خطأ أثناء التحديث');
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    return (
        <div className="space-y-8" dir="rtl">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">إدارة الخدمات</h2>
                    <p className="text-gray-500">إدارة الخدمات التي تقدمها بلقيس ميديا للعملاء.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={fetchServices}
                        disabled={refreshing}
                        className="p-2 text-gray-400 hover:text-primary-600 transition-colors rounded-lg hover:bg-primary-50"
                    >
                        <RefreshCw size={24} className={refreshing ? "animate-spin" : ""} />
                    </button>
                    <button className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-xl hover:bg-primary-700 transition-colors shadow-sm">
                        <Plus size={20} />
                        إضافة خدمة
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="py-20 flex flex-col items-center justify-center text-gray-400">
                    <div className="w-10 h-10 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin mb-4" />
                    <p>جاري تحميل الخدمات...</p>
                </div>
            ) : services.length === 0 ? (
                <div className="py-20 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-100 rounded-2xl">
                    <Wrench size={64} strokeWidth={1} className="mb-4 opacity-20" />
                    <p className="text-lg">لا توجد أي خدمات مضافة حالياً</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {services.map((service) => (
                        <div key={service.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-center justify-between group hover:border-primary-200 transition-all">
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                                    <Settings2 size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">{service.title}</h3>
                                    <p className="text-gray-500 text-sm line-clamp-1 max-w-xl">{service.description}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => togglePublish(service.id, service.published)}
                                    className={cn(
                                        "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all",
                                        service.published
                                            ? "bg-green-100 text-green-700"
                                            : "bg-gray-100 text-gray-500"
                                    )}
                                >
                                    {service.published ? <Eye size={12} /> : <EyeOff size={12} />}
                                    {service.published ? 'منشور' : 'مسودة'}
                                </button>

                                <div className="flex items-center gap-1">
                                    <button className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
                                        تعديل
                                    </button>
                                    <button
                                        onClick={() => deleteService(service.id)}
                                        className="p-2 text-red-100 group-hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
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
