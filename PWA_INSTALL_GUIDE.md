# Guia de Instalação PWA - Truco Play

## Visão Geral

O sistema de instalação PWA (Progressive Web App) permite que os usuários instalem o Truco Play como um aplicativo nativo em seus dispositivos, proporcionando uma experiência mais fluida e acesso offline.

## Funcionalidades Implementadas

### 🎯 **1. Banner de Instalação Inteligente**

**Características:**
- ✅ Aparece após completar uma partida
- ✅ Detecta automaticamente se o app pode ser instalado
- ✅ Não aparece se o app já está instalado
- ✅ Lembra se o usuário já recusou a instalação
- ✅ Design responsivo e atrativo

**Comportamento:**
- Aparece na HomePage após completar uma partida
- Pode ser fechado pelo usuário
- Não aparece novamente se recusado
- Desaparece automaticamente se o app é instalado

### 📱 **2. Detecção de Instalação**

**Verificações Automáticas:**
- ✅ Se o app está instalado como PWA
- ✅ Se o dispositivo suporta instalação
- ✅ Se o usuário já interagiu com o banner

### ⚙️ **3. Configurações Centralizadas**

**Arquivo:** `src/config/app.js`
```javascript
export const APP_CONFIG = {
  version: '1.0.0',
  install: {
    bannerDelay: 5000,
    maxDismissals: 3,
    showAfterGame: true,
  }
};
```

### 🎮 **4. Integração com Jogo**

**Ativação Automática:**
- ✅ Após completar uma partida (vitória ou derrota)
- ✅ Salva preferência no localStorage
- ✅ Respeita configurações do usuário

## Como Usar

### **Para Desenvolvedores:**

#### **1. Ativar Banner Manualmente:**
```javascript
import { activateInstallBanner } from '../utils/installUtils';

// Ativar para mostrar na próxima visita à home
activateInstallBanner();
```

#### **2. Verificar Estado de Instalação:**
```javascript
import { isAppInstalled, canInstallApp } from '../utils/installUtils';

if (isAppInstalled()) {
  console.log('App já está instalado');
}

if (canInstallApp()) {
  console.log('App pode ser instalado');
}
```

#### **3. Gerenciar Preferências:**
```javascript
import { 
  hasUserDismissedInstall, 
  markInstallDismissed,
  resetInstallDismissal 
} from '../utils/installUtils';

// Verificar se usuário recusou
if (hasUserDismissedInstall()) {
  // Não mostrar banner
}

// Marcar como recusado
markInstallDismissed();

// Resetar para testes
resetInstallDismissal();
```

### **Para Usuários:**

#### **Instalação Automática:**
1. Jogue uma partida completa
2. Volte para a home
3. O banner aparecerá automaticamente
4. Clique em "Instalar"
5. Confirme a instalação no navegador

#### **Instalação Manual:**
1. Abra o app no Chrome/Edge
2. Clique no ícone de instalação na barra de endereços
3. Ou use o menu do navegador → "Instalar app"

## Componentes Criados

### **1. InstallBanner**
- **Arquivo:** `src/components/molecules/InstallBanner.jsx`
- **Função:** Banner de instalação com design atrativo
- **Props:** `onClose` - callback quando fechado

### **2. Footer**
- **Arquivo:** `src/components/atoms/Footer.jsx`
- **Função:** Mostra versão do app no rodapé
- **Integração:** Usa configuração centralizada

### **3. Utilitários**
- **Arquivo:** `src/utils/installUtils.js`
- **Funções:** Gerenciamento completo do estado de instalação

### **4. Configuração**
- **Arquivo:** `src/config/app.js`
- **Função:** Configurações centralizadas do app

## Estrutura de Arquivos

```
src/
├── components/
│   ├── atoms/
│   │   └── Footer.jsx              # Footer com versão
│   └── molecules/
│       └── InstallBanner.jsx       # Banner de instalação
├── utils/
│   └── installUtils.js             # Utilitários PWA
├── config/
│   └── app.js                      # Configurações do app
└── pages/
    ├── HomePage.jsx                # Integração do banner
    └── GamePage.jsx                # Ativação após partida
```

## Configurações

### **Versão do App:**
Edite `src/config/app.js`:
```javascript
export const APP_CONFIG = {
  version: '1.1.0', // Atualize aqui
  // ...
};
```

### **Comportamento do Banner:**
```javascript
install: {
  bannerDelay: 5000,        // Delay antes de mostrar
  maxDismissals: 3,         // Máximo de recusas
  showAfterGame: true,      // Mostrar após partida
}
```

## Testes

### **Para Testar Instalação:**
1. Abra o app no Chrome DevTools
2. Vá para Application → Manifest
3. Verifique se o manifest está correto
4. Teste a instalação via DevTools

### **Para Testar Banner:**
1. Complete uma partida
2. Volte para a home
3. Verifique se o banner aparece
4. Teste fechar e recusar

### **Para Resetar Estado:**
```javascript
// No console do navegador
localStorage.removeItem('installBannerDismissed');
localStorage.removeItem('showInstallBanner');
```

## Boas Práticas

### **1. UX/UI:**
- ✅ Banner não intrusivo
- ✅ Design consistente com o app
- ✅ Animações suaves
- ✅ Feedback visual claro

### **2. Performance:**
- ✅ Lazy loading do banner
- ✅ Verificações eficientes
- ✅ Cache de preferências

### **3. Acessibilidade:**
- ✅ Textos descritivos
- ✅ Contraste adequado
- ✅ Navegação por teclado

## Troubleshooting

### **Banner Não Aparece:**
- Verifique se o app pode ser instalado
- Confirme se não está já instalado
- Verifique se o usuário não recusou

### **Erro de Instalação:**
- Verifique o manifest.json
- Confirme HTTPS em produção
- Teste em diferentes navegadores

### **Versão Não Atualiza:**
- Limpe cache do navegador
- Verifique se o Service Worker está atualizado
- Force refresh (Ctrl+F5)

## Próximos Passos

### **Melhorias Futuras:**
1. **A/B Testing** para diferentes mensagens
2. **Analytics** de taxa de instalação
3. **Notificações push** para usuários instalados
4. **Offline mode** completo
5. **Sincronização** entre dispositivos

### **Otimizações:**
1. **Preload** de recursos críticos
2. **Compression** de assets
3. **Caching** inteligente
4. **Background sync** para dados

O sistema está pronto para uso e totalmente integrado ao fluxo do jogo! 