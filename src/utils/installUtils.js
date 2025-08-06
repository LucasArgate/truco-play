// Utilitários para gerenciar o banner de instalação do PWA

/**
 * Ativa o banner de instalação para ser mostrado na próxima visita à home
 */
export const activateInstallBanner = () => {
  console.log('installUtils - activateInstallBanner chamado');
  localStorage.setItem('showInstallBanner', 'true');
  console.log('installUtils - showInstallBanner definido como true');
};

/**
 * Verifica se o app está instalado como PWA
 */
export const isAppInstalled = () => {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                       window.navigator.standalone === true;
  
  console.log('installUtils - isAppInstalled:', isStandalone);
  console.log('installUtils - display-mode standalone:', window.matchMedia('(display-mode: standalone)').matches);
  console.log('installUtils - navigator.standalone:', window.navigator.standalone);
  
  return isStandalone;
};

/**
 * Verifica se o app pode ser instalado
 */
export const canInstallApp = () => {
  return 'serviceWorker' in navigator && 'PushManager' in window;
};

/**
 * Verifica se o usuário já recusou a instalação
 */
export const hasUserDismissedInstall = () => {
  const dismissed = localStorage.getItem('installBannerDismissed') === 'true';
  console.log('installUtils - hasUserDismissedInstall:', dismissed);
  return dismissed;
};

/**
 * Marca que o usuário recusou a instalação
 */
export const markInstallDismissed = () => {
  localStorage.setItem('installBannerDismissed', 'true');
};

/**
 * Reseta o estado de recusa da instalação (útil para testes)
 */
export const resetInstallDismissal = () => {
  localStorage.removeItem('installBannerDismissed');
}; 