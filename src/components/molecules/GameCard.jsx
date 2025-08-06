import React from 'react';
import { cn } from '@/lib/utils';
import Text from '../atoms/Text';
import Icon from '../atoms/Icon';

const GameCard = ({ 
  suit, 
  value, 
  isSelected = false, 
  isPlayable = true,
  onClick,
  className,
  size = 'md',
  ...props 
}) => {
  const sizes = {
    sm: 'w-12 h-16',
    md: 'w-16 h-24',
    lg: 'w-20 h-28',
    xl: 'w-24 h-32'
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  };

  const iconSizes = {
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24
  };

  const getSuitColor = (suit) => {
    switch (suit) {
      case 'hearts':
      case 'diamonds':
        return 'text-red-500';
      case 'clubs':
      case 'spades':
        return 'text-gray-800';
      default:
        return 'text-gray-600';
    }
  };

  const getSuitIcon = (suit) => {
    switch (suit) {
      case 'hearts':
        return 'heart';
      case 'diamonds':
        return 'diamond';
      case 'clubs':
        return 'club';
      case 'spades':
        return 'spade';
      default:
        return 'star';
    }
  };

  return (
    <div
      className={cn(
        'relative bg-white border-2 border-gray-300 rounded-lg shadow-md cursor-pointer transition-all duration-200 flex flex-col items-center justify-between p-2',
        sizes[size],
        isSelected && 'border-primary shadow-lg transform -translate-y-2',
        !isPlayable && 'opacity-50 cursor-not-allowed',
        isPlayable && 'hover:shadow-lg hover:border-gray-400',
        className
      )}
      onClick={isPlayable ? onClick : undefined}
      {...props}
    >
      {/* Valor da carta no canto superior esquerdo */}
      <div className={cn('absolute top-1 left-1', getSuitColor(suit))}>
        <Text variant="small" className={cn('font-bold', textSizes[size])}>
          {value}
        </Text>
      </div>

      {/* Ícone do naipe no centro */}
      <div className={cn('flex-1 flex items-center justify-center', getSuitColor(suit))}>
        <Icon 
          name={getSuitIcon(suit)} 
          size={iconSizes[size]} 
        />
      </div>

      {/* Valor da carta no canto inferior direito (invertido) */}
      <div className={cn('absolute bottom-1 right-1 transform rotate-180', getSuitColor(suit))}>
        <Text variant="small" className={cn('font-bold', textSizes[size])}>
          {value}
        </Text>
      </div>
    </div>
  );
};

export default GameCard;

