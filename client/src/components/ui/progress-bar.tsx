import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 100
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, className = '' }) => {
  return (
    <div className="w-full">
      <div className={`form-progress-bar h-1 bg-gray-200 rounded-full overflow-hidden ${className}`}>
        <div 
          className="form-progress-value h-full bg-gradient-to-r from-primary to-[#D4AF37] transition-all duration-300 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
