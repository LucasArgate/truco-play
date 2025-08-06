import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../atoms/Card';
import Text from '../atoms/Text';
import Icon from '../atoms/Icon';

const UserStats = ({ user }) => {
  const stats = [
    {
      label: 'Partidas Jogadas',
      value: user?.gamesPlayed || 0,
      icon: 'play',
      color: 'from-blue-500 to-blue-600',
      description: 'Total de jogos'
    },
    {
      label: 'Vitórias',
      value: user?.wins || 0,
      icon: 'trophy',
      color: 'from-yellow-500 to-yellow-600',
      description: 'Jogos ganhos'
    },
    {
      label: 'Taxa de Vitória',
      value: user?.gamesPlayed ? `${Math.round((user.wins / user.gamesPlayed) * 100)}%` : '0%',
      icon: 'percent',
      color: 'from-green-500 to-green-600',
      description: 'Porcentagem de vitórias'
    },
    {
      label: 'Fichas Atuais',
      value: user?.chips?.toLocaleString() || '0',
      icon: 'creditCard',
      color: 'from-purple-500 to-purple-600',
      description: 'Saldo disponível'
    },
    {
      label: 'Ranking',
      value: `#${user?.ranking || 'N/A'}`,
      icon: 'star',
      color: 'from-orange-500 to-orange-600',
      description: 'Posição no ranking'
    },
    {
      label: 'Nível',
      value: user?.level || 1,
      icon: 'award',
      color: 'from-pink-500 to-pink-600',
      description: 'Nível atual'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-gradient-to-r from-muted to-muted/50 border-border hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="text-center space-y-2">
              <div className={`w-12 h-12 mx-auto bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center shadow-lg`}>
                <Icon name={stat.icon} size={20} className="text-white" />
              </div>
              <Text variant="h3" className="font-bold text-foreground">
                {stat.value}
              </Text>
              <Text variant="small" className="font-medium text-foreground">
                {stat.label}
              </Text>
              <Text variant="caption" className="text-muted-foreground">
                {stat.description}
              </Text>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UserStats; 