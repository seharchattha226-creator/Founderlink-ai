import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-[#070709] border-t border-white/[0.06] py-16 relative z-10 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12 text-left">
          
          {/* Branding Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <Logo size="normal" />
              <span className="text-xl font-black tracking-tight">
                <span className="text-white">FounderLink</span>
                <span className="gradient-text-primary">.ai</span>
              </span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed max-w-sm">
              Advanced AI-assisted company formulations, competitive mapping, and interactive roadmap pipelines. Built for the modern ecosystem.
            </p>
            <div className="pt-2 text-[10px] text-slate-600">
              &copy; {new Date().getFullYear()} FounderLink AI. All rights reserved.
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-3 gap-6 md:col-span-7">
            <div>
              <h4 className="text-xs font-bold text-white tracking-wider uppercase mb-4">Product</h4>
              <ul className="space-y-2.5 text-xs text-slate-500">
                <li><Link to="/register" className="hover:text-white transition-colors">Register</Link></li>
                <li><a href="/#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="/#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-white tracking-wider uppercase mb-4">Company</h4>
              <ul className="space-y-2.5 text-xs text-slate-500">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-white tracking-wider uppercase mb-4">Legal</h4>
              <ul className="space-y-2.5 text-xs text-slate-500">
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Micro Bottom bar */}
        <div className="border-t border-white/[0.04] pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-600 gap-4">
          <div className="flex space-x-4">
            <span>Security audited: SOC2 compliant</span>
            <span>•</span>
            <span>Encrypted SSL parameters</span>
          </div>
          <div>
            <span>Designed in San Francisco, CA</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
