const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔄 Reiniciando servidor de desenvolvimento...');

// Parar o processo atual se estiver rodando
exec('taskkill /f /im node.exe', (error) => {
  if (error) {
    console.log('Nenhum processo Node.js encontrado para parar');
  } else {
    console.log('Processos Node.js parados');
  }
  
  // Aguardar um pouco e reiniciar
  setTimeout(() => {
    console.log('🚀 Iniciando servidor de desenvolvimento...');
    exec('pnpm dev', (error, stdout, stderr) => {
      if (error) {
        console.error('Erro ao iniciar servidor:', error);
        return;
      }
      console.log('Servidor iniciado com sucesso!');
      console.log(stdout);
    });
  }, 2000);
});

console.log('📋 Instruções para atualizar o favicon:');
console.log('1. Aguarde o servidor reiniciar');
console.log('2. Abra http://localhost:5173/clear-cache.html');
console.log('3. Clique em "Limpar Cache do Site"');
console.log('4. Clique em "Recarregar Página"');
console.log('5. Verifique se o novo favicon aparece'); 