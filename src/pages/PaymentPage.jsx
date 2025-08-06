import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GameTemplate from '../components/templates/GameTemplate';
import Button from '../components/atoms/Button';
import Text from '../components/atoms/Text';
import Icon from '../components/atoms/Icon';
import { Card, CardContent, CardHeader, CardTitle } from '../components/atoms/Card';
import { gameService } from '../services/gameService';

const PaymentPage = () => {
  const [user, setUser] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [pixData, setPixData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('select'); // select, pix, success
  const navigate = useNavigate();

  const chipPackages = [
    { chips: 100, price: 5.00, popular: false },
    { chips: 500, price: 20.00, popular: true },
    { chips: 1000, price: 35.00, popular: false },
    { chips: 2500, price: 80.00, popular: false }
  ];

  useEffect(() => {
    // Carregar dados do usuário
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleSelectPackage = (pkg) => {
    setSelectedAmount(pkg);
  };

  const handleGeneratePix = async () => {
    if (!selectedAmount) return;

    setLoading(true);
    try {
      const result = await gameService.generatePix(selectedAmount.price);
      if (result.success) {
        setPixData(result);
        setStep('pix');
      } else {
        alert('Erro ao gerar PIX. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao gerar PIX:', error);
      alert('Erro ao gerar PIX. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyPix = () => {
    if (pixData?.pixCode) {
      navigator.clipboard.writeText(pixData.pixCode);
      alert('Código PIX copiado!');
    }
  };

  const handlePaymentSuccess = () => {
    // Simular pagamento bem-sucedido
    if (user && selectedAmount) {
      const updatedUser = {
        ...user,
        chips: user.chips + selectedAmount.chips
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setStep('success');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <GameTemplate
      title="Comprar Fichas"
      showBackButton
      onBack={() => navigate('/home')}
      user={user}
      activeRoute="payment"
      onNavigate={navigate}
    >
      <div className="p-4 space-y-6">
        {step === 'select' && (
          <>
            {/* Saldo atual */}
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <Text variant="small" className="text-muted-foreground">
                    Saldo atual
                  </Text>
                  <Text variant="h2" className="text-primary">
                    {user.chips?.toLocaleString() || 0} fichas
                  </Text>
                </div>
              </CardContent>
            </Card>

            {/* Pacotes de fichas */}
            <div>
              <Text variant="h4" className="mb-4">
                Escolha um pacote
              </Text>
              <div className="grid grid-cols-1 gap-4">
                {chipPackages.map((pkg, index) => (
                  <Card
                    key={index}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedAmount?.chips === pkg.chips
                        ? 'ring-2 ring-primary bg-primary/5'
                        : 'hover:shadow-md'
                    } ${pkg.popular ? 'border-primary' : ''}`}
                    onClick={() => handleSelectPackage(pkg)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <Icon name="star" size={24} className="text-primary" />
                          </div>
                          <div>
                            <Text variant="body" className="font-semibold">
                              {pkg.chips.toLocaleString()} fichas
                            </Text>
                            <Text variant="small" className="text-muted-foreground">
                              R$ {pkg.price.toFixed(2)}
                            </Text>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          {pkg.popular && (
                            <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full mb-1">
                              Mais popular
                            </div>
                          )}
                          <Text variant="small" className="text-muted-foreground">
                            R$ {(pkg.price / pkg.chips * 100).toFixed(2)}/100 fichas
                          </Text>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Botão de continuar */}
            <Button
              onClick={handleGeneratePix}
              disabled={!selectedAmount || loading}
              loading={loading}
              className="w-full"
              size="lg"
            >
              Gerar PIX
            </Button>
          </>
        )}

        {step === 'pix' && pixData && (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="text-center">
                  PIX Gerado
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* QR Code placeholder */}
                <div className="flex justify-center">
                  <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center">
                    <Text variant="small" className="text-muted-foreground text-center">
                      QR Code PIX
                      <br />
                      (Escaneie com seu banco)
                    </Text>
                  </div>
                </div>

                {/* Informações do pagamento */}
                <div className="bg-muted rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <Text variant="small">Fichas:</Text>
                    <Text variant="small" className="font-medium">
                      {selectedAmount.chips.toLocaleString()}
                    </Text>
                  </div>
                  <div className="flex justify-between">
                    <Text variant="small">Valor:</Text>
                    <Text variant="small" className="font-medium">
                      R$ {selectedAmount.price.toFixed(2)}
                    </Text>
                  </div>
                </div>

                {/* Código PIX */}
                <div>
                  <Text variant="small" className="mb-2">
                    Ou copie o código PIX:
                  </Text>
                  <div className="bg-muted rounded-lg p-3 break-all">
                    <Text variant="caption" className="font-mono">
                      {pixData.pixCode}
                    </Text>
                  </div>
                </div>

                {/* Botões */}
                <div className="space-y-2">
                  <Button onClick={handleCopyPix} className="w-full" variant="outline">
                    <Icon name="creditCard" size={16} className="mr-2" />
                    Copiar Código PIX
                  </Button>
                  
                  <Button onClick={handlePaymentSuccess} className="w-full" variant="success">
                    Simular Pagamento (Demo)
                  </Button>
                </div>

                <Text variant="caption" className="text-muted-foreground text-center">
                  Após o pagamento, suas fichas serão creditadas automaticamente
                </Text>
              </CardContent>
            </Card>
          </>
        )}

        {step === 'success' && (
          <Card>
            <CardContent className="p-6 text-center space-y-4">
              <div className="text-6xl mb-4">🎉</div>
              
              <Text variant="h2" className="text-green-600">
                Pagamento Confirmado!
              </Text>
              
              <Text variant="body" className="text-muted-foreground">
                Suas fichas foram creditadas com sucesso.
              </Text>

              <div className="bg-green-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <Text variant="small">Fichas adquiridas:</Text>
                  <Text variant="small" className="font-medium text-green-600">
                    +{selectedAmount.chips.toLocaleString()}
                  </Text>
                </div>
                <div className="flex justify-between">
                  <Text variant="small">Novo saldo:</Text>
                  <Text variant="small" className="font-medium">
                    {user.chips?.toLocaleString() || 0} fichas
                  </Text>
                </div>
              </div>

              <Button onClick={() => navigate('/home')} className="w-full" size="lg">
                Continuar
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </GameTemplate>
  );
};

export default PaymentPage;

