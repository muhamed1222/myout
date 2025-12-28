
import React from 'react';
import Button from '../components/ui/Button';

export default function Docs({ type, navigate }: { type: string, navigate: (p: string) => void }) {
  const isOffer = type === 'offer';
  
  return (
    <div className="max-w-2xl mx-auto px-5 py-12">
      <div className="mb-8">
        <Button variant="ghost" size="sm" onClick={() => navigate('/pay')} leftIcon={<span>←</span>}>
          Назад
        </Button>
      </div>
      <article className="prose prose-slate">
        <h1 className="text-2xl font-bold mb-6">
          {isOffer ? 'Публичная оферта' : 'Политика конфиденциальности'}
        </h1>
        <div className="text-sm text-slate-600 leading-relaxed space-y-4">
          <p className="font-bold">Последнее обновление: 24 мая 2024 г.</p>
          <p>
            Настоящий документ является официальным предложением (Публичной офертой) и содержит все существенные условия предоставления доступа к сервису Visitors.
          </p>
          <h2 className="text-lg font-bold text-dark mt-8">1. Общие положения</h2>
          <p>
            Используя данный сервис, вы подтверждаете свое согласие с условиями данного соглашения. Если вы не согласны с каким-либо пунктом, просим вас прекратить использование сервиса.
          </p>
          <h2 className="text-lg font-bold text-dark mt-8">2. Персональные данные</h2>
          <p>
            Мы собираем только минимально необходимый набор данных для обеспечения работы авторизации через Telegram и проведения платежей. Мы не передаем ваши данные третьим лицам, кроме случаев, предусмотренных законом.
          </p>
          <p>
            [Тут будет полный юридический текст документа...]
          </p>
        </div>
      </article>
    </div>
  );
}
