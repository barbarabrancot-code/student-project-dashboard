import { useState } from 'react';

export default function Avaliacoes({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [aba, setAba] = useState<'professor' | 'empresa'>('professor');

  return (
    <div className="flex items-center justify-center min-h-full">
      <div className="w-[375px] h-[812px] bg-white overflow-y-auto relative flex flex-col">
        <Header onBack={() => onNavigate('t1')} />
        <div className="flex-1 pb-20">
          <div className="px-4 pt-4">
            <p className="text-xs text-gray-400 mb-4">SafeLab — Semestre 2026/1</p>
            <Tabs aba={aba} onAba={setAba} />
            {aba === 'professor' ? <TabProfessor /> : <TabEmpresa />}
          </div>
        </div>
        <BottomNav onNavigate={onNavigate} />
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
  const criterios = [
    { label: 'Participação ao longo do semestre', peso: '20%', nota: 7.5, progresso: 75 },
    { label: 'Qualidade das entregas intermediárias', peso: '40%', nota: 8.5, progresso: 85 },
    { label: 'Banca final', peso: '40%', nota: 8.4, progresso: 84 },
  ];

  const parciais = [
    { titulo: 'Entrega 1 — Análise Inicial', data: '14/04/2026', nota: 8.5 },
    { titulo: 'Entrega 2 — Mapeamento de Riscos', data: '05/05/2026', nota: 8.5 },
  ];

  return (
    <>
      <div className="mb-5">
        <div className="text-sm font-medium text-gray-900 mb-3">Avaliações Parciais</div>
        <div className="space-y-3">
          {parciais.map((p, i) => (
            <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
              <div>
                <div className="text-sm font-medium text-gray-900">{p.titulo}</div>
                <div className="text-xs text-[#0F766E] mt-0.5">{p.data}</div>
              </div>
              <span className="w-10 h-8 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center text-sm font-semibold text-gray-900 flex-shrink-0">
                {p.nota}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5 border border-gray-200 rounded-xl mb-5 text-center">
        <div className="text-sm text-[#0F766E] mb-2">Nota Final do Professor</div>
        <div className="text-5xl font-bold text-gray-900 mb-1">8.2</div>
        <div className="text-sm text-gray-400">de 10.0</div>
      </div>

      <div className="text-sm font-medium text-gray-900 mb-3">Detalhamento da Nota</div>
      <div className="space-y-3 mb-5">
        {criterios.map((c, i) => (
          <div key={i} className="p-3 border border-gray-200 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="flex-1 text-sm text-gray-700">{c.label}</span>
              <span className="text-xs text-gray-400">{c.peso}</span>
              <span className="w-10 h-8 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center text-sm font-semibold text-gray-900">
                {c.nota}
              </span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${c.progresso}%`, background: 'linear-gradient(to right, #0F766E, #34D399)' }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="text-sm font-medium text-gray-900 mb-3">Comentário do Professor</div>
      <div className="p-4 border border-gray-200 rounded-xl mb-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex-shrink-0 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
              <circle cx="12" cy="8" r="4" /><path d="M6 20v-1a6 6 0 0 1 12 0v1" />
            </svg>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">Prof. Carla Mendes</div>
            <div className="text-xs text-gray-400">Segurança do Trabalho</div>
          </div>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">
          Ana demonstrou excelente evolução ao longo do semestre. Sua dedicação e capacidade analítica foram fundamentais para o sucesso do projeto. Continue desenvolvendo suas habilidades de liderança.
        </p>
      </div>
    </>
  );
}

function TabEmpresa() {
  const aspectos = [
    { label: 'Compreensão do ambiente laboratorial', nota: 8.5, progresso: 85 },
    { label: 'Aplicabilidade das soluções propostas', nota: 8.0, progresso: 80 },
    { label: 'Qualidade técnica do trabalho', nota: 8.5, progresso: 85 },
    { label: 'Apresentação e comunicação', nota: 7.5, progresso: 75 },
  ];

  const parciais = [
    { titulo: 'Entrega 1 — Análise Inicial', data: '14/04/2026', nota: 8.5 },
    { titulo: 'Entrega 2 — Mapeamento de Riscos', data: '05/05/2026', nota: 8.0 },
  ];

  return (
    <>
      <div className="mb-5">
        <div className="text-sm font-medium text-gray-900 mb-3">Avaliações Parciais</div>
        <div className="space-y-3">
          {parciais.map((p, i) => (
            <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
              <div>
                <div className="text-sm font-medium text-gray-900">{p.titulo}</div>
                <div className="text-xs text-[#0F766E] mt-0.5">{p.data}</div>
              </div>
              <span className="w-10 h-8 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center text-sm font-semibold text-gray-900 flex-shrink-0">
                {p.nota}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5 border border-gray-200 rounded-xl mb-5 text-center">
        <div className="text-sm text-[#0F766E] mb-2">Nota da Empresa</div>
        <div className="text-5xl font-bold text-gray-900 mb-1">8.0</div>
        <div className="text-sm text-gray-400">de 10.0</div>
      </div>

      <div className="text-sm font-medium text-gray-900 mb-3">Aspectos Avaliados</div>
      <div className="space-y-3 mb-5">
        {aspectos.map((a, i) => (
          <div key={i} className="p-3 border border-gray-200 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="flex-1 text-sm text-gray-700">{a.label}</span>
              <span className="w-10 h-8 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center text-sm font-semibold text-gray-900">
                {a.nota}
              </span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${a.progresso}%`, background: 'linear-gradient(to right, #0F766E, #34D399)' }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="text-sm font-medium text-gray-900 mb-3">Feedback da Empresa</div>
      <div className="p-4 border border-gray-200 rounded-xl mb-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex-shrink-0 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" />
            </svg>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">Laboratório Sabin</div>
            <div className="text-xs text-gray-400">Empresa Parceira</div>
          </div>
        </div>
        <p className="text-sm text-[#0F766E] leading-relaxed">
          O grupo demonstrou excelente compreensão dos riscos ocupacionais e apresentou soluções práticas e aplicáveis ao nosso contexto. Destacamos a qualidade da matriz de riscos desenvolvida.
        </p>
      </div>
    </>
  );
}

function BottomNav({ onNavigate }: { onNavigate: (view: string) => void }) {
  const navItems = [
    { icon: 'home',    label: 'Home',       viewId: 't1',         active: false },
    { icon: 'project', label: 'Projeto',    viewId: 't2',         active: false },
    { icon: 'star',    label: 'Avaliações', viewId: 'avaliacoes', active: true  },
    { icon: 'profile', label: 'Perfil',     viewId: 'perfil',     active: false },
  ];

  return (
    <div className="sticky bottom-0 bg-white border-t border-gray-100 px-4 py-2 flex justify-around">
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
