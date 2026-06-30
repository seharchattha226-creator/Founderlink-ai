import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Star,
  Zap
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import AIWorkspace from '../components/AIWorkspace';
import IntroScreen from '../components/IntroScreen';

export default function Landing() {
  const { user } = useAuth();
  const [showIntro, setShowIntro] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredButton, setHoveredButton] = useState(null);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trust metrics
  const trustMetrics = [
    { value: '15,000+', label: 'Validated Startups' },
    { value: '96%', label: 'Founder Satisfaction' },
    { value: '$120M+', label: 'Funding Enabled' },
    { value: '4.9/5', label: 'User Rating' }
  ];

  // Features data
  const features = [
    { icon: Sparkles, title: 'AI Idea Formulation', description: 'Generate unique, market-ready business models tailored to your expertise and industry trends.', color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/30' },
    { icon: Zap, title: 'Startup Validation', description: 'Validate your concept with AI-powered market analysis and competitive intelligence.', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' },
    { icon: Star, title: 'Co-Founder Matching', description: 'Find the perfect technical or business co-founder based on skills, vision, and compatibility.', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
    { icon: Zap, title: 'SWOT Analysis', description: 'Comprehensive SWOT analysis with actionable recommendations to strengthen your startup.', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
    { icon: ArrowRight, title: 'Growth Projections', description: 'Data-driven 12-month growth projections with KPIs and milestone tracking.', color: 'text-fuchsia-400', bg: 'bg-fuchsia-500/10', border: 'border-fuchsia-500/30' },
    { icon: Sparkles, title: 'Funding Readiness', description: 'Prepare your pitch deck and financials to attract investors and secure funding.', color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/30' }
  ];

  // Testimonials
  const testimonials = [
    { quote: 'FounderLink AI helped us validate our idea in 48 hours and find a technical co-founder within 2 weeks. Game changer!', author: 'Alex Chen', role: 'CEO, TechFlow', stars: 5 },
    { quote: 'The SWOT analysis and growth projections saved us months of planning. We raised $2.5M seed using their insights.', author: 'Maya Patel', role: 'CTO, NovaAI', stars: 5 }
  ];

  return (
    <>
      <AnimatePresence>
        {showIntro && <IntroScreen onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>

      <div className="min-h-screen cosmic-bg relative transition-opacity duration-1000 overflow-x-hidden" style={{ opacity: showIntro ? 0 : 1 }}>
        <div className="noise-overlay z-[9999]"></div>
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="aurora-blob aurora-1"></div>
          <div className="aurora-blob aurora-2"></div>
          <div className="aurora-blob aurora-3"></div>
        </div>
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="orb-1 animate-orb-float"></div>
          <div className="orb-2 animate-orb-float" style={{ animationDelay: '3s' }}></div>
          <div className="orb-3 animate-orb-float" style={{ animationDelay: '6s' }}></div>
        </div>
        
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          {[...Array(30)].map((_, i) => {
            const size = Math.random() * 4 + 1;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const delay = Math.random() * 2;
            const duration = 10 + Math.random() * 10;
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
                  animation: `floatParticle ${duration}s ease-in-out infinite`,
                  animationDelay: `${delay}s`,
                  opacity: 0.25 + Math.random() * 0.35,
                  boxShadow: `0 0 ${4 + Math.random() * 8}px ${color}`
                }}
              />
            );
          })}
        </div>

        <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 z-[1000] origin-left" style={{ width: `${scrollProgress}%` }}></div>

        <Navbar />

        <section className="relative pt-40 pb-24 sm:pt-52 sm:pb-36 z-10">
          <div className="hero-radial-light"></div>
          <div className="hero-grid-texture"></div>
          
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-6 space-y-8 relative z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }} className="inline-flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-violet-500/10 via-indigo-500/10 to-cyan-500/10 border border-violet-500/25 rounded-full text-sm font-semibold text-violet-200 shadow-lg shadow-violet-500/10">
                  <Sparkles className="w-4 h-4 text-violet-400 animate-pulse-glow"></Sparkles>
                  <span>The AI Operating System for Founders</span>
                </motion.div>

                <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }} className="text-5xl sm:text-6xl lg:text-[80px] font-black tracking-tighter leading-[0.9]">
                  Your AI Co-founder
                  <br />
                  <span className="gradient-text-hero drop-shadow-[0_0_30px_rgba(99,102,241,0.3)]">For Billion-Dollar Startups</span>
                </motion.h1>

                <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }} className="text-lg sm:text-xl text-slate-400 leading-relaxed max-w-xl font-medium">
                  Launch smarter, build faster, and scale with confidence. Validate your idea, find co-founders, analyze markets, and prepare for funding—all in one beautiful, premium platform.
                </motion.p>

                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }} className="flex items-center space-x-5">
                  <div className="flex -space-x-3">
                    {['Alex Chen', 'Sam Rivera', 'Maya Patel', 'James Wilson'].map((name, i) => (
                      <div key={name} className="w-10 h-10 rounded-full border-2 border-[#05030a] bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center overflow-hidden" style={{ zIndex: 10 - i }}>
                        <span className="text-xs font-bold text-slate-200">{name.charAt(0)}</span>
                      </div>
                    ))}
                    <div className="w-11 h-11 rounded-full border-2 border-[#05030a] bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center z-0 shadow-lg shadow-cyan-500/20 overflow-hidden">
                      <span className="text-[9px] font-black text-white tracking-tighter">15k+</span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center space-x-1.5">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-4.5 h-4.5 text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.3)]"></Star>)}
                      <span className="text-white font-semibold text-sm ml-1">4.9/5</span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wide">Trusted by 15,000+ founders</span>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }} className="flex flex-col sm:flex-row gap-4">
                  <Link to={user ? '/dashboard' : '/register'} onMouseEnter={() => setHoveredButton(0)} onMouseLeave={() => setHoveredButton(null)} className="btn-primary-gradient group relative overflow-hidden px-8 py-4 rounded-full text-base font-black text-white transition-all duration-300 hover:scale-105 active:scale-98 flex items-center justify-center space-x-2 shadow-2xl shadow-violet-500/20">
                    <span className="relative z-10 flex items-center space-x-2">
                      <span>Start Building Free</span>
                      <ArrowRight className={`w-4.5 h-4.5 transition-all duration-300 ${hoveredButton === 0 ? 'translate-x-1' : ''}`}></ArrowRight>
                    </span>
                  </Link>
                  
                  <Link to="/contact" onMouseEnter={() => setHoveredButton(1)} onMouseLeave={() => setHoveredButton(null)} className="btn-secondary-glass group px-8 py-4 rounded-full text-base font-semibold text-slate-200 hover:text-white transition-all duration-300 hover:scale-105 active:scale-98 flex items-center justify-center space-x-2 border border-white/10">
                    <span className="flex items-center space-x-2">
                      <span>Book Live Demo</span>
                    </span>
                  </Link>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }} className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
                  {trustMetrics.map((metric, i) => (
                    <div key={i} className="glass-ultra rounded-2xl p-4 sm:p-5 text-center metric-card-glow backdrop-blur-3xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10">
                      <div className="text-2xl sm:text-3xl font-black text-white">{metric.value}</div>
                      <div className="text-[11px] text-slate-500 uppercase font-semibold tracking-wide mt-1.5">{metric.label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>

              <motion.div initial={{ opacity: 0, scale: 0.92, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: 'spring', stiffness: 55, damping: 18, delay: 0.18, duration: 0.8 }} className="lg:col-span-6 relative w-full z-10">
                <AIWorkspace />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 border-y border-white/5 bg-gradient-to-b from-white/[0.01] to-transparent z-10 relative">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-8">Trusted by founders backed by</p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
              {['Y Combinator', 'Sequoia', 'a16z', 'Founders Fund', 'General Catalyst', 'Index Ventures'].map((logo, i) => (
                <span key={i} className="logo-fade text-lg sm:text-xl font-black text-slate-300 tracking-tight select-none opacity-70 hover:opacity-100 transition-opacity duration-300">{logo}</span>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="py-32 relative z-10">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="inline-flex items-center space-x-2 px-5 py-2 bg-violet-500/10 border border-violet-500/25 text-violet-300 text-xs font-bold rounded-full uppercase tracking-wide mb-5">
                <Sparkles className="w-4 h-4"></Sparkles>
                <span>Everything You Need</span>
              </span>
              <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.05] mb-5">Your All-in-One Founder Toolkit</h2>
              <p className="text-slate-400 text-lg sm:text-xl font-medium">From idea to exit, FounderLink AI has every tool you need to build a world-class startup.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ delay: i * 0.1, duration: 0.7, ease: 'easeOut' }} whileHover={{ y: -8, scale: 1.02 }} className="glass-ultra glass-ultra-glow rounded-3xl p-8 sm:p-9 cursor-pointer group">
                  <div className={`${feature.bg} ${feature.border} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500 shadow-lg shadow-violet-500/10`}>
                    <Icon className={`w-8 h-8 ${feature.color}`}></Icon>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-medium">{feature.description}</p>
                </motion.div>;
              })}
            </div>
          </div>
        </section>

        <section className="py-32 relative z-10 border-t border-white/5 bg-gradient-to-b from-transparent to-white/[0.01]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="inline-flex items-center space-x-2 px-5 py-2 bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-bold rounded-full uppercase tracking-wide mb-5">
                <Star className="w-4 h-4 fill-current"></Star>
                <span>Founder Stories</span>
              </span>
              <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.05] mb-5">Trusted by thousands of founders</h2>
              <p className="text-slate-400 text-lg sm:text-xl font-medium">Hear how high-growth startups are using FounderLink AI to build better startups faster.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ delay: i * 0.15, duration: 0.7, ease: 'easeOut' }} whileHover={{ y: -4, scale: 1.01 }} className="glass-ultra glass-ultra-glow rounded-3xl p-10 sm:p-12 border border-white/10">
                  <div className="flex space-x-1 mb-6">{[...Array(testimonial.stars)].map((_, j) => <Star key={j} className="w-6 h-6 text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.3)]"></Star>)}</div>
                  <p className="text-lg sm:text-xl text-slate-200 leading-relaxed mb-10 font-medium">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-lg shadow-violet-500/20">{testimonial.author.charAt(0)}</div>
                    <div className="ml-4">
                      <div className="font-bold text-white">{testimonial.author}</div>
                      <div className="text-sm text-slate-500">{testimonial.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 relative z-10">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <div className="glass-ultra glass-ultra-glow rounded-[2.5rem] p-10 sm:p-16 relative overflow-hidden border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-violet-500/15 to-fuchsia-500/20"></div>
              <div className="relative z-10">
                <span className="inline-flex items-center space-x-2 px-5 py-2 bg-white/5 border border-white/10 text-cyan-200 text-xs font-bold rounded-full uppercase tracking-wide mb-6">
                  <Sparkles className="w-4 h-4"></Sparkles>
                  <span>Ready to Start?</span>
                </span>
                <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.05] mb-6">Build your startup with AI today</h2>
                <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto font-medium">Join 15,000+ founders using FounderLink AI to validate ideas, find co-founders, and build world-class startups.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to={user ? '/dashboard' : '/register'} className="btn-primary-gradient group relative overflow-hidden px-10 py-4 rounded-full text-base font-black text-white transition-all duration-300 hover:scale-105 active:scale-98 inline-flex items-center space-x-2 shadow-2xl shadow-violet-500/20">
                    <span className="relative z-10 flex items-center space-x-2">
                      <span>Start Building Free</span>
                      <ArrowRight className="w-4.5 h-4.5 transition-transform duration-300 group-hover:translate-x-1"></ArrowRight>
                    </span>
                  </Link>
                  <Link to="/contact" className="btn-secondary-glass group px-10 py-4 rounded-full text-base font-semibold text-slate-200 hover:text-white transition-all duration-300 hover:scale-105 active:scale-98 inline-flex items-center space-x-2 border border-white/10">
                    <span className="flex items-center space-x-2">
                      <Zap className="w-4.5 h-4.5"></Zap>
                      <span>Talk to Sales</span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
