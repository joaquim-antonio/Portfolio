# Guia de Alteração — Portfólio como Template

Este repositório é um portfólio feito com Vite + React + TypeScript. Ele suporta dois idiomas (pt/en) via `react-i18next`. As instruções abaixo indicam exatamente onde substituir os seus dados.

---

## 1. Vídeos da Homepage (grid 2×2)

**Arquivo:** `codigo/src/pages/homepage/homepage.tsx`

Cada quadrante do grid da página inicial é um `.mp4` que roda em loop. Existem dois conjuntos — um para cada idioma — no objeto `videosByLang`:

```
videosByLang = {
  pt: {
    sobreMim:      "/videos/Sobre.mp4",
    experiencia:   "/videos/Experiencia.mp4",
    projetos:      "/videos/Projetos.mp4",
    contatos:      "/videos/Contatos.mp4",
  },
  en: {
    sobreMim:      "/videos/About.mp4",
    experiencia:   "/videos/Experience.mp4",
    projetos:      "/videos/Projects.mp4",
    contatos:      "/videos/Contact.mp4",
  },
}
```

**Onde colocar os seus vídeos:**
- Coloque os arquivos `.mp4` na pasta `codigo/public/videos/`.
- Atualize os caminhos no `videosByLang` para apontar para os seus novos arquivos.
- **Formato recomendado:** MP4, resolução 1080p ou 720p, duração curta (3-10s de loop), com áudio (ou sem, já que o `<video>` é `muted`).
- Crie **8 vídeos no total** (4 para pt, 4 para en). Se quiser usar o mesmo vídeo em ambos os idiomas, basta repetir o caminho nos dois blocos.

**O que cada quadrante representa:**
| Posição | Chave | Vídeo exibido |
|---------|-------|---------------|
| Superior esquerdo | `sobreMim` | Vídeo da seção "Sobre mim" |
| Superior direito | `experiencia` | Vídeo da seção "Experiência" |
| Inferior esquerdo | `projetos` | Vídeo da seção "Projetos" |
| Inferior direito | `contatos` | Vídeo da seção "Contatos" |

**Labels dos quadrantes** (texto que aparece ao clicar):
- Editar os valores em `codigo/src/pages/homepage/pt.json` e `en.json`, na chave `grid`:
  - `sobreMim`, `experiencia`, `projetos`, `contatos`

---

## 2. Foto de Perfil (Sobre Mim)

**Arquivo:** `codigo/src/pages/sobre/sobre-mim.tsx`

A foto aparece como avatar circular na página "Sobre mim":

```tsx
<img
  src="/eu.jpeg"
  alt="minha-foto"
  className="relative size-64 rounded-full shadow-xl z-10 object-cover"
/>
```

**O que fazer:**
- Substitua `codigo/public/eu.jpeg` pela sua foto.
- Mantenha o nome do arquivo ou atualize o `src` no componente.
- Formato: quadrado ou redondo, fundo claro ou transparente (aparece com borda circular).

---

## 3. Texto da Página "Sobre Mim"

**Arquivos (i18n):**
- `codigo/src/pages/sobre/pt.json`
- `codigo/src/pages/sobre/en.json`

Campos a substituir:

| Chave | Descrição |
|-------|-----------|
| `pages.sobreMim.titulo` | Título da página |
| `pages.sobreMim.saudacao` | Saudação (ex.: "Olá, eu sou o" / "Hi, im") |
| `pages.sobreMim.bio` | Biografia — suporta tags `<strong>` e `<em>` |
| `pages.sobreMim.cta` | Call to action — contém links internos marcados com `<1>`, `<3>`, `<5>` |

**Nome do desenvolvedor** (hardcoded no componente):
- Em `sobre-mim.tsx:20`, o nome aparece entre `<strong>`:
  ```tsx
  {t("pages.sobreMim.saudacao")} <strong>Joaquim</strong>
  ```
- Substitua `"Joaquim"` pelo seu nome.

---

## 4. Carrossel de Habilidades (Sobre Mim)

**Arquivo:** `codigo/src/pages/sobre/sobre-mim.tsx`

Na seção `<Marquee>`, as logos são importadas de `stack-carrousel.tsx`:

```tsx
const arr = [Logos.tailwindcss, Logos.framer, Logos.nextjs, Logos.aws]
```

**Para trocar as logos:**
- Edite `codigo/src/components/stack-carrousel.tsx` — lá estão definidas como componentes SVG inline (export `Logos`).
- Crie novos SVGs inline ou importe de imagens, seguindo o padrão `Logos.novologo: () => ( <svg ...> )`.
- Adicione as novas logos ao array `arr` em `sobre-mim.tsx`.

---

## 5. Projetos

### 5.1 Estrutura de arquivos

Os projetos são definidos em **duas camadas**:

| Camada | Arquivo | O que contém |
|--------|---------|-------------|
| Estática | `codigo/src/pages/projetos/data.ts` | `id`, `title`, `logo`, `demo` (vídeo), `techStack`, `links` (GitHub, Demo), `gallery` (screenshots) |
| Localizada (i18n) | `codigo/src/pages/projetos/pt.json` e `en.json` | `credit`, `description`, `contributions`, `meta` (período, duração, local) |

A função `useProjects()` em `data.ts` combina as duas camadas automaticamente.

### 5.2 Dados estáticos (`data.ts`)

Para **cada projeto**, edite o objeto correspondente em `PROJECTS`:

```ts
{
  id: "meu-projeto",           // ID único (usado como chave de lookup)
  title: "Meu Projeto",       // Nome exibido no carousel e na página de detalhes
  logo: "/projetos/meu/logo.png",  // Logo (coloque o PNG em public/projetos/meu/)
  demo: "/projetos/meu/demo.mp4",  // Vídeo demonstrativo (MP4 em public/projetos/meu/)
  techStack: ["React", "Node.js"], // Tecnologias usadas
  links: [
    { label: "GitHub", url: "https://github.com/seu-usuario/projeto" },
    { label: "Live Demo", url: "https://seu-site.com" },
  ],
  gallery: [
    "/projetos/meu/screen1.png",   // Screenshots (coloque em public/projetos/meu/)
    "/projetos/meu/screen2.png",
  ],
}
```

**Para adicionar um projeto:** crie um novo objeto no array `PROJECTS`.
**Para remover:** delete o objeto e a chave correspondente em `pt.json`/`en.json`.

### 5.3 Dados localizados (`pt.json` / `en.json`)

**Arquivos:** `codigo/src/pages/projetos/pt.json` e `codigo/src/pages/projetos/en.json`

Cada projeto tem uma chave dentro de `projects` (usando o `id`):

```json
{
  "projects": {
    "meu-projeto": {
      "credit": "FRONTEND DEVELOPMENT",
      "description": "Descrição do projeto aqui.",
      "contributions": [
        "O que você fez no projeto (ponto 1)",
        "O que você fez no projeto (ponto 2)"
      ],
      "meta": ["JAN 2025 - JUN 2025", "6 MONTHS", "YOUR CITY"]
    }
  }
}
```

**Campos:**
| Campo | Descrição |
|-------|-----------|
| `credit` | Subtítulo exibido abaixo do título no carousel e na página de detalhes |
| `description` | Descrição longa do projeto |
| `contributions` | Lista das suas contribuições |
| `meta` | Array de strings: período, duração, localização |

### 5.4 Seção de detalhes do projeto (`detalhes.tsx`)

**Arquivo:** `codigo/src/pages/projetos/detalhes.tsx`

Os headings das seções também são traduzidos via i18n (chaves em `pt.json`/`en.json`):
- `pages.projetos.sobre` → "Sobre" / "About"
- `pages.projetos.contribuicao` → "Como contribui para o projeto" / "How I contributed..."
- `pages.projetos.stack` → "Stack"
- `pages.projetos.links` → "Links"
- `pages.projetos.galeria` → "Galeria" / "Gallery"

---

## 6. Experiência (Timeline)

### 6.1 Textos (i18n)

**Arquivos:**
- `codigo/src/pages/experiencia/pt.json`
- `codigo/src/pages/experiencia/en.json`

Cada entrada da timeline tem:
- `titulo1`, `titulo2`, ... `titulo7` — título com data (use `\n` para quebrar linha)
- `conteudo1`, `conteudo2_1`, `conteudo2_2`, ... — parágrafos de conteúdo

**Estrutura:**
```json
{
  "pages": {
    "experiencia": {
      "titulo1": "MM/AAAA\n\"Nome da Experiência\"",
      "conteudo1": "Descrição do que você fez.",
      "titulo2": "MM/AAAA\n\"Outra Experiência\"",
      "conteudo2_1": "Parágrafo 1",
      "conteudo2_2": "Parágrafo 2"
    }
  }
}
```

**Para adicionar/remover experiências:** edite o array `data` em `experiencia.tsx` e adicione/remova as chaves correspondentes no JSON. Cada entrada do array tem um `title` e um `content` (JSX). As imagens dentro de cada entrada são **hardcoded** no componente — edite os `src` dos `<img>` diretamente em `experiencia.tsx`.

### 6.2 Imagens da Timeline

**Arquivo:** `codigo/src/pages/experiencia/experiencia.tsx`

As imagens dentro de cada entrada da timeline são `<img>` com `src` apontando para:
- Imagens locais: `"/projetos/modus/tarefas.png"` (em `public/projetos/`)
- Imagens externas: `"https://assets.aceternity.com/..."` (template placeholders)

Substitua pelos seus próprios screenshots. Coloque-os em `codigo/public/` e atualize os `src`.

### 6.3 Cabeçalho da Timeline

**Arquivos:** `codigo/src/pages/experiencia/pt.json` e `en.json`

| Chave | Descrição |
|-------|-----------|
| `pages.experiencia.titulo` | Título da página |
| `pages.experiencia.cabecalho` | Subtítulo |
| `pages.experiencia.intro` | Parágrafo introdutório |

---

## 7. Contatos (Links Sociais)

**Arquivo:** `codigo/src/pages/contatos/contatos.tsx`

Os links estão hardcoded na seção `SocialsBlock`:

```tsx
const socialLinks: SocialLink[] = [
  {
    href: 'https://www.linkedin.com/in/joaquim-antonio/',  // ← troque
    label: t("pages.contatos.linkedin"),
    icon: <User size={28} />,
  },
  {
    href: 'https://github.com/joaquim-antonio',            // ← troque
    label: t("pages.contatos.github"),
    icon: <Code2 size={28} />,
  },
  {
    href: 'https://wa.me/5533998640504',                   // ← troque (formato: wa.me/DDDDNNNNNNN)
    label: t("pages.contatos.whatsapp"),
    icon: <MessageCircleMore size={28} />,
  },
  {
    label: t("pages.contatos.email"),                       // ← abre modal de email
    icon: <Mail size={28} />,
    onClick: onEmailClick,
  },
]
```

**Substitua os `href` pelos seus próprios links.**

### 7.1 Foto do Hero de Contatos

**Arquivo:** `codigo/src/pages/contatos/contatos.tsx`, linha 23:

```tsx
<img src="telefone.png" alt="minha-foto" className="relative size-80" />
```

Substitua `codigo/public/telefone.png` pela sua imagem ou atualize o `src`.

### 7.2 Textos da Página de Contatos (i18n)

**Arquivos:** `codigo/src/pages/contatos/pt.json` e `en.json`

| Chave | Descrição |
|-------|-----------|
| `pages.contatos.heroTitle` | Título hero |
| `pages.contatos.heroDesc` | Descrição hero |
| `pages.contatos.linkedin` | Label do botão LinkedIn |
| `pages.contatos.github` | Label do botão GitHub |
| `pages.contatos.whatsapp` | Label do botão WhatsApp |
| `pages.contatos.email` | Label do botão Email |

---

## 8. Serviço de Email (Formulário de Contato)

O formulário de contato usa [Web3Forms](https://web3forms.com). A chave de API está armazenada em variável de ambiente por segurança.

### Como configurar

1. Crie uma conta gratuita em [web3forms.com](https://web3forms.com).
2. Copie a sua access key.
3. Crie o arquivo `codigo/.env.local` com o seguinte conteúdo:

```
VITE_ACCESS_KEY=sua-access-key-aqui
```

4. O seu email será recebido no endereço cadastrado no Web3Forms.

> **Nunca commite o arquivo `.env.local`** — ele já está no `.gitignore` e não será incluído no git.

**Arquivo:** `codigo/src/services/email-service.ts`

A chave é lida automaticamente via `import.meta.env.VITE_ACCESS_KEY`. Não edite o arquivo, apenas crie o `.env.local` com a sua chave.

---

## 9. Tradução (i18n)

O projeto suporta **português (pt)** e **inglês (en)**. O botão de troca de idioma aparece automaticamente em todas as páginas (canto superior direito).

### Onde ficam as traduções

Cada pasta de página tem os seus próprios JSONs:

| Pasta | JSONs | Conteúdo |
|-------|-------|----------|
| `src/pages/homepage/` | `pt.json`, `en.json` | Labels do grid |
| `src/pages/sobre/` | `pt.json`, `en.json` | Bio, saudação, CTA |
| `src/pages/experiencia/` | `pt.json`, `en.json` | Timeline (títulos + conteúdos) |
| `src/pages/projetos/` | `pt.json`, `en.json` | Títulos de seção + conteúdo localizado dos projetos |
| `src/pages/contatos/` | `pt.json`, `en.json` | Textos + formulário |
| `src/pages/nao-encontrada/` | `pt.json`, `en.json` | Página 404 |

Todos são importados e mesclados em `src/i18n/index.ts` via `deepMerge`.

**Para adicionar um novo idioma:**
1. Crie os JSONs na pasta correspondente (ex.: `ja.json` para japonês).
2. Importe-os em `src/i18n/index.ts` e adicione ao `deepMerge` do novo idioma.
3. Adicione o código em `supportedLngs` (ex.: `"ja"`) e no array `LANGUAGES` do `LanguageSwitcher`.

---

## 10. Checklist Rápido

- [ ] Substituir `codigo/public/eu.jpeg` (foto de perfil)
- [ ] Substituir `codigo/public/telefone.png` (foto hero de contatos)
- [ ] Adicionar vídeos `.mp4` em `codigo/public/videos/` (8 arquivos)
- [ ] Editar `codigo/src/pages/homepage/homepage.tsx` → `videosByLang` com caminhos dos novos vídeos
- [ ] Editar `codigo/src/pages/homepage/pt.json` + `en.json` → labels do grid
- [ ] Editar `codigo/src/pages/sobre/sobre-mim.tsx` → nome do desenvolvedor
- [ ] Editar `codigo/src/pages/sobre/pt.json` + `en.json` → bio e CTA
- [ ] Editar `codigo/src/pages/sobre/sobre-mim.tsx` → logos do carrossel de skills
- [ ] Editar `codigo/src/pages/projetos/data.ts` → dados estáticos dos projetos (logo, demo, links, gallery)
- [ ] Editar `codigo/src/pages/projetos/pt.json` + `en.json` → descrição, contribuições, meta dos projetos
- [ ] Editar `codigo/src/pages/experiencia/experiencia.tsx` → imagens hardcoded na timeline
- [ ] Editar `codigo/src/pages/experiencia/pt.json` + `en.json` → títulos e conteúdos da timeline
- [ ] Editar `codigo/src/pages/contatos/contatos.tsx` → URLs dos links sociais
- [ ] Editar `codigo/src/pages/contatos/pt.json` + `en.json` → textos da página
- [ ] Criar `codigo/.env.local` com `VITE_ACCESS_KEY=sua-chave-web3forms`
- [ ] Rodar `npm run lint` e `npm run build` para verificar
- [ ] Testar com `npm run dev`
