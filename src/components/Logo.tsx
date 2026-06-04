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

  // Exact relative positions for the graduation cap to sit beautifully over 'ora'
  const capStyles = {
    sm: {
      container: 'w-[30px] h-[20px] -top-[13px] right-[-2px]',
    },
    md: {
      container: 'w-[50px] h-[34px] -top-[21px] right-[-3px]',
    },
    lg: {
      container: 'w-[75px] h-[50px] -top-[32px] right-[-5px]',
    },
    xl: {
      container: 'w-[115px] h-[78px] -top-[49px] right-[-7px]',
    },
  };

  return (
    <div className={`flex flex-col items-center justify-center font-sans select-none ${className}`}>
      {/* Container for the logo text with baseline alignment to match professional typographers */}
      <div className={`relative flex items-baseline leading-none font-extrabold tracking-tight ${sizeClasses[size]}`}>
        {/* "Learn" segment in deep solid Navy Blue */}
        <span className="text-[#0A2A66] dark:text-[#0A2A66]">Learn</span>
        
        {/* "ora" segment in vibrant branding coral red, wrapped relative to anchor the cap */}
        <span className="relative text-[#FF3B5C] dark:text-[#FF3B5C]">
          ora
          
          {/* Graduation Cap container sitting perfectly on top of 'ora' */}
          <div className={`absolute ${capStyles[size].container} pointer-events-none select-none`}>
            <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]">
              {/* Mortarboard / Hat Diamond in Deep Navy Blue */}
              <path d="M60 4 L115 28 L60 52 L5 28 Z" fill="#0A2A66" />
              
              {/* Under-ring Skullcap in Deep Navy Blue */}
              <path d="M28 35 C28 35 28 47 60 47 C92 47 92 35 92 35 C92 35 88 56 60 56 C32 56 28 35 28 35 Z" fill="#0A2A66" />
              
              {/* Separator curve highlight in white */}
              <path d="M28 35 C44 42 76 42 92 35" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
              
              {/* Hanging Tassel - Coral Red to match the "ora" text */}
              <path d="M107 26 L107 43" stroke="#FF3B5C" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="107" cy="47" r="4.5" fill="#FF3B5C" />
            </svg>
          </div>
        </span>
      </div>
      
      {withStrapline && (
        <div className="flex items-center w-full justify-center mt-[0.3em]">
          <div className="flex-1 h-[1.2px] bg-[#0A2A66] mr-2 opacity-80"></div>
          <p className="text-[0.24em] tracking-[0.24em] uppercase text-[#0A2A66] font-extrabold flex items-center gap-[0.2em] whitespace-nowrap">
            LEARN<span className="text-[#FF3B5C] font-black scale-110">.</span> GROW<span className="text-[#FF3B5C] font-black scale-110">.</span> SUCCEED<span className="text-[#FF3B5C] font-black scale-110">.</span>
          </p>
          <div className="flex-1 h-[1.2px] bg-[#0A2A66] ml-2 opacity-80"></div>
        </div>
      )}
    </div>
  );
}

