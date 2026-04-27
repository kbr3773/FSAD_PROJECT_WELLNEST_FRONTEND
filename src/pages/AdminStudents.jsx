import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Plus, Shield, User, Users } from 'lucide-react';
import { api } from '../services/api';

const AdminStudents = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'Demo Student', email: 'student@university.edu', role: 'STUDENT' },
  ]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: 'Bharath@321',
  });
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.getStudents()
      .then((items) => setStudents(items))
      .catch(() => {});
  }, []);

  const addStudent = async (event) => {
    event.preventDefault();
    setSaving(true);
    setStatus('');

    try {
      const created = await api.registerStudent({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'STUDENT',
      });
      setStudents((current) => [created, ...current.filter((student) => student.email !== created.email)]);
      setStatus('Student account created successfully.');
      setFormData({ name: '', email: '', password: 'Bharath@321' });
    } catch (error) {
      setStatus(`Could not create student: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-500">Admin Control</p>
          <h1 className="text-4xl font-bold">Manage Students</h1>
          <p className="text-gray-600 dark:text-gray-400">Create student accounts for the wellness platform.</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card lg:col-span-2"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-3 text-white">
                <Plus className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Add Student</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Default password can be changed before saving.</p>
              </div>
            </div>

            <form onSubmit={addStudent} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    className="input-field pl-10"
                    value={formData.name}
                    onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                    placeholder="Student name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    className="input-field pl-10"
                    value={formData.email}
                    onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                    placeholder="student@university.edu"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Temporary Password</label>
                <input
                  className="input-field"
                  value={formData.password}
                  onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                  required
                />
              </div>

              <button type="submit" className="btn-primary w-full" disabled={saving}>
                {saving ? 'Creating...' : 'Create Student'}
              </button>
            </form>

            {status && (
              <p className="mt-5 rounded-lg bg-blue-500/10 px-4 py-3 text-sm text-blue-700 dark:text-blue-200">
                {status}
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card lg:col-span-3"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Recent Students</h2>
              <div className="rounded-xl bg-green-500/10 p-3 text-green-500">
                <Users className="h-6 w-6" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="py-3 pr-4 text-left text-sm font-semibold">Name</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold">Email</th>
                    <th className="py-3 pl-4 text-left text-sm font-semibold">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={`${student.email}-${student.id}`} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-4 pr-4 font-semibold">{student.name}</td>
                      <td className="py-4 px-4">{student.email}</td>
                      <td className="py-4 pl-4">
                        <span className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-500">
                          <Shield className="mr-1 h-3 w-3" />
                          {student.role || 'STUDENT'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminStudents;
