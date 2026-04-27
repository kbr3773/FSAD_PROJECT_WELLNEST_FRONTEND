# 📦 Component Documentation

## Table of Contents
1. [Common Components](#common-components)
2. [Page Components](#page-components)
3. [Context Providers](#context-providers)
4. [Data Structure](#data-structure)

---

## Common Components

### 🧭 Navbar
**Location**: `src/components/common/Navbar.jsx`

**Features**:
- Glassmorphism design with backdrop blur
- Dynamic navigation based on user role (Student/Admin/Guest)
- Theme toggle (Dark/Light mode)
- Mobile responsive hamburger menu
- Animated menu transitions with Framer Motion
- Custom WellNest logo with animated icons

**Props**: None (uses Context)

**Usage**:
```jsx
import Navbar from './components/common/Navbar';
<Navbar />
```

---

### 👣 Footer
**Location**: `src/components/common/Footer.jsx`

**Features**:
- Company information and description
- Quick navigation links
- Contact information
- Social media icons (Facebook, Twitter, Instagram, LinkedIn)
- Responsive grid layout
- Dark mode support

**Props**: None

**Usage**:
```jsx
import Footer from './components/common/Footer';
<Footer />
```

---

### ⏳ LoadingScreen
**Location**: `src/components/common/LoadingScreen.jsx`

**Features**:
- Full-screen animated loading overlay
- Rotating logo animation
- Gradient background
- Pulsing text effect
- Smooth fade transitions

**Props**: None

**Usage**:
```jsx
import LoadingScreen from './components/common/LoadingScreen';
<Suspense fallback={<LoadingScreen />}>
  <YourComponent />
</Suspense>
```

---

### 🌐 Background3D
**Location**: `src/components/3d/Background3D.jsx`

**Features**:
- 3D animated sphere using React Three Fiber
- Distortion material effect
- Auto-rotating camera
- Ambient and directional lighting
- Performance optimized
- Fixed position background

**Props**: None

**Usage**:
```jsx
import Background3D from './components/3d/Background3D';
<Background3D />
```

**Dependencies**:
- @react-three/fiber
- @react-three/drei
- three

---

## Page Components

### 🏠 LandingPage
**Location**: `src/pages/LandingPage.jsx`

**Sections**:
1. Hero Section - GSAP animated title and CTA buttons
2. Stats Section - 4 animated statistics cards
3. Features Section - 4 feature cards with icons
4. Testimonials Section - 3 student testimonials
5. CTA Section - Final call-to-action

**Animations**:
- GSAP entrance animations
- Framer Motion scroll animations
- Floating heart and brain icons
- Hover effects on cards

---

### ℹ️ AboutPage
**Location**: `src/pages/AboutPage.jsx`

**Sections**:
1. Hero - Mission statement
2. Mission Card - Detailed mission with icon
3. Core Values - 4 value cards
4. Team Section - 4 team members
5. Statistics - 4 key metrics

**Features**:
- Animated cards on scroll
- Hover effects
- Gradient icons
- Responsive grid layout

---

### 🔐 StudentLogin
**Location**: `src/pages/StudentLogin.jsx`

**Features**:
- Toggle between Login/Register
- Email and password fields
- Password visibility toggle
- Remember me checkbox
- Social login buttons (UI only)
- Form validation UI
- Animated form transitions

**State**:
```javascript
{
  isLogin: boolean,
  showPassword: boolean,
  formData: { email, password, name }
}
```

---

### 🛡️ AdminLogin
**Location**: `src/pages/AdminLogin.jsx`

**Features**:
- Admin-specific styling (purple theme)
- Shield icon branding
- Email and password fields
- Password visibility toggle
- Security notice
- Remember me functionality

---

### 📊 StudentDashboard
**Location**: `src/pages/StudentDashboard.jsx`

**Components**:
1. **Quick Stats** (4 cards)
   - Workouts count
   - Average heart rate
   - Calories
   - Meditation time

2. **Wellness Score** (Progress Circle)
   - SVG circular progress
   - Score out of 100
   - Gradient stroke

3. **Nutrition Breakdown** (Pie Chart)
   - Protein, Carbs, Fats
   - Color-coded legend

4. **Upcoming Sessions** (List)
   - Session title, time, instructor

5. **Weekly Fitness** (Area Chart)
   - 7 days of activity
   - Minutes per day

6. **Mood Tracker** (Line Chart)
   - Daily mood scores (1-10)

**Charts Used**:
- Recharts: AreaChart, LineChart, PieChart

---

### 👨‍💼 AdminDashboard
**Location**: `src/pages/AdminDashboard.jsx`

**Components**:
1. **Stats Cards** (4 metrics)
   - Total users
   - Active programs
   - Resources
   - Total views

2. **Monthly Engagement** (Line Chart)
   - Users and sessions over 6 months

3. **Programs by Category** (Bar Chart)
   - Distribution across categories

4. **Programs Table**
   - CRUD operations UI
   - Edit and delete buttons
   - Status badges

5. **Recent Activity Feed**
   - User actions timeline

---

### 🧠 MentalHealthPage
**Location**: `src/pages/MentalHealthPage.jsx`

**Features**:
- Category filter buttons
- Resource cards with images
- Hover animations
- Play button overlay
- Duration and category badges
- Emergency support section

**Data**: Uses `mentalHealthResources` from dummy data

---

### 💪 FitnessPage
**Location**: `src/pages/FitnessPage.jsx`

**Features**:
- Difficulty level filters
- Category filters
- Program cards with images
- Instructor information
- Enrollment count
- Duration display
- Stats section (3 metrics)

**Data**: Uses `fitnessPrograms` from dummy data

---

### 🍎 NutritionPage
**Location**: `src/pages/NutritionPage.jsx`

**Features**:
- Diet type filters
- Nutrition plan cards
- Calorie and meal count
- Macro breakdown (Protein, Carbs, Fats)
- Progress bars for macros
- Benefits section (3 benefits)

**Data**: Uses `nutritionPlans` from dummy data

---

### 📝 BlogPage
**Location**: `src/pages/BlogPage.jsx`

**Features**:
- Search bar
- Category filters
- Featured post (large card)
- Blog grid (3 columns)
- Author and read time
- Newsletter subscription form

**Data**: Uses `blogPosts` from dummy data

---

### 📧 ContactPage
**Location**: `src/pages/ContactPage.jsx`

**Features**:
- Contact info cards (Email, Phone, Address)
- Contact form with validation
- Office hours display
- Quick support section
- Emergency support card
- FAQ section (4 questions)

**Form Fields**:
- Name, Email, Subject, Message

---

### 🚫 NotFoundPage
**Location**: `src/pages/NotFoundPage.jsx`

**Features**:
- Large animated 404 text
- Gradient text effect
- Navigation buttons
- Animated illustration
- Floating animation

---

## Context Providers

### 🎨 ThemeContext
**Location**: `src/context/ThemeContext.jsx`

**State**:
```javascript
{
  isDark: boolean,
  toggleTheme: () => void
}
```

**Features**:
- Persists theme to localStorage
- Detects system preference
- Applies 'dark' class to document
- Smooth transitions

**Usage**:
```jsx
import { useTheme } from './context/ThemeContext';

function Component() {
  const { isDark, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>Toggle</button>;
}
```

---

### 🔐 AuthContext
**Location**: `src/context/AuthContext.jsx`

**State**:
```javascript
{
  user: { name, email } | null,
  isAdmin: boolean,
  login: (userData, isAdmin) => void,
  logout: () => void
}
```

**Features**:
- Manages user authentication state
- Persists to localStorage
- Distinguishes between student and admin
- Provides login/logout functions

**Usage**:
```jsx
import { useAuth } from './context/AuthContext';

function Component() {
  const { user, isAdmin, login, logout } = useAuth();
  
  const handleLogin = () => {
    login({ name: 'John', email: 'john@example.com' }, false);
  };
  
  return user ? <p>Welcome {user.name}</p> : <button onClick={handleLogin}>Login</button>;
}
```

---

## Data Structure

### 📦 dummyData.js
**Location**: `src/data/dummyData.js`

### Mental Health Resources
```javascript
{
  id: number,
  title: string,
  description: string,
  category: string,
  duration: string,
  image: string,
  content: string
}
```

### Fitness Programs
```javascript
{
  id: number,
  title: string,
  instructor: string,
  level: string,
  duration: string,
  category: string,
  image: string,
  description: string,
  enrolled: number
}
```

### Nutrition Plans
```javascript
{
  id: number,
  title: string,
  calories: number,
  meals: number,
  type: string,
  image: string,
  description: string,
  protein: string,
  carbs: string,
  fats: string
}
```

### Blog Posts
```javascript
{
  id: number,
  title: string,
  author: string,
  date: string,
  category: string,
  image: string,
  excerpt: string,
  readTime: string
}
```

### Testimonials
```javascript
{
  id: number,
  name: string,
  role: string,
  image: string,
  text: string,
  rating: number
}
```

---

## Custom CSS Classes

### Utility Classes (src/index.css)

#### `.glass`
Glassmorphism effect with backdrop blur
```css
bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg border border-white/20
```

#### `.btn-primary`
Primary gradient button with hover effects
```css
px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg
```

#### `.btn-secondary`
Secondary glass button
```css
px-6 py-3 bg-white/10 backdrop-blur-lg border border-white/20
```

#### `.card`
Card component with shadow
```css
bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6
```

#### `.input-field`
Styled input field
```css
w-full px-4 py-3 bg-white/5 border border-gray-300 rounded-lg
```

#### `.gradient-text`
Gradient text effect
```css
bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent
```

---

## Animation Classes

### `.animate-float`
Floating animation (6s infinite)
```css
animation: float 6s ease-in-out infinite;
```

### `.animate-gradient`
Animated gradient background
```css
background-size: 200% 200%;
animation: gradient 3s ease infinite;
```

---

## Responsive Breakpoints

```javascript
sm: '640px'   // Mobile landscape
md: '768px'   // Tablet
lg: '1024px'  // Desktop
xl: '1280px'  // Large desktop
2xl: '1536px' // Extra large
```

---

## Icon Usage

All icons from **Lucide React**:

```jsx
import { Heart, Brain, Activity, Apple, User, Mail } from 'lucide-react';

<Heart className="w-6 h-6 text-red-500" />
```

Common icons used:
- Heart, Brain, Activity, Apple - Features
- User, Mail, Lock - Forms
- Menu, X - Navigation
- Sun, Moon - Theme toggle
- Calendar, Clock - Time
- TrendingUp, Award - Stats

---

## Chart Configuration

### Recharts Components Used

```jsx
import { 
  LineChart, Line,
  AreaChart, Area,
  BarChart, Bar,
  PieChart, Pie,
  XAxis, YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
```

### Example Usage
```jsx
<ResponsiveContainer width="100%" height={250}>
  <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="day" />
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey="value" stroke="#3b82f6" />
  </LineChart>
</ResponsiveContainer>
```

---

## Best Practices

### Component Structure
```jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Component = () => {
  // State
  const [state, setState] = useState(initialValue);
  
  // Effects
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  // Handlers
  const handleAction = () => {
    // Logic
  };
  
  // Render
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Content */}
    </motion.div>
  );
};

export default Component;
```

### Animation Pattern
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}
  whileHover={{ y: -10 }}
>
  {/* Content */}
</motion.div>
```

---

## Performance Tips

1. **Lazy Loading**: All pages are lazy-loaded
2. **Code Splitting**: Automatic with Vite
3. **Image Optimization**: Use WebP format
4. **Memoization**: Use React.memo for expensive components
5. **Virtual Scrolling**: For long lists (future enhancement)

---

**Happy Coding! 🚀**
