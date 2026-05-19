# 📸 Configurar Feed do Instagram - Guia Completo

## 🎯 Visão Geral

Seu site agora tem um **feed de Instagram automático** que puxa as últimas 6 fotos direto do seu perfil Instagram Business. As imagens aparecem antes do footer, criando uma seção impactante "Acompanhe no Instagram".

---

## ✅ Pré-requisitos

1. **Conta Instagram Professional/Business** (não pode ser pessoal)
2. **Conta Facebook** vinculada à conta Instagram
3. **App Facebook Developer** criado
4. **Access Token** gerado

**Você já tem conta Business no Instagram?** Se não, converta agora em Configurações → Conversão de Conta.

---

## 🔧 Passo a Passo: Configuração da Graph API

### **Passo 1: Criar um App no Facebook Developer**

1. Acesse [developers.facebook.com](https://developers.facebook.com)
2. Clique em "Meus Apps" → "Criar App"
3. Escolha **"Gerenciar Negócios"** como tipo
4. Preencha:
   - **Nome do App**: `Pollynne Beauty Website`
   - **Email de contato**: seu email
   - **Finalidade**: "Integração Instagram"
5. Clique em "Criar App"

### **Passo 2: Adicionar Produto Instagram**

1. No painel do app, clique em **"+ Adicionar Produto"**
2. Procure por **"Instagram Graph API"**
3. Clique em **"Configurar"**
4. Escolha **"Instagram Basic Display"** (para exibir fotos)

### **Passo 3: Conectar Conta Instagram**

1. Em "Configurações Básicas", vá para **"Roles"** ou **"Funções de Teste"**
2. Adicione sua conta do Facebook com:
   - Email da conta
   - Role: **Testador** ou **Desenvolvedor**
3. Confirme o convite no seu email do Facebook

### **Passo 4: Gerar Access Token**

Existem 2 formas:

#### **Opção A: Usar o Graph API Explorer** (Mais Fácil - Passo Curto)

1. Acesse [graph.instagram.com](https://developers.facebook.com/tools/explorer)
2. No topo, selecione seu **App** criado
3. Em "Usuário ou Página", selecione sua conta **Instagram Business**
4. Na caixa de busca, digite: `me?fields=id,username`
5. Clique em **"Enviar Solicitação"**
6. Você verá um JSON com seu `id` (Business Account ID)
7. Copie este ID e guarde

**Agora para o Token:**
8. Clique em **"Gerar Token de Acesso"**
9. Selecione seu app e clique em **"Gerar"**
10. Escolha permissões:
    - ✅ instagram_basic
    - ✅ instagram_graph_user_media
11. Copie o token gerado (começa com `IGSHO_...` ou similar)
12. **Guarde em um lugar seguro!**

#### **Opção B: Via Dashboard Facebook** (Mais Completo)

1. Vá para [business.facebook.com](https://business.facebook.com)
2. Configurações → Contas Instagram
3. Conecte sua conta Instagram
4. Gere Token em "Ferramentas" → "Gerenciador de Tokens"

---

## 📝 Aplicar as Credenciais no Site

### **Arquivo `.env.local`** (criar na raiz do projeto)

Crie um arquivo chamado `.env.local` (não commit no Git!) com:

```env
NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN=seu_token_aqui
NEXT_PUBLIC_INSTAGRAM_BUSINESS_ACCOUNT_ID=seu_business_account_id_aqui
```

**Exemplo:**
```env
NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN=IGQVJXbDYzVDhiVEVGWW
NEXT_PUBLIC_INSTAGRAM_BUSINESS_ACCOUNT_ID=17841408207834267
```

### **Estrutura de Pastas**

```
pollynne/
├── .env.local          ← NOVO (não commitar!)
├── .env.example        ← Modelo (já atualizado)
├── .gitignore          ← Já ignora .env.local
├── package.json
├── components/
│   ├── InstagramFeed.tsx   ← NOVO
│   └── ... outros
└── app/
```

---

## 🧪 Testar Localmente

1. **Parar servidor:**
   ```bash
   npm run dev  # Ctrl+C para parar
   ```

2. **Criar/Editar `.env.local`:**
   - Coloque as 2 variáveis acima
   - Salve o arquivo

3. **Reiniciar servidor:**
   ```bash
   npm run dev
   ```

4. **Testar:**
   - Abra http://localhost:3000
   - Role até "Acompanhe no Instagram"
   - Devem aparecer suas últimas 6 fotos do Instagram!

---

## 🚀 Deploy na Vercel com Variáveis

1. **Push seu código** (sem `.env.local`):
   ```bash
   git add .
   git commit -m "Add Instagram feed integration"
   git push origin main
   ```

2. **Vercel Dashboard:**
   - Acesse seu projeto em vercel.com
   - Vá para **Settings** → **Environment Variables**
   - Clique em **Add**
   - Adicione as 2 variáveis:
     - `NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN`
     - `NEXT_PUBLIC_INSTAGRAM_BUSINESS_ACCOUNT_ID`

3. **Redeploy:**
   - Clique em **Redeploy** ou faça novo commit
   - Aguarde o deploy finalizar
   - O feed do Instagram agora funcionará em produção!

---

## 🔒 Segurança - Access Token

⚠️ **IMPORTANTE:**

- Não compartilhe seu Access Token em público
- Não commite `.env.local` no Git (já está no `.gitignore`)
- Em `.env.local` use token pessoal (para desenvolvimento)
- Na Vercel, use token de longa duração (gerado especialmente para isso)

**Regentar Token se necessário:**
1. Facebook Developer → seu App
2. Instagram Basic Display → Configurações
3. Gerar novo token e atualizar em Vercel

---

## 📱 Como Funciona no Site

Após configurar:

1. **Seção "Acompanhe no Instagram"**
   - Aparece antes do footer
   - Grid 1 coluna (mobile) → 2 colunas (tablet) → 3 colunas (desktop)
   - Exibe últimas 6 fotos

2. **Interação**
   - Hover: foto fica mais escura + aparece ícone de coração
   - Clique: abre a foto no Instagram

3. **Botão**
   - "Seguir no Instagram" em destaque
   - Leva direto para instagram.com/pollynne_beauty

---

## ❌ Troubleshooting

### **"Instagram não configurado"**
- Verificar se `.env.local` foi criado
- Verificar sintaxe (sem espaços extras)
- Reiniciar servidor: `npm run dev`

### **"Erro ao buscar posts"**
- Access Token expirou → regerar em Facebook Developer
- Business Account ID incorreto → verificar em Graph API Explorer
- Conta não é Business → converter em Configurações do Instagram

### **Fotos não aparecem
- Token sem permissão `instagram_graph_user_media` → gerar novo
- Fotos muito antigas → postar nova no Instagram
- Verificar console do navegador (F12) para erros

### **Funciona localmente mas não na Vercel**
- Variáveis não adicionadas em Vercel → adicionar em Settings
- Token diferente entre local e Vercel → usar mesmo token em Vercel
- Redeploy necessário após adicionar variáveis

---

## 📚 Referências

- [Instagram Graph API Docs](https://developers.facebook.com/docs/instagram-graph-api)
- [Basic Display API](https://developers.facebook.com/docs/instagram-basic-display-api)
- [Facebook Developer Portal](https://developers.facebook.com)

---

## ✨ Resultado

Seu site agora exibe automaticamente:
- ✅ Últimas 6 fotos do Instagram
- ✅ Atualiza quando você posta novo conteúdo
- ✅ Links diretos para cada foto no Instagram
- ✅ Design responsivo e elegante
- ✅ CTA "Seguir no Instagram"

**Tudo 100% automático!** 🎉

---

**Dúvidas?** Verifique os links das referências ou contacte suporte do Facebook Developer.
