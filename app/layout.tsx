import type { Metadata } from 'next';
import { Poppins, Cairo } from 'next/font/google';
import './globals.css';
import LenisProvider from '@/components/providers/LenisProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

const cairo = Cairo({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'بلقيس ميديا - Belqees Media',
  description: 'منصة رقمية متكاملة لبلقيس ميديا',
  icons: {
    icon: '/images/logo.avif',
    shortcut: '/images/logo.avif',
    apple: '/images/logo.avif',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${poppins.variable} ${cairo.variable}`} suppressHydrationWarning>
      <body className="font-arabic antialiased bg-white text-dark dark:bg-gray-900 dark:text-gray-100 transition-colors">
        <ThemeProvider>
          <LenisProvider>
            {children}
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

