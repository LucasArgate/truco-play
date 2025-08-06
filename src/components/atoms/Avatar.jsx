import React from 'react';
import { cn } from '@/lib/utils';
import Icon from './Icon';

const Avatar = ({ 
  src, 
  alt = 'Avatar', 
  size = 'md', 
  className,
  fallback,
  ...props 
}) => {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
    '2xl': 'h-20 w-20'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
    '2xl': 40
  };

  return (
    <div
      className={cn(
        'relative flex shrink-0 overflow-hidden rounded-full',
        sizes[size],
        className
      )}
      {...props}
    >
      {src ? (
        <img
          className="aspect-square h-full w-full object-cover"
          src={src}
          alt={alt}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
          {fallback ? (
            <span className="text-sm font-medium text-muted-foreground">
              {fallback}
            </span>
          ) : (
            <Icon 
              name="user" 
              size={iconSizes[size]} 
              className="text-muted-foreground" 
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Avatar;

