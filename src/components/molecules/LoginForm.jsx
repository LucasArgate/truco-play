import React, { useState } from 'react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Text from '../atoms/Text';
import Icon from '../atoms/Icon';
import { Card, CardContent, CardHeader, CardTitle } from '../atoms/Card';

const LoginForm = ({ onLogin, onSwitchToRegister, loading = false }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }
    
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onLogin(formData);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle>
          <Text variant="h2">Entrar</Text>
        </CardTitle>
        <Text variant="muted">
          Entre com suas credenciais para jogar
        </Text>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Input
              name="email"
              type="email"
              label="E-mail"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              className="pl-10"
            />
            <Icon 
              name="mail" 
              size={18} 
              className="absolute left-3 top-9 text-muted-foreground" 
            />
            {errors.email && (
              <Text variant="small" className="text-destructive mt-1">
                {errors.email}
              </Text>
            )}
          </div>

          <div className="relative">
            <Input
              name="password"
              type={showPassword ? 'text' : 'password'}
              label="Senha"
              placeholder="Sua senha"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              className="pl-10 pr-10"
            />
            <Icon 
              name="lock" 
              size={18} 
              className="absolute left-3 top-9 text-muted-foreground" 
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground"
            >
              <Icon name={showPassword ? 'eyeOff' : 'eye'} size={18} />
            </button>
            {errors.password && (
              <Text variant="small" className="text-destructive mt-1">
                {errors.password}
              </Text>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            loading={loading}
            size="lg"
          >
            Entrar
          </Button>

          <div className="text-center">
            <Text variant="small">
              Não tem uma conta?{' '}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-primary hover:underline font-medium"
              >
                Criar conta
              </button>
            </Text>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;

