import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';
import { MbtiResult, SanmeiResult } from '@/lib/types';
import { cn } from '@/lib/utils';

interface PersonalityChartProps {
  mbtiResult: MbtiResult;
  sanmeiResult: SanmeiResult;
  className?: string;
}

// 6角形のレーダーチャートで性格特性を視覚化するコンポーネント
const PersonalityChart: React.FC<PersonalityChartProps> = ({ mbtiResult, sanmeiResult, className }) => {
  // MBTIと算命学の結果から6つの主要な性格特性スコアを計算
  const calculateTraitScores = () => {
    const { type, ieScale, nsScale, ftScale, jpScale } = mbtiResult;
    const { element, polarity } = sanmeiResult;
    
    // MBTIの軸を0-100のスケールに変換
    const introversion = ieScale; // I軸のスコア
    const intuition = nsScale; // N軸のスコア
    const thinking = ftScale; // T軸のスコア
    const judging = jpScale; // J軸のスコア
    
    // 算命学の要素から追加の特性スコアを計算
    // 要素に基づいた「調和性」と「創造性」のスコア
    let harmony = 50;
    let creativity = 50;
    
    // 算命学の要素に基づいて調和性と創造性のスコアを調整
    switch(element) {
      case '木':
        harmony = 60;
        creativity = 70;
        break;
      case '火':
        harmony = 50;
        creativity = 90;
        break;
      case '土':
        harmony = 80;
        creativity = 40;
        break;
      case '金':
        harmony = 55;
        creativity = 60;
        break;
      case '水':
        harmony = 70;
        creativity = 75;
        break;
    }
    
    // 陰陽に基づいた調整
    if (polarity === '陰') {
      harmony += 10;
      creativity -= 5;
    } else {
      harmony -= 5;
      creativity += 10;
    }
    
    // 6つの性格特性を返す
    return [
      { trait: '内向性', value: introversion, fullMark: 100 },
      { trait: '直感力', value: intuition, fullMark: 100 },
      { trait: '論理性', value: thinking, fullMark: 100 },
      { trait: '計画性', value: judging, fullMark: 100 },
      { trait: '調和性', value: harmony, fullMark: 100 },
      { trait: '創造性', value: creativity, fullMark: 100 }
    ];
  };

  const data = calculateTraitScores();
  
  return (
    <div className={cn("w-full h-[300px] md:h-[400px]", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="trait" tick={{ fill: '#555', fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#888', fontSize: 10 }} />
          <Radar 
            name="あなたの性格特性" 
            dataKey="value" 
            stroke="#44a6c6" 
            fill="#44a6c6" 
            fillOpacity={0.5} 
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PersonalityChart;