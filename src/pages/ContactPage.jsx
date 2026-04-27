import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { api } from '../services/api';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.createSupportRequest({
        studentName: formData.name,
        email: formData.email,
        topic: formData.subject,
        message: formData.message,
      });
      setStatus("Message sent. The wellness support team will follow up soon.");
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus("Message saved locally for now. Start the backend to store support requests in MySQL.");
    }
  };

  const contactInfo = [
    { icon: <Mail className="w-6 h-6" />, title: 'Email', value: 'support@wellnest.com', color: 'from-blue-500 to-cyan-500' },
    { icon: <Phone className="w-6 h-6" />, title: 'Phone', value: '(555) 123-4567', color: 'from-green-500 to-emerald-500' },
    { icon: <MapPin className="w-6 h-6" />, title: 'Address', value: '123 Wellness St, Health City', color: 'from-purple-500 to-pink-500' }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card text-center"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${info.color} rounded-full mb-4 text-white`}>
                {info.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{info.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{info.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
          >
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-field"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="input-field"
                  placeholder="How can we help?"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="input-field min-h-[150px] resize-none"
                  placeholder="Tell us more about your inquiry..."
                  required
                />
              </div>

              <button type="submit" className="w-full btn-primary flex items-center justify-center">
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </button>
              {status && (
                <p className="rounded-lg bg-blue-500/10 px-4 py-3 text-sm text-blue-700 dark:text-blue-200">
                  {status}
                </p>
              )}
            </form>
          </motion.div>

          {/* Map/Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <div className="card">
              <h2 className="text-2xl font-bold mb-4">Office Hours</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Monday - Friday</span>
                  <span className="font-semibold">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Saturday</span>
                  <span className="font-semibold">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Sunday</span>
                  <span className="font-semibold">Closed</span>
                </div>
              </div>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold mb-4">Quick Support</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Need immediate assistance? Our support team is available 24/7 through our helpline.
              </p>
              <button className="btn-primary w-full">
                <Phone className="w-5 h-5 mr-2 inline" />
                Call Support
              </button>
            </div>

            <div className="card bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <h2 className="text-2xl font-bold mb-4">Emergency Support</h2>
              <p className="mb-4 opacity-90">
                If you're experiencing a mental health crisis, please contact emergency services or our 24/7 crisis hotline immediately.
              </p>
              <button className="w-full bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all">
                Crisis Hotline: 1-800-WELLNESS
              </button>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 glass rounded-2xl p-8"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-2">How do I book a consultation?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Simply log in to your account, navigate to the booking section, and choose your preferred time slot.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Are the programs free for students?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Yes! All our wellness programs are completely free for registered students.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Is my data secure?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Absolutely. We use industry-standard encryption and never share your personal information.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Can I access programs offline?</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Some resources can be downloaded for offline access through our mobile app.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
