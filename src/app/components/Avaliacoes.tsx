import { useState } from 'react';

export default function Avaliacoes({ onNavigate, isMobile }: { onNavigate: (view: string) => void; isMobile?: boolean }) {
  const [aba, setAba] = useState<'professor' | 'empresa'>('professor');

  return (
    <div className={isMobile ? 'w-full h-full flex flex-col' : 'flex items-center justify-center min-h-full'}>
      <div className={`bg-white relative flex flex-col ${isMobile ? 'w-full h-full' : 'w-[375px] h-[812px]'}`}>
        <Header onBack={() => onNavigate('t1')} />
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 pt-4 pb-20">
            <p className="text-xs text-gray-400 mb-4">SafeLab — Semestre 2026/1</p>
            <Tabs aba={aba} onAba={setAba} />
            {aba === 'professor' ? <TabProfessor /> : <TabEmpresa />}
          </div>
        </div>
        <BottomNav onNavigate={onNavigate} isMobile={isMobile} />
      </div>
    </div>
  );
}

function Header({ onBack }: { onBack: () => void }) {
  return (
    <div className="sticky top-0 z-10 px-4 py-3 flex items-center justify-between border-b border-white/20"
      style={{ background: 'linear-gradient(to right, #0F766E, #3B82F6)' }}>
      <button onClick={onBack} className="w-6 h-6 flex items-center justify-center text-white">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <h1 className="text-base text-white font-medium">Avaliação Final</h1>
      <div className="w-6" />
    </div>
  );
}

function Tabs({ aba, onAba }: { aba: string; onAba: (a: 'professor' | 'empresa') => void }) {
  return (
    <div className="flex border-b border-gray-200 mb-5">
      {(['professor', 'empresa'] as const).map(a => (
        <button
          key={a}
          onClick={() => onAba(a)}
          className={`flex-1 pb-3 text-sm font-medium transition-colors ${
            aba === a
              ? 'text-[#0F766E] border-b-2 border-[#0F766E]'
              : 'text-gray-400'
          }`}
        >
          {a === 'professor' ? 'Professor' : 'Empresa'}
        </button>
      ))}
    </div>
  );
}

function TabProfessor() {
  const [parcaisAberto, setParcaisAberto] = useState(true);
  const [finalAberto, setFinalAberto] = useState(true);

  const parciais = [
    { titulo: 'Entrega 1 — Análise Inicial', data: '14/04/2026', nota: 8.5, comentario: '' },
    { titulo: 'Entrega 2 — Mapeamento de Riscos', data: '05/05/2026', nota: 8.5, comentario: '' },
    { titulo: 'Entrega 3 — Plano de Ação', data: '26/05/2026', nota: 9.0, comentario: 'Plano detalhado e com metas claras.' },
    { titulo: 'Entrega 4 — Implementação Parcial', data: '09/06/2026', nota: 8.0, comentario: 'Boa execução, alguns ajustes necessários.' },
    { titulo: 'Entrega 5 — Relatório Final', data: '23/06/2026', nota: 9.0, comentario: 'Relatório completo e bem apresentado.' },
  ];

  return (
    <>
      <div className="mb-5 border border-gray-200 rounded-xl overflow-hidden">
        <button
          onClick={() => setParcaisAberto(v => !v)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white"
        >
          <span className="text-sm font-medium text-gray-900">Avaliações Parciais</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"
            className={`transition-transform ${parcaisAberto ? 'rotate-180' : ''}`}>
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        {parcaisAberto && (
          <div className="border-t border-gray-100 divide-y divide-gray-100">
            {parciais.map((p, i) => (
              <div key={i} className="flex items-start justify-between px-4 py-3">
                <div className="flex-1 mr-3">
                  <div className="text-sm font-medium text-gray-900">{p.titulo}</div>
                  <div className="text-xs text-[#0F766E] mt-0.5">{p.data}</div>
                  {p.comentario && <div className="text-xs text-gray-500 mt-1">{p.comentario}</div>}
                </div>
                <span className="w-10 h-8 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center text-sm font-semibold text-gray-900 flex-shrink-0">
                  {p.nota}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-5 border border-gray-200 rounded-xl overflow-hidden">
        <button
          onClick={() => setFinalAberto(v => !v)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white"
        >
          <span className="text-sm font-medium text-gray-900">Avaliação Final</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"
            className={`transition-transform ${finalAberto ? 'rotate-180' : ''}`}>
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        {finalAberto && (
          <div className="border-t border-gray-100">
            <div className="flex items-start justify-between px-4 py-3">
              <div className="flex-1 mr-3">
                <div className="text-sm font-medium text-gray-900">Nota final</div>
                <div className="text-xs text-[#0F766E] mt-0.5">14/06/2026</div>
                <div className="text-xs text-gray-500 mt-1">Excelente evolução ao longo do semestre.</div>
              </div>
              <span className="w-10 h-8 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center text-sm font-semibold text-gray-900 flex-shrink-0">
                8.5
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="text-sm font-medium text-gray-900 mb-3">Evolução</div>
      <div className="border border-gray-200 rounded-xl p-4 mb-4">
        <GraficoRadar />
      </div>
    </>
  );
}

function GraficoRadar() {
  const cx = 140, cy = 128, r = 75;
  const eixos = ['Pontualidade', 'Proatividade', 'Comunicação', 'Compromisso', 'Execução'];
  const inicio = [0.55, 0.50, 0.60, 0.65, 0.55];
  const final  = [0.88, 0.82, 0.90, 0.85, 0.87];

  const ang = (i: number) => (Math.PI * 2 * i) / eixos.length - Math.PI / 2;
  const pt  = (i: number, v: number) => ({ x: cx + r * v * Math.cos(ang(i)), y: cy + r * v * Math.sin(ang(i)) });
  const lp  = (i: number) => ({ x: cx + (r + 22) * Math.cos(ang(i)), y: cy + (r + 22) * Math.sin(ang(i)) });

  const poly = (vals: number[]) =>
    vals.map((v, i) => { const p = pt(i, v); return `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`; }).join(' ') + 'Z';

  return (
    <>
      <div className="flex items-center gap-4 mb-2 justify-end">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-0.5 bg-[#34D399]" />
          <span className="text-xs text-gray-400">início</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-0.5 bg-[#3B82F6]" />
          <span className="text-xs text-gray-400">final</span>
        </div>
      </div>
      <svg viewBox="0 0 280 265" className="w-full">
        {[0.25, 0.5, 0.75, 1.0].map(g => (
          <polygon key={g}
            points={eixos.map((_, i) => { const p = pt(i, g); return `${p.x.toFixed(1)},${p.y.toFixed(1)}`; }).join(' ')}
            fill="none" stroke="#E5E7EB" strokeWidth="1" />
        ))}
        {eixos.map((_, i) => { const p = pt(i, 1); return <line key={i} x1={cx} y1={cy} x2={p.x.toFixed(1)} y2={p.y.toFixed(1)} stroke="#E5E7EB" strokeWidth="1" />; })}
        <path d={poly(inicio)} fill="#34D399" fillOpacity="0.15" stroke="#34D399" strokeWidth="1.5" />
        <path d={poly(final)}  fill="#3B82F6" fillOpacity="0.15" stroke="#3B82F6" strokeWidth="1.5" />
        {eixos.map((nome, i) => { const p = lp(i); return (
          <text key={i} x={p.x.toFixed(1)} y={p.y.toFixed(1)} textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#6B7280">{nome}</text>
        );})}
      </svg>
    </>
  );
}

function TabEmpresa() {
  const [parcaisAberto, setParcaisAberto] = useState(true);
  const [finalAberto, setFinalAberto] = useState(true);

  const parciais = [
    { titulo: 'Entrega 1 — Análise Inicial', data: '14/04/2026', comentario: 'Boa compreensão do ambiente e dos riscos mapeados.' },
    { titulo: 'Entrega 2 — Mapeamento de Riscos', data: '05/05/2026', comentario: 'Soluções práticas e bem aplicadas ao contexto.' },
  ];

  return (
    <>
      <div className="mb-5 border border-gray-200 rounded-xl overflow-hidden">
        <button
          onClick={() => setParcaisAberto(v => !v)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white"
        >
          <span className="text-sm font-medium text-gray-900">Avaliações Parciais</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"
            className={`transition-transform ${parcaisAberto ? 'rotate-180' : ''}`}>
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        {parcaisAberto && (
          <div className="border-t border-gray-100 divide-y divide-gray-100">
            {parciais.map((p, i) => (
              <div key={i} className="px-4 py-3">
                <div className="text-sm font-medium text-gray-900">{p.titulo}</div>
                <div className="text-xs text-[#0F766E] mt-0.5">{p.data}</div>
                <div className="text-xs text-gray-500 mt-1">{p.comentario}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-5 border border-gray-200 rounded-xl overflow-hidden">
        <button
          onClick={() => setFinalAberto(v => !v)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white"
        >
          <span className="text-sm font-medium text-gray-900">Avaliação Final</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"
            className={`transition-transform ${finalAberto ? 'rotate-180' : ''}`}>
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        {finalAberto && (
          <div className="border-t border-gray-100">
            <div className="px-4 py-3">
              <div className="text-sm font-medium text-gray-900">Nota final</div>
              <div className="text-xs text-[#0F766E] mt-0.5">14/06/2026</div>
              <div className="text-xs text-gray-500 mt-1">Destacamos a qualidade da matriz de riscos desenvolvida.</div>
            </div>
          </div>
        )}
      </div>

      <div className="text-sm font-medium text-gray-900 mb-3">Feedback da Empresa</div>
      <div className="p-4 border border-gray-200 rounded-xl mb-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl flex-shrink-0 overflow-hidden">
            <img src="/sabin.png" alt="Laboratório Sabin" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">Laboratório Sabin</div>
            <div className="text-xs text-gray-400">Empresa Parceira</div>
          </div>
        </div>
        <p className="text-sm text-[#0F766E] leading-relaxed">
          Ana demonstrou excelente proatividade e comprometimento durante todo o projeto. Sua capacidade de comunicação e pontualidade foram diferenciais importantes para a equipe.
        </p>
      </div>
    </>
  );
}

function BottomNav({ onNavigate, isMobile }: { onNavigate: (view: string) => void; isMobile?: boolean }) {
  const navItems = [
    { icon: 'home',    label: 'Home',       viewId: 't1',         active: false },
    { icon: 'project', label: 'Projeto',    viewId: 't2',         active: false },
    { icon: 'star',    label: 'Avaliações', viewId: 'avaliacoes', active: true  },
    { icon: 'profile', label: 'Perfil',     viewId: 'perfil',     active: false },
  ];

  return (
    <div className={`bg-white border-t border-gray-100 px-4 py-2 flex justify-around ${isMobile ? 'fixed bottom-0 left-0 right-0 z-50' : ''}`}>
      {navItems.map((item, index) => (
        <button
          key={index}
          onClick={() => item.viewId && onNavigate(item.viewId)}
          className="flex flex-col items-center py-1"
        >
          <div className={`w-6 h-6 mb-1 ${item.active ? 'text-[#0F766E]' : 'text-gray-300'}`}>
            {item.icon === 'home' && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" />
              </svg>
            )}
            {item.icon === 'project' && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3h18v18H3z" /><path d="M3 9h18" /><path d="M9 21V9" />
              </svg>
            )}
            {item.icon === 'star' && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            )}
            {item.icon === 'profile' && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><circle cx="12" cy="10" r="3" />
                <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
              </svg>
            )}
          </div>
          <span className={`text-xs ${item.active ? 'text-[#0F766E] font-medium' : 'text-gray-400'}`}>
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
}
