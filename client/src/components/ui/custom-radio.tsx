import React from 'react';
import { cn } from '@/lib/utils';

interface CustomRadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
  labelClassName?: string;
}

const CustomRadio = React.forwardRef<HTMLInputElement, CustomRadioProps>(
  ({ label, className = '', labelClassName = '', ...props }, ref) => {
    return (
      <label className={cn("custom-radio relative pl-7 flex items-center cursor-pointer", className)}>
        <input 
          type="radio" 
          className="absolute opacity-0 cursor-pointer"
          ref={ref}
          {...props}
        />
        <span className="radio-mark absolute top-1/2 -translate-y-1/2 left-0 h-5 w-5 border-2 border-primary rounded-full"></span>
        <span className={cn("text-sm", labelClassName)}>{label}</span>
      </label>
    );
  }
);

CustomRadio.displayName = 'CustomRadio';

export default CustomRadio;

// Add styles to be injected to the document
const style = document.createElement('style');
style.textContent = `
  .custom-radio:hover .radio-mark {
    background-color: rgba(0, 150, 136, 0.1);
  }
  .custom-radio input:checked ~ .radio-mark:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: hsl(var(--primary));
  }
  .custom-radio input:checked ~ .radio-mark {
    border-color: hsl(var(--primary));
    background-color: rgba(0, 150, 136, 0.05);
  }
`;
document.head.appendChild(style);
