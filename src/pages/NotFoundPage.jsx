import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.8 }}
        >
          <h1 className="text-9xl font-bold gradient-text mb-4">404</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            Oops! The page you're looking for seems to have wandered off on its own wellness journey.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/" className="btn-primary flex items-center justify-center">
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </Link>
          <Link to="/blog" className="btn-secondary flex items-center justify-center">
            <Search className="w-5 h-5 mr-2" />
            Explore Blog
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12"
        >
          <p className="text-gray-500 dark:text-gray-400">
            <Link to="/" className="text-blue-500 hover:text-blue-600 inline-flex items-center">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to homepage
            </Link>
          </p>
        </motion.div>

        {/* Animated illustration */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mt-12 opacity-20"
        >
          <svg
            className="w-64 h-64 mx-auto"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="4" />
            <path
              d="M70 90 Q100 70 130 90"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <circle cx="75" cy="85" r="8" fill="currentColor" />
            <circle cx="125" cy="85" r="8" fill="currentColor" />
            <path
              d="M70 130 Q100 150 130 130"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;
