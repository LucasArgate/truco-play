import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import Icon from './Icon';
import InitialsAvatar from './InitialsAvatar';

const Avatar = ({ 
  src, 
  alt = 'Avatar', 
  size = 'md', 
  className,
  fallback,
  ...props 
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

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

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
    '2xl': 'text-xl'
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  const handleImageLoad = () => {
    setImageError(false);
    setImageLoaded(true);
  };

  const shouldShowFallback = !src || imageError || !imageLoaded;

  return (
    <div
      className={cn(
        'relative flex shrink-0 overflow-hidden rounded-full',
        sizes[size],
        className
      )}
      {...props}
    >
      {src && !imageError ? (
        <img
          className={cn(
            'aspect-square h-full w-full object-cover transition-opacity duration-200',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )}
          src={src}
          alt={alt}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
      ) : null}
      
      {shouldShowFallback && (
        fallback ? (
          <InitialsAvatar 
            name={fallback} 
            size={size} 
            className="h-full w-full"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20">
            <Icon 
              name="user" 
              size={iconSizes[size]} 
              className="text-primary" 
            />
          </div>
        )
      )}
    </div>
  );
};

export default Avatar;

