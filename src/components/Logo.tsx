import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withStrapline?: boolean;
}

export default function Logo({ className = '', size = 'md', withStrapline = true }: LogoProps) {
  const sizeClasses = {
    sm: 'text-[22px]',
    md: 'text-[36px]',
    lg: 'text-[54px]',
    xl: 'text-[82px]',
  };

  const capSizes = {
    sm: 'w-[16px] h-[16px]',
    md: 'w-[28px] h-[28px]',
    lg: 'w-[42px] h-[42px]',
    xl: 'w-[64px] h-[64px]',
  };
  
  const capOffsets = {
    sm: '-top-[7px] -left-[1px]',
    md: '-top-[12px] -left-[2px]',
    lg: '-top-[18px] -left-[3px]',
    xl: '-top-[28px] -left-[5px]',
  };

  return (
    <div className={`flex flex-col items-center justify-center font-sans font-bold select-none ${className}`}>
      <div className={`relative flex items-center leading-none tracking-tight ${sizeClasses[size]}`}>
        <span className="text-[#102b5c]">Learn</span>
        <div className="relative inline-flex items-center justify-center">
          <span className="text-[#f12a45]">o</span>
          <div className={`absolute ${capOffsets[size]} z-10 flex items-center justify-center pointer-events-none`}>
             <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={`text-[#102b5c] ${capSizes[size]}`}>
               <path d="M12 2L1 7l11 5 9-4.09V17h2V7L12 2z" />
               <path d="M4 9v6c0 2 3.58 4 8 4s8-2 8-4V9l-8 3.64L4 9z" />
             </svg>
          </div>
        </div>
        <span className="text-[#f12a45]">ra</span>
      </div>
      
      {withStrapline && (
        <div className="flex items-center w-full justify-center mt-[0.2em]">
          <div className="flex-1 h-[1px] bg-[#102b5c] mr-2"></div>
          <p className="text-[0.25em] tracking-[0.2em] uppercase text-[#102b5c] font-semibold flex items-center gap-[0.2em] whitespace-nowrap">
            LEARN<span className="text-[#f12a45] font-black scale-110">.</span> GROW<span className="text-[#f12a45] font-black scale-110">.</span> SUCCEED<span className="text-[#f12a45] font-black scale-110">.</span>
          </p>
          <div className="flex-1 h-[1px] bg-[#102b5c] ml-2"></div>
        </div>
      )}
    </div>
  );
}
