import { Link } from 'react-router-dom';
import { CheckCircle, Calendar, Users, ArrowRight, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden w-full">
      {/* Header */}
      <nav className={`w-full px-4 sm:px-6 lg:px-8 py-3 sm:py-4 transition-all duration-700 relative z-50 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center min-w-0">
          <div className="flex items-center space-x-2 z-50 min-w-0 flex-shrink-0">
            <CheckCircle className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-purple-400 flex-shrink-0" />
            <span className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-white truncate">TaskFlow</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4 z-50 flex-shrink-0">
            <Link
              to="/login"
              className="text-purple-200 hover:text-white font-medium transition-colors px-3 py-2 text-sm lg:text-base whitespace-nowrap"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-purple-600 text-white px-3 lg:px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm lg:text-base whitespace-nowrap"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden z-50 flex-shrink-0">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="text-purple-200 hover:text-white focus:outline-none transition-colors p-2"
            >
              {showMobileMenu ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 right-0 z-[70] transition-all duration-300 ease-in-out ${
          showMobileMenu 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}>
          <div className="mx-4 mt-4 min-w-0">
            <div className="bg-slate-800/90 backdrop-blur-sm border border-purple-500/30 rounded-lg shadow-xl p-4 space-y-3">
              <Link
                to="/login"
                onClick={() => setShowMobileMenu(false)}
                className="block w-full text-center px-4 py-3 text-purple-200 hover:bg-purple-600/20 rounded-lg transition-colors text-sm"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setShowMobileMenu(false)}
                className="block w-full text-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Backdrop for mobile menu */}
      {showMobileMenu && (
        <div 
          className="fixed inset-0 bg-black/20 z-[60] md:hidden"
          onClick={() => setShowMobileMenu(false)}
        />
      )}

      {/* Hero Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 xl:py-20 min-w-0">
        <div className="max-w-6xl mx-auto text-center min-w-0">
          <h1 className={`text-4xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 lg:mb-8 leading-tight transition-all duration-700 delay-200 break-words ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="block">Organize Your Life with</span>
            <span className="text-purple-400 block mt-1 sm:mt-2">Smart Task Management</span>
          </h1>
          <p className={`text-lg sm:text-lg lg:text-xl xl:text-2xl text-purple-100 mb-8 sm:mb-10 lg:mb-12 max-w-4xl mx-auto leading-relaxed px-2 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Stay productive and never miss a deadline. TaskFlow helps you manage your tasks,
            set priorities, and achieve your goals with ease.
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center max-w-xs sm:max-w-lg mx-auto transition-all duration-700 delay-600 min-w-0 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Link
              to="/signup"
              className="w-full sm:w-auto bg-purple-600 text-white px-8 py-4 sm:px-6 lg:px-8 sm:py-3 lg:py-4 rounded-xl sm:rounded-lg text-lg sm:text-base lg:text-lg font-bold sm:font-semibold hover:bg-purple-700 transition-all transform hover:scale-105 flex items-center justify-center whitespace-nowrap min-w-0 shadow-lg hover:shadow-xl"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5 sm:h-4 sm:w-4 lg:h-5 lg:w-5 flex-shrink-0" />
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto border-2 border-purple-500 text-purple-300 px-8 py-4 sm:px-6 lg:px-8 sm:py-3 lg:py-4 rounded-xl sm:rounded-lg text-lg sm:text-base lg:text-lg font-bold sm:font-semibold hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all whitespace-nowrap min-w-0 shadow-lg hover:shadow-xl"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 min-w-0">
        <div className="max-w-7xl mx-auto min-w-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 min-w-0">
            <div className={`bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:border-purple-500/40 duration-700 delay-700 min-w-0 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4 flex-shrink-0">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400" />
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-2 sm:mb-3">Task Management</h3>
              <p className="text-sm sm:text-base text-purple-100 leading-relaxed">
                Create, organize, and track your tasks with our intuitive interface.
                Mark as complete and stay on top of your goals.
              </p>
            </div>
            
            <div className={`bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:border-purple-500/40 duration-700 delay-800 min-w-0 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-600/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4 flex-shrink-0">
                <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" />
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-2 sm:mb-3">Smart Scheduling</h3>
              <p className="text-sm sm:text-base text-purple-100 leading-relaxed">
                Schedule your tasks and set priorities. Get reminders and never miss
                important deadlines again.
              </p>
            </div>
            
            <div className={`bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:border-purple-500/40 duration-700 delay-900 md:col-span-2 lg:col-span-1 min-w-0 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-600/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4 flex-shrink-0">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-400" />
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-2 sm:mb-3">Personal Dashboard</h3>
              <p className="text-sm sm:text-base text-purple-100 leading-relaxed">
                Your personalized dashboard shows all your tasks at a glance.
                Sort, filter, and organize however you like.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className={`bg-gradient-to-r from-purple-700 to-indigo-700 text-white py-12 sm:py-16 lg:py-20 transition-all duration-700 delay-1000 w-full ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="w-full px-4 sm:px-6 lg:px-8 min-w-0">
          <div className="max-w-4xl mx-auto text-center min-w-0">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 lg:mb-6 leading-tight break-words">
              Ready to boost your productivity?
            </h2>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-purple-100 mb-6 sm:mb-8 lg:mb-10 max-w-3xl mx-auto leading-relaxed px-4">
              Join thousands of users who have transformed their task management.
            </p>
            <Link
              to="/signup"
              className="bg-white text-purple-700 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-lg text-sm sm:text-base lg:text-lg font-semibold hover:bg-purple-50 transition-colors inline-flex items-center whitespace-nowrap"
            >
              Start Your Free Account
              <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 flex-shrink-0" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;