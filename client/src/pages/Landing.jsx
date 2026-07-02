import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Zap,
  Target,
  Users,
  TrendingUp,
  Briefcase,
  Lightbulb,
  LineChart,
  CheckCircle2,
  ArrowUpRight,
  Cpu,
  BarChart2,
  Layers,
  PlayCircle,
  Brain,
  User,
  Clock,
  BarChart3,
  DollarSign,
  Award,
  Rocket,
  FileText,
  Search,
  PieChart,
  Calendar,
  Check,
  Activity,
  TrendingDown,
  Shield,
  Lock,
  Eye,
  RefreshCw,
  Code,
  Server,
  Globe,
  CreditCard,
  HelpCircle,
  Star,
  XCircle,
  Plus
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

// Mock data
const aiSteps = [
  { id: 1, label: 'Idea Validation', active: true, completed: true },
  { id: 2, label: 'Market Analysis', active: true, completed: false },
  { id: 3, label: 'Co-founder Matching', active: false, completed: false },
  { id: 4, label: 'Roadmap Generation', active: false, completed: false },
  { id: 5, label: 'Funding Readiness', active: false, completed: false },
];

const recommendations = [
  {
    id: 1,
    type: 'Market Insight',
    title: 'B2B SaaS for remote teams shows 240% YoY growth',
    priority: 'High',
    color: 'text-primary',
  },
  {
    id: 2,
    type: 'Co-founder Match',
    title: 'Alex Chen (CTO, ex-Stripe) — 92% compatibility',
    priority: 'Medium',
    color: 'text-secondary',
  },
  {
    id: 3,
    type: 'Risk Warning',
    title: 'Consider IP protection strategy for core algorithm',
    priority: 'Low',
    color: 'text-warning',
  },
];

const founders = [
  { name: 'Sarah K.', role: 'CEO at ScaleFlow', avatar: 'SK', color: 'from-primary to-blue-500' },
  { name: 'Marcus J.', role: 'CTO at NovaAI', avatar: 'MJ', color: 'from-secondary to-emerald-500' },
  { name: 'Emily R.', role: 'Founder at GreenTech', avatar: 'ER', color: 'from-violet-500 to-purple-600' },
];

const metrics = [
  { label: 'Validation Score', value: '87%', change: '+12%' },
  { label: 'TAM Estimate', value: '$24B', change: '+8%' },
  { label: 'Co-founder Fit', value: '91%', change: '+5%' },
];

export default function Landing() {
  const { user } = useAuth();
  const [activeStep, setActiveStep] = useState(2);
  const [progress, setProgress] = useState(35);
  const [typingText, setTypingText] = useState('Analyzing competitive landscape in enterprise SaaS...');

  useEffect(() => {
    const texts = [
      'Analyzing competitive landscape in enterprise SaaS...',
      'Calculating TAM, SAM, SOM for North America...',
      'Matching your skills with potential co-founders...',
      'Generating 12-month product roadmap...',
      'Preparing pitch deck outline for seed investors...',
    ];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % texts.length;
      setTypingText(texts[index]);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary overflow-x-hidden">
      <div className="noise-overlay" />
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 sm:pt-40 lg:pt-48 pb-64 sm:pb-72 lg:pb-80 overflow-hidden">
        {/* Background - Matte Black with Single Soft Radial Light */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] bg-primary/5 rounded-full blur-[240px] pointer-events-none" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Premium Hero Layout - Text + Product Canvas */}
          <div className="space-y-36">
            {/* Headline & CTAs */}
            <div className="text-center max-w-5xl mx-auto space-y-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="inline-flex items-center gap-3 px-6 py-3 bg-bg-surface/85 border border-border/50 rounded-full text-caption text-text-tertiary backdrop-blur-xl"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse-soft" />
                <span>AI Operating System for Founders</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                className="text-[72px] sm:text-[80px] lg:text-[96px] leading-[0.88] font-semibold tracking-[-0.04em]"
              >
                Build. Validate. Scale.
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/95 to-secondary">
                  In one place.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="text-[18px] sm:text-[20px] text-text-secondary leading-[1.8] max-w-2xl mx-auto"
              >
                FounderLink orchestrates every stage of your startup journey — from idea to investor-ready.
                An AI co-founder that actually builds alongside you.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className="flex flex-col sm:flex-row items-center justify-center gap-6"
              >
                <Link
                  to={user ? "/dashboard" : "/register"}
                  className="group inline-flex items-center justify-center gap-3 bg-primary text-bg-primary rounded-full px-10 h-16 font-medium text-[16px] transition-all duration-400 hover:bg-primary/90 hover:-translate-y-2 hover:shadow-[0_16px_64px_rgba(0,212,255,0.35)] active:translate-y-0 active:scale-[0.99]"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Start Building</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>

                <Link
                  to="/about"
                  className="group inline-flex items-center justify-center gap-3 bg-bg-surface/60 text-text-primary rounded-full px-10 h-16 font-medium text-[16px] border border-border/70 transition-all duration-400 hover:border-white/20 hover:bg-bg-surface/80 active:scale-[0.99] backdrop-blur-xl"
                >
                  <PlayCircle className="w-5 h-5" />
                  <span>Watch Demo</span>
                </Link>
              </motion.div>
            </div>

            {/* Product Canvas - Founder Command Center */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
              className="relative"
            >
              {/* Floating Product Modules */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
                {/* Large Card: AI Startup Analysis */}
                <motion.div
                  initial={{ opacity: 0, x: -24, y: 24 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.6, ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="lg:col-span-7 bg-bg-surface/85 border border-border/50 rounded-3xl p-8 backdrop-blur-2xl hover:border-border/80 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.18)]"
                >
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/20">
                        <Brain className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">Startup Analysis</h3>
                        <p className="text-sm text-text-tertiary">Project: NovaScale AI</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2.5 h-2.5 rounded-full bg-success animate-pulse-soft" />
                      <span className="text-success font-medium">Processing</span>
                    </div>
                  </div>

                  {/* AI Processing Steps */}
                  <div className="space-y-5 mb-8">
                    {[
                      { label: 'Market Validation', status: 'completed', value: 'TAM: $24B' },
                      { label: 'Competitive Landscape', status: 'active', value: '17 competitors' },
                      { label: 'Co-founder Matching', status: 'pending', value: '92% compatibility' },
                      { label: 'Product Roadmap', status: 'pending', value: '12 months' }
                    ].map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + i * 0.12, ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
                        className={`flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 ${
                          step.status === 'completed' ? 'bg-success/5 border-success/20' :
                          step.status === 'active' ? 'bg-primary/5 border-primary/30' :
                          'bg-bg-primary border-border/50'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            step.status === 'completed' ? 'bg-success/10 text-success' :
                            step.status === 'active' ? 'bg-primary/10 text-primary' :
                            'bg-bg-elevated text-text-tertiary'
                          }`}>
                            {step.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> :
                             step.status === 'active' ? <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse-soft" /> :
                             <span className="text-sm font-medium">{i + 1}</span>}
                          </div>
                          <span className={`font-medium ${
                            step.status === 'completed' ? 'text-text-primary' :
                            step.status === 'active' ? 'text-text-primary' :
                            'text-text-tertiary'
                          }`}>
                            {step.label}
                          </span>
                        </div>
                        <span className={`text-sm ${
                          step.status === 'completed' ? 'text-success' :
                          step.status === 'active' ? 'text-primary' :
                          'text-text-tertiary'
                        }`}>
                          {step.value}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Typing Indicator */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.45, ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
                    className="flex items-center gap-3 text-sm bg-bg-primary border border-border/50 rounded-2xl px-7 py-5"
                  >
                    <span className="flex gap-1.5">
                      <span className="w-2 h-2 bg-text-tertiary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-text-tertiary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-text-tertiary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                    <span className="text-text-secondary">Analyzing pitch deck structure...</span>
                  </motion.div>
                </motion.div>

                {/* Right Column - Stacked Cards */}
                <div className="lg:col-span-5 space-y-6">
                  {/* Investor Score Card */}
                  <motion.div
                    initial={{ opacity: 0, x: 24, y: -24 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.7, ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
                    whileHover={{ y: -6, scale: 1.01 }}
                    className="bg-bg-surface/85 border border-border/50 rounded-3xl p-8 backdrop-blur-2xl hover:border-border/80 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.18)]"
                  >
                    <div className="flex items-center justify-between mb-7">
                      <div>
                        <h3 className="text-lg font-semibold">Investor Score</h3>
                        <p className="text-sm text-text-tertiary">Updated 12s ago</p>
                      </div>
                      <Layers className="w-5 h-5 text-text-tertiary" />
                    </div>
                    <div className="flex items-center justify-center mb-8">
                      <div className="relative w-40 h-40">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="40" stroke="rgba(42,42,51,1)" strokeWidth="10" fill="none" />
                          <motion.circle
                            initial={{ strokeDasharray: 251.2, strokeDashoffset: 251.2 }}
                            animate={{ strokeDashoffset: 27.632 }}
                            transition={{ duration: 2.6, delay: 0.85, ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
                            cx="50" cy="50" r="40"
                            stroke="url(#health-gradient-hero)"
                            strokeWidth="10" fill="none"
                            strokeDasharray="251.2" strokeLinecap="round"
                          />
                          <defs>
                            <linearGradient id="health-gradient-hero" x1="0" y1="0" x2="100" y2="100">
                              <stop offset="0%" stopColor="#00D4FF" />
                              <stop offset="100%" stopColor="#00E5A8" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <motion.span
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.05, duration: 0.9, ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
                            className="text-4xl font-semibold"
                          >89</motion.span>
                          <span className="text-xs text-text-tertiary">/100</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-text-secondary text-center">Top 7% of early-stage startups</p>
                  </motion.div>

                  {/* Metrics Cards Row */}
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { icon: TrendingUp, label: 'Validation Score', value: '87%', change: '+12%' },
                      { icon: BarChart3, label: 'TAM Estimate', value: '$24B', change: '+8%' }
                    ].map((metric, i) => {
                      const Icon = metric.icon;
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.95 + i * 0.12, ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
                          whileHover={{ y: -3, scale: 1.02 }}
                          className="bg-bg-surface/85 border border-border/50 rounded-3xl p-7 backdrop-blur-2xl hover:border-border/80 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.18)]"
                        >
                          <div className="flex items-center justify-between mb-5">
                            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                              <Icon className="w-5.5 h-5.5 text-primary" />
                            </div>
                            <span className="text-success text-xs flex items-center gap-1">
                              <ArrowUpRight className="w-3.5 h-3.5" />
                              {metric.change}
                            </span>
                          </div>
                          <p className="text-xs text-text-tertiary mb-1.5">{metric.label}</p>
                          <motion.p
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.15 + i * 0.12, ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
                            className="text-2xl font-semibold"
                          >
                            {metric.value}
                          </motion.p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Row: Growth Chart + Recommendations */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 1.05, ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="lg:col-span-5 bg-bg-surface/85 border border-border/50 rounded-3xl p-8 backdrop-blur-2xl hover:border-border/80 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.18)]"
                >
                  <div className="flex items-center justify-between mb-7">
                    <div>
                      <h3 className="text-lg font-semibold">12-Month Growth</h3>
                      <p className="text-sm text-text-tertiary">ARR Projection</p>
                    </div>
                    <BarChart2 className="w-5 h-5 text-text-tertiary" />
                  </div>
                  <div className="h-36 flex items-end gap-2.5 px-1.5">
                    {[18, 28, 36, 32, 48, 62, 75, 70, 85, 96, 90, 100].map((height, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 1.1, delay: 1.25 + i * 0.07, ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
                        className={`flex-1 rounded-t-lg transition-colors ${
                          i >= 9
                            ? 'bg-gradient-to-t from-primary to-primary/40'
                            : 'bg-bg-elevated'
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 1.15, ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="lg:col-span-7 bg-bg-surface/85 border border-border/50 rounded-3xl p-8 backdrop-blur-2xl hover:border-border/80 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.18)]"
                >
                  <div className="flex items-center justify-between mb-7">
                    <h3 className="text-lg font-semibold">AI Recommendations</h3>
                    <span className="text-xs text-text-tertiary">4 new insights</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[
                      { type: 'Market Insight', title: 'B2B SaaS shows 240% YoY growth', priority: 'High' },
                      { type: 'Co-founder Match', title: 'Alex Chen (CTO, ex-Stripe)', priority: 'Medium' },
                      { type: 'Risk Warning', title: 'Consider IP protection strategy', priority: 'Low' },
                      { type: 'Funding Tip', title: 'Seed investors prefer 18-month runway', priority: 'High' }
                    ].map((rec, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.45 + i * 0.12, ease: "cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
                        className="flex items-start gap-4 p-5 rounded-2xl bg-bg-primary hover:bg-bg-elevated transition-all duration-300 cursor-pointer border border-border/50 hover:border-white/15"
                      >
                        <div className="mt-1.5">
                          <div className={`w-2.5 h-2.5 rounded-full ${rec.priority === 'High' ? 'bg-primary' : rec.priority === 'Medium' ? 'bg-secondary' : 'bg-warning'}`} />
                        </div>
                        <div className="flex-1">
                          <p className={`text-xs font-semibold mb-1.5 ${rec.priority === 'High' ? 'text-primary' : rec.priority === 'Medium' ? 'text-secondary' : 'text-warning'}`}>{rec.type}</p>
                          <p className="text-sm text-text-secondary">{rec.title}</p>
                        </div>
                        <ArrowRight className="w-4.5 h-4.5 text-text-tertiary" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-24 sm:py-32 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <span className="badge-primary mb-5">Product Preview</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 leading-tight">
              Meet your <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">AI Co-Founder</span>
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed max-w-xl mx-auto">
              A single, intelligent workspace that orchestrates every stage of your startup journey — from idea to investor-ready.
            </p>
          </motion.div>

          {/* Premium Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
            {/* 1. AI Co-Founder Assistant (Primary) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="lg:col-span-7 bg-bg-surface/92 border border-border/65 rounded-[28px] p-8 lg:p-9 shadow-[0_2px_8px_rgba(0,0,0,0.08)] backdrop-blur-2xl hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] hover:border-border/90 transition-all duration-400"
            >
              <div className="flex items-center gap-5 mb-8">
                <div className="w-16 h-16 rounded-[22px] bg-gradient-to-br from-primary/22 to-secondary/22 flex items-center justify-center border border-primary/15 shadow-inner">
                  <Brain className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">Nova</h3>
                  <p className="text-sm text-text-tertiary">Your AI Co-Founder</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-success animate-pulse" />
                  <span className="text-xs font-medium text-text-secondary">Online</span>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-[14px] bg-bg-primary border border-border/65 flex items-center justify-center shadow-sm">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="bg-bg-primary border border-border/65 rounded-[20px] rounded-tl-none p-5 max-w-[80%] shadow-sm">
                    <p className="text-base text-text-secondary">How's our investor readiness looking? Do we need to refine the pitch deck?</p>
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-primary/22 to-secondary/22 border border-primary/15 flex items-center justify-center shadow-sm">
                    <Brain className="w-5 h-5 text-primary" />
                  </div>
                  <div className="bg-gradient-to-br from-primary/6 to-secondary/6 border border-primary/15 rounded-[20px] rounded-tr-none p-5 max-w-[85%] shadow-sm">
                    <p className="text-base text-text-secondary mb-4">
                      Great question! Let's break down your current investor readiness:
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-success" />
                        <span>Market analysis complete (TAM: $24B)</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-success" />
                        <span>Product roadmap generated (12 months)</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Clock className="w-5 h-5 text-primary" />
                        <span>Refining financial projections (78% done)</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="flex items-center gap-4 bg-bg-primary border border-border/65 rounded-[20px] p-5 shadow-sm">
                <div className="flex gap-2">
                  <span className="w-2 h-2 bg-text-tertiary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-text-tertiary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-text-tertiary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-sm text-text-tertiary">Analyzing pitch deck structure...</span>
              </div>
            </motion.div>

            {/* 2. Startup Health Score (Secondary) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="lg:col-span-5 bg-bg-surface/92 border border-border/65 rounded-[28px] p-8 lg:p-9 shadow-[0_2px_8px_rgba(0,0,0,0.08)] backdrop-blur-2xl hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] hover:border-border/90 transition-all duration-400"
            >
              <div className="flex items-center justify-between mb-7">
                <h3 className="text-xl font-semibold">Startup Health Score</h3>
                <span className="text-xs text-text-tertiary">Real-time</span>
              </div>
              <div className="flex items-center justify-center mb-8">
                <div className="relative w-36 h-36 sm:w-44 sm:h-44">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="rgba(42,42,51,0.75)" strokeWidth="11" fill="none" />
                    <motion.circle
                      initial={{ strokeDasharray: 251.2, strokeDashoffset: 251.2 }}
                      whileInView={{ strokeDashoffset: 27.632 }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="url(#health-gradient)"
                      strokeWidth="11"
                      fill="none"
                      strokeDasharray="251.2"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="health-gradient" x1="0" y1="0" x2="100" y2="100">
                        <stop offset="0%" stopColor="#00D4FF" />
                        <stop offset="100%" stopColor="#00E5A8" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="text-4xl font-semibold"
                    >89</motion.div>
                    <span className="text-sm text-text-tertiary">Score</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4.5">
                {[
                  { label: "Product", value: 92, color: "text-primary" },
                  { label: "Market", value: 85, color: "text-secondary" },
                  { label: "Team", value: 88, color: "text-success" },
                  { label: "Funding", value: 78, color: "text-warning" }
                ].map((item, i) => (
                  <div key={i} className="bg-bg-primary border border-border/65 rounded-[18px] p-5.5 shadow-sm hover:shadow-md transition-all duration-400">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-xs text-text-tertiary">{item.label}</span>
                      <span className={`text-base font-semibold ${item.color}`}>{item.value}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-bg-elevated/65 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, delay: i * 0.12 }}
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 3. Market Opportunity (Secondary) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="lg:col-span-6 bg-bg-surface/92 border border-border/65 rounded-[28px] p-8 lg:p-9 shadow-[0_2px_8px_rgba(0,0,0,0.08)] backdrop-blur-2xl hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] hover:border-border/90 transition-all duration-400"
            >
              <div className="flex items-center justify-between mb-7">
                <h3 className="text-xl font-semibold">Market Opportunity</h3>
                <BarChart3 className="w-5.5 h-5.5 text-text-tertiary" />
              </div>
              <div className="grid grid-cols-3 gap-4.5 mb-8">
                {[
                  { label: "TAM", value: "$24B", change: "+12%" },
                  { label: "SAM", value: "$4.8B", change: "+8%" },
                  { label: "SOM", value: "$480M", change: "+6%" }
                ].map((item, i) => (
                  <div key={i} className="bg-bg-primary border border-border/65 rounded-[18px] p-5.5 text-center shadow-sm hover:shadow-md transition-all duration-400">
                    <p className="text-xs text-text-tertiary mb-2">{item.label}</p>
                    <motion.p
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="text-2xl font-semibold mb-1"
                    >{item.value}</motion.p>
                    <p className="text-xs text-success flex items-center justify-center gap-1">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      {item.change}
                    </p>
                  </div>
                ))}
              </div>
              <div className="h-36 flex items-end gap-3 px-3.5 bg-bg-primary rounded-[20px] p-4.5 border border-border/45">
                {[25, 40, 35, 55, 70, 65, 85, 90, 80, 95, 100].map((height, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${height}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: i * 0.08 }}
                    className={`flex-1 rounded-t-[14px] transition-all duration-400 ${
                      i >= 8 ? "bg-gradient-to-t from-primary to-primary/32" : "bg-bg-elevated/75"
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            {/* 4. Funding Readiness (Secondary) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="lg:col-span-6 bg-bg-surface/92 border border-border/65 rounded-[28px] p-8 lg:p-9 shadow-[0_2px_8px_rgba(0,0,0,0.08)] backdrop-blur-2xl hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] hover:border-border/90 transition-all duration-400"
            >
              <div className="flex items-center justify-between mb-7">
                <h3 className="text-xl font-semibold">Funding Readiness</h3>
                <DollarSign className="w-5.5 h-5.5 text-text-tertiary" />
              </div>
              <div className="space-y-4.5">
                {[
                  { label: "Pitch Deck", done: true },
                  { label: "Financial Projections", done: true },
                  { label: "Market Analysis", done: true },
                  { label: "Competitive Landscape", done: false },
                  { label: "Investor Outreach List", done: false }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4.5 p-5 bg-bg-primary border border-border/65 rounded-[18px] hover:bg-bg-elevated/65 hover:border-border/90 hover:shadow-md transition-all duration-400">
                    <div className={`w-10 h-10 rounded-[14px] flex items-center justify-center ${
                      item.done ? "bg-success/10 text-success" : "bg-bg-elevated text-text-tertiary"
                    }`}>
                      {item.done ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${item.done ? "text-text-primary" : "text-text-secondary"}`}>
                        {item.label}
                      </p>
                      <p className="text-xs text-text-tertiary">
                        {item.done ? "Completed" : "In progress"}
                      </p>
                    </div>
                    <span className={`text-xs font-semibold px-3.5 py-1.5 rounded-full ${
                      item.done ? "bg-success/10 text-success" : "bg-primary/10 text-primary"
                    }`}>
                      {item.done ? "100%" : "75%"}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 5. Recent Activity (Supporting) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="lg:col-span-5 bg-bg-surface/92 border border-border/65 rounded-[28px] p-8 lg:p-9 shadow-[0_2px_8px_rgba(0,0,0,0.08)] backdrop-blur-2xl hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] hover:border-border/90 transition-all duration-400"
            >
              <div className="flex items-center justify-between mb-7">
                <h3 className="text-xl font-semibold">Recent Activity</h3>
                <span className="text-xs text-text-tertiary">Today</span>
              </div>
              <div className="space-y-4.5">
                {[
                  { icon: Zap, label: "Generated new SaaS idea", time: "2 min ago" },
                  { icon: Brain, label: "Business analysis completed", time: "15 min ago" },
                  { icon: TrendingUp, label: "Created product roadmap", time: "1 hour ago" },
                  { icon: Award, label: "Investor score updated", time: "3 hours ago" }
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center gap-4.5 p-3.5 rounded-[18px] hover:bg-bg-primary/65 transition-colors">
                      <div className="w-10 h-10 rounded-[14px] bg-primary/10 flex items-center justify-center shadow-sm">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-text-secondary">{item.label}</p>
                        <p className="text-xs text-text-tertiary">{item.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* 6. AI Recommendations (Supporting) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 }}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="lg:col-span-7 bg-bg-surface/92 border border-border/65 rounded-[28px] p-8 lg:p-9 shadow-[0_2px_8px_rgba(0,0,0,0.08)] backdrop-blur-2xl hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] hover:border-border/90 transition-all duration-400"
            >
              <div className="flex items-center justify-between mb-7">
                <h3 className="text-xl font-semibold">AI Recommendations</h3>
                <span className="text-xs text-text-tertiary">4 new insights</span>
              </div>
              <div className="space-y-4.5">
                {[
                  {
                    priority: "High",
                    type: "Market Insight",
                    text: "B2B SaaS for remote teams shows 240% YoY growth in North America"
                  },
                  {
                    priority: "Medium",
                    type: "Co-founder Match",
                    text: "Alex Chen (CTO, ex-Stripe) — 92% compatibility score"
                  },
                  {
                    priority: "Low",
                    type: "Risk Warning",
                    text: "Consider IP protection strategy for core algorithm"
                  }
                ].map((rec, i) => (
                  <div key={i} className="flex items-start gap-4.5 p-5 bg-bg-primary border border-border/65 rounded-[18px] hover:bg-bg-elevated/65 hover:border-border/90 hover:shadow-md transition-all duration-400">
                    <div className="mt-1.5">
                      <div className={`w-3 h-3 rounded-full ${
                        rec.priority === "High" ? "bg-primary" :
                        rec.priority === "Medium" ? "bg-secondary" : "bg-warning"
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className={`text-xs font-semibold mb-1.5 ${
                        rec.priority === "High" ? "text-primary" :
                        rec.priority === "Medium" ? "text-secondary" : "text-warning"
                      }`}>{rec.type}</p>
                      <p className="text-sm text-text-secondary">{rec.text}</p>
                    </div>
                    <ArrowRight className="w-4.5 h-4.5 text-text-tertiary" />
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* AI Workflow Journey */}
      <section className="py-24 sm:py-32 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-24"
          >
            <span className="badge-primary mb-5">The AI Workflow</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-6 leading-tight">
              What happens after you enter your startup idea
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed max-w-xl mx-auto">
              Our AI operates as your co‑founder, systematically building your startup from concept to investor‑ready.
            </p>
          </motion.div>

          {/* Interactive Timeline */}
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-[26px] sm:left-[29px] lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/40 via-primary/20 to-primary/40"></div>

            <div className="space-y-20">
              {[
                {
                  step: 1,
                  title: "Idea Submission",
                  description: "You share your startup concept with our AI.",
                  value: "Your idea is the starting point for everything.",
                  icon: Lightbulb,
                  color: "from-primary to-secondary",
                  preview: (
                    <div className="bg-bg-primary/90 border border-border/65 rounded-[22px] p-6 text-left shadow-sm hover:shadow-md transition-all duration-400 backdrop-blur-xl">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-base font-medium text-text-primary">You</span>
                      </div>
                      <p className="text-base text-text-secondary">
                        "I want to build an AI-powered project management tool for remote startup teams."
                      </p>
                    </div>
                  )
                },
                {
                  step: 2,
                  title: "AI Validates Idea",
                  description: "Our AI analyzes market fit and competitive landscape.",
                  value: "Know if your idea has real traction potential before investing time.",
                  icon: CheckCircle2,
                  color: "from-success to-primary",
                  preview: (
                    <div className="bg-bg-primary/90 border border-border/65 rounded-[22px] p-6 text-left shadow-sm hover:shadow-md transition-all duration-400 backdrop-blur-xl">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 rounded-full bg-success animate-pulse"></div>
                        <span className="text-base font-medium text-text-secondary">Analyzing</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <p className="text-xs text-text-tertiary mb-1.5">Market Fit</p>
                          <p className="text-2xl font-semibold text-success">8.2</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-text-tertiary mb-1.5">TAM</p>
                          <p className="text-2xl font-semibold text-primary">$24B</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-text-tertiary mb-1.5">Competition</p>
                          <p className="text-2xl font-semibold text-text-primary">17</p>
                        </div>
                      </div>
                    </div>
                  )
                },
                {
                  step: 3,
                  title: "Market Research Begins",
                  description: "Comprehensive market data is gathered and analyzed.",
                  value: "Understand your target audience, trends, and opportunities.",
                  icon: Search,
                  color: "from-primary to-secondary",
                  preview: (
                    <div className="bg-bg-primary/90 border border-border/65 rounded-[22px] p-6 text-left shadow-sm hover:shadow-md transition-all duration-400 backdrop-blur-xl">
                      <div className="h-28 flex items-end gap-2 px-1">
                        {[25, 40, 35, 50, 65, 70, 85, 95].map((height, i) => (
                          <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            whileInView={{ height: `${height}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, delay: i * 0.06 }}
                            className={`flex-1 rounded-t-xl transition-all duration-300 ${i >= 5 ? "bg-gradient-to-t from-primary to-primary/35" : "bg-bg-elevated/75"}`}
                          ></motion.div>
                        ))}
                      </div>
                      <p className="text-xs text-text-tertiary text-center mt-4">Market growth trajectory</p>
                    </div>
                  )
                },
                {
                  step: 4,
                  title: "Competitor Analysis Generated",
                  description: "Deep dive into direct and indirect competitors.",
                  value: "Identify gaps in the market and your unique advantage.",
                  icon: Target,
                  color: "from-secondary to-success",
                  preview: (
                    <div className="bg-bg-primary/90 border border-border/65 rounded-[22px] p-6 text-left shadow-sm hover:shadow-md transition-all duration-400 backdrop-blur-xl">
                      <div className="space-y-3">
                        {[
                          { name: "Asana", score: 85, gap: "No AI-native workflows" },
                          { name: "Monday.com", score: 78, gap: "Too complex for early-stage" },
                          { name: "Notion", score: 90, gap: "Lacks startup-specific features" }
                        ].map((comp, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <div className="flex-1">
                              <p className="text-sm text-text-primary">{comp.name}</p>
                              <p className="text-xs text-text-tertiary">{comp.gap}</p>
                            </div>
                            <span className="text-sm font-medium text-primary">{comp.score}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                },
                {
                  step: 5,
                  title: "Business Model Evaluated",
                  description: "AI evaluates pricing, CAC, LTV, and revenue streams.",
                  value: "Build a sustainable, scalable business model from day one.",
                  icon: PieChart,
                  color: "from-primary to-warning",
                  preview: (
                    <div className="bg-bg-primary/90 border border-border/65 rounded-[22px] p-6 text-left shadow-sm hover:shadow-md transition-all duration-400 backdrop-blur-xl">
                      <div className="grid grid-cols-2 gap-5">
                        <div className="text-center">
                          <p className="text-xs text-text-tertiary mb-1.5">CAC</p>
                          <p className="text-3xl font-semibold text-primary">$120</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-text-tertiary mb-1.5">LTV</p>
                          <p className="text-3xl font-semibold text-secondary">$840</p>
                        </div>
                      </div>
                    </div>
                  )
                },
                {
                  step: 6,
                  title: "Roadmap Generated",
                  description: "12‑month product roadmap with prioritized features.",
                  value: "Know exactly what to build, in what order, and why.",
                  icon: Calendar,
                  color: "from-success to-secondary",
                  preview: (
                    <div className="bg-bg-primary/90 border border-border/65 rounded-[22px] p-6 text-left shadow-sm hover:shadow-md transition-all duration-400 backdrop-blur-xl">
                      <div className="space-y-4">
                        {[
                          { label: "MVP Core", progress: 100 },
                          { label: "Beta Features", progress: 60 },
                          { label: "Seed Milestones", progress: 30 }
                        ].map((item, i) => (
                          <div key={i}>
                            <div className="flex justify-between mb-2 text-xs">
                              <span className="text-text-secondary">{item.label}</span>
                              <span className="text-primary font-medium">{item.progress}%</span>
                            </div>
                            <div className="w-full h-2.5 bg-bg-elevated/65 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${item.progress}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.1, delay: i * 0.12 }}
                                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                              ></motion.div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                },
                {
                  step: 7,
                  title: "Funding Readiness Calculated",
                  description: "AI scores your startup’s investor readiness.",
                  value: "Understand where you stand and what investors are looking for.",
                  icon: Award,
                  color: "from-warning to-success",
                  preview: (
                    <div className="bg-bg-primary/90 border border-border/65 rounded-[22px] p-6 text-left flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-400 backdrop-blur-xl">
                      <div className="relative w-32 h-32 sm:w-36 sm:h-36">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="40" stroke="rgba(42,42,51,0.75)" strokeWidth="9" fill="none"></circle>
                          <motion.circle
                            initial={{ strokeDasharray: 251.2, strokeDashoffset: 251.2 }}
                            whileInView={{ strokeDashoffset: 27.632 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.6, ease: "easeOut" }}
                            cx="50" cy="50" r="40"
                            stroke="url(#funding-gradient)" strokeWidth="9"
                            fill="none" strokeDasharray="251.2"
                            strokeLinecap="round"
                          ></motion.circle>
                          <defs>
                            <linearGradient id="funding-gradient" x1="0" y1="0" x2="100" y2="100">
                              <stop offset="0%" stopColor="#00D4FF" />
                              <stop offset="100%" stopColor="#00E5A8" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <p className="text-3xl sm:text-4xl font-semibold">89</p>
                          <p className="text-xs text-text-tertiary">/100</p>
                        </div>
                      </div>
                    </div>
                  )
                },
                {
                  step: 8,
                  title: "Investor Pitch Prepared",
                  description: "Complete pitch deck and financial model are generated.",
                  value: "Walk into investor meetings with confidence and a professional deck.",
                  icon: FileText,
                  color: "from-secondary to-primary",
                  preview: (
                    <div className="bg-bg-primary/90 border border-border/65 rounded-[22px] p-6 text-left shadow-sm hover:shadow-md transition-all duration-400 backdrop-blur-xl">
                      <div className="flex items-center gap-4">
                        <CheckCircle2 className="w-6 h-6 text-success" />
                        <div>
                          <p className="text-base font-medium text-text-primary">15 slides ready</p>
                          <p className="text-xs text-text-tertiary">Traction, financials, team, & more</p>
                        </div>
                      </div>
                    </div>
                  )
                },
                {
                  step: 9,
                  title: "Launch Checklist Created",
                  description: "Complete pre‑launch checklist tailored to your startup.",
                  value: "Don’t miss any critical steps before going live.",
                  icon: Rocket,
                  color: "from-warning to-primary",
                  preview: (
                    <div className="bg-bg-primary/90 border border-border/65 rounded-[22px] p-6 text-left shadow-sm hover:shadow-md transition-all duration-400 backdrop-blur-xl">
                      <div className="space-y-3">
                        {["Legal entity formed", "Domain secured", "MVP complete", "Beta testers lined up"].map((item, i) => (
                          <div key={i} className="flex items-center gap-3 text-sm">
                            <Check className="w-5 h-5 text-success" />
                            <span className="text-text-secondary">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                },
                {
                  step: 10,
                  title: "Founder Dashboard Activated",
                  description: "Your complete founder operating system is live.",
                  value: "Everything you need in one place, from idea to IPO.",
                  icon: Layers,
                  color: "from-primary to-success",
                  preview: (
                    <div className="bg-bg-primary/90 border border-border/65 rounded-[22px] p-6 text-left shadow-sm hover:shadow-md transition-all duration-400 backdrop-blur-xl">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <p className="text-xs text-text-tertiary mb-1.5">MRR</p>
                          <p className="text-xl font-semibold text-text-primary">$12K</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-text-tertiary mb-1.5">Runway</p>
                          <p className="text-xl font-semibold text-text-primary">18mo</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-text-tertiary mb-1.5">Team</p>
                          <p className="text-xl font-semibold text-text-primary">3</p>
                        </div>
                      </div>
                    </div>
                  )
                }
              ].map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    whileHover={{ y: -5, transition: { duration: 0.25 } }}
                    className={`relative flex gap-8 lg:gap-12 ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                  >
                    {/* Step Node */}
                    <div className="relative z-10">
                      <div className={`w-14 h-14 rounded-[22px] bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl shadow-primary/10`}>
                        <Icon className="w-7 h-7 text-bg-primary" />
                      </div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-bg-primary border-2 border-border/80 flex items-center justify-center text-xs font-bold text-text-primary shadow-sm">
                        {step.step}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <h3 className="text-2xl font-semibold">{step.title}</h3>
                        <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                          Step {step.step}
                        </span>
                      </div>
                      <p className="text-base text-text-secondary mb-4.5">{step.description}</p>
                      <p className="text-base text-text-tertiary mb-7">{step.value}</p>
                      {step.preview}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Deep Dive */}
      <section id="features" className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="badge-primary mb-4">Product Features</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-5">
              One operating system for your startup journey
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              From idea to funding — every tool you need in one place, powered by AI that understands founders.
            </p>
          </motion.div>

          {/* Premium Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* 1. Large Card: AI Startup Validation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="lg:col-span-7 bg-bg-surface/92 border border-border/65 rounded-[28px] p-8 lg:p-9 shadow-[0_2px_8px_rgba(0,0,0,0.08)] backdrop-blur-2xl hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] hover:border-border/90 transition-all duration-400"
            >
              <div className="flex items-center gap-5 mb-7">
                <div className="w-14 h-14 rounded-[22px] bg-gradient-to-br from-primary/22 to-secondary/22 flex items-center justify-center border border-primary/15 shadow-inner">
                  <CheckCircle2 className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">AI Startup Validation</h3>
                  <p className="text-sm text-text-tertiary">Validate before you build</p>
                </div>
              </div>
              <div className="bg-bg-primary border border-border/65 rounded-[22px] p-6 mb-7 shadow-sm hover:shadow-md transition-all duration-400">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-3 h-3 rounded-full bg-success animate-pulse-soft" />
                  <p className="text-sm font-medium text-text-secondary">Analyzing market fit</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-base">
                    <Check className="w-5 h-5 text-success" />
                    <span>TAM: $24B · SAM: $4.8B · SOM: $480M</span>
                  </div>
                  <div className="flex items-center gap-4 text-base">
                    <Check className="w-5 h-5 text-success" />
                    <span>Competitive landscape mapped</span>
                  </div>
                  <div className="flex items-center gap-4 text-base">
                    <Clock className="w-5 h-5 text-primary" />
                    <span>Growth projections generating</span>
                  </div>
                </div>
              </div>
              <p className="text-base text-text-secondary leading-relaxed">
                Stop guessing. Our AI analyzes market data, competitive landscape, and your unique strengths to validate if your idea has real potential — before you write a single line of code.
              </p>
            </motion.div>

            {/* 2. Tall Card: Startup Roadmap Generator */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="lg:col-span-5 bg-bg-surface/92 border border-border/65 rounded-[28px] p-8 lg:p-9 shadow-[0_2px_8px_rgba(0,0,0,0.08)] backdrop-blur-2xl hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] hover:border-border/90 transition-all duration-400"
            >
              <div className="flex items-center gap-5 mb-7">
                <div className="w-14 h-14 rounded-[22px] bg-gradient-to-br from-secondary/22 to-success/22 flex items-center justify-center border border-secondary/15 shadow-inner">
                  <Calendar className="w-7 h-7 text-secondary" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">Startup Roadmap</h3>
                  <p className="text-sm text-text-tertiary">12‑month plan generated</p>
                </div>
              </div>
              <div className="space-y-5">
                {[
                  { label: "MVP Development", progress: 75 },
                  { label: "Beta Launch", progress: 40 },
                  { label: "Seed Funding Prep", progress: 60 },
                  { label: "Scale Operations", progress: 20 }
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-3 text-sm">
                      <span className="text-text-secondary">{item.label}</span>
                      <span className="text-primary font-medium">{item.progress}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-bg-elevated/65 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: i * 0.15, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 3. Wide Card: Market Research Engine */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="lg:col-span-8 bg-bg-surface/92 border border-border/65 rounded-[28px] p-8 lg:p-9 shadow-[0_2px_8px_rgba(0,0,0,0.08)] backdrop-blur-2xl hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] hover:border-border/90 transition-all duration-400"
            >
              <div className="flex items-center gap-5 mb-7">
                <div className="w-14 h-14 rounded-[22px] bg-gradient-to-br from-primary/22 to-secondary/22 flex items-center justify-center border border-primary/15 shadow-inner">
                  <Search className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">Market Research Engine</h3>
                  <p className="text-sm text-text-tertiary">Real‑time data insights</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="bg-bg-primary border border-border/65 rounded-[22px] p-6 text-center shadow-sm hover:shadow-md transition-all duration-400">
                  <p className="text-xs text-text-tertiary mb-2">CAGR</p>
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-semibold text-text-primary mb-1"
                  >240%</motion.p>
                  <p className="text-xs text-success flex items-center justify-center gap-1.5">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>5‑year</span>
                  </p>
                </div>
                <div className="bg-bg-primary border border-border/65 rounded-[22px] p-6 text-center shadow-sm hover:shadow-md transition-all duration-400">
                  <p className="text-xs text-text-tertiary mb-2">Top Segment</p>
                  <p className="text-2xl font-semibold text-text-primary mb-1">Mid‑Market</p>
                  <p className="text-xs text-text-tertiary">B2B SaaS</p>
                </div>
                <div className="bg-bg-primary border border-border/65 rounded-[22px] p-6 text-center shadow-sm hover:shadow-md transition-all duration-400">
                  <p className="text-xs text-text-tertiary mb-2">Competitors</p>
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-semibold text-text-primary mb-1"
                  >17</motion.p>
                  <p className="text-xs text-text-tertiary">Analyzed</p>
                </div>
              </div>
            </motion.div>

            {/* 4. Medium Card: Investor Readiness Score */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="lg:col-span-4 bg-bg-surface/92 border border-border/65 rounded-[28px] p-8 lg:p-9 shadow-[0_2px_8px_rgba(0,0,0,0.08)] backdrop-blur-2xl hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] hover:border-border/90 transition-all duration-400"
            >
              <div className="flex items-center gap-5 mb-7">
                <div className="w-14 h-14 rounded-[22px] bg-gradient-to-br from-secondary/22 to-success/22 flex items-center justify-center border border-secondary/15 shadow-inner">
                  <Award className="w-7 h-7 text-secondary" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">Investor Readiness</h3>
                  <p className="text-sm text-text-tertiary">Real‑time scoring</p>
                </div>
              </div>
              <div className="flex items-center justify-center mb-7">
                <div className="relative w-40 h-40 sm:w-44 sm:h-44">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="rgba(42,42,51,0.75)" strokeWidth="11" fill="none" />
                    <motion.circle
                      initial={{ strokeDasharray: 251.2, strokeDashoffset: 251.2 }}
                      whileInView={{ strokeDashoffset: 27.632 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.8, ease: "easeOut" }}
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="url(#score-gradient)"
                      strokeWidth="11"
                      fill="none"
                      strokeDasharray="251.2"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="score-gradient" x1="0" y1="0" x2="100" y2="100">
                        <stop offset="0%" stopColor="#00D4FF" />
                        <stop offset="100%" stopColor="#00E5A8" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="text-4xl font-semibold"
                    >89</motion.div>
                    <span className="text-sm text-text-tertiary">/100</span>
                  </div>
                </div>
              </div>
              <p className="text-base text-text-secondary text-center">
                Top 7% of early‑stage startups seeking funding.
              </p>
            </motion.div>

            {/* 5. Medium Card: Co‑Founder Matching */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="lg:col-span-6 bg-bg-surface/92 border border-border/65 rounded-[28px] p-8 lg:p-9 shadow-[0_2px_8px_rgba(0,0,0,0.08)] backdrop-blur-2xl hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] hover:border-border/90 transition-all duration-400"
            >
              <div className="flex items-center gap-5 mb-7">
                <div className="w-14 h-14 rounded-[22px] bg-gradient-to-br from-primary/22 to-secondary/22 flex items-center justify-center border border-primary/15 shadow-inner">
                  <Users className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">Co‑Founder Matching</h3>
                  <p className="text-sm text-text-tertiary">Find your perfect partner</p>
                </div>
              </div>
              <div className="space-y-4.5">
                {[
                  { name: "Alex Chen", role: "CTO · Ex‑Stripe", score: 92 },
                  { name: "Sam Rivera", role: "Product · Ex‑Figma", score: 87 },
                  { name: "Jordan Lee", role: "Ops · Ex‑Airbnb", score: 84 }
                ].map((person, i) => (
                  <div key={i} className="flex items-center gap-5 bg-bg-primary border border-border/65 rounded-[22px] p-5.5 hover:bg-bg-elevated/65 hover:border-border/90 hover:shadow-md transition-all duration-400">
                    <div className="w-12 h-12 rounded-[18px] bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/10 shadow-sm">
                      <span className="font-semibold text-base">{person.name.split(' ')[0][0]}{person.name.split(' ')[1][0]}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-primary">{person.name}</p>
                      <p className="text-xs text-text-tertiary">{person.role}</p>
                    </div>
                    <div className="px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                      {person.score}% match
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 6. Small Card: Pitch Deck AI */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 }}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="lg:col-span-3 bg-bg-surface/92 border border-border/65 rounded-[28px] p-8 lg:p-9 shadow-[0_2px_8px_rgba(0,0,0,0.08)] backdrop-blur-2xl hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] hover:border-border/90 transition-all duration-400"
            >
              <div className="flex items-center gap-5 mb-7">
                <div className="w-14 h-14 rounded-[22px] bg-gradient-to-br from-secondary/22 to-success/22 flex items-center justify-center border border-secondary/15 shadow-inner">
                  <FileText className="w-7 h-7 text-secondary" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">Pitch Deck AI</h3>
                  <p className="text-sm text-text-tertiary">15 slides ready</p>
                </div>
              </div>
              <div className="bg-bg-primary border border-border/65 rounded-[22px] p-6 text-center shadow-sm hover:shadow-md transition-all duration-400">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Check className="w-5 h-5 text-success" />
                  <span className="text-base font-medium text-text-primary">Deck Generated</span>
                </div>
                <p className="text-xs text-text-tertiary">Traction slide · Financials · Team</p>
              </div>
            </motion.div>

            {/* 7. Wide Card: Growth Analytics */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.6 }}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="lg:col-span-9 bg-bg-surface/92 border border-border/65 rounded-[28px] p-8 lg:p-9 shadow-[0_2px_8px_rgba(0,0,0,0.08)] backdrop-blur-2xl hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] hover:border-border/90 transition-all duration-400"
            >
              <div className="flex items-center gap-5 mb-7">
                <div className="w-14 h-14 rounded-[22px] bg-gradient-to-br from-primary/22 to-secondary/22 flex items-center justify-center border border-primary/15 shadow-inner">
                  <Activity className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">Growth Analytics</h3>
                  <p className="text-sm text-text-tertiary">Data‑driven insights</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-5 mb-7">
                <div className="bg-bg-primary border border-border/65 rounded-[22px] p-6 shadow-sm hover:shadow-md transition-all duration-400">
                  <p className="text-xs text-text-tertiary mb-2">MRR</p>
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-semibold text-text-primary mb-1"
                  >$12K</motion.p>
                  <p className="text-xs text-success flex items-center gap-1.5">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>+42%</span>
                  </p>
                </div>
                <div className="bg-bg-primary border border-border/65 rounded-[22px] p-6 shadow-sm hover:shadow-md transition-all duration-400">
                  <p className="text-xs text-text-tertiary mb-2">Churn</p>
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-semibold text-text-primary mb-1"
                  >3.1%</motion.p>
                  <p className="text-xs text-success flex items-center gap-1.5">
                    <TrendingDown className="w-4 h-4" />
                    <span>-0.8%</span>
                  </p>
                </div>
                <div className="bg-bg-primary border border-border/65 rounded-[22px] p-6 shadow-sm hover:shadow-md transition-all duration-400">
                  <p className="text-xs text-text-tertiary mb-2">LTV</p>
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-semibold text-text-primary mb-1"
                  >$840</motion.p>
                  <p className="text-xs text-text-tertiary">Per user</p>
                </div>
                <div className="bg-bg-primary border border-border/65 rounded-[22px] p-6 shadow-sm hover:shadow-md transition-all duration-400">
                  <p className="text-xs text-text-tertiary mb-2">CAC</p>
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-semibold text-text-primary mb-1"
                  >$120</motion.p>
                  <p className="text-xs text-text-tertiary">Payback: 10 mo</p>
                </div>
              </div>
              <div className="h-36 flex items-end gap-3 px-3.5 bg-bg-primary rounded-[22px] p-4.5 border border-border/45">
                {[30, 45, 40, 60, 75, 70, 90, 95, 88, 92, 100].map((height, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${height}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.06, ease: "easeOut" }}
                    className={`flex-1 rounded-t-[14px] transition-all duration-400 ${i >= 8 ? "bg-gradient-to-t from-primary to-primary/32" : "bg-bg-elevated/75"}`}
                  />
                ))}
              </div>
            </motion.div>

            {/* 8. Medium Card: Launch Checklist */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.7 }}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="lg:col-span-3 bg-bg-surface/92 border border-border/65 rounded-[28px] p-8 lg:p-9 shadow-[0_2px_8px_rgba(0,0,0,0.08)] backdrop-blur-2xl hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] hover:border-border/90 transition-all duration-400"
            >
              <div className="flex items-center gap-5 mb-7">
                <div className="w-14 h-14 rounded-[22px] bg-gradient-to-br from-primary/22 to-secondary/22 flex items-center justify-center border border-primary/15 shadow-inner">
                  <Rocket className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">Launch Checklist</h3>
                  <p className="text-sm text-text-tertiary">Everything you need</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  "Legal entity formed",
                  "Domain & branding",
                  "MVP complete",
                  "Beta testers ready"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-base">
                    <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center shadow-sm">
                      <Check className="w-4 h-4 text-success" />
                    </div>
                    <span className="text-text-secondary">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Trust & Credibility */}
      <section className="py-24 sm:py-32 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <span className="badge-primary mb-4">Why Trust Us</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-5">
              Built for founders who demand quality
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              Transparent, secure, and designed for real startup teams. No empty promises — just honest, capable tools that work with you, not against you.
            </p>
          </motion.div>

          {/* Trust Blocks Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

            {/* 1. Large Block: Why Founders Trust FounderLink AI */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="lg:col-span-7 bg-bg-surface border border-border rounded-3xl p-7 lg:p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Why Founders Trust FounderLink AI</h3>
                  <p className="text-sm text-text-tertiary">A partner, not a black box</p>
                </div>
              </div>
              <div className="space-y-5">
                {[
                  {
                    icon: CheckCircle2,
                    title: "You remain in full control",
                    desc: "Our AI makes recommendations, but every decision is yours. We never take the wheel."
                  },
                  {
                    icon: CheckCircle2,
                    title: "Transparent decision-making",
                    desc: "Every AI suggestion comes with context and reasoning so you understand the 'why'."
                  },
                  {
                    icon: CheckCircle2,
                    title: "Founder-first design",
                    desc: "Built by founders who’ve been in your shoes, with workflows that match how startups actually operate."
                  }
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex gap-4">
                      <div className="mt-1">
                        <Icon className="w-5 h-5 text-success" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-primary mb-1">{item.title}</p>
                        <p className="text-sm text-text-secondary">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* 2. Tall Block: Built for Startup Teams */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="lg:col-span-5 bg-bg-surface border border-border rounded-3xl p-7 lg:p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Built for Startup Teams</h3>
                  <p className="text-sm text-text-tertiary">Real workflows, not just features</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Idea Validation", progress: 100 },
                  { label: "Market Research", progress: 100 },
                  { label: "Roadmap Planning", progress: 100 },
                  { label: "Investor Prep", progress: 95 }
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2 text-sm">
                      <span className="text-text-secondary">{item.label}</span>
                      <span className="text-primary font-medium">{item.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-bg-elevated rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: i * 0.15, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 3. Wide Block: AI That Explains Every Recommendation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="lg:col-span-8 bg-bg-surface border border-border rounded-3xl p-7 lg:p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">AI That Explains Every Recommendation</h3>
                  <p className="text-sm text-text-tertiary">Transparent reasoning, not black-box outputs</p>
                </div>
              </div>
              <div className="bg-bg-primary border border-border rounded-2xl p-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/10 flex items-center justify-center flex-shrink-0">
                    <Brain className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-primary mb-2">AI Recommendation</p>
                    <p className="text-sm text-text-primary mb-3">Prioritize single sign-on (SSO) for your MVP feature list</p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-success mt-0.5" />
                        <p className="text-xs text-text-secondary"><span className="text-text-primary font-medium">Why:</span> 68% of B2B buyers require SSO for trial signups</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-success mt-0.5" />
                        <p className="text-xs text-text-secondary"><span className="text-text-primary font-medium">Source:</span> 2024 SaaS Buyer Survey (1,200 respondents)</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-success mt-0.5" />
                        <p className="text-xs text-text-secondary"><span className="text-text-primary font-medium">Impact:</span> Estimated +31% trial conversion rate</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 4. Medium Block: Privacy & Security */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="lg:col-span-4 bg-bg-surface border border-border rounded-3xl p-7 lg:p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Privacy & Security</h3>
                  <p className="text-sm text-text-tertiary">Your data stays yours</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { icon: Shield, label: "End-to-end encryption", color: "text-primary" },
                  { icon: Eye, label: "No training on your data", color: "text-secondary" },
                  { icon: Server, label: "SOC2-ready infrastructure", color: "text-success" },
                  { icon: Lock, label: "Secure authentication", color: "text-warning" }
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center gap-3 bg-bg-primary border border-border rounded-xl p-4 hover:bg-bg-elevated transition-colors">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-4.5 h-4.5 text-primary" />
                      </div>
                      <span className={`text-sm font-medium ${item.color}`}>{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* 5. Medium Block: Continuous Product Improvements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="lg:col-span-6 bg-bg-surface border border-border rounded-3xl p-7 lg:p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Continuous Product Improvements</h3>
                  <p className="text-sm text-text-tertiary">Always getting better</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { date: "July 2024", title: "Enhanced roadmap generation", desc: "Now includes risk assessments for each milestone" },
                  { date: "June 2024", title: "New co-founder matching algorithm", desc: "Improved accuracy with skill complementarity scoring" },
                  { date: "May 2024", title: "Market data real-time sync", desc: "CAGR and competitor data updated daily" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      {i < 2 && <div className="w-0.5 flex-1 bg-border mt-2"></div>}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-primary mb-1">{item.date}</p>
                      <p className="text-sm font-medium text-text-primary mb-1">{item.title}</p>
                      <p className="text-sm text-text-secondary">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 6. Small Block: Ready for Investors */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="lg:col-span-6 bg-bg-surface border border-border rounded-3xl p-7 lg:p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center">
                  <Award className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Ready for Investors</h3>
                  <p className="text-sm text-text-tertiary">Professional outputs, every time</p>
                </div>
              </div>
              <div className="bg-bg-primary border border-border rounded-2xl p-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center mx-auto mb-3">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    </div>
                    <p className="text-xs font-medium text-text-primary mb-1">Pitch Decks</p>
                    <p className="text-xs text-text-tertiary">15-slide standard</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center mx-auto mb-3">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    </div>
                    <p className="text-xs font-medium text-text-primary mb-1">Financials</p>
                    <p className="text-xs text-text-tertiary">3-5 year models</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center mx-auto mb-3">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    </div>
                    <p className="text-xs font-medium text-text-primary mb-1">Data Rooms</p>
                    <p className="text-xs text-text-tertiary">Structured docs</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 sm:py-32 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <span className="badge-primary mb-4">Simple, transparent pricing</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-5">
              Choose the plan that matches your startup stage
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              No hidden fees, no fake discounts. Just honest pricing designed for founders building real companies.
            </p>
          </motion.div>

          {/* Pricing Plans Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">

            {/* 1. Free Plan */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="lg:col-span-4 bg-bg-surface/92 border border-border/65 rounded-[28px] p-8 lg:p-9 shadow-[0_2px_8px_rgba(0,0,0,0.08)] backdrop-blur-2xl hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] hover:border-border/90 transition-all duration-400"
            >
              <div className="flex items-center justify-between mb-7">
                <div>
                  <h3 className="text-2xl font-semibold text-text-primary">Free</h3>
                  <p className="text-sm text-text-tertiary">For validating your idea</p>
                </div>
              </div>
              <div className="mb-8">
                <p className="text-5xl font-semibold text-text-primary">$0</p>
                <p className="text-sm text-text-tertiary">Forever</p>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5" />
                  <p className="text-sm text-text-secondary">3 idea validations per month</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5" />
                  <p className="text-sm text-text-secondary">Basic market research</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5" />
                  <p className="text-sm text-text-secondary">12-month roadmap (simplified)</p>
                </div>
              </div>
              <Link
                to={user ? "/dashboard" : "/register"}
                className="group w-full inline-flex items-center justify-center gap-2 bg-bg-primary text-text-primary rounded-[20px] px-6 py-4 font-medium border border-border/65 transition-all duration-400 hover:border-white/20 hover:bg-bg-elevated active:scale-[0.98] shadow-sm hover:shadow-md"
              >
                Start for free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>

            {/* 2. Pro Plan (Recommended) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="lg:col-span-4 bg-bg-surface/92 border border-primary/30 rounded-[28px] p-8 lg:p-9 relative overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] backdrop-blur-2xl hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] hover:border-primary/50 transition-all duration-400"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
              <div className="flex items-center justify-between mb-7">
                <div>
                  <h3 className="text-2xl font-semibold text-text-primary">Pro</h3>
                  <p className="text-sm text-text-tertiary">For building your startup</p>
                </div>
                <span className="text-xs font-semibold text-primary px-4 py-2 rounded-[14px] bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/15 shadow-inner">Recommended</span>
              </div>
              <div className="mb-8">
                <p className="text-5xl font-semibold text-text-primary">$49</p>
                <p className="text-sm text-text-tertiary">per month, billed monthly</p>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5" />
                  <p className="text-sm text-text-secondary">Unlimited idea validations</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5" />
                  <p className="text-sm text-text-secondary">Advanced market research (CAGR, competitors)</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5" />
                  <p className="text-sm text-text-secondary">Co-founder matching (unlimited)</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5" />
                  <p className="text-sm text-text-secondary">AI pitch deck generation</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5" />
                  <p className="text-sm text-text-secondary">Financial model templates</p>
                </div>
              </div>
              <Link
                to={user ? "/dashboard" : "/register"}
                className="group w-full inline-flex items-center justify-center gap-2 bg-primary text-bg-primary rounded-[20px] px-6 py-4 font-medium transition-all duration-400 hover:bg-primary/90 hover:scale-[1.01] hover:shadow-[0_8px_24px_rgba(0,212,255,0.3)] active:scale-[0.98]"
              >
                Upgrade to Pro
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>

            {/* 3. Enterprise Plan */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="lg:col-span-4 bg-bg-surface/92 border border-border/65 rounded-[28px] p-8 lg:p-9 shadow-[0_2px_8px_rgba(0,0,0,0.08)] backdrop-blur-2xl hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] hover:border-border/90 transition-all duration-400"
            >
              <div className="flex items-center justify-between mb-7">
                <div>
                  <h3 className="text-2xl font-semibold text-text-primary">Enterprise</h3>
                  <p className="text-sm text-text-tertiary">For scaling teams</p>
                </div>
              </div>
              <div className="mb-8">
                <p className="text-5xl font-semibold text-text-primary">Let's talk</p>
                <p className="text-sm text-text-tertiary">Custom pricing for teams</p>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5" />
                  <p className="text-sm text-text-secondary">Everything in Pro</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5" />
                  <p className="text-sm text-text-secondary">Team collaboration & roles</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5" />
                  <p className="text-sm text-text-secondary">Custom AI workflows</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success mt-0.5" />
                  <p className="text-sm text-text-secondary">Priority support</p>
                </div>
              </div>
              <Link
                to="/contact"
                className="group w-full inline-flex items-center justify-center gap-2 bg-bg-primary text-text-primary rounded-[20px] px-6 py-4 font-medium border border-border/65 transition-all duration-400 hover:border-white/20 hover:bg-bg-elevated active:scale-[0.98] shadow-sm hover:shadow-md"
              >
                Contact sales
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>

          </div>

          {/* Feature Comparison */}
          <div className="bg-bg-surface/92 border border-border/65 rounded-[28px] p-8 lg:p-9 shadow-[0_2px_8px_rgba(0,0,0,0.08)] backdrop-blur-2xl">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h3 className="text-2xl font-semibold mb-3">Plan comparison</h3>
              <p className="text-text-secondary">Everything you need to make the right choice</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border/65">
                    <th className="py-6 pr-8 text-sm font-semibold text-text-tertiary w-1/3">Features</th>
                    <th className="py-6 px-6 text-center text-sm font-semibold text-text-tertiary w-1/5">Free</th>
                    <th className="py-6 px-6 text-center text-sm font-semibold text-primary bg-gradient-to-r from-primary/10 to-secondary/10 rounded-[20px] w-1/5">Pro</th>
                    <th className="py-6 px-6 text-center text-sm font-semibold text-text-tertiary w-1/5">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/65">
                  {/* Idea Validation */}
                  <motion.tr initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <td className="py-6 pr-8">
                      <p className="text-xs font-semibold text-primary mb-4">Idea Validation</p>
                      <div className="space-y-4">
                        <p className="text-sm text-text-secondary">Validations per month</p>
                        <p className="text-sm text-text-secondary">TAM/SAM/SOM analysis</p>
                        <p className="text-sm text-text-secondary">Competitor analysis</p>
                      </div>
                    </td>
                    <td className="py-6 px-6">
                      <div className="space-y-4">
                        <p className="text-sm text-text-secondary text-center">3</p>
                        <p className="text-sm text-text-secondary text-center">Basic</p>
                        <p className="text-sm text-text-secondary text-center">Limited</p>
                      </div>
                    </td>
                    <td className="py-6 px-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-[20px]">
                      <div className="space-y-4">
                        <p className="text-sm text-text-primary text-center font-medium">Unlimited</p>
                        <p className="text-sm text-text-primary text-center font-medium">Advanced</p>
                        <p className="text-sm text-text-primary text-center font-medium">Full</p>
                      </div>
                    </td>
                    <td className="py-6 px-6">
                      <div className="space-y-4">
                        <p className="text-sm text-text-secondary text-center">Unlimited</p>
                        <p className="text-sm text-text-secondary text-center">Advanced</p>
                        <p className="text-sm text-text-secondary text-center">Full</p>
                      </div>
                    </td>
                  </motion.tr>

                  {/* Market Research */}
                  <motion.tr initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                    <td className="py-6 pr-8">
                      <p className="text-xs font-semibold text-primary mb-4">Market Research</p>
                      <div className="space-y-4">
                        <p className="text-sm text-text-secondary">CAGR data</p>
                        <p className="text-sm text-text-secondary">Trend analysis</p>
                      </div>
                    </td>
                    <td className="py-6 px-6">
                      <div className="space-y-4">
                        <p className="text-sm text-text-secondary text-center"><XCircle className="w-4 h-4 text-text-tertiary inline" /></p>
                        <p className="text-sm text-text-secondary text-center"><XCircle className="w-4 h-4 text-text-tertiary inline" /></p>
                      </div>
                    </td>
                    <td className="py-6 px-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-[20px]">
                      <div className="space-y-4">
                        <p className="text-sm text-text-primary text-center font-medium"><Check className="w-4 h-4 text-success inline" /></p>
                        <p className="text-sm text-text-primary text-center font-medium"><Check className="w-4 h-4 text-success inline" /></p>
                      </div>
                    </td>
                    <td className="py-6 px-6">
                      <div className="space-y-4">
                        <p className="text-sm text-text-secondary text-center"><Check className="w-4 h-4 text-success inline" /></p>
                        <p className="text-sm text-text-secondary text-center"><Check className="w-4 h-4 text-success inline" /></p>
                      </div>
                    </td>
                  </motion.tr>

                  {/* AI Tools */}
                  <motion.tr initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                    <td className="py-6 pr-8">
                      <p className="text-xs font-semibold text-primary mb-4">AI Tools</p>
                      <div className="space-y-4">
                        <p className="text-sm text-text-secondary">Roadmap generator</p>
                        <p className="text-sm text-text-secondary">Pitch deck AI</p>
                        <p className="text-sm text-text-secondary">Co-founder matching</p>
                      </div>
                    </td>
                    <td className="py-6 px-6">
                      <div className="space-y-4">
                        <p className="text-sm text-text-secondary text-center">Simplified</p>
                        <p className="text-sm text-text-secondary text-center"><XCircle className="w-4 h-4 text-text-tertiary inline" /></p>
                        <p className="text-sm text-text-secondary text-center">3 profiles</p>
                      </div>
                    </td>
                    <td className="py-6 px-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-[20px]">
                      <div className="space-y-4">
                        <p className="text-sm text-text-primary text-center font-medium">Full</p>
                        <p className="text-sm text-text-primary text-center font-medium"><Check className="w-4 h-4 text-success inline" /></p>
                        <p className="text-sm text-text-primary text-center font-medium">Unlimited</p>
                      </div>
                    </td>
                    <td className="py-6 px-6">
                      <div className="space-y-4">
                        <p className="text-sm text-text-secondary text-center">Full</p>
                        <p className="text-sm text-text-secondary text-center"><Check className="w-4 h-4 text-success inline" /></p>
                        <p className="text-sm text-text-secondary text-center">Unlimited</p>
                      </div>
                    </td>
                  </motion.tr>

                  {/* Collaboration */}
                  <motion.tr initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                    <td className="py-6 pr-8">
                      <p className="text-xs font-semibold text-primary mb-4">Collaboration</p>
                      <div className="space-y-4">
                        <p className="text-sm text-text-secondary">Team members</p>
                        <p className="text-sm text-text-secondary">Role-based access</p>
                        <p className="text-sm text-text-secondary">Custom workflows</p>
                      </div>
                    </td>
                    <td className="py-6 px-6">
                      <div className="space-y-4">
                        <p className="text-sm text-text-secondary text-center">1</p>
                        <p className="text-sm text-text-secondary text-center"><XCircle className="w-4 h-4 text-text-tertiary inline" /></p>
                        <p className="text-sm text-text-secondary text-center"><XCircle className="w-4 h-4 text-text-tertiary inline" /></p>
                      </div>
                    </td>
                    <td className="py-6 px-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-[20px]">
                      <div className="space-y-4">
                        <p className="text-sm text-text-primary text-center font-medium">1</p>
                        <p className="text-sm text-text-primary text-center font-medium"><XCircle className="w-4 h-4 text-text-tertiary inline" /></p>
                        <p className="text-sm text-text-primary text-center font-medium"><XCircle className="w-4 h-4 text-text-tertiary inline" /></p>
                      </div>
                    </td>
                    <td className="py-6 px-6">
                      <div className="space-y-4">
                        <p className="text-sm text-text-secondary text-center">Custom</p>
                        <p className="text-sm text-text-secondary text-center"><Check className="w-4 h-4 text-success inline" /></p>
                        <p className="text-sm text-text-secondary text-center"><Check className="w-4 h-4 text-success inline" /></p>
                      </div>
                    </td>
                  </motion.tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 sm:py-32 border-t border-border relative overflow-hidden">
        {/* Subtle Background Lighting */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-bg-surface/85 border border-border/65 rounded-full text-xs font-medium text-text-tertiary backdrop-blur-xl">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>The next big startup starts here</span>
              </div>
              
              <h1 className="text-[48px] sm:text-[56px] lg:text-[64px] leading-[0.95] font-semibold tracking-tight">
                From idea to investor-ready in weeks, not years.
              </h1>
              
              <p className="text-lg text-text-secondary leading-relaxed max-w-xl">
                FounderLink AI gives you the tools, insights, and confidence to turn your next concept into a venture-scale company. No templates, just intelligent guidance that adapts to your startup.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to={user ? "/dashboard" : "/register"}
                  className="group inline-flex items-center justify-center gap-2 bg-primary text-bg-primary rounded-[20px] px-8 h-16 font-medium text-base transition-all duration-400 hover:bg-primary/90 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,212,255,0.3)] active:translate-y-0 active:scale-[0.98]"
                >
                  Start building
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                
                <Link
                  to="/about"
                  className="group inline-flex items-center justify-center gap-2 bg-bg-surface/85 text-text-primary rounded-[20px] px-8 h-16 font-medium text-base border border-border/65 backdrop-blur-xl transition-all duration-400 hover:border-white/20 hover:bg-bg-elevated/85 hover:-translate-y-1 active:translate-y-0 active:scale-[0.98]"
                >
                  Explore the product
                </Link>
              </div>
            </div>
            
            {/* Product Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="bg-bg-surface/92 border border-border/65 rounded-[28px] p-8 lg:p-9 shadow-[0_2px_8px_rgba(0,0,0,0.08)] backdrop-blur-2xl hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] hover:border-border/90 transition-all duration-400"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-[18px] bg-gradient-to-br from-primary/22 to-secondary/22 border border-primary/15 flex items-center justify-center shadow-inner">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-text-primary">Startup Health</p>
                    <p className="text-sm text-text-tertiary">Last updated 12s ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-success animate-pulse-soft"></div>
                  <p className="text-sm text-success font-medium">Live</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-5 mb-7">
                <div className="bg-bg-primary border border-border/65 rounded-[20px] p-6 shadow-sm hover:shadow-md transition-all duration-400">
                  <p className="text-xs text-text-tertiary mb-3">Investor Score</p>
                  <p className="text-3xl font-semibold text-text-primary mb-2">89</p>
                  <div className="w-full h-2.5 bg-bg-elevated/65 rounded-full overflow-hidden">
                    <div className="w-[89%] h-full bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                  </div>
                </div>
                <div className="bg-bg-primary border border-border/65 rounded-[20px] p-6 shadow-sm hover:shadow-md transition-all duration-400">
                  <p className="text-xs text-text-tertiary mb-3">TAM Estimate</p>
                  <p className="text-3xl font-semibold text-text-primary mb-2">$24B</p>
                  <p className="text-sm text-success flex items-center gap-1.5"><ArrowUpRight className="w-3.5 h-3.5"/> +12%</p>
                </div>
              </div>
              
              <div className="bg-bg-primary border border-border/65 rounded-[20px] p-6 shadow-sm hover:shadow-md transition-all duration-400">
                <div className="flex items-center justify-between mb-5">
                  <p className="text-sm font-semibold text-text-primary">12-Month Roadmap</p>
                  <p className="text-sm text-text-tertiary">Milestones</p>
                </div>
                <div className="space-y-4">
                  {["MVP Launch", "Beta Testing", "Seed Funding", "Scale Operations"].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-7 h-7 rounded-[12px] bg-success/10 flex items-center justify-center">
                          <Check className="w-4 h-4 text-success" />
                        </div>
                        <p className="text-base text-text-secondary">{item}</p>
                      </div>
                      <p className="text-sm text-text-tertiary">{i < 2 ? "Complete" : "In Progress"}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
