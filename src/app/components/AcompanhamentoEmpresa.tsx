import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function AcompanhamentoEmpresa({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [filesExpanded, setFilesExpanded] = useState(true);

  return (
    <div className="w-full h-full min-h-screen bg-gray-50 flex overflow-hidden">
      <Sidebar onNavigate={onNavigate} />
      <div className="flex-1 overflow-y-auto">
        <PageHeader />
        <CompanyTimeline />
        <GroupProgressGrid />
        <SharedFilesSection expanded={filesExpanded} setExpanded={setFilesExpanded} />
      </div>
    </div>
  );
}

function Sidebar({ onNavigate }: { onNavigate: (view: string) => void }) {
  const navItems = [
    { label: 'Painel',   viewId: 'company', active: true  },
    { label: 'Talentos', viewId: 'talents', active: false },
    { label: 'Projetos', viewId: null,      active: false },
    { label: 'Perfil',   viewId: null,      active: false },
  ];

  return (
    <div className="w-[220px] bg-[#0F766E] text-white flex flex-col flex-shrink-0">
      <div className="p-4 border-b border-white/20">
        <img src="/student-project-dashboard/laboralogobranco.svg" alt="Labora" className="h-10 object-contain" />
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
        <img src="/student-project-dashboard/sabin%20(2).png" alt="Sabin" className="w-16 h-16 rounded object-cover mb-2" />
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
    { label: 'Validação Inicial', week: 4, status: 'completed', note: 'Semana 4' },
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

const fotosPorNome: Record<string, string> = {
  'Ana Silva':        '/student-project-dashboard/aluna.png',
  'Bruno Costa':      '/student-project-dashboard/brunocosta-convertido-de-jpg_1_11zon.webp',
  'Carlos Lima':      '/student-project-dashboard/carloslima-convertido-de-jpg_17_11zon.webp',
  'Diana Santos':     '/student-project-dashboard/dianasouza-convertido-de-jpg_18_11zon.webp',
  'Eduardo Alves':    '/student-project-dashboard/eduardoalves-convertido-de-jpg_15_11zon.webp',
  'Fernanda Reis':    '/student-project-dashboard/fernandareis_3_11zon.webp',
  'Gabriel Nunes':    '/student-project-dashboard/gabrielnunes-convertido-de-jpg_16_11zon.webp',
  'Helena Campos':    '/student-project-dashboard/helenacampos_11_11zon.webp',
  'Mariana Ferreira': '/student-project-dashboard/marinaferreira_10_11zon.webp',
  'Pedro Gomes':      '/student-project-dashboard/pedrogomes_7_11zon.webp',
  'Rafael Henrique':  '/student-project-dashboard/rafaelhenrique_6_11zon.webp',
  'Thiago Kühl':      '/student-project-dashboard/thiagokuhl_12_11zon.webp',
  'Valentina Lima':   '/student-project-dashboard/valentinalima_9_11zon.webp',
  'William Martins':  '/student-project-dashboard/williammartins_8_11zon.webp',
  'Xênia Neves':      '/student-project-dashboard/xenianeves_5_11zon.webp',
};

const gruposMembros: Record<number, string[]> = {
  1: ['Ana Silva', 'Bruno Costa', 'Carlos Lima', 'Diana Santos'],
  2: ['Mariana Ferreira', 'Pedro Gomes', 'Rafael Henrique'],
  3: ['Thiago Kühl', 'Valentina Lima', 'William Martins', 'Xênia Neves'],
  4: ['Eduardo Alves', 'Fernanda Reis', 'Gabriel Nunes', 'Helena Campos'],
};

const entregasWeb = [
  { id: 'v1',    nome: 'Validação Inicial',  data: 'Semana 4'  },
  { id: 'v2',    nome: 'Validação Parcial',  data: 'Semana 13' },
  { id: 'banca', nome: 'Banca Final',        data: 'Semana 16' },
];

function GroupProgressGrid() {
  const [feedbackGrupoId, setFeedbackGrupoId] = useState<number | null>(null);

  const groups = [
    { id: 1, name: 'Grupo 1', members: 4, progress: { current: 2, total: 4 }, lastDocument: 'Relatorio_v2.pdf', date: '01/05/2026', starred: false },
    { id: 2, name: 'Grupo 2', members: 4, progress: { current: 3, total: 4 }, lastDocument: 'Matriz_Riscos_Final.xlsx', date: '02/05/2026', starred: false },
    { id: 3, name: 'Grupo 3', members: 4, progress: { current: 2, total: 4 }, lastDocument: 'Relatorio_v2.pdf', date: '02/05/2026', starred: true },
    { id: 4, name: 'Grupo 4', members: 4, progress: { current: 1, total: 4 }, lastDocument: 'Briefing_Analise.pdf', date: '25/04/2026', starred: false },
  ];

  const grupoSelecionado = groups.find(g => g.id === feedbackGrupoId) ?? null;

  return (
    <>
      <div className="px-6 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
          {groups.map((group) => (
            <div key={group.id} className="p-4 bg-white border border-gray-200 rounded-xl relative flex flex-col">
              <div className="mb-3">
                <h3 className="mb-1 text-gray-900">{group.name}</h3>
                <div className="text-xs text-gray-400">{group.members} membros</div>
              </div>
              <div className="flex gap-1 mb-4">
                {(gruposMembros[group.id] ?? Array.from({ length: group.members }, (_, i) => String(i))).map((nome, i) => (
                  fotosPorNome[nome]
                    ? <div key={i} className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"><img src={fotosPorNome[nome]} alt={nome} className="w-full h-full object-cover" /></div>
                    : <div key={i} className="w-10 h-10 bg-gray-200 rounded-full" />
                ))}
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>{group.progress.current} de {group.progress.total} entregas concluídas</span>
                  <span className="font-medium text-[#0F766E]">{Math.round((group.progress.current / group.progress.total) * 100)}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(group.progress.current / group.progress.total) * 100}%`, background: 'linear-gradient(to right, #0F766E, #34D399)' }} />
                </div>
              </div>
              <div className="flex gap-2 mt-auto">
                <button className="flex-1 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                  Ver entrega
                </button>
                <button
                  onClick={() => setFeedbackGrupoId(group.id)}
                  className="flex-1 py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-lg text-sm font-medium transition-colors">
                  Dar feedback
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {grupoSelecionado && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setFeedbackGrupoId(null)} />
            <GrupoFeedbackDrawer grupo={grupoSelecionado} onClose={() => setFeedbackGrupoId(null)} />
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function GrupoFeedbackDrawer({ grupo, onClose }: { grupo: { id: number; name: string }; onClose: () => void }) {
  const [entregaId, setEntregaId] = useState('v1');
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const [comentario, setComentario] = useState('');
  const [feedbackGrupo, setFeedbackGrupo] = useState('');
  const [alunoSelecionado, setAlunoSelecionado] = useState<string | null>(null);

  const entregaAtual = entregasWeb.find(e => e.id === entregaId)!;
  const membros = gruposMembros[grupo.id] ?? [];

  return (
    <motion.div
      className="fixed top-0 right-0 h-screen w-[520px] bg-white border-l border-gray-200 shadow-xl flex flex-col z-50"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
    >
      <div className="sticky top-0 z-10 bg-white px-5 py-4 flex items-center gap-3 border-b border-gray-100">
        <button
          onClick={alunoSelecionado ? () => setAlunoSelecionado(null) : onClose}
          className="w-6 h-6 flex items-center justify-center text-gray-600">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {alunoSelecionado
              ? <path d="M15 18l-6-6 6-6" />
              : <><path d="M18 6L6 18" /><path d="M6 6l12 12" /></>}
          </svg>
        </button>
        <h2 className="flex-1 text-base font-semibold text-gray-900">
          {alunoSelecionado ?? grupo.name}
        </h2>
        {!alunoSelecionado && (
          <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">Em andamento</span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        {alunoSelecionado ? (
          <AlunoDrawerView nome={alunoSelecionado} onVoltar={() => setAlunoSelecionado(null)} />
        ) : (
          <div className="space-y-5">
            {entregaId === 'v2' && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#0F766E]" />
                <span className="text-xs font-medium text-[#0F766E]">Etapa atual: Validação Parcial</span>
                <span className="text-xs text-gray-400">· Semana 13</span>
              </div>
            )}

            <div>
              <p className="text-sm font-medium text-gray-900 mb-2">Selecione a etapa</p>
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
                    {entregasWeb.map((e, i) => (
                      <button key={e.id}
                        onClick={() => { setEntregaId(e.id); setDropdownAberto(false); }}
                        className={`w-full p-3 text-left ${i < entregasWeb.length - 1 ? 'border-b border-gray-100' : ''} ${e.id === entregaId ? 'bg-gray-50' : ''}`}>
                        <div className="text-sm font-semibold text-gray-900">{e.nome}</div>
                        <div className="text-xs text-gray-500">{e.data}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="mb-1">
                <span className="text-sm font-medium text-gray-900">Comentário sobre as etapas</span>
                <div className="flex items-center gap-1 mt-0.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                  </svg>
                  <span className="text-xs text-gray-400">Visível só para você</span>
                </div>
              </div>
              <textarea value={comentario} onChange={e => setComentario(e.target.value)}
                placeholder="O que chamou atenção nesta etapa deste grupo?"
                rows={3} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-[#0F766E] resize-none" />
            </div>

            <div>
              <span className="text-sm font-medium text-gray-900">Feedback para o grupo</span>
              <p className="text-xs text-gray-400 mb-2 mt-0.5">Visível para o grupo</p>
              <textarea value={feedbackGrupo} onChange={e => setFeedbackGrupo(e.target.value)}
                placeholder="O que este grupo pode melhorar ou manteve de positivo?"
                rows={3} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-[#0F766E] resize-none" />
            </div>

            <div>
              <div className="text-sm font-medium text-gray-900 mb-3">Alunos do grupo</div>
              <div className="space-y-2">
                {membros.map((nome, i) => (
                  <button key={i} onClick={() => setAlunoSelecionado(nome)}
                    className="w-full flex items-center p-3 border border-gray-200 rounded-xl text-left hover:bg-gray-50 transition-colors">
                    {fotosPorNome[nome]
                      ? <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 mr-3"><img src={fotosPorNome[nome]} alt={nome} className="w-full h-full object-cover" /></div>
                      : <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0 mr-3"><span className="text-xs font-semibold text-white">{nome.split(' ').map((p: string) => p[0]).join('').slice(0,2)}</span></div>
                    }
                    <span className="flex-1 text-sm font-medium text-gray-900">{nome}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-gray-100 p-4 flex gap-3">
        <button onClick={alunoSelecionado ? () => setAlunoSelecionado(null) : onClose}
          className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700">
          Voltar
        </button>
        <button className="flex-1 py-3 bg-gray-900 text-white rounded-xl text-sm font-medium">
          Salvar
        </button>
      </div>
    </motion.div>
  );
}

function AlunoDrawerView({ nome }: { nome: string; onVoltar: () => void }) {
  const iniciais = nome.split(' ').map((p: string) => p[0]).join('').slice(0, 2);
  const [avaliacao, setAvaliacao] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [notaInterna, setNotaInterna] = useState('');

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[#0F766E]" />
        <span className="text-xs font-medium text-[#0F766E]">Etapa atual: Validação Parcial</span>
        <span className="text-xs text-gray-400">· Semana 13</span>
      </div>

      <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
        {fotosPorNome[nome]
          ? <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0"><img src={fotosPorNome[nome]} alt={nome} className="w-full h-full object-cover" /></div>
          : <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0"><span className="text-sm font-semibold text-white">{iniciais}</span></div>
        }
        <div>
          <div className="text-base font-semibold text-gray-900">{nome}</div>
          <div className="text-xs text-gray-400">Segurança no trabalho</div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-1">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2">
            <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
          <span className="text-sm font-semibold text-gray-700">Feedback para o aluno</span>
        </div>
        <p className="text-xs text-gray-400 mb-2">Visível para o aluno</p>
        <textarea value={feedback} onChange={e => setFeedback(e.target.value)}
          placeholder="Descreva o que se destacou na apresentação deste aluno..."
          rows={3} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0F766E] resize-none" />
      </div>

      <div>
        <div className="flex items-center gap-2 mb-1">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6M16 13H8M16 17H8" />
          </svg>
          <span className="text-sm font-semibold text-gray-700">Nota interna</span>
        </div>
        <p className="text-xs text-gray-400 mb-2">Visível só para você no dashboard</p>
        <textarea value={notaInterna} onChange={e => setNotaInterna(e.target.value)}
          placeholder="Algo que você quer lembrar sobre este aluno mais tarde..."
          rows={3} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0F766E] resize-none" />
      </div>

      <div>
        <div className="text-sm font-medium text-gray-900 mb-1">Avaliação (opcional)</div>
        <p className="text-xs text-gray-400 mb-3">Avaliação geral do aluno</p>
        <div className="flex items-center gap-2">
          {[1,2,3,4,5].map(n => {
            const filled = avaliacao !== null && n <= avaliacao;
            return (
              <div key={n} className="flex-1 flex flex-col items-center gap-1">
                {n > 1 && (
                  <div className="absolute" />
                )}
                <button onClick={() => setAvaliacao(n)}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                    filled ? 'bg-[#0F766E] border-[#0F766E]' : 'bg-white border-gray-300'
                  }`} />
              </div>
            );
          })}
        </div>
        <div className="relative mt-1">
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>Abaixo do esperado</span>
            <span>Superou expectativas</span>
          </div>
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
