import type { Metadata, Viewport } from 'next';
import { Tajawal, IBM_Plex_Sans_Arabic } from 'next/font/google';
import './globals.css';
import LenisProvider from '@/components/providers/LenisProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import CustomCursor from '@/components/atoms/CustomCursor';
import PerformanceOptimizer from '@/components/PerformanceOptimizer';
import Header from '@/components/organisms/Header';

// Arabic Font - Tajawal (خط عربي أنيق وحديث)
const tajawal = Tajawal({
  weight: ['300', '400', '500', '700', '800', '900'],
  subsets: ['arabic', 'latin'],
  variable: '--font-tajawal',
  display: 'swap',
});

// IBM Plex Sans Arabic - للعناوين (خط احترافي)
const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  weight: ['400', '500', '600', '700'],
  subsets: ['arabic', 'latin'],
  variable: '--font-ibm-plex',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'بلقيس ميديا - Belqees Media',
    template: '%s | بلقيس ميديا',
  },
  description: 'منصة رقمية متكاملة لبلقيس ميديا - شركة إنتاج إعلامي متكاملة الخدمات تأسست عام 2015',
  keywords: ['Belqees Media', 'إنتاج إعلامي', 'بث مباشر', 'فعاليات', 'استوديوهات', 'إعلام'],
  authors: [{ name: 'Belqees Media' }],
  creator: 'Belqees Media',
  publisher: 'Belqees Media',
  icons: {
    icon: '/images/logo.avif',
    shortcut: '/images/logo.avif',
    apple: '/images/logo.avif',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable} ${ibmPlexSansArabic.variable}`} suppressHydrationWarning>
      <body className="font-arabic antialiased bg-white text-dark dark:bg-gray-900 dark:text-gray-100 transition-colors">
        <ThemeProvider>
          <LenisProvider>
            <PerformanceOptimizer />
            <CustomCursor />
            {/* Header */}
            <Header />
            <div id="main-content">{children}</div>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
