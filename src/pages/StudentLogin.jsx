import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, Chrome } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

const StudentLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const authUser = isLogin
        ? await api.loginStudent({ email: formData.email, password: formData.password })
        : await api.registerStudent({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: 'STUDENT'
          });
      login(authUser, false);
      navigate('/student/dashboard');
    } catch (err) {
      setError(`${err.message}. Start the Spring Boot backend, or use student@university.edu / Bharath@321 after it starts.`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    login({ name: 'Google Student', email: 'student.google@university.edu', role: 'STUDENT' }, false);
    navigate('/student/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="glass rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold gradient-text mb-2">
              {isLogin ? 'Welcome Back' : 'Join WellNest'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {isLogin ? 'Continue your wellness journey' : 'Start your wellness journey today'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-field pl-10"
                    placeholder="John Doe"
                    required={!isLogin}
                  />
                </div>
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-field pl-10"
                  placeholder="student@university.edu"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="input-field pl-10 pr-10"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="text-blue-500 hover:text-blue-600">
                  Forgot password?
                </a>
              </div>
            )}

            {error && (
              <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-300">
                {error}
              </p>
            )}

            <button type="submit" className="w-full btn-primary" disabled={loading}>
              {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-500 hover:text-blue-600 font-semibold"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <button type="button" onClick={handleGoogleLogin} className="btn-secondary w-full justify-center">
                <Chrome className="w-5 h-5 mr-2" />
                Google
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentLogin;
