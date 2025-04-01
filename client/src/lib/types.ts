import { Assessment, BasicInfo, FinalQuestions, MbtiResponse } from "@shared/schema";

// Application state interface
export interface AppState {
  started: boolean;
  completed: boolean;
  currentStep: number;
  totalSteps: number;
  basicInfo: BasicInfo | null;
  mbtiResponses: MbtiResponse[];
  finalQuestions: FinalQuestions | null;
  result: Assessment | null;
}

// MBTI Type result interface
export interface MbtiResult {
  type: string;
  ieScale: number;
  nsScale: number;
  ftScale: number;
  jpScale: number;
}

// Sanmei Type result interface
export interface SanmeiResult {
  element: string;
  polarity: string;
  fullType: string;
}

// Integrated Analysis Result
export interface SeiMeiResult {
  nameTotal: number;
  firstNameTotal: number;
  lastNameTotal: number;
  heavenNumber: number;
  earthNumber: number;
  humanNumber: number;
  characteristics: string[];
  goodLuck: string;
  advice: string;
}

export interface FourPillarsResult {
  heavenlyStem: string;
  earthlyBranch: string;
  dayMaster: string;
  luckyElements: string[];
  unluckyElements: string[];
  lifeTheme: string;
}

export interface AnalysisResult {
  mbtiResult: MbtiResult;
  sanmeiResult: SanmeiResult;
  typeNickname: string;
  overview: string;
  mbtiTraits: string[];
  sanmeiTraits: string[];
  strengths: string;
  challenges: string;
  relationships: string;
  career: string;
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
  // 追加の診断結果
  seiMeiResult?: SeiMeiResult;
  fourPillarsResult?: FourPillarsResult;
}
