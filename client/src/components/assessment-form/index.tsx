import React, { useState } from 'react';
import { basicInfoSchema, finalQuestionsSchema, type BasicInfo, type FinalQuestions, type MbtiResponse, type InsertAssessment } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import ProgressBar from '@/components/ui/progress-bar';
import BasicInfoStep from './basic-info-step';
import MbtiQuestionsStep from './mbti-questions-step';
import FinalQuestionsStep from './final-questions-step';

interface AssessmentFormProps {
  onComplete: (result: any) => void;
}

const AssessmentForm: React.FC<AssessmentFormProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [basicInfo, setBasicInfo] = useState<BasicInfo | null>(null);
  const [mbtiResponses, setMbtiResponses] = useState<MbtiResponse[]>([]);
  const [finalQuestions, setFinalQuestions] = useState<FinalQuestions | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  
  const progress = ((currentStep - 1) / 3) * 100;

  const handleBasicInfoNext = (data: BasicInfo) => {
    setBasicInfo(data);
    setCurrentStep(2);
  };

  const handleMbtiNext = (responses: MbtiResponse[]) => {
    setMbtiResponses(responses);
    setCurrentStep(3);
  };

  const handleFinalNext = async (data: FinalQuestions) => {
    setFinalQuestions(data);
    await submitAssessment(data);
  };

  const submitAssessment = async (finalData: FinalQuestions) => {
    if (!basicInfo) return;
    
    try {
      setIsSubmitting(true);
      
      // Prepare the complete assessment data
      const assessment: InsertAssessment = {
        ...basicInfo,
        ...finalData,
        mbtiResponses,
      };
      
      // Submit to the server
      const response = await apiRequest('POST', '/api/assessment', assessment);
      const result = await response.json();
      
      // Complete the assessment
      onComplete(result);
    } catch (error) {
      console.error('Assessment submission failed:', error);
      toast({
        title: "エラーが発生しました",
        description: "診断を完了できませんでした。もう一度お試しください。",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <section className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-6 pt-6 pb-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            {currentStep === 1 && "基本情報"}
            {currentStep === 2 && "MBTI診断質問"}
            {currentStep === 3 && "補足質問"}
          </span>
          <span className="text-sm font-medium text-primary">{currentStep}/3</span>
        </div>
        <ProgressBar progress={progress} />
      </div>
      
      <div className="p-6">
        {currentStep === 1 && (
          <BasicInfoStep 
            onNext={handleBasicInfoNext}
            defaultValues={basicInfo || undefined}
          />
        )}
        
        {currentStep === 2 && (
          <MbtiQuestionsStep 
            onNext={handleMbtiNext}
            onPrev={handlePrev}
            defaultValues={mbtiResponses}
          />
        )}
        
        {currentStep === 3 && (
          <FinalQuestionsStep 
            onNext={handleFinalNext}
            onPrev={handlePrev}
            defaultValues={finalQuestions || undefined}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </section>
  );
};

export default AssessmentForm;
