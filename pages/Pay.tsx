
import React from 'react';
import Card from '../components/Card';
import Button from '../components/ui/Button';

export default function Pay({ navigate }: { navigate: (p: string) => void }) {
  const plans = [
    { 
      name: '1 месяц', 
      price: '99 ₽', 
      desc: 'Базовый доступ для одного устройства', 
      accent: false 
    },
    { 
      name: '3 месяца', 
      price: '249 ₽', 
      desc: 'Оптимально для короткой поездки', 
      accent: false 
    },
    { 
      name: '6 месяцев', 
      price: '449 ₽', 
      desc: 'Все локации и высокая скорость', 
      accent: true, 
      badge: 'Популярный' 
    },
    { 
      name: '12 месяцев', 
      price: '799 ₽', 
      desc: 'Максимальная выгода и 5 устройств', 
      accent: false,
      badge: 'Выгодно'
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-5 py-12 page-transition">
      <header className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-3">Выберите тариф</h1>
        <p className="text-slate-500">Безлимитный интернет без границ на всех ваших устройствах</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {plans.map((plan) => (
          <div 
            key={plan.name} 
            className={`relative flex flex-col p-6 rounded-2xl border-2 transition-all duration-300 hover:translate-y-[-4px] ${
              plan.accent 
                ? 'border-accent bg-white shadow-xl scale-105 z-10' 
                : 'border-slate-100 bg-white/50 hover:border-slate-200 shadow-sm'
            }`}
          >
            {plan.badge && (
              <span className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full text-white ${
                plan.name === '12 месяцев' ? 'bg-green-600' : 'bg-accent'
              }`}>
                {plan.badge}
              </span>
            )}
            <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
            <p className="text-slate-400 text-[11px] mb-6 leading-tight min-h-[32px]">{plan.desc}</p>
            <div className="mb-8">
              <span className="text-2xl font-bold">{plan.price}</span>
              {plan.name !== '1 месяц' && (
                <div className="text-[10px] text-slate-400 font-medium mt-1">
                  ~ {Math.round(parseInt(plan.price.replace(' ', '')) / (parseInt(plan.name) || 1))} ₽ / мес
                </div>
              )}
            </div>
            <Button 
              variant={plan.accent ? 'primary' : 'outline'} 
              className="mt-auto w-full"
              onClick={() => navigate('/result')}
            >
              Подключить
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-16 p-8 rounded-3xl bg-white border border-slate-100 text-center shadow-sm">
        <h4 className="text-xs font-bold mb-6 uppercase tracking-widest text-slate-400">Наши доступные локации</h4>
        <div className="flex flex-wrap justify-center gap-6 text-3xl grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
          <span title="Нидерланды">🇳🇱</span> 
          <span title="Германия">🇩🇪</span> 
          <span title="США">🇺🇸</span> 
          <span title="Турция">🇹🇷</span> 
          <span title="Казахстан">🇰🇿</span> 
          <span title="ОАЭ">🇦🇪</span>
          <span title="Финляндия">🇫🇮</span>
        </div>
      </div>

      <div className="mt-8 text-center text-[11px] text-slate-400 max-w-lg mx-auto leading-relaxed">
        Оплачивая подписку, вы принимаете <button onClick={() => navigate('/docs/offer')} className="underline hover:text-dark">условия публичной оферты</button>. 
        Безопасность платежей гарантирована зашифрованным соединением.
      </div>
    </div>
  );
}
