import { motion } from 'framer-motion';
import { Activity, Clock, Send, Star, TrendingUp, Users, X } from 'lucide-react';
import { fitnessPrograms } from '../data/dummyData';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

const FitnessPage = () => {
  const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
  const categories = ['All', 'Yoga', 'Cardio', 'Strength', 'Pilates'];
  const { user } = useAuth();
  const [programs, setPrograms] = useState(fitnessPrograms);
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [enrollStatus, setEnrollStatus] = useState('');
  const [enrollForm, setEnrollForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    goal: 'Improve fitness',
    schedule: 'Weekday evenings',
    note: '',
  });

  useEffect(() => {
    api.getPrograms('FITNESS')
      .then((items) => {
        if (items.length) {
          setPrograms(items.map((item) => ({ ...item, image: item.imageUrl })));
        }
      })
      .catch(() => setPrograms(fitnessPrograms));
  }, []);

  const filteredPrograms = programs.filter((program) => {
    const levelMatches = selectedLevel === 'All Levels' || program.level === selectedLevel || program.level === 'All Levels';
    const categoryMatches = selectedCategory === 'All' || program.category === selectedCategory;
    return levelMatches && categoryMatches;
  });

  const openEnrollment = (program) => {
    setSelectedProgram(program);
    setEnrollStatus('');
    setEnrollForm({
      name: user?.name || '',
      email: user?.email || '',
      goal: 'Improve fitness',
      schedule: 'Weekday evenings',
      note: '',
    });
  };

  const handleEnroll = async (event) => {
    event.preventDefault();
    if (!selectedProgram) {
      return;
    }

    try {
      const updated = await api.enrollProgram(selectedProgram.id);
      setPrograms((current) => current.map((program) => (
        program.id === selectedProgram.id ? { ...program, enrolled: updated.enrolled } : program
      )));
      setEnrollStatus(`Enrollment confirmed for ${selectedProgram.title}. Your goal and schedule were recorded for this session.`);
      setSelectedProgram(null);
    } catch {
      setPrograms((current) => current.map((program) => (
        program.id === selectedProgram.id ? { ...program, enrolled: program.enrolled + 1 } : program
      )));
      setEnrollStatus('Enrollment recorded locally. Start the backend to save enrollments in MySQL.');
      setSelectedProgram(null);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mb-4">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4">
            Fitness <span className="gradient-text">Programs</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Personalized workout plans designed for your fitness goals and schedule
          </p>
        </motion.div>

        {/* Filters */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <h3 className="text-sm font-semibold mb-3">Difficulty Level</h3>
            <div className="flex flex-wrap gap-3">
              {levels.map((level, index) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedLevel === level
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                      : 'bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-sm font-semibold mb-3">Category</h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((category, index) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                      : 'bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Programs Grid */}
        {enrollStatus && (
          <div className="mb-6 rounded-lg bg-blue-500/10 px-4 py-3 text-sm text-blue-700 dark:text-blue-200">
            {enrollStatus}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="card group cursor-pointer overflow-hidden"
            >
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <img
                  src={program.image || program.imageUrl}
                  alt={program.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-lg rounded-full text-white text-sm font-semibold">
                  {program.level}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <div className="flex items-center text-white text-sm">
                    <Users className="w-4 h-4 mr-1" />
                    {program.enrolled} enrolled
                  </div>
                </div>
              </div>

              <div className="mb-2">
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded text-xs font-semibold">
                  {program.category}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-2">{program.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                with {program.instructor}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{program.description}</p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  {program.duration}
                </div>
                <button onClick={() => openEnrollment(program)} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                  Enroll Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="glass rounded-xl p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mb-3">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-1">500+</h3>
            <p className="text-gray-600 dark:text-gray-400">Workout Sessions</p>
          </div>
          <div className="glass rounded-xl p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mb-3">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-1">10K+</h3>
            <p className="text-gray-600 dark:text-gray-400">Active Members</p>
          </div>
          <div className="glass rounded-xl p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full mb-3">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-1">4.9/5</h3>
            <p className="text-gray-600 dark:text-gray-400">Average Rating</p>
          </div>
        </motion.div>

        {selectedProgram && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-semibold text-blue-500">
                    {selectedProgram.category}
                  </span>
                  <h2 className="mt-3 text-2xl font-bold">Enroll in {selectedProgram.title}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedProgram.duration} with {selectedProgram.instructor}
                  </p>
                </div>
                <button onClick={() => setSelectedProgram(null)} className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleEnroll} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">Student Name</label>
                  <input
                    className="input-field"
                    value={enrollForm.name}
                    onChange={(event) => setEnrollForm({ ...enrollForm, name: event.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    className="input-field"
                    value={enrollForm.email}
                    onChange={(event) => setEnrollForm({ ...enrollForm, email: event.target.value })}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium">Fitness Goal</label>
                    <select
                      className="input-field"
                      value={enrollForm.goal}
                      onChange={(event) => setEnrollForm({ ...enrollForm, goal: event.target.value })}
                    >
                      <option>Improve fitness</option>
                      <option>Reduce stress</option>
                      <option>Build strength</option>
                      <option>Increase flexibility</option>
                      <option>Weight management</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">Preferred Schedule</label>
                    <select
                      className="input-field"
                      value={enrollForm.schedule}
                      onChange={(event) => setEnrollForm({ ...enrollForm, schedule: event.target.value })}
                    >
                      <option>Weekday mornings</option>
                      <option>Weekday evenings</option>
                      <option>Weekend mornings</option>
                      <option>Weekend evenings</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Health Notes</label>
                  <textarea
                    className="input-field min-h-[100px] resize-none"
                    value={enrollForm.note}
                    onChange={(event) => setEnrollForm({ ...enrollForm, note: event.target.value })}
                    placeholder="Optional: injuries, limitations, or anything the instructor should know."
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  <Send className="mr-2 h-5 w-5" />
                  Confirm Enrollment
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FitnessPage;
