import React from 'react';
import { FourPillarsResult } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import ZodiacSymbol from '@/components/ui/zodiac-symbol';

interface FourPillarsAnalysisProps {
  fourPillarsResult: FourPillarsResult;
}

export default function FourPillarsAnalysis({ fourPillarsResult }: FourPillarsAnalysisProps) {
  if (!fourPillarsResult) return null;
  
  // 五行の色設定
  const elementColors: Record<string, string> = {
    '木': 'bg-green-100 text-green-800',
    '火': 'bg-red-100 text-red-800',
    '土': 'bg-yellow-100 text-yellow-800',
    '金': 'bg-gray-100 text-gray-800',
    '水': 'bg-blue-100 text-blue-800'
  };
  
  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl lg:text-2xl bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          四柱推命分析
        </CardTitle>
        <CardDescription>
          あなたの誕生日時から導き出される五行バランスと運勢
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="text-center">
            <div className="text-xs text-gray-500">天干</div>
            <div className="text-xl font-bold">
              <ZodiacSymbol symbol={fourPillarsResult.heavenlyStem} size="md" />
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500">地支</div>
            <div className="text-xl font-bold">
              <ZodiacSymbol symbol={fourPillarsResult.earthlyBranch} size="md" />
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500">日主五行</div>
            <div className="text-xl font-bold">{fourPillarsResult.dayMaster}</div>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="mb-4">
          <h3 className="text-md font-semibold mb-2">あなたの相性の良い五行</h3>
          <div className="flex flex-wrap gap-2">
            {fourPillarsResult.luckyElements.map((element, index) => (
              <Badge key={index} variant="outline" className={elementColors[element] || ''}>
                {element}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className="text-md font-semibold mb-2">注意すべき五行</h3>
          <div className="flex flex-wrap gap-2">
            {fourPillarsResult.unluckyElements.map((element, index) => (
              <Badge key={index} variant="outline" className={elementColors[element] || ''}>
                {element}
              </Badge>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-md font-semibold mb-2">人生テーマ</h3>
          <p className="text-sm">{fourPillarsResult.lifeTheme}</p>
        </div>
      </CardContent>
    </Card>
  );
}