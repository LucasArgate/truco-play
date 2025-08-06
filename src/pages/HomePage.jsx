import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GameTemplate from '../components/templates/GameTemplate';
import Button from '../components/atoms/Button';
import Text from '../components/atoms/Text';
import Icon from '../components/atoms/Icon';
import { Card, CardContent, CardHeader, CardTitle } from '../components/atoms/Card';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Carregar dados do usuário do localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleStartGame = () => {
    navigate('/betting');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) {
    return null; // Loading state
  }

  return (
    <GameTemplate
      title="Início"
      user={user}
      activeRoute="home"
      onNavigate={navigate}
      headerRightAction={
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
        >
          <Icon name="logOut" size={20} />
        </Button>
      }
    >
      <div className="p-4 space-y-6">
        {/* Boas-vindas */}
        <div className="text-center py-6">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4 float pulse-glow">
              <Text variant="h1" className="text-white font-bold text-3xl">
                {user.name?.charAt(0)?.toUpperCase()}
              </Text>
            </div>
          </div>
          <Text variant="h2" className="mb-2 font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Bem-vindo, {user.name}!
          </Text>
          <Text variant="muted" className="text-lg">
            Pronto para uma nova partida?
          </Text>
        </div>

        {/* Status do jogador */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icon name="user" size={20} className="text-blue-600" />
              <span className="text-blue-800">Seu Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mb-2">
                  <Text variant="h3" className="text-white font-bold">
                    {user.chips?.toLocaleString() || 0}
                  </Text>
                </div>
                <Text variant="small" className="text-muted-foreground font-medium">
                  Fichas
                </Text>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mb-2">
                  <Text variant="h3" className="text-white font-bold">
                    {user.gamesPlayed || 0}
                  </Text>
                </div>
                <Text variant="small" className="text-muted-foreground font-medium">
                  Jogos
                </Text>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ações principais */}
        <div className="space-y-6">
          <Button
            onClick={handleStartGame}
            className="w-full h-16 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 gradient-shift"
            size="lg"
          >
            <Icon name="play" size={24} className="mr-3" />
            Jogar Agora
          </Button>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/ranking')}
              className="flex flex-col items-center py-8 h-auto border-2 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-3">
                <Icon name="trophy" size={24} className="text-white" />
              </div>
              <Text variant="small" className="font-semibold">Ranking</Text>
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate('/payment')}
              className="flex flex-col items-center py-8 h-auto border-2 hover:border-green-300 hover:bg-green-50 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mb-3">
                <Icon name="creditCard" size={24} className="text-white" />
              </div>
              <Text variant="small" className="font-semibold">Comprar Fichas</Text>
            </Button>
          </div>
        </div>

        {/* Aviso de fichas baixas */}
        {user.chips < 10 && (
          <Card className="border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Icon name="alertCircle" size={20} className="text-white" />
                </div>
                <div>
                  <Text variant="small" className="font-medium text-yellow-800">
                    Fichas insuficientes
                  </Text>
                  <Text variant="caption" className="text-yellow-700">
                    Você precisa de pelo menos 10 fichas para jogar
                  </Text>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Últimas partidas (placeholder) */}
        <Card className="bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icon name="clock" size={20} className="text-gray-600" />
              <span className="text-gray-800">Últimas Partidas</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center mb-4">
                <Icon name="clock" size={24} className="text-white" />
              </div>
              <Text variant="muted" className="text-center">
                Nenhuma partida recente
              </Text>
              <Text variant="caption" className="text-center text-gray-500 mt-2">
                Suas partidas aparecerão aqui
              </Text>
            </div>
          </CardContent>
        </Card>
      </div>
    </GameTemplate>
  );
};

export default HomePage;

