
import React, { useState, useEffect } from 'react';
import Card from './Card';
import Button from './ui/Button';

interface AccountSetupProps {
  vpnKey?: string;
}

const AccountSetup: React.FC<AccountSetupProps> = ({ vpnKey }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('iOS');
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const [showInStepQr, setShowInStepQr] = useState(false);
  
  const platforms = [
    { 
      name: 'iOS', 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="4" />
          <path d="M12 18h.01" />
        </svg>
      ), 
      app: 'Streisand', 
      url: 'https://apps.apple.com/app/streisand/id6450534064',
      isMobile: true,
      steps: [
        'Установите Streisand из App Store',
        'Нажмите "+" в углу экрана',
        'Выберите "Scan QR Code" и наведите на ключ'
      ]
    },
    { 
      name: 'Android', 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 15l-2 5M19 15l2 5" />
          <path d="M16 8v-2a4 4 0 0 0-8 0v2" />
          <rect x="4" y="8" width="16" height="11" rx="2" />
          <path d="M9 13h.01M15 13h.01" />
        </svg>
      ), 
      app: 'v2rayNG', 
      url: 'https://play.google.com/store/apps/details?id=com.v2ray.ang',
      isMobile: true,
      steps: [
        'Скачайте v2rayNG из Google Play',
        'Нажмите "+" -> "Scan QR Code"',
        'Готово! Нажмите "Connect" внизу'
      ]
    },
    { 
      name: 'Windows', 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 5.5l7-1v7.5l-7 .5v-7zM11 4.5l10-1.5v9l-10 .5v-8zM3 13.5l7 .5v7.5l-7-1v-7zM11 14l10 .5v9l-10-1.5v-8z" />
        </svg>
      ), 
      app: 'v2rayN', 
      url: 'https://github.com/2dust/v2rayN/releases',
      isMobile: false,
      steps: [
        'Распакуйте архив v2rayN-Core.zip',
        'Servers -> Import bulk URL from clipboard',
        'Нажмите правой кнопкой -> Set as active'
      ]
    },
    { 
      name: 'macOS', 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20.94c1.88 0 3.05-.76 4.15-2.21a7.07 7.07 0 0 0 1.22-3.8c0-3.32-2.31-5.75-5.46-5.75-3.17 0-5.58 2.45-5.58 5.75 0 2.22.84 3.73 1.24 3.8.31.06 1.05-.18 1.48-.4a1.8 1.8 0 0 1 .94-.28c.6 0 1 .2 1.35.43.3.2.48.46.66.46z" />
          <path d="M12 9.17c0-2.32 1.94-4.17 4.17-4.17 0 1.63-1.34 2.97-2.97 2.97-.4 0-.8-.09-1.2-.27V9.17z" />
        </svg>
      ), 
      app: 'V2Box', 
      url: 'https://apps.apple.com/app/v2box-v2ray-client/id6446814690',
      isMobile: false,
      steps: [
        'Установите V2Box из App Store',
        'Configs -> "+" -> Import from Clipboard',
        'Нажмите "Home" и включите тумблер'
      ]
    },
  ];

  const current = platforms.find(p => p.name === selectedPlatform) || platforms[0];
  const qrUrl = vpnKey ? `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(vpnKey)}&margin=10` : '';

  return (
    <div className="w-full flex flex-col gap-6 animate-fadeIn pb-12">
      {/* 1. Платформа */}
      <Card
        id="step-platforms"
        title="1. Ваша платформа"
        description="Выберите устройство для получения персональной инструкции."
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-1">
          {platforms.map(p => (
            <button 
              key={p.name} 
              onClick={() => {
                setSelectedPlatform(p.name);
                setActiveStepIdx(0);
                setShowInStepQr(false);
              }}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 ${
                selectedPlatform === p.name 
                ? 'border-accent bg-accent/5 shadow-md scale-[1.02]' 
                : 'border-slate-100 bg-white hover:border-slate-200'
              }`}
            >
              <span className={`mb-3 transition-colors ${selectedPlatform === p.name ? 'text-accent' : 'text-slate-300'}`}>
                {p.icon}
              </span>
              <span className={`text-[11px] font-bold tracking-tight uppercase ${selectedPlatform === p.name ? 'text-accent' : 'text-slate-500'}`}>
                {p.name}
              </span>
            </button>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="step-download">
        {/* 2. Инструкция */}
        <Card
          title={`2. Настройка ${current.app}`}
          description={`Выполните 3 шага для запуска.`}
        >
          <div className="flex flex-col gap-4 py-2">
            {current.steps.map((step, idx) => (
              <div 
                key={idx} 
                className={`flex gap-4 items-start p-3 rounded-2xl transition-all border ${activeStepIdx === idx ? 'bg-slate-50 border-slate-200' : 'bg-transparent border-transparent'}`}
                onMouseEnter={() => setActiveStepIdx(idx)}
              >
                <div className={`flex-shrink-0 w-6 h-6 rounded-full text-[10px] font-black flex items-center justify-center transition-colors ${activeStepIdx === idx ? 'bg-accent text-white' : 'bg-slate-100 text-slate-400'}`}>
                  {idx + 1}
                </div>
                <p className={`text-xs leading-relaxed transition-colors ${activeStepIdx === idx ? 'text-dark font-medium' : 'text-slate-500'}`}>
                  {step}
                </p>
              </div>
            ))}
            
            <div className="pt-2 flex flex-col gap-2">
              <a href={current.url} target="_blank" rel="noopener noreferrer" className="block">
                <Button variant="secondary" size="sm" className="w-full gap-2">
                  <span>Скачать {current.app}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 21V3m0 18l-5-5m5 5l5-5"/></svg>
                </Button>
              </a>
              {current.isMobile && (
                <button 
                  onClick={() => setShowInStepQr(!showInStepQr)}
                  className="w-full py-2.5 rounded-xl border border-accent/20 bg-accent/5 text-accent text-[10px] font-bold uppercase tracking-widest hover:bg-accent/10 transition-colors flex items-center justify-center gap-2"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                  {showInStepQr ? 'Скрыть QR' : 'Показать QR для настройки'}
                </button>
              )}
            </div>

            {showInStepQr && (
              <div className="mt-2 p-4 bg-white rounded-2xl border border-slate-200 flex flex-col items-center animate-fadeIn shadow-inner">
                <img src={qrUrl} alt="QR" className="w-32 h-32" />
                <span className="text-[9px] text-slate-400 mt-2 uppercase font-bold text-center">Отсканируйте камерой внутри {current.app}</span>
              </div>
            )}
          </div>
        </Card>

        {/* 3. Анимированный симулятор */}
        <Card title="Интерактивный гид" description="Как это выглядит в приложении.">
          <div className="relative aspect-[4/3] bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-800 shadow-inner group">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
            
            {/* Phone/Laptop Frame */}
            <div className={`relative transition-all duration-700 ${current.isMobile ? 'w-24 h-44 border-[4px]' : 'w-48 h-32 border-[2px]'} bg-black rounded-[1.5rem] border-slate-700 shadow-2xl flex flex-col overflow-hidden`}>
              {/* Screen Content */}
              <div className="flex-1 p-2 flex flex-col gap-2 bg-slate-950">
                <div className="w-8 h-0.5 bg-slate-800 rounded-full mx-auto mt-0.5 mb-1"></div>
                
                {/* Simulated App UI */}
                <div className="flex justify-between items-center px-1">
                  <div className="h-2 w-8 bg-slate-800 rounded"></div>
                  <div className="h-3 w-3 bg-accent rounded-full animate-pulse"></div>
                </div>

                <div className="mt-2 space-y-1.5 px-1">
                  <div className="h-1.5 w-full bg-slate-800 rounded opacity-50"></div>
                  <div className="h-1.5 w-3/4 bg-slate-800 rounded opacity-50"></div>
                  <div className="h-1.5 w-full bg-slate-800 rounded opacity-50"></div>
                </div>

                {/* Animated action based on active step */}
                <div className="mt-auto mb-4 flex flex-col items-center">
                  {activeStepIdx === 0 && (
                    <div className="text-[6px] text-slate-400 animate-bounce uppercase font-bold tracking-tighter">Download...</div>
                  )}
                  {activeStepIdx === 1 && (
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center animate-pulse scale-110 shadow-lg shadow-accent/40">
                      <span className="text-white text-lg font-bold">+</span>
                    </div>
                  )}
                  {activeStepIdx === 2 && (
                    <div className="w-full flex flex-col items-center gap-1.5 animate-fadeIn">
                      <div className="w-12 h-12 border-2 border-accent border-dashed rounded-lg flex items-center justify-center overflow-hidden">
                         <div className="w-10 h-0.5 bg-accent/50 animate-[scan_2s_infinite]"></div>
                      </div>
                      <span className="text-[5px] text-accent font-bold uppercase">Scanning Key</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Float Overlay */}
            <div className="absolute top-4 right-4 bg-white/5 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{current.name} Mode</span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-white shadow-xl translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <div className="flex gap-3 items-center">
                <div className="w-8 h-8 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></svg>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-dark uppercase tracking-tight">Подсказка</div>
                  <div className="text-[9px] text-slate-500 leading-tight">Приложение запомнит ключ навсегда. Повторная настройка не потребуется.</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { transform: translateY(-15px); }
          50% { transform: translateY(15px); }
          100% { transform: translateY(-15px); }
        }
      `}} />
      
      {/* Final Step */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 flex items-center gap-5 shadow-sm hover:border-accent/10 transition-colors" id="step-final-tip">
        <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 flex-shrink-0">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <div>
          <h4 className="text-sm font-bold text-dark mb-1">Все готово к подключению</h4>
          <p className="text-[11px] text-slate-500 leading-relaxed max-w-sm">
            После импорта ключа просто нажмите центральную кнопку «Подключить». Теперь ваше соединение полностью зашифровано.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountSetup;
