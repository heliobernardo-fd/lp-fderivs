// deploy-fderivs.js
// Script de Deploy dedicado para o projeto LP-FDERIVS na VERCEL

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Carrega o token a partir do arquivo tokens.txt local (que é ignorado pelo git)
let token = process.env.VERCEL_TOKEN;
const tokensFile = path.join(__dirname, 'tokens.txt');
if (!token && fs.existsSync(tokensFile)) {
  const content = fs.readFileSync(tokensFile, 'utf8');
  const match = content.match(/vcp_[a-zA-Z0-9]+/);
  if (match) token = match[0];
}

const PROJECT_NAME = 'lp-fderivs';

console.log('====================================================');
console.log(`🚀 Iniciando Deploy Dedicado: [${PROJECT_NAME}] na Vercel`);
console.log('====================================================');

try {
  const command = `npx vercel --prod --name ${PROJECT_NAME} ${token ? `--token ${token}` : ''} --yes`;
  execSync(command, {
    cwd: __dirname,
    stdio: 'inherit',
    shell: true
  });
  console.log('\n====================================================');
  console.log(`✅ Deploy do projeto [${PROJECT_NAME}] concluído com sucesso!`);
  console.log('====================================================');
} catch (error) {
  console.error('\n❌ Erro durante o deploy na Vercel:', error.message);
  process.exit(1);
}
