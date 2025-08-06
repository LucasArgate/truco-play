import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GameTemplate from '../components/templates/GameTemplate';
import Button from '../components/atoms/Button';
import Text from '../components/atoms/Text';
import Icon from '../components/atoms/Icon';
import { Card, CardContent, CardHeader, CardTitle } from '../components/atoms/Card';

const BettingPage = () => {
  const [user, setUser] = useState(null);
  const [selectedBet, setSelectedBet] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const bettingOptions = [
    { id: 1, amount: 10, label: 'Aposta Baixa', description: 'Ideal para iniciantes', color: 'from-green-400 to-green-600' },
    { id: 2, amount: 25, label: 'Aposta Média', description: 'Equilibrio risco/retorno', color: 'from-yellow-400 to-yellow-600' },
    { id: 3, amount: 50, label: 'Aposta Alta', description: 'Para jogadores experientes', color: 'from-orange-400 to-orange-600' },
    { id: 4, amount: 100, label: 'Aposta Premium', description: 'Máximo desafio', color: 'from-red-400 to-red-600' }
  ];

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleBetSelection = (bet) => {
    setSelectedBet(bet);
  };

  const handleStartGame = async () => {
    if (!selectedBet) return;
    
    if (user.chips < selectedBet.amount) {
      navigate('/payment');
      return;
    }

    setIsLoading(true);
    
    // Simular delay de carregamento
    setTimeout(() => {
      setIsLoading(false);
      navigate('/queue', { state: { betAmount: selectedBet.amount } });
    }, 1500);
  };

  const handleBackToHome = () => {
    navigate('/home');
  };

  if (!user) return null;

  return (
    <GameTemplate
      title="Escolha sua Aposta"
      user={user}
      activeRoute="betting"
      onNavigate={navigate}
      showBackButton={true}
      onBack={handleBackToHome}
    >
      <div className="p-4 space-y-6">
        {/* Header com saldo */}
        <div className="text-center py-4">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full float pulse-glow">
            <Icon name="coins" size={20} />
            <Text variant="h3" className="font-bold">
              {user.chips?.toLocaleString()} Fichas
            </Text>
          </div>
        </div>

        {/* Descrição */}
        <div className="text-center space-y-2">
          <Text variant="h2" className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Escolha sua aposta inicial
          </Text>
          <Text variant="muted" className="text-lg">
            Quanto você quer apostar nesta partida?
          </Text>
        </div>

        {/* Opções de aposta */}
        <div className="grid grid-cols-1 gap-4">
          {bettingOptions.map((bet) => (
            <Card
              key={bet.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                selectedBet?.id === bet.id 
                  ? 'ring-2 ring-purple-500 shadow-lg' 
                  : 'hover:ring-2 hover:ring-purple-300'
              }`}
              onClick={() => handleBetSelection(bet)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${bet.color} flex items-center justify-center mb-4`}>
                      <Text variant="h3" className="text-white font-bold">
                        {bet.amount}
                      </Text>
                    </div>
                    <Text variant="h4" className="font-semibold mb-2">
                      {bet.label}
                    </Text>
                    <Text variant="muted" className="text-sm">
                      {bet.description}
                    </Text>
                  </div>
                  
                  <div className="text-right">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${bet.color} flex items-center justify-center ${
                      selectedBet?.id === bet.id ? 'scale-110' : ''
                    }`}>
                      {selectedBet?.id === bet.id && (
                        <Icon name="check" size={20} className="text-white" />
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Botão de iniciar jogo */}
        <div className="space-y-4 pt-4">
          <Button
            onClick={handleStartGame}
            disabled={!selectedBet || isLoading}
            className="w-full h-16 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 gradient-shift"
            loading={isLoading}
          >
            {isLoading ? (
              <>
                <Icon name="loader" size={20} className="mr-2 animate-spin" />
                Iniciando jogo...
              </>
            ) : (
              <>
                <Icon name="play" size={20} className="mr-2" />
                Jogar com {selectedBet?.amount || 0} fichas
              </>
            )}
          </Button>

          {/* Aviso de fichas insuficientes */}
          {selectedBet && user.chips < selectedBet.amount && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Icon name="alertCircle" size={20} className="text-red-600" />
                  <div>
                    <Text variant="small" className="font-medium text-red-800">
                      Fichas insuficientes
                    </Text>
                    <Text variant="caption" className="text-red-700">
                      Você precisa de {selectedBet.amount} fichas para esta aposta
                    </Text>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Dicas */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Icon name="lightbulb" size={20} className="text-blue-600 mt-1" />
              <div>
                <Text variant="small" className="font-medium text-blue-800 mb-1">
                  Dica
                </Text>
                <Text variant="caption" className="text-blue-700">
                  Comece com apostas menores para aprender o jogo. Você pode aumentar conforme ganhar experiência!
                </Text>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </GameTemplate>
  );
};

export default BettingPage; 