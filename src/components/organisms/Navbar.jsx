import React from 'react';
import { cn } from '@/lib/utils';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import Text from '../atoms/Text';

const Navbar = ({ 
  activeRoute = 'home', 
  onNavigate, 
  className,
  user = null 
}) => {
  const navItems = [
    {
      id: 'home',
      label: 'Início',
      icon: 'home',
      route: '/home'
    },
    {
      id: 'game',
      label: 'Jogar',
      icon: 'play',
      route: '/queue'
    },
    {
      id: 'ranking',
      label: 'Ranking',
      icon: 'trophy',
      route: '/ranking'
    },
    {
      id: 'profile',
      label: 'Perfil',
      icon: 'user',
      route: '/profile'
    }
  ];

  return (
    <nav className={cn(
      'fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 backdrop-blur-sm bg-white/80',
      className
    )}>
      <div className="flex items-center justify-around py-3 px-4 max-w-md mx-auto">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            size="sm"
            onClick={() => onNavigate(item.route)}
            className={cn(
              'flex flex-col items-center space-y-1 h-auto py-2 px-3 min-w-0 rounded-xl transition-all duration-300',
              activeRoute === item.id 
                ? 'text-purple-600 bg-purple-50 shadow-sm' 
                : 'hover:bg-gray-50'
            )}
          >
            <div className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300',
              activeRoute === item.id 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                : 'bg-gray-100'
            )}>
              <Icon 
                name={item.icon} 
                size={18} 
                className={cn(
                  'transition-colors',
                  activeRoute === item.id ? 'text-white' : 'text-gray-600'
                )}
              />
            </div>
            <Text 
              variant="caption" 
              className={cn(
                'transition-colors text-xs font-medium',
                activeRoute === item.id ? 'text-purple-600' : 'text-gray-600'
              )}
            >
              {item.label}
            </Text>
          </Button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;

