import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Brain,
  BarChart3,
  Users,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Clock,
  Activity,
  Rocket,
  Target,
  Zap,
  Lightbulb,
  PieChart,
  TrendingDown,
  DollarSign,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

// Counter animation hook
const useCountUp = (target, duration = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrameId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Ease out quart
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(target * easeOutQuart));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [target, duration]);

  return count;
};

// Premium Stat Card Component
const StatCard = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  gradient,
  delay = 0
}) => {
  const count = useCountUp(value, 1800 + delay * 200);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass-premium rounded-2xl p-6 relative overflow-hidden group"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: gradient,
          filter: 'blur(40px)',
          transform: 'translate3d(0, 0, 0)',
        }}
      />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-5">
          <div className={`p-3 rounded-xl ${gradient.includes('purple') ? 'bg-purple-500/15' : gradient.includes('emerald') ? 'bg-emerald-500/15' : gradient.includes('cyan') ? 'bg-cyan-500/15' : 'bg-amber-500/15'}`}>
            <Icon className={`h-6 w-6 ${gradient.includes('purple') ? 'text-purple-400' : gradient.includes('emerald') ? 'text-emerald-400' : gradient.includes('cyan') ? 'text-cyan-400' : 'text-amber-400'}`} />
          </div>
          <span className={`flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-full ${changeType === 'positive' ? 'bg-emerald-500/10 text-emerald-400' : changeType === 'negative' ? 'bg-red-500/10 text-red-400' : 'bg-slate-500/10 text-slate-400'}`}>
            {changeType === 'positive' ? <TrendingUp className="h-3 w-3" /> : changeType === 'negative' ? <TrendingDown className="h-3 w-3" /> : null}
            {change}
          </span>
        </div>
        <div className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-1.5">
          {count}
        </div>
        <div className="text-sm text-slate-400 font-medium">{title}</div>
      </div>
    </motion.div>
  );
};

// AI Insights Panel
const AIInsights = () => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.3 }}
    className="glass-premium rounded-2xl p-6 sm:p-7 lg:p-8 relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded-full blur-3xl" />
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-7">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded-xl">
            <Brain className="h-5.5 w-5.5 text-violet-400" />
          </div>
          <h3 className="text-lg font-bold text-white">AI Insights Report</h3>
        </div>
        <div className="px-3 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full">
          <span className="text-xs font-semibold text-violet-300">Real-time</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-7">
        {[
          { label: 'Overall Score', value: '89', color: 'from-violet-500 to-indigo-500' },
          { label: 'Funding Probability', value: '78', color: 'from-emerald-500 to-teal-500' },
          { label: 'Market Potential', value: '92', color: 'from-cyan-500 to-blue-500' },
          { label: 'Risk Level', value: 'Low', color: 'from-amber-500 to-orange-500' }
        ].map((item, i) => (
          <div key={i} className="p-4 bg-white/[0.02] rounded-xl border border-white/[0.05]">
            <div className="text-xs text-slate-400 font-medium mb-1.5">{item.label}</div>
            {typeof item.value === 'string' ? (
              <div className={`text-xl font-black bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>{item.value}</div>
            ) : (
              <div className="flex items-end gap-1">
                <div className={`text-3xl font-black bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>{item.value}</div>
                <div className="text-xs text-slate-500 mb-1 font-semibold">%</div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-3.5">
        {[
          { icon: Lightbulb, text: 'Your SaaS idea shows strong product-market fit in the B2B segment' },
          { icon: Target, text: 'Recommend focusing on mid-market clients for initial traction' },
          { icon: ShieldCheck, text: 'Your competitive moat is defensible with AI-powered features' }
        ].map((item, i) => (
          <div key={i} className="flex gap-3.5 p-3.5 bg-white/[0.02] rounded-xl hover:bg-white/[0.04] transition-colors">
            <div className="mt-0.5 p-1.5 bg-slate-800/50 rounded-lg">
              <item.icon className="h-4.5 w-4.5 text-violet-400" />
            </div>
            <div className="text-sm text-slate-300 font-medium">{item.text}</div>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

// Startup Readiness
const StartupReadiness = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.4 }}
    className="glass-premium rounded-2xl p-6 sm:p-7 lg:p-8"
  >
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-bold text-white flex items-center gap-2">
        <Rocket className="h-5 w-5 text-emerald-400" />
        Startup Readiness
      </h3>
      <span className="text-xs text-slate-400 font-semibold">Q3 2025</span>
    </div>

    <div className="flex items-center justify-center mb-6">
      <div className="relative w-36 h-36 sm:w-40 sm:h-40">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.08)" strokeWidth="10" fill="none" />
          <circle cx="50" cy="50" r="40" stroke="url(#readiness-gradient)" strokeWidth="10" fill="none" strokeDasharray={251.2} strokeDashoffset={32.656} strokeLinecap="round" />
          <defs>
            <linearGradient id="readiness-gradient" x1="0" y1="0" x2="100" y2="100">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-4xl font-black text-white">87</div>
          <div className="text-xs text-slate-400 font-semibold uppercase tracking-widest">Score</div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-3.5">
      {[
        { label: 'Product', value: 92, color: 'violet' },
        { label: 'Market', value: 85, color: 'emerald' },
        { label: 'Tech', value: 88, color: 'cyan' },
        { label: 'Team', value: 76, color: 'amber' }
      ].map((item, i) => (
        <div key={i} className="p-3.5 bg-white/[0.02] rounded-xl border border-white/[0.05]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">{item.label}</span>
            <span className={`text-sm font-black ${item.color === 'violet' ? 'text-violet-400' : item.color === 'emerald' ? 'text-emerald-400' : item.color === 'cyan' ? 'text-cyan-400' : 'text-amber-400'}`}>{item.value}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${item.color === 'violet' ? 'bg-violet-500' : item.color === 'emerald' ? 'bg-emerald-500' : item.color === 'cyan' ? 'bg-cyan-500' : 'bg-amber-500'}`}
              style={{ width: `${item.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

// Activity Timeline
const ActivityTimeline = () => {
  const activities = [
    { id: 1, icon: Zap, text: 'Generated new SaaS idea', time: '2 min ago', color: 'violet' },
    { id: 2, icon: Brain, text: 'Business analysis completed', time: '15 min ago', color: 'emerald' },
    { id: 3, icon: TrendingUp, text: 'Created product roadmap', time: '1 hour ago', color: 'cyan' },
    { id: 4, icon: Award, text: 'Investor score updated', time: '3 hours ago', color: 'amber' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="glass-premium rounded-2xl p-6 sm:p-7 lg:p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Activity className="h-5 w-5 text-violet-400" />
          Recent Activity
        </h3>
        <Link to="#" className="text-xs text-violet-400 hover:text-violet-300 font-semibold">View all</Link>
      </div>

      <div className="space-y-5">
        {activities.map((activity, i) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.6 + i * 0.1 }}
            className="flex gap-4"
          >
            <div className="flex flex-col items-center">
              <div className={`p-2.5 rounded-xl ${activity.color === 'violet' ? 'bg-violet-500/15' : activity.color === 'emerald' ? 'bg-emerald-500/15' : activity.color === 'cyan' ? 'bg-cyan-500/15' : 'bg-amber-500/15'}`}>
                <activity.icon className={`h-5 w-5 ${activity.color === 'violet' ? 'text-violet-400' : activity.color === 'emerald' ? 'text-emerald-400' : activity.color === 'cyan' ? 'text-cyan-400' : 'text-amber-400'}`} />
              </div>
              {i < activities.length - 1 && <div className="flex-1 w-px bg-white/10 my-2" />}
            </div>
            <div className="flex-1 pb-1">
              <div className="text-sm text-white font-semibold mb-0.5">{activity.text}</div>
              <div className="text-xs text-slate-500">{activity.time}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// AI Toolkit Cards
const AIToolkit = () => {
  const tools = [
    {
      id: 1,
      icon: Lightbulb,
      title: 'Idea Generator',
      description: 'Validate and refine startup concepts',
      time: '2 min',
      color: 'violet',
      path: '/ai-tools'
    },
    {
      id: 2,
      icon: BarChart3,
      title: 'Market Analyzer',
      description: 'Deep dive into your market',
      time: '5 min',
      color: 'emerald',
      path: '/ai-tools'
    },
    {
      id: 3,
      icon: TrendingUp,
      title: 'Roadmap Builder',
      description: 'Create product roadmap',
      time: '3 min',
      color: 'cyan',
      path: '/roadmap'
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      {tools.map((tool, i) => (
        <Link key={tool.id} to={tool.path} className="group">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
            className="glass-premium rounded-2xl p-5 h-full hover:border-violet-500/30 group-hover:bg-slate-900/60"
          >
            <div className={`p-3 rounded-xl w-fit mb-4 ${tool.color === 'violet' ? 'bg-violet-500/15' : tool.color === 'emerald' ? 'bg-emerald-500/15' : 'bg-cyan-500/15'}`}>
              <tool.icon className={`h-6 w-6 ${tool.color === 'violet' ? 'text-violet-400' : tool.color === 'emerald' ? 'text-emerald-400' : 'text-cyan-400'}`} />
            </div>
            <div className="text-white font-bold text-base mb-1">{tool.title}</div>
            <div className="text-slate-400 text-sm mb-4">{tool.description}</div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                <Clock className="h-3.5 w-3.5" />
                {tool.time}
              </div>
              <div className="flex items-center gap-1.5 text-violet-400 text-sm font-semibold group-hover:gap-2.5 transition-all">
                <span>Launch</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </motion.div>
        </Link>
      ))}
    </motion.div>
  );
};

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 relative min-h-screen pb-8">

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-1.5 flex items-center gap-2">
            Welcome back, {user?.name?.split(' ')[0] || 'Founder'} <span className="text-2xl animate-bounce">👋</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">Here's what's happening with your startup journey today.</p>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 px-3.5 py-2 bg-white/[0.03] border border-white/[0.08] rounded-xl">
            <Clock className="h-4 w-4 text-slate-400" />
            <span className="text-xs font-semibold text-slate-400">Last updated: Just now</span>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          title="Ideas Generated"
          value={14}
          change="+3 today"
          changeType="positive"
          icon={Brain}
          gradient="radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.35), transparent 70%)"
          delay={0}
        />
        <StatCard
          title="Startups Analyzed"
          value={5}
          change="+2 this week"
          changeType="positive"
          icon={BarChart3}
          gradient="radial-gradient(circle at 30% 30%, rgba(16, 185, 129, 0.35), transparent 70%)"
          delay={1}
        />
        <StatCard
          title="Roadmaps Created"
          value={3}
          change="Active pipeline"
          changeType="neutral"
          icon={TrendingUp}
          gradient="radial-gradient(circle at 30% 30%, rgba(6, 182, 212, 0.35), transparent 70%)"
          delay={2}
        />
        <StatCard
          title="AI Credits"
          value={128}
          change="-12 used"
          changeType="negative"
          icon={Zap}
          gradient="radial-gradient(circle at 30% 30%, rgba(245, 158, 11, 0.35), transparent 70%)"
          delay={3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        <StartupReadiness />
        <AIInsights />
      </div>

      <ActivityTimeline />
      
      <div className="pt-2">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mb-4"
        >
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-violet-400" />
            AI Toolkit
          </h3>
        </motion.div>
        <AIToolkit />
      </div>

      <style>{`
        @keyframes dash {
          from { stroke-dashoffset: 251.2; }
          to { stroke-dashoffset: 32.656; }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;