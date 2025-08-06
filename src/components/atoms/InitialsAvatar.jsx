import React from 'react';
import { cn } from '../../lib/utils';

const InitialsAvatar = ({ 
  name = 'User', 
  size = 'md', 
  className,
  ...props 
}) => {
  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg',
    '2xl': 'h-20 w-20 text-xl'
  };

  // Gera cores baseadas no nome
  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getColorFromName = (name) => {
    if (!name) return 'from-gray-400 to-gray-500';
    
    const colors = [
      'from-red-400 to-red-500',
      'from-blue-400 to-blue-500',
      'from-green-400 to-green-500',
      'from-yellow-400 to-yellow-500',
      'from-purple-400 to-purple-500',
      'from-pink-400 to-pink-500',
      'from-indigo-400 to-indigo-500',
      'from-teal-400 to-teal-500',
      'from-orange-400 to-orange-500',
      'from-cyan-400 to-cyan-500'
    ];
    
    // Gera um índice baseado no nome
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  const initials = getInitials(name);
  const colorClass = getColorFromName(name);

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full bg-gradient-to-br text-white font-bold',
        colorClass,
        sizes[size],
        className
      )}
      {...props}
    >
      {initials}
    </div>
  );
};

export default InitialsAvatar; 