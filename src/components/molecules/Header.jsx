import React from 'react';
import Button from '../atoms/Button';
import Text from '../atoms/Text';
import Icon from '../atoms/Icon';
import Avatar from '../atoms/Avatar';
import { DarkModeToggle } from '../atoms/DarkModeToggle';

const Header = ({ 
  title, 
  showBackButton = false, 
  onBack, 
  user = null, 
  onMenuClick,
  rightAction = null 
}) => {
  return (
    <header className="flex items-center justify-between p-4 bg-gradient-to-r from-background to-muted border-b border-border shadow-sm">
      <div className="flex items-center space-x-3">
        {showBackButton && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="mr-2 hover:bg-accent rounded-full"
          >
            <Icon name="arrowLeft" size={20} />
          </Button>
        )}
        
        {title && (
          <Text variant="h4" className="font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            {title}
          </Text>
        )}
      </div>

      <div className="flex items-center space-x-3">
        {user && (
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-3 py-2 rounded-full">
              <Avatar 
                src={user.avatar} 
                alt={user.name}
                size="sm"
                fallback={user.name?.charAt(0)?.toUpperCase()}
                className="border-2 border-primary-foreground"
              />
              <div className="hidden sm:block">
                <Text variant="small" className="font-bold text-primary-foreground">
                  {user.name}
                </Text>
                <Text variant="caption" className="text-primary-foreground/80">
                  {user.chips?.toLocaleString()} fichas
                </Text>
              </div>
            </div>
          </div>
        )}

        {/* Toggle do Dark Mode */}
        <DarkModeToggle />

        {rightAction}

        {onMenuClick && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="hover:bg-accent"
          >
            <Icon name="menu" size={20} />
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;

