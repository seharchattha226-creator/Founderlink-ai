import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const [loadingText, setLoadingText] = useState('Connecting...');

  // Theme detection (Light / Dark)
  useEffect(() => {
    const checkTheme = () => {
      const isHtmlLight = document.documentElement.classList.contains('light');
      const isBodyLight = document.body.classList.contains('light');
      setIsDark(!(isHtmlLight || isBodyLight));
    };

    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Ultra-fast duration-based progress bar (completes in 400ms)
  useEffect(() => {
    const duration = 400; // 0.4 seconds total animation
    const startTime = Date.now();
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / duration) * 100);
      
      setProgress(pct);
      
      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 50); // Snappy delay to show completed progress
      }
    }, 16); // 60fps refresh rate

    return () => clearInterval(interval);
  }, [onComplete]);

  // Loading text update based on progress
  useEffect(() => {
    if (progress < 40) {
      setLoadingText('Connecting...');
    } else if (progress < 80) {
      setLoadingText('Syncing...');
    } else {
      setLoadingText('Ready');
    }
  }, [progress]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.01,
        transition: { duration: 0.22, ease: "easeOut" }
      }}
      className={`fixed inset-0 w-screen h-screen z-[99999] flex flex-col items-center justify-center overflow-hidden transition-colors duration-500 ${
        isDark ? 'bg-[#0B0B0F]' : 'bg-[#FAF9F6]'
      }`}
    >
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Premium Glowing Background Aura */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className={`w-[400px] h-[400px] rounded-full blur-[100px] opacity-15 transition-all duration-700 ${
            isDark
              ? 'bg-gradient-to-tr from-[#00D4FF]/20 to-[#00E5A8]/10'
              : 'bg-gradient-to-tr from-[#00D4FF]/8 to-[#00E5A8]/5'
          }`}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center select-none">
        {/* Website Name */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.35,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mb-5"
        >
          <h1
            className={`text-3xl font-semibold tracking-tight ${
              isDark ? 'text-white' : 'text-[#0B0B0F]'
            }`}
          >
            FounderLink
            <span className="text-[#00D4FF]">.ai</span>
          </h1>
        </motion.div>

        {/* Minimal Progress Bar and Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-[130px] flex flex-col items-center"
        >
          {/* Progress bar track */}
          <div
            className={`w-full h-[2px] rounded-full overflow-hidden relative ${
              isDark ? 'bg-white/5' : 'bg-black/5'
            }`}
          >
            {/* Animated progress bar fill */}
            <div
              className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-[#00D4FF] to-[#00E5A8] shadow-[0_0_4px_rgba(0,212,255,0.6)] transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Dynamic Loading Text */}
          <span
            className={`mt-2.5 text-[9px] font-semibold tracking-[0.15em] uppercase ${
              isDark ? 'text-text-secondary' : 'text-[#52525B]'
            } h-3.5`}
          >
            {loadingText}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
