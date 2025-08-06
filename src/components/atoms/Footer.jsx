import React from 'react';
import Text from './Text';
import { APP_CONFIG } from '../../config/app';

const Footer = ({ className = '' }) => {
  return (
    <footer className={`py-4 px-4 text-center ${className}`}>
      <Text variant="caption" className="text-muted-foreground">
        {APP_CONFIG.name} v{APP_CONFIG.version}
      </Text>
    </footer>
  );
};

export default Footer; 