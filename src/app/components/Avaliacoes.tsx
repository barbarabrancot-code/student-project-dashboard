import { useState } from 'react';

export default function Avaliacoes({ onNavigate, isMobile }: { onNavigate: (view: string) => void; isMobile?: boolean }) {
  const [aba, setAba] = useState<'professor' | 'empresa'>('professor');

  return (
    <div className={isMobile ? 'w-full h-full flex flex-col' : 'flex items-center justify-center min-h-full'}>
      <div className={`bg-white relative flex flex-col ${isMobile ? 'w-full h-full' : 'w-[375px] h-[812px]'}`}>
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

function Header() {
  return (
    <div className="sticky top-0 z-10 h-12 flex-shrink-0"
      style={{ background: 'linear-gradient(to right, #0F766E, #3B82F6)' }} />
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
  const [entregaId, setEntregaId] = useState('e1');
  const [dropdownAberto, setDropdownAberto] = useState(false);

  const avaliacoes = [
    { id: 'e1',    nome: 'Entrega 1 — Análise Inicial',       data: '14/04/2026', nota: 8.5, comentario: 'Boa entrega! O levantamento inicial está bem estruturado. Para a próxima, aprofundem a análise dos agentes biológicos e relacionem mais diretamente com a NR-32.' },
    { id: 'e2',    nome: 'Entrega 2 — Mapeamento de Riscos',  data: '05/05/2026', nota: 8.5, comentario: 'Mapeamento completo. Fiquei satisfeita com o nível de detalhe. Revisem as medidas de controle para os riscos de categoria A antes da validação.' },
    { id: 'e3',    nome: 'Entrega 3 — Plano de Ação',         data: '26/05/2026', nota: 9.0, comentario: 'Plano detalhado e com metas claras.' },
    { id: 'e4',    nome: 'Entrega 4 — Implementação Parcial', data: '09/06/2026', nota: 8.0, comentario: 'Boa execução, alguns ajustes necessários.' },
    { id: 'e5',    nome: 'Entrega 5 — Relatório Final',       data: '23/06/2026', nota: 9.0, comentario: 'Relatório completo e bem apresentado.' },
    { id: 'banca', nome: 'Banca Final',                       data: '14/06/2026', nota: 8.5, comentario: 'Excelente evolução ao longo do semestre.' },
  ];

  const entregaAtual = avaliacoes.find(e => e.id === entregaId)!;

  return (
    <>
      <div className="mb-5">
        <p className="text-sm font-medium text-gray-900 mb-2">Selecione a entrega</p>
        <div className="relative">
          <button onClick={() => setDropdownAberto(!dropdownAberto)}
            className="w-full p-3 border border-gray-200 rounded-xl flex items-center justify-between text-left">
            <div>
              <div className="text-sm font-semibold text-gray-900">{entregaAtual.nome}</div>
              <div className="text-xs text-gray-500">{entregaAtual.data}</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
              {dropdownAberto ? <path d="M18 15l-6-6-6 6" /> : <path d="M6 9l6 6 6-6" />}
            </svg>
          </button>
          {dropdownAberto && (
            <div className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-xl bg-white shadow-md z-20 overflow-hidden">
              {avaliacoes.map((e, i) => (
                <button key={e.id}
                  onClick={() => { setEntregaId(e.id); setDropdownAberto(false); }}
                  className={`w-full p-3 text-left ${i < avaliacoes.length - 1 ? 'border-b border-gray-100' : ''} ${e.id === entregaId ? 'bg-gray-50' : ''}`}>
                  <div className="text-sm font-semibold text-gray-900">{e.nome}</div>
                  <div className="text-xs text-gray-500">{e.data}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mb-5 border border-gray-200 rounded-xl p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 mr-3">
            <div className="text-sm font-medium text-gray-900">{entregaAtual.nome}</div>
            <div className="text-xs text-[#0F766E] mt-0.5">{entregaAtual.data}</div>
          </div>
          <span className="w-12 h-10 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center text-base font-semibold text-gray-900 flex-shrink-0">
            {entregaAtual.nota}
          </span>
        </div>
        {entregaAtual.comentario && (
          <div className="pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-[#0F766E] flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-semibold text-white" style={{ fontSize: '9px' }}>PC</span>
              </div>
              <span className="text-xs font-medium text-gray-700">Prof. Carla</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">{entregaAtual.comentario}</p>
          </div>
        )}
      </div>

      <div className="text-sm font-medium text-gray-900 mb-3">Evolução</div>
      <div className="border border-gray-200 rounded-xl p-4 mb-4">
        <GraficoRadar entregaId={entregaId} entregaNome={entregaAtual.nome} />
      </div>
    </>
  );
}

const dadosRadarPorEntrega: Record<string, number[]> = {
  e1:    [0.55, 0.50, 0.60, 0.65, 0.55],
  e2:    [0.65, 0.60, 0.70, 0.70, 0.65],
  e3:    [0.72, 0.68, 0.78, 0.75, 0.72],
  e4:    [0.78, 0.75, 0.82, 0.80, 0.78],
  e5:    [0.83, 0.79, 0.87, 0.83, 0.83],
  banca: [0.88, 0.82, 0.90, 0.85, 0.87],
};

function GraficoRadar({ entregaId, entregaNome }: { entregaId: string; entregaNome: string }) {
  const cx = 140, cy = 128, r = 75;
  const eixos = ['Pontualidade', 'Proatividade', 'Comunicação', 'Compromisso', 'Execução'];
  const inicio = dadosRadarPorEntrega['e1'];
  const atual  = dadosRadarPorEntrega[entregaId] ?? dadosRadarPorEntrega['banca'];

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
          <span className="text-xs text-gray-400 truncate max-w-[100px]">{entregaNome.split('—')[0].trim()}</span>
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
        <path d={poly(atual)}  fill="#3B82F6" fillOpacity="0.15" stroke="#3B82F6" strokeWidth="1.5" />
        {eixos.map((nome, i) => { const p = lp(i); return (
          <text key={i} x={p.x.toFixed(1)} y={p.y.toFixed(1)} textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#6B7280">{nome}</text>
        );})}
      </svg>
    </>
  );
}

function TabEmpresa() {
  const [entregaId, setEntregaId] = useState('e1');
  const [dropdownAberto, setDropdownAberto] = useState(false);

  const avaliacoes = [
    { id: 'e1',    nome: 'Entrega 1 — Análise Inicial',       data: '14/04/2026', comentario: 'Boa compreensão do ambiente e dos riscos mapeados.' },
    { id: 'e2',    nome: 'Entrega 2 — Mapeamento de Riscos',  data: '05/05/2026', comentario: 'Soluções práticas e bem aplicadas ao contexto.' },
    { id: 'e3',    nome: 'Entrega 3 — Plano de Ação',         data: '26/05/2026', comentario: '' },
    { id: 'e4',    nome: 'Entrega 4 — Implementação Parcial', data: '09/06/2026', comentario: '' },
    { id: 'e5',    nome: 'Entrega 5 — Relatório Final',       data: '23/06/2026', comentario: '' },
    { id: 'banca', nome: 'Banca Final',                       data: '14/06/2026', comentario: 'Destacamos a qualidade da matriz de riscos desenvolvida.' },
  ];

  const entregaAtual = avaliacoes.find(e => e.id === entregaId)!;

  return (
    <>
      <div className="mb-5">
        <p className="text-sm font-medium text-gray-900 mb-2">Selecione a entrega</p>
        <div className="relative">
          <button onClick={() => setDropdownAberto(!dropdownAberto)}
            className="w-full p-3 border border-gray-200 rounded-xl flex items-center justify-between text-left">
            <div>
              <div className="text-sm font-semibold text-gray-900">{entregaAtual.nome}</div>
              <div className="text-xs text-gray-500">{entregaAtual.data}</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
              {dropdownAberto ? <path d="M18 15l-6-6-6 6" /> : <path d="M6 9l6 6 6-6" />}
            </svg>
          </button>
          {dropdownAberto && (
            <div className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-xl bg-white shadow-md z-20 overflow-hidden">
              {avaliacoes.map((e, i) => (
                <button key={e.id}
                  onClick={() => { setEntregaId(e.id); setDropdownAberto(false); }}
                  className={`w-full p-3 text-left ${i < avaliacoes.length - 1 ? 'border-b border-gray-100' : ''} ${e.id === entregaId ? 'bg-gray-50' : ''}`}>
                  <div className="text-sm font-semibold text-gray-900">{e.nome}</div>
                  <div className="text-xs text-gray-500">{e.data}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {entregaAtual.comentario ? (
        <div className="mb-5 p-4 border border-gray-200 rounded-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex-shrink-0 overflow-hidden bg-gray-100 flex items-center justify-center">
              <img src="/sabin.png" alt="Sabin" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display='none'; }} />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">Laboratório Sabin</div>
              <div className="text-xs text-gray-400">Empresa Parceira</div>
            </div>
          </div>
          <p className="text-sm text-[#0F766E] leading-relaxed">{entregaAtual.comentario}</p>
        </div>
      ) : (
        <p className="text-sm text-gray-400 italic text-center py-4 mb-5">Sem avaliação registrada para esta entrega</p>
      )}
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
    <div className={`bg-white border-t border-gray-100 px-4 pt-2 flex justify-around flex-shrink-0 ${isMobile ? 'fixed bottom-0 left-0 right-0 z-50' : 'sticky bottom-0'}`} style={isMobile ? { paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' } : {}}>
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
