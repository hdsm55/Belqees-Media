import Link from 'next/link';
import Button from '@/components/atoms/Button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-bold text-dark mb-4">الصفحة غير موجودة</h2>
          <p className="text-lg text-dark-light mb-8">
            عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
          </p>
        </div>

        <Link href="/">
          <Button variant="video" size="lg" className="w-full sm:w-auto" showRecordingDot={true}>
            العودة للرئيسية
          </Button>
        </Link>
      </div>
    </div>
  );
}

