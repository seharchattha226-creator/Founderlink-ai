import { Link } from 'react-router-dom';
import { Zap, Target, Users, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F3F4F6] relative overflow-hidden font-sans pt-32 flex flex-col justify-between">
      {/* 10/10 Premium Noise Overlay */}
      <div className="noise-overlay" />

      {/* Floating Blurred Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-15%] w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[140px] animate-drift-one" />
        <div className="absolute bottom-[20%] right-[-15%] w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[140px] animate-drift-two" />
      </div>

      <Navbar />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10 py-16 flex-grow w-full">
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
        
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center space-x-2.5 px-4.5 py-2.5 bg-purple-500/10 border border-purple-500/25 text-purple-300 rounded-full text-sm font-bold shadow-[0_0_15px_rgba(168,85,247,0.15)] mb-6"
          >
            <Zap className="h-4 w-4 text-purple-400 animate-pulse" />
            <span className="tracking-wide">Our Story</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-5xl sm:text-6xl font-black text-white tracking-tight mb-6"
          >
            About <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent glow-text-purple">FounderLink AI</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
          >
            Empowering early-stage founders to build, validate, and scale their ideas with world-class AI co-founder analytics.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="glassmorphism-premium glow-card-violet rounded-2xl p-10 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20">
              <Zap className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-slate-400 text-base leading-relaxed">
              We believe that great ideas can come from anyone, anywhere. FounderLink AI is designed to democratize startup success by placing AI-powered co-founder insights directly in the hands of every builder. We aim to break down barriers to validation, funding, and growth.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="glassmorphism-premium glow-card-violet rounded-2xl p-10 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/20">
              <Target className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">What We Do</h2>
            <p className="text-slate-400 text-base leading-relaxed">
              We construct tools that enable founders to validate value propositions, simulate market scenarios, and construct dynamic milestones using advanced LLMs. Our system optimizes your initial research phase so you can focus entirely on shipping your core product.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="glassmorphism-premium rounded-2xl p-10 sm:p-14 mb-20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl" />
          <h2 className="text-3xl font-black text-white mb-10 text-center">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-colors">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-5 shadow-md shadow-blue-500/10">
                <Users className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Founder First</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Everything we design, optimize, or build has one goal: helping founders succeed.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-colors">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-5 shadow-md shadow-orange-500/10">
                <Heart className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Accessibility</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Premium startup validation tools shouldn't be gated behind expensive pricing tiers. We keep it affordable.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-colors">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-5 shadow-md shadow-purple-500/10">
                <Zap className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">High Velocity</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Time is the most valuable resource for any startup. Our engine returns actionable analytics in real-time.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-center bg-gradient-to-r from-purple-900/10 to-indigo-900/10 border border-purple-500/10 p-10 rounded-2xl max-w-2xl mx-auto"
        >
          <h3 className="text-xl font-bold text-white mb-4">Want to collaborate?</h3>
          <p className="text-slate-400 text-base mb-8 leading-relaxed">
            We are always looking for investors, partners, and builders who share our mission of democratizing startup tools.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-7 py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-purple-500/25 transition-all hover:scale-105 active:scale-95"
          >
            Create Your Account
          </Link>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
