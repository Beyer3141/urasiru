import React from 'react';
import { SeiMeiResult } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface SeiMeiAnalysisProps {
  seiMeiResult: SeiMeiResult;
}

export default function SeiMeiAnalysis({ seiMeiResult }: SeiMeiAnalysisProps) {
  if (!seiMeiResult) return null;
  
  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl lg:text-2xl bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
          姓名判断分析
        </CardTitle>
        <CardDescription>
          あなたの名前の画数に基づく性格特性と運勢
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="border rounded-lg p-3 text-center">
            <div className="text-sm text-gray-500">天格</div>
            <div className="text-2xl font-bold">{seiMeiResult.heavenNumber}</div>
            <div className="text-xs">姓の総画数</div>
          </div>
          <div className="border rounded-lg p-3 text-center">
            <div className="text-sm text-gray-500">人格</div>
            <div className="text-2xl font-bold">{seiMeiResult.humanNumber}</div>
            <div className="text-xs">姓の最後の字画数+名の最初の字画数</div>
          </div>
          <div className="border rounded-lg p-3 text-center">
            <div className="text-sm text-gray-500">地格</div>
            <div className="text-2xl font-bold">{seiMeiResult.earthNumber}</div>
            <div className="text-xs">名の総画数</div>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="mb-4">
          <h3 className="text-md font-semibold mb-2">特性</h3>
          <ul className="list-disc list-inside space-y-1">
            {seiMeiResult.characteristics.map((trait, index) => (
              <li key={index} className="text-sm">{trait}</li>
            ))}
          </ul>
        </div>
        
        <div className="mb-4">
          <h3 className="text-md font-semibold mb-2">運勢</h3>
          <p className="text-sm">{seiMeiResult.goodLuck}</p>
        </div>
        
        <div>
          <h3 className="text-md font-semibold mb-2">アドバイス</h3>
          <p className="text-sm">{seiMeiResult.advice}</p>
        </div>
      </CardContent>
    </Card>
  );
}