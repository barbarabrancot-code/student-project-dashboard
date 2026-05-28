**Add your own guidelines here**
<!--

System Guidelines

Be maximally concise. No preamble, no summaries, no explanations unless asked. 
Respond only with what was requested — code, answer, or fix. 
No filler phrases. No "certainly", "sure", "of course", "here is", "I hope this helps". 
If the answer is code, output only the code block. 
If clarification is needed, ask only one question.

A partir de agora, trabalhe no modo MÍNIMO DE TOKENS.

Objetivo principal:
- resolver o problema com o menor custo possível de créditos
- evitar contexto desnecessário
- evitar respostas longas
- evitar ler arquivos inteiros sem necessidade

Regras:

1. Responda sempre em formato curto e direto.
   - prefira 3–6 linhas
   - sem introdução
   - sem explicações longas
   - sem repetir meu pedido

2. Antes de abrir qualquer arquivo:
   - diga qual arquivo quer abrir
   - explique em 1 frase por que precisa abrir
   - espere minha confirmação se não for estritamente necessário

3. Nunca leia arquivos completos se puder evitar.
   Prefira:
   - grep
   - busca por função
   - busca por componente específico
   - leitura parcial

4. Ao editar código:
   - altere apenas o trecho mínimo necessário
   - não refatore partes não relacionadas
   - não reescreva arquivos inteiros

5. Se existir mais de uma solução:
   - me mostre apenas a melhor
   - explique em no máximo 2 frases

6. Se faltar contexto:
   - faça 1 pergunta objetiva ao invés de assumir ou explorar vários arquivos

7. Não gere documentação, comentários extras ou explicações pedagógicas,
   a menos que eu peça.

8. Sempre priorize:
   menor número de mensagens
   menor número de arquivos lidos
   menor número de edições
   menor uso possível de contexto

Quando possível:
- me peça para colar trechos de código ao invés de abrir arquivos
- prefira eu enviar o código manualmente
- use contexto já disponível antes de buscar mais

Use this file to provide the AI with rules and guidelines you want it to follow.
This template outlines a few examples of things you can add. You can add your own sections and format it to suit your needs

TIP: More context isn't always better. It can confuse the LLM. Try and add the most important rules you need

# General guidelines

Any general rules you want the AI to follow.
For example:

* Only use absolute positioning when necessary. Opt for responsive and well structured layouts that use flexbox and grid by default
* Refactor code as you go to keep code clean
* Keep file sizes small and put helper functions and components in their own files.

--------------

# Design system guidelines
Rules for how the AI should make generations look like your company's design system

Additionally, if you select a design system to use in the prompt box, you can reference
your design system's components, tokens, variables and components.
For example:

* Use a base font-size of 14px
* Date formats should always be in the format “Jun 10”
* The bottom toolbar should only ever have a maximum of 4 items
* Never use the floating action button with the bottom toolbar
* Chips should always come in sets of 3 or more
* Don't use a dropdown if there are 2 or fewer options

You can also create sub sections and add more specific details
For example:


## Button
The Button component is a fundamental interactive element in our design system, designed to trigger actions or navigate
users through the application. It provides visual feedback and clear affordances to enhance user experience.

### Usage
Buttons should be used for important actions that users need to take, such as form submissions, confirming choices,
or initiating processes. They communicate interactivity and should have clear, action-oriented labels.

### Variants
* Primary Button
  * Purpose : Used for the main action in a section or page
  * Visual Style : Bold, filled with the primary brand color
  * Usage : One primary button per section to guide users toward the most important action
* Secondary Button
  * Purpose : Used for alternative or supporting actions
  * Visual Style : Outlined with the primary color, transparent background
  * Usage : Can appear alongside a primary button for less important actions
* Tertiary Button
  * Purpose : Used for the least important actions
  * Visual Style : Text-only with no border, using primary color
  * Usage : For actions that should be available but not emphasized
-->
