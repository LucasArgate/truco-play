import React, { useState, useEffect } from 'react';
import Button from '../atoms/Button';
import Text from '../atoms/Text';
import Icon from '../atoms/Icon';
import { Card, CardContent } from '../atoms/Card';
import Notification from '../atoms/Notification';
import { usePWA } from '../../hooks/use-pwa';
import { hasUserDismissedInstall, markInstallDismissed } from '../../utils/installUtils';
import { APP_CONFIG } from '../../config/app';

const InstallBanner = ({ onClose }) => {
  const { canInstall, isInstalling, installApp } = usePWA();
  const [showNotification, setShowNotification] = useState(false);
  const [forceShow, setForceShow] = useState(false);

  useEffect(() => {
    console.log('InstallBanner - useEffect iniciado');
    console.log('InstallBanner - canInstall:', canInstall);
    console.log('InstallBanner - hasUserDismissedInstall:', hasUserDismissedInstall());
    
    // Para teste: forçar exibição após 3 segundos se não há prompt
    const timer = setTimeout(() => {
      console.log('InstallBanner - Timer expirado, canInstall:', canInstall);
      if (!canInstall) {
        console.log('InstallBanner - Forçando exibição para teste');
        setForceShow(true);
      }
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [canInstall]);

  const handleInstall = async () => {
    console.log('InstallBanner - handleInstall chamado');
    
    // Se não há prompt real, simular instalação
    if (!canInstall) {
      console.log('InstallBanner - Simulando instalação (sem prompt real)');
      giveInstallBonus();
      if (onClose) onClose();
      return;
    }

    try {
      const result = await installApp();
      console.log('InstallBanner - Resultado da instalação:', result);
      
      if (result.success) {
        console.log('Usuário aceitou a instalação');
        giveInstallBonus();
        if (onClose) onClose();
      } else {
        console.log('Usuário recusou a instalação');
        // Mesmo recusando, dar bônus por tentar
        giveInstallBonus();
      }
    } catch (error) {
      console.error('Erro ao instalar:', error);
      // Em caso de erro, dar bônus mesmo assim
      giveInstallBonus();
    }
  };

  const giveInstallBonus = () => {
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        const updatedUser = {
          ...user,
          chips: (user.chips || 0) + 10
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        console.log('Bônus de 10 fichas concedido por instalar o app!');
        
        // Mostrar notificação elegante
        setShowNotification(true);
      }
    } catch (error) {
      console.error('Erro ao dar bônus:', error);
    }
  };

  const handleDismiss = () => {
    markInstallDismissed();
    if (onClose) onClose();
  };

  // Não mostra o banner se:
  // 1. Não pode instalar e não é modo teste
  // 2. O usuário já recusou a instalação
  // 3. A configuração não permite mostrar após jogo
  console.log('InstallBanner - canInstall:', canInstall);
  console.log('InstallBanner - hasUserDismissedInstall:', hasUserDismissedInstall());
  console.log('InstallBanner - showAfterGame:', APP_CONFIG.install.showAfterGame);
  console.log('InstallBanner - forceShow:', forceShow);
  
  // Para teste: mostrar se forceShow é true, mesmo sem outras condições
  if (forceShow) {
    console.log('InstallBanner - Mostrando banner (forçado para teste)');
  } else if (!canInstall || hasUserDismissedInstall() || !APP_CONFIG.install.showAfterGame) {
    console.log('InstallBanner - Não mostrando banner');
    return null;
  } else {
    console.log('InstallBanner - Mostrando banner (condições normais)');
  }

  return (
    <>
      <Card className="fixed top-4 left-4 right-4 z-[9999] bg-gradient-to-br from-purple-600 via-primary to-blue-600 border-2 border-white/20 shadow-2xl animate-slide-up backdrop-blur-md">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-5">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-white/30 to-white/10 rounded-full flex items-center justify-center shadow-2xl border-2 border-white/30 animate-pulse-slow">
                  <Icon name="download" size={32} className="text-white drop-shadow-lg" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                  <span className="text-xs font-bold text-white">⭐</span>
                </div>
              </div>
              <div className="space-y-2">
                <Text variant="small" className="font-bold text-white text-lg drop-shadow-lg">
                  Gostou? Instale agora de graça!
                </Text>
                <Text variant="caption" className="text-white/95 font-medium">
                  Tenha acesso rápido ao jogo
                </Text>
                <div className="flex items-center space-x-2">
                  <Text variant="caption" className="text-yellow-300 font-bold text-sm bg-yellow-400/20 px-3 py-1 rounded-full animate-shimmer">
                    🎁 Instale e ganhe 10 fichas!
                  </Text>
                </div>
                {forceShow && (
                  <Text variant="caption" className="text-white/70 text-xs bg-black/20 px-2 py-1 rounded">
                    (Modo teste)
                  </Text>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                size="sm"
                onClick={handleInstall}
                disabled={isInstalling}
                className="bg-gradient-to-r from-white to-white/95 text-primary hover:from-white/95 hover:to-white font-bold shadow-xl border-2 border-white/60 px-8 py-3 rounded-xl transition-all duration-200 hover:scale-105"
              >
                {isInstalling ? (
                  <>
                    <Icon name="loader" size={20} className="mr-2 animate-spin" />
                    Instalando...
                  </>
                ) : (
                  <>
                    <Icon name="download" size={20} className="mr-2" />
                    Instalar
                  </>
                )}
              </Button>
              
              <Button
                size="icon"
                variant="ghost"
                onClick={handleDismiss}
                className="text-white hover:bg-white/20 rounded-full w-10 h-10 border border-white/30"
              >
                <Icon name="x" size={20} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notificação de Bônus */}
      {showNotification && (
        <Notification
          message="🎉 Parabéns! Você ganhou 10 fichas por instalar o app!"
          type="success"
          duration={5000}
          onClose={() => setShowNotification(false)}
        />
      )}
    </>
  );
};

export default InstallBanner; 