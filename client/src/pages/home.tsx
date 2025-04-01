import React, { useState } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import AppIntro from '@/components/app-intro';
import AssessmentForm from '@/components/assessment-form';
import Results from '@/components/results';
import { Assessment } from '@shared/schema';
import { AnalysisResult } from '@/lib/types';

const Home: React.FC = () => {
  const [appState, setAppState] = useState({
    started: false,
    completed: false,
    assessment: null as Assessment | null,
    result: null as AnalysisResult | null,
    name: ''
  });
  
  const startAssessment = () => {
    setAppState(prev => ({
      ...prev,
      started: true,
      completed: false
    }));
  };
  
  const completeAssessment = (assessmentResult: any) => {
    setAppState(prev => ({
      ...prev,
      completed: true,
      assessment: assessmentResult.assessment,
      result: assessmentResult.result,
      name: assessmentResult.assessment.fullName
    }));
  };
  
  const restartAssessment = () => {
    setAppState(prev => ({
      ...prev,
      started: true,
      completed: false,
      assessment: null,
      result: null
    }));
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        {!appState.started && (
          <AppIntro onStart={startAssessment} />
        )}
        
        {appState.started && !appState.completed && (
          <AssessmentForm onComplete={completeAssessment} />
        )}
        
        {appState.started && appState.completed && appState.result && (
          <Results 
            result={appState.result}
            name={appState.name}
            onRestart={restartAssessment}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
