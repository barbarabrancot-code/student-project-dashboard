import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

type Criterios = {
  pontualidade: number;
  proatividade: number;
  comunicacao: number;
  compromisso: number;
};

function LikertScale({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const pontos = [1, 2, 3, 4, 5];
  const progress = value === 0 ? 0 : (value - 1) / 4;
  return (
    <div className="relative flex items-center py-1">
      <div className="absolute left-2 right-2 h-0.5 bg-gray-200" />
      <div
        className="absolute left-2 h-0.5 transition-all duration-200"
        style={{
          width: value === 0 ? '0%' : `calc(${progress * 100}% - ${progress * 16}px)`,
          background: 'linear-gradient(to right, #0F766E, #34D399)'
        }}
      />
      <div className="relative flex justify-between w-full">
        {pontos.map((ponto) => (
          <button
            key={ponto}
            onClick={() => onChange(ponto)}
            className={`w-4 h-4 rounded-full border-2 transition-all duration-150 ${
              ponto <= value
                ? 'bg-[#34D399] border-[#0F766E] scale-110'
                : 'bg-white border-gray-300 hover:border-[#0F766E]'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function PainelDeTurma({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <div className="w-full h-full min-h-screen bg-gray-50 flex overflow-hidden relative">
      <Sidebar onNavigate={onNavigate} />

      <div className="flex-1 overflow-y-auto">
        <PageHeader />
        <SummaryStats />
        <SemesterTimeline />
        <FilterBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        <GroupCardsGrid setSelectedGroup={setSelectedGroup} />
      </div>

      <AnimatePresence>
        {selectedGroup && (
          <FeedbackPanel groupId={selectedGroup} onClose={() => setSelectedGroup(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function Sidebar({ onNavigate }: { onNavigate: (view: string) => void }) {
  const navItems = [
    { label: 'Painel',        viewId: 'teacher', active: true  },
    { label: 'Avaliação',     viewId: 'grading', active: false },
    { label: 'Minhas Turmas', viewId: null,       active: false },
    { label: 'Projeto',       viewId: null,       active: false },
    { label: 'Perfil',        viewId: null,       active: false },
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

      <div className="p-4 border-t border-white/20 flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-full" />
        <div className="text-sm text-white">Prof. Carla</div>
      </div>
    </div>
  );
}

function PageHeader() {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="text-xs text-gray-400 mb-2">Minhas Turmas &gt; Segurança do Trabalho T2</div>
      <div className="flex items-center justify-between">
        <h1 className="text-gray-900">Painel da Turma</h1>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-[#0F766E]/10 text-[#0F766E] border border-[#0F766E]/20 rounded-full text-xs font-medium">
            Semana 8 de 16
          </span>
          <span className="text-sm text-gray-600">SafeLab — Sabin</span>
        </div>
      </div>
    </div>
  );
}

function SummaryStats() {
  const stats = [
    { label: '6 Grupos ativos', highlight: false, icon: '👥' },
    { label: '2 Entregas concluídas', highlight: false, icon: '✅' },
    { label: '1 Grupo em risco', highlight: true, icon: '⚠️' },
    { label: 'Próximo marco: Validação — 5 semanas', highlight: false, icon: '📅' }
  ];

  return (
    <div className="px-6 py-6">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl border ${
              stat.highlight
                ? 'border-amber-300 bg-amber-50'
                : 'border-gray-200 bg-white'
            }`}
          >
            <div className="text-xl mb-1">{stat.icon}</div>
            <div className={`text-sm font-medium ${stat.highlight ? 'text-amber-800' : 'text-gray-700'}`}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SemesterTimeline() {
  const milestones = [
    { label: 'Kickoff', week: 1, status: 'completed' },
    { label: 'Entrega 1', week: 6, status: 'completed' },
    { label: 'Validação Parcial', week: 13, status: 'upcoming' },
    { label: 'Banca Final', week: 16, status: 'future' }
  ];

  const currentWeek = 8;

  return (
    <div className="px-6 pb-6">
      <div className="bg-white border border-gray-200 rounded-xl p-8">
        <div className="relative px-8">
          <div className="absolute left-8 right-8 top-6 h-0.5 bg-gray-200" style={{ zIndex: 0 }} />
          <div
            className="absolute left-8 top-6 h-0.5"
            style={{
              width: '33%',
              zIndex: 0,
              background: 'linear-gradient(to right, #0F766E, #34D399)'
            }}
          />

          <div className="relative flex items-start justify-between" style={{ zIndex: 1 }}>
            {milestones.map((milestone, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                  milestone.status === 'completed'
                    ? 'bg-[#0F766E] border-[#0F766E]'
                    : milestone.status === 'upcoming'
                    ? 'border-[#0F766E] bg-white'
                    : 'border-gray-200 bg-white'
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
                  <div className="text-sm text-gray-800 font-medium">{milestone.label}</div>
                  <div className="text-xs text-gray-400">Semana {milestone.week}</div>
                </div>
              </div>
            ))}

            <div
              className="absolute flex flex-col items-center"
              style={{ left: 'calc(33% + ((100% - 33%) * 0.13))', top: '0px', zIndex: 2 }}
            >
              <div className="w-3 h-3 bg-[#3B82F6] rounded-full border-2 border-white ring-2 ring-[#3B82F6]/30" />
              <div className="mt-8 px-2 py-1 bg-[#3B82F6] text-white rounded text-xs whitespace-nowrap">
                Semana {currentWeek}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterBar({ activeFilter, setActiveFilter }: { activeFilter: string; setActiveFilter: (filter: string) => void }) {
  const filters = [
    { id: 'all', label: 'Todos' },
    { id: 'on-time', label: 'Em dia' },
    { id: 'late', label: 'Atrasados' },
    { id: 'completed', label: 'Concluídos' }
  ];

  return (
    <div className="px-6 pb-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">Filtrar por:</span>
        <div className="flex gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                activeFilter === filter.id
                  ? 'bg-[#0F766E] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Marco:</span>
        <select className="px-3 py-1 border border-gray-200 rounded-lg text-sm bg-white text-gray-700">
          <option>Todos os marcos</option>
          <option>Entrega 1</option>
          <option>Entrega 2</option>
          <option>Validação</option>
        </select>
      </div>
    </div>
  );
}

function GroupCardsGrid({ setSelectedGroup }: { setSelectedGroup: (id: number) => void }) {
  const groups = [
    { id: 1, name: 'Grupo 1', members: 4, progress: { current: 2, total: 4 }, lastActivity: 'hoje às 14h', status: 'in-progress', warning: false },
    { id: 2, name: 'Grupo 2', members: 4, progress: { current: 2, total: 4 }, lastActivity: 'hoje às 10h', status: 'submitted', warning: false },
    { id: 3, name: 'Grupo 3', members: 4, progress: { current: 2, total: 4 }, lastActivity: 'hoje às 16h', status: 'in-progress', warning: false },
    { id: 4, name: 'Grupo 4', members: 4, progress: { current: 1, total: 4 }, lastActivity: 'há 8 dias', status: 'late', warning: true },
    { id: 5, name: 'Grupo 5', members: 4, progress: { current: 2, total: 4 }, lastActivity: 'ontem às 18h', status: 'in-progress', warning: false },
    { id: 6, name: 'Grupo 6', members: 4, progress: { current: 3, total: 4 }, lastActivity: 'hoje às 9h', status: 'submitted', warning: false }
  ];

  const statusConfig = {
    'in-progress': { label: 'Em andamento', className: 'bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20' },
    'submitted':   { label: 'Enviado',       className: 'bg-[#34D399]/20 text-[#0F766E] border border-[#34D399]/40' },
    'late':        { label: 'Atrasado',      className: 'bg-amber-100 text-amber-800 border border-amber-300' }
  };

  return (
    <div className="px-6 pb-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {groups.map((group) => {
          const statusInfo = statusConfig[group.status as keyof typeof statusConfig];
          return (
            <div
              key={group.id}
              className={`p-4 rounded-xl border bg-white ${
                group.warning ? 'border-amber-300' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="mb-1 text-gray-900">{group.name}</h3>
                  <div className="text-xs text-gray-400">{group.members} membros</div>
                </div>
                {group.warning && (
                  <div className="flex items-center gap-1 text-amber-600">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                    <span className="text-xs">Sem atividade há 8 dias</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2 mb-3">
                {Array.from({ length: group.members }).map((_, i) => (
                  <div key={i} className="w-8 h-8 bg-gray-200 rounded-full" />
                ))}
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>{group.progress.current} de {group.progress.total} marcos concluídos</span>
                  <span className="font-medium text-[#0F766E]">{Math.round((group.progress.current / group.progress.total) * 100)}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(group.progress.current / group.progress.total) * 100}%`,
                      background: 'linear-gradient(to right, #0F766E, #34D399)'
                    }}
                  />
                </div>
              </div>

              <div className="text-xs text-gray-400 mb-3">
                Último registro: {group.lastActivity}
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.className}`}>
                  {statusInfo.label}
                </span>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                  Ver entregas
                </button>
                <button
                  onClick={() => setSelectedGroup(group.id)}
                  className="flex-1 py-2 bg-[#3B82F6] text-white rounded-lg text-sm hover:bg-[#2563EB] transition-colors"
                >
                  Dar feedback
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FeedbackPanel({ groupId, onClose }: { groupId: number; onClose: () => void }) {
  const alunos = [
    { id: 1, nome: 'Ana Beatriz' },
    { id: 2, nome: 'Juliana' },
    { id: 3, nome: 'Mateus' },
    { id: 4, nome: 'Carlos' },
  ];

  const criterios: { id: keyof Criterios; label: string }[] = [
    { id: 'pontualidade', label: 'Pontualidade' },
    { id: 'proatividade', label: 'Proatividade' },
    { id: 'comunicacao', label: 'Comunicação' },
    { id: 'compromisso', label: 'Compromisso' },
  ];

  const [expandedId, setExpandedId] = useState<number>(0);
  const [avaliacoes, setAvaliacoes] = useState<Record<number, Criterios>>(
    Object.fromEntries(alunos.map(a => [a.id, { pontualidade: 0, proatividade: 0, comunicacao: 0, compromisso: 0 }]))
  );
  const [comentarios, setComentarios] = useState<Record<number, string>>(
    Object.fromEntries(alunos.map(a => [a.id, '']))
  );

  const atualizar = (alunoId: number, criterio: keyof Criterios, valor: number) => {
    setAvaliacoes(prev => ({
      ...prev,
      [alunoId]: { ...prev[alunoId], [criterio]: valor }
    }));
  };

  return (
    <motion.div
      className="fixed top-0 right-0 h-screen w-[360px] bg-white border-l border-gray-200 shadow-xl flex flex-col z-50"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-[#3B82F6]">
        <h3 className="text-white">Feedback — Grupo {groupId}</h3>
        <button onClick={onClose} className="text-white/80 hover:text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {alunos.map((aluno) => (
          <div key={aluno.id} className="border-b border-gray-100">
            <button
              onClick={() => setExpandedId(expandedId === aluno.id ? 0 : aluno.id)}
              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0" />
              <span className="flex-1 text-left text-sm font-medium text-gray-900">{aluno.nome}</span>
              <svg
                width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className={`text-gray-400 transition-transform duration-200 ${expandedId === aluno.id ? 'rotate-180' : ''}`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            <AnimatePresence>
              {expandedId === aluno.id && (
                <motion.div
                  key={aluno.id}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-5 space-y-4 bg-gray-50">
                    {criterios.map((c) => (
                      <div key={c.id}>
                        <div className="text-xs text-gray-500 mb-2">{c.label}</div>
                        <LikertScale
                          value={avaliacoes[aluno.id][c.id]}
                          onChange={(v) => atualizar(aluno.id, c.id, v)}
                        />
                      </div>
                    ))}
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Comentário (opcional)</div>
                      <textarea
                        value={comentarios[aluno.id]}
                        onChange={(e: { target: { value: string } }) => setComentarios((prev: Record<number, string>) => ({ ...prev, [aluno.id]: e.target.value }))}
                        placeholder="Escreva um comentário..."
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:border-[#0F766E] bg-white"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200">
        <button className="w-full py-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-xl font-medium transition-colors">
          Salvar feedback
        </button>
      </div>
    </motion.div>
  );
}
