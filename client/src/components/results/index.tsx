import React from 'react';
import { AnalysisResult } from '@/lib/types';
import ResultsHeader from './results-header';
import ResultsSummary from './results-summary';
import MbtiAnalysis from './mbti-analysis';
import SanmeiAnalysis from './sanmei-analysis';
import IntegratedAnalysis from './integrated-analysis';
import AdditionalInsights from './additional-insights';

interface ResultsProps {
  result: AnalysisResult;
  name: string;
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ result, name, onRestart }) => {
  return (
    <section className="animate-fade-in">
      <ResultsHeader 
        name={name}
        mbtiType={result.mbtiResult.type}
        sanmeiType={result.sanmeiResult.fullType}
        typeNickname={result.typeNickname}
      />
      
      <ResultsSummary overview={result.overview} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <MbtiAnalysis mbtiResult={result.mbtiResult} traits={result.mbtiTraits} />
        <SanmeiAnalysis sanmeiResult={result.sanmeiResult} traits={result.sanmeiTraits} />
      </div>
      
      <IntegratedAnalysis 
        strengths={result.strengths}
        challenges={result.challenges}
        relationships={result.relationships}
        career={result.career}
      />
      
      <AdditionalInsights 
        balance={result.balance}
        relationshipTips={result.relationshipTips}
        futureOutlook={result.futureOutlook}
        onRestart={onRestart}
      />
    </section>
  );
};

export default Results;
