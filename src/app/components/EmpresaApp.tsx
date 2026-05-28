import { useState } from 'react';

interface Aluno {
  iniciais: string;
  nome: string;
  cargo: string;
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
      { iniciais: 'AS', nome: 'Ana Silva',    cargo: 'Técnico em Segurança do Trabalho' },
      { iniciais: 'BC', nome: 'Bruno Costa',  cargo: 'Técnico em Segurança do Trabalho' },
      { iniciais: 'CL', nome: 'Carlos Lima',  cargo: 'Técnico em Segurança do Trabalho' },
      { iniciais: 'DS', nome: 'Diana Santos', cargo: 'Técnico em Segurança do Trabalho' },
    ],
  },
  {
    id: 2, nome: 'Grupo 2', status: 'Em andamento',
    membros: [
      { iniciais: 'MF', nome: 'Mariana Ferreira', cargo: 'Técnico em Segurança do Trabalho' },
      { iniciais: 'PG', nome: 'Pedro Gomes',      cargo: 'Técnico em Segurança do Trabalho' },
      { iniciais: 'RH', nome: 'Rafael Henrique',  cargo: 'Técnico em Segurança do Trabalho' },
    ],
  },
  {
    id: 3, nome: 'Grupo 3', status: 'Em andamento',
    membros: [
      { iniciais: 'TK', nome: 'Thiago Kühl',      cargo: 'Técnico em Segurança do Trabalho' },
      { iniciais: 'VL', nome: 'Valentina Lima',   cargo: 'Técnico em Segurança do Trabalho' },
      { iniciais: 'WM', nome: 'William Martins',  cargo: 'Técnico em Segurança do Trabalho' },
      { iniciais: 'XN', nome: 'Xênia Neves',      cargo: 'Técnico em Segurança do Trabalho' },
      { iniciais: 'YO', nome: 'Yasmin Oliveira',  cargo: 'Técnico em Segurança do Trabalho' },
      { iniciais: 'ZP', nome: 'Zara Pereira',     cargo: 'Técnico em Segurança do Trabalho' },
    ],
  },
];

type Tela = 'home' | 'grupo' | 'aluno';

export default function EmpresaApp() {
  const [tela, setTela] = useState<Tela>('home');
  const [grupoAtual, setGrupoAtual] = useState<Grupo | null>(null);
  const [alunoAtual, setAlunoAtual] = useState<Aluno | null>(null);
  const [modalDestaque, setModalDestaque] = useState(false);

  const irParaGrupo = (g: Grupo) => { setGrupoAtual(g); setTela('grupo'); };
  const irParaAluno = (a: Aluno) => { setAlunoAtual(a); setModalDestaque(false); setTela('aluno'); };

  return (
    <div className="w-full h-full flex flex-col bg-white relative overflow-hidden">
      {tela === 'home' && <HomeEmpresa onGrupo={irParaGrupo} />}
      {tela === 'grupo' && grupoAtual && (
        <GrupoDetalhe grupo={grupoAtual} onVoltar={() => setTela('home')} onAluno={irParaAluno} />
      )}
      {tela === 'aluno' && alunoAtual && (
        <AlunoDetalhe aluno={alunoAtual} onVoltar={() => setTela('grupo')} onDestaque={() => setModalDestaque(true)} />
      )}
      {modalDestaque && alunoAtual && (
        <ModalDestaque aluno={alunoAtual} onContinuar={() => setModalDestaque(false)} />
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
    <div className="flex-1 overflow-y-auto px-5 pt-8 pb-6">
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
  const [estrelas, setEstrelas] = useState<Record<string, boolean>>({});

  const toggleEstrela = (iniciais: string) =>
    setEstrelas(prev => ({ ...prev, [iniciais]: !prev[iniciais] }));

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

      <div className="flex-1 overflow-y-auto px-4 pt-5 pb-24">
        <div className="mb-5">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-sm font-medium text-gray-900">Comentário sobre as entregas</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
            </svg>
            <span className="text-xs text-gray-400">Visível só para você</span>
          </div>
          <textarea
            value={comentario}
            onChange={e => setComentario(e.target.value)}
            placeholder="O que chamou atenção nas entregas deste grupo?"
            rows={3}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-[#0F766E] resize-none"
          />
        </div>

        <div className="border-t border-gray-100 mb-5" />

        <div className="text-sm font-medium text-gray-900 mb-3">Alunos do grupo</div>
        <div className="space-y-2">
          {grupo.membros.map((aluno, i) => (
            <div key={i} className="flex items-center p-3 border border-gray-200 rounded-xl">
              <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0 mr-3">
                <span className="text-xs font-semibold text-white">{aluno.iniciais}</span>
              </div>
              <span className="flex-1 text-sm font-medium text-gray-900">{aluno.nome}</span>
              <button onClick={() => toggleEstrela(aluno.iniciais)} className="w-8 h-8 flex items-center justify-center mr-1">
                <svg width="18" height="18" viewBox="0 0 24 24"
                  fill={estrelas[aluno.iniciais] ? '#F59E0B' : 'none'}
                  stroke={estrelas[aluno.iniciais] ? '#F59E0B' : '#9CA3AF'} strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </button>
              <button onClick={() => onAluno(aluno)} className="w-6 h-6 flex items-center justify-center text-gray-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
        <button className="w-full py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700">
          Salvar rascunho
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

  const handleDestaque = () => { setDestacado(true); onDestaque(); };

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
          <svg width="20" height="20" viewBox="0 0 24 24"
            fill={destacado ? '#F59E0B' : 'none'}
            stroke={destacado ? '#F59E0B' : '#9CA3AF'} strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100">
          <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-semibold text-white">{aluno.iniciais}</span>
          </div>
          <div>
            <div className="text-base font-semibold text-gray-900">{aluno.nome}</div>
            <div className="text-xs text-gray-500">{aluno.cargo}</div>
          </div>
        </div>

        <div className="px-4 pt-5 space-y-5">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-sm font-medium text-gray-900">Feedback para o aluno</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" />
              </svg>
            </div>
            <p className="text-xs text-gray-400 mb-2">Visível para o aluno após encerramento da banca</p>
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
              <span className="text-sm font-medium text-gray-900">Nota interna</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
              </svg>
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
            <div className="text-xs text-gray-500 mb-3">Avaliação geral do aluno</div>
            <div className="flex justify-between mb-2">
              {[1, 2, 3, 4, 5].map(n => (
                <button key={n} onClick={() => setAvaliacao(n)}
                  className={`w-11 h-11 rounded-full border-2 flex items-center justify-center text-sm font-semibold transition-colors ${
                    avaliacao === n
                      ? 'bg-[#0F766E] border-[#0F766E] text-white'
                      : 'border-gray-200 text-gray-600'
                  }`}>
                  {n}
                </button>
              ))}
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-gray-400">Abaixo do esperado</span>
              <span className="text-xs text-gray-400">Superou expectativas</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">Esta avaliação é opcional e pode ser editada depois</p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 flex gap-3">
        <button className="flex-1 py-3 bg-gray-900 text-white rounded-xl text-sm font-medium">
          Salvar
        </button>
        <button onClick={() => setAvaliacao(null)} className="px-4 py-3 text-sm font-medium text-gray-500">
          Limpar avaliação
        </button>
      </div>
    </>
  );
}

function ModalDestaque({ aluno, onContinuar }: { aluno: Aluno; onContinuar: () => void }) {
  const [nota, setNota] = useState('');

  return (
    <div className="absolute inset-0 bg-black/40 flex items-end z-50">
      <div className="bg-white w-full rounded-t-3xl px-5 pt-5 pb-8">
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
      </div>
    </div>
  );
}
