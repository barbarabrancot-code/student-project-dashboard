import { useState } from 'react';

export default function AcompanhamentoEmpresa({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [filesExpanded, setFilesExpanded] = useState(true);

  return (
    <div className="w-full h-full min-h-screen bg-gray-50 flex overflow-hidden">
      <Sidebar onNavigate={onNavigate} />
      <div className="flex-1 overflow-y-auto">
        <PageHeader />
        <CompanyTimeline />
        <GroupProgressGrid />
        <ValidationPanel />
        <SharedFilesSection expanded={filesExpanded} setExpanded={setFilesExpanded} />
      </div>
    </div>
  );
}

function Sidebar({ onNavigate }: { onNavigate: (view: string) => void }) {
  const navItems = [
    { label: 'Empresa',  viewId: 'company', active: true  },
    { label: 'Talentos', viewId: 'talents', active: false },
    { label: 'Projetos', viewId: null,      active: false },
    { label: 'Perfil',   viewId: null,      active: false },
  ];

  return (
    <div className="w-[220px] bg-[#0F766E] text-white flex flex-col flex-shrink-0">
      <div className="p-4 border-b border-white/20">
        <div className="w-12 h-12 bg-white/20 rounded" />
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item, index) => (
          <div
            key={index}
            onClick={() => item.viewId && onNavigate(item.viewId)}
            className={`px-3 py-2 rounded-lg text-sm transition-colors ${
              item.active
                ? 'bg-white/20 text-white font-medium'
                : item.viewId
                  ? 'text-white/70 hover:bg-white/10 hover:text-white cursor-pointer'
                  : 'text-white/30 cursor-default'
            }`}
          >
            {item.label}
          </div>
        ))}
      </nav>
      <div className="p-4 border-t border-white/20">
        <div className="w-16 h-16 bg-white/20 rounded mb-2" />
        <div className="text-xs text-white/70">Laboratório Sabin</div>
      </div>
    </div>
  );
}

function PageHeader() {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="text-xs text-gray-400 mb-2">Projetos &gt; SafeLab</div>
      <div className="flex items-start justify-between mb-3">
        <h1 className="text-gray-900">SafeLab — Mapeamento de Riscos Ocupacionais</h1>
        <span className="px-3 py-1 bg-[#0F766E]/10 text-[#0F766E] border border-[#0F766E]/20 rounded-full text-xs font-medium whitespace-nowrap">
          Semana 8 de 16
        </span>
      </div>
      <div className="text-sm text-gray-500">
        Instituição: SENAC SP · Professor: Carla Mendes · Turma: Segurança do Trabalho T2
      </div>
    </div>
  );
}

function CompanyTimeline() {
  const milestones = [
    { label: 'Visita Técnica', week: 4, status: 'completed', note: 'Semana 4' },
    { label: 'Validação Parcial', week: 13, status: 'upcoming', note: 'em 5 semanas' },
    { label: 'Banca Final', week: 16, status: 'future', note: 'Semana 16' }
  ];

  return (
    <div className="px-6 py-6">
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="relative px-12">
          <div className="absolute left-12 right-12 top-6 h-0.5 bg-gray-200" />
          <div className="absolute left-12 top-6 h-0.5" style={{ width: '25%', background: 'linear-gradient(to right, #0F766E, #34D399)' }} />
          <div className="relative flex items-start justify-between">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                  milestone.status === 'completed' ? 'bg-[#0F766E] border-[#0F766E]' :
                  milestone.status === 'upcoming' ? 'border-[#0F766E] bg-white ring-4 ring-[#0F766E]/20' :
                  'border-gray-200 bg-white'
                }`}>
                  {milestone.status === 'completed' && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                  {milestone.status === 'upcoming' && (
                    <div className="w-4 h-4 bg-[#0F766E] rounded-full" />
                  )}
                </div>
                <div className="mt-3 text-center">
                  <div className="text-sm font-medium text-gray-800">{milestone.label}</div>
                  <div className="text-xs text-gray-400">{milestone.note}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-xs text-gray-400 text-center mt-6">
            Sua participação está concentrada nesses 3 momentos
          </div>
        </div>
      </div>
    </div>
  );
}

function GroupProgressGrid() {
  const groups = [
    { id: 1, name: 'Grupo 1', members: 4, progress: { current: 2, total: 4 }, lastDocument: 'Relatorio_v2.pdf', date: '01/05/2026', status: 'on-track', starred: false },
    { id: 2, name: 'Grupo 2', members: 4, progress: { current: 3, total: 4 }, lastDocument: 'Matriz_Riscos_Final.xlsx', date: '02/05/2026', status: 'on-track', starred: false },
    { id: 3, name: 'Grupo 3', members: 4, progress: { current: 2, total: 4 }, lastDocument: 'Relatorio_v2.pdf', date: '02/05/2026', status: 'in-progress', starred: true },
    { id: 4, name: 'Grupo 4', members: 4, progress: { current: 1, total: 4 }, lastDocument: 'Briefing_Analise.pdf', date: '25/04/2026', status: 'attention', starred: false },
    { id: 5, name: 'Grupo 5', members: 4, progress: { current: 2, total: 4 }, lastDocument: 'Mapeamento_v1.pdf', date: '30/04/2026', status: 'in-progress', starred: false },
    { id: 6, name: 'Grupo 6', members: 4, progress: { current: 3, total: 4 }, lastDocument: 'Proposta_Implementacao.pdf', date: '03/05/2026', status: 'on-track', starred: false }
  ];

  const statusConfig = {
    'on-track':    { label: 'No prazo',    className: 'bg-[#34D399]/20 text-[#0F766E] border border-[#34D399]/40' },
    'in-progress': { label: 'Em andamento', className: 'bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20' },
    'attention':   { label: 'Atenção',      className: 'bg-amber-100 text-amber-800 border border-amber-300' }
  };

  return (
    <div className="px-6 pb-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {groups.map((group) => {
          const s = statusConfig[group.status as keyof typeof statusConfig];
          return (
            <div key={group.id} className="p-4 bg-white border border-gray-200 rounded-xl relative">
              {group.starred && (
                <div className="absolute top-3 right-3 px-2 py-1 bg-[#34D399]/20 text-[#0F766E] border border-[#34D399]/40 rounded-lg text-xs flex items-center gap-1 font-medium">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  Potencial de implementação
                </div>
              )}
              <div className="mb-3">
                <h3 className="mb-1 text-gray-900">{group.name}</h3>
                <div className="text-xs text-gray-400">{group.members} membros</div>
              </div>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: group.members }).map((_, i) => (
                  <div key={i} className="w-6 h-6 bg-gray-200 rounded-full" />
                ))}
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>{group.progress.current} de {group.progress.total} entregas concluídas</span>
                  <span className="font-medium text-[#0F766E]">{Math.round((group.progress.current / group.progress.total) * 100)}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{
                    width: `${(group.progress.current / group.progress.total) * 100}%`,
                    background: 'linear-gradient(to right, #0F766E, #34D399)'
                  }} />
                </div>
              </div>
              <div className="mb-3 p-2 bg-gray-50 border border-gray-100 rounded-lg text-xs">
                <div className="text-gray-400 mb-1">Último documento:</div>
                <a href="#" className="text-[#3B82F6] hover:underline">{group.lastDocument}</a>
                <div className="text-gray-400 mt-1">{group.date}</div>
              </div>
              <div className="mb-3">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${s.className}`}>
                  {s.label}
                </span>
              </div>
              <button className="w-full py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-lg text-sm font-medium transition-colors">
                Ver trabalho do grupo
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ValidationPanel() {
  const groups = [
    { id: 3, name: 'Grupo 3', proposal: 'Sistema de classificação de riscos com QR codes', status: 'approved', feedback: 'Proposta alinhada com nossas necessidades' },
    { id: 5, name: 'Grupo 5', proposal: 'Protocolo de auditoria mensal de equipamentos', status: 'pending', feedback: null },
    { id: 1, name: 'Grupo 1', proposal: 'App mobile para registro de incidentes', status: 'pending', feedback: null }
  ];

  return (
    <div className="px-6 pb-6">
      <div className="bg-[#3B82F6]/5 border border-[#3B82F6]/20 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20 rounded-full text-xs font-medium">
            Ação necessária
          </span>
          <h3 className="text-gray-900">Validação Parcial · Semana 13</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Avalie cada grupo antes da banca final. Seu feedback orienta os ajustes.
        </p>
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Grupo</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Proposta resumida</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Seu feedback</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Ação</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group, index) => (
                <tr key={group.id} className={index > 0 ? 'border-t border-gray-100' : ''}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{group.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{group.proposal}</td>
                  <td className="px-4 py-3 text-center">
                    {group.status === 'approved' ? (
                      <span className="inline-flex items-center gap-1 text-[#0F766E] text-sm font-medium">
                        Aprovado
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </span>
                    ) : (
                      <span className="text-amber-500 text-sm">Pendente</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{group.feedback || '—'}</td>
                  <td className="px-4 py-3">
                    {group.status === 'pending' ? (
                      <div className="flex gap-2 justify-center">
                        <button className="px-3 py-1 bg-[#34D399]/20 text-[#0F766E] border border-[#34D399]/40 rounded-lg text-xs font-medium">
                          Aprovar
                        </button>
                        <button className="px-3 py-1 bg-amber-100 text-amber-800 border border-amber-300 rounded-lg text-xs font-medium">
                          Ajustes
                        </button>
                      </div>
                    ) : (
                      <div className="text-center text-xs text-gray-400">—</div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SharedFilesSection({ expanded, setExpanded }: { expanded: boolean; setExpanded: (val: boolean) => void }) {
  const files = [
    { name: 'Dados_Anonimizados_Sabin.xlsx', sender: 'Prof. Carla', date: '15/03/2026' },
    { name: 'NR-32_Referencia.pdf', sender: 'Prof. Carla', date: '15/03/2026' },
    { name: 'Briefing_Original.pdf', sender: 'Prof. Carla', date: '10/03/2026' }
  ];

  return (
    <div className="px-6 pb-6">
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <button onClick={() => setExpanded(!expanded)}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
          <div className="text-sm font-medium text-gray-900">Materiais Compartilhados pelo Professor</div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            className={`transition-transform text-gray-400 ${expanded ? 'rotate-180' : ''}`}>
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        {expanded && (
          <div className="border-t border-gray-100 p-4 space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl">
                <div className="w-8 h-8 flex-shrink-0 rounded-lg bg-[#0F766E]/10 flex items-center justify-center text-[#0F766E]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-gray-900">{file.name}</div>
                  <div className="text-xs text-gray-400">Enviado por {file.sender} · {file.date}</div>
                </div>
                <a href="#" className="text-sm text-[#3B82F6] font-medium">Abrir</a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
