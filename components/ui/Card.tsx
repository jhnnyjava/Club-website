import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  children: React.ReactNode;
}

export function Card({ hover = false, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-slate-900 border border-slate-800 rounded-2xl p-6',
        hover && 'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-slate-700',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
