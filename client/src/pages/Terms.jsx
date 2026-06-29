import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Terms = () => {
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

        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center space-x-2.5 px-4.5 py-2.5 bg-purple-500/10 border border-purple-500/25 text-purple-300 rounded-full text-sm font-bold shadow-[0_0_15px_rgba(168,85,247,0.15)] mb-6"
          >
            <FileText className="h-4 w-4 text-purple-400" />
            <span className="tracking-wide">Legal parameters</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-5xl font-black text-white tracking-tight mb-3"
          >
            Terms and Conditions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-sm sm:text-base text-slate-400 font-medium"
          >
            Last Updated: June 22, 2026
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="glassmorphism-premium rounded-3xl border border-white/[0.08] p-10 sm:p-16 shadow-2xl space-y-10 text-left"
        >
          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              1. Acceptance of Terms
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              By accessing and using FounderLink AI, you agree to be bound by these Terms and Conditions, all applicable laws and regulations, and agree that you are responsible for compliance with any local laws. If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              2. Description of Service
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              FounderLink AI provides advanced AI-powered tools for startup founders, including company idea generation, competitor SWOT matrix calculations, product roadmap generation, and investor-readiness analytics score metrics.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              3. User Accounts
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              You are responsible for maintaining the confidentiality of your credentials and credentials indices. You agree to accept responsibility for all activities that occur under your registered account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              4. User Conduct
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              You agree not to use the service for any illegal, malicious, or unauthorized purpose. You must not, in the utilization of the platform, violate any applicable laws in your jurisdiction (including but not limited to copyright or security laws).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              5. Intellectual Property
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              The service, its code structure, custom style variables, database logs, and all original content (excluding user-provided inputs) are and will remain the exclusive property of FounderLink AI and its licensors.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              6. Limitation of Liability
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              In no event shall FounderLink AI or its suppliers be liable for any indirect, incidental, special, consequential, or punitive damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of or related to your use of the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              7. Changes to Terms
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              We reserve the right to modify or replace these Terms at any time without prior notice. Your continued utilization of FounderLink AI constitutes acceptance of the altered Terms and Conditions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              8. Contact Us
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              If you have any questions or feedback regarding these Terms, please reach out to us at <span className="text-purple-400 font-bold">support@founderlink.ai</span>.
            </p>
          </section>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Terms;
