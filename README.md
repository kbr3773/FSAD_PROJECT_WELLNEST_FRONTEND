# WellNest - Student Wellness Platform 🌿

A modern, production-ready frontend web application built with Vite + React for student wellness, providing mental health support, fitness programs, and nutrition guidance.

![WellNest](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.0.0-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.0-cyan)

## 🎯 Project Overview

WellNest is a comprehensive student wellness platform that empowers students to achieve holistic wellness through:
- **Mental Health Support** - Professional resources and guided meditation
- **Fitness Programs** - Personalized workout plans for student schedules
- **Nutrition Guidance** - Expert meal plans and nutrition advice
- **Wellness Tracking** - Comprehensive analytics dashboard

## ✨ Features

### 🎨 UI/UX
- Modern glassmorphism design
- Dark/Light theme toggle
- Advanced page transitions with Framer Motion
- Smooth scroll animations
- 3D animated background using React Three Fiber
- Parallax scrolling effects
- Animated cards with hover effects
- Floating particles and SVG icons
- Responsive design (mobile, tablet, desktop)

### 👥 User Roles

#### Student User
- Login/Register interface
- Personal dashboard with wellness tracking
- Browse mental health resources
- Join fitness programs
- View nutrition plans
- Book support sessions (UI only)
- Progress tracking with interactive charts
- Profile management

#### Admin
- Admin login portal
- Comprehensive admin dashboard
- Add/Edit/Delete wellness programs (UI only)
- Manage health resources
- View analytics and usage statistics
- Activity logs
- User management interface

### 📄 Pages
- Landing Page (animated hero section with GSAP)
- About Page
- Student Login/Register
- Admin Login
- Student Dashboard
- Admin Dashboard
- Mental Health Resources
- Fitness Programs
- Nutrition Advice
- Wellness Blog
- Contact Page
- 404 Error Page

## 🛠️ Tech Stack

- **Framework**: React 18 with Vite
- **Routing**: React Router DOM
- **State Management**: Context API
- **Animations**: 
  - Framer Motion (page transitions, UI animations)
  - GSAP (hero section animations)
- **3D Graphics**: React Three Fiber + Three.js
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React

## 📦 Installation

1. **Clone the repository**
```bash
cd wellnest-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Build for production**
```bash
npm run build
```

5. **Preview production build**
```bash
npm run preview
```

## 📁 Project Structure

```
wellnest-app/
├── src/
│   ├── components/
│   │   ├── common/          # Shared components (Navbar, Footer, Loading)
│   │   ├── student/         # Student-specific components
│   │   ├── admin/           # Admin-specific components
│   │   └── 3d/              # 3D animated components
│   ├── pages/               # Page components
│   │   ├── LandingPage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── StudentLogin.jsx
│   │   ├── AdminLogin.jsx
│   │   ├── StudentDashboard.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── MentalHealthPage.jsx
│   │   ├── FitnessPage.jsx
│   │   ├── NutritionPage.jsx
│   │   ├── BlogPage.jsx
│   │   ├── ContactPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── context/             # React Context providers
│   │   ├── ThemeContext.jsx
│   │   └── AuthContext.jsx
│   ├── data/                # Dummy data for resources
│   │   └── dummyData.js
│   ├── App.jsx              # Main app component with routing
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

## 🎨 Design Features

### Glassmorphism UI
- Frosted glass effect with backdrop blur
- Transparent backgrounds with subtle borders
- Modern, clean aesthetic

### Animations
- **Page Transitions**: Smooth fade and slide effects
- **Hero Section**: GSAP-powered entrance animations
- **Scroll Animations**: Elements animate on scroll into view
- **Hover Effects**: Interactive card transformations
- **3D Background**: Rotating sphere with distortion effects

### Theme System
- Automatic dark/light mode detection
- Manual theme toggle
- Persistent theme preference
- Smooth color transitions

## 📊 Dashboard Features

### Student Dashboard
- Wellness score progress circle
- Weekly fitness activity chart (Area Chart)
- Mood tracker graph (Line Chart)
- Nutrition breakdown (Pie Chart)
- Quick stats cards
- Upcoming sessions calendar

### Admin Dashboard
- Total users and engagement metrics
- Monthly engagement trends (Line Chart)
- Programs by category (Bar Chart)
- Recent activity feed
- Program management table
- Real-time statistics

## 🔐 Authentication

The app includes authentication UI for both students and admins:
- Login/Register forms with validation
- Password visibility toggle
- Social login buttons (UI only)
- Remember me functionality
- Forgot password links

**Note**: This is frontend-only. Backend integration required for actual authentication.

## 🎯 Future Backend Integration

The application is structured to easily integrate with backend APIs:

### Suggested API Endpoints
```
POST   /api/auth/login
POST   /api/auth/register
GET    /api/user/profile
GET    /api/programs/fitness
GET    /api/programs/mental-health
GET    /api/programs/nutrition
POST   /api/bookings
GET    /api/admin/analytics
POST   /api/admin/programs
PUT    /api/admin/programs/:id
DELETE /api/admin/programs/:id
```

### Context API Ready
- `AuthContext` - User authentication state
- `ThemeContext` - Theme preferences
- Easy to add more contexts for data management

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm i -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Drag and drop the 'dist' folder to Netlify
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color palette:
```javascript
theme: {
  extend: {
    colors: {
      primary: { ... }
    }
  }
}
```

### Animations
Modify animation durations in `tailwind.config.js`:
```javascript
animation: {
  'float': 'float 6s ease-in-out infinite',
}
```

## 📱 Responsive Design

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All components are fully responsive with mobile-first approach.

## 🌟 Key Components

### Navbar
- Glassmorphism design
- Dynamic navigation based on user role
- Theme toggle
- Mobile responsive menu

### Footer
- Social media links
- Quick navigation
- Contact information
- Newsletter signup

### Loading Screen
- Animated logo
- Smooth transitions
- Gradient background

### 3D Background
- Animated sphere with distortion
- Auto-rotating camera
- Performance optimized

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Developer Notes

- **No TypeScript**: Pure JavaScript implementation as requested
- **No Backend**: Frontend-only, ready for API integration
- **Dummy Data**: All data is mock data in `src/data/dummyData.js`
- **Production Ready**: Optimized build, lazy loading, code splitting

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, email support@wellnest.com or join our community forum.

---

**Built with ❤️ for student wellness**

WellNest - Empowering students to achieve holistic wellness
