'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Loader2, AlertCircle, ArrowLeft, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function AdminRegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error?.message || result.message || 'فشل إنشاء الحساب.');
            }

            setSuccess(true);
            setTimeout(() => {
                router.push('/admin/login');
            }, 2000);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden" dir="rtl">
            {/* Background Decorations */}
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary-900/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-600/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-md w-full relative z-10">
                {/* Back to Login */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                >
                    <Link 
                        href="/admin/login" 
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group text-sm"
                    >
                        <ArrowLeft size={16} className="rotate-180 transition-transform group-hover:translate-x-1" />
                        العودة لتسجيل الدخول
                    </Link>
                </motion.div>

                {/* Logo & Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-2xl shadow-primary-500/20 mb-6 relative group">
                        <div className="absolute inset-0 bg-white/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
                        <User size={36} className="relative z-10" />
                    </div>
                    <h1 className="text-4xl font-black text-white tracking-tight">انضم لبلقيس ميديا</h1>
                    <p className="text-gray-400 mt-3 text-lg">ابدأ رحلتك في إدارة المحتوى الإبداعي</p>
                </motion.div>

                {/* Register Card */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl border border-white/10"
                >
                    <form onSubmit={handleRegister} className="space-y-5">
                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="p-4 rounded-2xl bg-red-500/10 text-red-400 text-sm flex items-center gap-3 border border-red-500/20"
                                >
                                    <AlertCircle size={20} className="shrink-0" />
                                    <p className="font-medium">{error}</p>
                                </motion.div>
                            )}

                            {success && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="p-4 rounded-2xl bg-green-500/10 text-green-400 text-sm flex items-center gap-3 border border-green-500/20"
                                >
                                    <CheckCircle2 size={20} className="shrink-0" />
                                    <p className="font-medium">تم إنشاء الحساب بنجاح! جاري تحويلك لتسجيل الدخول...</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-300 block mr-1">الاسم الكامل</label>
                            <div className="relative group">
                                <User className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary-400 transition-colors" size={20} />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pr-12 pl-4 text-white placeholder-gray-600 focus:ring-2 focus:ring-primary-500 focus:bg-white/10 outline-none transition-all"
                                    placeholder="عبد الله بن علي"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-300 block mr-1">البريد الإلكتروني</label>
                            <div className="relative group">
                                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary-400 transition-colors" size={20} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pr-12 pl-4 text-white placeholder-gray-600 focus:ring-2 focus:ring-primary-500 focus:bg-white/10 outline-none transition-all"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-300 block mr-1">كلمة المرور</label>
                            <div className="relative group">
                                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary-400 transition-colors" size={20} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pr-12 pl-12 text-white placeholder-gray-600 focus:ring-2 focus:ring-primary-500 focus:bg-white/10 outline-none transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            <p className="text-[10px] text-gray-500 mr-2 mt-1">يجب أن تتكون من 6 أحرف على الأقل</p>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading || success}
                            className="w-full bg-primary-600 text-white font-black py-4 rounded-2xl hover:bg-primary-700 focus:ring-4 focus:ring-primary-100 transition-all flex items-center justify-center gap-2 shadow-xl shadow-primary-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={22} />
                                    جاري إنشاء الحساب...
                                </>
                            ) : (
                                'إنشاء حساب جديد'
                            )}
                        </motion.button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-white/10 text-center">
                        <p className="text-gray-500 text-sm">
                            لديك حساب بالفعل؟{' '}
                            <Link href="/admin/login" className="text-primary-400 font-bold hover:text-primary-300 transition-colors">تسجيل الدخول</Link>
                        </p>
                    </div>
                </motion.div>

                {/* Footer */}
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center text-gray-600 text-sm mt-8"
                >
                    &copy; {new Date().getFullYear()} بلقيس ميديا. جميع الحقوق محفوظة.
                </motion.p>
            </div>
        </div>
    );
}
