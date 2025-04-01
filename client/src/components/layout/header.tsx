import React from 'react';
import { Sparkles, Compass } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm py-4 border-b border-primary/10">
      <div className="container mx-auto px-4 max-w-4xl flex flex-col sm:flex-row justify-between items-center gap-3">
        <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight">
          <span className="pastel-gradient bg-clip-text text-transparent flex items-center">
            <Compass className="h-6 w-6 mr-2 text-primary" />
            <span className="font-['Noto_Sans_JP',_sans-serif]">Urasiru</span>
          </span>
        </h1>
        <div className="font-['Noto_Sans_JP',_sans-serif] text-sm sm:text-base bg-gradient-to-r from-teal-50 to-blue-50 px-4 py-1.5 rounded-full text-gray-700 border border-teal-100/50 shadow-sm flex items-center">
          <Sparkles className="h-4 w-4 mr-1.5 text-blue-400" />
          ウラシル - パーソナリティ分析
        </div>
      </div>
    </header>
  );
};

export default Header;
