export default function Perfil({ onNavigate, isMobile }: { onNavigate: (view: string) => void; isMobile?: boolean }) {
  return (
    <div className={isMobile ? 'w-full h-full flex flex-col' : 'flex items-center justify-center min-h-full'}>
      <div className={`bg-white relative flex flex-col ${isMobile ? 'w-full h-full' : 'w-[375px] h-[812px]'}`}>
        <Header />
        <div className="flex-1 overflow-y-auto">
          <div className="pb-20">
            <PerfilInfo />
            <ProjetoAtual />
            <Certificacoes />
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

function PerfilInfo() {
  return (
    <div className="px-4 py-6 flex flex-col items-center border-b border-gray-100">
      <div className="w-20 h-20 bg-gray-200 rounded-full mb-3" />
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Ana Silva</h2>
      <p className="text-sm text-[#0F766E] mb-3">Técnico em Segurança do Trabalho</p>
      <div className="flex gap-2">
        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">SENAC SP</span>
        <span className="px-3 py-1 bg-[#0F766E]/10 text-[#0F766E] rounded-full text-xs font-medium">MBTI: INTJ</span>
      </div>
    </div>
  );
}

function ProjetoAtual() {
  return (
    <div className="mx-4 mt-5 mb-5">
      <div className="text-sm font-medium text-gray-900 mb-3">Projeto Atual</div>
      <div className="p-4 border border-gray-200 rounded-xl">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-900 flex-1 mr-2">
            SafeLab — Mapeamento de Riscos
          </h3>
          <span className="px-2 py-1 bg-[#3B82F6]/10 text-[#3B82F6] rounded-full text-xs font-medium whitespace-nowrap">
            Em andamento
          </span>
        </div>
        <p className="text-xs text-gray-500 mb-3">Laboratório Sabin</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#0F766E] font-medium">Líder de Projeto</span>
          <span className="text-xs text-gray-400">Mar — Jun 2026</span>
        </div>
      </div>
    </div>
  );
}

function Certificacoes() {
  const certs = [
    { nome: 'NR-32', subtitulo: 'Segurança em Serviços de Saúde', data: 'Mar 2026' },
    { nome: 'NR-09', subtitulo: 'Programa de Prevenção de Riscos', data: 'Fev 2026' },
    { nome: 'Primeiros Socorros', subtitulo: 'Cruz Vermelha', data: 'Jan 2026' },
  ];

  return (
    <div className="mx-4 mb-5">
      <div className="text-sm font-medium text-gray-900 mb-3">Certificações</div>
      <div className="space-y-3 mb-4">
        {certs.map((cert, i) => (
          <div key={i} className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-[#0F766E]/10 flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F766E" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-medium text-[#0F766E]">{cert.nome}</div>
              <div className="text-xs text-gray-500">{cert.subtitulo}</div>
              <div className="text-xs text-gray-400">Emitido em {cert.data}</div>
            </div>
          </div>
        ))}
      </div>

      <label htmlFor="cert-upload" className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center cursor-pointer hover:border-[#0F766E]/40 transition-colors">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <span className="text-sm text-gray-500 mt-2">Arraste ou clique para enviar</span>
        <span className="text-xs text-gray-400 mt-1">PDF, PNG até 5MB</span>
      </label>
      <input id="cert-upload" type="file" accept=".pdf,.png" className="hidden" />
    </div>
  );
}

function Habilidades() {
  const skills = [
    { nome: 'Análise de Riscos', valor: 85 },
    { nome: 'NR-32', valor: 90 },
    { nome: 'Documentação Técnica', valor: 75 },
    { nome: 'Trabalho em Equipe', valor: 95 },
    { nome: 'Gestão de Projetos', valor: 70 },
  ];

  return (
    <div className="mx-4 mb-4">
      <div className="text-sm font-medium text-gray-900 mb-3">Habilidades</div>
      <div className="space-y-3">
        {skills.map((skill, i) => (
          <div key={i}>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-gray-700">{skill.nome}</span>
              <span className="text-gray-500 font-medium">{skill.valor}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ width: `${skill.valor}%`, background: 'linear-gradient(to right, #0F766E, #34D399)' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BottomNav({ onNavigate, isMobile }: { onNavigate: (view: string) => void; isMobile?: boolean }) {
  const navItems = [
    { icon: 'home',    label: 'Home',       viewId: 't1',         active: false },
    { icon: 'project', label: 'Projeto',    viewId: 't2',         active: false },
    { icon: 'star',    label: 'Avaliações', viewId: 'avaliacoes', active: false },
    { icon: 'profile', label: 'Perfil',     viewId: 'perfil',     active: true  },
  ];

  return (
    <div className={`bg-white border-t border-gray-100 px-4 pt-2 flex justify-around ${isMobile ? 'fixed bottom-0 left-0 right-0 z-50' : ''}`} style={isMobile ? { paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' } : {}}>
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
