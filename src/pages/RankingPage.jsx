import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GameTemplate from '../components/templates/GameTemplate';
import RankingList from '../components/organisms/RankingList';
import Button from '../components/atoms/Button';
import Text from '../components/atoms/Text';
import { gameService } from '../services/gameService';

const RankingPage = () => {
  const [user, setUser] = useState(null);
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('geral'); // geral, semanal, mensal
  const navigate = useNavigate();

  useEffect(() => {
    // Carregar dados do usuário
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }

    // Carregar ranking
    loadRanking();
  }, [navigate, filter]);

  const loadRanking = async () => {
    setLoading(true);
    try {
      const result = await gameService.getRanking();
      if (result.success) {
        // Adicionar dados extras para demonstração
        const enhancedRankings = result.ranking.map((rank, index) => ({
          ...rank,
          id: index + 1,
          avatar: null,
          gamesPlayed: Math.floor(Math.random() * 100) + 10,
          winRate: Math.floor(Math.random() * 40) + 60,
          streak: Math.floor(Math.random() * 10)
        }));
        setRankings(enhancedRankings);
      }
    } catch (error) {
      console.error('Erro ao carregar ranking:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterOptions = [
    { id: 'geral', label: 'Geral' },
    { id: 'semanal', label: 'Semanal' },
    { id: 'mensal', label: 'Mensal' }
  ];

  if (!user) {
    return null;
  }

  return (
    <GameTemplate
      title="Ranking"
      user={user}
      activeRoute="ranking"
      onNavigate={navigate}
    >
      <div className="p-4 space-y-4">
        {/* Filtros */}
        <div className="flex space-x-2 overflow-x-auto">
          {filterOptions.map((option) => (
            <Button
              key={option.id}
              variant={filter === option.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(option.id)}
              className="whitespace-nowrap"
            >
              {option.label}
            </Button>
          ))}
        </div>

        {/* Sua posição */}
        {user && (
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <Text variant="small" className="text-primary font-medium mb-2">
              Sua Posição
            </Text>
            <div className="flex items-center justify-between">
              <div>
                <Text variant="body" className="font-semibold">
                  #{Math.floor(Math.random() * 50) + 10}º lugar
                </Text>
                <Text variant="small" className="text-muted-foreground">
                  {Math.floor(Math.random() * 1000) + 500} pontos
                </Text>
              </div>
              <div className="text-right">
                <Text variant="small" className="text-muted-foreground">
                  Para subir uma posição
                </Text>
                <Text variant="small" className="font-medium">
                  +{Math.floor(Math.random() * 100) + 50} pontos
                </Text>
              </div>
            </div>
          </div>
        )}

        {/* Lista de ranking */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="bg-muted animate-pulse rounded-lg h-20" />
            ))}
          </div>
        ) : (
          <RankingList 
            rankings={rankings} 
            currentUser={user}
          />
        )}

        {/* Informações adicionais */}
        <div className="bg-muted rounded-lg p-4 space-y-2">
          <Text variant="small" className="font-medium">
            Como funciona o ranking?
          </Text>
          <Text variant="caption" className="text-muted-foreground">
            • Ganhe pontos vencendo partidas
            <br />
            • Perca pontos ao ser derrotado
            <br />
            • Sequências de vitórias dão bônus extra
            <br />
            • Ranking atualizado em tempo real
          </Text>
        </div>
      </div>
    </GameTemplate>
  );
};

export default RankingPage;

