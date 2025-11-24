import { getCurrentUser } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

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
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary-600 mb-8">Belqees Media</h1>

          <nav className="space-y-2">
            <Link
              href="/dashboard"
              className="block px-4 py-2 rounded hover:bg-primary-50 text-gray-700 hover:text-primary-600"
            >
              لوحة التحكم
            </Link>
            <Link
              href="/dashboard/pages"
              className="block px-4 py-2 rounded hover:bg-primary-50 text-gray-700 hover:text-primary-600"
            >
              الصفحات ({pagesCount})
            </Link>
            <Link
              href="/dashboard/services"
              className="block px-4 py-2 rounded hover:bg-primary-50 text-gray-700 hover:text-primary-600"
            >
              الخدمات ({servicesCount})
            </Link>
            <Link
              href="/dashboard/portfolio"
              className="block px-4 py-2 rounded hover:bg-primary-50 text-gray-700 hover:text-primary-600"
            >
              الأعمال ({portfolioCount})
            </Link>
            <Link
              href="/dashboard/events"
              className="block px-4 py-2 rounded hover:bg-primary-50 text-gray-700 hover:text-primary-600"
            >
              الفعاليات
            </Link>
            <Link
              href="/dashboard/blog"
              className="block px-4 py-2 rounded hover:bg-primary-50 text-gray-700 hover:text-primary-600"
            >
              المدونة ({blogCount})
            </Link>
            <Link
              href="/dashboard/media"
              className="block px-4 py-2 rounded hover:bg-primary-50 text-gray-700 hover:text-primary-600"
            >
              الملفات
            </Link>
            {user.role === 'ADMIN' && (
              <Link
                href="/dashboard/users"
                className="block px-4 py-2 rounded hover:bg-primary-50 text-gray-700 hover:text-primary-600"
              >
                المستخدمين
              </Link>
            )}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-64">
        {/* Top Bar */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">لوحة التحكم</h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{user.email}</span>
              <form action="/api/auth/logout" method="POST">
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  تسجيل الخروج
                </button>
              </form>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main>{children}</main>
      </div>
    </div>
  );
}

