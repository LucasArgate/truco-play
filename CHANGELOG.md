# 📋 Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [1.4.0] - 2025-01-XX

### ✅ Adicionado
- **Configuração completa do Vercel**: Arquivo `vercel.json` com headers e rewrites
- **Manifest PWA**: Arquivo `manifest.json` completo com shortcuts e screenshots
- **Service Worker atualizado**: Cache v1.4 com novos arquivos
- **Scripts de build**: `build:vercel` para deploy otimizado
- **Arquivos de inicialização**: `theme-init.js` e `install-prompt.js`
- **Guia de deploy**: Documentação completa para Vercel
- **Configuração de cache**: Headers otimizados para performance

### 🔧 Corrigido
- **Erros 404**: Todos os arquivos agora carregam corretamente no Vercel
- **PWA Installation**: Banner de instalação funciona em produção
- **Service Worker**: Registro e cache funcionando
- **Manifest**: Carregamento correto do manifesto PWA

### 🎨 Melhorado
- **Banner de instalação**: Design mais elegante com animações
- **Sistema de bônus**: 10 fichas ao instalar o app
- **Animações**: Efeitos visuais aprimorados
- **Performance**: Cache otimizado para assets

## [1.3.0] - 2025-01-XX

### ✅ Adicionado
- **Dark Mode**: Sistema completo de tema escuro/claro
- **Página de Perfil**: Interface completa para gerenciar perfil
- **Avatar Upload**: Sistema de upload de imagens
- **User Stats**: Estatísticas detalhadas do usuário
- **Banner de Instalação**: PWA install prompt após partidas
- **Sistema de Bônus**: 10 fichas ao instalar o app
- **Notificações**: Componente elegante para feedback

### 🎨 Melhorado
- **Avatar Component**: Fallback robusto com iniciais
- **UI/UX**: Design mais moderno e responsivo
- **Animações**: Efeitos visuais suaves
- **Performance**: Otimizações de carregamento

## [1.2.0] - 2025-01-XX

### ✅ Adicionado
- **Sistema de Jogos**: Simulação de partidas de truco
- **Sistema de Fichas**: Economia virtual do jogo
- **Ranking**: Lista de jogadores com pontuação
- **Navegação**: Bottom navigation bar
- **Templates**: Layouts reutilizáveis

### 🎨 Melhorado
- **Componentes**: Estrutura atomic design
- **Responsividade**: Design mobile-first
- **Performance**: Lazy loading e otimizações

## [1.1.0] - 2025-01-XX

### ✅ Adicionado
- **Sistema de Autenticação**: Login e registro
- **Páginas**: Splash, Login, Home, Betting, Queue, Game
- **Componentes UI**: Atoms, Molecules, Organisms
- **Tailwind CSS**: Sistema de design completo

### 🎨 Melhorado
- **Estrutura**: Organização de arquivos
- **Componentes**: Reutilização e modularidade

## [1.0.0] - 2025-01-XX

### ✅ Adicionado
- **Projeto inicial**: Estrutura base React + Vite
- **Configuração**: ESLint, Tailwind, React Router
- **Dependências**: Todas as bibliotecas necessárias

---

## 🔗 Links

- [Vercel Deploy Guide](./VERCEL_DEPLOY_GUIDE.md)
- [PWA Install Guide](./PWA_INSTALL_GUIDE.md)
- [Dark Mode Guide](./DARK_MODE_GUIDE.md)

## 📝 Notas

- **Versionamento**: Seguindo Semantic Versioning (MAJOR.MINOR.PATCH)
- **Deploy**: Configurado para Vercel com otimizações
- **PWA**: Progressive Web App com instalação nativa
- **Performance**: Cache e lazy loading implementados 