// Rotas da aplicação
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  GAME: '/game',
  QUEUE: '/queue',
  PAYMENT: '/payment',
  RANKING: '/ranking',
  PROFILE: '/profile'
};

// Estados do jogo
export const GAME_STATES = {
  WAITING: 'waiting',
  PLAYING: 'playing',
  FINISHED: 'finished',
  PAUSED: 'paused'
};

// Tipos de mensagem do jogo
export const MESSAGE_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error'
};

// Configurações do jogo
export const GAME_CONFIG = {
  MAX_PLAYERS: 2,
  INITIAL_CHIPS: 1000,
  MIN_BET: 10
};

