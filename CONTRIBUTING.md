# 🤝 Contribuindo para Tarot Dev Poker

Adoramos contribuições! Aqui está como você pode ajudar.

## 🚀 Como Começar

1. **Fork** o repositório
2. **Clone** seu fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/tarot-dev-poker.git
   ```
3. **Crie uma branch** para sua feature:
   ```bash
   git checkout -b feature/seu-feature-incrivel
   ```
4. **Faça suas mudanças**
5. **Commit** com mensagens descritivas:
   ```bash
   git commit -m "feat: adiciona novo card Tarot"
   ```
6. **Push** para sua fork:
   ```bash
   git push origin feature/seu-feature-incrivel
   ```
7. **Abra um Pull Request**

---

## 📋 Tipos de Contribuições

### 🐛 Bug Reports

Encontrou um bug? Abra uma issue com:

```markdown
## Descrição
Descreva o bug brevemente

## Como reproduzir
1. Faça isso...
2. Depois aquilo...
3. Veja o erro

## Comportamento esperado
O que deveria acontecer

## Screenshots
Se aplicável

## Ambiente
- OS: Windows/Mac/Linux
- Browser: Chrome/Firefox/Safari
- Node version: v18.x.x
```

### ✨ Feature Requests

Tem uma ideia legal?

```markdown
## Descrição
Explique a feature brevemente

## Por quê
Por que essa feature seria útil?

## Como você vê isso?
Descreva a implementação ideal

## Alternativas
Outras abordagens?
```

### 📝 Melhorias na Documentação

- Fixes em typos
- Exemplos mais claros
- Tradução para outros idiomas
- Melhor organização

---

## 💻 Guia de Desenvolvimento

### Setup Dev

```bash
npm install
npm run dev
```

### Estrutura de Commits

```
feat:     Nova feature
fix:      Bug fix
docs:     Documentação
style:    Formatação
refactor: Refatoração
test:     Testes
chore:    Dependências/config
```

**Exemplo:**
```bash
git commit -m "feat: adiciona feature show/hide votos

- Implementa botão para revelar/ocultar nomes
- Adiciona animação suave
- Testa em mobile"
```

### Code Style

- Use ESLint/Prettier (quando implementado)
- Nomes em inglês para código
- Comentários em português (opcional)
- Indentação: 2 espaços

### Testes

Quando aplicável, inclua testes:

```javascript
// exemplo.test.js
describe('TarotCard', () => {
  it('deve mostrar o número correto', () => {
    // seu teste
  });
});
```

---

## 🎨 Áreas de Contribuição

### Frontend
- [ ] Novos temas de cores
- [ ] Animações extras
- [ ] Responsividade melhorada
- [ ] Acessibilidade (a11y)
- [ ] Novos componentes

### Backend
- [ ] Persistência em DB
- [ ] Autenticação de usuários
- [ ] Rate limiting
- [ ] Metrics/Analytics
- [ ] Validação melhorada

### Documentação
- [ ] Exemplos de uso
- [ ] Vídeos tutoriais
- [ ] Tradução pt-BR
- [ ] API docs
- [ ] Deploy guides

### Comunidade
- [ ] Relatar bugs
- [ ] Sugerir features
- [ ] Ajudar novatos
- [ ] Compartilhar feedback

---

## 🚫 O que NÃO fazer

- ❌ Não faça commits diretos em `main`
- ❌ Não modifique versão/package.json sem aviso
- ❌ Não remova features existentes sem discussão
- ❌ Não use dependências não necessárias
- ❌ Não ignore ESLint warnings

---

## 🔍 Processo de Review

1. **Automated checks** rodam automaticamente
2. **Code review** por um maintainer
3. **Feedback** em comentários do PR
4. **Iteração** conforme necessário
5. **Merge** após aprovação ✅

### Checklist do PR

- [ ] Descrição clara
- [ ] Issue referenciada (se houver)
- [ ] Tests incluídos (se aplicável)
- [ ] Documentação atualizada
- [ ] Sem breaking changes
- [ ] Commits organizados

---

## 🎯 Roadmap

Veja issues com label `good first issue` para começar!

**Próximas features:**
- [ ] Persistência em MongoDB
- [ ] Autenticação com JWT
- [ ] Temas customizáveis
- [ ] Export de relatórios
- [ ] Mobile app (React Native)
- [ ] Integração com Jira

---

## ❓ Dúvidas?

- 📚 Veja [README.md](README.md)
- 📖 Leia [QUICKSTART.md](QUICKSTART.md)
- 💬 Abra uma discussion
- 📧 Contate o autor

---

## 🏆 Reconhecimento

Todo contribuidor será adicionado em nosso:
- ⭐ README.md (seção Contributors)
- 🎖️ GitHub Contributors graph
- 📢 Announcements

---

**Obrigado por contribuir! 🙌**

Desenvolvido com ❤️ pela comunidade de devs
