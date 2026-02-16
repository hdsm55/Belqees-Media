'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Loader2, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            router.push('/admin');
            router.refresh();
        } catch (err: any) {
            setError(err.message || 'فشل تسجيل الدخول. يرجى التحقق من البيانات.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4" dir="rtl">
            <div className="max-w-md w-full">
                {/* Logo & Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-600 text-white shadow-lg shadow-primary-200 mb-4">
                        <Lock size={32} />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">مدير بلقيس ميديا</h1>
                    <p className="text-gray-500 mt-2">يرجى تسجيل الدخول للوصول للوحة التحكم</p>
                </div>

                {/* Login Card */}
                <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm flex items-center gap-3 border border-red-100 animate-shake">
                                <AlertCircle size={20} className="shrink-0" />
                                <p>{error}</p>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 block mr-1">البريد الإلكتروني</label>
                            <div className="relative">
                                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pr-12 pl-4 focus:ring-2 focus:ring-primary-500 focus:bg-white outline-none transition-all"
                                    placeholder="admin@belqees.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 block mr-1">كلمة المرور</label>
                            <div className="relative">
                                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pr-12 pl-4 focus:ring-2 focus:ring-primary-500 focus:bg-white outline-none transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary-600 text-white font-bold py-4 rounded-xl hover:bg-primary-700 focus:ring-4 focus:ring-primary-100 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-200 disabled:opacity-70"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    جاري التحقق...
                                </>
                            ) : (
                                'تسجيل الدخول'
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <p className="text-center text-gray-400 text-sm mt-8">
                    &copy; {new Date().getFullYear()} بلقيس ميديا. جميع الحقوق محفوظة.
                </p>
            </div>
        </div>
    );
}
