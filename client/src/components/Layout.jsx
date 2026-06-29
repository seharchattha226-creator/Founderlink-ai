import { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu, Search, Bell, Sparkles, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Layout = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Derive route title for dashboard topbar
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'Overview';
      case '/ai-tools':
        return 'AI Toolkit';
      case '/roadmap':
        return 'Product Roadmap';
      case '/settings':
        return 'Settings';
      default:
        return 'Console';
    }
  };

  return (
    <div className="min-h-screen cosmic-bg text-[#F3F4F6] flex">
      {/* Premium Aurora Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="aurora-blob aurora-1" />
        <div className="aurora-blob aurora-2" />
        <div className="aurora-blob aurora-3" />
      </div>

      {/* Vertical Navigation Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        isCollapsed={isCollapsed}
        toggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 z-10 ${
        isCollapsed ? 'md:pl-20' : 'md:pl-64'
      }`}>
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-20 px-6 sm:px-8 glass-premium border-b-0">
          {/* Left Side: Mobile Menu Button & Title */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center">
                {getPageTitle()}
                <span className="hidden sm:inline-flex ml-2.5 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-purple-400 uppercase bg-purple-500/10 border border-purple-500/20 rounded-md">
                  PRO
                </span>
              </h1>
            </div>
          </div>

          {/* Center Side: Premium Search */}
          <div className="hidden md:flex items-center max-w-md w-full mx-8 relative">
            <Search className="absolute left-3.5 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search features, tools or docs... (Press ⌘K)"
              className="w-full pl-10 pr-4 py-2 text-sm bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.15] focus:border-purple-500/50 rounded-xl text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-all"
            />
          </div>

          {/* Right Side: Action Triggers */}
          <div className="flex items-center space-x-4">
            {/* Quick AI Trigger */}
            <Link
              to="/ai-tools"
              className="hidden lg:flex items-center space-x-2 px-3.5 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg text-xs font-semibold shadow-lg shadow-purple-500/20 hover:scale-105 active:scale-95 transition-all"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Ask AI Co-Founder</span>
            </Link>

            {/* Notification Center Trigger */}
            <button className="relative p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
            </button>

            {/* Micro Divider */}
            <span className="h-6 w-px bg-white/[0.08]" />

            {/* Mini User Dropdown Bubble */}
            <div className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors cursor-pointer group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'F'}
              </div>
              <span className="hidden sm:inline text-xs font-medium max-w-[80px] truncate">
                {user?.name || 'Founder'}
              </span>
              <ChevronDown className="h-3 w-3 text-slate-500 group-hover:text-white transition-transform" />
            </div>
          </div>
        </header>

        {/* Content View Outlet */}
        <main className="flex-1 overflow-y-auto px-6 sm:px-8 py-8 relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
