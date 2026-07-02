import React from 'react';

export const Logo = ({ size = 'normal', className = '', animated = false }) => {
  const sizes = {
    small: { container: 'w-7 h-7', stroke: 1.6 },
    normal: { container: 'w-9 h-9', stroke: 2 },
    large: { container: 'w-14 h-14', stroke: 2.6 },
    huge: { container: 'w-24 h-24', stroke: 3.2 }
  };
  
  const s = sizes[size];

  return (
    <div className={`relative ${s.container} ${className}`}>
      {/* Logo SVG */}
      <svg 
        viewBox="0 0 56 56" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="flLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00D4FF" />
            <stop offset="100%" stopColor="#00E5A8" />
          </linearGradient>
        </defs>

        {/* Core geometric structure - Minimal FL/AI */}
        <g className={animated ? 'animate-[logo-pulse_3s_ease-in-out_infinite]' : ''}>
          <path 
            d="M11 15 H27 V20 H17 V26 H29 V32 H17 V41 H11 Z"
            fill="url(#flLogoGradient)"
            stroke="url(#flLogoGradient)"
            strokeWidth={s.stroke / 2}
            strokeLinejoin="round"
          />
          
          <g>
            <line x1="33" y1="21" x2="43" y2="15" stroke="url(#flLogoGradient)" strokeWidth={s.stroke * 0.6} strokeLinecap="round" opacity="0.9" />
            <line x1="33" y1="21" x2="45" y2="28" stroke="url(#flLogoGradient)" strokeWidth={s.stroke * 0.6} strokeLinecap="round" opacity="0.9" />
            <line x1="33" y1="21" x2="43" y2="41" stroke="url(#flLogoGradient)" strokeWidth={s.stroke * 0.6} strokeLinecap="round" opacity="0.9" />
            
            <circle cx="33" cy="21" r={size === 'small' ? 1.6 : size === 'normal' ? 2 : size === 'large' ? 2.5 : 3.2} fill="url(#flLogoGradient)" />
            <circle cx="43" cy="15" r={size === 'small' ? 1.3 : size === 'normal' ? 1.7 : size === 'large' ? 2.2 : 2.8} fill="url(#flLogoGradient)" />
            <circle cx="45" cy="28" r={size === 'small' ? 1.3 : size === 'normal' ? 1.7 : size === 'large' ? 2.2 : 2.8} fill="url(#flLogoGradient)" />
            <circle cx="43" cy="41" r={size === 'small' ? 1.3 : size === 'normal' ? 1.7 : size === 'large' ? 2.2 : 2.8} fill="url(#flLogoGradient)" />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Logo;
