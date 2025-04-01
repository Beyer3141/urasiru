import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Compass, Star, BrainCircuit } from 'lucide-react';

interface AppIntroProps {
  onStart: () => void;
}

const AppIntro: React.FC<AppIntroProps> = ({ onStart }) => {
  return (
    <section className="card-gradient rounded-2xl shadow-md p-6 md:p-8 mb-8 animate-fade-in border border-primary/20 max-w-4xl mx-auto">
      <div className="text-center mb-8 relative">
        <div className="absolute -top-6 left-0 right-0 flex justify-center">
          <div className="bg-gradient-to-r from-teal-100 to-blue-100 rounded-full px-4 py-1 text-primary/90 font-medium text-sm inline-flex items-center shadow-sm">
            <Sparkles className="h-4 w-4 mr-1 text-blue-400" />
            あなたの本質を深く知る
          </div>
        </div>
        
        <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6 mt-8">
          <span className="pastel-gradient bg-clip-text text-transparent">
            ウラシルで見つける<br className="hidden sm:block"/>新しい自分の可能性
          </span>
        </h2>
        <p className="text-gray-700 text-base md:text-lg max-w-2xl mx-auto">
          東洋の叡智「算命学」と西洋心理学「MBTI」の融合で、あなたの複層的な個性を明らかにします
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-white to-teal-50 rounded-xl p-6 relative overflow-hidden border border-teal-100 shadow-sm hover:shadow-md transition-all">
          <div className="absolute -top-2 -right-2 w-20 h-20 opacity-10">
            <Compass className="h-16 w-16 text-primary/30" />
          </div>
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <div className="bg-primary/10 p-2 rounded-full mr-3 text-primary">
              <Compass className="h-5 w-5" />
            </div>
            <span className="pastel-gradient bg-clip-text text-transparent">算命学の叡智</span>
          </h3>
          <p className="text-gray-700 text-sm md:text-base">生年月日から導き出される陰陽五行の組み合わせによって、あなたの生まれ持った才能と魅力を解析します</p>
        </div>
        
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 relative overflow-hidden border border-blue-100 shadow-sm hover:shadow-md transition-all">
          <div className="absolute -top-2 -right-2 w-20 h-20 opacity-10">
            <BrainCircuit className="h-16 w-16 text-blue-400/30" />
          </div>
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <div className="bg-blue-400/10 p-2 rounded-full mr-3 text-blue-500">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <span className="bg-gradient-to-r from-blue-500 to-primary bg-clip-text text-transparent">MBTIの深層分析</span>
          </h3>
          <p className="text-gray-700 text-sm md:text-base">ユングの心理学に基づく16タイプの性格分類で、あなたの思考プロセスや行動特性を分析します</p>
        </div>
      </div>
      
      <div className="text-center mt-10 relative">
        <div className="animate-float absolute -top-10 left-1/2 transform -translate-x-1/2">
          <Star className="h-8 w-8 text-primary/50" />
        </div>
        <Button 
          onClick={onStart}
          className="px-8 py-3 pastel-gradient hover:opacity-90 text-white font-bold rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 text-base sm:text-lg"
        >
          診断を始める
        </Button>
      </div>
    </section>
  );
};

export default AppIntro;
