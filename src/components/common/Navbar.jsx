import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Moon, Sun, Heart, Leaf, GraduationCap } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = user ? (
    isAdmin ? [
      { name: 'Dashboard', path: '/admin/dashboard' },
      { name: 'Students', path: '/admin/students' },
      { name: 'Programs', path: '/admin/programs' },
      { name: 'Analytics', path: '/admin/analytics' },
    ] : [
      { name: 'Dashboard', path: '/student/dashboard' },
      { name: 'Mental Health', path: '/mental-health' },
      { name: 'Fitness', path: '/fitness' },
      { name: 'Nutrition', path: '/nutrition' },
      { name: 'Blog', path: '/blog' },
    ]
  ) : [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Heart className="w-8 h-8 text-red-500 absolute animate-pulse" />
              <Leaf className="w-8 h-8 text-green-500 absolute translate-x-2 opacity-70" />
              <GraduationCap className="w-8 h-8 text-blue-500 translate-x-4" />
            </div>
            <span className="ml-6 text-2xl font-bold gradient-text">WellNest</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
            
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-white/20 transition-all">
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {user ? (
              <button onClick={handleLogout} className="btn-primary">
                Logout
              </button>
            ) : (
              <div className="flex space-x-4">
                <Link to="/student/login" className="btn-secondary">
                  Student Login
                </Link>
                <Link to="/admin/login" className="btn-primary">
                  Admin
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button onClick={toggleTheme} className="p-2">
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass"
          >
            <div className="px-4 pt-2 pb-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 rounded-lg hover:bg-white/20 transition-all"
                >
                  {link.name}
                </Link>
              ))}
              {user ? (
                <button onClick={handleLogout} className="w-full btn-primary mt-4">
                  Logout
                </button>
              ) : (
                <div className="space-y-2 mt-4">
                  <Link to="/student/login" onClick={() => setIsOpen(false)} className="block w-full btn-secondary text-center">
                    Student Login
                  </Link>
                  <Link to="/admin/login" onClick={() => setIsOpen(false)} className="block w-full btn-primary text-center">
                    Admin Login
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
