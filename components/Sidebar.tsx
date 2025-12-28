
import React from 'react';
import Button from './ui/Button';

interface SidebarProps {
  activeTab: 'general' | 'billing' | 'setup';
  onTabChange: (tab: 'general' | 'billing' | 'setup') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="w-full md:w-48 flex flex-col items-start border-b border-slate-200 md:border-b-0 -mx-5 md:mx-0">
      <div className="w-full flex md:flex-col items-start gap-1 md:gap-1 md:sticky md:top-24 overflow-x-auto scrollbar-hide px-5 md:p-0">
        
        <Button 
          variant="nav"
          isActive={activeTab === 'setup'}
          onClick={() => onTabChange('setup')}
          leftIcon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
              <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
              <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
            </svg>
          }
        >
          Подключение
        </Button>

        <Button 
          variant="nav"
          isActive={activeTab === 'general'}
          onClick={() => onTabChange('general')}
          leftIcon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          }
        >
          Профиль
        </Button>
        
        <Button 
          variant="nav"
          isActive={activeTab === 'billing'}
          onClick={() => onTabChange('billing')}
          leftIcon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="14" rx="3" />
              <path d="M3 10h18" />
              <path d="M7 15h.01" />
            </svg>
          }
        >
          Биллинг
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
