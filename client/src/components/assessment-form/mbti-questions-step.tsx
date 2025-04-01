import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { mbtiQuestions } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { MbtiResponse } from '@shared/schema';
import CustomRadio from '@/components/ui/custom-radio';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { z } from 'zod';
import { Info } from 'lucide-react';

interface MbtiQuestionsStepProps {
  onNext: (responses: MbtiResponse[]) => void;
  onPrev: () => void;
  defaultValues?: MbtiResponse[];
}

// MBTI直接入力のためのバリデーションスキーマ
const mbtiTypeSchema = z.object({
  mbtiType: z.string().length(4, "MBTIタイプは4文字である必要があります")
    .refine(value => {
      // MBTI型の最初の文字はIかEであるか
      return value.charAt(0) === 'I' || value.charAt(0) === 'E';
    }, { message: "1文字目はIかEである必要があります" })
    .refine(value => {
      // MBTI型の2文字目はNかSであるか
      return value.charAt(1) === 'N' || value.charAt(1) === 'S';
    }, { message: "2文字目はNかSである必要があります" })
    .refine(value => {
      // MBTI型の3文字目はTかFであるか
      return value.charAt(2) === 'T' || value.charAt(2) === 'F';
    }, { message: "3文字目はTかFである必要があります" })
    .refine(value => {
      // MBTI型の4文字目はJかPであるか
      return value.charAt(3) === 'J' || value.charAt(3) === 'P';
    }, { message: "4文字目はJかPである必要があります" })
});

// MBTIタイプを回答に変換する関数
function mbtiTypeToResponses(mbtiType: string): MbtiResponse[] {
  const responses: MbtiResponse[] = [];
  
  // I/E軸 (質問ID: 1, 5, 9, 13) - I: i選択、E: e選択
  const isIntrovert = mbtiType.charAt(0) === 'I';
  [1, 5, 9, 13].forEach(id => {
    responses.push({ questionId: id, answer: isIntrovert ? 'i' : 'e' });
  });
  
  // N/S軸 (質問ID: 2, 6, 10, 14) - N: n選択、S: s選択
  const isIntuitive = mbtiType.charAt(1) === 'N';
  [2, 6, 10, 14].forEach(id => {
    responses.push({ questionId: id, answer: isIntuitive ? 'n' : 's' });
  });
  
  // T/F軸 (質問ID: 3, 7, 11, 15) - T: t選択、F: f選択
  const isThinking = mbtiType.charAt(2) === 'T';
  [3, 7, 11, 15].forEach(id => {
    responses.push({ questionId: id, answer: isThinking ? 't' : 'f' });
  });
  
  // J/P軸 (質問ID: 4, 8, 12, 16) - J: j選択、P: p選択
  const isJudging = mbtiType.charAt(3) === 'J';
  [4, 8, 12, 16].forEach(id => {
    responses.push({ questionId: id, answer: isJudging ? 'j' : 'p' });
  });
  
  return responses;
}

const MbtiQuestionsStep: React.FC<MbtiQuestionsStepProps> = ({ onNext, onPrev, defaultValues = [] }) => {
  const [directInput, setDirectInput] = useState(false);
  
  // 質問フォーム用
  const defaultResponses = mbtiQuestions.reduce((acc, question) => {
    const existingResponse = defaultValues.find(r => r.questionId === question.id);
    acc[`q${question.id}`] = existingResponse?.answer || '';
    return acc;
  }, {} as Record<string, string>);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: defaultResponses
  });

  // MBTI直接入力フォーム用
  const [firstLetter, setFirstLetter] = useState('I');
  const [secondLetter, setSecondLetter] = useState('N');
  const [thirdLetter, setThirdLetter] = useState('T');
  const [fourthLetter, setFourthLetter] = useState('J');
  const [directTypeError, setDirectTypeError] = useState('');

  const handleDirectSubmit = () => {
    const mbtiType = `${firstLetter}${secondLetter}${thirdLetter}${fourthLetter}`;
    
    try {
      mbtiTypeSchema.parse({ mbtiType });
      const responses = mbtiTypeToResponses(mbtiType);
      onNext(responses);
      setDirectTypeError('');
    } catch (error) {
      if (error instanceof z.ZodError) {
        setDirectTypeError(error.errors[0].message);
      } else {
        setDirectTypeError('入力に問題があります');
      }
    }
  };

  const onSubmit = (data: Record<string, string>) => {
    const responses: MbtiResponse[] = Object.entries(data).map(([key, value]) => ({
      questionId: parseInt(key.substring(1)),
      answer: value
    }));
    
    onNext(responses);
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h3 className="font-heading text-xl md:text-2xl font-bold pastel-gradient bg-clip-text text-transparent mb-6">パーソナリティタイプの診断</h3>
      </div>
      
      <div className="bg-blue-50 rounded-lg p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Info size={20} className="text-blue-500 mr-2" />
          <span className="text-sm text-blue-700">
            {directInput 
              ? "MBTIタイプを知っている場合は直接選択できます" 
              : "質問に答えてMBTIタイプを診断します"}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <Label htmlFor="direct-input" className="text-sm text-gray-600">
            MBTIを直接選択
          </Label>
          <Switch 
            id="direct-input" 
            checked={directInput} 
            onCheckedChange={setDirectInput} 
            className="bg-blue-200 data-[state=checked]:bg-primary"
          />
        </div>
      </div>
      
      {directInput ? (
        <div className="card-gradient p-6 rounded-xl shadow-sm">
          <div className="mb-4">
            <h4 className="font-medium text-gray-700 mb-2">MBTIタイプを選択してください</h4>
            <p className="text-sm text-gray-600 mb-4">4つの軸から、あなたに最も当てはまる組み合わせを選んでください</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div>
                <Label className="text-sm text-gray-600 block mb-1">内向/外向</Label>
                <Select value={firstLetter} onValueChange={setFirstLetter}>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="I">I (内向的)</SelectItem>
                    <SelectItem value="E">E (外向的)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm text-gray-600 block mb-1">直感/感覚</Label>
                <Select value={secondLetter} onValueChange={setSecondLetter}>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="N">N (直感的)</SelectItem>
                    <SelectItem value="S">S (感覚的)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm text-gray-600 block mb-1">思考/感情</Label>
                <Select value={thirdLetter} onValueChange={setThirdLetter}>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="T">T (思考的)</SelectItem>
                    <SelectItem value="F">F (感情的)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm text-gray-600 block mb-1">判断/認知</Label>
                <Select value={fourthLetter} onValueChange={setFourthLetter}>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="J">J (計画的)</SelectItem>
                    <SelectItem value="P">P (柔軟的)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="text-center mb-4">
              <div className="bg-teal-50 rounded-lg p-3 inline-block">
                <span className="font-heading text-lg text-primary">
                  選択されたタイプ: <strong>{firstLetter}{secondLetter}{thirdLetter}{fourthLetter}</strong>
                </span>
              </div>
            </div>
            
            {directTypeError && (
              <p className="text-red-500 text-sm mb-2 text-center">{directTypeError}</p>
            )}
          </div>
          
          <div className="mt-8 flex justify-between">
            <Button 
              type="button" 
              onClick={onPrev}
              variant="outline"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
            >
              戻る
            </Button>
            <Button 
              type="button"
              onClick={handleDirectSubmit}
              className="px-6 py-2 pastel-gradient text-white rounded-lg shadow hover:opacity-90 transition-all"
            >
              次へ
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {mbtiQuestions.map(question => (
            <div key={question.id} className="card-gradient p-4 border border-gray-200 rounded-lg shadow-sm">
              <p className="font-medium mb-3 text-gray-700">{question.question}</p>
              
              <div className="grid grid-cols-1 gap-2">
                {question.options.map(option => (
                  <label key={option.value} className="p-2 hover:bg-white/80 rounded-md flex items-start">
                    <CustomRadio
                      {...register(`q${question.id}`, { required: "選択してください" })}
                      label={option.text}
                      value={option.value}
                      className="w-full"
                      labelClassName="ml-2 text-gray-700"
                    />
                  </label>
                ))}
              </div>
              {errors[`q${question.id}`] && (
                <p className="text-red-500 text-sm mt-1">{errors[`q${question.id}`]?.message as string}</p>
              )}
            </div>
          ))}
          
          <div className="mt-8 flex justify-between">
            <Button 
              type="button" 
              onClick={onPrev}
              variant="outline"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
            >
              戻る
            </Button>
            <Button 
              type="submit"
              className="px-6 py-2 pastel-gradient text-white rounded-lg shadow hover:opacity-90 transition-all"
            >
              次へ
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default MbtiQuestionsStep;
