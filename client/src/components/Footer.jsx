import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-bg-primary border-t border-border py-16 sm:py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Brand Identity Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <Logo size="normal" />
              <span className="text-xl font-semibold tracking-tight">
                <span className="text-text-primary">FounderLink</span>
                <span className="text-primary">.ai</span>
              </span>
            </div>
            
            <p className="text-sm text-text-secondary leading-relaxed max-w-sm">
              Empowering founders with AI-powered tools to validate ideas, build roadmaps, and prepare for funding — all in one place.
            </p>
          </div>
          
          {/* Footer Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:col-span-8">
            {/* Product */}
            <div className="space-y-4">
              <h5 className="text-xs font-semibold text-text-primary uppercase tracking-wider">Product</h5>
              <ul className="space-y-3">
                <li><Link to="/#features" className="text-sm text-text-tertiary hover:text-text-primary transition-colors">Features</Link></li>
                <li><Link to="/about" className="text-sm text-text-tertiary hover:text-text-primary transition-colors">How it works</Link></li>
                <li><Link to="/register" className="text-sm text-text-tertiary hover:text-text-primary transition-colors">Sign up</Link></li>
              </ul>
            </div>
            
            {/* Resources */}
            <div className="space-y-4">
              <h5 className="text-xs font-semibold text-text-primary uppercase tracking-wider">Resources</h5>
              <ul className="space-y-3">
                <li><Link to="/blog" className="text-sm text-text-tertiary hover:text-text-primary transition-colors">Blog</Link></li>
                <li><Link to="/help" className="text-sm text-text-tertiary hover:text-text-primary transition-colors">Help Center</Link></li>
                <li><Link to="/roadmap" className="text-sm text-text-tertiary hover:text-text-primary transition-colors">Product Roadmap</Link></li>
              </ul>
            </div>
            
            {/* Company */}
            <div className="space-y-4">
              <h5 className="text-xs font-semibold text-text-primary uppercase tracking-wider">Company</h5>
              <ul className="space-y-3">
                <li><Link to="/about" className="text-sm text-text-tertiary hover:text-text-primary transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="text-sm text-text-tertiary hover:text-text-primary transition-colors">Contact</Link></li>
                <li><Link to="/careers" className="text-sm text-text-tertiary hover:text-text-primary transition-colors">Careers</Link></li>
              </ul>
            </div>
            
            {/* Legal */}
            <div className="space-y-4">
              <h5 className="text-xs font-semibold text-text-primary uppercase tracking-wider">Legal</h5>
              <ul className="space-y-3">
                <li><Link to="/privacy" className="text-sm text-text-tertiary hover:text-text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-sm text-text-tertiary hover:text-text-primary transition-colors">Terms of Service</Link></li>
                <li><Link to="/security" className="text-sm text-text-tertiary hover:text-text-primary transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Thin Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-text-tertiary">
              © {new Date().getFullYear()} FounderLink AI. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6 text-sm text-text-tertiary">
              <span>Designed for founders, everywhere</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
