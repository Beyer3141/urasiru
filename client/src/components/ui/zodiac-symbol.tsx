import React from 'react';
import { cn } from '@/lib/utils';

interface ZodiacSymbolProps {
  symbol: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ZodiacSymbol: React.FC<ZodiacSymbolProps> = ({ 
  symbol, 
  size = 'md',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-base',
    md: 'w-10 h-10 text-lg',
    lg: 'w-12 h-12 text-xl'
  };

  return (
    <div className={cn(
      "zodiac-symbol flex items-center justify-center rounded-full bg-gradient-to-r from-[rgba(93,63,211,0.1)] to-[rgba(212,175,55,0.1)] text-primary",
      sizeClasses[size],
      className
    )}>
      {symbol}
    </div>
  );
};

export default ZodiacSymbol;
