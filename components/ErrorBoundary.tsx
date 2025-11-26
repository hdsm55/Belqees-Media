'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import Link from 'next/link';
import Button from '@/components/atoms/Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console or error tracking service
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // You can also log to an error reporting service here
    // Example: logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white dark:bg-gray-900 px-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-8">
              <h1 className="text-6xl font-bold text-primary-500 dark:text-primary-400 mb-4">
                ⚠️
              </h1>
              <h2 className="text-3xl font-bold text-dark dark:text-gray-100 mb-4">
                حدث خطأ!
              </h2>
              <p className="text-lg text-dark-light dark:text-gray-300 mb-8">
                نعتذر، حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={this.handleReset}
                variant="recording"
                size="lg"
                className="w-full sm:w-auto"
                showRecordingDot={true}
                showBrackets={true}
                continuousGlow={true}
                aria-label="إعادة المحاولة"
              >
                حاول مرة أخرى
              </Button>
              <Link href="/">
                <Button
                  variant="recording"
                  size="lg"
                  className="w-full sm:w-auto"
                  showRecordingDot={true}
                  showBrackets={true}
                  continuousGlow={true}
                  aria-label="العودة للصفحة الرئيسية"
                >
                  العودة للرئيسية
                </Button>
              </Link>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-left">
                <p className="text-sm font-mono text-red-600 dark:text-red-400 break-all">
                  {this.state.error.message}
                </p>
                {this.state.error.stack && (
                  <pre className="text-xs mt-2 text-gray-600 dark:text-gray-400 overflow-auto max-h-40">
                    {this.state.error.stack}
                  </pre>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

