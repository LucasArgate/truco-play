import React from 'react';
import { cn } from '../../lib/utils';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import Text from '../atoms/Text';
import { DarkModeToggle } from '../atoms/DarkModeToggle';

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
      'fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-lg z-50 backdrop-blur-sm bg-background/80',
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
                ? 'text-primary bg-primary/10 shadow-sm' 
                : 'hover:bg-accent'
            )}
          >
            <div className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300',
              activeRoute === item.id 
                ? 'bg-gradient-to-r from-primary to-primary/80' 
                : 'bg-muted'
            )}>
              <Icon 
                name={item.icon} 
                size={18} 
                className={cn(
                  'transition-colors',
                  activeRoute === item.id ? 'text-primary-foreground' : 'text-muted-foreground'
                )}
              />
            </div>
            <Text 
              variant="caption" 
              className={cn(
                'transition-colors text-xs font-medium',
                activeRoute === item.id ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {item.label}
            </Text>
          </Button>
        ))}
        
        {/* Toggle do Dark Mode - apenas em páginas específicas */}
        {activeRoute === 'profile' && (
          <div className="flex flex-col items-center space-y-1">
            <DarkModeToggle className="w-8 h-8 rounded-full bg-muted hover:bg-accent" />
            <Text variant="caption" className="text-xs font-medium text-muted-foreground">
              Tema
            </Text>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

