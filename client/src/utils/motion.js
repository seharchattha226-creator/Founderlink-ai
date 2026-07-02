export const DURATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
};

export const EASING = {
  easeOut: [0.25, 0.46, 0.45, 0.94],
  easeIn: [0.46, 0.03, 0.94, 0.54],
  spring: [0.34, 1.56, 0.64, 1],
};

export const STAGGER = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.2,
};

export const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: DURATION.fast, ease: EASING.easeOut } },
};

export const buttonVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: DURATION.fast, ease: EASING.easeOut } },
  tap: { scale: 0.97, transition: { duration: DURATION.fast, ease: EASING.easeOut } },
};

export function useMotionPref() {
  return true;
}
