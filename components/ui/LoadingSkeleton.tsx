interface LoadingSkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
  width?: string | number;
  height?: string | number;
}

export default function LoadingSkeleton({
  className = '',
  variant = 'rectangular',
  width,
  height,
}: LoadingSkeletonProps) {
  const baseClasses = 'animate-pulse bg-gray-200 rounded';

  const variantClasses = {
    text: 'h-4 rounded',
    rectangular: 'rounded',
    circular: 'rounded-full',
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{
        width: width || '100%',
        height: height || variant === 'text' ? '1rem' : '200px',
      }}
    />
  );
}

// Pre-built skeleton components
export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <LoadingSkeleton
          key={i}
          variant="text"
          width={i === lines - 1 ? '80%' : '100%'}
        />
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <LoadingSkeleton variant="rectangular" height="200px" className="mb-4" />
      <LoadingSkeleton variant="text" width="60%" className="mb-2" />
      <LoadingSkeleton variant="text" width="100%" />
    </div>
  );
}

