# Guia do Dark Mode - Truco Play

## Visão Geral

O sistema de dark mode do Truco Play foi implementado para detectar automaticamente a preferência do sistema operacional e permitir que os usuários alternem manualmente entre os temas claro e escuro.

## Funcionalidades

### 1. Detecção Automática
- Detecta automaticamente a preferência do sistema operacional (`prefers-color-scheme: dark`)
- Aplica o tema correspondente sem intervenção do usuário

### 2. Persistência
- Salva a preferência do usuário no `localStorage`
- Mantém a escolha entre sessões do navegador

### 3. Toggle Manual
- Botão de toggle disponível no Header e Navbar
- Permite alternar entre modo claro e escuro

### 4. Sincronização com Sistema
- Se o usuário não definiu uma preferência, acompanha mudanças do sistema
- Se o usuário definiu uma preferência, mantém a escolha

## Como Usar

### 1. Hook useDarkMode

```jsx
import { useDarkMode } from '../contexts/DarkModeContext';

function MyComponent() {
  const { isDarkMode, toggleDarkMode, setDarkMode } = useDarkMode();
  
  return (
    <div>
      <p>Modo atual: {isDarkMode ? 'Escuro' : 'Claro'}</p>
      <button onClick={toggleDarkMode}>
        Alternar Tema
      </button>
      <button onClick={() => setDarkMode(true)}>
        Forçar Modo Escuro
      </button>
    </div>
  );
}
```

### 2. Componente DarkModeToggle

```jsx
import { DarkModeToggle } from '../components/atoms/DarkModeToggle';

function MyComponent() {
  return (
    <div>
      <DarkModeToggle className="custom-class" />
    </div>
  );
}
```

## Classes CSS para Dark Mode

### Variáveis CSS Disponíveis

O projeto usa variáveis CSS que se adaptam automaticamente ao tema:

```css
/* Cores principais */
--background: oklch(1 0 0);        /* Branco no modo claro */
--foreground: oklch(0.145 0 0);    /* Preto no modo claro */
--primary: oklch(0.205 0 0);       /* Cor primária */
--primary-foreground: oklch(0.985 0 0);

/* Cores secundárias */
--secondary: oklch(0.97 0 0);
--secondary-foreground: oklch(0.205 0 0);
--muted: oklch(0.97 0 0);
--muted-foreground: oklch(0.556 0 0);

/* Bordas e inputs */
--border: oklch(0.922 0 0);
--input: oklch(0.922 0 0);
--ring: oklch(0.708 0 0);
```

### Classes Tailwind Recomendadas

```jsx
// Use estas classes para compatibilidade com dark mode
<div className="bg-background text-foreground">
  <h1 className="text-foreground">Título</h1>
  <p className="text-muted-foreground">Texto secundário</p>
  <button className="bg-primary text-primary-foreground">
    Botão
  </button>
  <div className="bg-muted border-border">
    Card
  </div>
</div>
```

## Estrutura de Arquivos

```
src/
├── contexts/
│   └── DarkModeContext.jsx          # Contexto React para dark mode
├── hooks/
│   └── use-dark-mode.js             # Hook personalizado (legado)
├── components/
│   └── atoms/
│       └── DarkModeToggle.jsx       # Componente de toggle
└── App.jsx                          # Provider do contexto

public/
└── theme-init.js                    # Script de inicialização
```

## Inicialização

O tema é inicializado em duas etapas:

1. **Script de Inicialização** (`public/theme-init.js`)
   - Executa antes do React
   - Evita flash de conteúdo
   - Detecta preferência inicial

2. **Contexto React** (`src/contexts/DarkModeContext.jsx`)
   - Gerencia estado durante a aplicação
   - Permite mudanças dinâmicas
   - Persiste preferências

## Exemplos de Uso

### Página com Dark Mode

```jsx
import React from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';

function ExamplePage() {
  const { isDarkMode } = useDarkMode();
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-card border-b border-border">
        <h1 className="text-foreground">Título da Página</h1>
      </header>
      
      <main className="p-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <h2 className="text-foreground mb-2">Seção</h2>
          <p className="text-muted-foreground">
            Conteúdo da seção
          </p>
        </div>
      </main>
    </div>
  );
}
```

### Componente com Toggle

```jsx
import React from 'react';
import { DarkModeToggle } from '../components/atoms/DarkModeToggle';

function Header() {
  return (
    <header className="bg-background border-b border-border p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-foreground">Truco Play</h1>
        <DarkModeToggle />
      </div>
    </header>
  );
}
```

## Boas Práticas

1. **Use as variáveis CSS**: Sempre use `bg-background`, `text-foreground`, etc.
2. **Evite cores hardcoded**: Não use `bg-white` ou `text-black`
3. **Teste ambos os temas**: Sempre teste em modo claro e escuro
4. **Considere contraste**: Certifique-se de que o texto seja legível
5. **Use transições**: Adicione `transition-colors` para mudanças suaves

## Troubleshooting

### Flash de Conteúdo
- Verifique se o `theme-init.js` está sendo carregado antes do React
- Certifique-se de que o script está no `<head>` do HTML

### Tema Não Muda
- Verifique se o `DarkModeProvider` está envolvendo a aplicação
- Confirme se o `useDarkMode` está sendo usado dentro do provider

### Cores Não Aplicadas
- Use as classes CSS corretas (`bg-background` em vez de `bg-white`)
- Verifique se as variáveis CSS estão definidas no `App.css`

## Contribuindo

Ao adicionar novos componentes:

1. Use as variáveis CSS do tema
2. Teste em ambos os modos
3. Adicione transições quando apropriado
4. Documente qualquer comportamento específico do tema 