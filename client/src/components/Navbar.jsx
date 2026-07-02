import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';
import { DURATION, EASING, STAGGER, fadeInUp, buttonVariants, useMotionPref } from '../utils/motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const shouldAnimate = useMotionPref();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.normal, ease: EASING.easeOut }}
          className={`
            relative flex items-center justify-between
            rounded-full border transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
            ${scrolled
              ? 'bg-bg-primary/85 backdrop-blur-2xl border-border/80 py-2.5 px-5 sm:px-6 shadow-[0_8px_30px_rgb(0,0,0,0.25)]'
              : 'bg-bg-surface/90 border-border/60 py-3.5 px-5 sm:px-6 shadow-[0_4px_20px_rgb(0,0,0,0.15)]'
            }
          `}
        >
          <Link to="/" className="flex items-center gap-3 group relative">
            <div className="group-hover:scale-110 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
              <Logo size="normal" />
            </div>
            <span className="text-base sm:text-lg font-semibold tracking-tight transition-all duration-300">
              <span className="text-text-primary">FounderLink</span>
              <span className="text-primary">.ai</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.href}
                className={`
                  relative px-4 py-2 text-[13px] font-medium tracking-[0.01em]
                  transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
                  ${isActive(link.href)
                    ? 'text-text-primary'
                    : 'text-text-secondary hover:text-text-primary'
                  }
                `}
              >
                {link.name}
                <motion.span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: isActive(link.href) ? '24px' : 0 }}
                  transition={{ duration: DURATION.fast, ease: EASING.easeOut }}
                />
              </Link>
            ))}

            <div className="h-5 w-px bg-border mx-4" />

            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/dashboard"
                  className="px-4 py-2 text-[13px] font-medium text-text-secondary hover:text-text-primary transition-all duration-300"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-[13px] font-medium text-text-tertiary hover:text-text-primary transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-[13px] font-medium text-text-secondary hover:text-text-primary transition-all duration-300"
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
                    className="
                      group inline-flex items-center gap-2 bg-primary text-bg-primary
                      rounded-full px-5 py-2.5 text-[13px] font-semibold tracking-tight
                      transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                      hover:shadow-[0_8px_25px_rgb(0,212,255,0.35)]
                      focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-bg-primary
                    "
                  >
                    <Sparkles className="w-4 h-4" />
                    Start Building
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          <button
            className="
              md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full
              border border-border bg-bg-elevated hover:bg-bg-primary transition-all duration-300
              focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-bg-primary
            "
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={mobileMenuOpen ? "close" : "open"}
                initial={shouldAnimate ? { opacity: 0, rotate: -45, scale: 0.8 } : {}}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={shouldAnimate ? { opacity: 0, rotate: 45, scale: 0.8 } : {}}
                transition={{ duration: DURATION.fast, ease: EASING.easeOut }}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.div>
            </AnimatePresence>
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: DURATION.fast, ease: EASING.easeOut }}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: DURATION.normal, ease: EASING.easeOut, type: 'spring', stiffness: 400, damping: 35 }}
              className="md:hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3"
            >
              <div className="bg-bg-surface border border-border rounded-3xl p-6 sm:p-7 shadow-[0_20px_60px_rgb(0,0,0,0.35)]">
                <motion.div
                  className="flex flex-col gap-1"
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
                    <motion.div key={link.name} variants={fadeInUp}>
                      <Link
                        to={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`
                          px-4 py-3.5 text-sm font-medium rounded-2xl transition-all duration-300
                          ${isActive(link.href)
                            ? 'bg-primary/10 text-primary border border-primary/20'
                            : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated/60'
                          }
                        `}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}

                  <div className="my-4 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                  {user ? (
                    <>
                      <motion.div variants={fadeInUp}>
                        <Link
                          to="/dashboard"
                          onClick={() => setMobileMenuOpen(false)}
                          className="px-4 py-3.5 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-bg-elevated/50 rounded-2xl transition-all duration-300"
                        >
                          Dashboard
                        </Link>
                      </motion.div>
                      <motion.div variants={fadeInUp}>
                        <button
                          onClick={() => {
                            handleLogout();
                            setMobileMenuOpen(false);
                          }}
                          className="px-4 py-3.5 text-sm font-medium text-text-tertiary hover:text-text-primary hover:bg-bg-elevated/50 rounded-2xl transition-all duration-300 text-left w-full"
                        >
                          Logout
                        </button>
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <motion.div variants={fadeInUp}>
                        <Link
                          to="/login"
                          onClick={() => setMobileMenuOpen(false)}
                          className="px-4 py-3.5 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-bg-elevated/50 rounded-2xl transition-all duration-300"
                        >
                          Sign In
                        </Link>
                      </motion.div>
                      <motion.div variants={fadeInUp} className="mt-2">
                        <Link
                          to="/register"
                          onClick={() => setMobileMenuOpen(false)}
                          className="
                            inline-flex items-center justify-center gap-2 bg-primary text-bg-primary
                            rounded-2xl px-6 py-3.5 text-sm font-semibold w-full
                            transition-all duration-300
                          "
                        >
                          <Sparkles className="w-4 h-4" />
                          Start Building
                          <ArrowRight className="w-4 h-4" />
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
