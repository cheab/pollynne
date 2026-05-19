# 🚀 Guia de Deployment - Pollynne Leite Beauty

## Pré-requisitos

- Node.js 18+ instalado
- Git instalado
- Conta no GitHub
- Conta na Vercel (grátis)

## ✅ Checklist de Personalizações

Antes de fazer deploy, altere os seguintes itens com suas informações reais:

### 1. WhatsApp
Procure por `5511999999999` em todos os arquivos e altere para seu número:
- `components/Header.tsx`
- `components/Hero.tsx`
- `components/Gallery.tsx`
- `components/Footer.tsx`
- `.env.example`

**Formato**: +55 (código do país) + número (sem parênteses ou hífens)
Exemplo: `5511987654321`

### 2. Informações de Contato
Em `components/Footer.tsx`, atualize:
- Email: `contato@pollynne.com.br`
- Telefone: `(11) 99999-9999`
- Localização: `São Paulo, SP`
- Links de redes sociais

### 3. Redes Sociais
Atualize as URLs em `components/Footer.tsx`:
- Instagram
- Facebook

### 4. Metadados
Em `app/layout.tsx`:
- Altere `openGraph.url` para `https://pollynne.com.br`

## 📋 Passos para Deploy

### Passo 1: Preparar o Repositório

```bash
# Navegue para a pasta do projeto
cd c:\Users\joao.cheab\pollynne

# Inicie um repositório Git
git init

# Adicione todos os arquivos
git add .

# Faça commit inicial
git commit -m "Initial commit - Pollynne Beauty Website"
```

### Passo 2: Criar Repositório no GitHub

1. Acesse [github.com](https://github.com)
2. Clique em "New" para criar novo repositório
3. Nomeie como `pollynne` ou `pollynne-beauty`
4. **Não inicialize** com README (já existe)
5. Clique em "Create repository"

### Passo 3: Adicionar Repositório Remoto

```bash
# Copie e execute o comando do GitHub (será algo como):
git remote add origin https://github.com/seu-usuario/pollynne.git
git branch -M main
git push -u origin main
```

### Passo 4: Deploy na Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Sign up" (ou faça login se tiver conta)
3. Escolha "Continue with GitHub"
4. Autorize o Vercel a acessar sua conta GitHub
5. Clique em "Import Project"
6. Cole a URL do seu repositório: `https://github.com/seu-usuario/pollynne`
7. Clique em "Import"
8. Em "Configure Project":
   - **Framework**: Next.js (será detectado automaticamente)
   - **Root Directory**: ./
   - **Build Command**: `npm run build` (padrão)
   - **Output Directory**: `.next` (padrão)
9. Clique em "Deploy"

### Passo 5: Configurar Domínio Customizado

1. No painel da Vercel, vá para "Settings" → "Domains"
2. Clique em "Add Domain"
3. Digite: `pollynne.com.br`
4. Clique em "Add"
5. Vercel mostrará os nameservers para configurar

#### Configurar em seu provedor de domínio (ex: Hostinger, Locaweb, GoDaddy):

1. Acesse o painel de controle do seu provedor
2. Vá para "DNS" ou "Servidores de Nomes"
3. Atualize os nameservers para:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ns3.vercel-dns.com
   ns4.vercel-dns.com
   ```
4. Salve as alterações (pode levar até 48h para propagar)
5. Volte ao painel da Vercel e clique em "Refresh" para confirmar

## 🔧 Variáveis de Ambiente (Opcional)

Se adicionar variáveis de ambiente:

1. No painel Vercel: Settings → Environment Variables
2. Adicione as variáveis do `.env.example`:
   ```
   NEXT_PUBLIC_WHATSAPP_NUMBER = seu_numero_aqui
   NEXT_PUBLIC_EMAIL = seu_email@aqui.com
   ```
3. Redeploy o projeto

## 📸 Adicionar Fotos

Para adicionar fotos reais dos seus trabalhos:

1. Crie pasta `public/images` se não existir
2. Adicione suas imagens (PNG, JPG, WebP)
3. Importe em `components/Gallery.tsx` ou use URLs de CDN

Exemplo:
```jsx
<Image 
  src="/images/design-premium.jpg" 
  alt="Design Premium" 
  width={300} 
  height={300} 
/>
```

## 🔍 Testar Localmente

Antes de fazer push para GitHub:

```bash
# Instale as dependências (primeira vez)
npm install

# Rode o servidor de desenvolvimento
npm run dev

# Abra http://localhost:3000 no navegador
```

## ✨ Dicas de Otimização

### Adicionar Favicon
1. Coloque `favicon.ico` em `public/`
2. Next.js detectará automaticamente

### Adicionar Meta Tags
Edite `app/layout.tsx` para adicionar tags personalizadas

### Google Analytics (Opcional)
Instale `@next/third-parties`:
```bash
npm install @next/third-parties
```

## 🆘 Troubleshooting

### Domínio não conecta
- Aguarde 48h para propagação de DNS
- Verifique se os nameservers estão corretos
- Limpe o cache do navegador

### Build falha
- Execute `npm install` para garantir dependências
- Verifique se não há erros de TypeScript: `npm run build`

### Página em branco
- Abra DevTools (F12) e procure por erros no console
- Verifique a aba "Network" para requisições falhadas

## 📞 Suporte

- **Documentação Next.js**: [nextjs.org/docs](https://nextjs.org/docs)
- **Docs Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)

---

**Pronto para sucesso! 🎉**
