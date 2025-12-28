
import React, { useState } from 'react';
import Card from './Card';

interface BillingDay {
  date: string;
  amount: number;
  label: string;
}

const AccountBilling: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const billingData: BillingDay[] = [
    { date: '14 мая', amount: 99, label: 'Пн' },
    { date: '15 мая', amount: 0, label: 'Вт' },
    { date: '16 мая', amount: 149, label: 'Ср' },
    { date: '17 мая', amount: 249, label: 'Чт' },
    { date: '18 мая', amount: 99, label: 'Пт' },
    { date: '19 мая', amount: 0, label: 'Сб' },
    { date: '20 мая', amount: 199, label: 'Вс' },
  ];

  const maxAmount = Math.max(...billingData.map(d => d.amount), 300);
  const totalWeek = billingData.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="w-full flex flex-col gap-6 animate-fadeIn">
      {/* Сводка в два столбца */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm hover:border-accent/20 transition-colors">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Расход за неделю</p>
          <div className="flex items-baseline gap-2">
            <h4 className="text-3xl font-bold text-dark">{totalWeek} ₽</h4>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">+8%</span>
          </div>
        </div>
        <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-sm hover:border-accent/20 transition-colors">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Срок подписки</p>
          <div className="flex items-baseline gap-2">
            <h4 className="text-3xl font-bold text-dark">54</h4>
            <span className="text-xs font-bold text-slate-400 tracking-tight">дня осталось</span>
          </div>
        </div>
      </div>

      {/* Интерактивная диаграмма */}
      <Card
        title="История платежей"
        description="Активность ваших транзакций за последние 7 дней."
      >
        <div className="mt-8 mb-4 h-52 flex items-end justify-between gap-2 px-1 relative">
          {/* Сетка на фоне */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
            {[1, 2, 3, 4].map((_, i) => <div key={i} className="w-full border-t border-slate-100 h-px" />)}
            <div className="w-full border-b border-slate-200 h-px" />
          </div>

          {billingData.map((item, idx) => {
            const height = (item.amount / maxAmount) * 100;
            const isHovered = hoveredIdx === idx;
            
            return (
              <div 
                key={idx} 
                className="flex-1 flex flex-col items-center group cursor-pointer relative z-10"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Анимированный Tooltip */}
                <div className={`absolute -top-14 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-3 py-2 rounded-xl transition-all duration-300 pointer-events-none shadow-xl border border-white/10 ${isHovered ? 'opacity-100 -translate-y-2' : 'opacity-0 translate-y-0'}`}>
                  <div className="flex flex-col items-center">
                    <span>{item.amount} ₽</span>
                    <span className="text-[8px] opacity-60 font-medium">{item.date}</span>
                  </div>
                  <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45" />
                </div>

                <div className="w-full flex flex-col items-center">
                  <div 
                    className={`w-full max-w-[32px] rounded-t-xl transition-all duration-700 cubic-bezier(0.25, 0.46, 0.45, 0.94) ${
                      item.amount > 0 
                      ? 'bg-gradient-to-t from-accent to-orange-500 shadow-md shadow-accent/10' 
                      : 'bg-slate-100 border-x border-t border-slate-200/50'
                    } ${isHovered ? 'brightness-110 scale-x-110 shadow-lg' : ''}`}
                    style={{ height: `${Math.max(height, item.amount > 0 ? 12 : 6)}%` }}
                  >
                    {item.amount > 0 && isHovered && (
                      <div className="absolute top-0 left-0 w-full h-1/2 bg-white/20 blur-sm rounded-t-xl"></div>
                    )}
                  </div>
                  <span className={`mt-3 text-[10px] font-bold transition-colors uppercase tracking-widest ${isHovered ? 'text-accent' : 'text-slate-400'}`}>
                    {item.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Список последних транзакций */}
      <Card title="Детализация" description="Список ваших последних операций по счету.">
        <div className="divide-y divide-slate-100 mt-2">
          {[
            { date: '20 мая, 12:40', amount: 199, label: 'Пополнение • Карта Visa' },
            { date: '18 мая, 09:15', amount: 99, label: 'Продление • Telegram Pay' },
            { date: '14 мая, 21:05', amount: 99, label: 'Старт • Crypto (USDT)' },
          ].map((tx, i) => (
            <div key={i} className="py-5 flex items-center justify-between group transition-all">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-accent/5 group-hover:text-accent transition-colors border border-slate-100 group-hover:border-accent/10">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                  </svg>
                </div>
                <div>
                  <p className="text-[13px] font-bold text-dark group-hover:text-accent transition-colors">{tx.label}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide mt-0.5">{tx.date}</p>
                </div>
              </div>
              <p className="text-sm font-mono font-black text-dark">-{tx.amount} ₽</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AccountBilling;
