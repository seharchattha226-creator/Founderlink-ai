import React, { useState, useEffect } from 'react';
import Logo from './Logo';

export const IntroScreen = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Premium cinematic animation sequence (2.8 seconds total)
    const timeouts = [
      setTimeout(() => setPhase(1), 400),    // Logo fade in
      setTimeout(() => setPhase(2), 1100),   // Animated light sweep starts
      setTimeout(() => setPhase(3), 1700),   // Brand text appears
      setTimeout(() => setPhase(4), 2100),   // Tagline appears
      setTimeout(() => setPhase(5), 2400),   // Background particles appear
      setTimeout(() => setPhase(6), 2800),   // Start transition
      setTimeout(() => onComplete(), 3300)   // Show homepage
    ];

    return () => timeouts.forEach(t => clearTimeout(t));
  }, [onComplete]);

  return (
    <div className="intro-screen">
      {/* Premium Deep Space Background */}
      <div className="aurora-bg absolute inset-0">
        <div 
          className="aurora-blob"
          style={{
            top: '-20%',
            left: '-10%',
            width: '65%',
            height: '65%',
            background: 'radial-gradient(circle, rgba(79,70,229,0.75) 0%, transparent 65%)',
            animation: 'aurora-dance1 22s ease-in-out infinite'
          }}
        />
        <div 
          className="aurora-blob"
          style={{
            bottom: '-25%',
            right: '-5%',
            width: '60%',
            height: '60%',
            background: 'radial-gradient(circle, rgba(14,165,233,0.7) 0%, transparent 68%)',
            animation: 'aurora-dance2 26s ease-in-out infinite'
          }}
        />
        <div 
          className="aurora-blob"
          style={{
            top: '40%',
            left: '35%',
            width: '45%',
            height: '45%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.55) 0%, transparent 70%)',
            animation: 'aurora-dance3 30s ease-in-out infinite'
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Container */}
        <div 
          className="relative mb-10"
          style={{
            opacity: phase >= 1 ? 1 : 0,
            transform: phase >= 1 ? 'scale(1)' : 'scale(0.75)',
            transition: 'all 0.85s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <Logo size="huge" animated />
        </div>

        {/* Brand Text */}
        <div 
          className="text-center"
          style={{
            opacity: phase >= 3 ? 1 : 0,
            transform: phase >= 3 ? 'translateY(0)' : 'translateY(18px)',
            transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter">
            <span className="text-white">FounderLink</span>
            <span className="gradient-text-primary">.ai</span>
          </h1>
        </div>

        {/* Tagline */}
        <div 
          className="mt-5"
          style={{
            opacity: phase >= 4 ? 1 : 0,
            transform: phase >= 4 ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.12s'
          }}
        >
          <p className="text-xl text-slate-300 font-semibold tracking-wide">
            Your AI Co-Founder
          </p>
        </div>

        {/* Floating Premium Particles */}
        <div 
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{
            opacity: phase >= 5 ? 1 : 0,
            transition: 'opacity 0.8s ease'
          }}
        >
          {[...Array(16)].map((_, i) => {
            const size = Math.random() * 5 + 1.5;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const delay = Math.random() * 0.9;
            const colors = ['#4f46e5', '#0ea5e9', '#6366f1', '#8b5cf6', '#06b6d4'];
            const color = colors[i % colors.length];
            
            return (
              <div 
                key={i}
                className="particle"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: color,
                  animation: `floatParticle ${7 + Math.random() * 5}s ease-in-out infinite`,
                  animationDelay: `${delay}s`,
                  opacity: 0.4 + Math.random() * 0.5,
                  boxShadow: `0 0 ${5 + Math.random() * 10}px ${color}`
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;
