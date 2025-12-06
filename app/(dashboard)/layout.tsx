import { getCurrentUser } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ToastProvider } from '@/components/dashboard/ToastContainer';
import NavLink from '@/components/dashboard/NavLink';
import Button from '@/components/atoms/Button';
import { cache } from 'react';
import { unstable_cache } from 'next/cache';

// Cache counts to reduce duplicate queries
const getCachedCounts = cache(async () => {
  const [servicesCount, blogCount] = await Promise.all([
    prisma.service.count(),
    prisma.blogPost.count(),
  ]);
  return { servicesCount, blogCount };
});

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  // إحصائيات سريعة (cached)
  const { servicesCount, blogCount } = await getCachedCounts();

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg border-r border-gray-200 dark:border-gray-800 z-40">
        <div className="p-6 h-full flex flex-col relative">
          <div className="mb-8 relative z-10">
            <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              Belqees Media
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">لوحة التحكم</p>
          </div>

          <nav className="space-y-1 flex-1">
            <NavLink href="/dashboard" icon="LayoutDashboard">
              لوحة التحكم
            </NavLink>
            <NavLink href="/dashboard/services" icon="Settings" badge={servicesCount}>
              الخدمات
            </NavLink>
            <NavLink href="/dashboard/events" icon="Calendar">
              الفعاليات
            </NavLink>
            <NavLink href="/dashboard/blog" icon="BookOpen" badge={blogCount}>
              المدونة
            </NavLink>
            <NavLink href="/dashboard/media" icon="FolderOpen">
              الملفات
            </NavLink>
            <NavLink href="/dashboard/contact" icon="Mail">
              رسائل التواصل
            </NavLink>
            <NavLink href="/dashboard/settings" icon="Settings">
              الإعدادات
            </NavLink>
            {user.role === 'ADMIN' && (
              <NavLink href="/dashboard/users" icon="Users">
                المستخدمين
              </NavLink>
            )}
          </nav>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {user.email}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500">
              الدور: {user.role}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-64 flex flex-col min-h-screen">
        {/* Page Content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
    </ToastProvider>
  );
}

