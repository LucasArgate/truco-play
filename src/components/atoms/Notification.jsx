import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './Card';
import Text from './Text';
import Icon from './Icon';

const Notification = ({ 
  message, 
  type = 'success', 
  duration = 4000, 
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        if (onClose) onClose();
      }, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-500',
          border: 'border-green-400',
          icon: 'check-circle',
          iconColor: 'text-green-100'
        };
      case 'error':
        return {
          bg: 'bg-red-500',
          border: 'border-red-400',
          icon: 'alert-circle',
          iconColor: 'text-red-100'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-500',
          border: 'border-yellow-400',
          icon: 'alert-triangle',
          iconColor: 'text-yellow-100'
        };
      default:
        return {
          bg: 'bg-blue-500',
          border: 'border-blue-400',
          icon: 'info',
          iconColor: 'text-blue-100'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className={`fixed top-4 left-4 right-4 z-[10000] transition-all duration-300 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
    }`}>
      <Card className={`${styles.bg} ${styles.border} border-2 shadow-2xl`}>
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Icon name={styles.icon} size={20} className={styles.iconColor} />
            </div>
            <div className="flex-1">
              <Text variant="small" className="font-bold text-white">
                {message}
              </Text>
            </div>
            <button
              onClick={() => {
                setIsVisible(false);
                setTimeout(() => {
                  if (onClose) onClose();
                }, 300);
              }}
              className="text-white/80 hover:text-white transition-colors"
            >
              <Icon name="x" size={16} />
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notification; 