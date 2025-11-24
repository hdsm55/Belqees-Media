/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  // Note: i18n configuration removed - Next.js 14 App Router uses different approach
  // We'll implement i18n using next-intl or similar library
};

module.exports = nextConfig;

