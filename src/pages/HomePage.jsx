import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GameTemplate from '../components/templates/GameTemplate';
import Button from '../components/atoms/Button';
import Text from '../components/atoms/Text';
import Icon from '../components/atoms/Icon';
import Avatar from '../components/atoms/Avatar';
import InstallBanner from '../components/molecules/InstallBanner';
import { Card, CardContent, CardHeader, CardTitle } from '../components/atoms/Card';
import { isAppInstalled, hasUserDismissedInstall, activateInstallBanner } from '../utils/installUtils';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Carregar dados do usuário do localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }

    // Verificar se deve mostrar o banner de instalação
    const shouldShowBanner = localStorage.getItem('showInstallBanner');
    console.log('HomePage - shouldShowBanner:', shouldShowBanner);
    console.log('HomePage - isAppInstalled:', isAppInstalled());
    console.log('HomePage - hasUserDismissedInstall:', hasUserDismissedInstall());
    
    if (shouldShowBanner === 'true' && !isAppInstalled() && !hasUserDismissedInstall()) {
      console.log('HomePage - Ativando banner de instalação');
      setShowInstallBanner(true);
      // Remove a flag para não mostrar novamente
      localStorage.removeItem('showInstallBanner');
    }

    // Verificar se é PWA e mostrar banner se necessário
    const checkPWAInstall = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                         window.navigator.standalone === true;
      
      console.log('HomePage - Verificando PWA:', isStandalone);
      console.log('HomePage - display-mode standalone:', window.matchMedia('(display-mode: standalone)').matches);
      console.log('HomePage - navigator.standalone:', window.navigator.standalone);
      
      if (!isStandalone && !hasUserDismissedInstall()) {
        console.log('HomePage - Não é PWA, pode mostrar banner');
        // Ativar banner após 3 segundos se não for PWA
        setTimeout(() => {
          if (!isAppInstalled() && !hasUserDismissedInstall()) {
            console.log('HomePage - Ativando banner por não ser PWA');
            setShowInstallBanner(true);
          }
        }, 3000);
      }
    };

    checkPWAInstall();
  }, [navigate]);

  const handleStartGame = () => {
    navigate('/betting');
  };

  const handleCloseInstallBanner = () => {
    setShowInstallBanner(false);
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
      {/* Container responsivo - centralizado apenas no desktop */}
      <div className="p-4 md:p-0 md:flex md:justify-center md:items-start md:min-h-full">
        {/* Conteúdo centralizado com largura máxima no desktop */}
        <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl mx-auto space-y-6">
          {/* Boas-vindas */}
          <div className="text-center py-6">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto mb-4 float pulse-glow">
                <Avatar
                  src={user.avatar}
                  alt={user.name}
                  size="2xl"
                  fallback={user.name}
                  className="ring-4 ring-primary/20"
                />
              </div>
            </div>
            <Text variant="h2" className="mb-2 font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Bem-vindo, {user.name}!
            </Text>
            <Text variant="muted" className="text-lg">
              Pronto para uma nova partida?
            </Text>
          </div>

          {/* Status do jogador */}
          <Card className="bg-gradient-to-r from-muted to-muted/50 border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Icon name="user" size={20} className="text-primary" />
                <span className="text-foreground">Seu Status</span>
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
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center mb-2">
                    <Text variant="h3" className="text-primary-foreground font-bold">
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
              className="w-full h-16 text-lg font-bold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 gradient-shift"
              size="lg"
            >
              <Icon name="play" size={24} className="mr-3" />
              Jogar Agora
            </Button>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={() => navigate('/ranking')}
                className="flex flex-col items-center py-8 h-auto border-2 hover:border-primary hover:bg-primary/10 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-3">
                  <Icon name="trophy" size={24} className="text-white" />
                </div>
                <Text variant="small" className="font-semibold">Ranking</Text>
              </Button>

              <Button
                variant="outline"
                onClick={() => navigate('/payment')}
                className="flex flex-col items-center py-8 h-auto border-2 hover:border-primary hover:bg-primary/10 transition-all duration-300"
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
            <Card className="border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 dark:border-yellow-700">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Icon name="alertCircle" size={20} className="text-white" />
                  </div>
                  <div>
                    <Text variant="small" className="font-medium text-yellow-800 dark:text-yellow-200">
                      Fichas insuficientes
                    </Text>
                    <Text variant="caption" className="text-yellow-700 dark:text-yellow-300">
                      Você precisa de pelo menos 10 fichas para jogar
                    </Text>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Últimas partidas (placeholder) */}
          <Card className="bg-gradient-to-r from-muted to-muted/50 border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Icon name="clock" size={20} className="text-muted-foreground" />
                <span className="text-foreground">Últimas Partidas</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-muted to-muted-foreground rounded-full flex items-center justify-center mb-4">
                  <Icon name="clock" size={24} className="text-muted-foreground" />
                </div>
                <Text variant="muted" className="text-center">
                  Nenhuma partida recente
                </Text>
                <Text variant="caption" className="text-center text-muted-foreground mt-2">
                  Suas partidas aparecerão aqui
                </Text>
              </div>
            </CardContent>
          </Card>

                            {/* Botão de teste para ativar banner */}
                  <Button
                    variant="outline"
                    onClick={() => {
                      console.log('HomePage - Botão de teste clicado');
                      activateInstallBanner();
                      setShowInstallBanner(true);
                    }}
                    className="w-full justify-start bg-yellow-100 border-yellow-300 text-yellow-800 hover:bg-yellow-200"
                  >
                    <Icon name="download" size={20} className="mr-3" />
                    Testar Banner de Instalação
                  </Button>

                  {/* Botão para forçar banner sempre */}
                  <Button
                    variant="outline"
                    onClick={() => {
                      console.log('HomePage - Forçando banner sempre');
                      setShowInstallBanner(true);
                    }}
                    className="w-full justify-start bg-green-100 border-green-300 text-green-800 hover:bg-green-200"
                  >
                    <Icon name="star" size={20} className="mr-3" />
                    Forçar Banner Sempre
                  </Button>
        </div>
      </div>

      {/* Banner de Instalação */}
      {showInstallBanner && (
        <InstallBanner onClose={handleCloseInstallBanner} />
      )}
    </GameTemplate>
  );
};

export default HomePage;

