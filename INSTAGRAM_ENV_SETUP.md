# 📸 Como Obter Access Token + Account ID do Instagram

## ⚡ Resumo Rápido

Você precisa de **2 informações**:
1. `NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN` = Token de acesso
2. `NEXT_PUBLIC_INSTAGRAM_BUSINESS_ACCOUNT_ID` = ID da sua conta

**Tempo estimado: 20 minutos** ⏱️

---

## 🎯 PASSO 1: Converter Conta para Business (5 minutos)

### **Se sua conta Instagram JÁ é Business, PULE PARA PASSO 2**

Se é pessoal, converta assim:

1. Abra **Instagram** (app ou web)
2. Vá para **Perfil** → **Configurações** (⚙️)
3. Procure por **"Conversão de Conta"** ou **"Account Type"**
4. Mude para **"Conta Profissional"** → **"Negócio"**
5. Confirme as etapas

✅ Sua conta agora é Business!

---

## 🎯 PASSO 2: Criar App no Facebook Developer (10 minutos)

### **2.1 - Acessar Facebook Developer**

1. Vá para [developers.facebook.com](https://developers.facebook.com)
2. Se não tiver conta Facebook, crie uma
3. Clique em **"Fazer Login"** com sua conta Facebook
4. Aceite os termos

### **2.2 - Criar um Novo App**

1. Clique em **"Meus Apps"** (canto superior direito)
2. Clique em **"+ Criar App"**
3. Preencha:
   - **Tipo de App**: `Gerenciar Negócios`
   - **Nome do App**: `Pollynne Beauty` (ou qualquer nome)
   - **Email**: seu email
   - **Finalidade**: `Integração Instagram`
4. Clique em **"Criar App"**

✅ App criado! Você verá um dashboard

### **2.3 - Adicionar Produto Instagram**

1. No dashboard, procure por **"+ Adicionar Produto"** (canto esquerdo)
2. Procure por **"Instagram Graph API"**
3. Clique em **"Configurar"** (ou "Add")
4. Escolha **"Instagram Basic Display"** (para exibir fotos)
5. Clique em **"Próximo"**

✅ Instagram Graph API adicionado!

---

## 🎯 PASSO 3: Obter Access Token + Account ID (5 minutos)

### **Método MAIS FÁCIL: Graph API Explorer**

#### **3.1 - Acessar o Graph API Explorer**

1. Vá para: [graph.instagram.com](https://developers.facebook.com/tools/explorer)
2. Você verá uma página com 2 caixas grandes

#### **3.2 - Selecionar seu App**

1. No **topo à esquerda**, ao lado de "Graph API Explorer", clique no dropdown
2. Selecione o **App que criou** ("Pollynne Beauty")

#### **3.3 - Obter seu Account ID**

1. Na caixa grande do meio (query), apague tudo
2. Digite exatamente isto:
   ```
   me?fields=id,username
   ```
3. Clique em **"Enviar Solicitação"** (ou "Send")
4. Na coluna direita, você verá um JSON como:
   ```json
   {
     "id": "17841408207834267",
     "username": "pollynne_beauty"
   }
   ```
5. **Copie o número do `id`** (exemplo: `17841408207834267`)
6. **Guarde em um lugar seguro!** Este é seu `BUSINESS_ACCOUNT_ID`

✅ Account ID obtido!

#### **3.4 - Gerar seu Access Token**

1. Acima da caixa de query, procure por **"Gerar Token de Acesso"** ou **"Generate Access Token"**
2. Clique nele
3. Uma popup aparecerá com permissões
4. **Certifique-se que está marcado:**
   - ✅ `instagram_basic`
   - ✅ `instagram_graph_user_media`
5. Se não estiver, clique em **"Adicionar"** ou **"Select Permissions"**
6. Clique em **"Gerar Token"**

7. Um **longo texto** aparecerá acima da caixa de query (começa com `IGSH...` ou `IGQ...`)
8. **Copie TUDO aquele texto**
9. **Guarde com segurança!** Este é seu `ACCESS_TOKEN`

✅ Access Token obtido!

---

## 📝 PASSO 4: Criar arquivo `.env.local` (2 minutos)

### **4.1 - Abrir VS Code**

1. Você tem o projeto aberto em VS Code?
2. Se não:
   ```bash
   code c:\Users\joao.cheab\pollynne
   ```

### **4.2 - Criar novo arquivo**

1. Na barra lateral, clique em **VS Code** → **File** → **New File**
2. Nomeie como: `.env.local` (ponto na frente!)
3. Digite o conteúdo abaixo:

```env
NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN=COLE_SEU_TOKEN_AQUI
NEXT_PUBLIC_INSTAGRAM_BUSINESS_ACCOUNT_ID=COLE_SEU_ACCOUNT_ID_AQUI
NEXT_PUBLIC_WHATSAPP_NUMBER=553195136154
```

**Substitua:**
- `COLE_SEU_TOKEN_AQUI` → Cole o access token que copiou
- `COLE_SEU_ACCOUNT_ID_AQUI` → Cole o account ID (número) que copiou

**Exemplo real:**
```env
NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN=IGQVJXbDYzVDhiVEVGWW0zNmRzTXBxaWpLU1pmZAlaVzBqMzg1NXFKRU1fa1J3aTdCM21fVzNUUkRCdTBFWUktRjlWRFJYQzBGcEZArcjkwSzZAzdFhraTVfRl9MdWZAUcWJrSTBVLU0x
NEXT_PUBLIC_INSTAGRAM_BUSINESS_ACCOUNT_ID=17841408207834267
NEXT_PUBLIC_WHATSAPP_NUMBER=553195136154
```

4. **Salve o arquivo** (Ctrl+S)

✅ Arquivo `.env.local` criado!

---

## 🧪 PASSO 5: Testar se Funcionou (3 minutos)

### **5.1 - Parar o servidor**

1. No terminal VS Code, procure a aba que está rodando `npm run dev`
2. Pressione **Ctrl+C** para parar

### **5.2 - Reiniciar o servidor**

```bash
npm run dev
```

### **5.3 - Testar no navegador**

1. Abra http://localhost:3000
2. **Role até o final** (antes do footer cinzento)
3. Procure pela seção **"Acompanhe no Instagram"**
4. **Devem aparecer suas últimas 6 fotos do Instagram!** 📸

✅ **Funcionou!** 🎉

Se aparecer um erro tipo **"Instagram não configurado"**, verifique:
- Se `.env.local` foi criado na **raiz do projeto** (mesmo nível que `package.json`)
- Se não há espaços extras antes/depois dos valores
- Se copiou os valores completos (token é bem longo)

---

## ⚠️ IMPORTANTE: Diferença entre Token Local vs Vercel

### **Local (seu computador)**
- Token que você gerou agora funciona
- Válido por **~2 horas**
- Use para testes

### **Vercel (seu site online)**
- Precisa de um token de **longa duração**
- Gerado especialmente para Vercel
- Durabilidade: **60 dias** ou mais

**Quando for fazer deploy na Vercel:**
1. Regenere um token novo (mesmo processo)
2. Cole em **Vercel Dashboard** → **Settings** → **Environment Variables**

---

## 🔍 Checklist Final

- [ ] Conta Instagram convertida para Business
- [ ] App criado no Facebook Developer
- [ ] Instagram Graph API adicionado ao App
- [ ] Access Token gerado e copiado
- [ ] Account ID obtido e copiado
- [ ] Arquivo `.env.local` criado com os valores
- [ ] Servidor reiniciado (`npm run dev`)
- [ ] Fotos aparecem em http://localhost:3000

---

## ❓ Dúvidas Frequentes

### **P: Onde fico colar o token?**
R: No arquivo `.env.local` que você cria na raiz do projeto

### **P: Token muito longo, tenho certeza que é todo?**
R: SIM! Token de Instagram é bem longo mesmo (100+ caracteres). Copie TUDO

### **P: Posso usar a conta pessoal do Instagram?**
R: NÃO, tem que ser Business. Converta em Configurações → Conversão de Conta

### **P: Preciso gerar novo token toda vez?**
R: NÃO. O token dura ~2 horas localmente. Para Vercel, dura 60 dias

### **P: Fotos não aparecem após configurar**
R: Reinicie o servidor com `npm run dev` ou Ctrl+C e `npm run dev` de novo

### **P: Token expirou?**
R: Gere outro na mesma página (Graph API Explorer)

---

## 📞 Resumo do que fazer AGORA

1. ✅ Ir para [developers.facebook.com](https://developers.facebook.com)
2. ✅ Criar App → Adicionar Instagram Graph API
3. ✅ Graph API Explorer → Copiar Account ID e Access Token
4. ✅ Criar `.env.local` com os valores
5. ✅ Reiniciar servidor: `npm run dev`
6. ✅ Testar em http://localhost:3000

**Vai dar certo!** 💪

---

## 🎯 Links Rápidos

- [Facebook Developers](https://developers.facebook.com)
- [Graph API Explorer](https://developers.facebook.com/tools/explorer)
- [Instagram Graph API Docs](https://developers.facebook.com/docs/instagram-graph-api)

Qualquer dúvida, volte aqui! 📖
