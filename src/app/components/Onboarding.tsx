import { useState } from 'react';

type Passo = 'cadastro' | 'perfil' | 'mbti' | 'resultado';
type Resposta = 'A' | 'B';

const perguntas = [
  { id: 0, dim: 'EI', texto: 'Em eventos sociais, você geralmente...', A: 'Energiza-se interagindo com muitas pessoas', B: 'Prefere conversas íntimas com poucas pessoas' },
  { id: 1, dim: 'EI', texto: 'Ao trabalhar em projetos, você prefere...', A: 'Colaborar e discutir ideias em grupo', B: 'Refletir sozinho(a) antes de compartilhar' },
  { id: 2, dim: 'SN', texto: 'Ao aprender algo novo, você valoriza...', A: 'Exemplos práticos e passos concretos', B: 'Conceitos gerais e possibilidades futuras' },
  { id: 3, dim: 'SN', texto: 'Quando resolve problemas, você confia mais em...', A: 'Experiência comprovada e dados reais', B: 'Intuição e novas abordagens criativas' },
  { id: 4, dim: 'TF', texto: 'Ao tomar decisões importantes, você prioriza...', A: 'Lógica e o que é mais eficiente', B: 'Como a decisão vai afetar as pessoas' },
  { id: 5, dim: 'TF', texto: 'Diante de um conflito, você costuma...', A: 'Buscar a solução mais justa e objetiva', B: 'Priorizar a harmonia e os sentimentos envolvidos' },
  { id: 6, dim: 'JP', texto: 'Você prefere sua rotina...', A: 'Bem planejada e organizada com antecedência', B: 'Flexível e adaptável conforme o dia' },
  { id: 7, dim: 'JP', texto: 'Em relação a prazos, você...', A: 'Termina as tarefas com bastante antecedência', B: 'Funciona melhor sob pressão de prazo' },
];

const tipos: Record<string, { nome: string; descricao: string; tags: string[]; cor: string }> = {
  ENFJ: { nome: 'Protagonista', descricao: 'Carismático, empático e inspirador. Você tem uma habilidade natural para liderar e motivar pessoas ao seu redor.', tags: ['Empático', 'Carismático', 'Inspirador'], cor: '#0F766E' },
  ENFP: { nome: 'Ativista', descricao: 'Criativo, entusiasmado e cheio de ideias. Você vê potencial em tudo e adora explorar novas possibilidades.', tags: ['Criativo', 'Entusiasmado', 'Otimista'], cor: '#7C3AED' },
  ENTJ: { nome: 'Comandante', descricao: 'Estratégico, determinado e assertivo. Líder nato com visão de longo prazo e grande capacidade de execução.', tags: ['Estratégico', 'Determinado', 'Eficiente'], cor: '#1D4ED8' },
  ENTP: { nome: 'Inovador', descricao: 'Inteligente, curioso e desafiador. Você adora debates e encontrar soluções criativas para problemas complexos.', tags: ['Curioso', 'Analítico', 'Criativo'], cor: '#0891B2' },
  ESFJ: { nome: 'Cônsul', descricao: 'Cuidadoso, sociável e leal. Você valoriza a harmonia e trabalha duro para cuidar das pessoas ao seu redor.', tags: ['Cuidadoso', 'Leal', 'Atencioso'], cor: '#059669' },
  ESFP: { nome: 'Animador', descricao: 'Espontâneo, energético e divertido. Você vive o presente ao máximo e sabe como fazer todos se sentirem bem.', tags: ['Espontâneo', 'Alegre', 'Sociável'], cor: '#D97706' },
  ESTJ: { nome: 'Executivo', descricao: 'Organizado, responsável e dedicado. Você é excelente em criar ordem e garantir que tudo funcione como planejado.', tags: ['Organizado', 'Responsável', 'Direto'], cor: '#3B82F6' },
  ESTP: { nome: 'Empreendedor', descricao: 'Ousado, prático e observador. Você age rápido e adora desafios que exigem soluções imediatas.', tags: ['Ousado', 'Prático', 'Direto'], cor: '#EF4444' },
  INFJ: { nome: 'Advogado', descricao: 'Idealista, intuitivo e determinado. Você tem uma visão clara de como tornar o mundo melhor e trabalha para isso.', tags: ['Idealista', 'Intuitivo', 'Empático'], cor: '#6D28D9' },
  INFP: { nome: 'Mediador', descricao: 'Criativo, idealista e profundamente empático. Você é movido por valores e deseja tornar o mundo um lugar melhor.', tags: ['Criativo', 'Empático', 'Reflexivo'], cor: '#7C3AED' },
  INTJ: { nome: 'Arquiteto', descricao: 'Estratégico, independente e criativo. Você pensa profundamente antes de agir e tem uma mente analítica poderosa.', tags: ['Estratégico', 'Independente', 'Analítico'], cor: '#1E40AF' },
  INTP: { nome: 'Lógico', descricao: 'Analítico, objetivo e inovador. Você adora teorias e encontrar a explicação lógica por trás de tudo.', tags: ['Analítico', 'Curioso', 'Independente'], cor: '#0369A1' },
  ISFJ: { nome: 'Defensor', descricao: 'Dedicado, empático e confiável. Você cuida das pessoas com atenção e carinho, sempre presente para quem precisa.', tags: ['Dedicado', 'Confiável', 'Atencioso'], cor: '#047857' },
  ISFP: { nome: 'Aventureiro', descricao: 'Flexível, criativo e sensível. Você vive o presente com intensidade e se expressa pela criatividade.', tags: ['Criativo', 'Flexível', 'Gentil'], cor: '#065F46' },
  ISTJ: { nome: 'Inspetor', descricao: 'Confiável, organizado e detalhista. Você é o pilar de estabilidade em qualquer grupo, sempre cumprindo suas responsabilidades.', tags: ['Confiável', 'Organizado', 'Responsável'], cor: '#1E3A8A' },
  ISTP: { nome: 'Virtuoso', descricao: 'Observador, prático e curioso. Você adora entender como as coisas funcionam e encontrar soluções eficientes.', tags: ['Prático', 'Observador', 'Analítico'], cor: '#134E4A' },
};

function calcularTipo(respostas: Record<number, Resposta>): string {
  const c = { EI: { A: 0, B: 0 }, SN: { A: 0, B: 0 }, TF: { A: 0, B: 0 }, JP: { A: 0, B: 0 } };
  perguntas.forEach(p => {
    const r = respostas[p.id];
    if (r) c[p.dim as keyof typeof c][r]++;
  });
  return [
    c.EI.A >= c.EI.B ? 'E' : 'I',
    c.SN.A >= c.SN.B ? 'S' : 'N',
    c.TF.A >= c.TF.B ? 'T' : 'F',
    c.JP.A >= c.JP.B ? 'J' : 'P',
  ].join('');
}

export default function Onboarding({ onNavigate, isMobile }: { onNavigate: (view: string) => void; isMobile?: boolean }) {
  const [passo, setPasso] = useState<Passo>('cadastro');
  const [respostas, setRespostas] = useState<Record<number, Resposta>>({});
  const [tipo, setTipo] = useState('');

  const handleResposta = (id: number, resposta: Resposta) => {
    setRespostas(prev => ({ ...prev, [id]: resposta }));
  };

  const avancarMBTI = () => {
    setTipo(calcularTipo(respostas));
    setPasso('resultado');
  };

  const reiniciar = () => {
    setRespostas({});
    setTipo('');
    setPasso('cadastro');
  };

  const passos: Passo[] = ['cadastro', 'perfil', 'mbti'];
  const passoAtual = passos.indexOf(passo);

  return (
    <div className={isMobile ? 'w-full h-full' : 'flex items-center justify-center min-h-full'}>
      <div className={`bg-white flex flex-col overflow-hidden ${isMobile ? 'w-full h-full' : 'w-[375px] h-[812px]'}`}>
        {passo !== 'resultado' && (
          <div className="flex gap-1.5 px-4 pt-3 pb-1 flex-shrink-0">
            {passos.map((_, i) => (
              <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= passoAtual ? 'bg-[#0F766E]' : 'bg-gray-200'}`} />
            ))}
          </div>
        )}
        <div className="flex-1 overflow-y-auto">
          {passo === 'cadastro' && <Cadastro onNext={() => setPasso('perfil')} onPular={() => onNavigate('t1')} />}
          {passo === 'perfil' && <CriarPerfil onNext={() => setPasso('mbti')} />}
          {passo === 'mbti' && <TesteMBTI respostas={respostas} onResposta={handleResposta} onNext={avancarMBTI} onPular={() => onNavigate('t1')} />}
          {passo === 'resultado' && <ResultadoMBTI tipo={tipo} onNavigate={onNavigate} onReiniciar={reiniciar} />}
        </div>
      </div>
    </div>
  );
}

function Cadastro({ onNext, onPular }: { onNext: () => void; onPular: () => void }) {
  const [matricula, setMatricula] = useState('');

  return (
    <>
      <div className="flex flex-col items-center justify-center pt-14 pb-10 px-6"
        style={{ background: 'linear-gradient(135deg, #0F766E, #3B82F6)' }}>
        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
        </div>
        <h1 className="text-white text-xl font-semibold mb-1">Bem-vindo(a)!</h1>
        <p className="text-white/80 text-sm text-center">Sua plataforma de projetos acadêmicos</p>
      </div>

      <div className="flex-1 px-6 pt-8 pb-6">
        <h2 className="text-gray-900 text-lg font-semibold mb-1">Entre com sua matrícula</h2>
        <p className="text-gray-500 text-sm mb-6">Use o número fornecido pela sua instituição</p>

        <label className="block text-xs font-medium text-gray-600 mb-2">Número de Matrícula</label>
        <input
          type="text"
          value={matricula}
          onChange={e => setMatricula(e.target.value)}
          placeholder="Ex: 2024001234"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0F766E] mb-8"
        />

        <button
          onClick={onNext}
          disabled={!matricula.trim()}
          className={`w-full py-3 rounded-xl font-medium text-sm transition-colors ${
            matricula.trim() ? 'bg-[#3B82F6] text-white' : 'bg-gray-100 text-gray-400'
          }`}
        >
          Continuar
        </button>

        <p className="text-center text-sm text-gray-400 mt-4">
          Primeiro acesso?{' '}
          <a href="#" className="text-[#3B82F6]">Saiba como encontrar sua matrícula</a>
        </p>

        <div className="mt-8 flex justify-center">
          <button onClick={onPular} className="text-sm text-gray-400 underline underline-offset-2">
            Ir direto para a página inicial
          </button>
        </div>
      </div>
    </>
  );
}

function CriarPerfil({ onNext }: { onNext: () => void }) {
  const [nome, setNome] = useState('');
  const [bio, setBio] = useState('');
  const [fotoSelecionada, setFotoSelecionada] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-10 h-12 flex-shrink-0"
        style={{ background: 'linear-gradient(to right, #0F766E, #3B82F6)' }} />

      <div className="flex-1 px-6 pt-6 pb-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-dashed border-gray-300 bg-gray-100 flex flex-col items-center justify-center cursor-pointer mb-2">
            {fotoSelecionada ? (
              <img src="/foto-de-perfil.png" alt="Foto de perfil" className="w-full h-full object-cover" />
            ) : (
              <>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                <span className="text-xs text-gray-400 mt-1">Foto</span>
              </>
            )}
          </div>
          <button onClick={() => setFotoSelecionada(true)} className="text-sm text-[#3B82F6]">Escolher foto</button>
        </div>

        <label className="block text-xs font-medium text-gray-600 mb-2">Nome completo</label>
        <input
          type="text"
          value={nome}
          onChange={e => setNome(e.target.value)}
          placeholder="Seu nome"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0F766E] mb-4"
        />

        <label className="block text-xs font-medium text-gray-600 mb-2">Sobre mim</label>
        <textarea
          value={bio}
          onChange={e => setBio(e.target.value)}
          placeholder="Conte um pouco sobre você, seus interesses e objetivos..."
          rows={3}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#0F766E] resize-none mb-4"
        />

        <button
          onClick={onNext}
          disabled={!nome.trim()}
          className={`w-full py-3 rounded-xl font-medium text-sm transition-colors ${
            nome.trim() ? 'bg-[#3B82F6] text-white' : 'bg-gray-100 text-gray-400'
          }`}
        >
          Continuar para o teste
        </button>
      </div>
    </>
  );
}

function TesteMBTI({ respostas, onResposta, onNext, onPular }: {
  respostas: Record<number, Resposta>;
  onResposta: (id: number, resposta: Resposta) => void;
  onNext: () => void;
  onPular: () => void;
}) {
  const respondidas = Object.keys(respostas).length;
  const todasRespondidas = respondidas === perguntas.length;

  return (
    <>
      <div className="sticky top-0 z-10 h-12 flex-shrink-0"
        style={{ background: 'linear-gradient(to right, #0F766E, #3B82F6)' }} />

      <div className="px-4 pt-4 pb-40">
        <p className="text-sm text-gray-500 mb-1 text-center">
          Responda com sinceridade — não há respostas certas ou erradas
        </p>
        <p className="text-xs text-gray-400 mb-5 text-center">
          {respondidas} de {perguntas.length} respondidas
        </p>

        <div className="space-y-4">
          {perguntas.map((p, idx) => (
            <div key={p.id} className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm font-medium text-gray-900 mb-3">{idx + 1}. {p.texto}</p>
              <div className="space-y-2">
                {(['A', 'B'] as const).map(op => (
                  <button
                    key={op}
                    onClick={() => onResposta(p.id, op)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      respostas[p.id] === op
                        ? 'bg-[#0F766E] text-white'
                        : 'bg-white border border-gray-200 text-gray-700 hover:border-[#0F766E]/40'
                    }`}
                  >
                    {op === 'A' ? p.A : p.B}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 px-4 pt-4 bg-white border-t border-gray-100 flex gap-3 z-50" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
        <button
          onClick={onPular}
          className="flex-1 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium text-sm"
        >
          Pular
        </button>
        <button
          onClick={onNext}
          disabled={!todasRespondidas}
          className={`flex-[2] py-3 rounded-xl font-medium text-sm transition-colors ${
            todasRespondidas ? 'bg-[#3B82F6] text-white' : 'bg-gray-100 text-gray-400'
          }`}
        >
          Ver meu resultado
        </button>
      </div>
    </>
  );
}

function ResultadoMBTI({ tipo, onNavigate, onReiniciar }: {
  tipo: string;
  onNavigate: (view: string) => void;
  onReiniciar: () => void;
}) {
  const info = tipos[tipo] ?? tipos['ENFP'];

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 pt-12 pb-10 flex flex-col items-center"
        style={{ background: `linear-gradient(135deg, ${info.cor}, #3B82F6)` }}>
        <p className="text-white/70 text-sm mb-3">Seu perfil de personalidade</p>
        <div className="text-white font-bold tracking-widest mb-2" style={{ fontSize: 56 }}>
          {tipo}
        </div>
        <div className="text-white text-xl font-semibold">{info.nome}</div>
      </div>

      <div className="flex-1 px-6 pt-6 pb-6">
        <p className="text-gray-700 text-sm leading-relaxed mb-5">{info.descricao}</p>

        <div className="flex gap-2 flex-wrap mb-8">
          {info.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-[#0F766E]/10 text-[#0F766E] rounded-full text-xs font-medium">
              {tag}
            </span>
          ))}
        </div>

        <button
          onClick={() => onNavigate('t1')}
          className="w-full py-3 bg-[#3B82F6] text-white rounded-xl font-medium text-sm mb-3"
        >
          Finalizar e entrar no app
        </button>
        <button
          onClick={onReiniciar}
          className="w-full py-3 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-medium"
        >
          Refazer o teste
        </button>
      </div>
    </div>
  );
}
