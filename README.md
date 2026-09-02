# Portfólio Pessoal

Portfólio pessoal desenvolvido em React + TypeScript para apresentar projetos, experiência profissional e informações de contato. Suporta dois idiomas (pt/en) via `react-i18next`.

Acesse em: [link para o repositório](#)

Fique à vontade para editar este modelo e usar como seu. Para substituir os dados, siga as instruções em [ALTERACOES.md](./ALTERACOES.md).

## Tecnologias

- **React 19** + **TypeScript**
- **Vite 8** (bundler + dev server)
- **Tailwind CSS** 
- **react-i18next** (internacionalização pt/en)
- **Framer Motion** (animações, via `motion`)
- **Radix UI** + **shadcn** (componentes de UI)
- **Lucide React** (ícones)
- **Web3Forms** (formulário de email sem backend)

## Estrutura de Diretórios

```
Portfolio/
├── AGENTS.md                  # Instruções para agentes de código
├── ALTERACOES.md              # Guia para substituir dados do portfólio
├── README.md
├── wireframes/                # Mockups de média fidelidade
│   ├── home.png
│   ├── projetos.png
│   ├── contatos.png
│   ├── experiencia.png
│   └── sobre-mim.png
└── codigo/                    # Projeto React (Vite)
    ├── .env.local             # Chaves de API (gitignored)
    ├── package.json
    ├── vite.config.ts
    ├── tsconfig.json
    ├── index.html
    ├── public/
    │   ├── eu.jpeg            # Foto de perfil
    │   ├── telefone.png       # Foto hero de contatos
    │   ├── java.png
    │   ├── videos/            # Vídeos do grid homepage
    │   │   ├── Sobre.mp4 / About.mp4
    │   │   ├── Experiencia.mp4 / Experience.mp4
    │   │   ├── Projetos.mp4 / Projects.mp4
    │   │   └── Contatos.mp4 / Contact.mp4
    │   └── projetos/          # Screenshots e logos dos projetos
    │       ├── modus/
    │       ├── cras/
    │       └── rhsoft/
    └── src/
        ├── main.tsx           # Entry point
        ├── App.tsx            # LanguageSwitcher + RouterProvider
        ├── i18n/
        │   ├── index.ts       # Config do i18next + imports de JSONs
        │   └── merge.ts       # Helper deepMerge para JSONs
        ├── router/
        │   └── router.tsx     # Definição de rotas
        ├── components/
        │   ├── back-button.tsx
        │   ├── language-switcher.tsx
        │   ├── stack-carrousel.tsx   # Marquee + SVGs de logos
        │   └── detalhes.tsx
        ├── pages/
        │   ├── homepage/      # Grid 2×2 com vídeos
        │   ├── sobre/         # Página "Sobre mim"
        │   ├── experiencia/   # Timeline de experiência
        │   ├── projetos/      # Carousel + página de detalhes
        │   ├── contatos/      # Links sociais + formulário de email
        │   └── nao-encontrada/ # Página 404
        ├── services/
        │   └── email-service.ts  # Envio via Web3Forms
        └── lib/
            └── utils.ts       # cn() helper (clsx + tailwind-merge)
```

### Cada pasta de `pages/` contém:

- **Componente principal** (`.tsx`) — a página em si
- **`pt.json`** / **`en.json`** — textos traduzidos para português e inglês
- Componentes auxiliares (quando necessários, ex.: `timeline.tsx`, `email-card.tsx`, `detalhes.tsx`)

## Instalação e Execução

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/seu-repositorio.git

# 2. Acesse a pasta do projeto
cd seu-repositorio/codigo

# 3. Instale as dependências
npm install

# 4. (Opcional) Configure o formulário de email
#    Crie o arquivo .env.local com sua chave do Web3Forms:
echo "VITE_ACCESS_KEY=sua-chave-aqui" > .env.local

# 5. Execute o servidor de desenvolvimento
npm run dev
```

O servidor roda em [http://localhost:5173](http://localhost:5173) por padrão.

### Comandos disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento (Vite) |
| `npm run build` | Build de produção (`tsc -b && vite build`) |
| `npm run lint` | Verificação de código (ESLint) |
| `npm run preview` | Preview do build de produção |

## Wireframes

Mockups de média fidelidade desenvolvidos para estruturar as interfaces:

- **Homepage**
  <img src="./wireframes/home.png" width="600">

- **Projetos**
  <img src="./wireframes/projetos.png" width="600">

- **Contatos**
  <img src="./wireframes/contatos.png" width="600">

- **Experiência**
  <img src="./wireframes/experiencia.png" width="600">

- **Sobre Mim**
  <img src="./wireframes/sobre-mim.png" width="600">
