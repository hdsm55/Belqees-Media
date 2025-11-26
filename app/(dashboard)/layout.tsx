import { getCurrentUser } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ToastProvider } from '@/components/dashboard/ToastContainer';
import NavLink from '@/components/dashboard/NavLink';
import Button from '@/components/atoms/Button';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  // إحصائيات سريعة
  const [pagesCount, servicesCount, portfolioCount, blogCount] = await Promise.all([
    prisma.page.count(),
    prisma.service.count(),
    prisma.portfolio.count(),
    prisma.blogPost.count(),
  ]);

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg border-r border-gray-200 dark:border-gray-800">
        <div className="p-6 h-full flex flex-col">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              Belqees Media
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">لوحة التحكم</p>
          </div>

          <nav className="space-y-1 flex-1">
            <NavLink href="/dashboard" icon="📊">
              لوحة التحكم
            </NavLink>
            <NavLink href="/dashboard/pages" icon="📄" badge={pagesCount}>
              الصفحات
            </NavLink>
            <NavLink href="/dashboard/services" icon="⚙️" badge={servicesCount}>
              الخدمات
            </NavLink>
            <NavLink href="/dashboard/portfolio" icon="💼" badge={portfolioCount}>
              الأعمال
            </NavLink>
            <NavLink href="/dashboard/events" icon="📅">
              الفعاليات
            </NavLink>
            <NavLink href="/dashboard/blog" icon="✍️" badge={blogCount}>
              المدونة
            </NavLink>
            <NavLink href="/dashboard/media" icon="📁">
              الملفات
            </NavLink>
            {user.role === 'ADMIN' && (
              <NavLink href="/dashboard/users" icon="👥">
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
      <div className="ml-64">
        {/* Top Bar */}
        <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800">
          <div className="px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">لوحة التحكم</h2>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                target="_blank"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
              >
                عرض الموقع
              </Link>
              <form action="/api/auth/logout" method="POST">
                <Button
                  type="submit"
                  variant="outline"
                  size="sm"
                  className="border-red-300 text-red-600 hover:bg-red-50"
                >
                  تسجيل الخروج
                </Button>
              </form>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main>{children}</main>
      </div>
    </div>
    </ToastProvider>
  );
}

