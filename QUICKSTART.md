# ⚡ Quick Start - 5 minutos

## 1️⃣ Setup Inicial

```bash
# Clone
git clone https://github.com/rodrigoalexandre/tarot-dev-poker.git
cd tarot-dev-poker

# Instale
npm install

# Desenvolva
npm run dev
```

✅ **Pronto!** Acesse: http://localhost:5173

---

## 2️⃣ Teste Localmente

### Abra em 2 abas do navegador:

**Aba 1 - Facilitador:**
- Nome: `Scrum Master`
- Clique: `✨ Criar Sala Mística`
- Copie o ID da sala

**Aba 2 - Dev 1:**
- Nome: `Dev Frontend`
- Cole o ID na seção "🔮 Entrar na Sala"
- Clique: `Entrar na Sala`

**Aba 3+ - Mais Devs:**
- Repita com nomes diferentes

---

## 3️⃣ Faça uma Votação

1. **Facilitador:** Digite a tarefa em "Nova Tarefa"
   ```
   "Implementar login com OAuth"
   ```

2. **Todos:** Cliquem nos cards (0-13 pontos)
   - 0 = Não pronto
   - 5 = Médio
   - 13 = Muito difícil

3. **Facilitador:** Clique "👁️ Revelar Votos"

4. **Facilitador:** Clique "✅ Confirmar Estimativa"

5. **Repetar** com próxima tarefa! 🎉

---

## 4️⃣ Features Essenciais

| Feature | Como usar |
|---------|-----------|
| 👥 Ver participantes | Painel direito auto-atualiza |
| ⏱️ Timer | Clique "Iniciar Timer (60s)" |
| 📚 Histórico | Clique "📚 Histórico" top-right |
| 🚪 Sair | Clique "🚪 Sair" |

---

## 5️⃣ Deploy em 2 minutos

### Vercel (Frontend)

```bash
npm i -g vercel
cd client
# defina VITE_SERVER_URL no projeto da Vercel apontando para seu backend
vercel
```

Escolha as opções padrão. ✅ **Done!**

### Railway (Backend)

1. Acesse [railway.app](https://railway.app)
2. "New Project" → "Deploy from GitHub"
3. Selecione seu repo
4. Configure envs:
   - `NODE_ENV=production`
   - `PORT=3001`
   - `CORS_ORIGIN=https://SEU-PROJETO.vercel.app`
5. Deploy automático! 🚀

---

## 🎯 Próximos Passos

- [ ] Invite seu time
- [ ] Customize cores em `client/src/styles/App.css`
- [ ] Adicione mais Arcanos em `constants.js`
- [ ] Deploy em produção
- [ ] Compartilhe link: `https://tarot-dev-poker.vercel.app`

---

## 💡 Tips

```javascript
// URL com room ID pré-carregado (future feature)
https://poker.seu-site.com?room=UUID

// Share link com seu time
https://tarot-dev-poker.vercel.app?room=xxx-yyy-zzz
```

---

## 🆘 Problemas?

| Problema | Solução |
|----------|---------|
| Porta 3001 em uso | `npm run dev -- --port 3002` |
| WebSocket não conecta | Verify CORS no `server/.env` |
| Build falha | `rm -rf node_modules && npm install` |

---

## 📱 Teste em Mobile

```bash
# No seu computador, descubra seu IP:
ipconfig getifaddr en0  # macOS
hostname -I             # Linux

# No celular, acesse:
http://YOUR_IP:5173
```

---

**Desenvolvido com ✨ | Pronto para o seu próximo sprint! 🚀**
