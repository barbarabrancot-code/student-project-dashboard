import { useState } from 'react';

const entregasProf = [
  { id: 'e1',    nome: 'Entrega 1 — Análise Inicial',      semana: 'Semana 6'  },
  { id: 'e2',    nome: 'Entrega 2 — Mapeamento de Riscos', semana: 'Semana 10' },
  { id: 'e3',    nome: 'Entrega 3 — Plano de Ação',        semana: 'Semana 13' },
  { id: 'banca', nome: 'Banca Final',                      semana: 'Semana 16' },
];

export default function AvaliacaoFinal({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [expandedGroup, setExpandedGroup] = useState<number>(3);
  const [grades, setGrades] = useState({ participacao: 7.5, entregas: 8.5, bancaProfessor: 8.0 });
  const [entregaId, setEntregaId] = useState('banca');

  const entregaAtual = entregasProf.find(e => e.id === entregaId)!;
  const bancaCompany = 8.0;
  const bancaFinal = (bancaCompany * 0.2) + (grades.bancaProfessor * 0.8);
  const notaFinal = (grades.participacao * 0.2) + (grades.entregas * 0.4) + (bancaFinal * 0.4);

  return (
    <div className="w-full h-full min-h-screen bg-gray-50 flex overflow-hidden">
      <Sidebar onNavigate={onNavigate} />
      <div className="flex-1 overflow-y-auto">
        <PageHeader
          evaluatedCount={2}
          totalGroups={4}
          entregaId={entregaId}
          setEntregaId={setEntregaId}
          entregaAtual={entregaAtual}
        />
        <GroupAccordionList
          expandedGroup={expandedGroup}
          setExpandedGroup={setExpandedGroup}
          grades={grades}
          setGrades={setGrades}
          bancaCompany={bancaCompany}
          bancaFinal={bancaFinal}
          notaFinal={notaFinal}
        />
      </div>
    </div>
  );
}

function Sidebar({ onNavigate }: { onNavigate: (view: string) => void }) {
  const navItems = [
    { label: 'Painel',    viewId: 'teacher', active: false },
    { label: 'Avaliação', viewId: 'grading', active: true  },
    { label: 'Projeto',   viewId: null,      active: false },
    { label: 'Perfil',    viewId: null,      active: false },
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
      <div className="p-4 border-t border-white/20 flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-full" />
        <div className="text-sm text-white">Prof. Carla</div>
      </div>
    </div>
  );
}

function PageHeader({ evaluatedCount, totalGroups, entregaId, setEntregaId, entregaAtual }: {
  evaluatedCount: number;
  totalGroups: number;
  entregaId: string;
  setEntregaId: (id: string) => void;
  entregaAtual: { id: string; nome: string; semana: string };
}) {
  const [dropdownAberto, setDropdownAberto] = useState(false);

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="text-xs text-gray-400 mb-2">Segurança do Trabalho T2 &gt; Avaliação</div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-gray-900">Avaliação — {entregaAtual.semana}</h1>
          <span className="px-3 py-1 bg-[#0F766E]/10 text-[#0F766E] border border-[#0F766E]/20 rounded-full text-xs font-medium">
            {evaluatedCount} de {totalGroups} grupos avaliados
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setDropdownAberto(!dropdownAberto)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm bg-white transition-colors"
              style={{ border: '2px solid transparent', background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #34D399, #0F766E) border-box' }}>
              <span className="font-medium text-gray-900">{entregaAtual.nome}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                {dropdownAberto ? <path d="M18 15l-6-6-6 6" /> : <path d="M6 9l6 6 6-6" />}
              </svg>
            </button>
            {dropdownAberto && (
              <div className="absolute top-full right-0 mt-1 w-72 border border-gray-200 rounded-xl bg-white shadow-lg z-20 overflow-hidden">
                {entregasProf.map((e, i) => (
                  <button key={e.id}
                    onClick={() => { setEntregaId(e.id); setDropdownAberto(false); }}
                    className={`w-full px-4 py-3 text-left flex items-center justify-between ${
                      i < entregasProf.length - 1 ? 'border-b border-gray-100' : ''
                    } ${e.id === entregaId ? 'bg-gray-50' : 'hover:bg-gray-50'}`}>
                    <span className="text-sm font-medium text-gray-900">{e.nome}</span>
                    <span className="text-xs text-gray-400">{e.semana}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const fotosPorNome: Record<string, string> = {
  'Ana Silva':        '/student-project-dashboard/aluna.png',
  'Bruno Costa':      '/student-project-dashboard/brunocosta-convertido-de-jpg.webp',
  'Carlos Lima':      '/student-project-dashboard/carloslima-convertido-de-jpg.webp',
  'Diana Santos':     '/student-project-dashboard/dianasouza-convertido-de-jpg.webp',
  'Eduardo Alves':    '/student-project-dashboard/eduardoalves-convertido-de-jpg.webp',
  'Fernanda Reis':    '/student-project-dashboard/fernandareis.webp',
  'Gabriel Nunes':    '/student-project-dashboard/gabrielnunes-convertido-de-jpg.webp',
  'Helena Campos':    '/student-project-dashboard/helenacampos.webp',
  'Mariana Ferreira': '/student-project-dashboard/marinaferreira.webp',
  'Pedro Gomes':      '/student-project-dashboard/pedrogomes.webp',
  'Rafael Henrique':  '/student-project-dashboard/rafaelhenrique.webp',
  'Thiago Kühl':      '/student-project-dashboard/thiagokuhl.webp',
  'Valentina Lima':   '/student-project-dashboard/valentinalima.webp',
  'William Martins':  '/student-project-dashboard/williammartins.webp',
  'Xênia Neves':      '/student-project-dashboard/xenianeves.webp',
};

const gruposMembros: Record<number, string[]> = {
  1: ['Ana Silva', 'Bruno Costa', 'Carlos Lima', 'Diana Santos'],
  2: ['Mariana Ferreira', 'Pedro Gomes', 'Rafael Henrique'],
  3: ['Thiago Kühl', 'Valentina Lima', 'William Martins', 'Xênia Neves'],
  4: ['Eduardo Alves', 'Fernanda Reis', 'Gabriel Nunes', 'Helena Campos'],
};

function GroupAccordionList({ expandedGroup, setExpandedGroup, grades, setGrades, bancaCompany, bancaFinal, notaFinal }: any) {
  const groups = [
    { id: 1, name: 'Grupo 1', members: 4, finalGrade: 7.8, companyFeedback: 'received' },
    { id: 2, name: 'Grupo 2', members: 4, finalGrade: 9.1, companyFeedback: 'received' },
    { id: 3, name: 'Grupo 3', members: 4, finalGrade: null, companyFeedback: 'received' },
    { id: 4, name: 'Grupo 4', members: 4, finalGrade: null, companyFeedback: 'pending' }
  ];

  return (
    <div className="p-6 space-y-3">
      {groups.map((group) => (
        <div key={group.id} className={`bg-white rounded-xl overflow-hidden border transition-colors ${
          expandedGroup === group.id ? 'border-[#0F766E]/30' : 'border-gray-200'
        }`}>
          <button
            onClick={() => setExpandedGroup(expandedGroup === group.id ? null : group.id)}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <h3 className="text-gray-900">{group.name}</h3>
              <div className="flex gap-1">
                {(gruposMembros[group.id] ?? []).map((nome, i) => (
                  fotosPorNome[nome]
                    ? <div key={i} className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0"><img src={fotosPorNome[nome]} alt={nome} className="w-full h-full object-cover" /></div>
                    : <div key={i} className="w-6 h-6 bg-gray-200 rounded-full" />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-sm text-gray-600">
                Nota final:{' '}
                <span className="font-medium text-gray-900">
                  {group.id === 3 && expandedGroup === 3 ? notaFinal.toFixed(1) : group.finalGrade ? group.finalGrade.toFixed(1) : '—'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">Avaliação empresa:</span>
                {group.companyFeedback === 'received' ? (
                  <span className="text-[#0F766E] flex items-center gap-1 font-medium">
                    Recebido
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                ) : (
                  <span className="text-amber-500">Aguardando</span>
                )}
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className={`transition-transform text-gray-400 ${expandedGroup === group.id ? 'rotate-180' : ''}`}>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </button>

          {expandedGroup === group.id && group.id === 3 && (
            <div className="border-t border-gray-100 p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <CompanyFeedback />
                <LaboraAIFeedback />
              </div>
              <ProfessorGradingForm grades={grades} setGrades={setGrades} bancaCompany={bancaCompany} />
              <CalculatedGrade notaFinal={notaFinal} grades={grades} bancaFinal={bancaFinal} />
              <IndividualGradesTable groupGrade={notaFinal} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function CompanyFeedback() {
  return (
    <div className="p-4 bg-[#0F766E]/5 border border-[#0F766E]/20 rounded-xl">
      <div className="mb-3">
        <div className="text-sm font-medium text-gray-900">Avaliação da Empresa — Sabin</div>
      </div>
      <div className="p-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 mb-2">
        O grupo demonstrou excelente compreensão dos riscos ocupacionais no ambiente laboratorial.
        A análise foi completa e as recomendações são aplicáveis ao nosso contexto.
        Destacamos a qualidade da matriz de riscos apresentada.
      </div>
    </div>
  );
}

function LaboraAIFeedback() {
  const metricas = [
    { label: 'Pontualidade nas entregas', valor: '10,0', detalhe: '5 de 5 entregas no prazo' },
    { label: 'Frequência de registros',   valor: '9,5',  detalhe: 'Atividade média acima do esperado' },
    { label: 'Contribuição individual',   valor: '8,0',  detalhe: 'Tarefas concluídas por membro' },
  ];

  return (
    <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0">
          <img src="/student-project-dashboard/favicon.svg" alt="Labora" className="w-6 h-6 object-contain" />
        </div>
        <div className="text-sm font-medium text-gray-900">Avaliação da IA — Labora</div>
      </div>
      <div className="space-y-2">
        {metricas.map((m, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
            <div>
              <div className="text-xs font-medium text-gray-700">{m.label}</div>
              <div className="text-xs text-gray-400 mt-0.5">{m.detalhe}</div>
            </div>
            <span className="text-sm font-semibold text-gray-900 ml-4">{m.valor}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-3 pt-2 border-t border-gray-200">Gerado automaticamente · não editável</p>
    </div>
  );
}

function ProfessorGradingForm({ grades, setGrades, bancaCompany }: any) {
  const criteria = [
    { id: 'participacao', label: 'Participação ao longo do semestre', weight: '20% da nota final', value: grades.participacao },
    { id: 'entregas', label: 'Qualidade das entregas intermediárias', weight: '40% da nota final', value: grades.entregas },
    { id: 'bancaProfessor', label: 'Banca final (inclui nota da empresa)', weight: '40% da nota final', value: grades.bancaProfessor,
      note: `Empresa: ${bancaCompany.toFixed(1)} · Sua nota: ${grades.bancaProfessor.toFixed(1)} · Peso empresa: 20%` }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-gray-900">Critérios de Avaliação do Professor</h3>
      {criteria.map((criterion) => (
        <div key={criterion.id} className="p-4 bg-white border border-gray-200 rounded-xl">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="text-sm font-medium text-gray-900 mb-1">{criterion.label}</div>
              <div className="text-xs text-gray-400">{criterion.weight}</div>
              {criterion.note && <div className="text-xs text-[#0F766E] mt-1">{criterion.note}</div>}
            </div>
            <div className="flex items-center gap-2">
              <input type="number" min="0" max="10" step="0.1" value={criterion.value}
                onChange={(e) => setGrades({ ...grades, [criterion.id]: parseFloat(e.target.value) || 0 })}
                className="w-20 px-3 py-2 border border-gray-200 rounded-lg text-sm text-center focus:outline-none focus:border-[#0F766E]" />
              <span className="text-sm text-gray-400">/ 10</span>
            </div>
          </div>
          <textarea placeholder="Comentário qualitativo (opcional)"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:border-[#0F766E]" rows={2} />
        </div>
      ))}
    </div>
  );
}

function CalculatedGrade({ notaFinal, grades, bancaFinal }: any) {
  return (
    <div className="p-6 rounded-xl text-white" style={{ background: 'linear-gradient(135deg, #0F766E, #3B82F6)' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white">Nota Final Calculada</h3>
        <div className="text-3xl font-bold text-white">{notaFinal.toFixed(1)}</div>
      </div>
      <div className="p-3 bg-white/20 rounded-lg text-sm text-white">
        <div className="mb-2 text-white/80">Fórmula de cálculo:</div>
        <div className="font-mono text-xs text-white">
          ({grades.participacao.toFixed(1)} × 0.2) + ({grades.entregas.toFixed(1)} × 0.4) + ({bancaFinal.toFixed(1)} × 0.4) = {notaFinal.toFixed(1)}
        </div>
      </div>
    </div>
  );
}

function IndividualGradesTable({ groupGrade }: { groupGrade: number }) {
  const students = [
    { name: 'Ana Silva', adjustment: 0, comment: '' },
    { name: 'Bruno Costa', adjustment: 0.5, comment: 'Liderança do grupo' },
    { name: 'Carlos Lima', adjustment: -0.3, comment: 'Participação abaixo da média' },
    { name: 'Diana Souza', adjustment: 0, comment: '' }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-gray-900">Notas Individuais dos Alunos</h3>
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Nome</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Nota do grupo</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Ajuste individual</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Nota final</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Comentário</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {students.map((student, index) => {
              const finalGrade = Math.min(10, Math.max(0, groupGrade + student.adjustment));
              return (
                <tr key={index} className="border-t border-gray-100">
                  <td className="px-4 py-3 text-sm text-gray-900">{student.name}</td>
                  <td className="px-4 py-3 text-center text-sm text-gray-500">{groupGrade.toFixed(1)}</td>
                  <td className="px-4 py-3 text-center">
                    <input type="number" step="0.1" defaultValue={student.adjustment}
                      className="w-16 px-2 py-1 border border-gray-200 rounded-lg text-sm text-center focus:outline-none focus:border-[#0F766E]" />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="px-3 py-1 bg-[#0F766E]/10 text-[#0F766E] border border-[#0F766E]/20 rounded-lg text-sm font-medium">
                      {finalGrade.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <input type="text" defaultValue={student.comment} placeholder="Comentário opcional"
                      className="w-full px-2 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0F766E]" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
        <button className="px-6 py-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-xl text-sm font-medium transition-colors">
          Publicar para alunos
        </button>
      </div>
    </div>
  );
}
