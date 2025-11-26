'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/atoms/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console or error tracking service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-primary mb-4">500</h1>
          <h2 className="text-3xl font-bold text-dark mb-4">حدث خطأ!</h2>
          <p className="text-lg text-dark-light mb-8">
            نعتذر، حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={reset}
            variant="video"
            size="lg"
            className="w-full sm:w-auto"
            showRecordingDot={true}
          >
            حاول مرة أخرى
          </Button>
          <Link href="/">
            <Button variant="video" size="lg" className="w-full sm:w-auto" showRecordingDot={true}>
              العودة للرئيسية
            </Button>
          </Link>
        </div>

        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg text-left">
            <p className="text-sm font-mono text-red-600 break-all">
              {typeof error.message === 'string'
                ? error.message
                : JSON.stringify(error.message, null, 2)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

