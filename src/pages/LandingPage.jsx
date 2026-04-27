import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Brain, Heart, Activity, Apple, ArrowRight, Star, Users, Award, TrendingUp } from 'lucide-react';
import { testimonials } from '../data/dummyData';

const LandingPage = () => {
  const heroRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    // GSAP Hero Animation
    const ctx = gsap.context(() => {
      gsap.from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out'
      });
      gsap.from('.hero-subtitle', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power4.out'
      });
      gsap.from('.hero-buttons', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.6,
        ease: 'power4.out'
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: <Brain className="w-12 h-12" />,
      title: "Mental Health Support",
      description: "Access professional resources and guided meditation for mental wellness",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Activity className="w-12 h-12" />,
      title: "Fitness Programs",
      description: "Personalized workout plans designed for student schedules",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Apple className="w-12 h-12" />,
      title: "Nutrition Guidance",
      description: "Expert meal plans and nutrition advice for optimal health",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Wellness Tracking",
      description: "Monitor your progress with comprehensive analytics dashboard",
      color: "from-red-500 to-orange-500"
    }
  ];

  const stats = [
    { icon: <Users className="w-8 h-8" />, value: "10,000+", label: "Active Students" },
    { icon: <Award className="w-8 h-8" />, value: "500+", label: "Wellness Programs" },
    { icon: <Star className="w-8 h-8" />, value: "4.9/5", label: "User Rating" },
    { icon: <TrendingUp className="w-8 h-8" />, value: "95%", label: "Success Rate" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.h1
              className="hero-title text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Your Journey to
              <span className="block gradient-text">Holistic Wellness</span>
            </motion.h1>
            
            <p className="hero-subtitle text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Empowering students with mental health support, fitness programs, and nutrition guidance for a balanced life
            </p>
            
            <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/student/login" className="btn-primary text-lg px-8 py-4">
                Get Started <ArrowRight className="inline ml-2" />
              </Link>
              <Link to="/about" className="btn-secondary text-lg px-8 py-4">
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-1/4 left-10 opacity-20"
        >
          <Heart className="w-24 h-24 text-red-500" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-1/4 right-10 opacity-20"
        >
          <Brain className="w-32 h-32 text-purple-500" />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 text-white">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need for <span className="gradient-text">Wellness</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Comprehensive tools and resources for your wellbeing journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="card group cursor-pointer"
              >
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What Students Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Real stories from our wellness community
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400">{testimonial.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Ready to Start Your Wellness Journey?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Join thousands of students achieving their wellness goals
            </p>
            <Link to="/student/login" className="btn-primary text-lg px-8 py-4">
              Join WellNest Today <ArrowRight className="inline ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
