# 🚀 Guia de Deploy no Vercel

## 📋 Pré-requisitos

1. **Conta no Vercel**: [vercel.com](https://vercel.com)
2. **Repositório no GitHub/GitLab/Bitbucket**
3. **Node.js 18+** (localmente para testes)

## 🔧 Configuração

### 1. Arquivos Criados/Atualizados

- ✅ `public/manifest.json` - Manifesto PWA
- ✅ `public/sw.js` - Service Worker atualizado
- ✅ `public/theme-init.js` - Inicialização de tema
- ✅ `public/install-prompt.js` - Captura de instalação
- ✅ `vercel.json` - Configuração do Vercel
- ✅ `.vercelignore` - Arquivos ignorados
- ✅ `vite.config.js` - Configuração do Vite

### 2. Estrutura de Arquivos

```
truco-play/
├── public/
│   ├── manifest.json          # ✅ PWA Manifest
│   ├── sw.js                 # ✅ Service Worker
│   ├── theme-init.js         # ✅ Tema inicial
│   ├── install-prompt.js     # ✅ Instalação PWA
│   ├── favicon.svg           # ✅ Ícone
│   ├── react.svg             # ✅ Ícone React
│   └── avatar-placeholder.png # ✅ Placeholder
├── src/
│   └── ...                   # ✅ Código React
├── vercel.json              # ✅ Config Vercel
├── .vercelignore            # ✅ Ignore
└── vite.config.js           # ✅ Config Vite
```

## 🚀 Deploy

### Opção 1: Deploy via Vercel Dashboard

1. **Acesse** [vercel.com](https://vercel.com)
2. **Clique** em "New Project"
3. **Importe** seu repositório
4. **Configure**:
   - Framework: `Vite`
   - Build Command: `npm run build:vercel`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Opção 2: Deploy via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy em produção
vercel --prod
```

## 🔍 Verificação

### 1. Verificar Arquivos

Após o deploy, verifique se estes URLs retornam 200:

- ✅ `https://seu-dominio.vercel.app/manifest.json`
- ✅ `https://seu-dominio.vercel.app/sw.js`
- ✅ `https://seu-dominio.vercel.app/theme-init.js`
- ✅ `https://seu-dominio.vercel.app/install-prompt.js`

### 2. Verificar PWA

1. **Abra** o DevTools (F12)
2. **Vá** para aba "Application"
3. **Verifique**:
   - ✅ Manifest carregado
   - ✅ Service Worker registrado
   - ✅ Cache funcionando

### 3. Testar Instalação

1. **Complete** uma partida
2. **Volte** para home
3. **Banner** deve aparecer
4. **Clique** em "Instalar"
5. **Receba** 10 fichas

## 🐛 Troubleshooting

### Erro 404 nos arquivos

**Solução**: Verifique se o `vercel.json` está correto:

```json
{
  "buildCommand": "npm run build:vercel",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### Service Worker não registra

**Solução**: Verifique se o `sw.js` está na pasta `public/` e se o `index.html` tem a referência correta.

### Banner não aparece

**Solução**: Verifique os logs no console e se o `install-prompt.js` está sendo carregado.

### Cache não funciona

**Solução**: Verifique se o `sw.js` está atualizado e se o `CACHE_NAME` foi incrementado.

## 📱 PWA Features

### ✅ Funcionalidades Implementadas

- **Instalação PWA**: Banner automático após partida
- **Offline**: Service Worker com cache
- **Tema**: Dark/Light mode automático
- **Bônus**: 10 fichas ao instalar
- **Animações**: Banner elegante e responsivo

### 🎯 Próximos Passos

1. **Ícones**: Criar ícones específicos (192x192, 512x512)
2. **Screenshots**: Adicionar screenshots reais
3. **Analytics**: Implementar tracking
4. **Push**: Notificações push

## 🔗 Links Úteis

- [Vercel Documentation](https://vercel.com/docs)
- [PWA Guide](https://web.dev/progressive-web-apps/)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)

---

**Status**: ✅ Pronto para deploy!
**Versão**: 1.4.0
**Última atualização**: Janeiro 2025 