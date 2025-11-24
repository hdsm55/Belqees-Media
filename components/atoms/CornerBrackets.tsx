'use client';

interface CornerBracketsProps {
  className?: string;
  showOnHover?: boolean;
}

export default function CornerBrackets({ className = '', showOnHover = true }: CornerBracketsProps) {
  const baseClasses = showOnHover
    ? 'opacity-0 group-hover:opacity-100 transition-opacity duration-300'
    : 'opacity-100';

  return (
    <>
      {/* Top Left */}
      <div
        className={`absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-dark dark:border-gray-100 ${baseClasses} ${className}`}
        style={{ transitionDelay: '0ms' }}
      />
      {/* Top Right */}
      <div
        className={`absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-dark dark:border-gray-100 ${baseClasses} ${className}`}
        style={{ transitionDelay: '50ms' }}
      />
      {/* Bottom Left */}
      <div
        className={`absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-dark dark:border-gray-100 ${baseClasses} ${className}`}
        style={{ transitionDelay: '100ms' }}
      />
      {/* Bottom Right */}
      <div
        className={`absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-dark dark:border-gray-100 ${baseClasses} ${className}`}
        style={{ transitionDelay: '150ms' }}
      />
    </>
  );
}

