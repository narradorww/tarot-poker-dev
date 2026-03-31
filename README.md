# 🃏 Tarot Dev Poker

Um **Planning Poker místico e ousado** com tema Tarot para equipes de desenvolvimento. Sem limite de participantes, interface otimizada para mobile, e toda a magia de uma sessão de estimativa agile.

![Tech Stack](https://img.shields.io/badge/Stack-MERN-purple?style=flat-square)
![Node](https://img.shields.io/badge/Node-v18+-green?style=flat-square)
![React](https://img.shields.io/badge/React-18+-blue?style=flat-square)
![Socket.io](https://img.shields.io/badge/Socket.io-4.6+-orange?style=flat-square)

## ✨ Features

- 🃏 **Cards Tarot Tradicionais** - Números Fibonacci (0, 1, 2, 3, 5, 8, 13) com nomes de Arcanos
- 👥 **Sem limite de participantes** - Scales infinito (diferente do benchmark)
- 📱 **Mobile-first** - Otimizado para votação em smartphones
- ⚡ **Real-time WebSocket** - Sincronização instantânea entre participantes
- ⏱️ **Timer de votação** - Controle de tempo para cada tarefa
- 👁️ **Show/Hide votos** - Revelar votos simultaneamente
- 📚 **Histórico de votações** - Acompanhe todas as estimativas da sessão
- 🎨 **Design épico** - Gradientes, animações e visual mystical

## 🚀 Quick Start

### Pré-requisitos
- Node.js v18+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/rodrigoalexandre/tarot-dev-poker.git
cd tarot-dev-poker

# Instale as dependências
npm install

# Ou se estiver usando yarn
yarn install
```

### Desenvolvimento

```bash
# Inicia server (porta 3001) e client (porta 5173) em paralelo
npm run dev

# Ou abra dois terminais:

# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

Acesse: **http://localhost:5173**

### Build para Produção

```bash
npm run build
```

Frontend estará em `client/dist/`

## 📦 Estrutura do Projeto

```
tarot-dev-poker/
├── server/                   # Backend Node.js + Socket.io
│   ├── server.js            # Servidor principal
│   ├── socket-handlers.js   # Lógica WebSocket
│   └── package.json
│
├── client/                   # Frontend React + Vite
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   │   ├── RoomJoin.jsx
│   │   │   ├── PokerTable.jsx
│   │   │   ├── TarotCard.jsx
│   │   │   ├── Timer.jsx
│   │   │   ├── ParticipantsList.jsx
│   │   │   └── HistoryPanel.jsx
│   │   ├── utils/
│   │   │   ├── socket.js
│   │   │   └── constants.js
│   │   ├── styles/
│   │   │   ├── App.css
│   │   │   └── Mobile.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json
│
├── package.json             # Root com workspaces
└── .gitignore
```

## 🎮 Como Usar

### Criar uma Sala

1. Abra o app
2. Digite seu nome
3. Clique em "✨ Criar Sala Mística"
4. Compartilhe o link gerado com sua equipe

### Entrar numa Sala

1. Clique em "🔮 Entrar na Sala"
2. Digite seu nome e o ID da sala
3. Comece a votar!

### Votação

1. **Adicione tarefa** no painel "Nova Tarefa"
2. **Vote** clicando nos cards (0-13 pontos)
3. **Inicie timer** se quiser controlar o tempo (opcional)
4. **Revele votos** quando todos votarem
5. **Confirme estimativa** e passe para a próxima tarefa

## 🔧 API WebSocket

### Client → Server

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `join-room` | `{ roomId, userName }` | Entra numa sala |
| `add-task` | `{ roomId, task }` | Adiciona nova tarefa |
| `submit-vote` | `{ roomId, vote }` | Submete um voto |
| `reveal-votes` | `{ roomId }` | Revela todos os votos |
| `estimate-task` | `{ roomId, estimatedValue }` | Confirma estimativa |
| `start-timer` | `{ roomId, duration }` | Inicia timer |
| `skip-task` | `{ roomId }` | Pula tarefa atual |
| `get-history` | `{ roomId }` | Solicita histórico |

### Server → Client

| Evento | Payload | Descrição |
|--------|---------|-----------|
| `participants-updated` | `{ participants, count }` | Lista atualizada |
| `task-added` | `{ task, participants }` | Nova tarefa |
| `vote-submitted` | `{ voteCount, totalParticipants }` | Voto recebido |
| `votes-revealed` | `{ votes, consensus }` | Votos revelados |
| `room-state` | `{ tasks, currentTask, history, participants }` | Estado da sala |
| `timer-started` | `{ duration }` | Timer iniciado |
| `timer-ended` | | Timer finalizado |
| `task-skipped` | | Tarefa pulada |
| `history-data` | `{ history }` | Histórico completo |

## 🎨 Customização

### Mudar paleta de cores

Edite as cores em `client/src/styles/App.css`:

```css
/* Purple/Cyan theme padrão */
--primary: #9d4edd;
--primary-light: #c77dff;
--accent: #00d9ff;
```

### Adicionar mais valores Fibonacci

Em `client/src/utils/constants.js`:

```javascript
export const TAROT_VALUES = [0, 1, 2, 3, 5, 8, 13, 21, 34];

export const TAROT_DESCRIPTIONS = {
  // ... adicione novos números com seus arcanos
};
```

## 🌐 Deploy

### Opção 1: Vercel (Frontend) + Render (Backend)

```bash
# 1) Backend primeiro (Render)
# Configure as envs no backend:
# NODE_ENV=production
# CORS_ORIGIN=https://SEU-PROJETO.vercel.app,https://SEU-DOMINIO.com
#
# 2) Frontend no Vercel (root: client/)
# VITE_SERVER_URL=https://SEU-BACKEND.onrender.com
```

### Opção 2: Docker (Ambos)

```dockerfile
# Dockerfile na raiz
FROM node:18-alpine

WORKDIR /app

COPY . .
RUN npm install
RUN npm run build

EXPOSE 3001 5173

CMD ["npm", "start"]
```

### Opção 3: Como rota do rodrigoalexandre.dev

Integre com seu site Next.js/vercel-app:

```javascript
// API Route: /api/poker
import { io } from 'socket.io/client';

export default function PokerRoute() {
  // Mount do componente React aqui
}
```

## 🛠️ Desenvolvimento

### Stack Técnico

**Backend:**
- Node.js 18+
- Express.js
- Socket.io (WebSocket real-time)
- UUID (geração de room IDs)

**Frontend:**
- React 18
- Vite (build tool)
- Socket.io Client
- CSS-in-JS (Styled JSX)

### Adicionar nova feature

1. **Backend** (se necessário): `server/socket-handlers.js`
2. **Frontend**: Novo componente ou edite existente
3. **Socket events**: Adicione em ambos os lados

## 📝 Variáveis de Ambiente

### Server (.env)

```env
NODE_ENV=development
PORT=3001
CORS_ORIGIN=http://localhost:5173
```

### Client (.env)

```env
VITE_SERVER_URL=http://localhost:3001
VITE_ROOM_ROUTE_PREFIX=/tarot-dev
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

MIT License - veja LICENSE para detalhes

## 🙏 Créditos

Desenvolvido por **Rodrigo Alexandre** | Mobile Developer MERN specializado em soluções inovadoras

Inspirado em:
- [PlanITpoker](https://planitpoker.com)
- Planning Poker tradicional
- Misticismo do Tarot 🃏

## 📞 Contato

- 🌐 [rodrigoalexandre.dev](https://rodrigoalexandre.dev)
- 💼 [LinkedIn](https://linkedin.com/in/rodrigosantos1981)
- 📧 [Email](mailto:rodrigo.anst@gmail.com)

---

**Desenvolvido com ✨ e muita magia**

Curta o projeto? Dê uma ⭐ no GitHub!
