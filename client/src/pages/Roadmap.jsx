import { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Layers,
  HelpCircle
} from 'lucide-react';
import { aiAPI } from '../services/api';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const Roadmap = () => {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Market Validation Interviews', desc: 'Conduct interviews with 15 restaurant owners on supply issues.', category: 'Discovery', duration: '1 wk', status: 'completed' },
    { id: '2', title: 'Interactive Figma Mockups', desc: 'Build prototype of main order dashboards and seller settings.', category: 'Design', duration: '2 wks', status: 'completed' },
    { id: '3', title: 'Setup Server Architecture', desc: 'Initialize Express + MongoDB server on staging environment.', category: 'Backend', duration: '1 wk', status: 'in-progress' },
    { id: '4', title: 'Tailwind Theme Styling', desc: 'Integrate custom CSS styles, fonts, and dark glass elements.', category: 'Frontend', duration: '2 wks', status: 'in-progress' },
    { id: '5', title: 'Stripe Checkout Sandbox', desc: 'Set up subscription pricing plans and test charge logic.', category: 'Integration', duration: '1 wk', status: 'backlog' },
    { id: '6', title: 'Product Launch Campaign', desc: 'Plan LinkedIn ads and launch on Product Hunt.', category: 'Marketing', duration: '3 wks', status: 'backlog' },
  ]);

  const [aiLoading, setAiLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);
  
  const [newTrack, setNewTrack] = useState({
    title: '',
    desc: '',
    category: 'General',
    duration: '1 wk',
    status: 'backlog'
  });

  const [aiForm, setAiForm] = useState({
    productIdea: '',
    timeline: '6'
  });

  const columns = [
    { id: 'backlog', name: 'Backlog', labelBg: 'bg-slate-500/10 border-slate-500/20 text-slate-400', glow: 'rgba(148, 163, 184, 0.1)' },
    { id: 'in-progress', name: 'In Progress', labelBg: 'bg-purple-500/10 border-purple-500/20 text-purple-400', glow: 'rgba(168, 85, 247, 0.1)' },
    { id: 'in-review', name: 'In Review', labelBg: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400', glow: 'rgba(34, 211, 238, 0.1)' },
    { id: 'completed', name: 'Completed', labelBg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400', glow: 'rgba(16, 185, 129, 0.1)' }
  ];

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    toast.success('Task status updated! 🚀');
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(t => t.id !== taskId));
    toast.success('Task removed from roadmap.');
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTrack.title) return;
    const task = {
      id: Date.now().toString(),
      ...newTrack
    };
    setTasks([...tasks, task]);
    setNewTrack({ title: '', desc: '', category: 'General', duration: '1 wk', status: 'backlog' });
    setShowAddForm(false);
    toast.success('New task added!');
  };

  const handleAIGenerateRoadmap = async (e) => {
    e.preventDefault();
    if (!aiForm.productIdea) return;
    setAiLoading(true);
    try {
      const response = await aiAPI.generateRoadmap(aiForm);
      const data = response.data;
      
      // Parse the milestones returned by the backend and generate tasks
      const newAiTasks = [];
      data.milestones.forEach((milestone, idx) => {
        let status = 'backlog';
        if (idx === 0) status = 'in-progress';
        
        // Create a summary card for the phase
        newAiTasks.push({
          id: `ai-phase-${idx}-${Date.now()}`,
          title: milestone.phase,
          desc: `Objectives: ${milestone.objectives.slice(0, 2).join(', ')}. Deliverables: ${milestone.deliverables.slice(0, 2).join(', ')}.`,
          category: `Phase ${idx + 1}`,
          duration: milestone.duration,
          status: status
        });

        // Create cards for objective bullet points
        milestone.objectives.forEach((obj, oIdx) => {
          newAiTasks.push({
            id: `ai-obj-${idx}-${oIdx}-${Date.now()}`,
            title: obj,
            desc: `Part of ${milestone.phase} milestone deliverables.`,
            category: 'Objective',
            duration: milestone.duration,
            status: status
          });
        });
      });

      setTasks(newAiTasks);
      setShowGenerator(false);
      toast.success('Interactive board populated with AI Roadmap milestones! 🗺️');
    } catch (error) {
      console.error('Error generating AI roadmap:', error);
      toast.error('Failed to generate roadmap from AI');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="space-y-10 relative">
      {/* Glow mesh */}
      <div className="absolute top-[-80px] left-[15%] w-[450px] h-[450px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-purple-500/5 blur-[100px] pointer-events-none" />

      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight text-white mb-3 flex items-center gap-3">
            Roadmap Board <Layers className="h-8 w-8 text-cyan-400" />
          </h2>
          <p className="text-slate-400 text-base leading-relaxed max-w-2xl">
            Drag, prioritize, and structure launch milestones. Populate manually or run the AI generator.
          </p>
        </div>
        <div className="flex space-x-4 flex-shrink-0">
          <button
            onClick={() => setShowGenerator(!showGenerator)}
            className="flex items-center space-x-2 px-5 py-3 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-cyan-500/20 transition-all hover:scale-105"
          >
            <Sparkles className="h-5 w-5" />
            <span>Generate AI Roadmap</span>
          </button>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center space-x-1.5 px-5 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl text-sm font-bold transition-all hover:scale-105"
          >
            <Plus className="h-5 w-5" />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* Interactive AI Roadmap Generator Overlay Panel */}
      <AnimatePresence>
        {showGenerator && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glassmorphism-glow rounded-2xl p-8 border border-cyan-500/30 overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl" />
            <form onSubmit={handleAIGenerateRoadmap} className="space-y-5">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider flex items-center">
                <Sparkles className="h-5.5 w-5.5 text-cyan-400 mr-2" />
                AI Roadmap Wizard
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Input your startup idea. FounderLink AI will rewrite your roadmap milestones and load them directly onto the board below. Note: This will replace current tasks on the board.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-8">
                  <input
                    type="text"
                    required
                    value={aiForm.productIdea}
                    onChange={(e) => setAiForm({ ...aiForm, productIdea: e.target.value })}
                    className="w-full px-5 py-3 bg-white/[0.03] border border-white/[0.08] focus:border-cyan-500 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                    placeholder="e.g. A marketplace matching freelance developers with climate tech startups."
                  />
                </div>
                <div className="md:col-span-3">
                  <select
                    value={aiForm.timeline}
                    onChange={(e) => setAiForm({ ...aiForm, timeline: e.target.value })}
                    className="w-full px-5 py-3 bg-white/[0.03] border border-white/[0.08] focus:border-cyan-500 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
                  >
                    <option value="3" className="bg-[#121214]">3 Months</option>
                    <option value="6" className="bg-[#121214]">6 Months</option>
                    <option value="12" className="bg-[#121214]">12 Months</option>
                  </select>
                </div>
                <div className="md:col-span-1 flex items-stretch">
                  <button
                    type="submit"
                    disabled={aiLoading}
                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm rounded-xl flex items-center justify-center disabled:opacity-50 transition-colors"
                  >
                    {aiLoading ? '...' : <ArrowRight className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Manual Task Add Dialog */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glassmorphism-premium rounded-2xl p-8 border border-white/[0.08]"
          >
            <form onSubmit={handleAddTask} className="grid grid-cols-1 md:grid-cols-4 gap-5 items-end">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Task Title</label>
                <input
                  type="text"
                  required
                  value={newTrack.title}
                  onChange={(e) => setNewTrack({ ...newTrack, title: e.target.value })}
                  className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.08] focus:border-purple-500 rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none"
                  placeholder="e.g. Integration of Resend email APIs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Description</label>
                <input
                  type="text"
                  value={newTrack.desc}
                  onChange={(e) => setNewTrack({ ...newTrack, desc: e.target.value })}
                  className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.08] focus:border-purple-500 rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none"
                  placeholder="e.g. Set up welcome triggers and analytics track."
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Category</label>
                  <input
                    type="text"
                    value={newTrack.category}
                    onChange={(e) => setNewTrack({ ...newTrack, category: e.target.value })}
                    className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.08] focus:border-purple-500 rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none"
                    placeholder="e.g. Coding"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Est. Duration</label>
                  <input
                    type="text"
                    value={newTrack.duration}
                    onChange={(e) => setNewTrack({ ...newTrack, duration: e.target.value })}
                    className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.08] focus:border-purple-500 rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none"
                    placeholder="e.g. 3 days"
                  />
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-sm font-bold transition-all"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 rounded-xl text-sm font-bold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Visual Roadmap Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map((col) => {
          const colTasks = tasks.filter(t => t.status === col.id);
          return (
            <div 
              key={col.id}
              className="flex flex-col h-[720px] rounded-2xl glassmorphism-premium p-5 relative overflow-hidden"
            >
              {/* Top status indicator header */}
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 mb-5 flex-shrink-0">
                <span className={`px-3 py-1.5 rounded-lg border text-xs font-bold uppercase tracking-wider ${col.labelBg}`}>
                  {col.name}
                </span>
                <span className="text-xs font-bold text-slate-400 bg-white/10 px-2.5 py-1 rounded-full">
                  {colTasks.length}
                </span>
              </div>

              {/* Task Items List */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-1.5 no-scrollbar">
                <AnimatePresence>
                  {colTasks.map((task) => (
                    <motion.div
                      key={task.id}
                      layoutId={`card-${task.id}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      whileHover={{ y: -3, borderColor: 'rgba(255, 255, 255, 0.15)' }}
                      className="group p-5 bg-white/[0.02] border border-white/[0.06] rounded-xl hover:bg-white/[0.04] hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.5)] transition-all duration-300 cursor-pointer relative"
                    >
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <span className="px-2.5 py-0.5 bg-white/5 border border-white/10 text-slate-300 text-[10px] font-bold tracking-wider uppercase rounded">
                          {task.category}
                        </span>
                        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="p-1 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                            title="Delete Task"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      <h4 className="text-sm font-bold text-white tracking-wide leading-snug mb-1.5 group-hover:text-purple-400 transition-colors">
                        {task.title}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed mb-4">
                        {task.desc}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/[0.04]">
                        <span className="text-[10px] font-medium text-slate-400 flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-1 text-slate-500" />
                          {task.duration}
                        </span>
                        
                        {/* Shifter selectors */}
                        <div className="flex items-center space-x-1.5">
                          {columns.filter(c => c.id !== col.id).map(c => (
                            <button
                              key={c.id}
                              onClick={() => handleStatusChange(task.id, c.id)}
                              className="w-3.5 h-3.5 rounded-full bg-white/10 border border-white/20 hover:scale-125 transition-transform"
                              title={`Move to ${c.name}`}
                              style={{
                                backgroundColor: 
                                  c.id === 'backlog' ? '#94a3b8' :
                                  c.id === 'in-progress' ? '#a855f7' :
                                  c.id === 'in-review' ? '#22d3ee' : '#10b981'
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {colTasks.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8 border border-dashed border-white/[0.04] rounded-xl text-slate-600">
                    <HelpCircle className="h-8 w-8 text-slate-700 mb-2" />
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Empty stage</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Roadmap;
