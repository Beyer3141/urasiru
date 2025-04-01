import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center">
          <p className="text-sm">© {new Date().getFullYear()} 算命学 × MBTI 性格診断アプリ</p>
          <p className="text-xs mt-2 text-gray-400">
            このアプリは教育・娯楽目的で作成されています。プロフェッショナルなアドバイスの代わりにはなりません。
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
