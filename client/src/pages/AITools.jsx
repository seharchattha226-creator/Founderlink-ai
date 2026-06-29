import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  BarChart3, 
  TrendingUp, 
  Copy, 
  Check, 
  Sparkles,
  ArrowRight,
  Target,
  FileText,
  AlertTriangle,
  Lightbulb,
  CheckCircle
} from 'lucide-react';
import { aiAPI } from '../services/api';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const AITools = () => {
  const [activeTab, setActiveTab] = useState('idea');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const [ideaForm, setIdeaForm] = useState({
    industry: '',
    problem: '',
    targetAudience: '',
  });

  const [analysisForm, setAnalysisForm] = useState({
    startupName: '',
    businessModel: '',
    market: '',
    competitors: '',
  });

  const [roadmapForm, setRoadmapForm] = useState({
    productIdea: '',
    timeline: '6',
  });

  const handleCopy = () => {
    const text = JSON.stringify(result, null, 2);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('Copied JSON raw data!');
  };

  const handleGenerateIdea = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      console.log('[Frontend] generateIdea called with:', ideaForm);
      const data = await aiAPI.generateIdea(ideaForm);
      console.log('[Frontend] generateIdea response:', data);
      setResult({ type: 'idea', ...data.data });
      toast.success('AI co-founder formulated your idea! 🚀');
    } catch (error) {
      console.error('[Frontend] Error generating idea:', error);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to generate startup idea';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzeStartup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      console.log('[Frontend] analyzeStartup called with:', analysisForm);
      const data = await aiAPI.analyzeStartup(analysisForm);
      console.log('[Frontend] analyzeStartup response:', data);
      setResult({ type: 'analysis', ...data.data });
      toast.success('Business model validation analysis complete! 📊');
    } catch (error) {
      console.error('[Frontend] Error analyzing startup:', error);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to analyze startup model';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateRoadmap = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      console.log('[Frontend] generateRoadmap called with:', roadmapForm);
      const data = await aiAPI.generateRoadmap(roadmapForm);
      console.log('[Frontend] generateRoadmap response:', data);
      setResult({ type: 'roadmap', ...data.data });
      toast.success('Roadmap milestones generated successfully! 🗺️');
    } catch (error) {
      console.error('[Frontend] Error generating roadmap:', error);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to generate roadmap';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 relative">
      {/* Background Soft Glows */}
      <div className="absolute top-[-40px] left-[5%] w-[250px] h-[250px] rounded-full bg-violet-600/5 blur-[90px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white mb-2 flex items-center gap-2">
            AI Toolkit <Sparkles className="h-6 w-6 text-purple-400" />
          </h2>
          <p className="text-slate-400 text-sm">
            Leverage models optimized for startup validation, ideation and planning.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Tabs Column */}
        <div className="lg:col-span-4 space-y-4">
          <div className="glassmorphism-premium rounded-3xl p-6 space-y-3 border border-white/[0.05]">
            {[
              { id: 'idea', label: 'Idea Formulation', sub: 'Generate unique tech models', icon: Lightbulb, color: 'text-purple-400', activeBg: 'bg-purple-600/10 border-purple-500/30' },
              { id: 'analysis', label: 'Business Analysis', sub: 'Validate fit & run SWOTs', icon: BarChart3, color: 'text-emerald-400', activeBg: 'bg-emerald-600/10 border-emerald-500/30' },
              { id: 'roadmap', label: 'Roadmap Builder', sub: 'Map out milestones', icon: TrendingUp, color: 'text-cyan-400', activeBg: 'bg-cyan-600/10 border-cyan-500/30' },
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setResult(null);
                  }}
                  className={`w-full flex items-center p-5 rounded-2xl border text-left transition-all group ${
                    isSelected
                      ? `${tab.activeBg} text-white shadow-lg`
                      : 'border-transparent text-slate-400 hover:text-white hover:bg-white/[0.02]'
                  }`}
                >
                  <TabIcon className={`h-6 w-6 mr-4 ${isSelected ? tab.color : 'text-slate-500 group-hover:text-slate-300'} transition-colors`} />
                  <div>
                    <h3 className="text-base font-bold tracking-wide">{tab.label}</h3>
                    <p className="text-xs text-slate-400 mt-1">{tab.sub}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Forms & Output Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* Main Input Form Panel */}
          <div className="glassmorphism-premium rounded-3xl p-8 sm:p-10 relative overflow-hidden border border-white/[0.05]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

            <AnimatePresence mode="wait">
              {activeTab === 'idea' && (
                <motion.form 
                  key="idea"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleGenerateIdea} 
                  className="space-y-6"
                >
                  <div className="border-b border-white/[0.06] pb-6 mb-6">
                    <h3 className="text-2xl font-extrabold text-white">Generate Startup Idea</h3>
                    <p className="text-sm text-slate-400 mt-1">Provide an industry and target problem area.</p>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-2.5">
                        Target Industry
                      </label>
                      <input
                        type="text"
                        required
                        value={ideaForm.industry}
                        onChange={(e) => setIdeaForm({ ...ideaForm, industry: e.target.value })}
                        className="w-full px-5 py-4 bg-white/[0.02] border border-white/[0.08] focus:border-purple-500 rounded-xl text-white text-base placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-purple-500/35 transition-all"
                        placeholder="e.g. Healthcare, Web3 Logistics, B2B Procurement, PropTech"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-2.5">
                        Core Problem to Solve
                      </label>
                      <textarea
                        required
                        value={ideaForm.problem}
                        onChange={(e) => setIdeaForm({ ...ideaForm, problem: e.target.value })}
                        rows="3"
                        className="w-full px-5 py-4 bg-white/[0.02] border border-white/[0.08] focus:border-purple-500 rounded-xl text-white text-base placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-purple-500/35 transition-all"
                        placeholder="e.g. Restaurants wasting hours managing fresh-food suppliers manually."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-2.5">
                        Target Customer / Audience (Optional)
                      </label>
                      <input
                        type="text"
                        value={ideaForm.targetAudience}
                        onChange={(e) => setIdeaForm({ ...ideaForm, targetAudience: e.target.value })}
                        className="w-full px-5 py-4 bg-white/[0.02] border border-white/[0.08] focus:border-purple-500 rounded-xl text-white text-base placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-purple-500/35 transition-all"
                        placeholder="e.g. Small to midsize restaurant owners and kitchen managers"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-sm font-extrabold uppercase tracking-wider shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Formulating Model...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5 text-white" />
                        <span>Generate Idea</span>
                      </>
                    )}
                  </button>
                </motion.form>
              )}

              {activeTab === 'analysis' && (
                <motion.form 
                  key="analysis"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleAnalyzeStartup} 
                  className="space-y-6"
                >
                  <div className="border-b border-white/[0.06] pb-6 mb-6">
                    <h3 className="text-2xl font-extrabold text-white">Analyze Your Startup</h3>
                    <p className="text-sm text-slate-400 mt-1">Examine market validation, competitive risk and metrics.</p>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-2.5">
                        Startup / Project Name
                      </label>
                      <input
                        type="text"
                        required
                        value={analysisForm.startupName}
                        onChange={(e) => setAnalysisForm({ ...analysisForm, startupName: e.target.value })}
                        className="w-full px-5 py-4 bg-white/[0.02] border border-white/[0.08] focus:border-purple-500 rounded-xl text-white text-base placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-purple-500/35 transition-all"
                        placeholder="e.g. FreshSupply AI"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-2.5">
                        Business Model Description
                      </label>
                      <textarea
                        required
                        value={analysisForm.businessModel}
                        onChange={(e) => setAnalysisForm({ ...analysisForm, businessModel: e.target.value })}
                        rows="3"
                        className="w-full px-5 py-4 bg-white/[0.02] border border-white/[0.08] focus:border-purple-500 rounded-xl text-white text-base placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-purple-500/35 transition-all"
                        placeholder="e.g. Subscription SaaS starting at $99/mo for restaurants + transactional take-rate on wholesale orders."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-2.5">
                          Target Market (Optional)
                        </label>
                        <input
                          type="text"
                          value={analysisForm.market}
                          onChange={(e) => setAnalysisForm({ ...analysisForm, market: e.target.value })}
                          className="w-full px-5 py-4 bg-white/[0.02] border border-white/[0.08] focus:border-purple-500 rounded-xl text-white text-base placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-purple-500/35 transition-all"
                          placeholder="e.g. US restaurant sector"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-2.5">
                          Competitors (Optional)
                        </label>
                        <input
                          type="text"
                          value={analysisForm.competitors}
                          onChange={(e) => setAnalysisForm({ ...analysisForm, competitors: e.target.value })}
                          className="w-full px-5 py-4 bg-white/[0.02] border border-white/[0.08] focus:border-purple-500 rounded-xl text-white text-base placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-purple-500/35 transition-all"
                          placeholder="e.g. Toast, manual spreadsheets"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-sm font-extrabold uppercase tracking-wider shadow-lg shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Analyzing Business...</span>
                      </>
                    ) : (
                      <>
                        <BarChart3 className="h-5 w-5 text-white" />
                        <span>Analyze Startup</span>
                      </>
                    )}
                  </button>
                </motion.form>
              )}

              {activeTab === 'roadmap' && (
                <motion.form 
                  key="roadmap"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleGenerateRoadmap} 
                  className="space-y-6"
                >
                  <div className="border-b border-white/[0.06] pb-6 mb-6">
                    <h3 className="text-2xl font-extrabold text-white">Create Product Roadmap</h3>
                    <p className="text-sm text-slate-400 mt-1">Formulate phased timelines and objectives for product launch.</p>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-2.5">
                        Product / Feature Idea
                      </label>
                      <textarea
                        required
                        value={roadmapForm.productIdea}
                        onChange={(e) => setRoadmapForm({ ...roadmapForm, productIdea: e.target.value })}
                        rows="4"
                        className="w-full px-5 py-4 bg-white/[0.02] border border-white/[0.08] focus:border-purple-500 rounded-xl text-white text-base placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-purple-500/35 transition-all"
                        placeholder="e.g. Build an AI-driven invoice scanner that parses PDF invoices and imports supplier prices automatically."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-2.5">
                        Timeline (Months)
                      </label>
                      <select
                        value={roadmapForm.timeline}
                        onChange={(e) => setRoadmapForm({ ...roadmapForm, timeline: e.target.value })}
                        className="w-full px-5 py-4 bg-white/[0.02] border border-white/[0.08] focus:border-purple-500 rounded-xl text-white text-base focus:outline-none focus:ring-1 focus:ring-purple-500/35 transition-all"
                      >
                        <option value="3" className="bg-[#121214]">3 Months (Fast MVP)</option>
                        <option value="6" className="bg-[#121214]">6 Months (Standard Build)</option>
                        <option value="12" className="bg-[#121214]">12 Months (Enterprise Plan)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-sm font-extrabold uppercase tracking-wider shadow-lg shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Generating Milestones...</span>
                      </>
                    ) : (
                      <>
                        <TrendingUp className="h-5 w-5 text-white" />
                        <span>Generate Roadmap</span>
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Results Output Block */}
          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glassmorphism-premium rounded-3xl p-8 sm:p-10 relative overflow-hidden border border-purple-500/20 shadow-[0_0_50px_rgba(124,58,237,0.15)]"
            >
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-5 mb-8">
                <div>
                  <h3 className="text-2xl font-black text-white flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-purple-400" />
                    AI Recommendations
                  </h3>
                  <span className="text-xs text-slate-400 font-semibold">Model Output parsed successfully</span>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold text-slate-300 hover:text-white transition-colors border border-white/10"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 mr-1.5 text-emerald-400" />
                    ) : (
                      <Copy className="h-4 w-4 mr-1.5" />
                    )}
                    {copied ? 'Copied!' : 'Copy RAW'}
                  </button>
                </div>
              </div>

              {/* Dynamic Presentation Layer (No CRUD-style plain JSON) */}
              <div className="space-y-8">
                
                {/* 1. Startup Idea Response Display */}
                {result.type === 'idea' && (
                  <div className="space-y-6">
                    <div className="bg-purple-500/10 border border-purple-500/15 p-6 rounded-2xl text-left">
                      <h4 className="text-2xl font-black text-white mb-2">{result.title}</h4>
                      <p className="text-slate-200 text-base leading-relaxed">{result.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white/[0.02] border border-white/[0.06] p-5 rounded-2xl text-left">
                        <span className="text-xs font-bold text-purple-400 uppercase tracking-widest flex items-center mb-3">
                          <Target className="h-4.5 w-4.5 mr-2" /> Target Audience
                        </span>
                        <p className="text-sm text-slate-300 leading-relaxed">{result.targetAudience}</p>
                      </div>

                      <div className="bg-white/[0.02] border border-white/[0.06] p-5 rounded-2xl text-left">
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center mb-3">
                          <Zap className="h-4.5 w-4.5 mr-2" /> Unique Value Proposition
                        </span>
                        <p className="text-sm text-slate-300 leading-relaxed">{result.uniqueValueProposition}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Business Model */}
                      <div className="bg-white/[0.01] border border-white/[0.04] p-5 rounded-2xl text-left">
                        <h5 className="text-xs font-bold text-white mb-4 tracking-wide uppercase">Revenue Streams</h5>
                        <ul className="space-y-3">
                          {result.businessModel?.map((b, i) => (
                            <li key={i} className="text-sm text-slate-400 flex items-start leading-relaxed">
                              <span className="text-purple-400 mr-2">•</span> {b}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Challenges */}
                      <div className="bg-white/[0.01] border border-white/[0.04] p-5 rounded-2xl text-left">
                        <h5 className="text-xs font-bold text-white mb-4 tracking-wide uppercase">Execution Hurdles</h5>
                        <ul className="space-y-3">
                          {result.challenges?.map((c, i) => (
                            <li key={i} className="text-sm text-slate-400 flex items-start leading-relaxed">
                              <span className="text-red-400 mr-2">•</span> {c}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Next Steps */}
                      <div className="bg-white/[0.01] border border-white/[0.04] p-5 rounded-2xl text-left">
                        <h5 className="text-xs font-bold text-white mb-4 tracking-wide uppercase">Immediate Tasks</h5>
                        <ul className="space-y-3">
                          {result.nextSteps?.map((n, i) => (
                            <li key={i} className="text-sm text-slate-400 flex items-start leading-relaxed">
                              <span className="text-emerald-400 mr-2">✓</span> {n}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Startup Analysis Response Display */}
                {result.type === 'analysis' && (
                  <div className="space-y-8">
                    {/* Score panel */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-white/[0.02] border border-white/[0.05] rounded-2xl">
                      <div className="text-center md:border-r border-white/5 py-3">
                        <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Overall Rating</span>
                        <div className="text-4xl font-black text-white mt-2">{result.overallScore}/100</div>
                      </div>
                      <div className="text-center md:border-r border-white/5 py-3">
                        <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Market Fit</span>
                        <div className="text-4xl font-black text-purple-400 mt-2">{result.marketFitScore}%</div>
                      </div>
                      <div className="text-center md:border-r border-white/5 py-3">
                        <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Team Moat</span>
                        <div className="text-4xl font-black text-emerald-400 mt-2">{result.teamScore}%</div>
                      </div>
                      <div className="text-center py-3">
                        <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Product Feasibility</span>
                        <div className="text-4xl font-black text-cyan-400 mt-2">{result.productScore}%</div>
                      </div>
                    </div>

                    {/* SWOT analysis grid */}
                    <div className="text-left">
                      <h4 className="text-sm font-bold text-white tracking-widest uppercase mb-4">SWOT Analysis</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Strengths */}
                        <div className="bg-emerald-500/5 border border-emerald-500/10 p-5 rounded-2xl">
                          <span className="text-sm font-bold text-emerald-400 flex items-center mb-3"><CheckCircle className="h-5 w-5 mr-2" /> Strengths</span>
                          <ul className="space-y-2 text-sm text-slate-300">
                            {result.strengths?.map((s, i) => <li key={i} className="leading-relaxed">• {s}</li>)}
                          </ul>
                        </div>

                        {/* Weaknesses */}
                        <div className="bg-orange-500/5 border border-orange-500/10 p-5 rounded-2xl">
                          <span className="text-sm font-bold text-orange-400 flex items-center mb-3"><AlertTriangle className="h-5 w-5 mr-2" /> Weaknesses</span>
                          <ul className="space-y-2 text-sm text-slate-300">
                            {result.weaknesses?.map((w, i) => <li key={i} className="leading-relaxed">• {w}</li>)}
                          </ul>
                        </div>

                        {/* Opportunities */}
                        <div className="bg-purple-500/5 border border-purple-500/10 p-5 rounded-2xl">
                          <span className="text-sm font-bold text-purple-400 flex items-center mb-3"><Sparkles className="h-5 w-5 mr-2" /> Opportunities</span>
                          <ul className="space-y-2 text-sm text-slate-300">
                            {result.opportunities?.map((o, i) => <li key={i} className="leading-relaxed">• {o}</li>)}
                          </ul>
                        </div>

                        {/* Threats */}
                        <div className="bg-red-500/5 border border-red-500/10 p-5 rounded-2xl">
                          <span className="text-sm font-bold text-red-400 flex items-center mb-3"><AlertTriangle className="h-5 w-5 mr-2" /> Threats</span>
                          <ul className="space-y-2 text-sm text-slate-300">
                            {result.threats?.map((t, i) => <li key={i} className="leading-relaxed">• {t}</li>)}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div className="bg-white/[0.01] border border-white/[0.05] p-6 rounded-2xl text-left">
                      <h4 className="text-sm font-bold text-white tracking-widest uppercase mb-4 flex items-center">
                        <FileText className="h-5 w-5 text-purple-400 mr-2" />
                        AI Strategic Recommendations
                      </h4>
                      <ul className="space-y-3 text-sm text-slate-300">
                        {result.recommendations?.map((r, i) => (
                          <li key={i} className="flex items-start leading-relaxed">
                            <span className="text-purple-400 mr-2">➜</span> {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* 3. Product Roadmap Response Display */}
                {result.type === 'roadmap' && (
                  <div className="space-y-8">
                    <div className="bg-cyan-500/10 border border-cyan-500/15 p-6 rounded-2xl mb-6 text-left">
                      <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">Scope Context</span>
                      <p className="text-slate-200 text-sm sm:text-base leading-relaxed mt-2">
                        <strong>Project Concept:</strong> {result.productIdea} <br/>
                        <strong>Planned Timeline:</strong> {result.timelineMonths} Months
                      </p>
                    </div>

                    <div className="space-y-6 text-left">
                      <h4 className="text-sm font-bold text-white tracking-widest uppercase mb-4">Phased Deliverables</h4>
                      {result.milestones?.map((milestone, idx) => (
                        <div key={idx} className="relative pl-8 border-l border-white/10 pb-6 last:pb-0">
                          {/* Dot Node */}
                          <div className="absolute -left-[6px] top-2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                          
                          <div className="bg-white/[0.02] border border-white/[0.04] p-5 rounded-2xl">
                            <div className="flex justify-between items-center mb-4">
                              <h5 className="text-base font-extrabold text-white">{milestone.phase}</h5>
                              <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold rounded">
                                {milestone.duration}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                              <div>
                                <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Key Objectives</span>
                                <ul className="list-disc pl-4 space-y-2 mt-2 text-slate-400 leading-relaxed">
                                  {milestone.objectives?.map((obj, i) => <li key={i}>{obj}</li>)}
                                </ul>
                              </div>
                              <div>
                                <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Tangible Deliverables</span>
                                <ul className="list-disc pl-4 space-y-2 mt-2 text-slate-400 leading-relaxed">
                                  {milestone.deliverables?.map((del, i) => <li key={i}>{del}</li>)}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Key Metrics */}
                    <div className="bg-white/[0.01] border border-white/[0.05] p-6 rounded-2xl text-left">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Target KPI Metrics to Track</h4>
                      <div className="flex flex-wrap gap-2.5">
                        {result.keyMetrics?.map((metric, i) => (
                          <span key={i} className="px-3.5 py-1.5 bg-white/5 border border-white/10 text-slate-300 text-sm rounded-xl">
                            {metric}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-center mt-8">
                      <Link
                        to="/roadmap"
                        className="px-8 py-3.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-sm font-extrabold uppercase tracking-wider flex items-center space-x-2 transition-all hover:scale-105"
                      >
                        <span>View Interactive Board</span>
                        <ArrowRight className="h-4.5 w-4.5" />
                      </Link>
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AITools;
