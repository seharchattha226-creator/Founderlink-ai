import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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

  // Accelerated progress bar calculation and updates
  useEffect(() => {
    const startTime = Date.now();
    const minimumDuration = 600; // 0.6s minimum duration for snappy, fast feel
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      
      // Calculate normal progress up to 90% over 400ms
      let targetProgress = 0;
      if (elapsed < 400) {
        targetProgress = (elapsed / 400) * 90;
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
        // Increment faster
        const step = (targetProgress - prev) * 0.28;
        const next = prev + Math.max(step, 1.5);
        return Math.min(next, targetProgress);
      });

      // Finish condition (accelerated timers)
      if (!appLoading && elapsed >= minimumDuration + 100 && progress >= 99.2) {
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 80); // ultra-fast buffer to show 100% completed
      }
    }, 20);

    return () => clearInterval(interval);
  }, [appLoading, onComplete, progress]);

  // Loading text messages based on progress (shortened & updated for speed)
  useEffect(() => {
    if (progress < 30) {
      setLoadingText('Connecting...');
    } else if (progress < 60) {
      setLoadingText('Syncing workspace...');
    } else if (progress < 90) {
      setLoadingText('Loading AI components...');
    } else {
      setLoadingText('Ready');
    }
  }, [progress]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.02,
        filter: 'blur(4px)',
        transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }
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
          className={`w-[500px] h-[500px] rounded-full blur-[130px] opacity-20 transition-all duration-700 ${
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
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.05,
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mb-6"
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
          transition={{ delay: 0.1, duration: 0.3 }}
          className="w-full max-w-[160px] flex flex-col items-center"
        >
          {/* Progress bar track */}
          <div
            className={`w-full h-[2px] rounded-full overflow-hidden relative ${
              isDark ? 'bg-white/5' : 'bg-black/5'
            }`}
          >
            {/* Animated progress bar fill */}
            <div
              className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-[#00D4FF] to-[#00E5A8] shadow-[0_0_6px_rgba(0,212,255,0.7)] transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Dynamic Loading Text */}
          <span
            className={`mt-3 text-[10px] font-semibold tracking-[0.12em] uppercase ${
              isDark ? 'text-text-secondary' : 'text-[#52525B]'
            } h-4 transition-all duration-200`}
          >
            {loadingText}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
