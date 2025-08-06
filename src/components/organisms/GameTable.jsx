import React from 'react';
import { cn } from '@/lib/utils';
import GameCard from '../molecules/GameCard';
import Avatar from '../atoms/Avatar';
import Text from '../atoms/Text';
import Button from '../atoms/Button';

const GameTable = ({ 
  playerCards = [],
  opponentCards = [],
  tableCards = [],
  currentPlayer = 'player',
  gameState = 'playing',
  onCardPlay,
  onGameAction,
  player = {},
  opponent = {},
  score = { player: 0, opponent: 0 },
  message = '',
  className 
}) => {
  const gameActions = [
    { id: 'truco', label: 'Truco', variant: 'destructive' },
    { id: 'envido', label: 'Envido', variant: 'secondary' },
    { id: 'correr', label: 'Correr', variant: 'outline' }
  ];

  return (
    <div className={cn(
      'relative w-full h-full bg-green-800 rounded-lg overflow-hidden',
      className
    )}>
      {/* Área do oponente */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <div className="flex items-center space-x-2 mb-2">
          <Avatar 
            src={opponent.avatar} 
            alt={opponent.name}
            size="sm"
            fallback={opponent.name?.charAt(0)?.toUpperCase()}
          />
          <Text variant="small" className="text-white font-medium">
            {opponent.name || 'Oponente'}
          </Text>
          <Text variant="caption" className="text-green-200">
            {score.opponent} pts
          </Text>
        </div>
        
        {/* Cartas do oponente (viradas para baixo) */}
        <div className="flex space-x-2">
          {opponentCards.map((_, index) => (
            <div
              key={index}
              className="w-12 h-16 bg-blue-900 border border-blue-700 rounded-md shadow-md"
            />
          ))}
        </div>
      </div>

      {/* Mesa central */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex space-x-4">
          {tableCards.map((card, index) => (
            <GameCard
              key={index}
              suit={card.suit}
              value={card.value}
              size="md"
              isPlayable={false}
            />
          ))}
        </div>
        
        {/* Mensagem do jogo */}
        {message && (
          <div className="mt-4 text-center">
            <Text variant="small" className="text-white bg-black/50 px-3 py-1 rounded-full">
              {message}
            </Text>
          </div>
        )}
      </div>

      {/* Área do jogador */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        {/* Ações do jogo */}
        {gameState === 'playing' && currentPlayer === 'player' && (
          <div className="flex space-x-2 mb-4">
            {gameActions.map((action) => (
              <Button
                key={action.id}
                variant={action.variant}
                size="sm"
                onClick={() => onGameAction(action.id)}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}

        {/* Cartas do jogador */}
        <div className="flex space-x-2 mb-2">
          {playerCards.map((card, index) => (
            <GameCard
              key={index}
              suit={card.suit}
              value={card.value}
              size="md"
              isPlayable={currentPlayer === 'player' && gameState === 'playing'}
              onClick={() => onCardPlay(card, index)}
            />
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <Avatar 
            src={player.avatar} 
            alt={player.name}
            size="sm"
            fallback={player.name?.charAt(0)?.toUpperCase()}
          />
          <Text variant="small" className="text-white font-medium">
            {player.name || 'Você'}
          </Text>
          <Text variant="caption" className="text-green-200">
            {score.player} pts
          </Text>
        </div>
      </div>

      {/* Indicador de turno */}
      <div className="absolute top-4 right-4">
        <Text variant="caption" className="text-white bg-black/50 px-2 py-1 rounded">
          {currentPlayer === 'player' ? 'Sua vez' : 'Vez do oponente'}
        </Text>
      </div>
    </div>
  );
};

export default GameTable;

