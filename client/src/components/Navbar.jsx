import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`
            glass-ultra rounded-3xl px-6 sm:px-8 py-4
            flex items-center justify-between
            transition-all duration-500
            ${scrolled 
              ? 'shadow-2xl border-white/15' 
              : 'shadow-xl border-white/10'
            }
          `}
        >
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
          >
            <div className="relative">
              <Logo size="normal" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-xl font-black tracking-tight relative">
              <span className="text-white">FounderLink</span>
              <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                .ai
              </span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.href}
                className="group relative px-5 py-2.5 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
              >
                <span className="relative z-10">{link.name}</span>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-slate-500/30 to-transparent mx-2" />

            {user ? (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/dashboard" 
                  className="px-5 py-2.5 text-sm font-semibold text-slate-300 hover:text-white transition-colors rounded-xl hover:bg-white/5"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="px-5 py-2.5 text-sm font-semibold text-slate-400 hover:text-white transition-colors rounded-xl hover:bg-white/5"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login" 
                  className="px-5 py-2.5 text-sm font-semibold text-slate-300 hover:text-white transition-colors rounded-xl hover:bg-white/5"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="group relative overflow-hidden px-6 py-2.5 rounded-2xl text-sm font-black text-white transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 bg-[length:200%_200%] animate-[btn-gradient-shift_5s_ease_infinite]" />
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10 flex items-center space-x-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Start Building Free</span>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2.5 rounded-xl hover:bg-white/5 transition-colors text-slate-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4"
          >
            <div className="glass-ultra rounded-3xl p-6 border-white/10">
              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 text-lg font-semibold text-slate-200 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                  >
                    {link.name}
                  </Link>
                ))}
                
                <div className="my-3 h-px bg-gradient-to-r from-transparent via-slate-500/40 to-transparent" />

                {user ? (
                  <>
                    <Link 
                      to="/dashboard" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-3 text-lg font-semibold text-slate-200 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                    >
                      Dashboard
                    </Link>
                    <button 
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="px-4 py-3 text-lg font-semibold text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-3 text-lg font-semibold text-slate-200 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                    >
                      Sign In
                    </Link>
                    <Link 
                      to="/register" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="mt-2 btn-primary-gradient text-center px-6 py-3.5 rounded-2xl text-sm font-black text-white"
                    >
                      Start Building Free
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
