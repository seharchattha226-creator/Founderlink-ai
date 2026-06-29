import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Zap, ArrowRight, RotateCcw, AlertCircle, Sparkles, ShieldCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const OTPVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const { pendingUserEmail, verifyOTP, resendOTP } = useAuth();
  const navigate = useNavigate();

  // Redirect if no pending email
  useEffect(() => {
    if (!pendingUserEmail) {
      navigate('/register');
    }
  }, [pendingUserEmail, navigate]);

  // Countdown timer for resend button
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take last character
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      setError('Please enter 6-digit OTP');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await verifyOTP(otpString);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    try {
      await resendOTP();
      setCountdown(60);
    } catch (err) {
      setError(err.message || 'Failed to resend OTP');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex text-[#F3F4F6] relative overflow-hidden font-sans">
      
      {/* Grid Container */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 min-h-screen relative z-10">
        
        {/* Left Column: Premium Animated Artwork (lg only) */}
        <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-12 bg-white/[0.01] border-r border-white/[0.06] relative overflow-hidden">
          {/* Neon mesh background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-[20%] left-[-20%] w-[350px] h-[350px] rounded-full bg-purple-600/10 blur-[90px]" />
            <div className="absolute bottom-[20%] right-[-20%] w-[350px] h-[350px] rounded-full bg-indigo-600/10 blur-[90px]" />
          </div>

          <div className="relative z-10">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center space-x-2.5 group">
              <div className="p-2 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl shadow-lg shadow-purple-500/20 group-hover:rotate-12 transition-transform duration-300">
                <Zap className="h-5.5 w-5.5 text-white fill-current" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                FounderLink<span className="text-purple-400">.ai</span>
              </span>
            </Link>
          </div>

          {/* Core graphic explanation */}
          <div className="relative z-10 space-y-6 my-auto max-w-sm">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-full text-[10px] font-semibold tracking-wide uppercase">
              <Sparkles className="h-3 w-3" />
              <span>Workspace Security</span>
            </div>
            
            <h2 className="text-3xl font-extrabold text-white leading-tight">
              Secure email <br />
              verification.
            </h2>
            
            <p className="text-slate-400 text-xs leading-relaxed">
              We protect your startup data. Access to dashboard configurations requires secure One-Time-Password credentials.
            </p>

            <div className="bg-[#0D0D10]/80 p-4 border border-white/[0.05] rounded-xl flex items-center space-x-3.5">
              <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">Encrypted parameters</span>
                <span className="text-xs text-white font-bold">256-bit SSL transaction</span>
              </div>
            </div>
          </div>

          {/* Bottom security assurance */}
          <div className="relative z-10 border-t border-white/[0.06] pt-6 flex items-center space-x-2.5 text-[10px] text-slate-500 uppercase font-semibold">
            <span>SOC2 compliant workspace</span>
          </div>
        </div>

        {/* Right Column: Glassmorphic Forms OTP Verification */}
        <div className="lg:col-span-7 flex flex-col justify-center items-center px-6 sm:px-12 lg:px-20 py-12 relative">
          {/* Radial Light */}
          <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-purple-500/5 blur-[100px] pointer-events-none" />

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="max-w-md w-full glassmorphism rounded-3xl p-8 sm:p-10 border border-white/[0.08] relative z-10 shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/5 rounded-full blur-xl pointer-events-none" />

            <div className="text-center mb-8">
              {/* Show logo on mobile only */}
              <div className="flex items-center justify-center mb-4 lg:hidden">
                <Link to="/" className="flex items-center space-x-2 group">
                  <div className="p-2 bg-purple-600 rounded-xl">
                    <Zap className="h-5 w-5 text-white fill-current" />
                  </div>
                  <span className="text-base font-bold text-white">FounderLink.ai</span>
                </Link>
              </div>

              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                Verify Email
              </h2>
              <p className="text-slate-400 text-xs mt-1.5 font-medium tracking-wide">
                Enter the 6-digit OTP sent to <span className="text-purple-300 font-bold">{pendingUserEmail}</span>
              </p>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs flex items-center space-x-2"
              >
                <AlertCircle className="h-4.5 w-4.5 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleVerify} className="space-y-6">
              <div className="flex justify-center gap-2.5">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-14 text-center text-xl font-bold bg-[#0c0c0e]/30 border border-white/[0.08] focus:border-purple-500 rounded-xl text-white outline-none focus:ring-2 focus:ring-purple-500/20 transition-all font-mono"
                    autoFocus={index === 0}
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white py-3.5 rounded-xl text-xs font-bold shadow-lg shadow-purple-500/20 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <span>Verify & Continue</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={handleResend}
                disabled={countdown > 0 || resendLoading}
                className="text-purple-400 font-bold hover:text-purple-300 disabled:text-slate-600 text-xs flex items-center justify-center gap-2 mx-auto transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                {countdown > 0 ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
              </button>
            </div>

            <div className="mt-8 text-center text-xs">
              <Link
                to="/register"
                className="text-slate-500 hover:text-white font-medium transition-colors"
              >
                Go back to registration
              </Link>
            </div>
          </motion.div>
        </div>

      </div>

    </div>
  );
};

export default OTPVerification;
