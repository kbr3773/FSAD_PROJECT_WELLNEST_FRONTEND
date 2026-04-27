import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import LoadingScreen from './components/common/LoadingScreen';
import Background3D from './components/3d/Background3D';

// Lazy load pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const StudentLogin = lazy(() => import('./pages/StudentLogin'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const StudentDashboard = lazy(() => import('./pages/StudentDashboard'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminPrograms = lazy(() => import('./pages/AdminPrograms'));
const AdminAnalytics = lazy(() => import('./pages/AdminAnalytics'));
const AdminStudents = lazy(() => import('./pages/AdminStudents'));
const MentalHealthPage = lazy(() => import('./pages/MentalHealthPage'));
const FitnessPage = lazy(() => import('./pages/FitnessPage'));
const NutritionPage = lazy(() => import('./pages/NutritionPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="relative min-h-screen">
            <Background3D />
            <Navbar />
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/student/login" element={<StudentLogin />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/student/dashboard" element={<StudentDashboard />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/programs" element={<AdminPrograms />} />
                <Route path="/admin/analytics" element={<AdminAnalytics />} />
                <Route path="/admin/students" element={<AdminStudents />} />
                <Route path="/mental-health" element={<MentalHealthPage />} />
                <Route path="/fitness" element={<FitnessPage />} />
                <Route path="/nutrition" element={<NutritionPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
