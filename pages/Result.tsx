
import React from 'react';
import Button from '../components/ui/Button';

export default function Result({ navigate }: { navigate: (p: string) => void }) {
  return (
    <div className="max-w-md mx-auto px-5 py-24 text-center">
      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
        <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold mb-4 tracking-tight">Доступ активирован</h1>
      <p className="text-slate-500 mb-10 leading-relaxed">
        Ваш ключ доступа готов. Теперь вы можете настроить соединение на своих устройствах в разделе «Подключение».
      </p>
      <div className="flex flex-col gap-3">
        <Button onClick={() => navigate('/account')} size="lg" className="shadow-lg shadow-accent/20">Получить ключ</Button>
        <Button variant="ghost" onClick={() => navigate('/support')}>Как настроить?</Button>
      </div>
    </div>
  );
}
