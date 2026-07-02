import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';
import { DURATION, EASING, STAGGER, fadeInUp, useMotionPref } from '../utils/motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { shouldAnimate } = useMotionPref();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '#features' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  const isActive = (href) => {
    if (href.startsWith('#')) {
      return location.pathname === '/' && location.hash === href;
    }
    return location.pathname === href;
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.01 },
    tap: { scale: 0.99 },
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-7">
        <motion.div
          initial={shouldAnimate ? { opacity: 0, y: -12 } : {}}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: DURATION.slow, 
            ease: EASING.easeOut 
          }}
          className={`relative flex items-center justify-between rounded-2xl border transition-all ${
            scrolled
              ? 'bg-bg-primary/80 backdrop-blur-xl border-border/70 py-2.5 px-5 sm:px-6 shadow-lg'
              : 'bg-bg-surface/90 border-border/50 py-3.5 px-5 sm:px-6 shadow-sm'
          }`}
          style={{ transitionDuration: `${DURATION.normal}s`, transitionTimingFunction: EASING.easeOut }}
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            <motion.div
              whileHover={{ scale: shouldAnimate ? 1.04 : 1 }}
              transition={{ duration: DURATION.fast, ease: EASING.easeOut }}
            >
              <Logo size="normal" />
            </motion.div>
            <span className="text-base sm:text-lg font-semibold tracking-tight">
              <span className="text-text-primary">FounderLink</span>
              <span className="text-primary">.ai</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1.5">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.href}
                className={`relative px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-text-primary'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
                style={{ transitionDuration: `${DURATION.fast}s`, transitionTimingFunction: EASING.easeOut }}
              >
                {link.name}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary"
                    transition={{ 
                      duration: DURATION.normal, 
                      ease: EASING.easeOut,
                      type: 'spring',
                      stiffness: 400,
                      damping: 35
                    }}
                  />
                )}
              </Link>
            ))}

            <div className="h-6 w-px bg-border mx-3" />

            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/dashboard"
                  className="px-4 py-2.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                  style={{ transitionDuration: `${DURATION.fast}s`, transitionTimingFunction: EASING.easeOut }}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2.5 text-sm font-medium text-text-tertiary hover:text-text-primary transition-colors"
                  style={{ transitionDuration: `${DURATION.fast}s`, transitionTimingFunction: EASING.easeOut }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                  style={{ transitionDuration: `${DURATION.fast}s`, transitionTimingFunction: EASING.easeOut }}
                >
                  Sign In
                </Link>
                <motion.div
                  variants={buttonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link
                    to="/register"
                    className="group inline-flex items-center gap-2 bg-primary text-bg-primary rounded-xl px-4 py-2.5 text-sm font-medium transition-colors hover:bg-primary/90"
                    style={{ transitionDuration: `${DURATION.fast}s`, transitionTimingFunction: EASING.easeOut }}
                  >
                    <Zap className="w-4 h-4" />
                    Get Started
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={shouldAnimate ? { scale: 1.05 } : {}}
            whileTap={shouldAnimate ? { scale: 0.97 } : {}}
            className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-xl border border-border bg-bg-elevated hover:bg-bg-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            style={{ transitionDuration: `${DURATION.fast}s`, transitionTimingFunction: EASING.easeOut }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={mobileMenuOpen ? "close" : "open"}
                initial={shouldAnimate ? { opacity: 0, rotate: -45 } : {}}
                animate={{ opacity: 1, rotate: 0 }}
                exit={shouldAnimate ? { opacity: 0, rotate: 45 } : {}}
                transition={{ 
                  duration: DURATION.fast, 
                  ease: EASING.easeOut 
                }}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={shouldAnimate ? { opacity: 0 } : {}}
              animate={{ opacity: 1 }}
              exit={shouldAnimate ? { opacity: 0 } : {}}
              transition={{ 
                duration: DURATION.fast, 
                ease: EASING.easeOut 
              }}
              className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            {/* Menu Content */}
            <motion.div
              initial={shouldAnimate ? { opacity: 0, y: -12 } : {}}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldAnimate ? { opacity: 0, y: -12 } : {}}
              transition={{ 
                duration: DURATION.normal, 
                ease: EASING.easeOut 
              }}
              className="md:hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4"
            >
              <div className="bg-bg-surface border border-border rounded-2xl p-5 sm:p-6 shadow-xl">
                <motion.div 
                  className="flex flex-col gap-2"
                  variants={{
                    animate: {
                      transition: {
                        staggerChildren: STAGGER.fast,
                      }
                    }
                  }}
                  initial="initial"
                  animate="animate"
                >
                  {navLinks.map((link) => (
                    <motion.div key={link.name} {...fadeInUp}>
                      <Link
                        to={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`px-4 py-3.5 text-sm font-medium rounded-xl transition-colors ${
                          isActive(link.href)
                            ? 'bg-bg-elevated text-text-primary'
                            : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated/50'
                        }`}
                        style={{ transitionDuration: `${DURATION.fast}s`, transitionTimingFunction: EASING.easeOut }}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}

                  <div className="my-2 h-px bg-border" />

                  {user ? (
                    <>
                      <motion.div {...fadeInUp}>
                        <Link
                          to="/dashboard"
                          onClick={() => setMobileMenuOpen(false)}
                          className="px-4 py-3.5 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-bg-elevated/50 rounded-xl transition-colors"
                          style={{ transitionDuration: `${DURATION.fast}s`, transitionTimingFunction: EASING.easeOut }}
                        >
                          Dashboard
                        </Link>
                      </motion.div>
                      <motion.div {...fadeInUp}>
                        <button
                          onClick={() => {
                            handleLogout();
                            setMobileMenuOpen(false);
                          }}
                          className="px-4 py-3.5 text-sm font-medium text-text-tertiary hover:text-text-primary hover:bg-bg-elevated/50 rounded-xl transition-colors text-left"
                          style={{ transitionDuration: `${DURATION.fast}s`, transitionTimingFunction: EASING.easeOut }}
                        >
                          Logout
                        </button>
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <motion.div {...fadeInUp}>
                        <Link
                          to="/login"
                          onClick={() => setMobileMenuOpen(false)}
                          className="px-4 py-3.5 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-bg-elevated/50 rounded-xl transition-colors"
                          style={{ transitionDuration: `${DURATION.fast}s`, transitionTimingFunction: EASING.easeOut }}
                        >
                          Sign In
                        </Link>
                      </motion.div>
                      <motion.div {...fadeInUp}>
                        <Link
                          to="/register"
                          onClick={() => setMobileMenuOpen(false)}
                          className="mt-2 inline-flex items-center justify-center gap-2 bg-primary text-bg-primary rounded-xl px-4 py-3.5 text-sm font-medium transition-colors hover:bg-primary/90"
                          style={{ transitionDuration: `${DURATION.fast}s`, transitionTimingFunction: EASING.easeOut }}
                        >
                          <Zap className="w-4 h-4" />
                          Get Started
                        </Link>
                      </motion.div>
                    </>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
