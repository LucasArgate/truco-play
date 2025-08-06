import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GameTemplate from '../components/templates/GameTemplate';
import Button from '../components/atoms/Button';
import Text from '../components/atoms/Text';
import Icon from '../components/atoms/Icon';
import { Card, CardContent, CardHeader, CardTitle } from '../components/atoms/Card';
import { gameService } from '../services/gameService';

const QueuePage = () => {
  const [user, setUser] = useState(null);
  const [queueStatus, setQueueStatus] = useState('joining'); // joining, waiting, found
  const [queuePosition, setQueuePosition] = useState(0);
  const [waitTime, setWaitTime] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Carregar dados do usuário
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      // Verificar se tem fichas suficientes
      if (parsedUser.chips < 10) {
        navigate('/payment');
        return;
      }
      
      // Entrar na fila
      joinQueue();
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    let interval;
    if (queueStatus === 'waiting') {
      interval = setInterval(() => {
        setWaitTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [queueStatus]);

  const joinQueue = async () => {
    try {
      setQueueStatus('joining');
      const result = await gameService.joinQueue();
      if (result.success) {
        setQueuePosition(result.queuePosition);
        setQueueStatus('waiting');
        
        // Simular encontrar oponente após um tempo
        setTimeout(() => {
          setQueueStatus('found');
          setTimeout(() => {
            navigate('/game');
          }, 2000);
        }, Math.random() * 5000 + 3000); // 3-8 segundos
      }
    } catch (error) {
      console.error('Erro ao entrar na fila:', error);
      navigate('/home');
    }
  };

  const leaveQueue = async () => {
    try {
      await gameService.leaveQueue();
      navigate('/home');
    } catch (error) {
      console.error('Erro ao sair da fila:', error);
      navigate('/home');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!user) {
    return null;
  }

  return (
    <GameTemplate
      title="Fila de Espera"
      showBackButton
      onBack={() => navigate('/home')}
      user={user}
      showNavbar={false}
    >
      <div className="p-4 flex flex-col items-center justify-center min-h-[calc(100vh-120px)]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>
              {queueStatus === 'joining' && 'Entrando na fila...'}
              {queueStatus === 'waiting' && 'Procurando oponente'}
              {queueStatus === 'found' && 'Oponente encontrado!'}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            {/* Ícone de status */}
            <div className="flex justify-center">
              {queueStatus === 'joining' && (
                <Icon name="loader" size={48} className="animate-spin text-primary" />
              )}
              {queueStatus === 'waiting' && (
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-primary/20 rounded-full"></div>
                  <div className="absolute inset-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon name="user" size={24} className="text-primary" />
                  </div>
                </div>
              )}
              {queueStatus === 'found' && (
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Icon name="check" size={32} className="text-green-600" />
                </div>
              )}
            </div>

            {/* Informações da fila */}
            {queueStatus === 'waiting' && (
              <div className="space-y-4">
                <div>
                  <Text variant="h3" className="text-primary">
                    {queuePosition}
                  </Text>
                  <Text variant="small" className="text-muted-foreground">
                    posição na fila
                  </Text>
                </div>
                
                <div>
                  <Text variant="body" className="font-medium">
                    Tempo de espera: {formatTime(waitTime)}
                  </Text>
                  <Text variant="small" className="text-muted-foreground">
                    Tempo estimado: ~{Math.max(1, queuePosition * 30)} segundos
                  </Text>
                </div>
              </div>
            )}

            {queueStatus === 'found' && (
              <div className="space-y-2">
                <Text variant="body" className="font-medium text-green-600">
                  Preparando partida...
                </Text>
                <Text variant="small" className="text-muted-foreground">
                  Você será redirecionado em instantes
                </Text>
              </div>
            )}

            {/* Informações do jogo */}
            <div className="bg-muted rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <Text variant="small">Aposta mínima:</Text>
                <Text variant="small" className="font-medium">10 fichas</Text>
              </div>
              <div className="flex justify-between">
                <Text variant="small">Suas fichas:</Text>
                <Text variant="small" className="font-medium">{user.chips}</Text>
              </div>
            </div>

            {/* Botão de cancelar */}
            {queueStatus !== 'found' && (
              <Button
                variant="outline"
                onClick={leaveQueue}
                className="w-full"
                disabled={queueStatus === 'joining'}
              >
                Cancelar
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Dicas */}
        <Card className="w-full max-w-md mt-4">
          <CardContent className="p-4">
            <div className="flex items-start space-x-2">
              <Icon name="info" size={16} className="text-blue-500 mt-1" />
              <div>
                <Text variant="small" className="font-medium">
                  Dica
                </Text>
                <Text variant="caption" className="text-muted-foreground">
                  Enquanto espera, que tal revisar as regras do truco?
                </Text>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </GameTemplate>
  );
};

export default QueuePage;

