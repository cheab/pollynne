# 🚀 Quick Start - Comece em 5 minutos!

## 1️⃣ Instale as dependências

```bash
cd c:\Users\joao.cheab\pollynne
npm install
```

## 2️⃣ Execute o servidor local

```bash
npm run dev
```

Abra no navegador: **http://localhost:3000**

## 3️⃣ Faça suas customizações

### Alterar número de WhatsApp
Procure por `5511999999999` e substitua por seu número em:
- `components/Header.tsx`
- `components/Hero.tsx`
- `components/Gallery.tsx`
- `components/Footer.tsx`

### Alterar email e informações
Edite em `components/Footer.tsx`:
```tsx
<p>📍 São Paulo, SP</p>        // Sua localização
<p>📞 (11) 99999-9999</p>      // Seu telefone
<p>✉️ contato@pollynne.com.br</p>  // Seu email
```

### Editar serviços
Abra `components/Services.tsx` e customize a lista de serviços:
```typescript
const services = [
  {
    icon: '👁️',
    name: 'Seu Serviço',
    description: 'Descrição do seu serviço',
    price: 'R$ XXX,XX',
  },
  // ... adicione mais
]
```

## 4️⃣ Faça commit e push

```bash
git add .
git commit -m "Customizações iniciais"
git push origin main
```

## 5️⃣ Deploy na Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Import Project"
3. Conecte seu repositório GitHub
4. Configure o domínio: `pollynne.com.br`
5. Pronto! Seu site está online 🎉

---

## 📋 Próximos Passos

- [ ] Adicionar fotos reais dos trabalhos em `public/images/`
- [ ] Customizar todas as cores em `tailwind.config.js`
- [ ] Adicionar links das redes sociais em `components/Footer.tsx`
- [ ] Testar em dispositivos móveis (muito importante!)
- [ ] Configurar domínio personalizado
- [ ] Configurar Google Analytics (opcional)

## 🎨 Preview das Seções

### ✨ Hero (Inicial)
- Título atrativo
- Descrição do negócio
- 2 botões de ação

### 🛍️ Serviços
- Cards com emojis
- Nome, descrição, preço
- Combos especiais destacados

### 📸 Galeria
- Cards coloridos dos trabalhos
- Ícones representativos
- CTA para agendar

### 📞 Footer
- Informações de contato
- Links de redes sociais
- Links rápidos

---

## ❓ Precisa de ajuda?

- **Erro de build**: Verifique se `npm install` funcionou
- **Porta 3000 ocupada**: Altere com `npm run dev -- -p 3001`
- **Arquivos não aparecem**: Limpe o cache com `rm -r .next`

---

**Boa sorte com seu site! 💪✨**
