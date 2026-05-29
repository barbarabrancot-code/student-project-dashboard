import { useState } from 'react';

const entregasMock = [
  { id: 'e1',    nome: 'Entrega 1 — Análise Inicial',      data: '14/04/2026' },
  { id: 'e2',    nome: 'Entrega 2 — Mapeamento de Riscos', data: '05/05/2026' },
  { id: 'banca', nome: 'Banca Final',                      data: '28/05/2026' },
];

const documentosPorEntrega: Record<string, { nome: string; uploader: string; time: string }[]> = {
  e1:    [
    { nome: 'Relatorio_v1.pdf',      uploader: 'Ana',    time: 'há 2 dias' },
    { nome: 'Relatorio_v2.pdf',      uploader: 'Bruno',  time: 'há 1 dia'  },
  ],
  e2:    [
    { nome: 'Mapeamento_riscos.pdf', uploader: 'Carlos', time: 'há 3 dias' },
  ],
  banca: [],
};

const comentariosPorEntrega: Record<string, { texto: string; data: string } | null> = {
  e1:    { texto: 'Boa entrega! O levantamento inicial está bem estruturado. Para a próxima, aprofundem a análise dos agentes biológicos e relacionem mais diretamente com a NR-32.', data: 'há 1 dia' },
  e2:    { texto: 'Mapeamento completo. Fiquei satisfeita com o nível de detalhe. Revisem as medidas de controle para os riscos de categoria A antes da validação.', data: 'há 2 dias' },
  banca: null,
};

export default function EntregaDoGrupo({ onNavigate, isMobile }: { onNavigate: (view: string) => void; isMobile?: boolean }) {
  const [entregaId, setEntregaId] = useState('e1');
  const [dropdownAberto, setDropdownAberto] = useState(false);

  const entregaAtual = entregasMock.find(e => e.id === entregaId)!;
  const documentos = documentosPorEntrega[entregaId] ?? [];
  const comentario = comentariosPorEntrega[entregaId] ?? null;

  return (
    <div className={isMobile ? 'w-full h-full flex flex-col' : 'flex items-center justify-center min-h-full'}>
      <div className={`bg-white relative flex flex-col ${isMobile ? 'w-full h-full' : 'w-[375px] h-[812px]'}`}>
        <Header />
        <div className="flex-1 overflow-y-auto">
          <div className="pb-20">

            <div className="m-4 p-4 border border-[#0F766E]/20 rounded-xl bg-[#0F766E]/5">
              <div className="text-xs text-[#0F766E] font-medium mb-2">Marco atual</div>
              <h2 className="mb-2 text-gray-900 font-semibold">Mapeamento e Análise de Riscos Biológicos</h2>
              <p className="text-sm text-gray-500">Entrega vinculada à semana 8</p>
            </div>

            <div className="mx-4 mb-6">
              <p className="text-sm font-medium text-gray-900 mb-2">Selecione a entrega</p>
              <div className="relative">
                <button
                  onClick={() => setDropdownAberto(!dropdownAberto)}
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
                    {entregasMock.map((e, i) => (
                      <button key={e.id}
                        onClick={() => { setEntregaId(e.id); setDropdownAberto(false); }}
                        className={`w-full p-3 text-left ${i < entregasMock.length - 1 ? 'border-b border-gray-100' : ''} ${e.id === entregaId ? 'bg-gray-50' : ''}`}>
                        <div className="text-sm font-semibold text-gray-900">{e.nome}</div>
                        <div className="text-xs text-gray-500">{e.data}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mx-4 mb-6">
              <div className="text-sm font-medium text-gray-900 mb-3">Documentos Enviados</div>
              {documentos.length > 0 ? (
                <div className="space-y-3 mb-3">
                  {documentos.map((doc, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl bg-white">
                      <div className="w-8 h-8 flex-shrink-0 rounded-lg bg-[#0F766E]/10 flex items-center justify-center text-[#0F766E]">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <path d="M14 2v6h6" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-900 mb-0.5">{doc.nome}</div>
                        <div className="text-xs text-gray-500">Enviado por {doc.uploader} · {doc.time}</div>
                      </div>
                      <a href="#" className="text-sm text-[#3B82F6] font-medium">Ver</a>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic text-center py-4 mb-3">Nenhum documento enviado ainda</p>
              )}
              <button className="w-full py-3 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-medium">
                + Enviar nova versão
              </button>
            </div>

            {comentario && (
              <div className="mx-4 mb-6">
                <div className="text-sm font-medium text-gray-900 mb-3">Comentário da professora</div>
                <div className="p-4 border border-[#0F766E]/20 rounded-xl bg-[#0F766E]/5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#0F766E] flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-white">PC</span>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-900">Prof. Carla</div>
                      <div className="text-xs text-gray-400">{comentario.data}</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{comentario.texto}</p>
                </div>
              </div>
            )}

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

function BottomNav({ onNavigate, isMobile }: { onNavigate: (view: string) => void; isMobile?: boolean }) {
  const navItems = [
    { icon: 'home',    label: 'Home',       viewId: 't1',         active: false },
    { icon: 'project', label: 'Projeto',    viewId: 't2',         active: true  },
    { icon: 'star',    label: 'Avaliações', viewId: 'avaliacoes', active: false },
    { icon: 'profile', label: 'Perfil',     viewId: 'perfil',     active: false },
  ];

  return (
    <div className={`bg-white border-t border-gray-100 px-4 pt-2 flex justify-around ${isMobile ? 'fixed bottom-0 left-0 right-0 z-50' : ''}`}
      style={isMobile ? { paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' } : {}}>
      {navItems.map((item, index) => (
        <button key={index} onClick={() => item.viewId && onNavigate(item.viewId)}
          className="flex flex-col items-center py-1">
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
