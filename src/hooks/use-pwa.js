import { useState, useEffect } from 'react';

/**
 * Hook personalizado para gerenciar o estado PWA
 * @returns {Object} Estado e funções relacionadas ao PWA
 */
export const usePWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [canInstall, setCanInstall] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    // Verificar se já está instalado
    const checkIfInstalled = () => {
      const installed = window.matchMedia('(display-mode: standalone)').matches ||
                       window.navigator.standalone === true ||
                       document.referrer.includes('android-app://');
      setIsInstalled(installed);
      return installed;
    };

    // Verificar se pode instalar
    const checkCanInstall = () => {
      const can = !checkIfInstalled() && window.deferredPrompt;
      setCanInstall(can);
      return can;
    };

    // Handler para beforeinstallprompt
    const handleBeforeInstallPrompt = (e) => {
      console.log('usePWA - beforeinstallprompt capturado');
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true);
    };

    // Handler para appinstalled
    const handleAppInstalled = () => {
      console.log('usePWA - appinstalled capturado');
      setDeferredPrompt(null);
      setIsInstalled(true);
      setCanInstall(false);
      setIsInstalling(false);
    };

    // Handler para evento customizado
    const handleInstallPromptAvailable = (e) => {
      console.log('usePWA - installPromptAvailable recebido');
      setDeferredPrompt(e.detail.prompt);
      setCanInstall(e.detail.canInstall);
    };

    const handleAppInstalledEvent = () => {
      console.log('usePWA - appInstalled event recebido');
      setDeferredPrompt(null);
      setIsInstalled(true);
      setCanInstall(false);
      setIsInstalling(false);
    };

    // Adicionar listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('installPromptAvailable', handleInstallPromptAvailable);
    window.addEventListener('appInstalled', handleAppInstalledEvent);

    // Verificar estado inicial
    checkIfInstalled();
    checkCanInstall();

    // Verificar prompt existente
    if (window.deferredPrompt) {
      setDeferredPrompt(window.deferredPrompt);
      setCanInstall(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('installPromptAvailable', handleInstallPromptAvailable);
      window.removeEventListener('appInstalled', handleAppInstalledEvent);
    };
  }, []);

  // Função para instalar o app
  const installApp = async () => {
    if (!deferredPrompt) {
      console.log('usePWA - Nenhum prompt disponível para instalação');
      return { success: false, error: 'No prompt available' };
    }

    setIsInstalling(true);
    
    try {
      console.log('usePWA - Iniciando instalação');
      deferredPrompt.prompt();
      
      const { outcome } = await deferredPrompt.userChoice;
      console.log('usePWA - Resultado da instalação:', outcome);
      
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setCanInstall(false);
        setIsInstalled(true);
        return { success: true, outcome };
      } else {
        setDeferredPrompt(null);
        setCanInstall(false);
        return { success: false, outcome };
      }
    } catch (error) {
      console.error('usePWA - Erro na instalação:', error);
      return { success: false, error: error.message };
    } finally {
      setIsInstalling(false);
    }
  };

  return {
    deferredPrompt,
    isInstalled,
    canInstall,
    isInstalling,
    installApp
  };
}; 