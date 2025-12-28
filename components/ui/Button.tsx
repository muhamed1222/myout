
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'nav' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isActive?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isActive = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none disabled:cursor-not-allowed active:scale-[0.98]";
  
  const variants = {
    primary: "bg-accent text-white hover:brightness-110 disabled:bg-slate-300 disabled:text-white shadow-sm rounded-full",
    secondary: "bg-dark text-white hover:opacity-90 rounded-full",
    outline: "bg-transparent border border-slate-300 text-slate-700 hover:border-dark hover:text-dark rounded-full",
    danger: "bg-red-50 text-red-600 border border-red-100 hover:bg-red-600 hover:text-white shadow-sm rounded-full",
    ghost: "bg-transparent text-slate-500 hover:bg-slate-100 hover:text-dark rounded-full",
    nav: `w-full justify-start gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
      isActive ? 'bg-white text-dark shadow-sm border border-slate-200' : 'text-slate-400 hover:text-dark hover:bg-slate-100/50'
    }`
  };

  const sizes = {
    sm: "px-4 py-1.5 text-[11px] uppercase tracking-wider",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base"
  };

  const sizeClass = variant === 'nav' ? "" : sizes[size];

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizeClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      <span className="truncate">{children}</span>
      {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </button>
  );
};

export default Button;
