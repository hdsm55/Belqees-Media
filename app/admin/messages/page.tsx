'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import {
    MessageSquare,
    User,
    Mail,
    Clock,
    RefreshCw,
    Trash2
} from 'lucide-react';

interface Message {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: string;
}

export default function MessagesPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchMessages = async () => {
        try {
            setRefreshing(true);
            const { data, error } = await supabase
                .from('contact_messages')
                .select('*')
                .order('createdAt', { ascending: false });

            if (error) {
                console.error('Supabase Error:', error);
                throw error;
            }
            setMessages(data || []);
        } catch (err) {
            console.error('Error fetching messages:', err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const deleteMessage = async (id: string) => {
        if (!confirm('هل أنت متأكد من حذف هذه الرسالة؟')) return;

        try {
            const { error } = await supabase
                .from('contact_messages')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setMessages(messages.filter(m => m.id !== id));
        } catch (err) {
            alert('حدث خطأ أثناء الحذف');
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <div className="space-y-8" dir="rtl">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">رسائل التواصل</h2>
                    <p className="text-gray-500">متابعة كافة الرسائل الواردة من زوار الموقع.</p>
                </div>
                <button
                    onClick={fetchMessages}
                    disabled={refreshing}
                    className="p-2 text-gray-400 hover:text-primary-600 transition-colors rounded-lg hover:bg-primary-50"
                    title="تحديث القائمة"
                >
                    <RefreshCw size={24} className={refreshing ? "animate-spin" : ""} />
                </button>
            </div>

            {loading ? (
                <div className="py-20 flex flex-col items-center justify-center text-gray-400">
                    <div className="w-10 h-10 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin mb-4" />
                    <p>جاري تحميل الرسائل...</p>
                </div>
            ) : messages.length === 0 ? (
                <div className="py-20 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-100 rounded-2xl">
                    <MessageSquare size={64} strokeWidth={1} className="mb-4 opacity-20" />
                    <p className="text-lg">لا توجد أي رسائل حتى الآن</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className="group p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-primary-200 transition-all"
                        >
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                <div className="space-y-3 flex-1">
                                    <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-gray-400">
                                        <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md text-gray-600">
                                            <User size={14} /> {msg.name}
                                        </span>
                                        <span className="flex items-center gap-1.5 bg-blue-50 px-2 py-1 rounded-md text-blue-600">
                                            <Mail size={14} /> {msg.email}
                                        </span>
                                        <span className="flex items-center gap-1.5 text-gray-400">
                                            <Clock size={14} /> {new Intl.DateTimeFormat('ar-SA', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(msg.createdAt))}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-50 pb-2">
                                        {msg.subject}
                                    </h3>

                                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
                                        {msg.message}
                                    </p>
                                </div>

                                <button
                                    onClick={() => deleteMessage(msg.id)}
                                    className="p-3 text-red-100 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all self-end md:self-start opacity-0 group-hover:opacity-100"
                                    title="حذف الرسالة"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
