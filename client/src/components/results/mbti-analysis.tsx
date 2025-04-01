import React from 'react';
import { cn } from '@/lib/utils';
import { MbtiResult } from '@/lib/types';

interface MbtiAnalysisProps {
  mbtiResult: MbtiResult;
  traits: string[];
}

const MbtiAnalysis: React.FC<MbtiAnalysisProps> = ({ mbtiResult, traits }) => {
  const { type, ieScale, nsScale, ftScale, jpScale } = mbtiResult;
  
  // Calculate complementary percentages (e.g., if I is 75%, E is 25%)
  const eScale = 100 - ieScale;
  const sScale = 100 - nsScale;
  const tScale = 100 - ftScale;
  const pScale = 100 - jpScale;
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="font-heading text-xl font-bold text-primary border-b border-gray-200 pb-3 mb-4">MBTI分析</h3>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <span className="font-medium text-gray-700">内向型</span>
              <span className="text-sm ml-1">(I)</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm mr-1">(E)</span>
              <span className="font-medium text-gray-700">外向型</span>
            </div>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full" 
              style={{ width: `${ieScale}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span>{ieScale}%</span>
            <span>{eScale}%</span>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <span className="font-medium text-gray-700">直感型</span>
              <span className="text-sm ml-1">(N)</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm mr-1">(S)</span>
              <span className="font-medium text-gray-700">感覚型</span>
            </div>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full" 
              style={{ width: `${nsScale}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span>{nsScale}%</span>
            <span>{sScale}%</span>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <span className="font-medium text-gray-700">感情型</span>
              <span className="text-sm ml-1">(F)</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm mr-1">(T)</span>
              <span className="font-medium text-gray-700">思考型</span>
            </div>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full" 
              style={{ width: `${ftScale}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span>{ftScale}%</span>
            <span>{tScale}%</span>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <span className="font-medium text-gray-700">判断型</span>
              <span className="text-sm ml-1">(J)</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm mr-1">(P)</span>
              <span className="font-medium text-gray-700">知覚型</span>
            </div>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full" 
              style={{ width: `${jpScale}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span>{jpScale}%</span>
            <span>{pScale}%</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-sm">
        <h4 className="font-medium mb-2">{type}の特徴：</h4>
        <ul className="list-disc pl-5 space-y-1">
          {traits.map((trait, index) => (
            <li key={index}>{trait}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MbtiAnalysis;
