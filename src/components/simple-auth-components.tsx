'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';

interface SimpleAuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  showPasswordToggle?: boolean;
}

export function SimpleAuthInput({
  label,
  error,
  icon,
  showPasswordToggle = false,
  className,
  ...props
}: SimpleAuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = props.type === 'password' && showPassword ? 'text' : props.type;

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}
        
        <input
          {...props}
          type={inputType}
          className={cn(
            "w-full rounded-lg border border-slate-300 px-4 py-3 text-sm transition-colors",
            "placeholder:text-slate-400",
            "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
            icon && "pl-10",
            showPasswordToggle && "pr-10",
            error && "border-red-300 focus:ring-red-500",
            className
          )}
        />
        
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
      
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 text-xs text-red-600"
          >
            <AlertCircle className="h-3 w-3" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface SimpleAuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
}

export function SimpleAuthButton({
  children,
  isLoading = false,
  loadingText,
  className,
  ...props
}: SimpleAuthButtonProps) {
  return (
    <Button
      className={cn(
        "relative w-full py-3 text-base font-semibold transition-colors",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          {loadingText || 'Loading...'}
        </div>
      ) : (
        children
      )}
    </Button>
  );
}
