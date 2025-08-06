// Configurações do app
export const APP_CONFIG = {
  name: 'Truco Play',
  version: '1.4.6',
  description: 'Jogue truco e outros jogos de cartas online com seus amigos',
  author: 'Truco Play Team',
  website: 'https://truco-play.com',
  
  // Configurações do PWA
  pwa: {
    name: 'Truco Play',
    shortName: 'Truco',
    description: 'A melhor experiência de jogo de cartas brasileiro',
    themeColor: '#8B5CF6',
    backgroundColor: '#ffffff',
    display: 'standalone',
    orientation: 'portrait',
    scope: '/',
    startUrl: '/',
  },
  
  // Configurações de instalação
  install: {
    bannerDelay: 5000, // Delay em ms antes de mostrar o banner
    maxDismissals: 3, // Máximo de vezes que o usuário pode recusar
    showAfterGame: true, // Mostrar banner após completar uma partida
  },
  
  // Configurações de jogo
  game: {
    minChips: 10,
    defaultBet: 10,
    maxPlayers: 4,
    gameTimeout: 30000, // 30 segundos
  }
};

export default APP_CONFIG; 