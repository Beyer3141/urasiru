import React from 'react';
import ZodiacSymbol from '@/components/ui/zodiac-symbol';

interface ResultsHeaderProps {
  name: string;
  mbtiType: string;
  sanmeiType: string;
  typeNickname: string;
}

const ResultsHeader: React.FC<ResultsHeaderProps> = ({
  name,
  mbtiType,
  sanmeiType,
  typeNickname
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-6 text-center">
      <div className="flex justify-center mb-4">
        <ZodiacSymbol symbol="✧" size="lg" />
      </div>
      <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary">
        {name}さんの診断結果
      </h2>
      <div className="flex justify-center items-center space-x-2 mt-4">
        <div className="px-4 py-2 bg-primary text-white font-accent rounded-lg">{mbtiType}</div>
        <div className="px-4 py-2 bg-[#D4AF37] text-white font-accent rounded-lg">{sanmeiType}</div>
      </div>
      <p className="mt-4 text-gray-600">{typeNickname}</p>
    </div>
  );
};

export default ResultsHeader;
