import React from 'react';
import { Button } from '@/components/ui/button';

interface AdditionalInsightsProps {
  balance: {
    energyManagement: string;
    perfectionism: string;
  };
  relationshipTips: {
    boundaries: string;
    expression: string;
    compatibility: string;
  };
  futureOutlook: string;
  onRestart: () => void;
}

const AdditionalInsights: React.FC<AdditionalInsightsProps> = ({
  balance,
  relationshipTips,
  futureOutlook,
  onRestart
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
      <h3 className="font-heading text-xl font-bold text-primary border-b border-gray-200 pb-3 mb-4">洞察と生活のヒント</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="font-medium text-lg mb-3">バランスを保つために</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium mb-2">エネルギー管理</p>
              <p className="text-sm">
                {balance.energyManagement}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium mb-2">完璧主義との付き合い方</p>
              <p className="text-sm">
                {balance.perfectionism}
              </p>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-lg mb-3">人間関係を豊かにするために</h4>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <span className="font-medium">境界線を設ける：</span>
              {relationshipTips.boundaries}
            </li>
            <li>
              <span className="font-medium">考えを表現する：</span>
              {relationshipTips.expression}
            </li>
            <li>
              <span className="font-medium">相性の良い関係を育てる：</span>
              {relationshipTips.compatibility}
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium text-lg mb-3">未来への展望</h4>
          <p>
            {futureOutlook}
          </p>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Button 
          onClick={onRestart}
          variant="outline"
          className="px-6 py-2 border border-primary text-primary font-medium rounded-full hover:bg-primary hover:text-white transition-all"
        >
          もう一度診断する
        </Button>
      </div>
    </div>
  );
};

export default AdditionalInsights;
