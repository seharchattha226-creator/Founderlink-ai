import React from 'react';

export const Logo = ({ size = 'normal', className = '', animated = false }) => {
  const sizes = {
    small: { container: 'w-8 h-8', stroke: 1.8 },
    normal: { container: 'w-10 h-10', stroke: 2.2 },
    large: { container: 'w-16 h-16', stroke: 2.8 },
    huge: { container: 'w-28 h-28', stroke: 3.5 }
  };
  
  const s = sizes[size];

  return (
    <div className={`relative ${s.container} ${className}`}>
      {/* Premium Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/35 via-blue-500/25 to-cyan-400/30 blur-2xl opacity-90 rounded-full" />
      
      {/* Logo SVG */}
      <svg 
        viewBox="0 0 56 56" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10"
      >
        <defs>
          {/* Premium Deep Violet to Electric Blue to Cyan Gradient */}
          <linearGradient id="flLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
          <linearGradient id="flLogoGradientAlt" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>
          {/* Radial Glow for accent */}
          <radialGradient id="flGlow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="1" />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
          </radialGradient>
          {/* Light sweep gradient */}
          <linearGradient id="flSweep" x1="-20%" y1="0%" x2="120%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="50%" stopColor="white" stopOpacity="0.45" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Subtle background glow circle */}
        <circle cx="28" cy="28" r="26" fill="url(#flGlow)" opacity="0.15" />

        {/* Core geometric structure - Abstract FL/Neural Network Hybrid */}
        <g className={animated ? 'animate-[logo-pulse_3s_ease-in-out_infinite]' : ''}>
          {/* Primary geometric shape (F + Link concept) */}
          <path 
            d="M10 14 H28 V20 H18 V26 H30 V32 H18 V42 H10 Z"
            fill="url(#flLogoGradient)"
            stroke="url(#flLogoGradient)"
            strokeWidth={s.stroke / 2}
            strokeLinejoin="round"
          />
          
          {/* Complementary link/nodes (AI Intelligence & Growth) */}
          <g>
            {/* Connection lines */}
            <line x1="34" y1="20" x2="44" y2="14" stroke="url(#flLogoGradientAlt)" strokeWidth={s.stroke * 0.75} strokeLinecap="round" opacity="0.85" />
            <line x1="34" y1="20" x2="46" y2="28" stroke="url(#flLogoGradient)" strokeWidth={s.stroke * 0.75} strokeLinecap="round" opacity="0.85" />
            <line x1="34" y1="20" x2="44" y2="42" stroke="url(#flLogoGradientAlt)" strokeWidth={s.stroke * 0.75} strokeLinecap="round" opacity="0.85" />
            
            {/* Neural nodes (representing Founder + AI connection) */}
            <circle cx="34" cy="20" r={size === 'small' ? 1.8 : size === 'normal' ? 2.2 : size === 'large' ? 2.8 : 3.8} fill="#0ea5e9" />
            <circle cx="44" cy="14" r={size === 'small' ? 1.5 : size === 'normal' ? 1.9 : size === 'large' ? 2.4 : 3.3} fill="#8b5cf6" />
            <circle cx="46" cy="28" r={size === 'small' ? 1.5 : size === 'normal' ? 1.9 : size === 'large' ? 2.4 : 3.3} fill="#6366f1" />
            <circle cx="44" cy="42" r={size === 'small' ? 1.5 : size === 'normal' ? 1.9 : size === 'large' ? 2.4 : 3.3} fill="#06b6d4" />
          </g>
        </g>

        {/* Animated light sweep overlay (for intro screen) */}
        {animated && (
          <path 
            d="M0 0 H56 V56 H0 Z"
            fill="url(#flSweep)"
            className="animate-[logo-sweep_2.2s_ease-in-out_infinite]"
            style={{ transformOrigin: 'center' }}
          />
        )}
      </svg>
    </div>
  );
};

export default Logo;
