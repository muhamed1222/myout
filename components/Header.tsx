
import React from 'react';
import Button from './ui/Button';

export default function Header({ navigate, currentPath }: { navigate: (p: string) => void, currentPath: string }) {
  const isAuth = currentPath !== '/' && currentPath !== '/login';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-lg border-b border-slate-200/50">
      <div className="max-w-3xl mx-auto px-5 flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(isAuth ? '/account' : '/')} className="flex items-center transition-opacity hover:opacity-80">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent">
              <path d="M16 3C27 3 31 10 31 16C31 22 27 29 16 29C5 29 1 22 1 16C1 10 5 3 16 3ZM15 9C11.134 9 8 12.134 8 16C8 19.866 11.134 23 15 23H17C20.866 23 24 19.866 24 16C24 12.134 20.866 9 17 9H15Z" fill="currentColor"></path>
            </svg>
          </button>
        </div>

        {isAuth && (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate('/support')} className="hidden sm:inline-flex">Поддержка</Button>
            <Button 
              variant="ghost" 
              className="!p-0 w-8 h-8 !rounded-full overflow-hidden border border-slate-200"
              onClick={() => navigate('/account')}
            >
              <img src="https://picsum.photos/seed/user/100/100" alt="profile" className="w-full h-full object-cover" />
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
