// Simulação de serviços de API para o jogo
// Em um projeto real, estas funções fariam chamadas HTTP para um backend

export const gameService = {
  // Autenticação
  login: async (email, password) => {
    // Simula uma chamada de API
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email && password) {
          resolve({
            success: true,
            user: {
              id: 1,
              name: 'Jogador',
              email: email,
              chips: 1000,
              avatar: '/src/assets/avatar-placeholder.png'
            }
          });
        } else {
          resolve({ success: false, message: 'Credenciais inválidas' });
        }
      }, 1000);
    });
  },

  register: async (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          user: {
            id: Date.now(),
            ...userData,
            chips: 1000,
            avatar: '/src/assets/avatar-placeholder.png'
          }
        });
      }, 1000);
    });
  },

  // Jogo
  joinQueue: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          queuePosition: Math.floor(Math.random() * 10) + 1
        });
      }, 500);
    });
  },

  leaveQueue: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 300);
    });
  },

  // Pagamento
  generatePix: async (amount) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          pixCode: `00020126580014BR.GOV.BCB.PIX0136${Date.now()}52040000530398654${amount.toFixed(2)}5802BR5925JOGO DE CARTAS ONLINE6009SAO PAULO62070503***6304`,
          qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
        });
      }, 1000);
    });
  },

  // Ranking
  getRanking: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          ranking: [
            { position: 1, name: 'Jogador Pro', points: 2500 },
            { position: 2, name: 'Mestre das Cartas', points: 2200 },
            { position: 3, name: 'Rei do Truco', points: 1950 },
            { position: 4, name: 'Ás de Espadas', points: 1800 },
            { position: 5, name: 'Coringa', points: 1650 }
          ]
        });
      }, 800);
    });
  }
};

