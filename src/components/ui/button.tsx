'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'subtle' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'default', 
    children, 
    ...props 
  }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2',
          'disabled:opacity-50 disabled:pointer-events-none',
          {
            // Default variant
            'bg-slate-900 text-white hover:bg-slate-700': variant === 'default',
            // Outline variant
            'border border-slate-200 hover:bg-slate-100': variant === 'outline',
            // Subtle variant
            'bg-slate-100 text-slate-900 hover:bg-slate-200': variant === 'subtle',
            // Ghost variant
            'hover:bg-slate-100': variant === 'ghost',
            // Link variant
            'hover:underline': variant === 'link',
          },
          {
            // Size variants
            'h-9 px-4 py-2': size === 'default',
            'h-8 px-3 text-xs': size === 'sm',
            'h-10 px-8': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
)

Button.displayName = 'Button';
