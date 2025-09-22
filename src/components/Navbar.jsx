import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const profileRef = useRef(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileOpen(false);
  };

  const handleProfileEdit = () => {
    navigate('/profile');
    setIsProfileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 w-full z-50 glass-nav"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo with AI theme */}
        <motion.div 
          className="flex items-center space-x-3"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="w-10 h-10 rounded-xl ai-gradient flex items-center justify-center neon-glow">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-ai-gradient font-display">AIIntern</h1>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <NavLink 
            to="/" 
            end 
            className={({isActive}) => `relative px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
              isActive 
                ? 'text-primary-400 bg-primary-500/10' 
                : 'text-slate-300 hover:text-primary-400 hover:bg-white/5'
            }`}
          >
            Home
          </NavLink>
          <NavLink 
            to="/dashboard" 
            className={({isActive}) => `relative px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
              isActive 
                ? 'text-primary-400 bg-primary-500/10' 
                : 'text-slate-300 hover:text-primary-400 hover:bg-white/5'
            }`}
          >
            Dashboard
          </NavLink>
          <NavLink 
            to="/for-corporates" 
            className={({isActive}) => `relative px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
              isActive 
                ? 'text-primary-400 bg-primary-500/10' 
                : 'text-slate-300 hover:text-primary-400 hover:bg-white/5'
            }`}
          >
            For Companies
          </NavLink>
          <NavLink 
            to="/about" 
            className={({isActive}) => `relative px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
              isActive 
                ? 'text-primary-400 bg-primary-500/10' 
                : 'text-slate-300 hover:text-primary-400 hover:bg-white/5'
            }`}
          >
            About
          </NavLink>
        </div>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          {!isAuthenticated ? (
            <>
              <NavLink 
                to="/login" 
                className="px-4 py-2 text-slate-300 hover:text-primary-400 transition-colors font-medium"
              >
                Sign In
              </NavLink>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-button px-6 py-3 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <NavLink to="/signup">Get Started</NavLink>
              </motion.button>
            </>
          ) : (
            <div className="relative" ref={profileRef}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 px-4 py-2 rounded-xl glass-card hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-400 to-primary-600 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {user?.firstName?.charAt(0) || 'U'}
                  </span>
                </div>
                <span className="text-slate-300 font-medium">
                  {user?.firstName || 'User'}
                </span>
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 glass-card rounded-xl shadow-xl border border-white/10"
                >
                  <div className="p-2">
                    <div className="px-3 py-2 text-sm text-slate-400 border-b border-white/10">
                      {user?.email}
                    </div>
                    <button
                      onClick={handleProfileEdit}
                      className="w-full text-left px-3 py-2 text-slate-300 hover:text-primary-400 hover:bg-white/5 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>Edit Profile</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-slate-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Logout</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 rounded-lg glass-card hover:bg-white/10 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden glass-card mx-6 mt-4 p-6 rounded-2xl"
        >
          <div className="flex flex-col space-y-4">
            <NavLink to="/" end className="text-slate-300 hover:text-primary-400 py-2 px-4 rounded-lg hover:bg-white/5 transition-colors">Home</NavLink>
            <NavLink to="/dashboard" className="text-slate-300 hover:text-primary-400 py-2 px-4 rounded-lg hover:bg-white/5 transition-colors">Dashboard</NavLink>
            <NavLink to="/for-corporates" className="text-slate-300 hover:text-primary-400 py-2 px-4 rounded-lg hover:bg-white/5 transition-colors">For Companies</NavLink>
            <NavLink to="/about" className="text-slate-300 hover:text-primary-400 py-2 px-4 rounded-lg hover:bg-white/5 transition-colors">About</NavLink>
            <div className="mt-4 space-y-3">
              {!isAuthenticated ? (
                <>
                  <NavLink to="/login" className="block text-slate-300 hover:text-primary-400 py-2 px-4 rounded-lg hover:bg-white/5 transition-colors">Sign In</NavLink>
                  <NavLink to="/signup" className="block glass-button px-6 py-3 rounded-xl font-semibold text-white text-center">Get Started</NavLink>
                </>
              ) : (
                <>
                  <div className="px-4 py-2 text-slate-400 text-sm border-b border-white/10">
                    {user?.email}
                  </div>
                  <button
                    onClick={handleProfileEdit}
                    className="w-full text-left px-4 py-2 text-slate-300 hover:text-primary-400 hover:bg-white/5 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Edit Profile</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-slate-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
