# Labora — Student Project Dashboard

Protótipo navegável de alta fidelidade da plataforma **Labora**, que conecta empresas com desafios reais a turmas de ensino técnico.

Este repositório contém **apenas o frontend** — sem backend, autenticação ou persistência de dados. Todas as interações são simuladas localmente.

---

## Demo

🔗 [https://barbarabrancot-code.github.io/student-project-dashboard/](https://barbarabrancot-code.github.io/student-project-dashboard/)

### Modos de visualização

| URL | O que abre |
|-----|-----------|
| `/` | Dashboard principal (modo desktop, navegação lateral) |
| `/?app=aluno` | App do Aluno (mobile, 375px) |
| `/?app=empresa` | Companion App da Empresa (mobile, 375px) |
| `/?app=lp` | Landing Page (fullscreen, responsiva) |

---

## Stack

- **React 18** + TypeScript
- **Vite 6**
- **Tailwind CSS 4** (com container queries `@container`)
- **shadcn/ui** (Radix UI)
- **Framer Motion** (`motion`) para animações
- **pnpm** como gerenciador de pacotes

---

## Como rodar localmente

```bash
# Instalar dependências
pnpm install

# Rodar em desenvolvimento
pnpm dev

# Build de produção
pnpm build
```

---

## Estrutura de arquivos

```
src/
├── app/
│   ├── App.tsx                       # Roteamento entre telas (via query string)
│   └── components/
│       ├── LandingPage.tsx           # Landing Page da Labora (responsiva)
│       ├── Onboarding.tsx            # Fluxo de entrada do aluno + quiz MBTI
│       ├── EntregaDoGrupo.tsx        # Tela de entrega do grupo (aluno)
│       ├── Perfil.tsx                # Perfil do aluno
│       ├── Avaliacoes.tsx            # Avaliações do aluno
│       ├── PainelDeTurma.tsx         # Painel do professor (turma + feedback)
│       ├── AvaliacaoFinal.tsx        # Avaliação final com IA (professor)
│       ├── AcompanhamentoEmpresa.tsx # Painel de acompanhamento (empresa)
│       ├── BancoDeTalentos.tsx       # Banco de talentos (empresa)
│       ├── EmpresaApp.tsx            # Companion App mobile da empresa
│       └── VisualSystem.tsx          # Documentação do sistema visual
├── styles/
│   ├── fonts.css                     # Import da fonte Baloo 2
│   └── globals.css                   # Estilos globais
```

---

## Telas e fluxos

### Landing Page (`LandingPage.tsx`)
Página de aquisição voltada para empresas. Responsiva: mobile (375px) e desktop (largura total).

Seções em ordem: Hero → Vídeo → Como funciona (timeline 5 passos) → O que você ganha → Desafio ideal → Dentro da sala de aula → O que esperamos de você → Casos reais → Formulário de proposta → Footer

Inclui um **chatbot simulado** (flutuante, canto inferior direito) que guia a empresa em 6 etapas antes de preencher o formulário.

### App do Aluno
Fluxo: Onboarding (cadastro + quiz MBTI) → Home → Entrega do Grupo → Avaliações → Perfil

### Painel do Professor
Fluxo: Painel da Turma (grupos + feedback individual) → Avaliação Final (com análise de IA simulada)

### Painel da Empresa (desktop)
Fluxo: Acompanhamento do projeto → Banco de Talentos

### Companion App da Empresa (mobile)
App mobile para a empresa acompanhar grupos, visualizar entregas e ver perfil dos alunos com análise de IA.

---

## Design system

Documentado em [`CLAUDE.md`](./CLAUDE.md).

| Token | Valor |
|-------|-------|
| Primário (Teal) | `#0F766E` |
| Sucesso (Verde) | `#34D399` |
| Secundário (Azul) | `#3B82F6` |
| Fonte | Baloo 2 (Google Fonts) |
| Frame mobile | 375 × 812px |

### Breakpoints (container queries)
As telas responsivas usam `@container` em vez de breakpoints de viewport, para funcionar corretamente tanto na visualização em frame quanto em tela cheia.

- `@[640px]` — layout de duas colunas (desktop)
- `@[500px]` — grids internos de formulário

---

## O que é simulado

- Dados de alunos, grupos e empresas são **hardcoded** nos componentes
- Fotos dos alunos estão em `/public/` como arquivos `.webp`
- O chatbot e o quiz MBTI são fluxos simulados sem lógica de backend
- A análise de IA (bloco "Avaliação da IA — Labora") exibe dados estáticos
- O formulário de proposta **não envia dados** — é apenas visual

---

## Deploy

Publicado via **GitHub Pages**. O Vite está configurado com o base path `/student-project-dashboard/`.

```bash
pnpm build
# O conteúdo da pasta dist/ é publicado automaticamente via GitHub Actions
```
