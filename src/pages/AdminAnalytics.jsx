import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Activity, BookOpen, LifeBuoy, TrendingUp, Users } from 'lucide-react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { api } from '../services/api';

const AdminAnalytics = () => {
  const [dashboard, setDashboard] = useState(null);
  const [students, setStudents] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    api.getAdminDashboard()
      .then(setDashboard)
      .catch(() => setDashboard(null));
    api.getStudents()
      .then(setStudents)
      .catch(() => setStudents([]));
    api.getPrograms()
      .then(setPrograms)
      .catch(() => setPrograms([]));
    api.getResources()
      .then(setResources)
      .catch(() => setResources([]));
  }, []);

  const stats = dashboard?.stats;
  const exactStudentCount = students.length || stats?.totalStudents || 0;
  const exactProgramCount = programs.length || stats?.activePrograms || 0;
  const exactResourceCount = resources.length || stats?.totalResources || 0;
  const exactSupportCount = stats?.supportRequests || 0;
  const exactEnrollments = programs.reduce((sum, program) => sum + (Number(program.enrolled) || 0), 0);

  const chartData = [
    { label: 'Students', count: exactStudentCount },
    { label: 'Programs', count: exactProgramCount },
    { label: 'Resources', count: exactResourceCount },
    { label: 'Support', count: exactSupportCount },
  ];

  const programChartData = programs.map((program) => ({
    name: program.title?.length > 14 ? `${program.title.slice(0, 14)}...` : program.title,
    enrolled: program.enrolled || 0,
  }));

  const cards = [
    { label: 'Students', value: exactStudentCount, icon: <Users className="w-6 h-6" />, color: 'from-blue-500 to-cyan-500' },
    { label: 'Programs', value: exactProgramCount, icon: <Activity className="w-6 h-6" />, color: 'from-green-500 to-emerald-500' },
    { label: 'Resources', value: exactResourceCount, icon: <BookOpen className="w-6 h-6" />, color: 'from-purple-500 to-pink-500' },
    { label: 'Support Cases', value: exactSupportCount, icon: <LifeBuoy className="w-6 h-6" />, color: 'from-orange-500 to-red-500' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-500">Admin Insights</p>
            <h1 className="text-4xl font-bold">Usage Analytics</h1>
            <p className="text-gray-600 dark:text-gray-400">Track student engagement, content views, and program growth.</p>
          </div>
          <Link to="/admin/programs" className="btn-primary">
            Add Program
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {cards.map((card) => (
            <div key={card.label} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{card.label}</p>
                  <h2 className="mt-1 text-3xl font-bold">{card.value}</h2>
                  <p className="mt-1 flex items-center text-sm text-green-500">
                    <TrendingUp className="mr-1 h-4 w-4" />
                    Updated live
                  </p>
                </div>
                <div className={`rounded-xl bg-gradient-to-br ${card.color} p-4 text-white`}>
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="card">
            <h2 className="mb-4 text-xl font-bold">Current Database Counts</h2>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="usersFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.7} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="count" stroke="#3b82f6" fill="url(#usersFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <h2 className="mb-4 text-xl font-bold">Program Enrollments</h2>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={programChartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="enrolled" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Total enrollments across programs: {exactEnrollments}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
