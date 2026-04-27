import { Heart, Leaf, GraduationCap, Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative">
                <Heart className="w-6 h-6 text-red-500 absolute" />
                <Leaf className="w-6 h-6 text-green-500 absolute translate-x-2 opacity-70" />
                <GraduationCap className="w-6 h-6 text-blue-500 translate-x-4" />
              </div>
              <span className="ml-6 text-xl font-bold gradient-text">WellNest</span>
            </div>
            <p className="text-gray-400 mb-4">
              Empowering students to achieve holistic wellness through mental health support, fitness programs, and nutrition guidance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/mental-health" className="text-gray-400 hover:text-white transition-colors">Mental Health</Link></li>
              <li><Link to="/fitness" className="text-gray-400 hover:text-white transition-colors">Fitness</Link></li>
              <li><Link to="/nutrition" className="text-gray-400 hover:text-white transition-colors">Nutrition</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>support@wellnest.com</span>
              </li>
              <li>123 Wellness Street</li>
              <li>Health City, HC 12345</li>
              <li>Phone: (555) 123-4567</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 WellNest. All rights reserved. Built with ❤️ for student wellness.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
