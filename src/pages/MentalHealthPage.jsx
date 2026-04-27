import { motion } from 'framer-motion';
import { Brain, Clock, Play, Heart, Send, X } from 'lucide-react';
import { mentalHealthResources } from '../data/dummyData';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

const MentalHealthPage = () => {
  const categories = ['All', 'Stress Relief', 'Meditation', 'Anxiety', 'Sleep'];
  const { user } = useAuth();
  const [resources, setResources] = useState(mentalHealthResources);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedResource, setSelectedResource] = useState(null);
  const [showSupportForm, setShowSupportForm] = useState(false);
  const [supportStatus, setSupportStatus] = useState('');
  const [supportForm, setSupportForm] = useState({
    studentName: user?.name || '',
    email: user?.email || '',
    topic: 'Mental Health Consultation',
    message: '',
  });

  useEffect(() => {
    api.getResources('MENTAL_HEALTH')
      .then((items) => {
        if (items.length) {
          setResources(items.map((item) => ({ ...item, image: item.imageUrl })));
        }
      })
      .catch(() => setResources(mentalHealthResources));
  }, []);

  const filteredResources = selectedCategory === 'All'
    ? resources
    : resources.filter((resource) => resource.category === selectedCategory);

  const handleSupportSubmit = async (event) => {
    event.preventDefault();
    setSupportStatus('');

    try {
      await api.createSupportRequest(supportForm);
      setSupportStatus('Consultation request sent. The wellness support team will contact you soon.');
      setSupportForm({
        studentName: user?.name || '',
        email: user?.email || '',
        topic: 'Mental Health Consultation',
        message: '',
      });
      setShowSupportForm(false);
    } catch (error) {
      setSupportStatus(`Could not send request: ${error.message}`);
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4">
            Mental Health <span className="gradient-text">Resources</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Access professional resources, guided meditations, and expert advice for your mental wellbeing
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-white/10 backdrop-blur-lg border border-white/20 hover:bg-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="card group cursor-pointer overflow-hidden"
              onClick={() => setSelectedResource(resource)}
            >
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <img
                  src={resource.image || resource.imageUrl}
                  alt={resource.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-lg rounded-full text-white text-sm">
                    {resource.category}
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{resource.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {resource.duration}
                </div>
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelectedResource(resource);
                  }}
                  className="text-blue-500 hover:text-blue-600 font-semibold"
                >
                  Start Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass rounded-2xl p-8 text-center"
        >
          <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Need Immediate Support?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            If you're experiencing a mental health crisis, please reach out to our support team or contact emergency services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setShowSupportForm(true)} className="btn-primary">Book Consultation</button>
            <button
              onClick={() => setSupportStatus('24/7 student wellness helpline: 1-800-WELLNESS. If this is an emergency, contact local emergency services immediately.')}
              className="btn-secondary"
            >
              24/7 Helpline
            </button>
          </div>
          {supportStatus && (
            <p className="mt-5 rounded-lg bg-blue-500/10 px-4 py-3 text-sm text-blue-700 dark:text-blue-200">
              {supportStatus}
            </p>
          )}
        </motion.div>

        {selectedResource && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <span className="rounded-full bg-purple-500/10 px-3 py-1 text-sm font-semibold text-purple-500">
                    {selectedResource.category}
                  </span>
                  <h2 className="mt-3 text-3xl font-bold">{selectedResource.title}</h2>
                </div>
                <button onClick={() => setSelectedResource(null)} className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <img
                src={selectedResource.image || selectedResource.imageUrl}
                alt={selectedResource.title}
                className="mb-5 h-56 w-full rounded-xl object-cover"
              />
              <p className="mb-4 text-gray-600 dark:text-gray-300">{selectedResource.description}</p>
              <div className="rounded-xl bg-purple-500/10 p-5">
                <h3 className="mb-3 font-bold">Quick Practice</h3>
                <ol className="list-decimal space-y-2 pl-5 text-sm text-gray-700 dark:text-gray-300">
                  <li>Sit comfortably and relax your shoulders.</li>
                  <li>Breathe in slowly for four counts, hold for two, and breathe out for six.</li>
                  <li>Write one worry and one next action you can take today.</li>
                  <li>If you still feel overwhelmed, book a consultation from this page.</li>
                </ol>
              </div>
              <button onClick={() => setSelectedResource(null)} className="btn-primary mt-6 w-full">
                Mark Complete
              </button>
            </motion.div>
          </div>
        )}

        {showSupportForm && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900"
            >
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Book Consultation</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Send a confidential support request.</p>
                </div>
                <button onClick={() => setShowSupportForm(false)} className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSupportSubmit} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">Name</label>
                  <input
                    className="input-field"
                    value={supportForm.studentName}
                    onChange={(event) => setSupportForm({ ...supportForm, studentName: event.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    className="input-field"
                    value={supportForm.email}
                    onChange={(event) => setSupportForm({ ...supportForm, email: event.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">What do you need help with?</label>
                  <textarea
                    className="input-field min-h-[130px] resize-none"
                    value={supportForm.message}
                    onChange={(event) => setSupportForm({ ...supportForm, message: event.target.value })}
                    placeholder="Briefly describe your concern or preferred consultation time."
                    required
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  <Send className="mr-2 h-5 w-5" />
                  Send Request
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentalHealthPage;
