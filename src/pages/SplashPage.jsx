import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Text from '../components/atoms/Text';

const SplashPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se usuário já está logado
    const userData = localStorage.getItem('user');
    
    const timer = setTimeout(() => {
      if (userData) {
        navigate('/betting');
      } else {
        navigate('/login');
      }
    }, 2000); // 2 segundos de splash

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-pink-500/20 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-purple-500/20 rounded-full blur-md animate-pulse delay-500"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Logo */}
        <div className="mb-12">
          <div className="w-40 h-40 mx-auto bg-gradient-to-br from-white/20 to-white/10 rounded-full flex items-center justify-center backdrop-blur-sm mb-6 shadow-2xl border border-white/20">
            <Text variant="h1" className="text-white font-bold text-8xl">
              🃏
            </Text>
          </div>
          
          <Text variant="h1" className="text-white font-bold mb-3 text-4xl">
            Jogo de Cartas
          </Text>
          
          <Text variant="lead" className="text-white/90 text-xl">
            Online
          </Text>
        </div>

        {/* Loading indicator */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-pink-400 rounded-full animate-spin" style={{ animationDelay: '-0.5s' }}></div>
          </div>
        </div>
        
        <Text variant="small" className="text-white/70 text-lg font-medium">
          Carregando...
        </Text>
      </div>
    </div>
  );
};

export default SplashPage;

