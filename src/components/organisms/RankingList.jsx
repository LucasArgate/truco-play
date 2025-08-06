import React from 'react';
import { cn } from '@/lib/utils';
import Avatar from '../atoms/Avatar';
import Text from '../atoms/Text';
import Icon from '../atoms/Icon';
import { Card, CardContent } from '../atoms/Card';

const RankingList = ({ 
  rankings = [], 
  currentUser = null,
  className 
}) => {
  const getRankIcon = (position) => {
    switch (position) {
      case 1:
        return <Icon name="trophy" size={20} className="text-yellow-500" />;
      case 2:
        return <Icon name="trophy" size={20} className="text-gray-400" />;
      case 3:
        return <Icon name="trophy" size={20} className="text-amber-600" />;
      default:
        return (
          <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
            <Text variant="caption" className="text-muted-foreground font-bold">
              {position}
            </Text>
          </div>
        );
    }
  };

  const getRankBadge = (position) => {
    if (position <= 3) {
      const colors = {
        1: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        2: 'bg-gray-100 text-gray-800 border-gray-200',
        3: 'bg-amber-100 text-amber-800 border-amber-200'
      };
      return colors[position];
    }
    return 'bg-muted text-muted-foreground border-border';
  };

  return (
    <div className={cn('space-y-3', className)}>
      {rankings.map((rank, index) => {
        const isCurrentUser = currentUser && rank.id === currentUser.id;
        
        return (
          <Card 
            key={rank.id || index}
            className={cn(
              'transition-all duration-200 hover:shadow-md',
              isCurrentUser && 'ring-2 ring-primary bg-primary/5'
            )}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {/* Posição */}
                  <div className={cn(
                    'flex items-center justify-center w-8 h-8 rounded-full border',
                    getRankBadge(rank.position)
                  )}>
                    {rank.position <= 3 ? (
                      getRankIcon(rank.position)
                    ) : (
                      <Text variant="caption" className="font-bold">
                        {rank.position}
                      </Text>
                    )}
                  </div>

                  {/* Avatar e informações */}
                  <div className="flex items-center space-x-3">
                    <Avatar 
                      src={rank.avatar} 
                      alt={rank.name}
                      size="md"
                      fallback={rank.name?.charAt(0)?.toUpperCase()}
                    />
                    <div>
                      <Text variant="body" className="font-medium">
                        {rank.name}
                        {isCurrentUser && (
                          <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                            Você
                          </span>
                        )}
                      </Text>
                      <Text variant="small" className="text-muted-foreground">
                        {rank.gamesPlayed || 0} jogos
                      </Text>
                    </div>
                  </div>
                </div>

                {/* Pontuação */}
                <div className="text-right">
                  <Text variant="body" className="font-bold">
                    {rank.points?.toLocaleString() || 0}
                  </Text>
                  <Text variant="small" className="text-muted-foreground">
                    pontos
                  </Text>
                </div>
              </div>

              {/* Estatísticas adicionais */}
              {(rank.winRate || rank.streak) && (
                <div className="mt-3 pt-3 border-t border-border flex justify-between text-sm">
                  {rank.winRate && (
                    <div>
                      <Text variant="caption" className="text-muted-foreground">
                        Taxa de vitória
                      </Text>
                      <Text variant="small" className="font-medium">
                        {rank.winRate}%
                      </Text>
                    </div>
                  )}
                  {rank.streak && (
                    <div>
                      <Text variant="caption" className="text-muted-foreground">
                        Sequência
                      </Text>
                      <Text variant="small" className="font-medium">
                        {rank.streak} vitórias
                      </Text>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}

      {rankings.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Icon name="trophy" size={48} className="mx-auto text-muted-foreground mb-4" />
            <Text variant="body" className="text-muted-foreground">
              Nenhum ranking disponível
            </Text>
            <Text variant="small" className="text-muted-foreground mt-2">
              Jogue algumas partidas para aparecer no ranking!
            </Text>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RankingList;

