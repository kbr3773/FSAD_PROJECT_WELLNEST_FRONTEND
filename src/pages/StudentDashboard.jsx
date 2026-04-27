import { motion } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Heart, Apple, Brain, Calendar, Target } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const StudentDashboard = () => {
  const { user } = useAuth();
  const wellnessScore = 85;

  const weeklyFitnessData = [
    { day: 'Mon', minutes: 30 },
    { day: 'Tue', minutes: 45 },
    { day: 'Wed', minutes: 20 },
    { day: 'Thu', minutes: 60 },
    { day: 'Fri', minutes: 40 },
    { day: 'Sat', minutes: 55 },
    { day: 'Sun', minutes: 35 }
  ];

  const moodData = [
    { day: 'Mon', mood: 7 },
    { day: 'Tue', mood: 8 },
    { day: 'Wed', mood: 6 },
    { day: 'Thu', mood: 9 },
    { day: 'Fri', mood: 8 },
    { day: 'Sat', mood: 9 },
    { day: 'Sun', mood: 7 }
  ];

  const nutritionData = [
    { name: 'Protein', value: 25, color: '#3b82f6' },
    { name: 'Carbs', value: 50, color: '#8b5cf6' },
    { name: 'Fats', value: 25, color: '#ec4899' }
  ];

  const quickStats = [
    { icon: <Activity className="w-6 h-6" />, label: 'Workouts', value: '12', change: '+3', color: 'from-blue-500 to-cyan-500' },
    { icon: <Heart className="w-6 h-6" />, label: 'Avg Heart Rate', value: '72', change: '-2', color: 'from-red-500 to-pink-500' },
    { icon: <Apple className="w-6 h-6" />, label: 'Calories', value: '1850', change: '+150', color: 'from-green-500 to-emerald-500' },
    { icon: <Brain className="w-6 h-6" />, label: 'Meditation', value: '45m', change: '+10m', color: 'from-purple-500 to-pink-500' }
  ];

  const upcomingSessions = [
    { title: 'Yoga Session', time: 'Today, 4:00 PM', instructor: 'Sarah Johnson', type: 'Fitness' },
    { title: 'Nutrition Consultation', time: 'Tomorrow, 2:00 PM', instructor: 'Dr. Emily Watson', type: 'Nutrition' },
    { title: 'Mindfulness Workshop', time: 'Friday, 10:00 AM', instructor: 'Mike Chen', type: 'Mental Health' }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name || 'Student'}!</h1>
          <p className="text-gray-600 dark:text-gray-400">Here's your wellness overview for today</p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                  <p className="text-sm text-green-500 mt-1">{stat.change} this week</p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white`}>
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Wellness Score */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card"
          >
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-blue-500" />
              Wellness Score
            </h3>
            <div className="relative w-48 h-48 mx-auto">
              <svg className="transform -rotate-90 w-48 h-48">
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  className="text-gray-200 dark:text-gray-700"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="url(#gradient)"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 80}`}
                  strokeDashoffset={`${2 * Math.PI * 80 * (1 - wellnessScore / 100)}`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-4xl font-bold">{wellnessScore}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">out of 100</span>
              </div>
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
              Great job! Keep up the good work.
            </p>
          </motion.div>

          {/* Nutrition Breakdown */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="card"
          >
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Apple className="w-5 h-5 mr-2 text-green-500" />
              Today's Nutrition
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={nutritionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {nutritionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {nutritionData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold">{item.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Upcoming Sessions */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-purple-500" />
              Upcoming Sessions
            </h3>
            <div className="space-y-4">
              {upcomingSessions.map((session, index) => (
                <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <h4 className="font-semibold text-sm mb-1">{session.title}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{session.time}</p>
                  <p className="text-xs text-blue-500 mt-1">{session.instructor}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weekly Fitness */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
          >
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-blue-500" />
              Weekly Fitness Activity
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={weeklyFitnessData}>
                <defs>
                  <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis dataKey="day" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Area type="monotone" dataKey="minutes" stroke="#3b82f6" fillOpacity={1} fill="url(#colorMinutes)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Mood Tracker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card"
          >
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-pink-500" />
              Mood Tracker
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={moodData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis dataKey="day" className="text-xs" />
                <YAxis domain={[0, 10]} className="text-xs" />
                <Tooltip />
                <Line type="monotone" dataKey="mood" stroke="#ec4899" strokeWidth={3} dot={{ fill: '#ec4899', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
