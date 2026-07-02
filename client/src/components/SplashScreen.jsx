import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';

export default function SplashScreen({ appLoading, onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const [loadingText, setLoadingText] = useState('Initializing FounderLink...');

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

  // Sleek progress bar calculation and updates
  useEffect(() => {
    const startTime = Date.now();
    const minimumDuration = 1600; // 1.6s minimum duration for premium feel
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      
      // Calculate normal progress up to 90% over 1.2s
      let targetProgress = 0;
      if (elapsed < 1200) {
        targetProgress = (elapsed / 1200) * 90;
      } else {
        // Hold at 95% if application is still loading
        targetProgress = appLoading ? 95 : 100;
      }

      // If app has finished loading, and minimum duration is met, go to 100%
      if (!appLoading && elapsed >= minimumDuration) {
        targetProgress = 100;
      }

      // Smooth step increment
      setProgress((prev) => {
        if (prev >= targetProgress) return prev;
        // Increment slowly so it feels continuous
        const step = (targetProgress - prev) * 0.15;
        const next = prev + Math.max(step, 0.5);
        return Math.min(next, targetProgress);
      });

      // Finish condition
      if (!appLoading && elapsed >= minimumDuration + 200 && progress >= 99.5) {
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 150); // slight buffer to show 100% completed
      }
    }, 25);

    return () => clearInterval(interval);
  }, [appLoading, onComplete, progress]);

  // Loading text messages based on progress
  useEffect(() => {
    if (progress < 25) {
      setLoadingText('Connecting to secure gateway...');
    } else if (progress < 50) {
      setLoadingText('Syncing neural workspace state...');
    } else if (progress < 75) {
      setLoadingText('Loading AI core components...');
    } else if (progress < 95) {
      setLoadingText('Verifying credential tokens...');
    } else {
      setLoadingText('Ready');
    }
  }, [progress]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.03,
        filter: 'blur(8px)',
        transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }
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
          className={`w-[600px] h-[600px] rounded-full blur-[150px] opacity-25 transition-all duration-700 ${
            isDark
              ? 'bg-gradient-to-tr from-[#00D4FF]/20 to-[#00E5A8]/10'
              : 'bg-gradient-to-tr from-[#00D4FF]/8 to-[#00E5A8]/5'
          }`}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center select-none">
        {/* Brand Logo Wrapper */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1], // premium custom ease-out
          }}
          className="mb-6 relative flex items-center justify-center"
        >
          {/* Logo element glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-[#00D4FF] to-[#00E5A8] opacity-25 blur-xl rounded-full animate-pulse-soft" />
          
          <Logo size="huge" animated={true} />
        </motion.div>

        {/* Website Name */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.15,
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mb-8"
        >
          <h1
            className={`text-3xl sm:text-4xl font-semibold tracking-tight ${
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
          transition={{ delay: 0.35, duration: 0.5 }}
          className="w-full max-w-[200px] flex flex-col items-center"
        >
          {/* Progress bar track */}
          <div
            className={`w-full h-[2px] rounded-full overflow-hidden relative ${
              isDark ? 'bg-white/5' : 'bg-black/5'
            }`}
          >
            {/* Animated progress bar fill */}
            <div
              className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-[#00D4FF] to-[#00E5A8] shadow-[0_0_8px_rgba(0,212,255,0.8)] transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Dynamic Loading Text */}
          <span
            className={`mt-4 text-[11px] font-medium tracking-[0.1em] uppercase ${
              isDark ? 'text-text-secondary' : 'text-[#52525B]'
            } h-4 transition-all duration-300`}
          >
            {loadingText}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
