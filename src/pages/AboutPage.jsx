import { motion } from 'framer-motion';
import { Target, Users, Heart, Award, Zap, Shield } from 'lucide-react';

const AboutPage = () => {
  const values = [
    { icon: <Heart className="w-8 h-8" />, title: 'Student-Centered', description: 'Every decision we make prioritizes student wellbeing', color: 'from-red-500 to-pink-500' },
    { icon: <Shield className="w-8 h-8" />, title: 'Privacy First', description: 'Your health data is secure and confidential', color: 'from-blue-500 to-cyan-500' },
    { icon: <Zap className="w-8 h-8" />, title: 'Evidence-Based', description: 'All programs backed by scientific research', color: 'from-yellow-500 to-orange-500' },
    { icon: <Award className="w-8 h-8" />, title: 'Excellence', description: 'Committed to delivering the highest quality resources', color: 'from-purple-500 to-pink-500' }
  ];

  const team = [
    { name: 'Dr. Sarah Johnson', role: 'Chief Wellness Officer', image: 'https://i.pravatar.cc/300?img=1' },
    { name: 'Dr. Michael Chen', role: 'Head of Mental Health', image: 'https://i.pravatar.cc/300?img=2' },
    { name: 'Emma Davis', role: 'Fitness Director', image: 'https://i.pravatar.cc/300?img=3' },
    { name: 'Dr. James Wilson', role: 'Nutrition Specialist', image: 'https://i.pravatar.cc/300?img=4' }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About <span className="gradient-text">WellNest</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We're on a mission to make holistic wellness accessible to every student, 
            empowering the next generation to thrive academically and personally.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-12 mb-16 text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6">
            <Target className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            To create a comprehensive wellness ecosystem that supports students in achieving 
            balance between academic excellence and personal wellbeing through accessible 
            mental health resources, fitness programs, and nutrition guidance.
          </p>
        </motion.div>

        {/* Values */}
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-center mb-12"
          >
            Our Core Values
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -10 }}
                className="card text-center"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${value.color} rounded-full mb-4 text-white`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-4xl font-bold text-center mb-12"
          >
            Meet Our Team
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ y: -10 }}
                className="card text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="glass rounded-2xl p-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold gradient-text mb-2">10K+</h3>
              <p className="text-gray-600 dark:text-gray-400">Active Students</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold gradient-text mb-2">500+</h3>
              <p className="text-gray-600 dark:text-gray-400">Programs</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold gradient-text mb-2">50+</h3>
              <p className="text-gray-600 dark:text-gray-400">Universities</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold gradient-text mb-2">95%</h3>
              <p className="text-gray-600 dark:text-gray-400">Satisfaction</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
