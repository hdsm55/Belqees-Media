'use client';

import { useTheme } from '@/components/providers/ThemeProvider';
import { Sun, Moon, Laptop } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ThemeToggleProps {
  isScrolled?: boolean;
}

export default function ThemeToggle({ isScrolled = false }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const getIcon = () => {
    if (theme === 'light') {
      return <Sun className="w-5 h-5" />;
    } else if (theme === 'dark') {
      return <Moon className="w-5 h-5" />;
    } else {
      return <Laptop className="w-5 h-5" />;
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "p-2 rounded-lg transition-colors",
        isScrolled
          ? "hover:bg-gray-100 dark:hover:bg-gray-800"
          : "hover:bg-white/10"
      )}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'} mode`}
    >
      <span className={cn(
        "transition-colors",
        isScrolled ? "text-dark dark:text-gray-300" : "text-white"
      )}>
        {getIcon()}
      </span>
    </button>
  );
}

