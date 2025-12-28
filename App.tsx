
import React, { useState, createContext, useContext } from 'react';
import Header from './components/Header';
import Login from './pages/Login';
import Account from './pages/Account';
import Pay from './pages/Pay';
import Result from './pages/Result';
import Support from './pages/Support';
import Docs from './pages/Docs';

// Simple Toast Context for feedback
const ToastContext = createContext({ showToast: (msg: string) => {} });
export const useToast = () => useContext(ToastContext);

const App: React.FC = () => {
  const [path, setPath] = useState('/login');
  const [toast, setToast] = useState<string | null>(null);

  const navigate = (newPath: string) => {
    setPath(newPath);
    window.scrollTo(0, 0);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const renderPage = () => {
    if (path === '/' || path === '/login') return <Login navigate={navigate} />;
    if (path === '/account') return <Account navigate={navigate} />;
    if (path === '/pay') return <Pay navigate={navigate} />;
    if (path === '/result') return <Result navigate={navigate} />;
    if (path === '/support') return <Support navigate={navigate} />;
    if (path.startsWith('/docs/')) return <Docs type={path.split('/').pop() || 'offer'} navigate={navigate} />;
    return <Account navigate={navigate} />;
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <div className="flex flex-col min-h-screen w-full overflow-x-hidden bg-cream text-dark antialiased tracking-tight">
        <Header navigate={navigate} currentPath={path} />
        <main className="flex-1 mt-16">
          {renderPage()}
        </main>
        
        {/* Notification Toast */}
        {toast && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-dark text-white text-xs font-bold px-4 py-2 rounded-full shadow-2xl animate-fadeIn border border-white/10">
            {toast}
          </div>
        )}

        {path !== '/' && path !== '/login' && (
          <footer className="max-w-3xl mx-auto w-full px-5 py-8 border-t border-slate-200 flex flex-wrap gap-6 text-xs text-slate-400">
            <button onClick={() => navigate('/docs/offer')} className="hover:text-dark">Оферта</button>
            <button onClick={() => navigate('/docs/privacy')} className="hover:text-dark">Политика конфиденциальности</button>
            <button onClick={() => navigate('/support')} className="hover:text-dark">Поддержка</button>
            <p className="ml-auto">© 2024 Visitors VPN</p>
          </footer>
        )}
      </div>
    </ToastContext.Provider>
  );
};

export default App;
