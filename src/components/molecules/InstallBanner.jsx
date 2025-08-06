import React, { useState, useEffect } from 'react';
import Button from '../atoms/Button';
import Text from '../atoms/Text';
import Icon from '../atoms/Icon';
import { Card, CardContent } from '../atoms/Card';
import Notification from '../atoms/Notification';
import { isAppInstalled, hasUserDismissedInstall, markInstallDismissed } from '../../utils/installUtils';
import { APP_CONFIG } from '../../config/app';

const InstallBanner = ({ onClose }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalling, setIsInstalling] = useState(false);
  const [forceShow, setForceShow] = useState(false); // Para teste
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    console.log('InstallBanner - useEffect iniciado');
    
    // Captura o evento beforeinstallprompt
    const handleBeforeInstallPrompt = (e) => {
      console.log('InstallBanner - beforeinstallprompt disparado');
      e.preventDefault();
      setDeferredPrompt(e);
      console.log('InstallBanner - deferredPrompt definido');
    };

    // Verifica se o app já está instalado
    const handleAppInstalled = () => {
      console.log('InstallBanner - appinstalled disparado');
      setDeferredPrompt(null);
      if (onClose) onClose();
    };

    // Verifica se já existe um prompt salvo globalmente
    const checkExistingPrompt = () => {
      if (window.deferredPrompt) {
        console.log('InstallBanner - Prompt global encontrado');
        setDeferredPrompt(window.deferredPrompt);
      }
    };

    // Listener para evento customizado de prompt disponível
    const handleInstallPromptAvailable = (e) => {
      console.log('InstallBanner - Evento installPromptAvailable recebido');
      setDeferredPrompt(e.detail);
    };

    // Listener para evento customizado de app instalado
    const handleAppInstalledEvent = () => {
      console.log('InstallBanner - Evento appInstalled recebido');
      setDeferredPrompt(null);
      if (onClose) onClose();
    };

    // Adiciona listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('installPromptAvailable', handleInstallPromptAvailable);
    window.addEventListener('appInstalled', handleAppInstalledEvent);
    
    // Verifica prompt existente
    checkExistingPrompt();

    // Para teste: forçar exibição após 3 segundos se não há prompt
    const timer = setTimeout(() => {
      console.log('InstallBanner - Timer expirado, deferredPrompt:', !!deferredPrompt);
      if (!deferredPrompt) {
        console.log('InstallBanner - Forçando exibição para teste');
        setForceShow(true);
      }
    }, 3000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('installPromptAvailable', handleInstallPromptAvailable);
      window.removeEventListener('appInstalled', handleAppInstalledEvent);
      clearTimeout(timer);
    };
  }, [onClose]);

  const handleInstall = async () => {
    console.log('InstallBanner - handleInstall chamado');
    console.log('InstallBanner - deferredPrompt:', !!deferredPrompt);
    
    // Se não há prompt real, simular instalação
    if (!deferredPrompt) {
      console.log('InstallBanner - Simulando instalação (sem prompt real)');
      giveInstallBonus();
      if (onClose) onClose();
      return;
    }

    setIsInstalling(true);
    
    try {
      console.log('InstallBanner - Chamando deferredPrompt.prompt()');
      // Mostra o prompt de instalação
      deferredPrompt.prompt();
      
      console.log('InstallBanner - Aguardando resposta do usuário...');
      // Aguarda a resposta do usuário
      const { outcome } = await deferredPrompt.userChoice;
      
      console.log('InstallBanner - Resposta do usuário:', outcome);
      
      if (outcome === 'accepted') {
        console.log('Usuário aceitou a instalação');
        giveInstallBonus();
        setDeferredPrompt(null);
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
    } finally {
      setIsInstalling(false);
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
  // 1. Não há prompt de instalação disponível
  // 2. O app já está instalado
  // 3. O usuário já recusou a instalação
  // 4. A configuração não permite mostrar após jogo
  console.log('InstallBanner - deferredPrompt:', !!deferredPrompt);
  console.log('InstallBanner - isAppInstalled:', isAppInstalled());
  console.log('InstallBanner - hasUserDismissedInstall:', hasUserDismissedInstall());
  console.log('InstallBanner - showAfterGame:', APP_CONFIG.install.showAfterGame);
  console.log('InstallBanner - forceShow:', forceShow);
  
  // Para teste: mostrar se forceShow é true, mesmo sem outras condições
  if (forceShow) {
    console.log('InstallBanner - Mostrando banner (forçado para teste)');
  } else if (!deferredPrompt || isAppInstalled() || hasUserDismissedInstall() || !APP_CONFIG.install.showAfterGame) {
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