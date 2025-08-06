import React from 'react';
import { cn } from '@/lib/utils';
import Header from '../molecules/Header';
import Navbar from '../organisms/Navbar';

const GameTemplate = ({ 
  children, 
  title,
  showBackButton = false,
  onBack,
  user = null,
  activeRoute = 'home',
  onNavigate,
  showNavbar = true,
  headerRightAction = null,
  className 
}) => {
  return (
    <div className={cn(
      'min-h-screen bg-background flex flex-col',
      className
    )}>
      {/* Header */}
      <Header
        title={title}
        showBackButton={showBackButton}
        onBack={onBack}
        user={user}
        rightAction={headerRightAction}
      />

      {/* Main content */}
      <main className={cn(
        'flex-1 overflow-auto',
        showNavbar && 'pb-16' // Add padding for navbar
      )}>
        {children}
      </main>

      {/* Bottom navigation */}
      {showNavbar && (
        <Navbar
          activeRoute={activeRoute}
          onNavigate={onNavigate}
          user={user}
        />
      )}
    </div>
  );
};

export default GameTemplate;

