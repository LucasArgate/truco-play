const fs = require('fs');
const path = require('path');

console.log('🔄 Forçando atualização do favicon...');

// Verificar se o favicon.svg existe
const faviconPath = path.join(__dirname, 'public', 'favicon.svg');
if (fs.existsSync(faviconPath)) {
  console.log('✅ Favicon SVG encontrado');
  
  // Ler o conteúdo do favicon
  const faviconContent = fs.readFileSync(faviconPath, 'utf8');
  console.log('📄 Conteúdo do favicon carregado');
  
  // Verificar se contém as cartas
  if (faviconContent.includes('cardGradient') && faviconContent.includes('spadeGradient')) {
    console.log('✅ Favicon contém o design correto (cartas com gradientes)');
  } else {
    console.log('⚠️ Favicon pode não estar correto');
  }
} else {
  console.log('❌ Favicon SVG não encontrado');
}

console.log('\n📋 Instruções para atualizar o favicon:');
console.log('1. Pare o servidor (Ctrl+C)');
console.log('2. Execute: pnpm dev');
console.log('3. Abra: http://localhost:5173/clear-cache.html');
console.log('4. Clique em "Limpar Cache do Site"');
console.log('5. Clique em "Recarregar Página"');
console.log('6. Force um hard refresh (Ctrl+F5)');
console.log('7. Verifique se o novo favicon aparece');

console.log('\n🎯 Alternativa rápida:');
console.log('- Abra as ferramentas de desenvolvedor (F12)');
console.log('- Vá na aba "Application"');
console.log('- Clique em "Clear site data"');
console.log('- Recarregue a página (F5)');

console.log('\n🃏 O novo favicon deve mostrar:');
console.log('- Cartas empilhadas com gradiente roxo/rosa');
console.log('- Ás de espadas, coração e diamante');
console.log('- Design moderno e colorido'); 