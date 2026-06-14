import { useState, useEffect, useRef } from 'react';

export default function LandingPage() {
  return (
    <div className="@container w-full bg-white font-['Poppins',sans-serif]">
      <Hero />
      <VideoSection />
      <ComoFunciona />
      <OQueVoceGanha />
      <DesafioIdeal />
      <div className="@container">
        <div className="@[640px]:grid @[640px]:grid-cols-2 @[640px]:divide-x @[640px]:divide-gray-100">
          <DentroDaSalaDeAula />
          <OQueEsperamos />
        </div>
      </div>
      <ExemploReal />
      <FormularioDesafio />
      <Footer />
    </div>
  );
}

const VIDEO_URL = 'https://www.youtube.com/embed/69AnLTdCSfY?si=7QskdVHIrsbJexmV&controls=0';

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
    <section className="flex flex-col items-center text-center px-5 @[640px]:px-24 pt-24 pb-24">
      <div className="flex items-center gap-3 mb-6">
        <img src="/student-project-dashboard/logolaboracolorido.svg" alt="Labora" className="h-8" />
        <span className="text-gray-300 text-xl font-light">+</span>
        <img src="/student-project-dashboard/etglogo.png" alt="ETG" className="h-8 object-contain" />
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
      <p className="text-sm text-gray-500 leading-relaxed mb-8 max-w-xl">
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
    <section className="px-5 @[640px]:px-24 pb-24 flex justify-center">
      <div className="relative rounded-2xl overflow-hidden bg-gray-100 border border-gray-200" style={{ aspectRatio: '16/9', width: '80%' }}>
        {VIDEO_URL ? (
          <iframe src={VIDEO_URL} className="absolute inset-0 w-full h-full" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
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
    <section className="@container px-5 @[640px]:px-24 pb-20">
      <div className="mb-2 flex items-center gap-1.5">
        <div className="h-0.5 w-6 rounded-full bg-[#34D399]"/>
        <span className="text-xs font-medium text-[#0F766E]">Como funciona</span>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-1 leading-snug">Em 5 passos</h2>
      <p className="text-sm text-gray-500 mb-6">
        <span className="text-[#0F766E]">Simples para você.</span> Estruturado para eles.
      </p>

      {/* Desktop: horizontal (container >= 640px) */}
      <div className="relative hidden @[640px]:flex items-start">
        <div className="absolute top-5 left-5 right-0 h-0.5 bg-gradient-to-r from-[#0F766E] to-[#34D399]" />
        {passos.map((p) => (
          <div key={p.num} className="relative flex flex-col items-start flex-1 pr-4">
            <div className="relative z-10 w-10 h-10 rounded-full bg-white border-2 border-[#0F766E] flex items-center justify-center shadow-sm mb-3 flex-shrink-0">
              {p.icon}
            </div>
            <span className="text-xs font-bold text-[#0F766E] px-2 py-0.5 rounded-full mb-2 inline-block" style={{ background: 'rgba(15,118,110,0.08)' }}>
              Passo {p.num}
            </span>
            <div className="font-semibold text-gray-900 text-sm mb-1 text-left">{p.titulo}</div>
            <div className="text-xs text-gray-500 leading-relaxed text-left">{p.desc}</div>
          </div>
        ))}
      </div>

      {/* Mobile: vertical (container < 640px) */}
      <div className="relative @[640px]:hidden">
        <div className="absolute left-[19px] top-5 bottom-5 w-0.5 bg-gradient-to-b from-[#0F766E] to-[#34D399]" />
        <div className="space-y-0">
          {passos.map((p) => (
            <div key={p.num} className="relative flex gap-5 pb-8 last:pb-0">
              <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-white border-2 border-[#0F766E] flex items-center justify-center shadow-sm">
                {p.icon}
              </div>
              <div className="flex-1 pt-1.5">
                <span className="text-xs font-bold text-[#0F766E] px-2 py-0.5 rounded-full mb-1 inline-block" style={{ background: 'rgba(15,118,110,0.08)' }}>
                  Passo {p.num}
                </span>
                <div className="font-semibold text-gray-900 text-sm mb-1">{p.titulo}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
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
    <section className="px-5 @[640px]:px-24 pb-14" style={{ background: 'linear-gradient(135deg, #0F766E, #3B82F6)' }}>
      <div className="pt-24 mb-6">
        <div className="mb-2 flex items-center gap-1.5">
          <div className="h-0.5 w-6 rounded-full bg-[#34D399]"/>
          <span className="text-xs font-medium text-white/80">Benefícios</span>
        </div>
        <h2 className="text-2xl font-bold text-white leading-snug">O que você ganha — além da solução</h2>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-8">
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
    <section className="px-5 @[640px]:px-24 pb-24 pt-24">
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
    <section className="px-5 @[640px]:px-24 pb-14 bg-gray-50 pt-10">
      <div className="mb-2 flex items-center gap-1.5">
        <div className="h-0.5 w-6 rounded-full bg-[#34D399]"/>
        <span className="text-xs font-medium text-[#0F766E]">Critérios</span>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-1 leading-snug">O que é um desafio ideal?</h2>
      <p className="text-sm text-gray-500 mb-6 leading-relaxed">Para garantir que os alunos possam entregar algo com valor real, trabalhamos com desafios que respeitam esses critérios.</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
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
        <div className="bg-white border border-gray-200 rounded-xl p-4">
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
      </div>
      <p className="text-xs text-[#0F766E] italic text-center leading-relaxed mt-5">Não tem certeza se seu desafio se encaixa? Nossa equipe avalia e te orienta antes de qualquer compromisso.</p>
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
    <section className="@container px-5 @[640px]:px-24 pb-24 pt-24" style={{ background: 'rgba(15,118,110,0.05)' }}>
      <div className="mb-2 flex items-center gap-1.5">
        <div className="h-0.5 w-6 rounded-full bg-[#34D399]"/>
        <span className="text-xs font-medium text-[#0F766E]">Sua parte</span>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-1 leading-snug">O que esperamos de você</h2>
      <p className="text-sm text-gray-500 mb-6">Sua participação é leve — mas essencial.</p>
      <div className="space-y-3">
        {itens.map((item, i) => (
          <div key={i} className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-xl">
            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: 'rgba(15,118,110,0.1)' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0F766E" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
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
    <section className="@container px-5 @[640px]:px-24 pb-14 bg-gray-50 pt-10">
      <div className="mb-2 flex items-center gap-1.5">
        <div className="h-0.5 w-6 rounded-full bg-[#34D399]"/>
        <span className="text-xs font-medium text-[#0F766E]">Caso real</span>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 leading-snug">Veja exemplos de como funciona</h2>
      <div className="flex gap-4 overflow-x-auto pb-2 @[640px]:grid @[640px]:grid-cols-3 @[640px]:overflow-x-visible" style={{ scrollbarWidth: 'none' }}>
        {[
          {
            icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0F766E" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8"/></svg>,
            titulo: 'SafeLab — Laboratório Sabin',
            sub: 'Segurança do Trabalho · 2024.2',
            cor: '#0F766E',
            itens: [
              { label: 'DESAFIO PROPOSTO', text: 'Mapear e mitigar riscos ocupacionais no processo de coleta de material biológico em unidades de alto volume.' },
              { label: 'O QUE A EMPRESA FORNECEU', text: 'Relatório de inspeção interna, fichas de EPI, planta baixa das unidades e 2h de reunião inicial com o professor.' },
              { label: 'O QUE OS ALUNOS ENTREGARAM', text: 'Programa de Prevenção de Riscos Biológicos (PPRB) completo, com checklist NR-32 e fluxograma de resposta a acidentes.' },
            ],
            resultados: ['2 grupos tiveram propostas aprovadas para implementação piloto.', '1 aluno recebeu contato para estágio pela empresa parceira.'],
          },
          {
            icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
            titulo: 'Casa Viva — Arquitetura e Interiores',
            sub: 'Design de Interiores · 2024.1',
            cor: '#3B82F6',
            itens: [
              { label: 'DESAFIO PROPOSTO', text: 'Propor um projeto de requalificação de espaços comerciais para melhorar a experiência do cliente em lojas de varejo.' },
              { label: 'O QUE A EMPRESA FORNECEU', text: 'Plantas baixas das unidades, briefing de identidade visual da marca e visita guiada a 2 lojas com o gestor.' },
              { label: 'O QUE OS ALUNOS ENTREGARAM', text: 'Projeto de interiores com moodboard, paleta de materiais, perspectivas 3D e memorial descritivo completo.' },
            ],
            resultados: ['Projeto de 1 grupo aprovado para execução em loja piloto.', '2 alunas receberam convite para portfólio colaborativo da empresa.'],
          },
          {
            icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
            titulo: 'Imagem Clínica — Rede de Diagnóstico',
            sub: 'Radiologia · 2024.2',
            cor: '#7C3AED',
            itens: [
              { label: 'DESAFIO PROPOSTO', text: 'Desenvolver um protocolo de orientação ao paciente para reduzir retrabalho em exames de imagem por preparo inadequado.' },
              { label: 'O QUE A EMPRESA FORNECEU', text: 'Dados de taxa de rejeição de exames, fluxo de atendimento atual e acesso à equipe técnica para entrevistas.' },
              { label: 'O QUE OS ALUNOS ENTREGARAM', text: 'Protocolo de orientação com material educativo ilustrado, checklist pré-exame e guia de treinamento para recepcionistas.' },
            ],
            resultados: ['Taxa de rejeição de exames caiu 28% nas unidades teste.', '1 aluno foi contratado como estagiário técnico após apresentação na banca.'],
          },
        ].map((card, idx) => (
          <div key={idx} className="bg-white border border-gray-200 rounded-xl p-5 flex-shrink-0 w-[300px] @[640px]:w-auto @[640px]:flex-shrink">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${card.cor}18` }}>
                {card.icon}
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">{card.titulo}</div>
                <div className="text-xs text-gray-400">{card.sub}</div>
              </div>
            </div>
            <div className="space-y-4 mb-4">
              {card.itens.map((item, i) => (
                <div key={i}>
                  <div className="text-xs font-semibold text-gray-400 tracking-wide mb-1">{item.label}</div>
                  <p className="text-xs text-gray-700 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-4">
              <div className="text-xs font-semibold text-gray-400 tracking-wide mb-3">RESULTADO</div>
              {card.resultados.map((r, i) => (
                <div key={i} className="flex items-start gap-2 mb-2">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={card.cor} strokeWidth="2.5" className="flex-shrink-0 mt-0.5"><path d="M20 6L9 17l-5-5"/></svg>
                  <span className="text-xs text-gray-700 leading-relaxed">{r}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FormularioDesafio() {
  const areas = ['Segurança do Trabalho','Saúde','Tecnologia','Logística','Administração','Meio Ambiente','Outro'];
  return (
    <section id="formulario" className="@container">
      <div className="@[640px]:grid @[640px]:grid-cols-2">

        {/* Coluna esquerda — texto com fundo verde */}
        <div className="flex flex-col"
          style={{ background: 'linear-gradient(135deg, #0F766E, #3B82F6)' }}>
          <div className="px-10 pt-16 pb-8">
            <img src="/student-project-dashboard/laboralogobranco.svg" alt="Labora" className="h-8 mb-8" />
            <h2 className="text-2xl font-bold text-white leading-snug mb-4">
              Sua empresa tem um problema que a sala de aula pode resolver.
            </h2>
            <p className="text-sm text-white/80 leading-relaxed mb-5">
              Conta pra gente o que você tem em mente. Nossa equipe avalia se o desafio se encaixa e entra em contato — sem burocracia, sem compromisso.
            </p>
            <p className="text-sm text-white/60 italic">
              Não precisa ter tudo definido. Um parágrafo já é suficiente para começarmos.
            </p>
          </div>
          <img src="/student-project-dashboard/fotolp.jpg" alt="" className="w-full flex-1 object-cover object-top" />
        </div>

        {/* Coluna direita — formulário */}
        <div className="px-5 @[640px]:px-10 pt-10 pb-10 bg-white">
          <div className="text-xs font-bold tracking-widest mb-5 text-[#0F766E]">PROPOSTA INICIAL DE DESAFIO</div>
          <div className="space-y-4">
            {/* 2 colunas × 2 linhas */}
            <div className="grid grid-cols-1 @[500px]:grid-cols-2 gap-4">
              {[
                { label: 'Nome completo', placeholder: 'Seu nome', type: 'text' },
                { label: 'E-mail corporativo', placeholder: 'voce@empresa.com.br', type: 'email' },
                { label: 'Empresa', placeholder: 'Nome da empresa', type: 'text' },
                { label: 'Área do desafio', placeholder: '', type: 'select' },
              ].map(f => (
                <div key={f.label}>
                  <label className="text-sm font-medium text-gray-900 block mb-1">{f.label}</label>
                  {f.type === 'select' ? (
                    <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-500 focus:outline-none focus:border-[#0F766E] bg-white">
                      <option value="">Selecione uma área</option>
                      {areas.map(a => <option key={a}>{a}</option>)}
                    </select>
                  ) : (
                    <input type={f.type} placeholder={f.placeholder}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#0F766E]" />
                  )}
                </div>
              ))}
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

      </div>
    </section>
  );
}

function Footer() {
  const nav = ['Como funciona','Para empresas','Para professores','Para alunos','Contato'];
  return (
    <footer className="px-5 @[640px]:px-24 pt-8 pb-8 bg-gray-50 border-t border-gray-200">
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

// ─── ChatBot ────────────────────────────────────────────────────────────────

type MsgAutor = 'bot' | 'usuario';
interface Msg {
  id: number;
  autor: MsgAutor;
  texto: string;
  opcoes?: string[];
  input?: boolean;
}

const fluxo: Omit<Msg, 'id'>[] = [
  {
    autor: 'bot',
    texto: 'Olá! Sou o assistente da Labora 👋\nVou te ajudar a descobrir se sua empresa tem um desafio ideal para nossos alunos. Leva menos de 2 minutos!',
    opcoes: ['Sim, vamos lá!', 'Agora não'],
  },
  {
    autor: 'bot',
    texto: 'Qual área da empresa tem o desafio?',
    opcoes: ['Segurança do Trabalho', 'Saúde', 'Tecnologia', 'Design / Interiores', 'Outra área'],
  },
  {
    autor: 'bot',
    texto: 'Em quanto tempo você precisa de um resultado?',
    opcoes: ['Até 4 meses', 'De 4 a 6 meses', 'Mais de 6 meses', 'Sem prazo definido'],
  },
  {
    autor: 'bot',
    texto: 'O desafio envolve dados sigilosos ou sistemas críticos da operação?',
    opcoes: ['Não, é tranquilo', 'Parcialmente', 'Sim, envolve dados sensíveis'],
  },
  {
    autor: 'bot',
    texto: 'Você já tem ideia do que espera receber ao final do projeto?',
    opcoes: ['Sim, tenho claro', 'Tenho uma ideia geral', 'Ainda não sei'],
  },
  {
    autor: 'bot',
    texto: 'Ótimo! Descreva em uma frase o problema que você quer resolver:',
    input: true,
  },
];

function diagnostico(respostas: string[]): string {
  const sensivel = respostas[3] === 'Sim, envolve dados sensíveis';
  const prazoOk = respostas[2] !== 'Até 4 meses';
  const entregaClara = respostas[4] === 'Sim, tenho claro' || respostas[4] === 'Tenho uma ideia geral';

  if (sensivel) {
    return 'Seu desafio tem potencial, mas o ponto de dados sensíveis merece atenção. Nossa equipe pode te orientar sobre como adaptar o escopo para que os alunos consigam trabalhar com segurança. 🔒';
  }
  if (!prazoOk) {
    return 'Desafios com prazo muito curto costumam gerar projetos superficiais. Mas não se preocupe — nossa equipe pode te ajudar a calibrar o escopo para caber num semestre. 📅';
  }
  if (entregaClara) {
    return 'Ótima notícia! Seu desafio tem tudo para dar certo: problema claro, prazo viável e entrega definida. Esse é exatamente o perfil que os alunos precisam para entregar algo com valor real. 🎯';
  }
  return 'Seu desafio tem potencial! Com um pouco de refinamento na entrega esperada, conseguimos encaixá-lo perfeitamente num semestre. Nossa equipe pode te ajudar nessa etapa. ✨';
}

export function ChatBot({ posicao = 'absolute' }: { posicao?: 'absolute' | 'fixed' }) {
  const [aberto, setAberto] = useState(false);
  const [notificacao, setNotificacao] = useState(true);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [etapa, setEtapa] = useState(0);
  const [respostas, setRespostas] = useState<string[]>([]);
  const [inputTexto, setInputTexto] = useState('');
  const [finalizado, setFinalizado] = useState(false);
  const [digitando, setDigitando] = useState(false);
  const fimRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);

  const novaId = () => ++idRef.current;

  useEffect(() => {
    if (aberto && msgs.length === 0) {
      adicionarBotMsg(0);
    }
  }, [aberto]);

  useEffect(() => {
    fimRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, digitando]);

  function adicionarBotMsg(idx: number) {
    if (idx >= fluxo.length) return;
    setDigitando(true);
    setTimeout(() => {
      setDigitando(false);
      const f = fluxo[idx];
      setMsgs(prev => [...prev, { ...f, id: novaId() }]);
    }, 900);
  }

  function responder(texto: string) {
    const novasRespostas = [...respostas, texto];
    setRespostas(novasRespostas);
    setMsgs(prev => [...prev, { id: novaId(), autor: 'usuario', texto }]);

    if (etapa === 0 && texto === 'Agora não') {
      setTimeout(() => {
        setMsgs(prev => [...prev, {
          id: novaId(), autor: 'bot',
          texto: 'Sem problema! Quando quiser, é só me chamar. Fique à vontade para explorar a página. 😊',
        }]);
        setFinalizado(true);
      }, 900);
      return;
    }

    const proxEtapa = etapa + 1;
    setEtapa(proxEtapa);

    if (proxEtapa >= fluxo.length) {
      setDigitando(true);
      setTimeout(() => {
        setDigitando(false);
        const resultado = diagnostico(novasRespostas);
        setMsgs(prev => [...prev, { id: novaId(), autor: 'bot', texto: resultado }]);
        setTimeout(() => {
          setMsgs(prev => [...prev, {
            id: novaId(), autor: 'bot',
            texto: 'Que tal preencher o formulário agora? Nossa equipe vai analisar o seu desafio e entra em contato em até 2 dias úteis. 🚀',
            opcoes: ['Preencher o formulário'],
          }]);
          setFinalizado(true);
        }, 1200);
      }, 1000);
    } else {
      adicionarBotMsg(proxEtapa);
    }
  }

  function enviarInput() {
    if (!inputTexto.trim()) return;
    responder(inputTexto.trim());
    setInputTexto('');
  }

  function irParaFormulario() {
    setAberto(false);
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className={`${posicao} bottom-0 left-0 right-0 z-50 flex flex-col items-end px-4 pb-4 pointer-events-none`} style={{}}>
      {/* Chat panel */}
      {aberto && (
        <div className="pointer-events-auto flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden mb-3 w-full max-w-[360px]" style={{ height: '75vh' }}>
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0" style={{ background: 'linear-gradient(to right, #0F766E, #3B82F6)' }}>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <img src="/student-project-dashboard/favicon.svg" alt="Labora" className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="text-white text-sm font-semibold leading-tight">Assistente Labora</div>
              <div className="text-white/70 text-xs">Online agora</div>
            </div>
            <button onClick={() => setAberto(false)} className="text-white/70 hover:text-white pointer-events-auto">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Mensagens */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-4 space-y-3 bg-gray-50">
            {msgs.map(msg => (
              <div key={msg.id} className={`flex flex-col ${msg.autor === 'usuario' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[80%] px-3 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                  msg.autor === 'bot'
                    ? 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm'
                    : 'text-white rounded-tr-sm'
                }`} style={msg.autor === 'usuario' ? { background: 'linear-gradient(135deg, #0F766E, #3B82F6)' } : {}}>
                  {msg.texto}
                </div>
                {msg.opcoes && (
                  <div className="flex flex-col gap-1.5 mt-2 w-full min-w-0">
                    {msg.opcoes.map(op => (
                      <button
                        key={op}
                        onClick={() => op === 'Preencher o formulário' ? irParaFormulario() : responder(op)}
                        disabled={etapa > fluxo.indexOf(fluxo.find(f => f.opcoes?.includes(op))!) || finalizado && op !== 'Preencher o formulário'}
                        className="pointer-events-auto text-left px-3 py-2 rounded-xl text-sm border border-[#0F766E] text-[#0F766E] bg-white hover:bg-[#0F766E]/5 transition-colors disabled:opacity-40 disabled:cursor-default"
                      >
                        {op}
                      </button>
                    ))}
                  </div>
                )}
                {msg.input && etapa === fluxo.indexOf(fluxo.find(f => f.input)!) && (
                  <div className="flex gap-2 mt-2 w-full min-w-0 pointer-events-auto">
                    <input
                      value={inputTexto}
                      onChange={e => setInputTexto(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && enviarInput()}
                      placeholder="Digite aqui..."
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0F766E] bg-white"
                    />
                    <button onClick={enviarInput} className="px-3 py-2 rounded-xl text-white text-sm" style={{ background: 'linear-gradient(135deg, #0F766E, #3B82F6)' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                    </button>
                  </div>
                )}
              </div>
            ))}
            {digitando && (
              <div className="flex items-start">
                <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={fimRef} />
          </div>
        </div>
      )}

      {/* Botão flutuante */}
      <button
        onClick={() => { setAberto(v => !v); setNotificacao(false); }}
        className="pointer-events-auto relative w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 active:scale-95 flex-shrink-0"
        style={{ background: 'linear-gradient(135deg, #0F766E, #3B82F6)' }}
      >
        {aberto ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        )}
        {notificacao && !aberto && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</span>
        )}
      </button>
    </div>
  );
}
