import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GameTemplate from '../components/templates/GameTemplate';
import Button from '../components/atoms/Button';
import Text from '../components/atoms/Text';
import Icon from '../components/atoms/Icon';
import Avatar from '../components/atoms/Avatar';
import { Card, CardContent, CardHeader, CardTitle } from '../components/atoms/Card';
import { useDarkMode } from '../contexts/DarkModeContext';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    // Carregar dados do usuário do localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      const userObj = JSON.parse(userData);
      setUser(userObj);
      setEditForm({
        name: userObj.name || '',
        email: userObj.email || '',
        avatar: userObj.avatar || ''
      });
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleSaveProfile = () => {
    const updatedUser = { ...user, ...editForm };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditForm({
      name: user?.name || '',
      email: user?.email || '',
      avatar: user?.avatar || ''
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const stats = [
    {
      label: 'Partidas Jogadas',
      value: user?.gamesPlayed || 0,
      icon: 'play',
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Vitórias',
      value: user?.wins || 0,
      icon: 'trophy',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      label: 'Fichas Atuais',
      value: user?.chips?.toLocaleString() || '0',
      icon: 'creditCard',
      color: 'from-green-500 to-green-600'
    },
    {
      label: 'Ranking',
      value: `#${user?.ranking || 'N/A'}`,
      icon: 'star',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  if (!user) {
    return null; // Loading state
  }

  return (
    <GameTemplate
      title="Perfil"
      user={user}
      activeRoute="profile"
      onNavigate={navigate}
      headerRightAction={
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          className="hover:bg-destructive/10 hover:text-destructive"
        >
          <Icon name="logOut" size={20} />
        </Button>
      }
    >
      <div className="p-4 space-y-6">
        {/* Header do Perfil */}
        <Card className="bg-gradient-to-r from-background to-muted/50 border-border">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              {/* Avatar Grande */}
              <div className="relative">
                <Avatar
                  src={user.avatar}
                  alt={user.name}
                  size="2xl"
                  fallback={user.name?.charAt(0)?.toUpperCase()}
                  className="ring-4 ring-primary/20"
                />
                {isEditing && (
                  <Button
                    size="icon"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => {/* TODO: Implementar upload de avatar */}}
                  >
                    <Icon name="camera" size={16} />
                  </Button>
                )}
              </div>

              {/* Informações do Usuário */}
              <div className="text-center space-y-2">
                {isEditing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="text-xl font-bold bg-background border border-border rounded-lg px-3 py-2 text-center w-full"
                      placeholder="Nome do usuário"
                    />
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="text-muted-foreground bg-background border border-border rounded-lg px-3 py-2 text-center w-full"
                      placeholder="Email"
                    />
                  </div>
                ) : (
                  <>
                    <Text variant="h2" className="font-bold text-foreground">
                      {user.name}
                    </Text>
                    <Text variant="muted" className="text-muted-foreground">
                      {user.email || 'jogador@truco.com'}
                    </Text>
                  </>
                )}

                {/* Botões de Ação */}
                <div className="flex justify-center space-x-2 pt-2">
                  {isEditing ? (
                    <>
                      <Button
                        size="sm"
                        onClick={handleSaveProfile}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        <Icon name="check" size={16} className="mr-1" />
                        Salvar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCancelEdit}
                      >
                        <Icon name="x" size={16} className="mr-1" />
                        Cancelar
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setIsEditing(true)}
                    >
                      <Icon name="edit" size={16} className="mr-1" />
                      Editar Perfil
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gradient-to-r from-muted to-muted/50 border-border">
              <CardContent className="p-4">
                <div className="text-center space-y-2">
                  <div className={`w-12 h-12 mx-auto bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center`}>
                    <Icon name={stat.icon} size={20} className="text-white" />
                  </div>
                  <Text variant="h3" className="font-bold text-foreground">
                    {stat.value}
                  </Text>
                  <Text variant="small" className="text-muted-foreground">
                    {stat.label}
                  </Text>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Histórico de Jogos */}
        <Card className="bg-gradient-to-r from-muted to-muted/50 border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icon name="clock" size={20} className="text-muted-foreground" />
              <span className="text-foreground">Histórico Recente</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {/* Placeholder para histórico de jogos */}
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-muted to-muted-foreground rounded-full flex items-center justify-center mb-4">
                  <Icon name="clock" size={24} className="text-muted-foreground" />
                </div>
                <Text variant="muted" className="text-center">
                  Nenhum jogo recente
                </Text>
                <Text variant="caption" className="text-center text-muted-foreground mt-2">
                  Seus jogos aparecerão aqui
                </Text>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Configurações */}
        <Card className="bg-gradient-to-r from-muted to-muted/50 border-border">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Icon name="settings" size={20} className="text-muted-foreground" />
              <span className="text-foreground">Configurações</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Tema */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-background border border-border">
                <div className="flex items-center space-x-3">
                  <Icon name={isDarkMode ? "moon" : "sun"} size={20} className="text-muted-foreground" />
                  <div>
                    <Text variant="small" className="font-medium text-foreground">
                      Tema
                    </Text>
                    <Text variant="caption" className="text-muted-foreground">
                      {isDarkMode ? 'Modo Escuro' : 'Modo Claro'}
                    </Text>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {/* Toggle será gerenciado pelo contexto */}}
                  className="text-xs"
                >
                  {isDarkMode ? 'Claro' : 'Escuro'}
                </Button>
              </div>

              {/* Notificações */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-background border border-border">
                <div className="flex items-center space-x-3">
                  <Icon name="bell" size={20} className="text-muted-foreground" />
                  <div>
                    <Text variant="small" className="font-medium text-foreground">
                      Notificações
                    </Text>
                    <Text variant="caption" className="text-muted-foreground">
                      Receber alertas de jogos
                    </Text>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  Ativadas
                </Button>
              </div>

              {/* Som */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-background border border-border">
                <div className="flex items-center space-x-3">
                  <Icon name="volume-2" size={20} className="text-muted-foreground" />
                  <div>
                    <Text variant="small" className="font-medium text-foreground">
                      Som
                    </Text>
                    <Text variant="caption" className="text-muted-foreground">
                      Efeitos sonoros do jogo
                    </Text>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  Ativado
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ações */}
        <div className="space-y-3">
          <Button
            variant="outline"
            onClick={() => navigate('/payment')}
            className="w-full justify-start"
          >
            <Icon name="creditCard" size={20} className="mr-3" />
            Comprar Fichas
          </Button>
          
          <Button
            variant="outline"
            onClick={() => navigate('/ranking')}
            className="w-full justify-start"
          >
            <Icon name="trophy" size={20} className="mr-3" />
            Ver Ranking
          </Button>

          <Button
            variant="outline"
            onClick={() => {/* TODO: Implementar ajuda */}}
            className="w-full justify-start"
          >
            <Icon name="helpCircle" size={20} className="mr-3" />
            Ajuda e Suporte
          </Button>
        </div>
      </div>
    </GameTemplate>
  );
};

export default ProfilePage; 