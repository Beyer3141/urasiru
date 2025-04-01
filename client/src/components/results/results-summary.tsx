import React from 'react';

interface ResultsSummaryProps {
  overview: string;
}

const ResultsSummary: React.FC<ResultsSummaryProps> = ({ overview }) => {
  // Split the overview into paragraphs if it contains newlines
  const paragraphs = overview.split('\n\n').filter(Boolean);
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-6">
      <h3 className="font-heading text-xl font-bold text-primary border-b border-gray-200 pb-3 mb-4">性格概要</h3>
      
      <div className="prose max-w-none">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="mb-4">{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default ResultsSummary;
