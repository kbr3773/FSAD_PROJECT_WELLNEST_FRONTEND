import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, BookOpen, Edit, Plus, Save, Trash2, Users, X } from 'lucide-react';
import { api } from '../services/api';
import { fitnessPrograms, mentalHealthResources, nutritionPlans } from '../data/dummyData';

const AdminPrograms = () => {
  const [programs, setPrograms] = useState(fitnessPrograms);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructor: '',
    level: 'Beginner',
    category: 'Fitness',
    duration: '30 min',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=900',
    type: 'FITNESS',
    status: 'Active',
    enrolled: 0,
  });
  const [resources, setResources] = useState([
    ...mentalHealthResources,
    ...nutritionPlans.map((plan) => ({
      ...plan,
      category: plan.type,
      duration: `${plan.meals} meals`,
    })),
  ]);

  useEffect(() => {
    api.getPrograms()
      .then((items) => {
        if (items.length) {
          setPrograms(items.map((item) => ({ ...item, image: item.imageUrl })));
        }
      })
      .catch(() => setPrograms(fitnessPrograms));

    api.getResources()
      .then((items) => {
        if (items.length) {
          setResources(items.map((item) => ({ ...item, image: item.imageUrl })));
        }
      })
      .catch(() => {});
  }, []);

  const updateField = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleAddProgram = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage('');

    const payload = {
      ...formData,
      enrolled: Number(formData.enrolled) || 0,
      type: formData.category === 'Mental Health' ? 'MENTAL_HEALTH' : 'FITNESS',
    };

    try {
      const created = await api.createProgram(payload);
      setPrograms((current) => [{ ...created, image: created.imageUrl }, ...current]);
      setMessage('Program added successfully and saved in MySQL.');
      setShowForm(false);
      setFormData({
        title: '',
        description: '',
        instructor: '',
        level: 'Beginner',
        category: 'Fitness',
        duration: '30 min',
        imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=900',
        type: 'FITNESS',
        status: 'Active',
        enrolled: 0,
      });
    } catch (error) {
      setMessage(`Could not save program: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const programCount = programs.length;
  const activeCount = programs.filter((program) => program.status !== 'Draft').length;
  const resourceCount = resources.length;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-500">Admin Control</p>
            <h1 className="text-4xl font-bold">Programs & Resources</h1>
            <p className="text-gray-600 dark:text-gray-400">Review wellness programs and student-facing resource content.</p>
          </div>
          <button onClick={() => setShowForm(true)} className="btn-primary">
            <Plus className="w-5 h-5 mr-2" />
            Add Program
          </button>
        </motion.div>

        {message && (
          <div className="mb-6 rounded-lg bg-blue-500/10 px-4 py-3 text-sm text-blue-700 dark:text-blue-200">
            {message}
          </div>
        )}

        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="card mb-8"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Add Wellness Program</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">This will be stored through the Spring Boot API.</p>
              </div>
              <button onClick={() => setShowForm(false)} className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddProgram} className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">Program Title</label>
                <input
                  className="input-field"
                  value={formData.title}
                  onChange={(event) => updateField('title', event.target.value)}
                  placeholder="Morning Yoga for Students"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Instructor</label>
                <input
                  className="input-field"
                  value={formData.instructor}
                  onChange={(event) => updateField('instructor', event.target.value)}
                  placeholder="Dr. Priya Sharma"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Category</label>
                <select className="input-field" value={formData.category} onChange={(event) => updateField('category', event.target.value)}>
                  <option>Fitness</option>
                  <option>Yoga</option>
                  <option>Cardio</option>
                  <option>Strength</option>
                  <option>Mental Health</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Level</label>
                <select className="input-field" value={formData.level} onChange={(event) => updateField('level', event.target.value)}>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>All Levels</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Duration</label>
                <input
                  className="input-field"
                  value={formData.duration}
                  onChange={(event) => updateField('duration', event.target.value)}
                  placeholder="30 min"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Image URL</label>
                <input
                  className="input-field"
                  value={formData.imageUrl}
                  onChange={(event) => updateField('imageUrl', event.target.value)}
                  placeholder="https://..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium">Description</label>
                <textarea
                  className="input-field min-h-[110px] resize-none"
                  value={formData.description}
                  onChange={(event) => updateField('description', event.target.value)}
                  placeholder="Describe the purpose, student benefits, and session style."
                  required
                />
              </div>

              <div className="md:col-span-2 flex justify-end gap-3">
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={saving}>
                  <Save className="mr-2 h-5 w-5" />
                  {saving ? 'Saving...' : 'Save Program'}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-8">
          {[
            { label: 'Total Programs', value: programCount, icon: <Activity className="w-6 h-6" />, color: 'from-blue-500 to-cyan-500' },
            { label: 'Active Programs', value: activeCount, icon: <Users className="w-6 h-6" />, color: 'from-green-500 to-emerald-500' },
            { label: 'Resource Library', value: resourceCount, icon: <BookOpen className="w-6 h-6" />, color: 'from-purple-500 to-pink-500' },
          ].map((stat) => (
            <div key={stat.label} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <h2 className="mt-1 text-3xl font-bold">{stat.value}</h2>
                </div>
                <div className={`rounded-xl bg-gradient-to-br ${stat.color} p-4 text-white`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card lg:col-span-3"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">Wellness Programs</h2>
              <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-semibold text-blue-500">
                Live from API
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="py-3 pr-4 text-left text-sm font-semibold">Program</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Category</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Level</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Enrolled</th>
                    <th className="py-3 pl-4 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {programs.map((program) => (
                    <tr key={program.id} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-4 pr-4">
                        <p className="font-semibold">{program.title}</p>
                        <p className="text-xs text-gray-500">{program.instructor}</p>
                      </td>
                      <td className="py-4 px-4">{program.category}</td>
                      <td className="py-4 px-4">{program.level}</td>
                      <td className="py-4 px-4">{program.enrolled}</td>
                      <td className="py-4 pl-4">
                        <div className="flex gap-2">
                          <button className="rounded-lg p-2 hover:bg-blue-500/10" title="Edit program">
                            <Edit className="w-4 h-4 text-blue-500" />
                          </button>
                          <button className="rounded-lg p-2 hover:bg-red-500/10" title="Delete program">
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card lg:col-span-2"
          >
            <h2 className="mb-5 text-xl font-bold">Resource Library</h2>
            <div className="space-y-4">
              {resources.slice(0, 6).map((resource) => (
                <div key={`${resource.title}-${resource.id}`} className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <h3 className="font-semibold">{resource.title}</h3>
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                      {resource.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{resource.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminPrograms;
