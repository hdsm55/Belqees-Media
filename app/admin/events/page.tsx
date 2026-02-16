'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import {
    Calendar,
    Plus,
    Trash2,
    MapPin,
    Clock,
    RefreshCw,
    Eye,
    EyeOff
} from 'lucide-react';
import { cn } from '@/utils/cn';
import Link from 'next/link';

interface MediaEvent {
    id: string;
    title: string;
    date: string;
    location: string;
    published: boolean;
    image?: string;
}

export default function AdminEventsPage() {
    const [events, setEvents] = useState<MediaEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchEvents = async () => {
        try {
            setRefreshing(true);
            const { data, error } = await supabase
                .from('events')
                .select('*')
                .order('date', { ascending: false });

            if (error) throw error;
            setEvents(data || []);
        } catch (err) {
            console.error('Error fetching events:', err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const deleteEvent = async (id: string) => {
        if (!confirm('هل أنت متأكد من حذف هذه الفعالية؟')) return;

        try {
            const { error } = await supabase
                .from('events')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setEvents(events.filter(e => e.id !== id));
        } catch (err) {
            alert('حدث خطأ أثناء الحذف');
        }
    };

    const togglePublish = async (id: string, currentStatus: boolean) => {
        try {
            const { error } = await supabase
                .from('events')
                .update({ published: !currentStatus })
                .eq('id', id);

            if (error) throw error;
            setEvents(events.map(e => e.id === id ? { ...e, published: !currentStatus } : e));
        } catch (err) {
            alert('حدث خطأ أثناء التحديث');
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div className="space-y-8" dir="rtl">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">إدارة الفعاليات</h2>
                    <p className="text-gray-500">من هنا يمكنك إضافة أو تعديل الفعاليات التي تظهر في الموقع.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={fetchEvents}
                        disabled={refreshing}
                        className="p-2 text-gray-400 hover:text-primary-600 transition-colors rounded-lg hover:bg-primary-50"
                    >
                        <RefreshCw size={24} className={refreshing ? "animate-spin" : ""} />
                    </button>
                    <Link href="/admin/events/new" className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-xl hover:bg-primary-700 transition-colors shadow-sm">
                        <Plus size={20} />
                        إضافة فعالية
                    </Link>
                </div>
            </div>

            {loading ? (
                <div className="py-20 flex flex-col items-center justify-center text-gray-400">
                    <div className="w-10 h-10 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin mb-4" />
                    <p>جاري تحميل الفعاليات...</p>
                </div>
            ) : events.length === 0 ? (
                <div className="py-20 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-100 rounded-2xl">
                    <Calendar size={64} strokeWidth={1} className="mb-4 opacity-20" />
                    <p className="text-lg">لا توجد أي فعاليات مضافة حالياً</p>
                </div>
            ) : (
                <div className="overflow-x-auto border border-gray-100 rounded-2xl bg-white shadow-sm">
                    <table className="w-full text-right border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 italic">
                                <th className="px-6 py-4 text-sm font-bold text-gray-600">الفعالية</th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-600">التاريخ</th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-600">الموقع</th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-600">الحالة</th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-600 text-center">وصلات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {events.map((ev) => (
                                <tr key={ev.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-gray-900">{ev.title}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Clock size={16} className="text-gray-400" />
                                            {new Intl.DateTimeFormat('ar-SA', { dateStyle: 'medium' }).format(new Date(ev.date))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <MapPin size={16} className="text-gray-400" />
                                            {ev.location || 'غير محدد'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => togglePublish(ev.id, ev.published)}
                                            className={cn(
                                                "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all",
                                                ev.published
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-gray-100 text-gray-500"
                                            )}
                                        >
                                            {ev.published ? <Eye size={12} /> : <EyeOff size={12} />}
                                            {ev.published ? 'منشور' : 'مسودة'}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-center space-x-reverse space-x-2">
                                        <button
                                            onClick={() => deleteEvent(ev.id)}
                                            className="p-2 text-red-100 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
