import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MessageSquare, Send, Zap } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { contactAPI } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await contactAPI.sendMessage(formData.name, formData.email, formData.message);
      toast.success('Message sent! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send message, please try again later');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F3F4F6] relative overflow-hidden font-sans pt-32 flex flex-col justify-between">
      {/* 10/10 Premium Noise Overlay */}
      <div className="noise-overlay" />

      {/* Floating Blurred Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[140px] animate-drift-one" />
        <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[140px] animate-drift-two" />
      </div>

      <Navbar />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10 py-16 flex-grow w-full">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/"
            className="inline-flex items-center text-slate-400 hover:text-white font-bold text-sm tracking-wider uppercase mb-10 group transition-colors"
          >
            <span className="group-hover:-translate-x-1.5 mr-2 transition-transform">&larr;</span> Back to home
          </Link>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="glassmorphism-premium rounded-3xl border border-white/[0.08] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          <div className="grid md:grid-cols-12">
            
            {/* Left Column: Info Card */}
            <div className="md:col-span-5 bg-gradient-to-br from-purple-950/20 via-[#0C0C0F] to-indigo-950/20 p-10 sm:p-12 border-b md:border-b-0 md:border-r border-white/[0.06] flex flex-col justify-between">
              <div className="space-y-8">
                <div>
                  <div className="inline-flex items-center space-x-2.5 px-4 py-2 bg-purple-500/10 border border-purple-500/25 text-purple-300 rounded-full text-xs font-bold uppercase tracking-wider mb-5 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                    <Zap className="h-4 w-4 text-purple-400" />
                    <span>Inquiries</span>
                  </div>
                  <h1 className="text-4xl font-black text-white tracking-tight">
                    Get in Touch
                  </h1>
                  <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
                    Have questions about our enterprise plans, developer features, or API limits? Connect with our desk.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4 group">
                    <div className="p-3.5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-purple-400 group-hover:text-white group-hover:border-purple-500/30 group-hover:bg-purple-500/10 transition-all">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">Support Desk</h3>
                      <p className="text-slate-400 text-sm sm:text-base mt-1">support@founderlink.ai</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 group">
                    <div className="p-3.5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-purple-400 group-hover:text-white group-hover:border-purple-500/30 group-hover:bg-purple-500/10 transition-all">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">Response Index</h3>
                      <p className="text-slate-400 text-sm sm:text-base mt-1">Usually within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-5 bg-purple-500/5 border border-purple-500/10 rounded-2xl">
                <h4 className="text-sm font-bold text-white mb-1.5">Looking for API details?</h4>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Head directly to the Workspace settings or check our developer resources.
                </p>
              </div>
            </div>

            {/* Right Column: Interactive Form */}
            <div className="md:col-span-7 p-10 sm:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-5 py-4 bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/15 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none transition-all text-base"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-5 py-4 bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/15 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none transition-all text-base"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                    Message
                  </label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows="4"
                    className="w-full px-5 py-4 bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/15 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none transition-all text-base resize-none"
                    placeholder="How can our co-founder console assist you?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white py-4 rounded-xl font-bold text-sm uppercase tracking-wider shadow-lg shadow-purple-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center space-x-2.5"
                >
                  {isSubmitting ? (
                    <span>Transmitting Data...</span>
                  ) : (
                    <>
                      <span>Send Transmission</span>
                      <Send className="h-4.5 w-4.5" />
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
