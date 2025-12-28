
import React from 'react';

interface CardProps {
  // Added optional id prop for onboarding and targeting
  id?: string;
  title: string;
  description: string;
  children?: React.ReactNode;
  footerLeft?: string;
  footerAction?: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ id, title, description, children, footerLeft, footerAction, className = '' }) => {
  return (
    <div id={id} className={`w-full bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden ${className}`}>
      <div className="px-5 py-5 flex flex-col gap-1">
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
      </div>
      
      {children && (
        <div className="px-5 pb-5">
          {children}
        </div>
      )}

      {(footerLeft || footerAction) && (
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <p className="text-xs text-slate-400 font-medium">{footerLeft}</p>
          <div>{footerAction}</div>
        </div>
      )}
    </div>
  );
};

export default Card;
