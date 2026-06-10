import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Aluno {
  iniciais: string;
  nome: string;
  cargo: string;
  foto?: string;
}

interface Grupo {
  id: number;
  nome: string;
  status: string;
  membros: Aluno[];
}

const grupos: Grupo[] = [
  {
    id: 1, nome: 'Grupo 1', status: 'Em andamento',
    membros: [
      { iniciais: 'AS', nome: 'Ana Silva',    cargo: 'Técnico em Segurança do Trabalho', foto: '/student-project-dashboard/aluna.png' },
      { iniciais: 'BC', nome: 'Bruno Costa',  cargo: 'Técnico em Segurança do Trabalho', foto: '/student-project-dashboard/brunocosta-convertido-de-jpg.webp' },
      { iniciais: 'CL', nome: 'Carlos Lima',  cargo: 'Técnico em Segurança do Trabalho', foto: '/student-project-dashboard/carloslima-convertido-de-jpg.webp' },
      { iniciais: 'DS', nome: 'Diana Santos', cargo: 'Técnico em Segurança do Trabalho', foto: '/student-project-dashboard/dianasouza-convertido-de-jpg.webp' },
    ],
  },
  {
    id: 2, nome: 'Grupo 2', status: 'Em andamento',
    membros: [
      { iniciais: 'MF', nome: 'Mariana Ferreira', cargo: 'Técnico em Segurança do Trabalho', foto: '/student-project-dashboard/marinaferreira.webp' },
      { iniciais: 'PG', nome: 'Pedro Gomes',      cargo: 'Técnico em Segurança do Trabalho', foto: '/student-project-dashboard/pedrogomes.webp' },
      { iniciais: 'RH', nome: 'Rafael Henrique',  cargo: 'Técnico em Segurança do Trabalho', foto: '/student-project-dashboard/rafaelhenrique.webp' },
    ],
  },
  {
    id: 3, nome: 'Grupo 3', status: 'Em andamento',
    membros: [
      { iniciais: 'TK', nome: 'Thiago Kühl',     cargo: 'Técnico em Segurança do Trabalho', foto: '/student-project-dashboard/thiagokuhl.webp' },
      { iniciais: 'VL', nome: 'Valentina Lima',  cargo: 'Técnico em Segurança do Trabalho', foto: '/student-project-dashboard/valentinalima.webp' },
      { iniciais: 'WM', nome: 'William Martins', cargo: 'Técnico em Segurança do Trabalho', foto: '/student-project-dashboard/williammartins.webp' },
      { iniciais: 'XN', nome: 'Xênia Neves',     cargo: 'Técnico em Segurança do Trabalho', foto: '/student-project-dashboard/xenianeves.webp' },
    ],
  },
  {
    id: 4, nome: 'Grupo 4', status: 'Em andamento',
    membros: [
      { iniciais: 'EA', nome: 'Eduardo Alves',  cargo: 'Técnico em Segurança do Trabalho', foto: '/student-project-dashboard/eduardoalves-convertido-de-jpg.webp' },
      { iniciais: 'FR', nome: 'Fernanda Reis',  cargo: 'Técnico em Segurança do Trabalho', foto: '/student-project-dashboard/fernandareis.webp' },
      { iniciais: 'GN', nome: 'Gabriel Nunes',  cargo: 'Técnico em Segurança do Trabalho', foto: '/student-project-dashboard/gabrielnunes-convertido-de-jpg.webp' },
      { iniciais: 'HC', nome: 'Helena Campos',  cargo: 'Técnico em Segurança do Trabalho', foto: '/student-project-dashboard/helenacampos.webp' },
    ],
  },
];

type Tela = 'home' | 'alunos' | 'aluno-visualizacao' | 'grupo' | 'grupo-visualizacao' | 'aluno';

export default function EmpresaApp() {
  const [tela, setTela] = useState<Tela>('home');
  const [grupoAtual, setGrupoAtual] = useState<Grupo | null>(null);
  const [alunoAtual, setAlunoAtual] = useState<Aluno | null>(null);
  const [modalDestaque, setModalDestaque] = useState(false);
  const [origemAluno, setOrigemAluno] = useState<Tela>('grupo');

  const irParaGrupo = (g: Grupo) => { setGrupoAtual(g); setTela('grupo'); };
  const irParaGrupoVisualizacao = (g: Grupo) => { setGrupoAtual(g); setTela('grupo-visualizacao'); };
  const irParaVisualizacao = (a: Aluno) => { setAlunoAtual(a); setTela('aluno-visualizacao'); };
  const irParaAluno = (a: Aluno, origem: Tela = 'grupo') => {
    setAlunoAtual(a);
    setOrigemAluno(origem);
    setModalDestaque(false);
    setTela('aluno');
  };
  const voltarDeAluno = () => setTela(origemAluno);
  const showNavbar = tela === 'home' || tela === 'alunos';

  return (
    <div className="w-full h-full flex flex-col bg-white relative overflow-hidden">
      {tela === 'home' && <HomeEmpresa onGrupo={irParaGrupo} />}
      {tela === 'alunos' && <TelaAlunos onAluno={irParaVisualizacao} onGrupo={irParaGrupoVisualizacao} />}
      {tela === 'aluno-visualizacao' && alunoAtual && (
        <AlunoVisualizacao
          aluno={alunoAtual}
          onVoltar={() => setTela('alunos')}
          onEditar={() => irParaAluno(alunoAtual, 'aluno-visualizacao')}
        />
      )}
      {tela === 'grupo' && grupoAtual && (
        <GrupoDetalhe grupo={grupoAtual} onVoltar={() => setTela('home')} onAluno={(a) => irParaAluno(a, 'grupo')} />
      )}
      {tela === 'grupo-visualizacao' && grupoAtual && (
        <GrupoVisualizacao
          grupo={grupoAtual}
          onVoltar={() => setTela('alunos')}
          onEditar={() => { setTela('grupo'); }}
          onAluno={irParaVisualizacao}
        />
      )}
      {tela === 'aluno' && alunoAtual && (
        <AlunoDetalhe aluno={alunoAtual} onVoltar={voltarDeAluno} onDestaque={() => setModalDestaque(true)} />
      )}
      <AnimatePresence>
        {modalDestaque && alunoAtual && (
          <ModalDestaque aluno={alunoAtual} onContinuar={() => setModalDestaque(false)} />
        )}
      </AnimatePresence>
      {showNavbar && (
        <NavbarEmpresa ativa={tela === 'alunos' ? 'alunos' : 'home'} onChange={(v) => setTela(v)} />
      )}
    </div>
  );
}

function HomeEmpresa({ onGrupo }: { onGrupo: (g: Grupo) => void }) {
  const marcos = [
    { label: 'Visita Técnica',    sub: 'Semana 4',     status: 'completed' },
    { label: 'Validação Parcial', sub: 'em 5 semanas', status: 'current'   },
    { label: 'Banca Final',       sub: 'Semana 16',    status: 'future'    },
  ];

  return (
    <div className="flex-1 overflow-y-auto px-5 pt-8">
      <h1 className="text-xl font-semibold text-gray-900 mb-3 leading-snug">
        SafeLab — Mapeamento de Riscos Ocupacionais
      </h1>
      <span className="inline-block px-3 py-1 bg-[#0F766E]/10 text-[#0F766E] rounded-full text-xs font-medium mb-7">
        Semana 8 de 16
      </span>

      <div className="relative mb-8">
        <div className="absolute top-[22px] left-[22px] right-[22px] flex pointer-events-none">
          {marcos.slice(0, -1).map((m, i) => (
            <div key={i} className={`flex-1 h-0.5 ${m.status === 'completed' ? 'bg-[#34D399]' : 'bg-gray-200'}`} />
          ))}
        </div>
        <div className="flex justify-between">
          {marcos.map((m, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`w-11 h-11 rounded-full border-2 flex items-center justify-center relative z-10 ${
                m.status === 'completed' ? 'bg-[#0F766E] border-[#0F766E]' :
                m.status === 'current'   ? 'bg-white border-[#0F766E]' :
                'bg-white border-gray-200'
              }`}>
                {m.status === 'completed' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                )}
                {m.status === 'current' && <div className="w-3 h-3 bg-[#0F766E] rounded-full" />}
              </div>
              <div className="mt-2 text-center">
                <div className={`text-xs whitespace-nowrap ${m.status === 'current' ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
                  {m.label}
                </div>
                <div className="text-xs text-gray-400">{m.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 text-center mt-3">Sua participação está concentrada nesses 3 momentos</p>
      </div>

      <p className="text-xs text-gray-400 mb-4">Toque em um grupo para avaliar</p>

      <div className="space-y-3">
        {grupos.map((g) => (
          <button key={g.id} onClick={() => onGrupo(g)}
            className="w-full text-left p-4 border border-gray-200 rounded-xl flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-gray-900 mb-2">{g.nome}</div>
              <div className="flex gap-2">
                {g.membros.slice(0, 4).map((m, i) => (
                  <div key={i} className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">{m.iniciais}</span>
                  </div>
                ))}
                {g.membros.length > 4 && (
                  <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-xs text-gray-500">+{g.membros.length - 4}</span>
                  </div>
                )}
              </div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}

function GrupoDetalhe({ grupo, onVoltar, onAluno }: {
  grupo: Grupo;
  onVoltar: () => void;
  onAluno: (a: Aluno) => void;
}) {
  const [comentario, setComentario] = useState('');
  const [feedbackGrupo, setFeedbackGrupo] = useState('');

  return (
    <>
      <div className="sticky top-0 z-10 bg-white px-4 py-3 flex items-center gap-3 border-b border-gray-100">
        <button onClick={onVoltar} className="w-6 h-6 flex items-center justify-center text-gray-600">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="flex-1 text-base font-semibold text-gray-900">{grupo.nome}</h1>
        <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">{grupo.status}</span>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pt-4">
        <div className="flex items-center gap-2 mb-4 px-1">
          <div className="w-2 h-2 rounded-full bg-[#0F766E]" />
          <span className="text-xs font-medium text-[#0F766E]">Etapa atual: Validação Parcial</span>
          <span className="text-xs text-gray-400">· Semana 13</span>
        </div>
        <div className="mb-5">
          <div className="mb-2">
            <span className="text-sm font-medium text-gray-900">Comentário sobre as entregas</span>
            <div className="flex items-center gap-1 mt-0.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
              </svg>
              <span className="text-xs text-gray-400">Visível só para você</span>
            </div>
          </div>
          <textarea
            value={comentario}
            onChange={e => setComentario(e.target.value)}
            placeholder="O que chamou atenção nas entregas deste grupo?"
            rows={3}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-[#0F766E] resize-none"
          />
        </div>

        <div className="mb-5">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-sm font-medium text-gray-900">Feedback para o grupo</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" />
            </svg>
          </div>
          <p className="text-xs text-gray-400 mb-2">Visível para o grupo</p>
          <textarea
            value={feedbackGrupo}
            onChange={e => setFeedbackGrupo(e.target.value)}
            placeholder="O que este grupo pode melhorar ou manteve de positivo?"
            rows={3}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-[#0F766E] resize-none"
          />
        </div>

        <div className="border-t border-gray-100 mb-5" />

        <div className="text-sm font-medium text-gray-900 mb-3">Alunos do grupo</div>
        <div className="space-y-2">
          {grupo.membros.map((aluno, i) => (
            <button key={i} onClick={() => onAluno(aluno)}
              className="w-full flex items-center p-3 border border-gray-200 rounded-xl text-left">
              {aluno.foto
                ? <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 mr-3"><img src={aluno.foto} alt={aluno.nome} className="w-full h-full object-cover" /></div>
                : <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0 mr-3"><span className="text-xs font-semibold text-white">{aluno.iniciais}</span></div>
              }
              <span className="flex-1 text-sm font-medium text-gray-900">{aluno.nome}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4 flex gap-3 flex-shrink-0">
        <button onClick={onVoltar} className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700">
          Voltar
        </button>
        <button className="flex-1 py-3 bg-gray-900 text-white rounded-xl text-sm font-medium">
          Salvar
        </button>
      </div>
    </>
  );
}

function AlunoDetalhe({ aluno, onVoltar, onDestaque }: {
  aluno: Aluno;
  onVoltar: () => void;
  onDestaque: () => void;
}) {
  const [feedback, setFeedback] = useState('');
  const [notaInterna, setNotaInterna] = useState('');
  const [avaliacao, setAvaliacao] = useState<number | null>(null);
  const [destacado, setDestacado] = useState(false);

  const handleDestaque = () => {
    if (destacado) { setDestacado(false); } else { setDestacado(true); onDestaque(); }
  };

  return (
    <>
      <div className="sticky top-0 z-10 bg-white px-4 py-3 flex items-center gap-3 border-b border-gray-100">
        <button onClick={onVoltar} className="w-6 h-6 flex items-center justify-center text-gray-600">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="flex-1 text-base font-semibold text-gray-900">{aluno.nome}</h1>
        <button onClick={handleDestaque} className="w-8 h-8 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24"
            fill={destacado ? '#F59E0B' : 'none'}
            stroke={destacado ? '#F59E0B' : '#9CA3AF'} strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center gap-2 px-4 pt-3 pb-2">
          <div className="w-2 h-2 rounded-full bg-[#0F766E]" />
          <span className="text-xs font-medium text-[#0F766E]">Etapa atual: Validação Parcial</span>
          <span className="text-xs text-gray-400">· Semana 13</span>
        </div>
        <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100">
          {aluno.foto
            ? <div className="w-12 h-12 rounded-full flex-shrink-0 overflow-hidden"><img src={aluno.foto} alt={aluno.nome} className="w-full h-full object-cover" /></div>
            : <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0"><span className="text-sm font-semibold text-white">{aluno.iniciais}</span></div>
          }
          <div>
            <div className="text-base font-semibold text-gray-900">{aluno.nome}</div>
            <div className="text-xs text-gray-500">{aluno.cargo}</div>
          </div>
        </div>

        <div className="px-4 pt-5 space-y-5">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
              <span className="text-sm font-medium text-gray-900">Feedback para o aluno</span>
            </div>
            <p className="text-xs text-gray-400 mb-2">Visível para o aluno</p>
            <textarea
              value={feedback}
              onChange={e => setFeedback(e.target.value)}
              placeholder="Descreva o que se destacou na apresentação deste aluno..."
              rows={3}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-[#0F766E] resize-none"
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6M16 13H8M16 17H8" />
              </svg>
              <span className="text-sm font-medium text-gray-900">Nota interna</span>
            </div>
            <p className="text-xs text-gray-400 mb-2">Visível só para você no dashboard</p>
            <textarea
              value={notaInterna}
              onChange={e => setNotaInterna(e.target.value)}
              placeholder="Algo que você quer lembrar sobre este aluno mais tarde..."
              rows={3}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-[#0F766E] resize-none"
            />
          </div>

          <div>
            <div className="text-sm font-medium text-gray-900 mb-1">Avaliação (opcional)</div>
            <div className="text-xs text-gray-500 mb-4">Avaliação geral do aluno</div>
            <div className="relative">
              <div className="absolute top-[18px] left-[18px] right-[18px] flex pointer-events-none">
                {[1,2,3,4].map(i => (
                  <div key={i} className={`flex-1 h-0.5 ${avaliacao && i < avaliacao ? 'bg-[#34D399]' : 'bg-gray-200'}`} />
                ))}
              </div>
              <div className="flex justify-between">
                {[1,2,3,4,5].map(n => (
                  <button key={n} onClick={() => setAvaliacao(avaliacao === n ? null : n)}
                    className={`w-9 h-9 rounded-full border-2 flex items-center justify-center relative z-10 transition-colors ${
                      avaliacao && n <= avaliacao
                        ? 'bg-[#0F766E] border-[#0F766E]'
                        : 'bg-white border-gray-200'
                    }`}>
                    {avaliacao && n <= avaliacao && (
                      <div className="w-2.5 h-2.5 bg-white rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gray-400">Abaixo do esperado</span>
              <span className="text-xs text-gray-400">Superou expectativas</span>
            </div>
          </div>

        </div>
      </div>

      <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4 flex gap-3 flex-shrink-0">
        <button onClick={onVoltar} className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700">
          Voltar
        </button>
        <button className="flex-1 py-3 bg-gray-900 text-white rounded-xl text-sm font-medium">
          Salvar
        </button>
      </div>
    </>
  );
}

function ModalDestaque({ aluno, onContinuar }: { aluno: Aluno; onContinuar: () => void }) {
  const [nota, setNota] = useState('');

  return (
    <div className="absolute inset-0 bg-black/40 flex items-end z-50" onClick={onContinuar}>
      <motion.div
        className="bg-white w-full rounded-t-3xl px-5 pt-5 pb-8"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />

        <div className="flex flex-col items-center mb-5">
          <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mb-3">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1.5">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Aluno destacado</h2>
          <p className="text-sm text-[#0F766E] text-center leading-relaxed">
            {aluno.nome} foi adicionado(a) aos seus destaques. Você poderá ver o perfil completo no dashboard web após o encerramento da banca.
          </p>
        </div>

        <div className="border border-gray-200 rounded-xl p-3 mb-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-semibold text-white">{aluno.iniciais}</span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">{aluno.nome}</div>
              <div className="text-xs text-gray-500">{aluno.cargo}</div>
            </div>
          </div>
          <div className="text-xs text-gray-500 mb-1.5">Nota interna</div>
          <textarea
            value={nota}
            onChange={e => setNota(e.target.value)}
            placeholder="Adicione uma nota rápida..."
            rows={2}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:border-[#0F766E] resize-none"
          />
        </div>

        <button className="w-full py-3 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium mb-3">
          Ver todos os destaques
        </button>
        <button onClick={onContinuar}
          className="w-full py-3 bg-gray-900 text-white rounded-xl text-sm font-medium">
          Continuar avaliação
        </button>
      </motion.div>
    </div>
  );
}

function NavbarEmpresa({ ativa, onChange }: {
  ativa: 'home' | 'alunos';
  onChange: (v: 'home' | 'alunos') => void;
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex flex-shrink-0 z-50">
      <button onClick={() => onChange('home')}
        className={`flex-1 py-3 flex flex-col items-center gap-1 ${ativa === 'home' ? 'text-[#0F766E]' : 'text-gray-400'}`}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        <span className="text-xs">Home</span>
      </button>
      <button onClick={() => onChange('alunos')}
        className={`flex-1 py-3 flex flex-col items-center gap-1 ${ativa === 'alunos' ? 'text-[#0F766E]' : 'text-gray-400'}`}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        <span className="text-xs">Alunos</span>
      </button>
    </div>
  );
}

const mockDestaques: Record<string, boolean> = { AS: true, BC: true };
const mockNotasDestaque: Record<string, string> = {
  AS: 'Candidata forte. Excelente comunicação e domínio técnico durante toda a visita.',
  BC: 'Demonstrou iniciativa e conhecimento sólido. Considerar para processo seletivo.',
};

const mockAvaliacoes: Record<string, number> = {
  AS: 4, BC: 4, DS: 3, MF: 5, PG: 4, TK: 4, VL: 2,
};

const entregas = [
  { id: 'e1',    nome: 'Entrega 1 — Análise Inicial',       data: '14/04/2026' },
  { id: 'e2',    nome: 'Entrega 2 — Mapeamento de Riscos',  data: '05/05/2026' },
  { id: 'e3',    nome: 'Entrega 3 — Plano de Ação',         data: '26/05/2026' },
  { id: 'banca', nome: 'Banca Final',                       data: '28/05/2026' },
];

type DadosEntrega = { av: number; feedback: string; notaInterna: string };

const mockDadosPorEntrega: Record<string, Record<string, DadosEntrega>> = {
  AS: {
    e1:    { av: 4, feedback: 'Bom levantamento inicial dos riscos. A análise demonstrou compreensão adequada da NR-32, mas pode aprofundar mais nos aspectos biológicos.', notaInterna: 'Boa entrega inicial. Potencial de crescimento evidente.' },
    e2:    { av: 4, feedback: 'Mapeamento detalhado e bem estruturado. Boa identificação dos agentes de risco no ambiente laboratorial.', notaInterna: 'Evolução consistente em relação à primeira entrega.' },
    banca: { av: 4, feedback: 'Excelente apresentação. Ana demonstrou domínio técnico sobre NR-32 e soube articular os conceitos com a realidade do laboratório.', notaInterna: 'Candidata forte para vaga de estagiário. Considerar para próximo processo seletivo.' },
  },
  BC: {
    e1:    { av: 3, feedback: 'Entrega satisfatória. Bruno identificou os principais riscos, mas a análise poderia ser mais aprofundada.', notaInterna: 'Perfil técnico em desenvolvimento.' },
    e2:    { av: 4, feedback: 'Mapeamento bem executado. Melhora visível em relação à entrega anterior.', notaInterna: 'Evolução positiva.' },
    banca: { av: 4, feedback: 'Bruno apresentou com segurança os resultados do levantamento de riscos. Boa comunicação.', notaInterna: 'Perfil técnico sólido.' },
  },
  DS: {
    e1:    { av: 3, feedback: 'Entrega dentro do esperado. Pode aprofundar mais na análise crítica.', notaInterna: 'Acompanhar nas próximas entregas.' },
    e2:    { av: 3, feedback: 'Mapeamento completo mas análise ainda superficial em alguns pontos.', notaInterna: 'Evolução lenta. Dar atenção especial.' },
    banca: { av: 3, feedback: 'Apresentação dentro do esperado. Diana pode aprofundar mais na análise crítica dos riscos identificados.', notaInterna: 'Desempenho estável, sem grande evolução.' },
  },
  MF: {
    e1:    { av: 5, feedback: 'Análise excepcional na primeira entrega. Mariana demonstrou domínio técnico e visão crítica.', notaInterna: 'Alto potencial já evidente na primeira entrega.' },
    e2:    { av: 5, feedback: 'Mapeamento exemplar. Detalhamento técnico acima da média do grupo.', notaInterna: 'Indicada para programa de mentoria.' },
    banca: { av: 5, feedback: 'Mariana se destacou pela organização e clareza na apresentação. Liderança visível no grupo.', notaInterna: 'Alto potencial. Indicada para programa de mentoria da empresa.' },
  },
};

function getGrupoDoAluno(iniciais: string): string {
  return grupos.find(g => g.membros.some(m => m.iniciais === iniciais))?.nome ?? '';
}

function TelaAlunos({ onAluno, onGrupo }: { onAluno: (a: Aluno) => void; onGrupo: (g: Grupo) => void }) {
  type Filtro = 'todos' | 'destacados' | 'com-avaliacao' | 'sem-avaliacao';
  type Tab = 'alunos' | 'grupos';
  const [tab, setTab] = useState<Tab>('alunos');
  const [filtro, setFiltro] = useState<Filtro>('todos');
  const [destaques, setDestaques] = useState<Record<string, boolean>>({ AS: true, BC: true });

  const todosAlunos = grupos.flatMap(g => g.membros);

  const toggleDestaque = (iniciais: string) =>
    setDestaques(prev => ({ ...prev, [iniciais]: !prev[iniciais] }));

  const filtrados = todosAlunos.filter(a => {
    if (filtro === 'destacados') return !!destaques[a.iniciais];
    if (filtro === 'com-avaliacao') return !!mockAvaliacoes[a.iniciais];
    if (filtro === 'sem-avaliacao') return !mockAvaliacoes[a.iniciais];
    return true;
  });

  const abas: { id: Filtro; label: string }[] = [
    { id: 'todos',          label: 'Todos' },
    { id: 'destacados',     label: '★ Destacados' },
    { id: 'com-avaliacao',  label: 'Com avaliação' },
    { id: 'sem-avaliacao',  label: 'Sem avaliação' },
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="sticky top-0 z-10 bg-white px-4 pt-5 pb-3 border-b border-gray-100">
        <p className="text-xs text-gray-500 mb-3">SafeLab · Segurança do Trabalho · 2025.1</p>
        <div className="flex border-b border-gray-200 mb-3">
          {(['alunos', 'grupos'] as Tab[]).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 pb-2 text-sm font-medium transition-colors capitalize ${
                tab === t ? 'text-[#0F766E] border-b-2 border-[#0F766E]' : 'text-gray-400'
              }`}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        {tab === 'alunos' && <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {abas.map(a => (
            <button key={a.id} onClick={() => setFiltro(a.id)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filtro === a.id ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
              }`}>
              {a.label}
            </button>
          ))}
        </div>}
      </div>

      {tab === 'grupos' && (
        <div className="px-4 pt-4 space-y-3">
          {grupos.map((g) => (
            <button key={g.id} onClick={() => onGrupo(g)}
              className="w-full text-left p-4 border border-gray-200 rounded-xl flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-gray-900 mb-2">{g.nome}</div>
                <div className="flex gap-2">
                  {g.membros.slice(0, 4).map((m, i) => (
                    m.foto
                      ? <div key={i} className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0"><img src={m.foto} alt={m.nome} className="w-full h-full object-cover" /></div>
                      : <div key={i} className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center"><span className="text-xs font-medium text-gray-600">{m.iniciais}</span></div>
                  ))}
                  {g.membros.length > 4 && (
                    <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-xs text-gray-500">+{g.membros.length - 4}</span>
                    </div>
                  )}
                </div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          ))}
        </div>
      )}

      {tab === 'alunos' && <div className="grid grid-cols-2 gap-3 p-4">
        {filtrados.map((aluno, i) => {
          const av = mockAvaliacoes[aluno.iniciais] ?? null;
          const dest = !!destaques[aluno.iniciais];
          return (
            <div key={i} onClick={() => onAluno(aluno)}
              className="relative cursor-pointer p-3 rounded-2xl flex flex-col items-center"
              style={dest ? {
                border: '2px solid transparent',
                background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #34D399, #0F766E) border-box',
              } : {
                border: '1px solid #E5E7EB',
              }}>
              <button
                onClick={e => { e.stopPropagation(); toggleDestaque(aluno.iniciais); }}
                className="absolute top-2.5 right-2.5">
                <svg width="16" height="16" viewBox="0 0 24 24"
                  fill={dest ? '#F59E0B' : 'none'}
                  stroke={dest ? '#F59E0B' : '#9CA3AF'} strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </button>
              {aluno.foto
                ? <div className="w-14 h-14 rounded-full overflow-hidden mb-2 mt-1 flex-shrink-0"><img src={aluno.foto} alt={aluno.nome} className="w-full h-full object-cover" /></div>
                : <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center mb-2 mt-1"><span className="text-sm font-semibold text-gray-600">{aluno.iniciais}</span></div>
              }
              <div className="text-sm font-semibold text-gray-900 text-center mb-0.5">{aluno.nome}</div>
              <div className="text-xs text-[#0F766E] mb-2 text-center">Seg. do Trabalho</div>
              {av !== null ? (
                <div className="flex gap-1 mb-2">
                  {[1,2,3,4,5].map(n => (
                    <div key={n} className={`w-3 h-3 rounded-full ${n <= av ? 'bg-gray-700' : 'bg-gray-200'}`} />
                  ))}
                </div>
              ) : (
                <div className="text-xs text-gray-400 italic mb-2">Sem avaliação</div>
              )}
              <div className="flex gap-3">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={av ? '#374151' : '#D1D5DB'} strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={av ? '#374151' : '#D1D5DB'} strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6M16 13H8M16 17H8" />
                </svg>
              </div>
            </div>
          );
        })}
      </div>}
    </div>
  );
}

type DadosGrupoEntrega = { comentario: string; feedback: string };
const mockAvaliacoesGrupo: Record<string, Record<string, DadosGrupoEntrega>> = {
  'Grupo 1': {
    e1:    { comentario: 'Entrega inicial sólida. Estrutura bem organizada.', feedback: 'Boa compreensão do ambiente e dos riscos mapeados.' },
    e2:    { comentario: 'Grupo bem organizado. As entregas foram pontuais e a qualidade técnica está acima da média.', feedback: 'O grupo demonstrou excelente trabalho em equipe. A matriz de riscos foi bem estruturada.' },
    e3:    { comentario: 'Plano de ação detalhado, metas claras e executáveis.', feedback: 'Boa progressão em relação às entregas anteriores.' },
    banca: { comentario: 'Apresentação excelente. Grupo muito bem preparado.', feedback: 'O grupo demonstrou excelente trabalho em equipe e as entregas mantiveram qualidade consistente ao longo do semestre.' },
  },
  'Grupo 2': {
    e1:    { comentario: 'Início razoável, alguns pontos a desenvolver.', feedback: 'Levantamento inicial dentro do esperado.' },
    e2:    { comentario: 'Boa dinâmica entre os membros. Comunicação clara durante as visitas.', feedback: 'Grupo com boa dinâmica. As entregas foram pontuais e o nível técnico foi satisfatório.' },
    e3:    { comentario: 'Evolução visível. Metas mais bem definidas.', feedback: 'Soluções práticas e bem aplicadas ao contexto.' },
    banca: { comentario: 'Apresentação satisfatória. Bom domínio do conteúdo.', feedback: 'Grupo com boa dinâmica e entregas de qualidade consistente.' },
  },
  'Grupo 3': {
    e1:    { comentario: 'Entrega com alguns pontos incompletos.', feedback: 'Análise inicial superficial em algumas áreas.' },
    e2:    { comentario: 'Grupo em desenvolvimento. Recomenda-se maior atenção à profundidade.', feedback: 'Recomenda-se maior foco na profundidade das análises de risco.' },
    e3:    { comentario: 'Melhora perceptível, mas ainda há pontos a aprofundar.', feedback: 'Progressão positiva em relação à entrega anterior.' },
    banca: { comentario: 'Apresentação adequada. Grupo mostrou evolução no semestre.', feedback: 'Evolução evidente ao longo do semestre.' },
  },
};

function GrupoVisualizacao({ grupo, onVoltar, onEditar, onAluno }: {
  grupo: Grupo;
  onVoltar: () => void;
  onEditar: () => void;
  onAluno: (a: Aluno) => void;
}) {
  const [entregaId, setEntregaId] = useState('e1');
  const [dropdownAberto, setDropdownAberto] = useState(false);

  const entregaAtual = entregas.find(e => e.id === entregaId)!;
  const avaliacao: DadosGrupoEntrega | undefined = mockAvaliacoesGrupo[grupo.nome]?.[entregaId];

  return (
    <>
      <div className="sticky top-0 z-10 bg-white px-4 py-3 flex items-center gap-3 border-b border-gray-100">
        <button onClick={onVoltar} className="w-6 h-6 flex items-center justify-center text-gray-600">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h1 className="flex-1 text-base font-semibold text-gray-900">{grupo.nome}</h1>
        <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">{grupo.status}</span>
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        <div className="flex items-center gap-2 pt-3 pb-4">
          <div className="w-2 h-2 rounded-full bg-[#0F766E]" />
          <span className="text-xs font-medium text-[#0F766E]">Etapa atual: Validação Parcial</span>
          <span className="text-xs text-gray-400">· Semana 13</span>
        </div>

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
                {entregas.map((e, i) => (
                  <button key={e.id}
                    onClick={() => { setEntregaId(e.id); setDropdownAberto(false); }}
                    className={`w-full p-3 text-left ${i < entregas.length - 1 ? 'border-b border-gray-100' : ''} ${e.id === entregaId ? 'bg-gray-50' : ''}`}>
                    <div className="text-sm font-semibold text-gray-900">{e.nome}</div>
                    <div className="text-xs text-gray-500">{e.data}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {avaliacao ? (
          <div className="space-y-4 mb-5">
            <div>
              <div className="mb-1">
                <span className="text-sm font-medium text-gray-900">Comentário sobre as entregas</span>
                <div className="flex items-center gap-1 mt-0.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                  </svg>
                  <span className="text-xs text-gray-400">Visível só para você</span>
                </div>
              </div>
              <div className="p-3 border border-gray-200 rounded-xl text-sm text-[#3B82F6] leading-relaxed">
                {avaliacao.comentario}
              </div>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-900">Feedback para o grupo</span>
              <p className="text-xs text-gray-400 mb-2">Visível para o grupo</p>
              <div className="p-3 border border-gray-200 rounded-xl text-sm text-[#3B82F6] leading-relaxed">
                {avaliacao.feedback}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-400 italic text-center py-4 mb-5">Sem avaliação registrada para esta entrega</p>
        )}

        <div className="text-sm font-medium text-gray-900 mb-3">Alunos do grupo</div>
        <div className="space-y-2">
          {grupo.membros.map((aluno, i) => (
            <button key={i} onClick={() => onAluno(aluno)}
              className="w-full flex items-center p-3 border border-gray-200 rounded-xl text-left">
              {aluno.foto
                ? <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 mr-3"><img src={aluno.foto} alt={aluno.nome} className="w-full h-full object-cover" /></div>
                : <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0 mr-3"><span className="text-xs font-semibold text-white">{aluno.iniciais}</span></div>
              }
              <span className="flex-1 text-sm font-medium text-gray-900">{aluno.nome}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4 flex gap-3 flex-shrink-0">
        <button onClick={onVoltar} className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700">
          Voltar
        </button>
        <button onClick={onEditar} className="flex-1 py-3 bg-gray-900 text-white rounded-xl text-sm font-medium">
          Editar
        </button>
      </div>
    </>
  );
}

function AlunoVisualizacao({ aluno, onVoltar, onEditar }: {
  aluno: Aluno;
  onVoltar: () => void;
  onEditar: () => void;
}) {
  const [entregaId, setEntregaId] = useState('e1');
  const [dropdownAberto, setDropdownAberto] = useState(false);

  const grupo = getGrupoDoAluno(aluno.iniciais);
  const entregaAtual = entregas.find(e => e.id === entregaId)!;
  const dados: DadosEntrega | undefined = mockDadosPorEntrega[aluno.iniciais]?.[entregaId];
  const eDestacado = !!mockDestaques[aluno.iniciais];
  const notaDestaque = mockNotasDestaque[aluno.iniciais];

  return (
    <>
      <div className="sticky top-0 z-10 bg-white px-4 py-3 flex items-center border-b border-gray-100">
        <button onClick={onVoltar} className="w-6 h-6 flex items-center justify-center text-gray-600">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col items-center px-4 pt-6 pb-5">
          {aluno.foto
            ? <div className="w-20 h-20 rounded-full overflow-hidden mb-3 flex-shrink-0"><img src={aluno.foto} alt={aluno.nome} className="w-full h-full object-cover" /></div>
            : <div className="w-20 h-20 rounded-full bg-gray-600 flex items-center justify-center mb-3"><span className="text-lg font-semibold text-white">{aluno.iniciais}</span></div>
          }
          <div className="flex items-center gap-2 mb-2">
            {eDestacado && (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            )}
            <h1 className="text-lg font-semibold text-gray-900">{aluno.nome}</h1>
          </div>
          <div className="flex gap-2 mb-3">
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">Seg. do Trabalho</span>
            {grupo && <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">{grupo}</span>}
          </div>
          {eDestacado && notaDestaque && (
            <div className="w-full relative border border-amber-200 bg-amber-50 rounded-xl px-4 py-3 text-left">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1.5"
                className="absolute top-2.5 right-2.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <p className="text-xs text-amber-800 leading-relaxed pr-4">{notaDestaque}</p>
            </div>
          )}
        </div>

        <div className="border-t border-gray-100" />

        <div className="px-4 pt-5 space-y-5">
          <div>
            <p className="text-sm font-medium text-gray-900 mb-2">Selecione a entrega</p>
            <div className="relative">
              <button onClick={() => setDropdownAberto(!dropdownAberto)}
                className="w-full p-3 border border-gray-200 rounded-xl flex items-center justify-between text-left">
                <div>
                  <div className="text-sm font-semibold text-gray-900">{entregaAtual.nome}</div>
                  <div className="text-xs text-gray-500">{entregaAtual.data}</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                  {dropdownAberto
                    ? <path d="M18 15l-6-6-6 6" />
                    : <path d="M6 9l6 6 6-6" />}
                </svg>
              </button>
              {dropdownAberto && (
                <div className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-xl bg-white shadow-md z-20 overflow-hidden">
                  {entregas.map((e, i) => (
                    <button key={e.id}
                      onClick={() => { setEntregaId(e.id); setDropdownAberto(false); }}
                      className={`w-full p-3 text-left ${i < entregas.length - 1 ? 'border-b border-gray-100' : ''} ${e.id === entregaId ? 'bg-gray-50' : ''}`}>
                      <div className="text-sm font-semibold text-gray-900">{e.nome}</div>
                      <div className="text-xs text-gray-500">{e.data}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {dados ? (
            <>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-gray-900">Avaliação desta entrega</p>
                  <div className="flex items-center gap-1 text-gray-400">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                    <span className="text-xs">Visível só para você</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    {[1,2,3,4,5].map(n => (
                      <div key={n} className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-sm font-semibold ${
                        n <= dados.av ? 'bg-gray-800 border-gray-800 text-white' : 'border-gray-200 text-gray-400'
                      }`}>{n}</div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 font-medium">{dados.av}/5</span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900">Feedback para o aluno</span>
                </div>
                <div className="p-3 border border-gray-200 rounded-xl text-sm text-[#3B82F6] leading-relaxed">
                  {dados.feedback}
                </div>
                <p className="text-xs text-gray-400 mt-1.5">Visível para o aluno</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900">Nota interna</span>
                </div>
                <div className="p-3 border border-gray-200 rounded-xl text-sm text-[#3B82F6] leading-relaxed">
                  {dados.notaInterna}
                </div>
                <div className="flex items-center gap-1 mt-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                  <p className="text-xs text-gray-400">Visível só para você</p>
                </div>
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-400 italic text-center py-6">Sem avaliação registrada para esta entrega</p>
          )}
        </div>
      </div>

      <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4 flex gap-3 flex-shrink-0">
        <button onClick={onVoltar}
          className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700">
          Voltar
        </button>
        <button onClick={onEditar}
          className="flex-1 py-3 bg-gray-900 text-white rounded-xl text-sm font-medium">
          {dados ? 'Editar' : 'Avaliar'}
        </button>
      </div>
    </>
  );
}
