# Documentation Site

This directory contains the documentation website for the Utility CSS Library, built to showcase all features and capabilities similar to Tailwind CSS's documentation site.

## Features

### 🎨 **Modern Design**
- Clean, professional interface inspired by modern documentation sites
- Responsive design that works on all devices
- Smooth animations and micro-interactions
- Dark/light mode support with system preference detection

### 🚀 **Interactive Demos**
- Live color system demonstrations
- Real-time theme switching
- Interactive component examples
- Code examples with syntax highlighting

### 📱 **PWA Support**
- Service Worker for offline functionality
- Web App Manifest for installability
- Fast loading and caching strategies

### ⌨️ **Developer Experience**
- Copy-to-clipboard functionality for code examples
- Keyboard shortcuts (Ctrl+Shift+T for theme toggle)
- Smooth navigation with section highlighting
- Toast notifications for user feedback

## Files Structure

```
docs/
├── index.html           # Main documentation page
├── styles/
│   └── docs.css        # Documentation-specific styles
├── scripts/
│   └── docs.js         # Interactive functionality
├── manifest.json       # PWA manifest
├── sw.js              # Service Worker
└── README.md          # This file
```

## Local Development

To run the documentation site locally:

1. **Build the library first:**
   ```bash
   npm run build
   ```

2. **Serve the docs directory:**
   ```bash
   # Using Python
   cd docs && python -m http.server 8000
   
   # Using Node.js http-server
   npx http-server docs -p 8000
   
   # Using Live Server (VS Code extension)
   # Right-click on docs/index.html and select "Open with Live Server"
   ```

3. **Open in browser:**
   ```
   http://localhost:8000
   ```

## GitHub Pages Deployment

The documentation is automatically deployed to GitHub Pages using GitHub Actions:

- **Workflow**: `.github/workflows/deploy-docs.yml`
- **Trigger**: Push to main branch
- **URL**: `https://suryakavutarapu.github.io/utility-css-library`

## Features Showcased

### 🎯 **Intelligent Theming**
- Automatic contrast calculation examples
- Live theme switching demonstration
- Color palette with opacity variants

### 🌙 **Dark/Light Mode**
- System preference detection
- Smooth theme transitions
- Persistent theme state

### 🎨 **Material Design Icons**
- Icon showcase with live examples
- TypeScript integration examples
- Icon registry demonstrations

### 🏗️ **TypeScript Support**
- Code examples with syntax highlighting
- API documentation
- Type-safe usage examples

### ⚡ **Utility Classes**
- Interactive component gallery
- Real-world usage examples
- Copy-paste code snippets

## Customization

### Colors
The documentation site uses the same color system as the library:
- Primary: `#6C5CE7`
- Success: `#37B26C`
- Warning: `#E6E35C`
- Critical: `#E62E5C`
- Interactive: `#0984E3`

### Typography
- Font: Inter (loaded from Google Fonts)
- Responsive typography scales
- Optimized for readability

### Animations
- Smooth scroll navigation
- Fade-in animations on scroll
- Hover effects and micro-interactions
- Loading states and transitions

## Performance

### Optimization Features
- Efficient CSS and JavaScript bundling
- Image optimization with SVG icons
- Service Worker caching
- Minimal external dependencies

### Metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader optimization
- High contrast mode support
- Reduced motion preferences

## Contributing

To contribute to the documentation:

1. Edit the appropriate files in the `docs/` directory
2. Test locally using the development setup above
3. Submit a pull request with your changes

The documentation will be automatically deployed when changes are merged to main.

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with custom properties
- **JavaScript ES6+**: Interactive functionality
- **Prism.js**: Syntax highlighting
- **Service Worker**: PWA functionality
- **GitHub Actions**: Automated deployment
