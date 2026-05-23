# Guia do Projeto — Student Project Dashboard

## Idioma
- Todo o código, comentários, labels, textos de interface e nomes de variáveis devem estar em **português**.
- Exceções: nomes técnicos de bibliotecas, props do React e classes do Tailwind (que são em inglês por natureza).

---

## Paleta de Cores

| Nome        | Hex       | Uso principal                          |
|-------------|-----------|----------------------------------------|
| Teal        | `#0F766E` | Cor primária, ações principais, destaques |
| Verde       | `#34D399` | Sucesso, progresso, elementos positivos |
| Azul        | `#3B82F6` | Links, informação, elementos secundários |

- Gradientes são bem-vindos em fundos, barras de progresso e elementos decorativos.
- **Botões usam sempre cor sólida — nunca gradiente.**
  - Botão primário: `bg-[#3B82F6]` (azul sólido)
  - Botão secundário: `bg-white border border-gray-200`
- Exemplos de gradientes permitidos (não em botões):
  - `from-[#0F766E] to-[#34D399]` — barras de progresso
  - `from-[#3B82F6] to-[#34D399]` — elementos decorativos/headers
  - `from-[#0F766E] to-[#3B82F6]` — backgrounds de seção

### Cores de apoio (do Visual System original)
- Fundo página: `gray-50` / `white`
- Bordas: `gray-200`, `gray-300`
- Texto primário: `gray-900`
- Texto secundário: `gray-600`
- Texto desabilitado: `gray-400`
- Aviso: `amber-100` / `amber-300`
- Sucesso neutro: `green-100` / `green-300`

---

## Tipografia

- **Fonte principal:** `Baloo 2` (Google Fonts) — já importada em `src/styles/fonts.css`
- Pesos disponíveis: 400, 500, 600, 700, 800

| Elemento | Tamanho | Peso   |
|----------|---------|--------|
| H1       | 20px    | 600    |
| H2       | 18px    | 600    |
| H3       | 16px    | 500    |
| Body     | 14px    | 400    |
| Label    | 12px    | 500    |
| Caption  | 10px    | 400    |

---

## Espaçamento
Seguir escala de 4px: `4 / 8 / 12 / 16 / 24 / 32 / 48px`
No Tailwind: `gap-1 / gap-2 / gap-3 / gap-4 / gap-6 / gap-8 / gap-12`

---

## Bordas arredondadas
- Pequeno: `rounded` (4px)
- Padrão: `rounded-lg` (8px)
- Pílulas / chips: `rounded-full`

---

## Filosofia de design

### Telas do Aluno (mobile, 375px)
- Visual **lúdico e acolhedor** — o aluno precisa sentir prazer em usar o app
- Usar gradientes coloridos em cards de destaque, botões e headers
- Bordas arredondadas generosas (`rounded-xl`, `rounded-2xl`)
- Ícones e elementos visuais mais expressivos
- Animações suaves quando possível (Framer Motion já está instalado)

### Telas do Professor e Empresa (desktop)
- Visual **minimalista e profissional**
- Cores mais neutras, acentos pontuais com a paleta principal
- Tipografia clara e hierarquia bem definida
- Sem exagero em gradientes — usá-los apenas para highlights

---

## Stack técnica
- React 18 + TypeScript
- Vite 6
- Tailwind CSS 4
- shadcn/ui (componentes via Radix UI)
- pnpm como gerenciador de pacotes
- Framer Motion (pacote `motion`) para animações

## Estrutura de arquivos
- `src/app/App.tsx` — navegação entre telas
- `src/app/components/` — um arquivo por tela
- `src/styles/` — estilos globais, tema, fontes

---

## Regras gerais
- Sempre uma mudança de cada vez, explicando o que foi feito
- Não criar arquivos desnecessários
- Não usar inglês em textos visíveis na interface
- Preferir componentes Tailwind diretos a criar abstrações novas
