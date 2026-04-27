import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Users, Activity, BookOpen, TrendingUp, Eye, Plus, Edit, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '../services/api';

const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    api.getAdminDashboard()
      .then(setDashboard)
      .catch(() => setDashboard(null));
  }, []);

  const stats = [
    { icon: <Users className="w-6 h-6" />, label: 'Total Students', value: dashboard?.stats?.totalStudents ?? '10,234', change: '+12%', color: 'from-blue-500 to-cyan-500' },
    { icon: <Activity className="w-6 h-6" />, label: 'Active Programs', value: dashboard?.stats?.activePrograms ?? '48', change: '+5', color: 'from-green-500 to-emerald-500' },
    { icon: <BookOpen className="w-6 h-6" />, label: 'Resources', value: dashboard?.stats?.totalResources ?? '156', change: '+8', color: 'from-purple-500 to-pink-500' },
    { icon: <Eye className="w-6 h-6" />, label: 'Total Views', value: dashboard?.stats?.resourceViews ?? '45.2K', change: '+18%', color: 'from-orange-500 to-red-500' }
  ];

  const monthlyEngagement = [
    { month: 'Jan', users: 4000, sessions: 2400 },
    { month: 'Feb', users: 3000, sessions: 1398 },
    { month: 'Mar', users: 5000, sessions: 3800 },
    { month: 'Apr', users: 7800, sessions: 3908 },
    { month: 'May', users: 8900, sessions: 4800 },
    { month: 'Jun', users: 10234, sessions: 5800 }
  ];

  const categoryData = [
    { category: 'Mental Health', count: 45 },
    { category: 'Fitness', count: 38 },
    { category: 'Nutrition', count: 32 },
    { category: 'Wellness', count: 28 }
  ];

  const recentActivities = [
    { user: 'Jessica Martinez', action: 'Enrolled in Yoga Program', time: '5 min ago', type: 'enrollment' },
    { user: 'David Kim', action: 'Completed Meditation Session', time: '12 min ago', type: 'completion' },
    { user: 'Aisha Patel', action: 'Viewed Nutrition Plan', time: '25 min ago', type: 'view' },
    { user: 'John Doe', action: 'Booked Consultation', time: '1 hour ago', type: 'booking' },
    { user: 'Sarah Johnson', action: 'Left 5-star Review', time: '2 hours ago', type: 'review' }
  ];

  const programs = [
    { id: 1, name: 'Beginner Yoga Flow', category: 'Fitness', enrolled: 234, status: 'Active' },
    { id: 2, name: 'Stress Management', category: 'Mental Health', enrolled: 189, status: 'Active' },
    { id: 3, name: 'Balanced Diet Plan', category: 'Nutrition', enrolled: 312, status: 'Active' },
    { id: 4, name: 'HIIT Cardio', category: 'Fitness', enrolled: 156, status: 'Draft' }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex justify-between items-center"
        >
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your wellness platform</p>
          </div>
          <Link to="/admin/programs" className="btn-primary flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Add New Program
          </Link>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
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
                  <h3 className="text-3xl font-bold">{stat.value}</h3>
                  <p className="text-sm text-green-500 mt-1 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {stat.change}
                  </p>
                </div>
                <div className={`p-4 rounded-xl bg-gradient-to-br ${stat.color} text-white`}>
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Engagement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card"
          >
            <h3 className="text-xl font-bold mb-4">Monthly Engagement</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyEngagement}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} name="Users" />
                <Line type="monotone" dataKey="sessions" stroke="#8b5cf6" strokeWidth={2} name="Sessions" />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Category Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="card"
          >
            <h3 className="text-xl font-bold mb-4">Programs by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis dataKey="category" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Bar dataKey="count" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Programs Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-2 card"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Wellness Programs</h3>
              <button className="text-blue-500 hover:text-blue-600 text-sm font-semibold">
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 text-sm font-semibold">Program Name</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Category</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Enrolled</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {programs.map((program) => (
                    <tr key={program.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="py-3 px-4">{program.name}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded text-xs">
                          {program.category}
                        </span>
                      </td>
                      <td className="py-3 px-4">{program.enrolled}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs ${
                          program.status === 'Active' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                        }`}>
                          {program.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button className="p-1 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded">
                            <Edit className="w-4 h-4 text-blue-500" />
                          </button>
                          <button className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded">
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="card"
          >
            <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 pb-4 border-b border-gray-100 dark:border-gray-800 last:border-0">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{activity.user}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{activity.action}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
