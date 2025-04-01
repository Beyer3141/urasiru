import React from 'react';

interface IntegratedAnalysisProps {
  strengths: string;
  challenges: string;
  relationships: string;
  career: string;
}

const IntegratedAnalysis: React.FC<IntegratedAnalysisProps> = ({
  strengths,
  challenges,
  relationships,
  career
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-6">
      <h3 className="font-heading text-xl font-bold text-primary border-b border-gray-200 pb-3 mb-4">統合分析</h3>
      
      <div className="space-y-5">
        <div>
          <h4 className="font-medium text-lg mb-2">強み</h4>
          <p>{strengths}</p>
        </div>
        
        <div>
          <h4 className="font-medium text-lg mb-2">課題と成長機会</h4>
          <p>{challenges}</p>
        </div>
        
        <div>
          <h4 className="font-medium text-lg mb-2">対人関係</h4>
          <p>{relationships}</p>
        </div>
        
        <div>
          <h4 className="font-medium text-lg mb-2">キャリアと適性</h4>
          <p>{career}</p>
        </div>
      </div>
    </div>
  );
};

export default IntegratedAnalysis;
