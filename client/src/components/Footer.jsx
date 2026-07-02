import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-bg-primary border-t border-border/65 py-20 sm:py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-16">
          
          {/* Brand Identity Column */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-4">
              <Logo size="normal" />
              <span className="text-2xl font-semibold tracking-tight">
                <span className="text-text-primary">FounderLink</span>
                <span className="text-primary">.ai</span>
              </span>
            </div>
            
            <p className="text-base text-text-secondary leading-relaxed">
              Empowering founders with AI-powered tools to validate ideas, build roadmaps, and prepare for funding — all in one place.
            </p>
          </div>
          
          {/* Footer Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:col-span-8">
            {/* Product */}
            <div className="space-y-5">
              <h5 className="text-sm font-semibold text-text-primary uppercase tracking-widest mb-2">Product</h5>
              <ul className="space-y-3.5">
                <li><Link to="/#features" className="text-base text-text-tertiary hover:text-text-primary transition-colors duration-300">Features</Link></li>
                <li><Link to="/about" className="text-base text-text-tertiary hover:text-text-primary transition-colors duration-300">How it works</Link></li>
                <li><Link to="/register" className="text-base text-text-tertiary hover:text-text-primary transition-colors duration-300">Sign up</Link></li>
              </ul>
            </div>
            
            {/* Resources */}
            <div className="space-y-5">
              <h5 className="text-sm font-semibold text-text-primary uppercase tracking-widest mb-2">Resources</h5>
              <ul className="space-y-3.5">
                <li><Link to="/blog" className="text-base text-text-tertiary hover:text-text-primary transition-colors duration-300">Blog</Link></li>
                <li><Link to="/help" className="text-base text-text-tertiary hover:text-text-primary transition-colors duration-300">Help Center</Link></li>
                <li><Link to="/roadmap" className="text-base text-text-tertiary hover:text-text-primary transition-colors duration-300">Product Roadmap</Link></li>
              </ul>
            </div>
            
            {/* Company */}
            <div className="space-y-5">
              <h5 className="text-sm font-semibold text-text-primary uppercase tracking-widest mb-2">Company</h5>
              <ul className="space-y-3.5">
                <li><Link to="/about" className="text-base text-text-tertiary hover:text-text-primary transition-colors duration-300">About Us</Link></li>
                <li><Link to="/contact" className="text-base text-text-tertiary hover:text-text-primary transition-colors duration-300">Contact</Link></li>
                <li><Link to="/careers" className="text-base text-text-tertiary hover:text-text-primary transition-colors duration-300">Careers</Link></li>
              </ul>
            </div>
            
            {/* Legal */}
            <div className="space-y-5">
              <h5 className="text-sm font-semibold text-text-primary uppercase tracking-widest mb-2">Legal</h5>
              <ul className="space-y-3.5">
                <li><Link to="/privacy" className="text-base text-text-tertiary hover:text-text-primary transition-colors duration-300">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-base text-text-tertiary hover:text-text-primary transition-colors duration-300">Terms of Service</Link></li>
                <li><Link to="/security" className="text-base text-text-tertiary hover:text-text-primary transition-colors duration-300">Security</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Thin Divider */}
        <div className="border-t border-border/65 mt-16 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-sm text-text-tertiary">
              © {new Date().getFullYear()} FounderLink AI. All rights reserved.
            </p>
            
            <div className="flex items-center gap-8">
              <span className="text-sm text-text-tertiary">Designed for founders, everywhere</span>
            </div>
          </div>
        </div>
      </div>
      </footer>
  );
};

export default Footer;
