import React from 'react';
import { cn } from '@/lib/utils';

const Text = ({ 
  variant = 'body', 
  className, 
  children, 
  as: Component = 'p',
  ...props 
}) => {
  const variants = {
    h1: 'text-4xl font-bold tracking-tight lg:text-5xl',
    h2: 'text-3xl font-semibold tracking-tight',
    h3: 'text-2xl font-semibold tracking-tight',
    h4: 'text-xl font-semibold tracking-tight',
    h5: 'text-lg font-semibold',
    h6: 'text-base font-semibold',
    body: 'text-base',
    small: 'text-sm text-muted-foreground',
    large: 'text-lg font-semibold',
    lead: 'text-xl text-muted-foreground',
    muted: 'text-sm text-muted-foreground',
    caption: 'text-xs text-muted-foreground uppercase tracking-wide'
  };

  return (
    <Component
      className={cn(variants[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Text;

