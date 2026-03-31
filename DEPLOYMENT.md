# 🚀 Guia de Deploy - Tarot Dev Poker

Instruções para hospedar o Tarot Dev Poker em diferentes plataformas e integrá-lo ao seu site.

## 📍 Opção 1: Como Aplicação Standalone (Recomendado para começar)

### GitHub + Render/Vercel

#### Frontend no Vercel

```bash
cd client

# Instale o CLI do Vercel
npm i -g vercel

# Deploy
vercel

# Siga os prompts e escolha:
# - Project name: tarot-dev-poker
# - Framework: Vite
```

No painel da Vercel, configure:

```env
VITE_SERVER_URL=https://tarot-dev-poker-api.onrender.com
```

Seu frontend estará em: `https://tarot-dev-poker.vercel.app`

#### Backend no Render

1. Acesse [render.com](https://render.com)
2. Clique em "New" → "Web Service" → "Build and deploy from a Git repository"
3. Conecte seu repositório
4. Configure as variáveis de ambiente:
   ```
   NODE_ENV=production
   CORS_ORIGIN=https://tarot-dev-poker.vercel.app,https://rodrigoalexandre.dev
   ```
5. Deploy automático a cada push para `main`

Backend estará em: `https://tarot-dev-poker-api.onrender.com`

#### Atualize o Frontend

Em `client/src/utils/constants.js`:

```javascript
export const getServerUrl = () => {
  const configuredServerUrl = import.meta.env.VITE_SERVER_URL;
  if (configuredServerUrl) {
    return configuredServerUrl;
  }
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return 'http://localhost:3001';
  }
  return window.location.origin;
};
```

---

## 🌐 Opção 2: Como Rota do seu Site (rodrigoalexandre.dev)

### Para Next.js (Recomendado)

1. **Instale as dependências:**

```bash
npm install socket.io-client
npm install --save-dev @types/react @types/react-dom
```

2. **Crie a página em `pages/poker.jsx`:**

```jsx
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

// Importar componentes dinamicamente para evitar problemas SSR
const PokerApp = dynamic(() => import('@/components/PokerApp'), { ssr: false });

export default function PokerPage() {
  return (
    <div>
      <PokerApp serverUrl="https://tarot-dev-poker-api.onrender.com" />
    </div>
  );
}
```

3. **Copie os componentes React:**

```bash
cp -r client/src/components pages/components/poker/
cp -r client/src/utils pages/utils/poker/
cp -r client/src/styles pages/styles/poker/
```

4. **Crie `components/PokerApp.jsx`:**

```jsx
import App from '../poker/App';
import '../poker/styles/App.css';
import '../poker/styles/Mobile.css';

export default function PokerApp({ serverUrl }) {
  return <App serverUrl={serverUrl} />;
}
```

5. **Atualize `client/src/utils/constants.js`:**

```javascript
export const getServerUrl = () => {
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return 'http://localhost:3001';
  }
  // Use variável de ambiente
  return process.env.NEXT_PUBLIC_POKER_API || 'https://tarot-dev-poker-api.onrender.com';
};
```

6. **Adicione ao `.env.local`:**

```env
NEXT_PUBLIC_POKER_API=https://tarot-dev-poker-api.onrender.com
```

7. **Deploy no Vercel:**

```bash
git push origin main  # Vercel faz deploy automático
```

Seu poker estará em: `https://rodrigoalexandre.dev/poker`

---

### Para React (Vite) - Single Page App

1. **No seu site, crie uma subrota `/poker`:**

```javascript
// Usando React Router
<Route path="/poker" element={<PokerApp />} />
```

2. **Ou hospede como subdomínio:**

```bash
# Em package.json
"homepage": "https://poker.rodrigoalexandre.dev"
```

---

## 🐳 Opção 3: Docker + Cloud Run / Heroku

### Build Docker

```dockerfile
# Dockerfile na raiz do projeto
FROM node:18-alpine

WORKDIR /app

# Instale dependências
COPY package*.json ./
RUN npm install

# Build do frontend
COPY client ./client
WORKDIR /app/client
RUN npm run build

# Setup do backend
WORKDIR /app
COPY server ./server

# Expose
EXPOSE 3001

# Start server (que serve frontend estático também)
CMD ["node", "server/server.js"]
```

**Modifique `server/server.js` para servir frontend:**

```javascript
import express from 'express';
import path from 'path';

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});
```

### Deploy no Google Cloud Run

```bash
gcloud builds submit --tag gcr.io/PROJECT_ID/tarot-poker
gcloud run deploy tarot-poker --image gcr.io/PROJECT_ID/tarot-poker --platform managed --region us-central1
```

### Deploy no Heroku

```bash
heroku create tarot-poker
heroku config:set NODE_ENV=production CORS_ORIGIN=https://tarot-poker.herokuapp.com
git push heroku main
```

---

## 📊 Opção 4: Serverless (Backend) + Static (Frontend)

### Frontend: Vercel / Netlify

```bash
cd client
npm run build
# Deploy a pasta `dist` para Vercel ou Netlify
```

### Backend: AWS Lambda + API Gateway

1. Instale Serverless Framework
2. Configure seu `serverless.yml`
3. Deploy com `serverless deploy`

⚠️ **Nota:** Socket.io em Lambda é mais complexo. Use WebSockets AWS API Gateway.

---

## ✅ Checklist de Deploy

- [ ] Backend rodando e acessível
- [ ] CORS configurado corretamente
- [ ] Variáveis de ambiente definidas
- [ ] Frontend aponta para backend correto
- [ ] Testar em mobile
- [ ] Certificado SSL/HTTPS ativo
- [ ] Domain configurado
- [ ] Backup automático (opcional)

---

## 🔗 URLs Úteis

| Ambiente | URL | Status |
|----------|-----|--------|
| Local Dev | http://localhost:5173 | ✅ |
| Vercel Frontend | https://tarot-dev-poker.vercel.app | Configurar |
| Render Backend | https://tarot-dev-poker-api.onrender.com | Configurar |
| Seu site | https://rodrigoalexandre.dev/poker | Configurar |

---

## 🆘 Troubleshooting

### CORS Error

Se receber erro de CORS:

```javascript
// server/server.js
io.on('connection', socket => {
  console.log('Client origin:', socket.handshake.headers.origin);
});
```

Verifique `CORS_ORIGIN` no seu `.env`

### WebSocket não conecta

- Verifique se a porta 3001 (ou sua porta) está aberta
- Confirme WSS (WebSocket Secure) em produção
- Revise logs: dashboard do Render ou `vercel logs`

### Build falha

```bash
# Limpe cache
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 📞 Suporte

Qualquer dúvida, abra uma issue no GitHub!
