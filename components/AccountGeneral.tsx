
import React, { useState } from 'react';
import Card from './Card';
import Button from './ui/Button';
import { useToast } from '../App';

const AccountGeneral: React.FC = () => {
  const { showToast } = useToast();
  const [isCopied, setIsCopied] = useState(false);
  const accountId = "usr_8291047291";

  const handleCopy = () => {
    if (isCopied) return;
    
    navigator.clipboard.writeText(accountId);
    showToast("ID аккаунта скопирован");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-fadeIn">
      {/* Name Card */}
      <Card
        title="Личные данные"
        description="Ваше имя будет отображаться в профиле и отчетах."
        footerLeft="Максимум 32 символа"
        footerAction={
          <Button variant="outline" size="sm">
            Изменить
          </Button>
        }
      >
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Публичное имя</label>
          <div className="flex items-center h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 font-medium">
            Muhamed Chalemat
          </div>
        </div>
      </Card>

      {/* Profile ID Card */}
      <Card
        title="Идентификатор"
        description="Ваш уникальный ID в системе Visitors."
      >
        <div className="flex flex-col gap-2">
          <label className={`text-[11px] font-bold uppercase tracking-wider transition-colors duration-300 ${isCopied ? 'text-green-600' : 'text-slate-400'}`}>
            {isCopied ? 'Скопировано в буфер!' : 'Account ID'}
          </label>
          
          <div 
            onClick={handleCopy}
            className={`group relative flex items-center justify-between h-12 px-4 rounded-xl border transition-all duration-300 cursor-pointer ${
              isCopied 
                ? 'bg-green-50/50 border-green-500 ring-4 ring-green-500/10' 
                : 'bg-slate-50 border-slate-200 hover:border-slate-300'
            }`}
          >
            <span className={`font-mono text-xs transition-colors ${isCopied ? 'text-green-700' : 'text-slate-500'}`}>
              {accountId}
            </span>
            
            <button 
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-tight transition-all duration-300 transform ${
                isCopied 
                  ? 'bg-green-500 text-white scale-105 shadow-lg shadow-green-500/20' 
                  : 'text-accent hover:bg-accent/5'
              }`}
            >
              {isCopied ? (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="animate-in zoom-in duration-300">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Готово</span>
                </>
              ) : (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-60 group-hover:opacity-100 transition-opacity">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  <span>Копировать</span>
                </>
              )}
            </button>
            
            {/* Subtle glow effect on click */}
            {isCopied && (
              <div className="absolute inset-0 rounded-xl bg-green-500/5 animate-pulse pointer-events-none"></div>
            )}
          </div>
          <p className="text-[10px] text-slate-400 mt-1 italic">Нажмите на поле, чтобы быстро скопировать идентификатор.</p>
        </div>
      </Card>

      {/* Delete Account Card */}
      <Card
        title="Удаление аккаунта"
        description="Безвозвратное удаление вашего профиля и всех связанных данных. Это действие нельзя отменить."
        footerLeft="Действуйте с осторожностью"
        footerAction={
          <Button variant="danger" size="sm">
            Удалить
          </Button>
        }
      >
        {/* Content empty to keep it clean */}
      </Card>
    </div>
  );
};

export default AccountGeneral;
