import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function BancoDeTalentos({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [selectedStudents, setSelectedStudents] = useState<number[]>([5]);
  const [favoritedStudents, setFavoritedStudents] = useState<number[]>([3]);
  const [selectedProfileId, setSelectedProfileId] = useState<number | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);

  return (
    <div className="w-full h-full min-h-screen bg-gray-50 flex overflow-hidden relative">
      <Sidebar onNavigate={onNavigate} />
      <div className="flex-1 overflow-y-auto">
        <PageHeader selectedCount={selectedStudents.length} />
        <FilterBar />
        <ResultsCount />
        <StudentGrid
          selectedStudents={selectedStudents}
          setSelectedStudents={setSelectedStudents}
          favoritedStudents={favoritedStudents}
          setFavoritedStudents={setFavoritedStudents}
          setSelectedProfileId={setSelectedProfileId}
        />
      </div>
      <AnimatePresence>
        {selectedProfileId && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setSelectedProfileId(null)}
            />
            <StudentProfilePanel
              studentId={selectedProfileId}
              onClose={() => setSelectedProfileId(null)}
              showContactForm={showContactForm}
              setShowContactForm={setShowContactForm}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function Sidebar({ onNavigate }: { onNavigate: (view: string) => void }) {
  const navItems = [
    { label: 'Painel',   viewId: 'company', active: false },
    { label: 'Talentos', viewId: 'talents', active: true  },
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
        <div className="w-16 h-16 bg-white/20 rounded mb-2" />
        <div className="text-xs text-white/70">Laboratório Sabin</div>
      </div>
    </div>
  );
}

function PageHeader({ selectedCount: _ }: { selectedCount: number }) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="text-xs text-gray-400 mb-2">Talentos &gt; SafeLab — Turma concluída</div>
      <h1 className="mb-1 text-gray-900">Banco de Talentos</h1>
      <div className="text-sm text-gray-500">18 alunos concluíram o projeto SafeLab · Disponíveis para oportunidades</div>
    </div>
  );
}

function FilterBar() {
  return (
    <div className="px-6 py-4 bg-white border-b border-gray-200">
      <div className="flex items-center gap-3 mb-3">
        <input type="text" placeholder="Buscar por nome ou habilidade"
          className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0F766E]" />
      </div>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-500">Filtros:</span>
          <select className="px-3 py-1 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-[#0F766E]">
            <option>Nota final: 8+</option><option>Nota final: 9+</option><option>Todas as notas</option>
          </select>
          <select className="px-3 py-1 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-[#0F766E]">
            <option>Perfil MBTI: Todos</option><option>Analista</option><option>Diplomata</option><option>Sentinela</option>
          </select>
        </div>
        <button className="text-sm text-[#3B82F6]">2 filtros ativos · Limpar</button>
      </div>
    </div>
  );
}

function ResultsCount() {
  return (
    <div className="px-6 py-3 flex items-center justify-between">
      <div className="text-sm text-gray-500">Exibindo 12 de 18 alunos</div>
      <select className="px-3 py-1 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:border-[#0F766E]">
        <option>Ordenar por: Melhor nota</option><option>Ordenar por: Nome</option>
      </select>
    </div>
  );
}

function StudentGrid({ selectedStudents, setSelectedStudents, favoritedStudents, setFavoritedStudents, setSelectedProfileId }: any) {
  const students = [
    { id: 1, name: 'Ana Silva', course: 'Segurança no trabalho', institution: 'Escola Técnica Geração', grade: 9.1, mbti: 'INTJ', certifications: ['NR-32', 'NR-09'], summary: 'Desenvolveu PPRB para unidades de alto volume', available: true },
    { id: 2, name: 'Bruno Costa', course: 'Segurança no trabalho', institution: 'Escola Técnica Geração', grade: 8.8, mbti: 'ENFP', certifications: ['NR-32'], summary: 'Criou protocolo de auditoria mensal', available: true },
    { id: 3, name: 'Carlos Lima', course: 'Segurança no trabalho', institution: 'Escola Técnica Geração', grade: 7.9, mbti: 'ISTJ', certifications: ['NR-09', 'RDC 222'], summary: 'Mapeou riscos biológicos do laboratório', available: false },
    { id: 4, name: 'Diana Souza', course: 'Segurança no trabalho', institution: 'Escola Técnica Geração', grade: 9.3, mbti: 'ENFJ', certifications: ['NR-32', 'NR-09'], summary: 'Sistema de classificação com QR codes', available: true },
    { id: 5, name: 'Eduardo Alves', course: 'Segurança no trabalho', institution: 'Escola Técnica Geração', grade: 8.5, mbti: 'INTP', certifications: ['NR-32'], summary: 'App mobile para registro de incidentes', available: true },
    { id: 6, name: 'Fernanda Reis', course: 'Segurança no trabalho', institution: 'Escola Técnica Geração', grade: 9.0, mbti: 'ESFJ', certifications: ['NR-09', 'RDC 222'], summary: 'Programa de treinamento continuado', available: true },
    { id: 7, name: 'Gabriel Nunes', course: 'Segurança no trabalho', institution: 'Escola Técnica Geração', grade: 8.2, mbti: 'ISTP', certifications: ['NR-32'], summary: 'Dashboard de indicadores de segurança', available: true },
    { id: 8, name: 'Helena Campos', course: 'Segurança no trabalho', institution: 'Escola Técnica Geração', grade: 8.9, mbti: 'INFJ', certifications: ['NR-09'], summary: 'Matriz de riscos digitalizada', available: false },
    { id: 9, name: 'Igor Santos', course: 'Segurança no trabalho', institution: 'Escola Técnica Geração', grade: 7.8, mbti: 'ESTP', certifications: ['NR-32', 'RDC 222'], summary: 'Checklist de conformidade regulatória', available: true },
    { id: 10, name: 'Julia Moraes', course: 'Segurança no trabalho', institution: 'Escola Técnica Geração', grade: 9.2, mbti: 'INFP', certifications: ['NR-32', 'NR-09'], summary: 'Protocolo de emergência biológica', available: true },
    { id: 11, name: 'Lucas Barros', course: 'Segurança no trabalho', institution: 'Escola Técnica Geração', grade: 8.4, mbti: 'ENTJ', certifications: ['NR-09'], summary: 'Sistema de gestão de EPIs', available: true },
    { id: 12, name: 'Mariana Pinto', course: 'Segurança no trabalho', institution: 'Escola Técnica Geração', grade: 8.7, mbti: 'ISFP', certifications: ['NR-32', 'RDC 222'], summary: 'Plano de resposta a incidentes', available: true }
  ];

  const toggleSelection = (id: number) => {
    setSelectedStudents(selectedStudents.includes(id)
      ? selectedStudents.filter((sid: number) => sid !== id)
      : [...selectedStudents, id]);
  };

  const toggleFavorite = (id: number) => {
    setFavoritedStudents(favoritedStudents.includes(id)
      ? favoritedStudents.filter((sid: number) => sid !== id)
      : [...favoritedStudents, id]);
  };

  return (
    <div className="px-6 pb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 min-[1920px]:grid-cols-4 gap-4">
        {students.map((student) => {
          const isSelected = selectedStudents.includes(student.id);
          const isFavorited = favoritedStudents.includes(student.id);
          return (
            <div key={student.id}
              onClick={() => setSelectedProfileId(student.id)}
              className="p-4 bg-white rounded-xl border border-gray-200 relative cursor-pointer hover:border-[#0F766E]/40 transition-colors">
              <button
                onClick={e => { e.stopPropagation(); toggleFavorite(student.id); }}
                className="absolute top-3 right-3">
                <svg width="26" height="26" viewBox="0 0 24 24"
                  fill={isFavorited ? '#F59E0B' : 'none'}
                  stroke={isFavorited ? '#F59E0B' : '#D1D5DB'} strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </button>
              <div className="flex flex-col items-center pt-2 pb-3">
                <div className="w-16 h-16 bg-gray-200 rounded-full mb-3" />
                <h3 className="text-center mb-1 text-gray-900">{student.name}</h3>
                <div className="text-xs text-[#0F766E] text-center mb-3">
                  {student.course} — {student.institution}
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-[#0F766E]/10 text-[#0F766E] border border-[#0F766E]/20 rounded-lg text-sm font-medium">
                    Nota: {student.grade.toFixed(1)}
                  </span>
                  <span className="px-2 py-1 bg-[#3B82F6]/10 text-[#3B82F6] rounded-lg text-xs font-medium">
                    {student.mbti}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const avaliacoesAluno = [
  { id: 'e1',    nome: 'Entrega 1 — Análise Inicial',       data: '14/04/2026', nota: 8.5,
    comentarioProf: 'Boa entrega! O levantamento inicial está bem estruturado. Para a próxima, aprofundem a análise dos agentes biológicos e relacionem mais diretamente com a NR-32.',
    comentarioEmpresa: 'Boa compreensão do ambiente e dos riscos mapeados.' },
  { id: 'e2',    nome: 'Entrega 2 — Mapeamento de Riscos',  data: '05/05/2026', nota: 8.5,
    comentarioProf: 'Mapeamento completo. Fiquei satisfeita com o nível de detalhe. Revisem as medidas de controle para os riscos de categoria A antes da validação.',
    comentarioEmpresa: 'Soluções práticas e bem aplicadas ao contexto.' },
  { id: 'e3',    nome: 'Entrega 3 — Plano de Ação',         data: '26/05/2026', nota: 9.0,
    comentarioProf: 'Plano detalhado e com metas claras.',
    comentarioEmpresa: '' },
  { id: 'banca', nome: 'Banca Final',                       data: '14/06/2026', nota: 9.1,
    comentarioProf: 'Ana demonstrou excelente capacidade analítica e liderança. Superou as expectativas na aplicação prática da NR-32.',
    comentarioEmpresa: 'O grupo demonstrou excelente compreensão dos riscos ocupacionais. A análise foi completa e as recomendações são aplicáveis ao nosso contexto.' },
];

function StudentProfilePanel({ studentId, onClose, showContactForm, setShowContactForm }: any) {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'reviews'>('portfolio');
  const [entregaId, setEntregaId] = useState('banca');
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const entregaAtual = avaliacoesAluno.find(e => e.id === entregaId)!;

  const mbtiDimensions = [
    { label: 'Extroversão vs Introversão', value: 65, side: 'I' },
    { label: 'Intuição vs Sensação', value: 70, side: 'N' },
    { label: 'Pensamento vs Sentimento', value: 80, side: 'T' },
    { label: 'Julgamento vs Percepção', value: 60, side: 'J' }
  ];

  const tabs = [
    { id: 'portfolio', label: 'Portfólio' },
    { id: 'reviews',   label: 'Avaliações' },
  ] as const;

  return (
    <motion.div
      className="fixed top-0 right-0 h-screen w-[546px] bg-white border-l border-gray-200 shadow-xl flex flex-col overflow-hidden z-50"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
    >
      <div className="p-4 border-b border-gray-200 bg-[#3B82F6]">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-24 h-24 bg-white/30 rounded-full flex-shrink-0" />
            <div>
              <h3 className="text-white">Ana Silva</h3>
              <div className="text-xs text-white/70">Segurança no trabalho — Escola Técnica Geração</div>
            </div>
          </div>
          <button onClick={onClose} className="w-6 h-6 text-white/80 hover:text-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="flex gap-1 mt-8">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm rounded-t-lg transition-colors ${
                activeTab === tab.id ? 'bg-white text-[#3B82F6] font-medium' : 'text-white/70 hover:text-white'
              }`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === 'portfolio' && (
          <>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-900">SafeLab — Sabin</h4>
                <span className="text-xs text-gray-400">Mar–Mai 2026</span>
              </div>
              <div className="text-xs text-gray-400 mb-2">Função: Líder de projeto · Grupo 1</div>
              <p className="text-sm text-gray-700 mb-3">
                Liderou desenvolvimento de PPRB para unidades laboratoriais de alto volume.
                Coordenou mapeamento de riscos, análise NR-32 e validação com empresa parceira.
              </p>
              <div className="flex gap-2">
                <a href="#" className="flex items-center gap-1 text-xs text-[#3B82F6]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" />
                  </svg>
                  PPRB_Final.pdf
                </a>
                <a href="#" className="flex items-center gap-1 text-xs text-[#3B82F6]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" />
                  </svg>
                  Matriz_Riscos.xlsx
                </a>
              </div>
            </div>

            <div className="p-3 bg-[#0F766E]/5 border border-[#0F766E]/20 rounded-xl">
              <div className="text-xs text-[#0F766E] font-medium mb-2">Comentário do Professor:</div>
              <p className="text-sm text-gray-700 italic mb-2">
                "Ana demonstrou excelente capacidade analítica e liderança. Seu trabalho
                superou as expectativas, especialmente na aplicação prática da NR-32."
              </p>
              <div className="text-xs text-gray-400">— Prof. Carla Mendes</div>
            </div>

            <div className="p-3 bg-[#3B82F6]/5 border border-[#3B82F6]/20 rounded-xl">
              <div className="text-xs text-[#3B82F6] font-medium mb-2">Avaliação da Sabin:</div>
              <p className="text-sm text-gray-700 mb-2">
                Proposta aprovada para banca · Potencial de implementação identificado
              </p>
              <div className="text-sm text-gray-600">
                Nota empresa: <span className="px-2 py-0.5 bg-white border border-[#3B82F6]/30 rounded-lg text-[#3B82F6] font-medium">8.5</span>
              </div>
            </div>

            <div className="p-3 bg-white border border-gray-200 rounded-xl">
              <div className="text-sm font-medium text-gray-900 mb-3">Perfil MBTI: INTJ</div>
              <div className="space-y-2">
                {mbtiDimensions.map((dim, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>{dim.label}</span>
                      <span className="font-medium text-[#0F766E]">{dim.value}% {dim.side}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{
                        width: `${dim.value}%`,
                        background: 'linear-gradient(to right, #0F766E, #34D399)'
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-white border border-gray-200 rounded-xl">
              <div className="text-sm font-medium text-gray-900 mb-2">Certificações (2)</div>
              <div className="space-y-2">
                {[{ code: 'NR-32', name: 'Segurança em Serviços de Saúde' }, { code: 'NR-09', name: 'Programa de Prevenção de Riscos' }].map((cert, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#34D399]/20 border border-[#34D399]/40 rounded-lg flex items-center justify-center text-[#0F766E]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{cert.code}</div>
                      <div className="text-xs text-gray-400">{cert.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'reviews' && (
          <>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-900 mb-2">Selecione a entrega</p>
              <div className="relative">
                <button onClick={() => setDropdownAberto(!dropdownAberto)}
                  className="w-full p-3 border border-gray-200 rounded-xl flex items-center justify-between text-left">
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{entregaAtual.nome}</div>
                    <div className="text-xs text-gray-500">{entregaAtual.data}</div>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                    {dropdownAberto ? <path d="M18 15l-6-6-6 6" /> : <path d="M6 9l6 6 6-6" />}
                  </svg>
                </button>
                {dropdownAberto && (
                  <div className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-xl bg-white shadow-md z-20 overflow-hidden">
                    {avaliacoesAluno.map((e, i) => (
                      <button key={e.id}
                        onClick={() => { setEntregaId(e.id); setDropdownAberto(false); }}
                        className={`w-full p-3 text-left flex items-center justify-between ${i < avaliacoesAluno.length - 1 ? 'border-b border-gray-100' : ''} ${e.id === entregaId ? 'bg-gray-50' : ''}`}>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{e.nome}</div>
                          <div className="text-xs text-gray-500">{e.data}</div>
                        </div>
                        <span className="text-sm font-semibold text-gray-700">{e.nota}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="p-3 bg-[#0F766E]/5 border border-[#0F766E]/20 rounded-xl mb-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-[#0F766E] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold" style={{ fontSize: '9px' }}>PC</span>
                </div>
                <span className="text-xs font-medium text-[#0F766E]">Prof. Carla · Nota: {entregaAtual.nota}</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{entregaAtual.comentarioProf}</p>
            </div>

            {entregaAtual.comentarioEmpresa && (
              <div className="p-3 bg-[#3B82F6]/5 border border-[#3B82F6]/20 rounded-xl mb-4">
                <div className="text-xs text-[#3B82F6] font-medium mb-2">Avaliação da Sabin</div>
                <p className="text-sm text-gray-700 leading-relaxed">{entregaAtual.comentarioEmpresa}</p>
              </div>
            )}

            <div className="text-sm font-medium text-gray-900 mb-2">Evolução</div>
            <div className="border border-gray-200 rounded-xl p-3">
              <RadarChart entregaId={entregaId} entregaNome={entregaAtual.nome} />
            </div>
          </>
        )}
      </div>

      <div className="p-4 border-t border-gray-200">
        {!showContactForm ? (
          <button onClick={() => setShowContactForm(true)}
            className="w-full py-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-xl font-medium transition-colors">
            Entrar em contato
          </button>
        ) : (
          <div className="space-y-3">
            <input type="text" placeholder="Título da oportunidade"
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0F766E]" />
            <textarea placeholder="Mensagem para o candidato"
              className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:border-[#0F766E]" rows={3} />
            <div className="flex gap-2">
              <button onClick={() => setShowContactForm(false)}
                className="flex-1 py-2 bg-white border border-gray-200 text-gray-600 rounded-xl text-sm hover:bg-gray-50 transition-colors">
                Cancelar
              </button>
              <button className="flex-1 py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-xl text-sm font-medium transition-colors">
                Enviar
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

const dadosRadar: Record<string, number[]> = {
  e1:    [0.55, 0.50, 0.60, 0.65, 0.55],
  e2:    [0.65, 0.60, 0.70, 0.70, 0.65],
  e3:    [0.72, 0.68, 0.78, 0.75, 0.72],
  e4:    [0.78, 0.75, 0.82, 0.80, 0.78],
  e5:    [0.83, 0.79, 0.87, 0.83, 0.83],
  banca: [0.88, 0.82, 0.90, 0.85, 0.87],
};

function RadarChart({ entregaId, entregaNome }: { entregaId: string; entregaNome: string }) {
  const cx = 130, cy = 118, r = 70;
  const eixos = ['Pontualidade', 'Proatividade', 'Comunicação', 'Compromisso', 'Execução'];
  const inicio = dadosRadar['e1'];
  const atual  = dadosRadar[entregaId] ?? dadosRadar['banca'];

  const ang = (i: number) => (Math.PI * 2 * i) / eixos.length - Math.PI / 2;
  const pt  = (i: number, v: number) => ({ x: cx + r * v * Math.cos(ang(i)), y: cy + r * v * Math.sin(ang(i)) });
  const lp  = (i: number) => ({ x: cx + (r + 22) * Math.cos(ang(i)), y: cy + (r + 22) * Math.sin(ang(i)) });
  const poly = (vals: number[]) =>
    vals.map((v, i) => { const p = pt(i, v); return `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`; }).join(' ') + 'Z';

  return (
    <>
      <div className="flex items-center gap-4 mb-1 justify-end">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-0.5 bg-[#34D399]" />
          <span className="text-xs text-gray-400">início</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-0.5 bg-[#3B82F6]" />
          <span className="text-xs text-gray-400 truncate max-w-[90px]">{entregaNome.split('—')[0].trim()}</span>
        </div>
      </div>
      <svg viewBox="0 0 260 245" className="w-full">
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
