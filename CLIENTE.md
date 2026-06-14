# Labora — Guia de Implementação para a ETG

Este documento explica o que foi entregue, o que ainda precisa ser construído e os passos para colocar a plataforma em produção.

---

## O que foi entregue

Um **protótipo navegável de alta fidelidade** da plataforma Labora. Ele cobre todas as telas e fluxos do produto, com visual e interações prontos, mas sem backend — ou seja, os dados são simulados e nenhuma informação é salva de verdade.

**O que você pode fazer agora:**
- Navegar por todas as telas como se fosse o produto real
- Mostrar para alunos, professores e empresas parceiras para coletar feedback
- Usar como especificação visual para o desenvolvimento

**Links:**
- Protótipo navegável: `https://barbarabrancot-code.github.io/student-project-dashboard/`
- Código-fonte: `https://github.com/barbarabrancot-code/student-project-dashboard`

---

## O que existe no protótipo

| Tela | Perfil | Status |
|------|--------|--------|
| Landing Page (captação de empresas) | Público | ✅ Pronto |
| Onboarding + quiz de perfil (MBTI) | Aluno | ✅ Pronto |
| Home do projeto | Aluno | ✅ Pronto |
| Entrega do grupo | Aluno | ✅ Pronto |
| Avaliações | Aluno | ✅ Pronto |
| Perfil do aluno | Aluno | ✅ Pronto |
| Painel da turma | Professor | ✅ Pronto |
| Avaliação final com análise de IA | Professor | ✅ Pronto |
| Acompanhamento de projeto | Empresa | ✅ Pronto |
| Banco de talentos | Empresa | ✅ Pronto |
| Companion App mobile | Empresa | ✅ Pronto |

---

## O que ainda precisa ser construído

O protótipo é a **camada visual** do produto. Para funcionar de verdade, um desenvolvedor precisará construir:

### 1. Backend e banco de dados
Toda a lógica que hoje é simulada: cadastro de usuários, login, armazenamento de projetos, entregas, avaliações, etc.

### 2. Autenticação
Sistema de login separado por perfil: Aluno, Professor e Empresa. Cada perfil acessa apenas o que é seu.

### 3. Formulário da Landing Page
Hoje o formulário não envia nada. Precisará de um endpoint que receba a proposta da empresa, salve no banco e notifique a equipe Labora por e-mail.

### 4. Sistema de entregas
Upload de arquivos (PDFs, apresentações, relatórios) por parte dos grupos de alunos, com visualização para professores e empresas.

### 5. Sistema de avaliação
Notas por critério, feedbacks do professor, histórico por entrega.

### 6. Análise de IA
O bloco "Avaliação da IA — Labora" exibe métricas automáticas sobre cada aluno (pontualidade, frequência, contribuição). Em produção, essas métricas precisam ser calculadas com base nos dados reais do sistema.

### 7. Banco de talentos
Ao encerrar um semestre, os perfis dos alunos com bom desempenho ficam disponíveis para empresas parceiras. Precisará de filtros e de um mecanismo para a empresa demonstrar interesse.

### 8. Notificações
E-mails e notificações no sistema para eventos como: nova entrega, feedback do professor, empresa demonstrou interesse no aluno.

---

## Decisões que a ETG precisa tomar antes de contratar

Antes de chamar um desenvolvedor, é importante ter clareza sobre os pontos abaixo. Quanto mais definidos estiverem, mais preciso será o orçamento e o prazo.

### Por onde começar?
A plataforma tem muitas funcionalidades. O recomendado é lançar em etapas — começando pelo fluxo mais importante para validar com usuários reais antes de construir tudo.

**Sugestão de MVP (primeira versão funcional):**
1. Landing Page com formulário funcionando
2. Cadastro e login de alunos e professores
3. Registro de entregas por grupo
4. Painel do professor para visualizar e comentar entregas

O banco de talentos, a análise de IA e o Companion App da empresa podem ficar para uma segunda fase.

---

### Hospedagem
Onde a plataforma vai rodar? Opções comuns:

- **Nuvem (recomendado):** AWS, Google Cloud, Azure — escalável, sem servidor físico para manter
- **Servidor da escola:** possível, mas exige infraestrutura e manutenção interna

O desenvolvedor contratado poderá recomendar a melhor opção com base no orçamento.

---

### Domínio
A plataforma vai ter um endereço próprio? Ex: `app.labora.com.br`

Se sim, a ETG precisará registrar o domínio (no Brasil, via [registro.br](https://registro.br)) antes do lançamento.

---

### Integrações com sistemas existentes
A plataforma precisa se conectar a algum sistema que a escola já usa? Por exemplo:

- Sistema acadêmico (notas, turmas, matrículas)
- E-mail institucional
- Google Workspace ou Microsoft 365

Se sim, o desenvolvedor precisará saber quais sistemas são esses e se eles têm API disponível.

---

### Proteção de dados (LGPD)
A plataforma vai armazenar dados de alunos menores de idade. Isso exige:

- Política de privacidade
- Consentimento dos responsáveis no cadastro
- Cuidado com o armazenamento de fotos e dados pessoais

Recomenda-se consultar um advogado especializado em LGPD antes do lançamento.

---

## Como contratar o desenvolvedor

### O que entregar para o desenvolvedor
Você já tem tudo o que ele precisa:

1. **Link do protótipo** — para ver o produto funcionando
2. **Repositório do código** — o frontend já está pronto e pode ser aproveitado
3. **Documento técnico (HANDOFF.md)** — lista exatamente o que cada tela precisa de backend
4. **Design system (CLAUDE.md)** — cores, tipografia e espaçamento já definidos

### O que pedir no orçamento
Ao solicitar orçamentos, peça que o desenvolvedor separe por etapa:

- **Etapa 1:** MVP (fluxo básico de aluno + professor + formulário da LP)
- **Etapa 2:** Empresa + banco de talentos
- **Etapa 3:** Análise de IA + notificações + integrações

Isso permite começar com um investimento menor e validar antes de construir tudo.

### Perfil do profissional
O código do protótipo usa **React e TypeScript**. Um desenvolvedor fullstack com experiência nessa stack conseguirá aproveitar o frontend já pronto e focar apenas no backend. Isso reduz custo e tempo de desenvolvimento.

---

## Resumo dos próximos passos

| # | Ação | Responsável |
|---|------|-------------|
| 1 | Navegar pelo protótipo e coletar feedback interno | ETG |
| 2 | Decidir por onde começar (MVP) | ETG |
| 3 | Definir hospedagem e domínio | ETG |
| 4 | Verificar integrações necessárias com sistemas existentes | ETG |
| 5 | Consultar sobre LGPD | ETG + Jurídico |
| 6 | Solicitar orçamentos para desenvolvimento | ETG |
| 7 | Compartilhar protótipo + documentos com o dev contratado | ETG |
| 8 | Iniciar desenvolvimento do MVP | Dev contratado |
