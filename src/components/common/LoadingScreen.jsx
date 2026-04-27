import { motion } from 'framer-motion';
import { Heart, Leaf, GraduationCap } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="relative mb-8 flex justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Heart className="w-16 h-16 text-white absolute" />
          </motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Leaf className="w-16 h-16 text-white absolute translate-x-8 opacity-70" />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <GraduationCap className="w-16 h-16 text-white translate-x-16" />
          </motion.div>
        </div>
        <motion.h2
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-4xl font-bold text-white mt-20"
        >
          WellNest
        </motion.h2>
        <p className="text-white/80 mt-2">Loading your wellness journey...</p>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
