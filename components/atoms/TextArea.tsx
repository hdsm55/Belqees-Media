import { TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/index';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export default function TextArea({
  label,
  error,
  className,
  ...props
}: TextAreaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-dark dark:text-dark-300 mb-1">
          {label}
        </label>
      )}
      <textarea
        className={cn(
          'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
          'bg-white dark:bg-dark-800 text-dark dark:text-white',
          'border-dark-300 dark:border-dark-600',
          error && 'border-red-500 dark:border-red-400',
          className
        )}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${props.id || 'textarea'}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${props.id || 'textarea'}-error`} className="mt-1 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
