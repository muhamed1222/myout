
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import AccountGeneral from '../components/AccountGeneral';
import AccountBilling from '../components/AccountBilling';
import AccountSetup from '../components/AccountSetup';
import Card from '../components/Card';
import Button from '../components/ui/Button';
import { useToast } from '../App';

const OnboardingStep = ({ step, onNext, onSkip, targetId }: { step: number, onNext: () => void, onSkip: () => void, targetId: string }) => {
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0, height: 0 });

  useEffect(() => {
    const updateCoords = () => {
      const el = document.getElementById(targetId);
      if (el) {
        const rect = el.getBoundingClientRect();
        setCoords({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height
        });
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };

    updateCoords();
    window.addEventListener('resize', updateCoords);
    return () => window.removeEventListener('resize', updateCoords);
  }, [targetId, step]);

  const stepsContent = [
    { title: "Статус подписки", text: "Здесь отображается срок действия вашего VPN и текущее состояние серверов.", button: "Понятно" },
    { title: "Ваш ключ доступа", text: "Этот секретный код — ваш пропуск в интернет. Скопируйте его или используйте QR-код.", button: "Где взять приложение?" },
    { title: "Выбор платформы", text: "Выберите ваше устройство (iOS, Android и др.), чтобы получить индивидуальную инструкцию.", button: "А дальше?" },
    { title: "Установка клиента", text: "Скачайте и установите приложение по прямой ссылке для вашей системы.", button: "Почти всё" },
    { title: "Готово к работе!", text: "После настройки просто нажмите кнопку «Подключить» в приложении. Приятного пользования!", button: "Завершить" }
  ];

  const content = stepsContent[step - 1];

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      <div className="absolute inset-0 bg-dark/40 backdrop-blur-[2px] pointer-events-auto" onClick={onSkip} style={{
        clipPath: `polygon(0% 0%, 0% 100%, ${coords.left - 8}px 100%, ${coords.left - 8}px ${coords.top - 8}px, ${coords.left + coords.width + 8}px ${coords.top - 8}px, ${coords.left + coords.width + 8}px ${coords.top + coords.height + 8}px, ${coords.left - 8}px ${coords.top + coords.height + 8}px, ${coords.left - 8}px 100%, 100% 100%, 100% 0%)`
      }}></div>

      <div 
        className="absolute z-[101] pointer-events-auto w-[280px] transition-all duration-500 ease-in-out"
        style={{ 
          top: coords.top + coords.height + 20, 
          left: Math.min(Math.max(20, coords.left + coords.width / 2 - 140), window.innerWidth - 300)
        }}
      >
        <div className="bg-white rounded-2xl p-5 shadow-2xl border border-slate-100 animate-fadeIn relative">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-slate-100 rotate-45"></div>
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Шаг {step} из 5</span>
            <button onClick={onSkip} className="text-slate-400 hover:text-dark transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <h4 className="text-sm font-bold text-dark mb-1">{content.title}</h4>
          <p className="text-xs text-slate-500 leading-relaxed mb-4">{content.text}</p>
          <Button variant="primary" size="sm" className="w-full" onClick={onNext}>{content.button}</Button>
        </div>
      </div>
    </div>
  );
};

export default function Account({ navigate }: { navigate: (p: string) => void }) {
  const [activeTab, setActiveTab] = useState<'general' | 'setup' | 'billing'>('setup');
  const [isKeyVisible, setIsKeyVisible] = useState(false);
  const [isQrVisible, setIsQrVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [guideStep, setGuideStep] = useState<number | null>(null);
  const { showToast } = useToast();
  
  const vpnKey = "vless://8291047291-uuid-example@proxy.visitors.io:443?security=reality&sni=google.com&fp=chrome&type=grpc&serviceName=grpc#Visitors_Premium";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(vpnKey);
    showToast("Ключ скопирован");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const nextStep = () => {
    if (guideStep !== null && guideStep < 5) setGuideStep(guideStep + 1);
    else setGuideStep(null);
  };

  const startGuide = () => { setActiveTab('setup'); setGuideStep(1); };

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(vpnKey)}&margin=20&bgcolor=ffffff&color=0a0a0a`;

  const getTargetId = () => {
    switch(guideStep) {
      case 1: return "step-status-card";
      case 2: return "step-vpn-key";
      case 3: return "step-platforms";
      case 4: return "step-download";
      case 5: return "step-final-tip";
      default: return "";
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 w-full pt-8 md:pt-12 pb-24 px-5 page-transition">
      <Sidebar activeTab={activeTab} onTabChange={(tab: any) => setActiveTab(tab)} />
      
      <div className="flex-1 flex flex-col gap-8">
        <div className="flex justify-between items-center mb-[-20px]">
          <h2 className="text-xl font-bold text-dark tracking-tight">Кабинет</h2>
          <button onClick={startGuide} className="text-[10px] font-bold text-accent uppercase tracking-widest flex items-center gap-1.5 hover:opacity-70 transition-opacity">
            <span className="w-5 h-5 rounded-full border border-accent flex items-center justify-center text-[10px]">?</span>
            Инструкции
          </button>
        </div>

        <Card 
          id="step-status-card"
          title="Ваше подключение" 
          description="Используйте ключ доступа ниже для настройки VPN."
          footerLeft="Тариф: Premium (до 12.07.24)"
          footerAction={
            <Button variant="primary" size="sm" onClick={() => navigate('/pay')}>Продлить</Button>
          }
        >
          <div className="py-2" id="step-vpn-key">
            <div className="flex flex-col gap-3">
              <div className="relative group">
                <div className={`flex items-center min-h-[52px] gap-2 pl-4 pr-36 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-[11px] transition-all overflow-hidden ${isKeyVisible ? 'text-dark' : 'text-slate-300 blur-[2px] select-none'}`}>
                  {isKeyVisible ? vpnKey : 'vless://' + '•'.repeat(42)}
                </div>
                
                {/* Группировка кнопок (Toolbox) - Hugeicons Style */}
                <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 bg-slate-50/95 backdrop-blur-md px-1.5 py-1.5 rounded-xl border border-white shadow-sm">
                  {/* Toggle QR */}
                  <button 
                    onClick={() => setIsQrVisible(!isQrVisible)}
                    className={`p-2 transition-all active:scale-90 rounded-lg ${isQrVisible ? 'text-accent bg-accent/10' : 'text-slate-400 hover:text-dark hover:bg-slate-100'}`}
                    title="QR-код"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="14" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" />
                    </svg>
                  </button>

                  {/* Toggle Visibility */}
                  <button 
                    onClick={() => setIsKeyVisible(!isKeyVisible)}
                    className={`p-2 transition-all active:scale-90 rounded-lg ${isKeyVisible ? 'text-accent bg-accent/10' : 'text-slate-400 hover:text-dark hover:bg-slate-100'}`}
                    title="Показать/скрыть"
                  >
                    {isKeyVisible ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.12 13.12 0 0 1-1.5 2" />
                        <path d="M6.71 7.39a2 2 0 0 0-2.32 2.32" />
                        <path d="M2 12s3-7 10-7a13.12 13.12 0 0 1 1.5.08" />
                        <path d="M14.29 16.61a2 2 0 0 1 2.32-2.32" />
                        <path d="M22 12s-3 7-10 7a13.12 13.12 0 0 1-1.5-.08" />
                        <line x1="2" y1="2" x2="22" y2="22" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>

                  <div className="w-px h-5 bg-slate-200 mx-1"></div>

                  {/* Copy */}
                  <button 
                    onClick={copyToClipboard}
                    className={`p-2 transition-all active:scale-90 rounded-lg ${isCopied ? 'bg-green-500 text-white' : 'text-slate-400 hover:text-dark hover:bg-slate-100'}`}
                    title="Копировать"
                  >
                    {isCopied ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* QR Code Reveal Section */}
              {isQrVisible && (
                <div className="mt-2 p-8 bg-slate-900 rounded-3xl animate-fadeIn relative overflow-hidden shadow-2xl flex flex-col items-center">
                  <div className="absolute top-0 left-0 w-full h-1 bg-accent/40"></div>
                  <div className="bg-white p-4 rounded-2xl shadow-xl transition-transform hover:scale-[1.02]">
                    <img src={qrCodeUrl} alt="QR" className="w-44 h-44 md:w-52 md:h-52" />
                  </div>
                  <div className="mt-6 text-center">
                    <p className="text-white text-sm font-bold tracking-tight">Отсканируйте камерой</p>
                    <p className="text-slate-400 text-[10px] mt-1 max-w-[220px]">Откройте VPN-клиент и используйте QR для импорта ключа.</p>
                  </div>
                  <button 
                    onClick={() => setIsQrVisible(false)}
                    className="mt-6 px-4 py-1.5 bg-white/5 hover:bg-white/10 text-[10px] font-bold text-slate-300 uppercase tracking-widest rounded-full transition-colors"
                  >
                    Скрыть
                  </button>
                </div>
              )}
            </div>
            
            <div className="mt-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Безопасное соединение • Активно</span>
            </div>
          </div>
        </Card>

        <div className="page-transition" key={activeTab}>
          {activeTab === 'setup' && <AccountSetup vpnKey={vpnKey} />}
          {activeTab === 'general' && <AccountGeneral />}
          {activeTab === 'billing' && <AccountBilling />}
        </div>
      </div>

      {guideStep !== null && (
        <OnboardingStep step={guideStep} onNext={nextStep} onSkip={() => setGuideStep(null)} targetId={getTargetId()} />
      )}
    </div>
  );
}
