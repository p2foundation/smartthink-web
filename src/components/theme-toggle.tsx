'use client';

import { Sun, Moon, Monitor } from 'lucide-react';
import { useThemeStore, type Theme } from '@/stores/theme-store';

const options: { value: Theme; icon: typeof Sun; label: string }[] = [
  { value: 'light', icon: Sun, label: 'Light' },
  { value: 'system', icon: Monitor, label: 'System' },
  { value: 'dark', icon: Moon, label: 'Dark' },
];

export function ThemeToggle() {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="flex items-center gap-1 rounded-lg border border-border bg-bg-secondary p-1">
      {options.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`inline-flex items-center justify-center rounded-md p-1.5 text-sm transition-colors ${
            theme === value
              ? 'bg-bg text-fg shadow-sm'
              : 'text-fg-muted hover:text-fg-secondary'
          }`}
          title={label}
          aria-label={`Switch to ${label} theme`}
        >
          <Icon className="h-4 w-4" />
        </button>
      ))}
    </div>
  );
}
