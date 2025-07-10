import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, User, LogOut, ChevronDown, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation on mount
    setIsVisible(true);
  }, []);

  return (
    <nav className={`bg-slate-800 shadow-lg border-b border-purple-500/30 transition-all duration-500 relative z-50 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/tasks" className="flex items-center space-x-2 z-50">
            <CheckCircle className="h-7 w-7 sm:h-8 sm:w-8 text-purple-400" />
            <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white">TaskFlow</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 text-purple-200 hover:text-white focus:outline-none transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 bg-purple-600/20 border border-purple-500/30 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-purple-400" />
                </div>
                <span className="font-medium">{user?.username}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-purple-500/30 rounded-lg shadow-xl py-2 z-[100] animate-fade-in">
                  <div className="px-4 py-2 border-b border-purple-500/30">
                    <p className="text-sm font-medium text-white">{user?.username}</p>
                    <p className="text-sm text-purple-300">{user?.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-purple-200 hover:bg-purple-600/20 flex items-center transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden z-50">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="text-purple-200 hover:text-white focus:outline-none transition-colors p-2"
            >
              {showMobileMenu ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop for mobile menu */}
      {showMobileMenu && (
        <div 
          className="fixed inset-0 bg-black/20 z-[60] md:hidden"
          onClick={() => setShowMobileMenu(false)}
        />
      )}

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 right-0 z-[70] transition-all duration-300 ease-in-out ${
        showMobileMenu 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}>
        <div className="mx-4 mb-4">
          <div className="bg-slate-800 border border-purple-500/30 rounded-lg shadow-xl p-4 space-y-3">
            {/* User Info */}
            <div className="flex items-center space-x-3 pb-3 border-b border-purple-500/30">
              <div className="w-10 h-10 bg-purple-600/20 border border-purple-500/30 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{user?.username}</p>
                <p className="text-xs text-purple-300">{user?.email}</p>
              </div>
            </div>
            
            {/* Sign Out Button */}
            <button
              onClick={() => {
                setShowMobileMenu(false);
                logout();
              }}
              className="w-full text-left px-3 py-3 text-sm text-purple-200 hover:bg-purple-600/20 rounded-lg flex items-center transition-colors touch-manipulation"
            >
              <LogOut className="h-4 w-4 mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
