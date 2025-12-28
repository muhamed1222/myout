
import React from 'react';
import Card from '../components/Card';
import Button from '../components/ui/Button';

export default function Support({ navigate }: { navigate: (p: string) => void }) {
  return (
    <div className="max-w-2xl mx-auto px-5 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Поддержка</h1>
      <div className="grid gap-6">
        <Card title="Связаться в Telegram" description="Самый быстрый способ получить ответ на любой вопрос.">
          <Button variant="secondary" className="w-full" leftIcon={<span>@</span>}>
            @visitors_support
          </Button>
        </Card>
        
        <Card title="Электронная почта" description="Для официальных запросов и предложений о сотрудничестве.">
          <p className="text-sm font-semibold text-accent">support@visitors.io</p>
        </Card>

        <Card title="База знаний" description="Ответы на часто задаваемые вопросы.">
          <ul className="text-sm text-slate-600 space-y-3">
            <li className="flex gap-2"><span>•</span> Как отменить подписку?</li>
            <li className="flex gap-2"><span>•</span> Какие способы оплаты доступны?</li>
            <li className="flex gap-2"><span>•</span> Можно ли вернуть деньги?</li>
          </ul>
        </Card>
      </div>
      <div className="mt-8 text-center">
        <Button variant="ghost" onClick={() => navigate('/account')}>Назад в кабинет</Button>
      </div>
    </div>
  );
}
