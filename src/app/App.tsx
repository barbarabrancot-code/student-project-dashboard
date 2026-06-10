import { useState } from 'react';
import EmpresaApp from './components/EmpresaApp';
import EntregaDoGrupo from './components/EntregaDoGrupo';
import PainelDeTurma from './components/PainelDeTurma';
import AvaliacaoFinal from './components/AvaliacaoFinal';
import AcompanhamentoEmpresa from './components/AcompanhamentoEmpresa';
import BancoDeTalentos from './components/BancoDeTalentos';
import Onboarding from './components/Onboarding';
import Perfil from './components/Perfil';
import Avaliacoes from './components/Avaliacoes';
import LandingPage from './components/LandingPage';

type ViewId = 't1' | 't2' | 'teacher' | 'grading' | 'company' | 'talents' | 'onboarding' | 'perfil' | 'avaliacoes' | 'empresa-app' | 'lp';

const navItems: { id: ViewId; short: string; label: string; views: ViewId[] }[] = [
  { id: 'onboarding',  short: 'EN', label: 'Entrada',          views: ['onboarding']                          },
  { id: 't1',          short: 'AL', label: 'Aluno',            views: ['t1', 't2', 'perfil', 'avaliacoes']    },
  { id: 'teacher',     short: 'PR', label: 'Professor',        views: ['teacher', 'grading']                  },
  { id: 'company',     short: 'EM', label: 'Empresa',          views: ['company', 'talents']                  },
  { id: 'empresa-app', short: 'CA', label: 'Companion App',    views: ['empresa-app']                         },
  { id: 'lp',          short: 'LP', label: 'Landing Page',     views: ['lp']                                  },
];

export default function App() {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
  const appParam = new URLSearchParams(window.location.search).get('app');
  const isMobile = appParam === 'aluno' || new URLSearchParams(window.location.search).get('mobile') === 'true' || isStandalone;
  const isEmpresa = appParam === 'empresa';
  const isLP = appParam === 'lp';
  const [currentView, setCurrentView] = useState<ViewId>(isMobile ? 'onboarding' : 't1');

  if (isEmpresa) {
    return (
      <div className="w-screen bg-white overflow-hidden" style={{ height: '100dvh' }}>
        <EmpresaApp />
      </div>
    );
  }

  if (isLP) {
    return (
      <div className="w-screen overflow-y-auto" style={{ height: '100dvh' }}>
        <LandingPage />
      </div>
    );
  }

  return (
    <div className="flex w-screen bg-gray-50 overflow-hidden" style={{ height: '100dvh' }}>

      {/* Sidebar recolhida — escondida no modo mobile */}
      {!isMobile && <div className="group flex-shrink-0 w-12 hover:w-52 transition-all duration-300 bg-gray-900 flex flex-col overflow-hidden">
        <div className="p-3 border-b border-gray-700 flex-shrink-0">
          <div className="w-6 h-6 bg-gray-600 rounded" />
        </div>
        <nav className="flex-1 py-2 overflow-hidden">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 text-left transition-colors ${
                item.views.includes(currentView)
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <span className="text-xs font-bold flex-shrink-0 w-6 text-center">{item.short}</span>
              <span className="text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </div>}

      {/* Área principal */}
      <div className={`flex-1 h-full ${isMobile ? 'overflow-hidden' : 'overflow-auto'}`}>

      {currentView === 'onboarding' ? (
        <Onboarding onNavigate={(v: string) => setCurrentView(v as ViewId)} isMobile={isMobile} />
      ) : currentView === 't2' ? (
        <EntregaDoGrupo onNavigate={(v: string) => setCurrentView(v as ViewId)} isMobile={isMobile} />
      ) : currentView === 'teacher' ? (
        <PainelDeTurma onNavigate={(v: string) => setCurrentView(v as ViewId)} />
      ) : currentView === 'grading' ? (
        <AvaliacaoFinal onNavigate={(v: string) => setCurrentView(v as ViewId)} />
      ) : currentView === 'company' ? (
        <AcompanhamentoEmpresa onNavigate={(v: string) => setCurrentView(v as ViewId)} />
      ) : currentView === 'talents' ? (
        <BancoDeTalentos onNavigate={(v: string) => setCurrentView(v as ViewId)} />
      ) : currentView === 'lp' ? (
        <div className="flex items-start justify-center min-h-full">
          <div className="w-[375px] bg-white shadow-xl border border-gray-200 rounded-2xl overflow-y-auto" style={{ minHeight: '812px' }}>
            <LandingPage />
          </div>
        </div>
      ) : currentView === 'empresa-app' ? (
        <div className="flex items-center justify-center min-h-full">
          <div className="w-[375px] h-[812px] bg-white relative flex flex-col overflow-hidden rounded-2xl shadow-xl border border-gray-200"
            style={{ transform: 'translateZ(0)' }}>
            <EmpresaApp />
          </div>
        </div>
      ) : currentView === 'perfil' ? (
        <Perfil onNavigate={(v: string) => setCurrentView(v as ViewId)} isMobile={isMobile} />
      ) : currentView === 'avaliacoes' ? (
        <Avaliacoes onNavigate={(v: string) => setCurrentView(v as ViewId)} isMobile={isMobile} />
      ) : (
        <div className={isMobile ? 'w-full h-full flex flex-col' : 'flex items-center justify-center min-h-full'}>
          <div className={`bg-white relative flex flex-col ${isMobile ? 'w-full h-full' : 'w-[375px] h-[812px]'}`}>
            <div className="flex-1 overflow-y-auto">
              <div className="pb-20">
                <ProjectCard />
                <Timeline />
                <NextDeliveryCard />
                <GroupStatus />
                <RecentUpdates />
              </div>
            </div>

            <BottomNav onNavigate={(v: string) => setCurrentView(v as ViewId)} isMobile={isMobile} />
          </div>
        </div>
      )}
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

function ProjectCard() {
  return (
    <div className="m-4 p-4 border border-[#0F766E]/20 rounded-2xl bg-[#0F766E]/5">
      <img src="/student-project-dashboard/laboralogo.svg" alt="Labora" className="mb-4" style={{ width: '40%' }} />
      <h2 className="mb-2 text-gray-900">SafeLab — Mapeamento de Riscos Ocupacionais</h2>
      <div className="flex items-center gap-2 mb-3">
        <img src="/student-project-dashboard/sabin%20(2).png" alt="Sabin" className="w-6 h-6 rounded object-cover" />
        <span className="text-sm text-gray-500">Laboratório Sabin</span>
      </div>
      <div className="flex gap-2 mb-3">
        <span className="px-3 py-1 bg-[#0F766E]/10 text-[#0F766E] rounded-full text-xs font-medium">
          Segurança do Trabalho
        </span>
        <span className="px-3 py-1 bg-[#3B82F6]/10 text-[#3B82F6] rounded-full text-xs font-medium">
          Semana 8 de 16
        </span>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Progresso</span>
          <span className="font-medium text-[#0F766E]">50%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full w-1/2 rounded-full" style={{ background: 'linear-gradient(to right, #0F766E, #34D399)' }} />
        </div>
      </div>
    </div>
  );
}

function Timeline() {
  const marcos = [
    { label: 'Kickoff',     sub: 'Sem 1',  status: 'completed' },
    { label: 'Entrega 1',   sub: 'Sem 6',  status: 'completed' },
    { label: 'Validação',   sub: 'Sem 13', status: 'current'   },
    { label: 'Banca Final', sub: 'Sem 16', status: 'future'    },
  ];

  return (
    <div className="mx-4 mb-6">
      <div className="relative">
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
                {m.status === 'future' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                )}
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
      </div>
      <p className="text-xs text-gray-400 text-center mt-3">Acompanhe seu progresso no semestre</p>
    </div>
  );
}

function NextDeliveryCard() {
  return (
    <div className="mx-4 mb-6 p-4 rounded-2xl overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0F766E, #3B82F6)' }}>
      <div className="text-xs text-white/70 mb-2">Próxima Entrega</div>
      <h3 className="mb-3 text-white">Relatório de Mapeamento de Riscos — v2</h3>
      <div className="flex items-center gap-2 mb-4">
        <span className="px-3 py-1 bg-white/20 text-white rounded-full text-xs font-medium">
          Prazo: 6 dias
        </span>
        <span className="px-3 py-1 bg-white/20 text-white rounded-full text-xs font-medium">
          Em andamento
        </span>
      </div>
      <button className="w-full py-3 bg-white text-[#0F766E] rounded-xl font-medium text-sm">
        Ver Entrega
      </button>
    </div>
  );
}

function GroupStatus() {
  const members = [
    { name: 'Ana',    activity: 'Ativo hoje',       foto: '/student-project-dashboard/aluna.png' },
    { name: 'Bruno',  activity: 'Ativo hoje',       foto: '/student-project-dashboard/brunocosta-convertido-de-jpg.webp' },
    { name: 'Carlos', activity: 'Ativo há 2 dias',  foto: '/student-project-dashboard/carloslima-convertido-de-jpg.webp' },
    { name: 'Diana',  activity: 'Ativo há 2 dias',  foto: '/student-project-dashboard/dianasouza-convertido-de-jpg.webp' },
  ];

  return (
    <div className="mx-4 mb-6">
      <div className="text-sm mb-3 font-medium text-gray-900">Meu Grupo — G3</div>
      <div className="flex gap-4 mb-3">
        {members.map((member, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full overflow-hidden mb-1 flex-shrink-0">
              <img src={member.foto} alt={member.name} className="w-full h-full object-cover" />
            </div>
            <div className="text-xs text-gray-800 font-medium">{member.name}</div>
            <div className="text-xs text-gray-400">{member.activity}</div>
          </div>
        ))}
      </div>
      <a href="#" className="text-sm text-[#3B82F6]">Ver workspace completo →</a>
    </div>
  );
}

function RecentUpdates() {
  const updates = [
    { icon: 'comment', text: 'Prof. Carla comentou na Entrega 1', time: 'há 1 dia', color: 'bg-[#3B82F6]/10 text-[#3B82F6]' },
    { icon: 'check', text: 'Entrega 1 aprovada', time: 'há 3 dias', color: 'bg-[#34D399]/20 text-[#0F766E]' },
    { icon: 'file', text: 'Briefing da Sabin atualizado', time: 'há 5 dias', color: 'bg-gray-100 text-gray-500' }
  ];

  return (
    <div className="mx-4 mb-6">
      <div className="text-sm mb-3 font-medium text-gray-900">Atualizações Recentes</div>
      <div className="space-y-3">
        {updates.map((update, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className={`w-8 h-8 flex-shrink-0 rounded-xl flex items-center justify-center ${update.color}`}>
              {update.icon === 'comment' && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              )}
              {update.icon === 'check' && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              )}
              {update.icon === 'file' && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-900">{update.text}</div>
              <div className="text-xs text-gray-400">{update.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BottomNav({ onNavigate, isMobile }: { onNavigate: (view: string) => void; isMobile?: boolean }) {
  const navItems = [
    { icon: 'home',    label: 'Home',       viewId: 't1',         active: true  },
    { icon: 'project', label: 'Projeto',    viewId: 't2',         active: false },
    { icon: 'star',    label: 'Avaliações', viewId: 'avaliacoes', active: false },
    { icon: 'profile', label: 'Perfil',     viewId: 'perfil',     active: false },
  ];

  return (
    <div className={`bg-white border-t border-gray-100 px-4 pt-2 flex justify-around flex-shrink-0 ${isMobile ? 'fixed bottom-0 left-0 right-0 z-50' : 'sticky bottom-0'}`} style={isMobile ? { paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' } : {}}>
      {navItems.map((item, index) => (
        <button
          key={index}
          onClick={() => item.viewId && onNavigate(item.viewId)}
          className="flex flex-col items-center py-1"
        >
          <div className={`w-6 h-6 mb-1 ${item.active ? 'text-[#0F766E]' : 'text-gray-300'}`}>
            {item.icon === 'home' && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <path d="M9 22V12h6v10" />
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