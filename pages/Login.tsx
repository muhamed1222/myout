
import React from 'react';
import Button from '../components/ui/Button';

export default function Login({ navigate }: { navigate: (p: string) => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-5 text-center">
      <div className="mb-8">
        <svg width="64" height="64" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent mx-auto">
          <path d="M16 3C27 3 31 10 31 16C31 22 27 29 16 29C5 29 1 22 1 16C1 10 5 3 16 3ZM15 9C11.134 9 8 12.134 8 16C8 19.866 11.134 23 15 23H17C20.866 23 24 19.866 24 16C24 12.134 20.866 9 17 9H15Z" fill="currentColor"></path>
        </svg>
      </div>
      <h1 className="text-3xl font-bold mb-3">Добро пожаловать</h1>
      <p className="text-slate-500 max-w-xs mb-10">Используйте Telegram для быстрого и безопасного входа в систему</p>
      
      <Button 
        variant="secondary" 
        size="lg" 
        onClick={() => navigate('/account')}
        leftIcon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.36-.49.99-.74 3.84-1.67 6.41-2.77 7.7-3.3 3.65-1.53 4.42-1.8 4.92-1.8.11 0 .35.03.5.16.13.11.17.26.18.37 0 .07-.01.16-.02.26z"/>
          </svg>
        }
      >
        Войти через Telegram
      </Button>
    </div>
  );
}
