import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Privacy = () => {
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
            <Shield className="h-4 w-4 text-purple-400" />
            <span className="tracking-wide">Security & Trust</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-5xl font-black text-white tracking-tight mb-3"
          >
            Privacy Policy
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
              1. Introduction
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              FounderLink AI respects your privacy. This Privacy Policy explains how we collect, use, and protect your information when you use our service. By accessing or using the platform, you consent to our data collection and handling policies detailed herein.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              2. Information We Collect
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              We collect information you provide directly to us, such as your name, email address, password hash indices, custom API keys, and details about your startup ideas or business inputs. We do not store plain text passwords.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              3. How We Use Your Information
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              We use the collected parameters to maintain, protect, and optimize our AI-powered analysis engines, verify user credentials, prevent abuse of our API systems, and securely authenticate access to your custom product roadmap.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              4. Information Sharing
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              We do not distribute or share your personal profile data, email records, or custom startup inputs with third parties, except where necessary to perform critical computations via LLM providers (e.g. secure, non-training API wrappers) or to satisfy legal requirements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              5. Data Security
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              We implement industry-standard encryption protocols (SSL/TLS parameters, modern password hashing keys) to protect your workspace parameters from unauthorized access, disruption, exposure, or modification.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              6. Cookies
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              We use functional and analytical session cookies to keep you signed in to your workspace securely and compile anonymous layout metrics. You can choose to block cookies via browser overrides, though some dashboard sections may degrade in utility.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              7. Your Rights
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              You retain the right to query, alter, or terminate your dashboard records. If you wish to delete your FounderLink AI account and purge all associated workspace history from our records, you can execute this via the Settings console or by contacting support.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              8. Changes to This Policy
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              We reserves the right to alter this Privacy Policy parameters at any time. Any changes will be indicated on this page with an updated timestamp indicator. Continued utilization of the workspace indicates agreement with the revision details.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              9. Contact Us
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              If you have any questions, feedback, or complaints regarding this policy or our data practices, please reach out to us directly at <span className="text-purple-400 font-bold">support@founderlink.ai</span>.
            </p>
          </section>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Privacy;
