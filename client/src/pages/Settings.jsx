import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  Key, 
  CreditCard, 
  Shield, 
  Eye, 
  EyeOff, 
  Sparkles,
  Sliders,
  Plus,
  Mail
} from 'lucide-react';
import toast from 'react-hot-toast';

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [saving, setSaving] = useState(false);

  // Forms states
  const [profileForm, setProfileForm] = useState({
    name: user?.name || 'Founder',
    email: user?.email || 'founder@company.com',
    role: user?.role || 'CEO',
    bio: 'Building the next-gen AI platform for automation and data analytics.'
  });

  const [apiKeys, setApiKeys] = useState({
    openai: 'sk-proj-••••••••••••••••••••••••3aB8',
    anthropic: 'sk-ant-••••••••••••••••••••••••7c4F',
  });

  const [showOpenAI, setShowOpenAI] = useState(false);
  const [showAnthropic, setShowAnthropic] = useState(false);

  const [invites, setInvites] = useState([
    { email: 'co-founder@startup.com', role: 'CTO', status: 'pending' },
    { email: 'adviser@vcfirm.com', role: 'Adviser', status: 'accepted' }
  ]);

  const [newInvite, setNewInvite] = useState({ email: '', role: 'Developer' });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success('Workspace profile details updated!');
    }, 1000);
  };

  const handleSaveKeys = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success('Custom LLM API Keys mapped successfully.');
    }, 1000);
  };

  const handleSendInvite = (e) => {
    e.preventDefault();
    if (!newInvite.email) return;
    setInvites([...invites, { email: newInvite.email, role: newInvite.role, status: 'pending' }]);
    setNewInvite({ email: '', role: 'Developer' });
    toast.success('Invitation sent successfully! 📧');
  };

  return (
    <div className="space-y-10 relative">
      {/* Background glow mesh */}
      <div className="absolute top-[-80px] right-[15%] w-[400px] h-[400px] rounded-full bg-violet-600/10 blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-[350px] h-[350px] rounded-full bg-purple-500/5 blur-[90px] pointer-events-none" />

      {/* Header */}
      <div>
        <h2 className="text-4xl font-extrabold tracking-tight text-white mb-3 flex items-center gap-3">
          Workspace Settings <Sliders className="h-8 w-8 text-purple-400" />
        </h2>
        <p className="text-slate-400 text-base leading-relaxed">
          Manage profiles, billing tiers, security tokens, and invite team co-founders.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Navigation Links */}
        <div className="lg:col-span-3 space-y-4">
          <div className="glassmorphism-premium rounded-2xl p-5 space-y-2">
            {[
              { id: 'profile', label: 'Founder Profile', icon: User, color: 'text-purple-400' },
              { id: 'keys', label: 'LLM API Keys', icon: Key, color: 'text-cyan-400' },
              { id: 'billing', label: 'Limits & Subscription', icon: CreditCard, color: 'text-emerald-400' },
              { id: 'team', label: 'Co-Founders & Team', icon: Shield, color: 'text-amber-400' }
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-4 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-purple-600/10 border-purple-500/20 text-white font-bold'
                      : 'border-transparent text-slate-400 hover:text-white hover:bg-white/[0.02]'
                  }`}
                >
                  <Icon className={`h-5 w-5 mr-3 ${isSelected ? tab.color : 'text-slate-500'}`} />
                  <span className="text-sm tracking-wide">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Tab Panel Panels */}
        <div className="lg:col-span-9">
          <div className="glassmorphism-premium rounded-2xl p-8 sm:p-10 border border-white/[0.06] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

            {activeTab === 'profile' && (
              <form onSubmit={handleSaveProfile} className="space-y-8">
                <div className="border-b border-white/[0.06] pb-5 mb-5">
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">Founder Profile Settings</h3>
                  <p className="text-sm text-slate-400 mt-1">Update user metadata and startup role configuration.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2.5">Display Name</label>
                    <input
                      type="text"
                      required
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full px-5 py-3.5 bg-white/[0.02] border border-white/[0.08] focus:border-purple-500 rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2.5">Email Address</label>
                    <input
                      type="email"
                      disabled
                      value={profileForm.email}
                      className="w-full px-5 py-3.5 bg-white/[0.01] border border-white/[0.04] text-slate-500 rounded-xl text-sm cursor-not-allowed focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2.5">Startup Role Badge</label>
                    <input
                      type="text"
                      value={profileForm.role}
                      onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
                      className="w-full px-5 py-3.5 bg-white/[0.02] border border-white/[0.08] focus:border-purple-500 rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2.5">Biography / Co-founder pitch</label>
                    <textarea
                      value={profileForm.bio}
                      onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                      rows="3"
                      className="w-full px-5 py-3.5 bg-white/[0.02] border border-white/[0.08] focus:border-purple-500 rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-5 border-t border-white/[0.06]">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-sm font-bold transition-all shadow-md hover:scale-105"
                  >
                    {saving ? 'Updating...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'keys' && (
              <form onSubmit={handleSaveKeys} className="space-y-8">
                <div className="border-b border-white/[0.06] pb-5 mb-5">
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">Custom API Integrations</h3>
                  <p className="text-sm text-slate-400 mt-1">Provide custom tokens to leverage advanced model limits directly.</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2.5">
                      <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">OpenAI API Key</label>
                      <button
                        type="button"
                        onClick={() => setShowOpenAI(!showOpenAI)}
                        className="text-xs text-slate-400 hover:text-white flex items-center space-x-1.5"
                      >
                        {showOpenAI ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span>{showOpenAI ? 'Hide Token' : 'Show Token'}</span>
                      </button>
                    </div>
                    <input
                      type={showOpenAI ? 'text' : 'password'}
                      value={apiKeys.openai}
                      onChange={(e) => setApiKeys({ ...apiKeys, openai: e.target.value })}
                      className="w-full px-5 py-3.5 bg-white/[0.02] border border-white/[0.08] focus:border-cyan-500 rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2.5">
                      <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">Anthropic API Key</label>
                      <button
                        type="button"
                        onClick={() => setShowAnthropic(!showAnthropic)}
                        className="text-xs text-slate-400 hover:text-white flex items-center space-x-1.5"
                      >
                        {showAnthropic ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span>{showAnthropic ? 'Hide Token' : 'Show Token'}</span>
                      </button>
                    </div>
                    <input
                      type={showAnthropic ? 'text' : 'password'}
                      value={apiKeys.anthropic}
                      onChange={(e) => setApiKeys({ ...apiKeys, anthropic: e.target.value })}
                      className="w-full px-5 py-3.5 bg-white/[0.02] border border-white/[0.08] focus:border-cyan-500 rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-5 border-t border-white/[0.06]">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-3.5 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white rounded-xl text-sm font-bold transition-all shadow-md hover:scale-105"
                  >
                    {saving ? 'Mapping keys...' : 'Connect Endpoints'}
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'billing' && (
              <div className="space-y-8">
                <div className="border-b border-white/[0.06] pb-5 mb-5">
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">Limits & Pricing Subscription</h3>
                  <p className="text-sm text-slate-400 mt-1">Current tier information, invoice timelines and API limitations.</p>
                </div>

                {/* Pricing plan callout */}
                <div className="p-6 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/20 rounded-2xl relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
                  
                  <div>
                    <span className="px-2.5 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase rounded-lg">Active Tier</span>
                    <h4 className="text-2xl font-bold text-white mt-2 flex items-center">
                      Founder Pro Plan <Sparkles className="h-5 w-5 text-purple-400 ml-2" />
                    </h4>
                    <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">Unlimited idea drafts, dedicated support, and access to GPT-4o models.</p>
                  </div>
                  
                  <div className="text-right flex-shrink-0">
                    <span className="text-3xl font-black text-white">$49</span>
                    <span className="text-sm text-slate-400 font-medium">/mo</span>
                    <p className="text-xs text-slate-500 mt-1">Next renewal: July 22, 2026</p>
                  </div>
                </div>

                {/* Resource limit indicators */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  <div className="bg-white/[0.01] border border-white/[0.04] p-5 rounded-2xl">
                    <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Idea Formulations</span>
                    <div className="text-3xl font-black text-white mt-2">54 / 100</div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full mt-3 overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: '54%' }} />
                    </div>
                  </div>

                  <div className="bg-white/[0.01] border border-white/[0.04] p-5 rounded-2xl">
                    <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">SWOT Analyses</span>
                    <div className="text-3xl font-black text-white mt-2">4 / 10</div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full mt-3 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '40%' }} />
                    </div>
                  </div>

                  <div className="bg-white/[0.01] border border-white/[0.04] p-5 rounded-2xl">
                    <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Milestone Exports</span>
                    <div className="text-3xl font-black text-white mt-2">3 / 5</div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full mt-3 overflow-hidden">
                      <div className="h-full bg-cyan-500 rounded-full" style={{ width: '60%' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'team' && (
              <div className="space-y-8">
                <div className="border-b border-white/[0.06] pb-5 mb-5">
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">Co-Founders & Workspace Access</h3>
                  <p className="text-sm text-slate-400 mt-1">Invite developers, advisers, or team members to validate ideas together.</p>
                </div>

                {/* Team invites form */}
                <form onSubmit={handleSendInvite} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">Member Email</label>
                    <input
                      type="email"
                      required
                      value={newInvite.email}
                      onChange={(e) => setNewInvite({ ...newInvite, email: e.target.value })}
                      className="w-full px-5 py-3 bg-white/[0.02] border border-white/[0.08] focus:border-purple-500 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none"
                      placeholder="partner@company.com"
                    />
                  </div>
                  <div className="flex space-x-3">
                    <select
                      value={newInvite.role}
                      onChange={(e) => setNewInvite({ ...newInvite, role: e.target.value })}
                      className="flex-1 px-4 py-3 bg-[#0F0F11]/90 border border-white/[0.08] focus:border-purple-500 rounded-xl text-white text-sm focus:outline-none"
                    >
                      <option value="CTO" className="bg-[#121214]">CTO</option>
                      <option value="Developer" className="bg-[#121214]">Developer</option>
                      <option value="Adviser" className="bg-[#121214]">Adviser</option>
                    </select>
                    <button
                      type="submit"
                      className="p-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-sm font-bold transition-all hover:scale-105"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                </form>

                {/* Invited team lists */}
                <div className="space-y-3.5 pt-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Workspace Collaborators</h4>
                  {invites.map((member, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center justify-between p-4.5 bg-white/[0.01] border border-white/[0.04] rounded-2xl text-sm"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2.5 bg-white/5 rounded-xl text-slate-400">
                          <Mail className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-bold text-white text-sm">{member.email}</p>
                          <p className="text-xs text-slate-500 mt-0.5">Role: {member.role}</p>
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                        member.status === 'pending'
                          ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                          : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                      }`}>
                        {member.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default Settings;
