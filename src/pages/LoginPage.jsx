import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthTemplate from '../components/templates/AuthTemplate';
import LoginForm from '../components/molecules/LoginForm';
import RegisterForm from '../components/molecules/RegisterForm';
import { gameService } from '../services/gameService';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    setLoading(true);
    try {
      const result = await gameService.login(credentials.email, credentials.password);
      if (result.success) {
        // Salvar dados do usuário no localStorage ou context
        localStorage.setItem('user', JSON.stringify(result.user));
        navigate('/home');
      } else {
        alert(result.message || 'Erro ao fazer login');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      alert('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (userData) => {
    setLoading(true);
    try {
      const result = await gameService.register(userData);
      if (result.success) {
        // Salvar dados do usuário no localStorage ou context
        localStorage.setItem('user', JSON.stringify(result.user));
        navigate('/home');
      } else {
        alert(result.message || 'Erro ao criar conta');
      }
    } catch (error) {
      console.error('Erro no registro:', error);
      alert('Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthTemplate>
      {isLogin ? (
        <LoginForm
          onLogin={handleLogin}
          onSwitchToRegister={() => setIsLogin(false)}
          loading={loading}
        />
      ) : (
        <RegisterForm
          onRegister={handleRegister}
          onSwitchToLogin={() => setIsLogin(true)}
          loading={loading}
        />
      )}
    </AuthTemplate>
  );
};

export default LoginPage;

