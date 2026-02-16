'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    MessageSquare,
    Briefcase,
    Calendar,
    Settings,
    Settings2,
    LogOut,
    Menu,
    X
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/utils/cn';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

const sidebarItems = [
    { icon: LayoutDashboard, label: 'الرئيسية', href: '/admin' },
    { icon: MessageSquare, label: 'الرسائل', href: '/admin/messages' },
    { icon: Calendar, label: 'الفعاليات', href: '/admin/events' },
    { icon: Settings, label: 'الإعدادات', href: '/admin/settings' },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/admin/login');
        router.refresh();
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Mobile Sidebar Toggle */}
            <button
                className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-primary-600 text-white rounded-lg shadow-lg"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 right-0 z-40 w-64 bg-white border-l border-gray-200 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0",
                    isSidebarOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <div className="h-full flex flex-col">
                    {/* Logo Section */}
                    <div className="h-20 flex items-center justify-center border-b border-gray-100 px-6">
                        <h1 className="text-xl font-bold text-primary-600 tracking-tight">
                            Belqees Admin
                        </h1>
                    </div>

                    {/* Navigation Items */}
                    <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
                        {sidebarItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                                        isActive
                                            ? "bg-primary-50 text-primary-600 shadow-sm"
                                            : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                    )}
                                    onClick={() => setIsSidebarOpen(false)}
                                >
                                    <item.icon size={20} />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer Section (Logout) */}
                    <div className="p-4 border-t border-gray-100">
                        <button
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                            onClick={handleLogout}
                        >
                            <LogOut size={20} />
                            <span>تسجيل الخروج</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
                <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm min-h-full border border-gray-100 p-6 lg:p-10">
                    {children}
                </div>
            </main>
        </div>
    );
}
