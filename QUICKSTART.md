# 🚀 Quick Start Guide - WellNest

## Prerequisites
- Node.js (v18 or higher)
- npm or yarn

## Installation Steps

### 1. Navigate to Project Directory
```bash
cd wellnest-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

The application will open at `http://localhost:5173`

## 🎯 Quick Navigation

### Student Flow
1. Go to homepage: `http://localhost:5173`
2. Click "Get Started" or "Student Login"
3. Enter any email/password (frontend only)
4. Access Student Dashboard

### Admin Flow
1. Click "Admin" button in navbar
2. Enter any admin credentials
3. Access Admin Dashboard

## 📱 Test Accounts (Frontend Only)

**Student**
- Email: student@university.edu
- Password: any password

**Admin**
- Email: admin@wellnest.com
- Password: any password

## 🎨 Features to Explore

### Landing Page
- Animated hero section with GSAP
- 3D rotating sphere background
- Smooth scroll animations
- Statistics section
- Testimonials slider

### Student Dashboard
- Wellness score circle
- Weekly fitness chart
- Mood tracker
- Nutrition breakdown
- Upcoming sessions

### Admin Dashboard
- User analytics
- Monthly engagement chart
- Program management
- Activity logs

### Resource Pages
- Mental Health Resources
- Fitness Programs
- Nutrition Plans
- Blog Posts

## 🎨 Theme Toggle
Click the sun/moon icon in the navbar to switch between light and dark themes.

## 📦 Build for Production

```bash
npm run build
```

Output will be in the `dist` folder.

## 🔧 Customization

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#your-color',
  }
}
```

### Modify Dummy Data
Edit `src/data/dummyData.js` to change:
- Mental health resources
- Fitness programs
- Nutrition plans
- Blog posts
- Testimonials

### Add New Pages
1. Create component in `src/pages/`
2. Add route in `src/App.jsx`
3. Add navigation link in `src/components/common/Navbar.jsx`

## 🐛 Troubleshooting

### Port Already in Use
```bash
npm run dev -- --port 3000
```

### Dependencies Issues
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
npm run build -- --debug
```

## 📚 Key Files

- `src/App.jsx` - Main app with routing
- `src/context/ThemeContext.jsx` - Theme management
- `src/context/AuthContext.jsx` - Auth state
- `src/data/dummyData.js` - Mock data
- `tailwind.config.js` - Styling configuration

## 🌟 Next Steps

1. **Backend Integration**: Connect to real APIs
2. **Database**: Add user data persistence
3. **Authentication**: Implement JWT/OAuth
4. **Real-time**: Add WebSocket for live updates
5. **Mobile App**: Convert to React Native

## 📧 Need Help?

- Check README.md for detailed documentation
- Review component comments
- Check browser console for errors

---

Happy Coding! 🎉
