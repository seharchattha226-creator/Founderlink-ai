import { useState, useEffect } from 'react';
import { 
  Brain, 
  BarChart3, 
  TrendingUp, 
  Target, 
  Zap, 
  Sparkles, 
  MessageSquare, 
  Users, 
  Activity, 
  TrendingDown, 
  CheckCircle, 
  AlertCircle, 
  Lightbulb, 
  PieChart, 
  ArrowRight, 
  Clock, 
  Check, 
  X, 
  Rocket, 
  DollarSign, 
  Calendar, 
  Shield, 
  Award, 
  Star,
  Gauge
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AIWorkspace() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Welcome! I analyzed your SaaS idea. Let me show you how we can validate and scale it.' }
  ]);
  const [counts, setCounts] = useState({ score: 0, funding: 0, growth: 0, tam: 0 });

  useEffect(() => {
    // Animate counters on mount
    const animateCounter = (key, target, duration = 2000) => {
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

    animateCounter('score', 92);
    animateCounter('funding', 87);
    animateCounter('growth', 95);
    animateCounter('tam', 2400);
  }, []);

  useEffect(() => {
    if (activeTab === 'chat' && !isTyping) {
      const timer = setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            role: 'ai', 
            text: 'Great question! Your market opportunity looks strong with 42% YoY growth in your target segment.' 
          }]);
          setIsTyping(false);
        }, 2000);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'swot', name: 'SWOT', icon: Target },
    { id: 'market', name: 'Market', icon: TrendingUp },
    { id: 'chat', name: 'AI Chat', icon: MessageSquare },
    { id: 'roadmap', name: 'Roadmap', icon: Activity },
    { id: 'funding', name: 'Funding', icon: DollarSign }
  ];

  const statCards = [
    { label: 'Startup Score', value: counts.score, suffix: '', gradient: 'from-purple-500 to-indigo-500' },
    { label: 'Funding Probability', value: counts.funding, suffix: '%', gradient: 'from-cyan-500 to-blue-500' },
    { label: 'TAM Size', value: Math.floor(counts.tam / 1000), suffix: 'B', gradient: 'from-emerald-500 to-teal-500' },
    { label: 'Growth Score', value: counts.growth, suffix: '', gradient: 'from-amber-500 to-orange-500' }
  ];

  const swotItems = [
    { type: 'strength', text: 'Strong founding team with domain expertise' },
    { type: 'weakness', text: 'Limited initial capital for scaling' },
    { type: 'opportunity', text: 'Enterprise adoption accelerating' },
    { type: 'threat', text: 'Competitive landscape evolving rapidly' }
  ];

  const timelineItems = [
    { time: '2 min ago', text: 'Market analysis completed', type: 'success' },
    { time: '5 min ago', text: 'Competitor research updated', type: 'info' },
    { time: '12 min ago', text: 'Founder compatibility checked', type: 'success' },
    { time: '20 min ago', text: 'AI insights generated', type: 'success' }
  ];

  const aiSuggestions = [
    { priority: 'High', text: 'Launch MVP in 3 months to validate product-market fit', icon: Rocket },
    { priority: 'Medium', text: 'Build 3 core features first to keep scope manageable', icon: Target },
    { priority: 'Low', text: 'Consider pre-seed funding after initial traction', icon: DollarSign }
  ];

  return (
    <div className="relative">
      {/* Enhanced glow effects behind workspace */}
      <div className="absolute -inset-12 bg-gradient-to-br from-purple-600/25 via-indigo-600/20 to-cyan-600/25 rounded-[4rem] blur-3xl opacity-70"></div>
      <div className="absolute -inset-6 bg-gradient-to-tr from-cyan-500/15 to-purple-500/15 rounded-[3rem] blur-2xl opacity-50"></div>
      
      {/* Main workspace container */}
      <div className="relative glass-ultra glass-ultra-glow rounded-[2.5rem] p-2 sm:p-4 border border-white/10 overflow-hidden">
        <div className="relative overflow-hidden rounded-[2rem]">
          {/* Workspace Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 bg-gradient-to-b from-white/5 to-transparent">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/60"></div>
              </div>
              <div className="px-4 py-1.5 bg-white/5 rounded-xl border border-white/10">
                <span className="text-xs font-mono text-slate-400">founderlink.ai/workspace</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-xs font-bold text-emerald-400">AI Processing</span>
              </div>
              <Sparkles className="w-5 h-5 text-purple-400 animate-pulse-glow"></Sparkles>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px] sm:min-h-[580px]">
            {/* Sidebar */}
            <div className="hidden lg:flex lg:col-span-3 border-r border-white/8 bg-black/10">
              <div className="p-4 space-y-2">
                {tabs.map((tab, index) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-xl
                      transition-all duration-300
                      ${isActive
                        ? 'bg-gradient-to-r from-purple-600/30 to-indigo-600/20 border border-purple-500/30 text-white shadow-lg shadow-purple-500/10'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent hover:border-white/5'
                      }
                    `}
                  >
                    <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-purple-300' : ''}`}></Icon>
                    <span className="text-sm font-semibold">{tab.name}</span>
                  </button>
                );
              })}
              </div>

              {/* Quick Actions */}
              <div className="p-4 mt-6 border-t border-white/8">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Quick Actions</div>
                <div className="space-y-2">
                  <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-white/5 border border-transparent hover:border-white/5 transition-all">
                    <Lightbulb className="w-4 h-4 text-yellow-400"></Lightbulb>
                    <span className="text-sm">Generate Idea</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-white/5 border border-transparent hover:border-white/5 transition-all">
                    <Target className="w-4 h-4 text-cyan-400"></Target>
                    <span className="text-sm">Validate Idea</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-white/5 border border-transparent hover:border-white/5 transition-all">
                    <Rocket className="w-4 h-4 text-purple-400"></Rocket>
                    <span className="text-sm">Launch Plan</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-9 p-4 sm:p-6 overflow-y-auto">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div
                    key="overview"
                    className="h-full space-y-5"
                  >
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 gap-4">
                      {statCards.map((stat, index) => (
                        <div
                          key={stat.label}
                          className="glass-premium rounded-2xl p-4 relative overflow-hidden"
                        >
                          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl"></div>
                          <div className="relative">
                            <div className="text-xs font-semibold text-slate-400 mb-1">{stat.label}</div>
                            <div className={`text-2xl sm:text-3xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                              {stat.value}{stat.suffix}
                            </div>
                            {stat.label === 'Startup Score' && (
                              <div className="mt-2 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                                  style={{ width: '92%' }}
                                ></div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {/* AI Insights Panel */}
                      <div className="glass-premium rounded-2xl p-5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full blur-2xl"></div>
                        <div className="relative">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                              <div className="p-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-xl animate-pulse-glow">
                                <Brain className="w-5 h-5 text-purple-400"></Brain>
                              </div>
                              <h3 className="text-sm font-bold text-white">AI Insights</h3>
                            </div>
                            <span className="px-2.5 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs font-bold text-purple-300">Live</span>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-start space-x-3 p-3 bg-white/5 rounded-xl">
                              <CheckCircle className="w-4.5 h-4.5 text-emerald-400 mt-0.5 flex-shrink-0"></CheckCircle>
                              <p className="text-sm text-slate-300">Market opportunity shows 42% YoY growth</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-white/5 rounded-xl">
                              <CheckCircle className="w-4.5 h-4.5 text-emerald-400 mt-0.5 flex-shrink-0"></CheckCircle>
                              <p className="text-sm text-slate-300">Competitive landscape is manageable</p>
                            </div>
                            <div className="flex items-start space-x-3 p-3 bg-white/5 rounded-xl">
                              <Lightbulb className="w-4.5 h-4.5 text-yellow-400 mt-0.5 flex-shrink-0"></Lightbulb>
                              <p className="text-sm text-slate-300">Strong product-market fit indicators</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Growth Chart */}
                      <div className="glass-premium rounded-2xl p-5">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-sm font-bold text-white">Revenue Forecast</h3>
                          <TrendingUp className="w-4 h-4 text-cyan-400"></TrendingUp>
                        </div>
                        <div className="h-28 relative">
                          <svg viewBox="0 0 300 80" className="w-full h-full">
                            <defs>
                              <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4"></stop>
                                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0"></stop>
                              </linearGradient>
                              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#4f46e5"></stop>
                                <stop offset="50%" stopColor="#6366f1"></stop>
                                <stop offset="100%" stopColor="#22d3ee"></stop>
                              </linearGradient>
                            </defs>
                            <path
                              d="M0 65 C 30 60, 60 45, 90 48 C 120 52, 150 35, 180 38 C 210 42, 240 20, 270 23 L 300 15 L 300 80 L 0 80 Z"
                              fill="url(#growthGrad)"
                            ></path>
                            <path
                              d="M0 65 C 30 60, 60 45, 90 48 C 120 52, 150 35, 180 38 C 210 42, 240 20, 270 23 L 300 15"
                              fill="none"
                              stroke="url(#lineGrad)"
                              strokeWidth="3"
                              strokeLinecap="round"
                            ></path>
                            <circle cx="300" cy="15" r="5" fill="#8b5cf6" className="animate-pulse-glow"></circle>
                          </svg>
                          {/* Chart labels */}
                          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] text-slate-500 px-2">
                            <span>Jan</span>
                            <span>Feb</span>
                            <span>Mar</span>
                            <span>Apr</span>
                            <span>May</span>
                            <span>Jun</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* AI Suggestions */}
                    <div className="glass-premium rounded-2xl p-5">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-white">AI Suggestions</h3>
                        <Zap className="w-4 h-4 text-yellow-400 animate-pulse"></Zap>
                      </div>
                      <div className="space-y-3">
                        {aiSuggestions.map((suggestion, index) => {
                          const Icon = suggestion.icon;
                          return (
                            <div
                              key={index}
                              className="flex items-start space-x-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer"
                            >
                              <div className={`p-2 rounded-lg ${
                                suggestion.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                                suggestion.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-blue-500/20 text-blue-400'
                              }`}>
                                <Icon className="w-4 h-4"></Icon>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                                    suggestion.priority === 'High' ? 'text-red-400' :
                                    suggestion.priority === 'Medium' ? 'text-yellow-400' :
                                    'text-blue-400'
                                  }`}>{suggestion.priority}</span>
                                </div>
                                <p className="text-sm text-slate-300">{suggestion.text}</p>
                              </div>
                              <ArrowRight className="w-4 h-4 text-slate-500"></ArrowRight>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* SWOT Tab */}
                {activeTab === 'swot' && (
                  <div
                    key="swot"
                    className="h-full space-y-4"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">SWOT Analysis</h3>
                      <Sparkles className="w-4 h-4 text-purple-400"></Sparkles>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {swotItems.map((item, index) => {
                        const colorClass = item.type === 'strength' ? 'emerald' :
                                          item.type === 'weakness' ? 'amber' :
                                          item.type === 'opportunity' ? 'cyan' : 'red';
                        
                        const bgColor = item.type === 'strength' ? 'from-emerald-500/10' :
                                       item.type === 'weakness' ? 'from-amber-500/10' :
                                       item.type === 'opportunity' ? 'from-cyan-500/10' : 'from-red-500/10';
                        
                        const textColor = item.type === 'strength' ? 'text-emerald-400' :
                                         item.type === 'weakness' ? 'text-amber-400' :
                                         item.type === 'opportunity' ? 'text-cyan-400' : 'text-red-400';
                        
                        const borderColor = item.type === 'strength' ? 'border-emerald-500/20' :
                                           item.type === 'weakness' ? 'border-amber-500/20' :
                                           item.type === 'opportunity' ? 'border-cyan-500/20' : 'border-red-500/20';
                        
                        return (
                          <div
                            key={index}
                            className={`glass-premium rounded-2xl p-4 ${borderColor} relative overflow-hidden`}
                          >
                            <div className={`absolute inset-0 bg-gradient-to-br ${bgColor} to-transparent opacity-50`}></div>
                            <div className="relative">
                              <div className={`text-xs font-bold ${textColor} uppercase tracking-wider mb-2`}>{item.type}</div>
                              <p className="text-sm text-slate-200">{item.text}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {/* Investor Readiness Meter */}
                    <div className="glass-premium rounded-2xl p-5 mt-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-white">Investor Readiness</h3>
                        <Award className="w-4 h-4 text-yellow-400"></Award>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-yellow-500 via-orange-500 to-emerald-500 rounded-full"
                            style={{ width: '87%' }}
                          ></div>
                        </div>
                        <span className="text-xl font-black bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">87%</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-3">Your startup is well-prepared for investor meetings</p>
                    </div>
                  </div>
                )}

                {/* Chat Tab */}
                {activeTab === 'chat' && (
                  <div className="flex flex-col h-full">
                    <div className="flex-1 space-y-4 mb-4">
                      {messages.map((msg, i) => (
                        <div
                          key={i}
                          className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}
                        >
                          <div className={`max-w-[80%] glass-premium rounded-2xl p-4 ${msg.role === 'ai' ? 'rounded-tl-sm' : 'rounded-tr-sm'}`}>
                            {msg.role === 'ai' && (
                              <div className="flex items-center space-x-2 mb-2">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
                                  <Brain className="w-3.5 h-3.5 text-white"></Brain>
                                </div>
                                <span className="text-xs font-bold text-slate-400">AI Co-founder</span>
                              </div>
                            )}
                            <p className="text-sm text-slate-200">{msg.text}</p>
                          </div>
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="glass-premium rounded-2xl rounded-tl-sm p-4">
                            <div className="flex space-x-1.5">
                              <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                              <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                              <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Ask your AI co-founder..."
                        className="flex-1 glass-premium rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none"
                      ></input>
                      <button className="btn-primary-gradient rounded-xl px-4 py-3 flex items-center space-x-2">
                        <ArrowRight className="w-4 h-4"></ArrowRight>
                      </button>
                    </div>
                  </div>
                )}

                {/* Market Tab */}
                {activeTab === 'market' && (
                  <div className="h-full space-y-4">
                    <div className="glass-premium rounded-2xl p-5">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-white">Market Validation</h3>
                        <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-bold text-emerald-400">88/100</span>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-400">Market Size</span>
                            <span className="text-slate-300">$2.4B</span>
                          </div>
                          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                              style={{ width: '85%' }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-400">Growth Rate</span>
                            <span className="text-slate-300">42% YoY</span>
                          </div>
                          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                              style={{ width: '78%' }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-400">Competition</span>
                            <span className="text-slate-300">Moderate</span>
                          </div>
                          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                              style={{ width: '55%' }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Activity Timeline */}
                    <div className="glass-premium rounded-2xl p-5">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-white">Recent Activity</h3>
                        <Clock className="w-4 h-4 text-slate-400"></Clock>
                      </div>
                      <div className="space-y-3">
                        {timelineItems.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-3"
                          >
                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                              item.type === 'success' ? 'bg-emerald-500' : 'bg-blue-500'
                            }`}></div>
                            <div>
                              <p className="text-sm text-slate-200">{item.text}</p>
                              <p className="text-xs text-slate-500 mt-0.5">{item.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
