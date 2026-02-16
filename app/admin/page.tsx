'use client';

import {
    Users,
    MessageSquare,
    Briefcase,
    TrendingUp,
    ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

interface RecentMessage {
    id: string;
    name: string;
    subject: string;
    createdAt: string;
}

export default function AdminDashboard() {
    const [counts, setCounts] = useState({ messages: 0, portfolio: 0, events: 0, services: 0 });
    const [recentMessages, setRecentMessages] = useState<RecentMessage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    { count: msgCount },
                    { count: portCount },
                    { count: eventCount },
                    { count: servCount },
                    { data: recentMsgs }
                ] = await Promise.all([
                    supabase.from('contact_messages').select('*', { count: 'exact', head: true }),
                    supabase.from('portfolio').select('*', { count: 'exact', head: true }),
                    supabase.from('events').select('*', { count: 'exact', head: true }),
                    supabase.from('services').select('*', { count: 'exact', head: true }),
                    supabase.from('contact_messages').select('id, name, subject, createdAt').order('createdAt', { ascending: false }).limit(3)
                ]);

                setCounts({
                    messages: msgCount || 0,
                    portfolio: portCount || 0,
                    events: eventCount || 0,
                    services: servCount || 0
                });

                setRecentMessages(recentMsgs || []);
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const stats = [
        { label: 'إجمالي الرسائل', value: String(counts.messages), icon: MessageSquare, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'الأعمال المنتجة', value: String(counts.portfolio), icon: Briefcase, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'الفعاليات القادمة', value: String(counts.events), icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
        { label: 'الخدمات الحالية', value: String(counts.services), icon: Users, color: 'text-orange-600', bg: 'bg-orange-50' },
    ];
    return (
        <div className="space-y-10" dir="rtl">
            {/* Welcome Header */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900">أهلاً بك في مدير بلقيس ميديا 👋</h2>
                <p className="text-gray-500 mt-1">هنا يمكنك إدارة محتوى الموقع ومتابعة الرسائل الواردة.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center gap-5">
                        <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions & Recent Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Messages Preview */}
                <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-gray-900">آخر الرسائل</h3>
                        <Link href="/admin/messages" className="text-sm text-primary-600 hover:underline flex items-center gap-1">
                            عرض الكل <ArrowRight size={14} className="rotate-180" />
                        </Link>
                    </div>

                    <div className="flex-1 space-y-4">
                        {loading ? (
                            <div className="flex items-center justify-center py-10">
                                <div className="w-8 h-8 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin" />
                            </div>
                        ) : recentMessages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                                <MessageSquare size={48} strokeWidth={1} className="mb-4 opacity-20" />
                                <p className="text-sm">لا توجد رسائل جديدة حالياً</p>
                            </div>
                        ) : (
                            recentMessages.map((msg) => (
                                <div key={msg.id} className="p-3 rounded-xl bg-gray-50 border border-gray-100/50 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-gray-900">{msg.name}</span>
                                        <span className="text-[10px] text-gray-400">
                                            {new Intl.DateTimeFormat('ar-SA', { dateStyle: 'short' }).format(new Date(msg.createdAt))}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 line-clamp-1">{msg.subject}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Content Management Quick Links */}
                <div className="space-y-4">
                    <h3 className="font-bold text-gray-900">روابط سريعة</h3>
                    <div className="grid grid-cols-1 gap-3">
                        {[
                            { label: 'إضافة عمل جديد', href: '/admin/portfolio/new' },
                            { label: 'إضافة فعالية جديدة', href: '/admin/events/new' },
                            { label: 'تعديل بيانات التواصل', href: '/admin/settings' },
                        ].map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="p-4 rounded-xl border border-gray-100 hover:border-primary-200 hover:bg-primary-50 transition-all flex items-center justify-between group"
                            >
                                <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700">{link.label}</span>
                                <ArrowRight size={16} className="text-gray-400 rotate-180 group-hover:text-primary-500 group-hover:-translate-x-1 transition-all" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
