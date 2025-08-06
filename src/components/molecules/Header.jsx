import React from 'react';
import Button from '../atoms/Button';
import Text from '../atoms/Text';
import Icon from '../atoms/Icon';
import Avatar from '../atoms/Avatar';

const Header = ({ 
  title, 
  showBackButton = false, 
  onBack, 
  user = null, 
  onMenuClick,
  rightAction = null 
}) => {
  return (
    <header className="flex items-center justify-between p-4 bg-gradient-to-r from-white to-gray-50 border-b border-gray-200 shadow-sm">
      <div className="flex items-center space-x-3">
        {showBackButton && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="mr-2 hover:bg-gray-100 rounded-full"
          >
            <Icon name="arrowLeft" size={20} />
          </Button>
        )}
        
        {title && (
          <Text variant="h4" className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {title}
          </Text>
        )}
      </div>

      <div className="flex items-center space-x-3">
        {user && (
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-2 rounded-full">
              <Avatar 
                src={user.avatar} 
                alt={user.name}
                size="sm"
                fallback={user.name?.charAt(0)?.toUpperCase()}
                className="border-2 border-white"
              />
              <div className="hidden sm:block">
                <Text variant="small" className="font-bold text-white">
                  {user.name}
                </Text>
                <Text variant="caption" className="text-white/80">
                  {user.chips?.toLocaleString()} fichas
                </Text>
              </div>
            </div>
          </div>
        )}

        {rightAction}

        {onMenuClick && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
          >
            <Icon name="menu" size={20} />
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;

