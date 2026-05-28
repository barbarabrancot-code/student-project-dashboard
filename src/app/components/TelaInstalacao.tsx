import { useState } from 'react';

export default function TelaInstalacao({ onContinuar }: { onContinuar: () => void }) {
  const [instalando, setInstalando] = useState(false);
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  const handleInstalar = async () => {
    const prompt = (window as any).installPrompt;
    if (prompt) {
      setInstalando(true);
      prompt.prompt();
      const { outcome } = await prompt.userChoice;
      if (outcome === 'accepted') {
        onContinuar();
      } else {
        setInstalando(false);
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-between px-6 py-12"
      style={{ background: 'linear-gradient(160deg, #0F766E, #3B82F6)' }}>

      <div />

      <div className="flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center mb-6">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
        </div>
        <h1 className="text-white text-2xl font-bold mb-2">Student Dashboard</h1>
        <p className="text-white/70 text-sm mb-10 leading-relaxed">
          Acompanhe seu projeto, avaliações e portfólio acadêmico
        </p>

        {isIOS ? (
          <div className="w-full bg-white/10 rounded-2xl p-5 text-left mb-4">
            <p className="text-white font-medium text-sm mb-3">Para instalar no iPhone:</p>
            <div className="space-y-3">
              {[
                { n: '1', txt: 'Toque no ícone de compartilhar', icon: 'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z' },
                { n: '2', txt: 'Selecione "Adicionar à Tela de Início"', icon: 'M12 4v16m8-8H4' },
                { n: '3', txt: 'Toque em "Adicionar"', icon: 'M5 13l4 4L19 7' },
              ].map(s => (
                <div key={s.n} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">{s.n}</span>
                  </div>
                  <span className="text-white/80 text-sm">{s.txt}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <button
            onClick={handleInstalar}
            disabled={instalando}
            className="w-full py-4 bg-white text-[#0F766E] rounded-2xl font-semibold text-base mb-4"
          >
            {instalando ? 'Instalando...' : 'Instalar app'}
          </button>
        )}

        <button onClick={onContinuar} className="text-white/50 text-sm">
          Continuar no navegador
        </button>
      </div>

      <div />
    </div>
  );
}
