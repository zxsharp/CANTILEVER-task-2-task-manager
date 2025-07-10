import { Link } from 'react-router-dom';
import { CheckCircle, Calendar, Users, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-8 w-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">TaskFlow</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="text-purple-200 hover:text-white font-medium transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Organize Your Life with
            <span className="text-purple-400 block">Smart Task Management</span>
          </h1>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Stay productive and never miss a deadline. TaskFlow helps you manage your tasks,
            set priorities, and achieve your goals with ease.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-all transform hover:scale-105 flex items-center justify-center"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/login"
              className="border-2 border-purple-500 text-purple-300 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-600 hover:text-white transition-all"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:border-purple-500/40">
            <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Task Management</h3>
            <p className="text-purple-100">
              Create, organize, and track your tasks with our intuitive interface.
              Mark as complete and stay on top of your goals.
            </p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:border-purple-500/40">
            <div className="w-12 h-12 bg-emerald-600/20 rounded-lg flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Smart Scheduling</h3>
            <p className="text-purple-100">
              Schedule your tasks and set priorities. Get reminders and never miss
              important deadlines again.
            </p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:border-purple-500/40">
            <div className="w-12 h-12 bg-indigo-600/20 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Personal Dashboard</h3>
            <p className="text-purple-100">
              Your personalized dashboard shows all your tasks at a glance.
              Sort, filter, and organize however you like.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to boost your productivity?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of users who have transformed their task management.
          </p>
          <Link
            to="/signup"
            className="bg-white text-purple-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-50 transition-colors inline-flex items-center"
          >
            Start Your Free Account
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;