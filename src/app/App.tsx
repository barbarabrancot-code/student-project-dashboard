import { useState } from 'react';
import EntregaDoGrupo from './components/EntregaDoGrupo';
import PainelDeTurma from './components/PainelDeTurma';
import AvaliacaoFinal from './components/AvaliacaoFinal';
import AcompanhamentoEmpresa from './components/AcompanhamentoEmpresa';
import BancoDeTalentos from './components/BancoDeTalentos';
import Onboarding from './components/Onboarding';
import Perfil from './components/Perfil';
import Avaliacoes from './components/Avaliacoes';

type ViewId = 't1' | 't2' | 'teacher' | 'grading' | 'company' | 'talents' | 'onboarding' | 'perfil' | 'avaliacoes';

const navItems: { id: ViewId; short: string; label: string; views: ViewId[] }[] = [
  { id: 'onboarding', short: 'EN', label: 'Entrada',   views: ['onboarding']                          },
  { id: 't1',         short: 'AL', label: 'Aluno',     views: ['t1', 't2', 'perfil', 'avaliacoes']    },
  { id: 'teacher',    short: 'PR', label: 'Professor', views: ['teacher', 'grading']                  },
  { id: 'company',    short: 'EM', label: 'Empresa',   views: ['company', 'talents']                  },
];

export default function App() {
  const isMobile = new URLSearchParams(window.location.search).get('mobile') === 'true';
  const [currentView, setCurrentView] = useState<ViewId>('t1');

  return (
    <div className="flex w-screen h-screen bg-gray-50 overflow-hidden">

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
      <div className="flex-1 overflow-auto h-full">

      {currentView === 'onboarding' ? (
        <Onboarding onNavigate={(v: string) => setCurrentView(v as ViewId)} />
      ) : currentView === 't2' ? (
        <EntregaDoGrupo onNavigate={(v: string) => setCurrentView(v as ViewId)} />
      ) : currentView === 'teacher' ? (
        <PainelDeTurma onNavigate={(v: string) => setCurrentView(v as ViewId)} />
      ) : currentView === 'grading' ? (
        <AvaliacaoFinal onNavigate={(v: string) => setCurrentView(v as ViewId)} />
      ) : currentView === 'company' ? (
        <AcompanhamentoEmpresa onNavigate={(v: string) => setCurrentView(v as ViewId)} />
      ) : currentView === 'talents' ? (
        <BancoDeTalentos onNavigate={(v: string) => setCurrentView(v as ViewId)} />
      ) : currentView === 'perfil' ? (
        <Perfil onNavigate={(v: string) => setCurrentView(v as ViewId)} />
      ) : currentView === 'avaliacoes' ? (
        <Avaliacoes onNavigate={(v: string) => setCurrentView(v as ViewId)} />
      ) : (
        <div className="flex items-center justify-center min-h-full">
          <div className="w-[375px] h-[812px] bg-white relative flex flex-col">
            <Header />

            <div className="flex-1 overflow-y-auto">
              <div className="pb-4">
                <ProjectCard />
                <Timeline />
                <NextDeliveryCard />
                <GroupStatus />
                <RecentUpdates />
              </div>
            </div>

            <BottomNav onNavigate={(v: string) => setCurrentView(v as ViewId)} />
          </div>
        </div>
      )}
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
      <h1 className="text-base text-white">Meu Desafio</h1>
      <div className="w-6 h-6 flex items-center justify-center text-white">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      </div>
    </div>
  );
}

function ProjectCard() {
  return (
    <div className="m-4 p-4 border border-[#0F766E]/20 rounded-2xl bg-[#0F766E]/5">
      <h2 className="mb-2 text-gray-900">SafeLab — Mapeamento de Riscos Ocupacionais</h2>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 bg-gray-200 rounded" />
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
  const milestones = [
    { label: 'Kickoff', week: 'Sem 1', status: 'completed' },
    { label: 'Entrega 1', week: 'Sem 6', status: 'completed' },
    { label: 'Validação', week: 'Sem 13', status: 'current' },
    { label: 'Banca Final', week: 'Sem 16', status: 'future' }
  ];

  return (
    <div className="mx-4 mb-6">
      <div className="overflow-x-auto">
        <div className="flex items-center justify-between min-w-max px-4">
          {milestones.map((milestone, index) => (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                  milestone.status === 'completed' ? 'bg-[#0F766E] border-[#0F766E]' :
                  milestone.status === 'current' ? 'border-[#3B82F6] bg-white' :
                  'border-gray-200 bg-white'
                }`}>
                  {milestone.status === 'completed' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  )}
                  {milestone.status === 'current' && (
                    <div className="w-3 h-3 bg-[#3B82F6] rounded-full" />
                  )}
                </div>
                <div className="mt-2 text-xs text-center whitespace-nowrap">
                  <div className="text-gray-800 font-medium">{milestone.label}</div>
                  <div className="text-gray-400">{milestone.week}</div>
                </div>
              </div>
              {index < milestones.length - 1 && (
                <div className={`h-0.5 w-16 mx-2 ${
                  milestone.status === 'completed' ? 'bg-[#34D399]' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
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
    { name: 'Ana', activity: 'Ativo hoje' },
    { name: 'Bruno', activity: 'Ativo hoje' },
    { name: 'Carlos', activity: 'Ativo há 2 dias' },
    { name: 'Diana', activity: 'Ativo há 2 dias' }
  ];

  return (
    <div className="mx-4 mb-6">
      <div className="text-sm mb-3 font-medium text-gray-900">Meu Grupo — G3</div>
      <div className="flex gap-4 mb-3">
        {members.map((member, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-gray-200 mb-1" />
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

function BottomNav({ onNavigate }: { onNavigate: (view: string) => void }) {
  const navItems = [
    { icon: 'home',    label: 'Home',       viewId: 't1',         active: true  },
    { icon: 'project', label: 'Projeto',    viewId: 't2',         active: false },
    { icon: 'star',    label: 'Avaliações', viewId: 'avaliacoes', active: false },
    { icon: 'profile', label: 'Perfil',     viewId: 'perfil',     active: false },
  ];

  return (
    <div className="bg-white border-t border-gray-100 px-4 py-2 flex justify-around">
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