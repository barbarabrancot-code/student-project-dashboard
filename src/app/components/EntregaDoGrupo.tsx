export default function EntregaDoGrupo({ onNavigate, isMobile }: { onNavigate: (view: string) => void; isMobile?: boolean }) {
  return (
    <div className={isMobile ? 'w-full h-full flex flex-col' : 'flex items-center justify-center min-h-full'}>
      <div className={`bg-white relative flex flex-col ${isMobile ? 'w-full h-full' : 'w-[375px] h-[812px]'}`}>
        <Header />
        <div className="flex-1 overflow-y-auto">
          <div className="pb-20">
            <DeliveryBanner />
            <TaskList />
            <DocumentsSection />
            <SelfAssessmentBanner />
          </div>
        </div>
        <BottomNav onNavigate={onNavigate} isMobile={isMobile} />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="sticky top-0 z-10 px-4 py-3 flex items-center justify-between border-b border-white/20"
      style={{ background: 'linear-gradient(to right, #0F766E, #3B82F6)' }}>
      <div className="w-6 h-6 flex items-center justify-center text-white">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </div>
      <h1 className="text-base text-white">Entrega 2</h1>
      <span className="px-3 py-1 bg-white/20 text-white rounded-full text-xs font-medium">
        6 dias
      </span>
    </div>
  );
}

function DeliveryBanner() {
  return (
    <div className="m-4 p-4 border border-[#0F766E]/20 rounded-xl bg-[#0F766E]/5">
      <div className="text-xs text-[#0F766E] font-medium mb-2">Marco atual</div>
      <h2 className="mb-2 text-gray-900">Mapeamento e Análise de Riscos Biológicos</h2>
      <p className="text-sm text-gray-500 mb-3">
        Entrega vinculada à semana 8 — aprovação do professor necessária
      </p>
      <span className="inline-block px-3 py-1 bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20 rounded-full text-xs font-medium">
        Em andamento
      </span>
    </div>
  );
}

function TaskList() {
  const tasks = [
    { name: 'Levantar dados da NR-32', assignee: 'Ana', status: 'completed', checked: true },
    { name: 'Mapear riscos biológicos do laboratório', assignee: 'Bruno', status: 'in-progress', checked: false },
    { name: 'Criar matriz de riscos', assignee: 'Carlos', status: 'in-progress', checked: false },
    { name: 'Revisar documento final', assignee: 'Diana', status: 'pending', checked: false }
  ];

  const statusConfig = {
    completed:   { label: 'Concluída',    className: 'bg-[#34D399]/20 text-[#0F766E] border border-[#34D399]/40' },
    'in-progress': { label: 'Em andamento', className: 'bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20' },
    pending:     { label: 'Pendente',     className: 'bg-gray-100 text-gray-500 border border-gray-200' }
  };

  return (
    <div className="mx-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-medium text-gray-900">Tarefas do Grupo</div>
        <a href="#" className="text-sm text-[#3B82F6]">+ Nova tarefa</a>
      </div>
      <div className="space-y-3">
        {tasks.map((task, index) => {
          const s = statusConfig[task.status as keyof typeof statusConfig];
          return (
            <div key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl bg-white">
              <input type="checkbox" checked={task.checked} readOnly
                className="w-5 h-5 rounded border-2 border-gray-200 accent-[#0F766E]" />
              <div className="flex-1">
                <div className="text-sm text-gray-900 mb-1">{task.name}</div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-gray-200 rounded-full" />
                  <span className="text-xs text-gray-500">{task.assignee}</span>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs whitespace-nowrap font-medium ${s.className}`}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DocumentsSection() {
  const documents = [
    { name: 'Relatorio_v1.pdf', uploader: 'Ana', time: 'há 2 dias' },
    { name: 'Relatorio_v2.pdf', uploader: 'Bruno', time: 'há 1 dia' }
  ];

  return (
    <div className="mx-4 mb-6">
      <div className="text-sm font-medium text-gray-900 mb-3">Documentos Enviados</div>
      <div className="space-y-3 mb-3">
        {documents.map((doc, index) => (
          <div key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl bg-white">
            <div className="w-8 h-8 flex-shrink-0 rounded-lg bg-[#0F766E]/10 flex items-center justify-center text-[#0F766E]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-900 mb-1">{doc.name}</div>
              <div className="text-xs text-gray-500">Enviado por {doc.uploader} · {doc.time}</div>
            </div>
            <a href="#" className="text-sm text-[#3B82F6] font-medium">Ver</a>
          </div>
        ))}
      </div>
      <button className="w-full py-3 bg-white border border-gray-200 text-gray-700 rounded-xl mb-2 text-sm font-medium">
        + Enviar nova versão
      </button>
      <p className="text-xs text-gray-400 text-center">Adicione uma descrição ao enviar</p>
    </div>
  );
}


function SelfAssessmentBanner() {
  return (
    <div className="mx-4 mb-6 p-4 rounded-xl overflow-hidden relative"
      style={{ background: 'linear-gradient(135deg, #0F766E, #3B82F6)' }}>
      <div className="flex items-start gap-3 mb-3">
        <div className="w-6 h-6 flex-shrink-0 text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
            <rect x="9" y="3" width="6" height="4" rx="1" />
          </svg>
        </div>
        <p className="text-sm text-white flex-1">
          Autoavaliação pendente — responda até a data de entrega
        </p>
      </div>
      <button className="w-full py-3 bg-white text-[#0F766E] rounded-xl font-medium text-sm">
        Responder agora
      </button>
    </div>
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
    <div className={`bg-white border-t border-gray-100 px-4 py-2 flex justify-around ${isMobile ? 'fixed bottom-0 left-0 right-0 z-50' : ''}`}>
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
