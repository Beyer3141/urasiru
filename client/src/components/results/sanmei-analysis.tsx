import React from 'react';
import ZodiacSymbol from '@/components/ui/zodiac-symbol';
import { SanmeiResult } from '@/lib/types';

interface SanmeiAnalysisProps {
  sanmeiResult: SanmeiResult;
  traits: string[];
}

const SanmeiAnalysis: React.FC<SanmeiAnalysisProps> = ({ sanmeiResult, traits }) => {
  const { element, polarity, fullType } = sanmeiResult;
  
  // Compatibility elements
  const compatibleElements = getCompatibleElements(element);
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="font-heading text-xl font-bold text-primary border-b border-gray-200 pb-3 mb-4">算命学分析</h3>
      
      <div className="mb-6">
        <div className="flex items-center mb-3">
          <ZodiacSymbol symbol={element} className="mr-2" />
          <h4 className="font-medium">{fullType}</h4>
        </div>
        <p className="text-sm">
          あなたの生年月日から、東洋の五行思想における「{element}」のエネルギーが強く、
          {polarity === '陰' ? '陰' : '陽'}の性質を持つことがわかります。これは自然の中の
          {getElementDescription(element)}のように、
          {polarity === '陰' ? '柔軟さと強さ' : '活発さと力強さ'}を兼ね備えた性質を表しています。
        </p>
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">先天的な性質：</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {traits.map((trait, index) => (
              <li key={index}>{trait}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">相性の良い要素：</h4>
          <div className="flex space-x-3 mt-2">
            {compatibleElements.good.map((el, index) => (
              <ZodiacSymbol key={index} symbol={el} size="sm" />
            ))}
            {compatibleElements.neutral.map((el, index) => (
              <ZodiacSymbol key={index} symbol={el} size="sm" className="opacity-70" />
            ))}
            {compatibleElements.poor.map((el, index) => (
              <ZodiacSymbol key={index} symbol={el} size="sm" className="opacity-50" />
            ))}
          </div>
          <p className="text-xs mt-2">
            「{compatibleElements.good.join('」と「')}」のエネルギーを持つ要素があなたを育み、
            同じ「{element}」のエネルギーと共鳴します。
            一方で「{compatibleElements.poor.join('」と「')}」のエネルギーは時にあなたの成長を抑制することがあります。
          </p>
        </div>
      </div>
    </div>
  );
};

// Helper function to get element description
function getElementDescription(element: string): string {
  switch (element) {
    case '木': return '樹木';
    case '火': return '炎';
    case '土': return '大地';
    case '金': return '金属';
    case '水': return '流水';
    default: return '自然要素';
  }
}

// Helper function to get compatible elements
function getCompatibleElements(element: string): { good: string[], neutral: string[], poor: string[] } {
  switch (element) {
    case '木':
      return { good: ['水'], neutral: ['木'], poor: ['金'] };
    case '火':
      return { good: ['木'], neutral: ['火'], poor: ['水'] };
    case '土':
      return { good: ['火'], neutral: ['土'], poor: ['木'] };
    case '金':
      return { good: ['土'], neutral: ['金'], poor: ['火'] };
    case '水':
      return { good: ['金'], neutral: ['水'], poor: ['土'] };
    default:
      return { good: [], neutral: [], poor: [] };
  }
}

export default SanmeiAnalysis;
