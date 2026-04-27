# 🔧 Setup & Troubleshooting Guide

## ✅ Verification Checklist

### 1. Check Node.js Version
```bash
node --version
```
Should be v18 or higher.

### 2. Verify Installation
```bash
cd wellnest-app
npm install
```

### 3. Check Dependencies
All these should be installed:
- ✅ react
- ✅ react-dom
- ✅ react-router-dom
- ✅ framer-motion
- ✅ gsap
- ✅ @react-three/fiber
- ✅ @react-three/drei
- ✅ three
- ✅ recharts
- ✅ lucide-react
- ✅ @tailwindcss/postcss
- ✅ tailwindcss
- ✅ autoprefixer

### 4. Start Development Server
```bash
npm run dev
```

## 🐛 Common Issues & Solutions

### Issue 1: Tailwind CSS PostCSS Error
**Error**: `It looks like you're trying to use 'tailwindcss' directly as a PostCSS plugin`

**Solution**:
```bash
npm install @tailwindcss/postcss
```

Then verify `postcss.config.js` contains:
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

### Issue 2: Tailwind IntelliSense Not Working

**Solution**:
1. Install "Tailwind CSS IntelliSense" extension in VS Code
2. Reload VS Code window (Ctrl+Shift+P → "Reload Window")
3. Check `.vscode/settings.json` exists with proper configuration

### Issue 3: Module Not Found Errors

**Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue 4: Port Already in Use

**Solution**:
```bash
# Use different port
npm run dev -- --port 3000
```

### Issue 5: Dark Mode Not Working

**Solution**:
- Check browser console for errors
- Verify `ThemeContext.jsx` is properly imported
- Clear browser localStorage: `localStorage.clear()`

### Issue 6: 3D Background Not Rendering

**Solution**:
- Check if WebGL is supported in your browser
- Update graphics drivers
- Try different browser (Chrome/Firefox recommended)

### Issue 7: Charts Not Displaying

**Solution**:
- Verify `recharts` is installed: `npm list recharts`
- Check browser console for errors
- Ensure parent container has defined height

## 🎨 Tailwind CSS v4 Configuration

### Current Setup (Correct)

**postcss.config.js**:
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

**src/index.css**:
```css
@import "tailwindcss";

/* Your custom styles */
```

**tailwind.config.js**:
```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      // Your customizations
    },
  },
};
```

## 🚀 Performance Optimization

### 1. Build Size
```bash
npm run build
npm run preview
```

### 2. Lazy Loading
All pages are already lazy-loaded using React.lazy()

### 3. Image Optimization
- Use WebP format for images
- Implement lazy loading for images
- Use CDN for external images

## 🔍 Debugging Tips

### Enable Verbose Logging
```bash
npm run dev -- --debug
```

### Check Build Output
```bash
npm run build -- --debug
```

### Browser DevTools
1. Open DevTools (F12)
2. Check Console for errors
3. Check Network tab for failed requests
4. Check Application tab for localStorage/theme

## 📦 Production Build

### Build Command
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Vercel
```bash
npm i -g vercel
vercel
```

### Deploy to Netlify
1. Build: `npm run build`
2. Upload `dist` folder to Netlify

## 🔐 Environment Variables

Create `.env` file (if needed for future backend):
```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=WellNest
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## 📱 Browser Compatibility

### Supported Browsers
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Not Supported
- ❌ Internet Explorer (any version)
- ❌ Opera Mini

## 🆘 Still Having Issues?

1. **Check the logs**: Look at terminal output for specific errors
2. **Clear everything**:
   ```bash
   rm -rf node_modules package-lock.json dist
   npm install
   npm run dev
   ```
3. **Update dependencies**:
   ```bash
   npm update
   ```
4. **Check GitHub Issues**: Search for similar problems
5. **Create an issue**: Provide error logs and system info

## 📊 System Requirements

- **OS**: Windows 10+, macOS 10.15+, Linux (Ubuntu 20.04+)
- **RAM**: 4GB minimum, 8GB recommended
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Disk Space**: 500MB for node_modules

## ✨ VS Code Extensions (Recommended)

1. **Tailwind CSS IntelliSense** (Required)
2. ES7+ React/Redux/React-Native snippets
3. Prettier - Code formatter
4. ESLint
5. Auto Rename Tag
6. Path Intellisense

## 🎯 Quick Commands Reference

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Clear cache
npm cache clean --force

# Update all packages
npm update

# Check outdated packages
npm outdated
```

---

**Need more help?** Check the main README.md or QUICKSTART.md files.
