# 🎨 Guia de Customização - Pollynne Beauty

## Estrutura do Projeto

```
pollynne/
├── app/
│   ├── layout.tsx          # Layout principal com HTML/metadados
│   ├── page.tsx            # Página inicial que monta tudo
│   └── globals.css         # Estilos globais e componentes CSS
├── components/
│   ├── Header.tsx          # Cabeçalho com navegação
│   ├── Hero.tsx            # Seção inicial com call-to-action
│   ├── Services.tsx        # Catálogo de serviços
│   ├── ServiceCard.tsx     # Card individual de serviço
│   ├── Gallery.tsx         # Galeria visual de trabalhos
│   └── Footer.tsx          # Rodapé com contato
├── public/                 # Imagens e assets estáticos
├── package.json
├── tailwind.config.js      # Configuração de cores/fonts
└── next.config.js
```

## 🎯 Como Editar Cada Seção

### 1. Alterar Cores

**Arquivo**: `tailwind.config.js`

```javascript
colors: {
  'beige': '#D4C5B9',        // Cor principal
  'beige-light': '#E8E0DA',  // Cor clara
  'dark': '#1A1A1A',         // Texto escuro
  'gray': '#6B6B6B',         // Texto cinza
}
```

### 2. Editar Serviços

**Arquivo**: `components/Services.tsx`

```javascript
const services = [
  {
    icon: '👁️',              // Emoji do ícone
    name: 'Design Premium',  // Nome do serviço
    description: '...',      // Descrição
    price: 'R$ 30,00',       // Preço
    duration?: '30 dias',    // Duração (opcional)
  },
  // ... mais serviços
]
```

**Para adicionar novo serviço:**
1. Abra `components/Services.tsx`
2. Adicione um novo objeto no array `services`
3. Salve e o serviço aparecerá automaticamente

### 3. Editar Contato

**Arquivo**: `components/Footer.tsx`

Procure por:
- `5511999999999` → Seu número de WhatsApp
- `contato@pollynne.com.br` → Seu email
- `São Paulo, SP` → Sua localização
- URLs de redes sociais

### 4. Adicionar Imagens

1. Crie pasta `public/images` se não existir
2. Coloque suas imagens PNG/JPG lá
3. Use em componentes:

```jsx
<img 
  src="/images/nome-da-imagem.jpg" 
  alt="Descrição"
  className="w-full h-auto"
/>
```

### 5. Customizar Fontes

**Arquivo**: `tailwind.config.js`

```javascript
fontFamily: {
  'display': ['Poppins', 'sans-serif'],  // Títulos
  'body': ['Inter', 'sans-serif'],       // Corpo de texto
}
```

Para adicionar nova font:
1. Vá para [fonts.google.com](https://fonts.google.com)
2. Selecione a fonte desejada
3. Copie o código de importação
4. Cole em `app/layout.tsx` na tag `<head>`

### 6. Editar Hero Section

**Arquivo**: `components/Hero.tsx`

- **Título**: Procure por `<h1>`
- **Subtítulo**: Procure por `<p>`
- **Botões**: Procure por `<a>`
- **Imagem**: Customize o `<div>` com `bg-gradient-to-br`

### 7. Adicionar/Editar Combos

**Arquivo**: `components/Services.tsx` (seção "Combos")

```jsx
<div className="bg-white rounded-xl p-6">
  <h4>Seu Combo Aqui</h4>
  <p>Descrição</p>
  <p className="font-display font-bold text-2xl">R$ XXX,XX</p>
</div>
```

## 🛠️ Dicas de Desenvolvimento

### Executar Localmente
```bash
npm run dev
# Acesse http://localhost:3000
```

### Build para Produção
```bash
npm run build
npm run start
```

### Limpeza de Cache
```bash
# Remove pasta .next e reinstala
rm -r .next
npm install
npm run dev
```

## 📱 Responsividade

As classes Tailwind usadas:
- `md:` - aplicado em telas ≥ 768px (tablets)
- `lg:` - aplicado em telas ≥ 1024px (desktop)
- `sm:` - aplicado em telas ≥ 640px

Exemplo:
```jsx
<div className="text-sm md:text-base lg:text-lg">
  {/* Pequeno em mobile, maior em tablet/desktop */}
</div>
```

## 🎭 Classes CSS Customizadas

**Arquivo**: `app/globals.css`

- `.service-card` - Estilo dos cards de serviço
- `.btn-primary` - Botão escuro principal
- `.btn-secondary` - Botão com borda
- `.hero-gradient` - Gradiente do hero

## 🔗 Links Importantes

- **Google Fonts**: https://fonts.google.com
- **Tailwind Colors**: https://tailwindcss.com/docs/colors
- **Emoji Guide**: https://emojipedia.org
- **Next.js Docs**: https://nextjs.org/docs

## 📊 SEO Basics

Edite em `app/layout.tsx`:
```typescript
export const metadata: Metadata = {
  title: 'Seu Título Aqui',
  description: 'Sua descrição aqui',
  openGraph: {
    title: 'Open Graph Title',
    description: 'OG Description',
    url: 'https://seu-dominio.com.br',
  },
}
```

## ⚡ Performance Tips

1. **Imagens**: Use WebP quando possível
2. **Lazy Loading**: Imagens longe da tela são carregadas sob demanda
3. **Minificação**: Next.js já otimiza automaticamente
4. **Caching**: Vercel faz cache automático

---

**Dúvidas? Consulte os comentários no código!** 💡
