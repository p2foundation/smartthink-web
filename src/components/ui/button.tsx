import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary-600 text-white shadow-sm hover:bg-primary-700 active:bg-primary-800',
        secondary: 'bg-bg-secondary text-fg hover:bg-bg-tertiary active:bg-bg-tertiary',
        outline: 'border-2 border-border bg-transparent hover:bg-bg-secondary active:bg-bg-tertiary',
        ghost: 'hover:bg-bg-secondary active:bg-bg-tertiary',
        destructive: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
        accent: 'bg-accent-600 text-white hover:bg-accent-700 active:bg-accent-800',
      },
      size: {
        sm: 'h-9 px-3 text-xs',
        md: 'h-10 px-4',
        lg: 'h-12 px-6 text-base',
        xl: 'h-14 px-8 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    if (asChild && props.children) {
      const child = React.Children.only(props.children) as React.ReactElement<{ className?: string }>;
      return React.cloneElement(child, {
        className: cn(buttonVariants({ variant, size, className }), child.props.className),
        ref,
        ...child.props,
      } as React.Attributes & { className?: string; ref?: React.Ref<HTMLButtonElement> });
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
