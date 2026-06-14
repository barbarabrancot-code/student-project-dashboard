# Handoff — Labora Platform

Este documento complementa o README técnico com contexto de produto: o que cada tela faz, quais dados precisam vir do backend, e decisões de design relevantes para a implementação.

---

## Contexto do produto

A **Labora** é uma plataforma que conecta empresas com desafios reais a turmas de ensino técnico. O modelo funciona assim:

1. A empresa propõe um desafio via formulário
2. A Labora faz curadoria e valida o desafio
3. Um professor vincula o desafio à sua disciplina
4. Grupos de alunos desenvolvem uma solução ao longo do semestre
5. A empresa acompanha o progresso, participa de validações e acessa o banco de talentos ao final

O protótipo cobre **três perfis de usuário**: Aluno, Professor e Empresa.

---

## Landing Page

**Objetivo:** converter empresas em propostas de desafio.

**Seções e intenção de cada uma:**

| Seção | Intenção |
|-------|----------|
| Hero | Impacto imediato — proposta de valor em 2 linhas |
| Vídeo | Prova social / demonstração do produto |
| Como funciona | Reduzir fricção — mostrar que é simples para a empresa |
| O que você ganha | Benefícios concretos para a empresa |
| Desafio ideal | Qualificar o lead — empresa entende se o desafio dela se encaixa |
| Dentro da sala de aula | Transparência sobre o processo pedagógico |
| O que esperamos de você | Gerenciar expectativas de esforço |
| Casos reais | Prova social com exemplos concretos |
| Formulário | Conversão — captura da proposta inicial |

**Chatbot simulado:** guia a empresa antes de preencher o formulário. Na implementação real, as respostas do chatbot devem pré-preencher campos do formulário e ser armazenadas junto com a proposta.

**O formulário não envia dados.** Na implementação real, precisará de:
- Endpoint POST para receber a proposta
- E-mail de confirmação para a empresa
- Notificação interna para a equipe Labora fazer a curadoria

---

## App do Aluno

Rota: `/?app=aluno`

### Onboarding (`Onboarding.tsx`)

Fluxo de cadastro em etapas:
1. Boas-vindas
2. Dados pessoais (nome, curso, turma)
3. Quiz MBTI (16 perguntas de múltipla escolha)
4. Resultado do perfil comportamental

**Dados necessários do backend:**
- Cursos e turmas disponíveis (para o select)
- Lógica real de cálculo do MBTI (hoje é simulada)
- Persistência do perfil do aluno

**Decisão de design:** o quiz MBTI foi incluído para criar engajamento no onboarding e gerar dados de perfil que o professor e a empresa podem consultar depois.

---

### Home do Aluno (`App.tsx` — componente inline)

Exibe: projeto atual, timeline de marcos, próxima entrega, status do grupo, atualizações recentes.

**Dados necessários do backend:**
- Projeto vinculado ao aluno (nome, empresa parceira, semana atual, % progresso)
- Marcos do semestre com status (concluído / em andamento / futuro)
- Próxima entrega (título, prazo, status)
- Membros do grupo com última atividade
- Feed de atualizações (comentários do professor, entregas aprovadas, etc.)

---

### Entrega do Grupo (`EntregaDoGrupo.tsx`)

Tela onde o grupo registra e envia suas entregas parciais.

**Dados necessários do backend:**
- Lista de entregas do semestre com status
- Upload de arquivos
- Histórico de comentários do professor por entrega
- Status de aprovação por entrega

---

### Perfil (`Perfil.tsx`)

Perfil público do aluno — visível também para empresas no banco de talentos.

**Dados necessários do backend:**
- Foto, nome, curso, turma
- Resultado do MBTI
- Projetos participados
- Avaliações recebidas
- Habilidades e destaques

---

### Avaliações (`Avaliacoes.tsx`)

Resumo das notas e feedbacks recebidos ao longo do projeto.

**Dados necessários do backend:**
- Notas por entrega
- Feedbacks do professor
- Avaliação da IA (ver bloco Labora abaixo)

---

## Painel do Professor

Rota: `/?` (selecionando "Professor" na sidebar)

### Painel da Turma (`PainelDeTurma.tsx`)

Visão geral de todos os grupos da turma, com progresso e status de cada entrega.

**Dados necessários do backend:**
- Lista de grupos com membros e fotos
- Status de entrega por grupo por marco
- Acesso ao workspace de cada grupo
- Sistema de feedback individual por aluno (hoje simulado com notas de 1–5 por critério)

---

### Avaliação Final (`AvaliacaoFinal.tsx`)

Tela de avaliação da banca final com critérios e notas.

Inclui um bloco **"Avaliação da IA — Labora"** com três métricas geradas automaticamente:
- Pontualidade nas entregas
- Frequência de registros
- Contribuição individual

**Decisão de design:** a IA avalia com base em dados objetivos do sistema (datas de entrega, frequência de commits/uploads, distribuição de tarefas). O professor vê isso como apoio — não substitui a avaliação humana.

**Dados necessários do backend:**
- Critérios de avaliação configuráveis por professor/disciplina
- Cálculo automático das métricas de IA
- Exportação de notas para o sistema acadêmico

---

## Painel da Empresa (desktop)

Rota: `/?` (selecionando "Empresa" na sidebar)

### Acompanhamento (`AcompanhamentoEmpresa.tsx`)

A empresa acompanha o progresso dos grupos trabalhando no seu desafio.

**Dados necessários do backend:**
- Grupos vinculados ao desafio da empresa
- Entregas parciais com acesso para visualização
- Canal de comunicação com o professor (não diretamente com os alunos)

---

### Banco de Talentos (`BancoDeTalentos.tsx`)

Após o encerramento do semestre, a empresa acessa os perfis dos alunos que se destacaram.

**Dados necessários do backend:**
- Alunos com avaliação acima do threshold definido pela Labora
- Filtros por habilidade, curso, perfil MBTI
- Ação de "demonstrar interesse" (notifica o aluno e a Labora)

---

## Companion App da Empresa (mobile)

Rota: `/?app=empresa`

Versão mobile do painel da empresa. Mesmas funcionalidades do desktop adaptadas para mobile: visualizar grupos, ver entregas, acessar perfil individual dos alunos.

O bloco **"Avaliação da IA — Labora"** aparece no perfil de cada aluno com as mesmas três métricas do painel do professor.

---

## Bloco "Avaliação da IA — Labora"

Aparece em dois contextos: perfil do aluno (Companion App) e avaliação final (painel do professor).

**Métricas exibidas:**
- Pontualidade nas entregas (5 de 5 entregas no prazo → 10,0)
- Frequência de registros (atividade acima do esperado → 9,5)
- Contribuição individual (tarefas concluídas por membro → 8,0)

**Regras de implementação:**
- Gerado automaticamente — não editável pelo professor nem pela empresa
- Calculado com base em dados objetivos do sistema
- Label "Gerado automaticamente · não editável" deve sempre aparecer

---

## Dados simulados que precisam virar API

| Dado | Onde aparece | Precisa de |
|------|-------------|------------|
| Grupos e membros | Painel do professor, EmpresaApp | Tabela de grupos + membros |
| Fotos dos alunos | Em todas as telas | Upload de avatar no perfil |
| Progresso do projeto | Home do aluno, painel da empresa | Cálculo baseado em entregas |
| Notas e feedbacks | Avaliações, banca final | Sistema de avaliação por critério |
| Métricas de IA | Perfil do aluno, banca final | Pipeline de cálculo automático |
| Casos reais (LP) | Landing Page | CMS ou tabela de cases |

---

## Decisões de design relevantes para implementação

**Container queries em vez de media queries:** toda a responsividade usa `@container` do Tailwind 4. Isso permite que os componentes se adaptem ao espaço disponível, não ao viewport — importante porque o mesmo componente é renderizado em frame (375px) e em tela cheia.

**Fonte Baloo 2:** importada via Google Fonts em `src/styles/fonts.css`. Substituir por self-hosted em produção para evitar dependência externa e melhorar LGPD.

**Imagens em `.webp`:** todas as fotos de alunos foram comprimidas para ~400×400px. Em produção, servir via CDN.

**Chatbot como pré-qualificação:** o fluxo do chatbot foi desenhado para coletar 5 informações antes de mostrar o formulário (área, prazo, sensibilidade, tipo de entrega, descrição livre). Essas respostas devem pré-popular o formulário e ser armazenadas mesmo se o formulário não for enviado.
