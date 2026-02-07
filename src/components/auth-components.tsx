'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Shield, Lock, Mail, ArrowRight, Check, X, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/cn';

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helper?: string;
  icon?: React.ReactNode;
  showPasswordToggle?: boolean;
  strength?: 'weak' | 'medium' | 'strong';
}

export function AuthInput({
  label,
  error,
  helper,
  icon,
  showPasswordToggle = false,
  strength,
  className,
  ...props
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputType = props.type === 'password' && showPassword ? 'text' : props.type;

  const getStrengthColor = () => {
    switch (strength) {
      case 'strong': return 'bg-green-500';
      case 'medium': return 'bg-amber-500';
      case 'weak': return 'bg-red-500';
      default: return '';
    }
  };

  const getStrengthText = () => {
    switch (strength) {
      case 'strong': return 'Strong password';
      case 'medium': return 'Medium strength';
      case 'weak': return 'Weak password';
      default: return '';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className={cn(
          "text-sm font-medium transition-colors",
          error ? "text-red-600" : isFocused ? "text-primary-600" : "text-slate-700"
        )}>
          {label}
        </label>
        {strength && (
          <span className={cn(
            "text-xs font-medium transition-colors",
            strength === 'strong' ? "text-green-600" : 
            strength === 'medium' ? "text-amber-600" : "text-red-600"
          )}>
            {getStrengthText()}
          </span>
        )}
      </div>
      
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
            "w-full rounded-lg border px-4 py-3 text-sm transition-all duration-200",
            "placeholder:text-slate-400",
            "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
            icon && "pl-10",
            showPasswordToggle && "pr-10",
            error 
              ? "border-red-300 bg-red-50 text-red-900 placeholder-red-400 focus:ring-red-500" 
              : "border-slate-300 bg-white text-slate-900 focus:bg-primary-50/50",
            className
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <AnimatePresence mode="wait">
              {showPassword ? (
                <motion.div
                  key="hide"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <EyeOff className="h-4 w-4" />
                </motion.div>
              ) : (
                <motion.div
                  key="show"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Eye className="h-4 w-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        )}
      </div>
      
      {strength && (
        <div className="flex gap-1">
          {[1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={cn(
                "h-1 flex-1 rounded-full transition-colors",
                strength === 'strong' && level <= 4 ? getStrengthColor() :
                strength === 'medium' && level <= 2 ? getStrengthColor() :
                strength === 'weak' && level <= 1 ? getStrengthColor() :
                "bg-slate-200"
              )}
            />
          ))}
        </div>
      )}
      
      {helper && !error && (
        <p className="text-xs text-slate-500">{helper}</p>
      )}
      
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

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
}

export function AuthButton({
  children,
  isLoading = false,
  loadingText,
  icon,
  className,
  ...props
}: AuthButtonProps) {
  return (
    <Button
      className={cn(
        "relative w-full py-3 text-base font-semibold transition-all duration-200",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      disabled={isLoading}
      {...props}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-2"
          >
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            {loadingText || 'Loading...'}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-2"
          >
            {children}
            {icon && <ArrowRight className="h-4 w-4" />}
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
}

interface AuthAlertProps {
  type: 'error' | 'success' | 'info';
  message: string;
  onClose?: () => void;
}

export function AuthAlert({ type, message, onClose }: AuthAlertProps) {
  const getStyles = () => {
    switch (type) {
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'error': return <X className="h-4 w-4" />;
      case 'success': return <Check className="h-4 w-4" />;
      case 'info': return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn(
        "relative flex items-start gap-3 rounded-lg border p-4 text-sm",
        getStyles()
      )}
    >
      <div className="flex-shrink-0 mt-0.5">
        {getIcon()}
      </div>
      <div className="flex-1">
        {message}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 ml-2 hover:opacity-70 transition-opacity"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </motion.div>
  );
}

interface SocialAuthButtonProps {
  provider: 'google' | 'microsoft' | 'github';
  onClick: () => void;
  isLoading?: boolean;
}

export function SocialAuthButton({ provider, onClick, isLoading }: SocialAuthButtonProps) {
  const getProviderInfo = () => {
    switch (provider) {
      case 'google':
        return {
          name: 'Google',
          icon: (
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          ),
          bgColor: 'bg-white hover:bg-slate-50',
          textColor: 'text-slate-700',
          borderColor: 'border-slate-300'
        };
      case 'microsoft':
        return {
          name: 'Microsoft',
          icon: (
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <rect x="2" y="2" width="9" height="9" fill="#f25022"/>
              <rect x="13" y="2" width="9" height="9" fill="#7fba00"/>
              <rect x="2" y="13" width="9" height="9" fill="#00a4ef"/>
              <rect x="13" y="13" width="9" height="9" fill="#ffb900"/>
            </svg>
          ),
          bgColor: 'bg-white hover:bg-slate-50',
          textColor: 'text-slate-700',
          borderColor: 'border-slate-300'
        };
      case 'github':
        return {
          name: 'GitHub',
          icon: <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>,
          bgColor: 'bg-slate-900 hover:bg-slate-800',
          textColor: 'text-white',
          borderColor: 'border-slate-700'
        };
    }
  };

  const info = getProviderInfo();

  return (
    <Button
      variant="outline"
      onClick={onClick}
      disabled={isLoading}
      className={cn(
        "w-full py-3 font-medium transition-all duration-200",
        info.bgColor, info.textColor, info.borderColor
      )}
    >
      <div className="flex items-center justify-center gap-3">
        {info.icon}
        <span>Continue with {info.name}</span>
      </div>
    </Button>
  );
}
