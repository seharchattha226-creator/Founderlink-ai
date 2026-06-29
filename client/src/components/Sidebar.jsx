import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  LayoutDashboard,
  Sparkles,
  TrendingUp,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Award
} from 'lucide-react';
import Logo from './Logo';

const Sidebar = ({
  isOpen,
  toggleSidebar,
  isCollapsed,
  toggleCollapse
}) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'AI Tools', path: '/ai-tools', icon: Sparkles },
    { name: 'Roadmap', path: '/roadmap', icon: TrendingUp },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col h-full bg-slate-900/80 border-r border-white/[0.06] backdrop-blur-2xl transition-all duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } ${isCollapsed ? 'w-20' : 'w-64'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-20 px-5 border-b border-white/[0.06]">
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <div className="relative">
              <Logo size="normal" animated />
            </div>
            {!isCollapsed && (
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-violet-400 bg-clip-text text-transparent">
                FounderLink
              </span>
            )}
          </Link>

          {!isCollapsed && (
            <button
              onClick={toggleCollapse}
              className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-colors"
            >
              <ChevronLeft className="h-4.5 w-4.5" />
            </button>
          )}
          {isCollapsed && (
            <button
              onClick={toggleCollapse}
              className="mx-auto p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 transition-colors"
            >
              <ChevronRight className="h-4.5 w-4.5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex items-center px-3.5 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-violet-500/15 text-white font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {isActive && (
                  <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-gradient-to-b from-violet-500 to-indigo-500 rounded-full" />
                )}

                <Icon className={`h-5.5 w-5.5 ${isCollapsed ? 'mx-auto' : 'mr-3.5'} ${
                  isActive ? 'text-violet-400' : 'text-slate-400 group-hover:text-white'
                } transition-colors`} />

                {!isCollapsed && (
                  <span className="text-sm font-medium tracking-wide">{item.name}</span>
                )}

                {isCollapsed && (
                  <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-800 text-white text-xs font-semibold rounded-lg border border-white/10 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-xl whitespace-nowrap z-50">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-white/[0.06] bg-slate-900/60">
          {!isCollapsed ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white font-black text-base shadow-md">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'F'}
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate leading-snug">
                    {user?.name || 'Founder'}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Award className="h-3.5 w-3.5 text-violet-400" />
                    <span className="capitalize font-medium truncate">{user?.role || 'Founder'}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
                title="Logout"
              >
                <LogOut className="h-4.5 w-4.5" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white font-black text-base shadow-md">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'F'}
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900" />
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
                title="Logout"
              >
                <LogOut className="h-4.5 w-4.5" />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;