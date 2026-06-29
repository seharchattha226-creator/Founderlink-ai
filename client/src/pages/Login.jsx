import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Mail,
  Lock,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import Logo from '../components/Logo';

// Custom validation hook
const validateLogin = (formData) => {
  const errors = {};

  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
    errors.email = 'Please enter a valid email';
  }

  if (!formData.password) {
    errors.password = 'Password is required';
  } else if (formData.password.length < 8) {
    errors.password = 'Password must contain at least 8 characters';
  }

  return errors;
};

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, loginWithGoogle, loginWithGithub } = useAuth();
  const navigate = useNavigate();

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Handle field blur
  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateLogin(formData);
    setErrors(validationErrors);
    setTouched({ email: true, password: true });

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        await login(formData.email, formData.password);
        navigate('/dashboard');
      } catch (err) {
        // Errors are handled in auth context with toasts
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex text-[#F3F4F6] relative overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[450px] h-[450px] bg-violet-500/10 rounded-full blur-[120px] animate-[aurora-dance1_24s_ease-in-out_infinite] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[120px] animate-[aurora-dance2_28s_ease-in-out_infinite] pointer-events-none" />

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 min-h-screen relative z-10">
        
        {/* Left column (hidden on mobile */}
        <div className="hidden lg:flex lg:col-span-6 flex-col justify-between p-10 xl:p-16 relative overflow-hidden">
          <div className="relative z-20">
            <Link to="/" className="flex items-center space-x-3 group">
              <Logo size="normal" />
              <span className="text-2xl font-bold tracking-tight">
                <span className="text-white">FounderLink</span>
                <span className="gradient-text-primary">.ai</span>
              </span>
            </Link>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-6 my-auto max-w-lg"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/5 border border-violet-500/20 rounded-full text-sm font-semibold text-violet-200">
              <CheckCircle2 className="w-4 h-4" />
              <span>Trusted by 15,000+ founders</span>
            </div>

            <h1 className="text-5xl xl:text-6xl font-black tracking-tight leading-tight">
              Build the future,
              <span className="gradient-text-hero"> faster.</span>
            </h1>

            <p className="text-lg text-slate-400 leading-relaxed">
              Validate ideas, find co-founders, and build investor-ready startups with AI.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative z-20 border-t border-white/5 pt-8 flex items-start space-x-5"
          >
            <div className="flex space-x-1 text-violet-400 flex-shrink-0 mt-1">
              {[...Array(5)].map((_, i) => (
              <CheckCircle2 key={i} className="w-4 h-4 fill-current" />
            ))}
            </div>
            <div className="space-y-2">
              <p className="text-sm text-slate-300 leading-relaxed font-medium">
                "We went from idea to MVP in 2 weeks. The AI co-founder is incredible."
              </p>
              <div className="text-xs font-bold text-white">Alex Chen, CEO at TechFlow</div>
            </div>
          </motion.div>
        </div>

        {/* Right column (auth card) */}
        <div className="lg:col-span-6 flex flex-col justify-center items-center px-6 sm:px-10 lg:px-16 xl:px-20 py-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.2 }}
            className="w-full max-w-md glass-ultra rounded-3xl p-8 sm:p-10 xl:p-12 border border-white/10 relative z-20"
          >
            <div className="relative z-10">
              {/* Logo for mobile only */}
              <div className="flex items-center justify-center mb-8 lg:hidden">
                <Link to="/" className="flex items-center space-x-3 group">
                  <Logo size="normal" />
                  <span className="text-xl font-bold tracking-tight">
                    <span className="text-white">FounderLink</span>
                    <span className="gradient-text-primary">.ai</span>
                  </span>
                </Link>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white tracking-tight mb-2">
                  Welcome back
                </h2>
                <p className="text-slate-400 text-sm font-medium">
                  Continue your startup journey
                </p>
              </div>

              {/* Social buttons */}
              <div className="space-y-3 mb-8">
                <button
                  type="button"
                  onClick={loginWithGoogle}
                  disabled={isSubmitting}
                  className="w-full py-4 bg-white/5 border border-white/10 hover:bg-white/8 hover:border-white/15 rounded-2xl text-white text-sm font-semibold transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center space-x-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Continue with Google</span>
                </button>

                <button
                  type="button"
                  onClick={loginWithGithub}
                  disabled={isSubmitting}
                  className="w-full py-4 bg-white/5 border border-white/10 hover:bg-white/8 hover:border-white/15 rounded-2xl text-white text-sm font-semibold transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center space-x-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>Continue with GitHub</span>
                </button>
              </div>

              <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-[#020617] text-slate-500 font-medium">or continue with email</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5 no-native-validation" noValidate>
                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-xs font-bold text-slate-300 uppercase tracking-widest ml-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="you@startup.com"
                      className={`w-full pl-12 pr-4 py-4 bg-white/5 border rounded-2xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-violet-500/30 focus:border-violet-500/50 transition-all duration-200 font-medium ${
                        errors.email && touched.email ? 'border-red-500/40 focus:border-red-500/60 focus:ring-red-500/20' : 'border-white/10'
                      }`}
                    />
                  </div>
                  {errors.email && touched.email && (
                    <div className="flex items-center space-x-2 text-xs text-red-400 mt-2 ml-1">
                      <AlertCircle className="h-3.5 w-3.5" />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-xs font-bold text-slate-300 uppercase tracking-widest ml-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="••••••••"
                      className={`w-full pl-12 pr-12 py-4 bg-white/5 border rounded-2xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-violet-500/30 focus:border-violet-500/50 transition-all duration-200 font-medium ${
                        errors.password && touched.password ? 'border-red-500/40 focus:border-red-500/60 focus:ring-red-500/20' : 'border-white/10'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500/20 rounded-lg p-1"
                      tabIndex={0}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && touched.password && (
                    <div className="flex items-center space-x-2 text-xs text-red-400 mt-2 ml-1">
                      <AlertCircle className="h-3.5 w-3.5" />
                      <span>{errors.password}</span>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-1 py-4 btn-primary-gradient rounded-2xl text-sm font-bold text-white shadow-lg hover:shadow-violet-500/25 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center space-x-2.5 disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Continue with AI</span>
                      <ArrowRight className="w-4.5 h-4.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>

              <p className="text-center mt-8 text-sm text-slate-500 font-medium">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-violet-400 hover:text-violet-300 font-semibold inline-flex items-center group"
                >
                  Create Workspace
                  <ArrowRight className="h-4 w-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
