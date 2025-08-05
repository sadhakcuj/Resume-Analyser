import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Brain, Menu, LogOut, Computer, X, User, ChevronDown, BarChart2, Users, Zap } from "lucide-react";
import { getCurrentUser, logout } from '../services/authService';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  const NavLink = ({ to, icon, label }) => (
    <Link
      to={to}
      className={`flex items-center space-x-2 text-white hover:text-purple-200 transition-colors ${location.pathname === to ? 'text-purple-300' : ''
        }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-indigo-900/90 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-purple-300" />
              <span className="text-xl font-bold text-white">InterviewPro</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/practice" icon={<Zap className="h-4 w-4" />} label="Practice" />
            <NavLink to="/analytics" icon={<BarChart2 className="h-4 w-4" />} label="Analytics" />
            <NavLink to="/community" icon={<Users className="h-4 w-4" />} label="Community" />

            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-white bg-indigo-800/30 hover:bg-indigo-700/50 px-4 py-2 rounded-full transition-all duration-300">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span>{user.firstName}</span>
                  <ChevronDown className="h-4 w-4 text-gray-300" />
                </button>

                <div className="absolute right-0 mt-2 w-48 origin-top-right hidden group-hover:block">
                  <div className="bg-indigo-900 rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="py-2">
                      <Link to="/profile" className="flex items-center px-4 py-3 text-sm text-white hover:bg-indigo-800 transition-colors">
                        <User className="h-4 w-4 mr-2 text-purple-300" />
                        My Profile
                      </Link>
                      <Link to="/settings" className="flex items-center px-4 py-3 text-sm text-white hover:bg-indigo-800 transition-colors">
                        <User className="h-4 w-4 mr-2 text-purple-300" />
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full text-left px-4 py-3 text-sm text-red-300 hover:bg-red-900/40 transition-colors"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/signin"
                  className="text-white hover:text-purple-200 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-5 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-purple-200 hover:bg-indigo-800/30 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-indigo-900/90 backdrop-blur-sm">
            <NavLink to="/practice" icon={<Zap className="h-5 w-5" />} label="Practice" />
            <NavLink to="/analytics" icon={<BarChart2 className="h-5 w-5" />} label="Analytics" />
            <NavLink to="/community" icon={<Users className="h-5 w-5" />} label="Community" />

            <div className="pt-4 border-t border-indigo-800">
              {user ? (
                <div className="space-y-3">
                  <Link to="/profile" className="flex items-center text-white py-3 px-2 rounded-lg hover:bg-indigo-800/50 transition-colors">
                    <User className="h-5 w-5 mr-3 text-purple-300" />
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full text-red-300 py-3 px-2 rounded-lg hover:bg-red-900/30 transition-colors"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3 pt-2">
                  <Link
                    to="/signin"
                    className="block w-full text-center text-white bg-indigo-800/50 hover:bg-indigo-800 py-3 px-4 rounded-lg transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="block w-full text-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;