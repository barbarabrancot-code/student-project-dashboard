export default function LandingPage() {
  return (
    <div className="w-full min-h-screen bg-white font-['Poppins',sans-serif]">
      <Hero />
      <VideoSection />
      <ComoFunciona />
      <OQueVoceGanha />
      <DentroDaSalaDeAula />
      <DesafioIdeal />
      <OQueEsperamos />
      <ExemploReal />
      <FormularioDesafio />
      <Footer />
    </div>
  );
}

const VIDEO_URL = '';

// ─── Ícones reutilizáveis ────────────────────────────────────────────────────

const iconCalendar = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0F766E" strokeWidth="1.8">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const iconChat = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0F766E" strokeWidth="1.8">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);
const iconTarget = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0F766E" strokeWidth="1.8">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);

// ─── Seções ──────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="flex flex-col items-center text-center px-5 pt-8 pb-12">
      <div className="flex items-center gap-3 mb-6">
        <img src="/student-project-dashboard/logolaboracolorido.svg" alt="Labora" className="h-8" />
        <span className="text-gray-300 text-xl font-light">+</span>
        <img src="/student-project-dashboard/etglogo.png" alt="ETG" className="h-8 object-contain" />
      </div>
      <div className="w-full rounded-2xl overflow-hidden mb-8">
        <img src="/student-project-dashboard/fotolp.jpg" alt="" className="w-full object-cover" />
      </div>
      <div className="inline-flex items-center px-4 py-1.5 border border-[#0F766E]/40 rounded-full text-xs text-[#0F766E] mb-8">
        Plataforma de Desafios Reais
      </div>
      <h1 className="text-3xl font-semibold text-gray-900 mb-3 leading-snug">
        Sua empresa tem um problema real.
      </h1>
      <h2 className="text-3xl font-bold italic text-[#0F766E] leading-snug mb-6">
        Nossos alunos têm o semestre inteiro para resolvê-lo.
      </h2>
      <p className="text-sm text-gray-500 leading-relaxed mb-8">
        A Labora conecta empresas a turmas de ensino técnico. Você propõe um desafio, um professor orienta, e grupos de alunos entregam uma solução — dentro da sala de aula, sem custo operacional para você.
      </p>
      <button onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })}
        className="flex items-center gap-2 px-6 py-3.5 bg-[#0F766E] text-white rounded-xl text-sm font-medium hover:bg-[#0D6560] transition-colors mb-4">
        → Quero propor um desafio
      </button>
      <p className="text-xs text-gray-400 flex items-center gap-1.5">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
        Sem compromisso. Seu desafio passa por curadoria antes de qualquer avanço.
      </p>
    </section>
  );
}

function VideoSection() {
  return (
    <section className="px-5 pb-14">
      <div className="relative w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-200" style={{ aspectRatio: '16/9' }}>
        {VIDEO_URL ? (
          <iframe src={VIDEO_URL} className="absolute inset-0 w-full h-full" allow="autoplay; fullscreen" allowFullScreen />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-[#0F766E]/10 border border-[#0F766E]/20 flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#0F766E"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ComoFunciona() {
  const passos = [
    { num: '1', titulo: 'Você cadastra um desafio', desc: 'Preenche um briefing estruturado: contexto do problema, dados disponíveis e o que espera como entrega.',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F766E" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg> },
    { num: '2', titulo: 'A Labora faz a curadoria', desc: 'Nossa equipe avalia se o desafio é viável, adequado ao nível acadêmico e tem potencial de entrega real.',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F766E" strokeWidth="1.8"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> },
    { num: '3', titulo: 'Um professor escolhe seu desafio', desc: 'O professor vincula o desafio à disciplina, alinha expectativas com você e define o cronograma.',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F766E" strokeWidth="1.8"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg> },
    { num: '4', titulo: 'Os alunos desenvolvem a solução', desc: 'Em grupos, ao longo do semestre, com entregas parciais, orientação do professor e acompanhamento pelo painel.',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F766E" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
    { num: '5', titulo: 'Você avalia e descobre talentos', desc: 'Participa de uma validação parcial e da banca final. Ao encerrar, acessa os perfis dos alunos para oportunidades reais.',
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F766E" strokeWidth="1.8"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
  ];
  return (
    <section className="px-5 pb-14">
      <div className="mb-2 flex items-center gap-1.5">
        <div className="h-0.5 w-6 rounded-full bg-[#34D399]"/>
        <span className="text-xs font-medium text-[#0F766E]">Como funciona</span>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-1 leading-snug">Em 5 passos</h2>
      <p className="text-sm text-gray-500 mb-6">
        <span className="text-[#0F766E]">Simples para você.</span> Estruturado para eles.
      </p>
      <div className="space-y-3">
        {passos.map(p => (
          <div key={p.num} className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              {p.icon}
              <span className="text-xs font-semibold text-[#0F766E]">{p.num}</span>
            </div>
            <div className="font-semibold text-gray-900 text-sm mb-1">{p.titulo}</div>
            <div className="text-xs text-gray-500 leading-relaxed">{p.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function OQueVoceGanha() {
  const itens = [
    { titulo: 'Perspectivas frescas sobre um problema real', desc: 'Grupos diferentes abordam o mesmo desafio com visões distintas. Você recebe múltiplas soluções ao final.',
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg> },
    { titulo: 'Acesso antecipado a talentos qualificados', desc: 'Veja quem se destacou antes de contratar. O banco de talentos exibe perfil, nota e avaliação dos alunos.',
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> },
    { titulo: 'Entregável aplicável', desc: 'Soluções documentadas, laudos técnicos, protótipos ou propostas — com potencial real de implementação.',
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg> },
    { titulo: 'Alto valor, baixo esforço', desc: 'Você participa em momentos pontuais. Sem acompanhar aluno por aluno, sem treinamento, sem custo operacional.',
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
  ];
  return (
    <section className="px-5 pb-14" style={{ background: 'linear-gradient(135deg, #0F766E, #3B82F6)' }}>
      <div className="pt-10 mb-6">
        <div className="mb-2 flex items-center gap-1.5">
          <div className="h-0.5 w-6 rounded-full bg-[#34D399]"/>
          <span className="text-xs font-medium text-white/80">Benefícios</span>
        </div>
        <h2 className="text-2xl font-bold text-white leading-snug">O que você ganha — além da solução</h2>
      </div>
      <div className="space-y-3 mb-8">
        {itens.map((item, i) => (
          <div key={i} className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl p-4">
            <div className="mb-3">{item.icon}</div>
            <div className="font-semibold text-white text-sm mb-1">{item.titulo}</div>
            <div className="text-xs text-white/70 leading-relaxed">{item.desc}</div>
          </div>
        ))}
      </div>
      <button onClick={() => document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' })}
        className="w-full flex items-center justify-center gap-2 py-3.5 bg-white text-[#0F766E] rounded-xl text-sm font-semibold hover:bg-white/90 transition-colors">
        → Quero propor um desafio
      </button>
    </section>
  );
}

function DentroDaSalaDeAula() {
  const itens = [
    { titulo: 'Em um semestre', desc: 'O projeto tem duração de um módulo ou disciplina — tipicamente 16 semanas, com marcos e entregas definidos.', icon: iconCalendar },
    { titulo: 'Em grupo', desc: 'Times de 3 a 6 alunos trabalham juntos, com papéis definidos e registro de progresso dentro da plataforma.',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0F766E" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
    { titulo: 'Com um professor orientando', desc: 'O professor é o mediador entre você e os alunos. Ele adapta o briefing, acompanha as entregas e conduz a banca final.',
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0F766E" strokeWidth="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg> },
  ];
  return (
    <section className="px-5 pb-14 pt-10">
      <div className="mb-2 flex items-center gap-1.5">
        <div className="h-0.5 w-6 rounded-full bg-[#34D399]"/>
        <span className="text-xs font-medium text-[#0F766E]">Dentro da sala de aula</span>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-1 leading-snug">Como acontece na prática</h2>
      <p className="text-sm text-gray-500 mb-6">Seu desafio entra na grade curricular de uma turma real.</p>
      <div className="space-y-4">
        {itens.map((item, i) => (
          <div key={i} className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-xl">
            <div className="w-10 h-10 rounded-xl bg-[#0F766E]/8 flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(15,118,110,0.08)' }}>
              {item.icon}
            </div>
            <div>
              <div className="font-semibold text-gray-900 text-sm mb-1">{item.titulo}</div>
              <div className="text-xs text-gray-500 leading-relaxed">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function DesafioIdeal() {
  const bom = ['Tem um problema claro e bem delimitado','Pode ser desenvolvido em 12 a 16 semanas','É adequado ao nível técnico dos alunos','Conta com dados ou contexto que você pode compartilhar','Tem uma entrega específica e verificável (relatório, protótipo, plano, checklist, proposta)'];
  const nao = ['Depende de acesso a sistemas críticos ou informações altamente sensíveis','É urgente para a operação da empresa','Exige conhecimento especializado fora do escopo do curso','Não tem critério claro de sucesso','Requer envolvimento intenso da equipe da empresa'];
  return (
    <section className="px-5 pb-14 bg-gray-50 pt-10">
      <div className="mb-2 flex items-center gap-1.5">
        <div className="h-0.5 w-6 rounded-full bg-[#34D399]"/>
        <span className="text-xs font-medium text-[#0F766E]">Critérios</span>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-1 leading-snug">O que é um desafio ideal?</h2>
      <p className="text-sm text-gray-500 mb-6 leading-relaxed">Para garantir que os alunos possam entregar algo com valor real, trabalhamos com desafios que respeitam esses critérios.</p>
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F766E" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          <span className="font-semibold text-gray-900 text-sm">Um bom desafio:</span>
        </div>
        <div className="space-y-2.5">
          {bom.map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0F766E" strokeWidth="2" className="flex-shrink-0 mt-0.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              <span className="text-xs text-gray-600 leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-5">
        <div className="flex items-center gap-2 mb-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
          <span className="font-semibold text-gray-900 text-sm">Não é adequado:</span>
        </div>
        <div className="space-y-2.5">
          {nao.map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" className="flex-shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
              <span className="text-xs text-gray-600 leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs text-[#0F766E] italic text-center leading-relaxed">Não tem certeza se seu desafio se encaixa? Nossa equipe avalia e te orienta antes de qualquer compromisso.</p>
    </section>
  );
}

function OQueEsperamos() {
  const itens = [
    { titulo: 'Estar disponível em 2 momentos-chave', desc: 'Validação parcial (semana 13) e banca final (semana 16). Presença presencial ou remota.', icon: iconCalendar },
    { titulo: 'Dar contexto e feedback', desc: 'Compartilhar dados relevantes no início e responder às dúvidas do professor durante o projeto.', icon: iconChat },
    { titulo: 'Calibrar expectativas', desc: 'A entrega é acadêmica — mas estruturada. Não espere nível sênior, mas espere comprometimento, método e visão fresca.', icon: iconTarget },
  ];
  return (
    <section className="px-5 pb-14 pt-10">
      <div className="mb-2 flex items-center gap-1.5">
        <div className="h-0.5 w-6 rounded-full bg-[#34D399]"/>
        <span className="text-xs font-medium text-[#0F766E]">Sua parte</span>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-1 leading-snug">O que esperamos de você</h2>
      <p className="text-sm text-gray-500 mb-6">Sua participação é leve — mas essencial.</p>
      <div className="space-y-3">
        {itens.map((item, i) => (
          <div key={i} className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-xl">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(15,118,110,0.08)' }}>
              {item.icon}
            </div>
            <div>
              <div className="font-semibold text-gray-900 text-sm mb-1">{item.titulo}</div>
              <div className="text-xs text-gray-500 leading-relaxed">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ExemploReal() {
  return (
    <section className="px-5 pb-14 bg-gray-50 pt-10">
      <div className="mb-2 flex items-center gap-1.5">
        <div className="h-0.5 w-6 rounded-full bg-[#34D399]"/>
        <span className="text-xs font-medium text-[#0F766E]">Caso real</span>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 leading-snug">Veja um exemplo de como funciona</h2>
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-[#0F766E]/10 flex items-center justify-center flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0F766E" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8"/></svg>
          </div>
          <div>
            <div className="font-semibold text-gray-900 text-sm">SafeLab — Laboratório Sabin</div>
            <div className="text-xs text-gray-400">Segurança do Trabalho · 2024.2</div>
          </div>
        </div>
        <div className="space-y-4 mb-4">
          {[
            { label: 'DESAFIO PROPOSTO', text: 'Mapear e mitigar riscos ocupacionais no processo de coleta de material biológico em unidades de alto volume.' },
            { label: 'O QUE A EMPRESA FORNECEU', text: 'Relatório de inspeção interna, fichas de EPI, planta baixa das unidades e 2h de reunião inicial com o professor.' },
            { label: 'O QUE OS ALUNOS ENTREGARAM', text: 'Programa de Prevenção de Riscos Biológicos (PPRB) completo, com checklist NR-32 e fluxograma de resposta a acidentes.' },
          ].map((item, i) => (
            <div key={i}>
              <div className="text-xs font-semibold text-gray-400 tracking-wide mb-1">{item.label}</div>
              <p className="text-xs text-gray-700 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-100 pt-4">
          <div className="text-xs font-semibold text-gray-400 tracking-wide mb-3">RESULTADO</div>
          {['2 grupos tiveram propostas aprovadas para implementação piloto.','1 aluno recebeu contato para estágio pela empresa parceira.'].map((r, i) => (
            <div key={i} className="flex items-start gap-2 mb-2">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0F766E" strokeWidth="2.5" className="flex-shrink-0 mt-0.5"><path d="M20 6L9 17l-5-5"/></svg>
              <span className="text-xs text-gray-700 leading-relaxed">{r}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FormularioDesafio() {
  const areas = ['Segurança do Trabalho','Saúde','Tecnologia','Logística','Administração','Meio Ambiente','Outro'];
  return (
    <section id="formulario" className="px-5 pb-20 pt-10">
      <div className="bg-[#0F766E]/8 border border-[#0F766E]/20 rounded-2xl p-5 mb-6"
        style={{ background: 'rgba(15,118,110,0.06)' }}>
        <h2 className="text-xl font-bold text-gray-900 leading-snug mb-2">
          Sua empresa tem um problema que a sala de aula pode resolver.
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed mb-3">
          Conta pra gente o que você tem em mente. Nossa equipe avalia se o desafio se encaixa e entra em contato — sem burocracia, sem compromisso.
        </p>
        <p className="text-xs text-[#0F766E] italic">
          Não precisa ter tudo definido. Um parágrafo já é suficiente para começarmos.
        </p>
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl p-5">
        <div className="text-xs font-bold tracking-widest mb-5 text-[#0F766E]">PROPOSTA INICIAL DE DESAFIO</div>
        <div className="space-y-4">
          {[
            { label: 'Nome completo', placeholder: 'Seu nome', type: 'text' },
            { label: 'E-mail corporativo', placeholder: 'voce@empresa.com.br', type: 'email' },
            { label: 'Empresa', placeholder: 'Nome da empresa', type: 'text' },
          ].map(f => (
            <div key={f.label}>
              <label className="text-sm font-medium text-gray-900 block mb-1">{f.label}</label>
              <input type={f.type} placeholder={f.placeholder}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0F766E]" />
            </div>
          ))}
          <div>
            <label className="text-sm font-medium text-gray-900 block mb-1">Área do desafio</label>
            <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-500 focus:outline-none focus:border-[#0F766E] bg-white">
              <option value="">Selecione uma área</option>
              {areas.map(a => <option key={a}>{a}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-900 block mb-2">Seu desafio tem urgência operacional?</label>
            {['Sim','Não','Não tenho certeza'].map(op => (
              <label key={op} className="flex items-center gap-2 mb-2 cursor-pointer">
                <input type="radio" name="urgencia" className="w-4 h-4 accent-[#0F766E]"/>
                <span className="text-sm text-gray-700">{op}</span>
              </label>
            ))}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-900 block mb-1">Descreva o problema em 2 ou 3 frases</label>
            <textarea rows={4} placeholder="Ex: Temos dificuldade em mapear riscos em nosso processo de coleta..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0F766E] resize-none"/>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Não compartilhe informações confidenciais aqui. Os detalhes serão alinhados com sigilo após a curadoria.
          </p>
          <button className="w-full py-4 rounded-xl bg-[#0F766E] text-white font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#0D6560] transition-colors">
            → Enviar proposta
          </button>
          <p className="text-xs text-gray-400 text-center">Nossa equipe responde em até 2 dias úteis.</p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const nav = ['Como funciona','Para empresas','Para professores','Para alunos','Contato'];
  return (
    <footer className="px-5 pt-8 pb-8 bg-gray-50 border-t border-gray-200">
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-2">
          <img src="/student-project-dashboard/logolaboracolorido.svg" alt="Labora" className="h-7" />
          <span className="text-gray-300 text-lg font-light">+</span>
          <img src="/student-project-dashboard/etglogo.png" alt="ETG" className="h-7 object-contain" />
        </div>
        <p className="text-xs text-gray-500 leading-relaxed">
          Conectando empresas com desafios reais a estudantes qualificados.
        </p>
      </div>
      <div className="mb-5">
        <div className="text-xs font-bold tracking-widest text-[#0F766E] mb-2">NAVEGAÇÃO</div>
        <div className="space-y-1.5">
          {nav.map(item => <div key={item} className="text-sm text-gray-600 cursor-pointer">{item}</div>)}
        </div>
      </div>
      <div className="mb-6">
        <div className="text-xs font-bold tracking-widest text-[#0F766E] mb-2">REDES SOCIAIS</div>
        <div className="flex gap-2">
          {[
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>,
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>,
            <><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></>,
            <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
          ].map((d, i) => (
            <button key={i} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-[#0F766E] transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.8">{d}</svg>
            </button>
          ))}
        </div>
      </div>
      <div className="border-t border-gray-200 pt-4">
        <p className="text-xs text-gray-400 text-center">© 2025 Labora. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
