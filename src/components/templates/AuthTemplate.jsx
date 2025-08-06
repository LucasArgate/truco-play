import React from 'react';
import { cn } from '@/lib/utils';
import Text from '../atoms/Text';

const AuthTemplate = ({ 
  children, 
  title = 'Jogo de Cartas Online',
  subtitle = 'Divirta-se jogando com seus amigos',
  backgroundImage,
  className 
}) => {
  return (
    <div className={cn(
      'min-h-screen flex flex-col items-center justify-center p-4',
      'bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900',
      className
    )}>
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Background image */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-4">
            {/* Logo placeholder - você pode substituir por uma imagem real */}
            <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Text variant="h2" className="text-white font-bold">
                🃏
              </Text>
            </div>
          </div>
          
          <Text variant="h1" className="text-white font-bold mb-2">
            {title}
          </Text>
          
          <Text variant="lead" className="text-white/80">
            {subtitle}
          </Text>
        </div>

        {/* Main content */}
        <div className="backdrop-blur-sm bg-white/10 rounded-lg p-1">
          {children}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <Text variant="small" className="text-white/60">
            © 2025 Jogo de Cartas Online. Todos os direitos reservados.
          </Text>
        </div>
      </div>
    </div>
  );
};

export default AuthTemplate;

