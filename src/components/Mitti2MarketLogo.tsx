import React from 'react';

interface LogoProps {
  variant?: 'full' | 'horizontal' | 'emblem' | 'compact';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showTagline?: boolean;
}

export const Mitti2MarketLogo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  className = '',
  showTagline = true,
}) => {
  if (variant === 'emblem') {
    const sizeClasses = {
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-16 h-16',
      xl: 'w-24 h-24',
    }[size];

    return (
      <div className={`relative inline-flex items-center justify-center shrink-0 ${sizeClasses} ${className}`}>
        <img
          src="/logo.svg"
          alt="MITTI2MARKET"
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-2.5 ${className}`}>
        <div className="w-8 h-8 shrink-0 overflow-hidden rounded-lg bg-emerald-50/50 p-0.5 border border-emerald-100 flex items-center justify-center">
          <img src="/logo.svg" alt="MITTI2MARKET" className="w-full h-full object-contain" />
        </div>
        <div className="flex items-baseline">
          <span className="font-display font-extrabold text-lg text-emerald-950 tracking-tight">Mitti</span>
          <span className="font-display font-extrabold text-xl text-amber-500 mx-0.5 leading-none">2</span>
          <span className="font-display font-extrabold text-lg text-emerald-900 tracking-tight">Market</span>
        </div>
      </div>
    );
  }

  if (variant === 'horizontal') {
    const heightMap = {
      sm: 'h-8',
      md: 'h-10',
      lg: 'h-12',
      xl: 'h-16',
    }[size];

    return (
      <div className={`inline-flex items-center gap-3 ${className}`}>
        <div className={`${heightMap} aspect-square shrink-0 overflow-hidden rounded-xl bg-forest-50/80 p-1 border border-forest-100 flex items-center justify-center shadow-xs`}>
          <img src="/logo.svg" alt="MITTI2MARKET Emblem" className="w-full h-full object-contain" />
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex items-baseline leading-none">
            <span className="font-display font-black text-xl text-forest-900 tracking-tight">Mitti</span>
            <span className="font-display font-black text-2xl text-amber-500 mx-0.5 leading-none">2</span>
            <span className="font-display font-black text-xl text-forest-800 tracking-tight">Market</span>
          </div>
          {showTagline && (
            <span className="text-[10px] font-semibold tracking-wider text-forest-700/80 uppercase mt-0.5 whitespace-nowrap">
              Better Price • Higher Margin
            </span>
          )}
        </div>
      </div>
    );
  }

  // Full variant (vertical / centered)
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <div className="w-24 h-24 mb-3 overflow-hidden rounded-2xl bg-forest-50 p-2 border border-forest-100/80 shadow-sm flex items-center justify-center">
        <img src="/logo.svg" alt="MITTI2MARKET Logo" className="w-full h-full object-contain" />
      </div>
      <div className="flex items-baseline leading-none">
        <span className="font-display font-black text-2xl text-forest-900 tracking-tight">Mitti</span>
        <span className="font-display font-black text-3xl text-amber-500 mx-0.5 leading-none">2</span>
        <span className="font-display font-black text-2xl text-forest-800 tracking-tight">Market</span>
      </div>
      {showTagline && (
        <p className="text-xs font-semibold tracking-wide text-forest-700/80 mt-1">
          Better Price • Higher Margin • Prosperous Farmers
        </p>
      )}
    </div>
  );
};
