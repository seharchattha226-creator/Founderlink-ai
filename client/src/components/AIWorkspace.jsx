import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Brain, 
  TrendingUp, 
  Zap, 
  Sparkles, 
  MessageSquare, 
  Activity, 
  CheckCircle, 
  Lightbulb, 
  ArrowRight, 
  Rocket, 
  DollarSign, 
  Award, 
  Star,
  Cpu,
  LineChart,
  Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AIWorkspace() {
  const { user } = useAuth();
  const [activeFeature, setActiveFeature] = useState(0);
  const [counts, setCounts] = useState({ score: 0, growth: 0, tam: 0 });

  const features = [
    {
      title: "AI Idea Generator",
      description: "Validate your startup idea in seconds with AI-powered market analysis",
      icon: Zap,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20"
    },
    {
      title: "Co-founder Matching",
      description: "Find the perfect partner with skills that complement your strengths",
      icon: Sparkles,
      color: "from-cyan-500 to-blue-500",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20"
    },
    {
      title: "Market Intelligence",
      description: "Real-time TAM, SAM, SOM analysis with competitive landscape",
      icon: LineChart,
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20"
    }
  ];

  useEffect(() => {
    // Animate counters on mount
    const animateCounter = (key, target, duration = 2500) => {
      let start = 0;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCounts(prev => ({ ...prev, [key]: target }));
          clearInterval(timer);
        } else {
          setCounts(prev => ({ ...prev, [key]: Math.floor(start) }));
        }
      }, 16);
    };

    animateCounter('score', 96);
    animateCounter('growth', 2400);
    animateCounter('tam', 120);
  }, []);

  useEffect(() => {
    // Auto-rotate features
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="relative">
      {/* Main decorative elements */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl"></div>
      
      {/* Main container */}
      <div className="relative bg-gradient-to-br from-slate-900 via-indigo-950/50 to-slate-900 rounded-[2.5rem] p-6 sm:p-8 border border-white/10 overflow-hidden">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}></div>

        <div className="relative">
          {/* Header section */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-xl shadow-purple-500/25">
                <Cpu className="w-6 h-6 text-white"></Cpu>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">AI Co-founder Pro</h3>
                <p className="text-xs text-slate-400">Startup Intelligence Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-xs font-bold text-emerald-400">Active</span>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {counts.score}%
              </div>
              <p className="text-xs text-slate-400 mt-1">Success Score</p>
            </div>
            <div className="text-center p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {counts.growth}
              </div>
              <p className="text-xs text-slate-400 mt-1">Startups Launched</p>
            </div>
            <div className="text-center p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                ${counts.tam}B+
              </div>
              <p className="text-xs text-slate-400 mt-1">TAM Analyzed</p>
            </div>
          </div>

          {/* Feature showcase */}
          <div className="relative h-64 mb-8">
            <AnimatePresence mode="wait">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const isActive = activeFeature === index;
                if (!isActive) return null;
                
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className={`absolute inset-0 rounded-3xl ${feature.bgColor} ${feature.borderColor} border p-6 overflow-hidden`}
                  >
                    {/* Decorative gradient blob */}
                    <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${feature.color} rounded-full blur-3xl opacity-30`}></div>
                    
                    <div className="relative">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}>
                        <Icon className="w-7 h-7 text-white"></Icon>
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                      <p className="text-slate-300 text-sm leading-relaxed">{feature.description}</p>
                      
                      {/* Action button */}
                      <Link 
                        to={user ? "/ai-tools" : "/register"} 
                        className="mt-6 inline-flex items-center space-x-2 px-5 py-2.5 bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl transition-all duration-300"
                      >
                        <span className="text-sm font-semibold text-white">Try Now</span>
                        <ArrowRight className="w-4 h-4 text-white"></ArrowRight>
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
            
            {/* Feature dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeFeature === index ? 'w-8 bg-white' : 'bg-white/30 hover:bg-white/50'
                  }`}
                ></button>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-2 gap-3">
            <Link 
              to={user ? "/dashboard" : "/register"} 
              className="group flex items-center justify-center space-x-2 p-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 shadow-lg shadow-purple-500/25"
            >
              <Rocket className="w-5 h-5 text-white"></Rocket>
              <span className="text-sm font-bold text-white">Launch Startup</span>
            </Link>
            
            <Link 
              to={user ? "/ai-tools" : "/register"} 
              className="group flex items-center justify-center space-x-2 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
            >
              <MessageSquare className="w-5 h-5 text-slate-300 group-hover:text-white"></MessageSquare>
              <span className="text-sm font-semibold text-slate-300 group-hover:text-white">AI Chat</span>
            </Link>
          </div>

          {/* Trust indicator */}
          <div className="mt-8 pt-6 border-t border-white/5">
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 border-2 border-[#0f1117] flex items-center justify-center">
                    <span className="text-xs font-bold text-slate-300">U{i}</span>
                  </div>
                ))}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-1.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400"></Star>
                  ))}
                  <span className="text-sm font-semibold text-slate-200 ml-2">4.9/5</span>
                </div>
                <p className="text-xs text-slate-500">Trusted by 15,000+ founders</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
