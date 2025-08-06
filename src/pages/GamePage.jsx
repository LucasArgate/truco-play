import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import GameTemplate from '../components/templates/GameTemplate';
import GameTable from '../components/organisms/GameTable';
import Button from '../components/atoms/Button';
import Text from '../components/atoms/Text';
import { Card, CardContent } from '../components/atoms/Card';
import { activateInstallBanner } from '../utils/installUtils';

const GamePage = () => {
  const [user, setUser] = useState(null);
  const [gameState, setGameState] = useState({
    currentPlayer: 'player',
    status: 'playing', // playing, finished
    playerCards: [
      { suit: 'hearts', value: 'A' },
      { suit: 'spades', value: 'K' },
      { suit: 'diamonds', value: '7' }
    ],
    opponentCards: [null, null, null], // Cartas ocultas
    tableCards: [],
    score: { player: 0, opponent: 0 },
    message: 'Sua vez de jogar',
    round: 1,
    gameResult: null // 'win', 'lose', null
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Carregar dados do usuário
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleCardPlay = (card, cardIndex) => {
    if (gameState.currentPlayer !== 'player' || gameState.status !== 'playing') {
      return;
    }

    // Remover carta da mão do jogador e adicionar à mesa
    const newPlayerCards = gameState.playerCards.filter((_, index) => index !== cardIndex);
    const newTableCards = [...gameState.tableCards, { ...card, player: 'player' }];

    setGameState(prev => ({
      ...prev,
      playerCards: newPlayerCards,
      tableCards: newTableCards,
      currentPlayer: 'opponent',
      message: 'Oponente está jogando...'
    }));

    // Simular jogada do oponente
    setTimeout(() => {
      simulateOpponentPlay();
    }, 1500);
  };

  const simulateOpponentPlay = () => {
    // Simular carta do oponente
    const opponentCard = { suit: 'clubs', value: 'Q', player: 'opponent' };
    
    setGameState(prev => {
      const newOpponentCards = prev.opponentCards.slice(1);
      const newTableCards = [...prev.tableCards, opponentCard];
      
      // Determinar vencedor da rodada (simplificado)
      const playerWins = Math.random() > 0.5;
      const newScore = { ...prev.score };
      
      if (playerWins) {
        newScore.player += 1;
      } else {
        newScore.opponent += 1;
      }

      // Verificar fim do jogo
      const gameFinished = newScore.player >= 3 || newScore.opponent >= 3;
      const gameResult = gameFinished ? 
        (newScore.player > newScore.opponent ? 'win' : 'lose') : null;

      return {
        ...prev,
        opponentCards: newOpponentCards,
        tableCards: newTableCards,
        score: newScore,
        currentPlayer: 'player',
        message: playerWins ? 'Você ganhou a rodada!' : 'Oponente ganhou a rodada',
        status: gameFinished ? 'finished' : 'playing',
        gameResult
      };
    });

    // Limpar mesa após um tempo
    setTimeout(() => {
      if (gameState.status === 'playing') {
        setGameState(prev => ({
          ...prev,
          tableCards: [],
          message: 'Nova rodada - Sua vez'
        }));
      }
    }, 2000);
  };

  const handleGameAction = (action) => {
    switch (action) {
      case 'truco':
        setGameState(prev => ({
          ...prev,
          message: 'Você gritou TRUCO!'
        }));
        break;
      case 'envido':
        setGameState(prev => ({
          ...prev,
          message: 'Você gritou ENVIDO!'
        }));
        break;
      case 'correr':
        setGameState(prev => ({
          ...prev,
          status: 'finished',
          gameResult: 'lose',
          message: 'Você desistiu da partida'
        }));
        break;
    }
  };

  const handleGameEnd = () => {
    console.log('GamePage - handleGameEnd chamado');
    
    // Atualizar fichas do usuário
    if (user && gameState.gameResult) {
      const newChips = gameState.gameResult === 'win' ? 
        user.chips + 20 : user.chips - 10;
      
      const updatedUser = { ...user, chips: Math.max(0, newChips) };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
    
    // Ativar banner de instalação após completar uma partida
    console.log('GamePage - Ativando banner de instalação');
    activateInstallBanner();
    
    navigate('/home');
  };

  if (!user) {
    return null;
  }

  const opponent = {
    name: 'Oponente',
    avatar: null
  };

  return (
    <GameTemplate
      title="Partida"
      showBackButton
      onBack={() => navigate('/home')}
      user={user}
      showNavbar={false}
    >
      <div className="p-4 h-[calc(100vh-120px)]">
        {gameState.status === 'playing' ? (
          <GameTable
            playerCards={gameState.playerCards}
            opponentCards={gameState.opponentCards}
            tableCards={gameState.tableCards}
            currentPlayer={gameState.currentPlayer}
            gameState={gameState.status}
            onCardPlay={handleCardPlay}
            onGameAction={handleGameAction}
            player={user}
            opponent={opponent}
            score={gameState.score}
            message={gameState.message}
            className="h-full"
          />
        ) : (
          // Tela de resultado
          <div className="flex flex-col items-center justify-center h-full">
            <Card className="w-full max-w-md">
              <CardContent className="p-6 text-center space-y-4">
                <div className="text-6xl mb-4">
                  {gameState.gameResult === 'win' ? '🎉' : '😔'}
                </div>
                
                <Text variant="h2" className={
                  gameState.gameResult === 'win' ? 'text-green-600' : 'text-red-600'
                }>
                  {gameState.gameResult === 'win' ? 'Vitória!' : 'Derrota'}
                </Text>
                
                <Text variant="body" className="text-muted-foreground">
                  {gameState.gameResult === 'win' ? 
                    'Parabéns! Você ganhou a partida.' : 
                    'Não foi dessa vez. Tente novamente!'
                  }
                </Text>

                <div className="bg-muted rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <Text variant="small">Placar final:</Text>
                    <Text variant="small" className="font-medium">
                      {gameState.score.player} x {gameState.score.opponent}
                    </Text>
                  </div>
                  <div className="flex justify-between">
                    <Text variant="small">Fichas {gameState.gameResult === 'win' ? 'ganhas' : 'perdidas'}:</Text>
                    <Text variant="small" className={cn(
                      'font-medium',
                      gameState.gameResult === 'win' ? 'text-green-600' : 'text-red-600'
                    )}>
                      {gameState.gameResult === 'win' ? '+20' : '-10'}
                    </Text>
                  </div>
                </div>

                <Button onClick={handleGameEnd} className="w-full" size="lg">
                  Continuar
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </GameTemplate>
  );
};

export default GamePage;

