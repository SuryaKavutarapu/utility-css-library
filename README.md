# 🎨 Intelligent Theming System

[![npm version](https://badge.fury.io/js/utility-css-library.svg)](https://badge.fury.io/js/utility-css-library)
[![Downloads](https://img.shields.io/npm/dm/utility-css-library.svg)](https://www.npmjs.com/package/utility-css-library)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Release](https://img.shields.io/github/release/SuryaKavutarapu/utility-css-library.svg)](https://github.com/SuryaKavutarapu/utility-css-library/releases)

A modern, production-ready utility CSS library with intelligent theming, automatic contrast calculation, and seamless dark/light mode support.

## ✨ Features

### 🎯 **Intelligent Theming**
- **Automatic Contrast Calculation**: Colors automatically generate optimal text colors for maximum readability
- **Semantic Color System**: 7 carefully chosen semantic colors with intelligent foreground text
- **Smart Hover States**: Automatic color darkening for interactive elements
- **Opacity Variants**: Pre-generated opacity levels (10%, 20%, 30%, 50%, 70%) for each color

### 🌙 **Dark/Light Mode Support**
- **System Preference Detection**: Automatically respects user's OS theme preference
- **Runtime Theme Switching**: Toggle between modes with smooth transitions
- **Persistent Theme State**: Remembers user's theme preference across sessions
- **CSS Custom Properties**: All colors adapt automatically in both modes

### 🎨 **Color Palette**
- **Primary** (#6C5CE7) - Purple for primary actions
- **Doom** (#2B2B2B) - Dark gray for sophisticated elements
- **White** (#FFFFFF) - Pure white with smart borders
- **Critical** (#E62E5C) - Red for errors and warnings
- **Warning** (#E6E35C) - Yellow for attention (uses black text automatically)
- **Success** (#37B26C) - Green for positive actions
- **Interactive** (#0984E3) - Blue for links and interactive elements

### 🏗️ **TypeScript Architecture**
- **Type-Safe Design Tokens**: Complete TypeScript interfaces for all tokens
- **ThemeManager Class**: Runtime theme management with event subscriptions
- **TokenManager Class**: CSS custom property generation and management
- **Contrast Algorithms**: Scientific luminance and contrast ratio calculations

## 🚀 Quick Start

### Installation

```bash
npm install utility-css-library
```

**Or with Yarn:**

```bash
yarn add utility-css-library
```

### Basic Usage

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="node_modules/utility-css-library/dist/main.css">
</head>
<body>
    <!-- Semantic color buttons with automatic contrast -->
    <button class="btn btn-primary">Primary Action</button>
    <button class="btn btn-warning">Warning (Black Text)</button>
    <button class="btn btn-success">Success Action</button>
    
    <!-- Theme toggle -->
    <button onclick="toggleMode()">Toggle Dark/Light</button>
    
    <script src="node_modules/utility-css-library/dist/main.js"></script>
    <script>
        function toggleMode() {
            if (window.themeManager) {
                window.themeManager.toggleMode();
            }
        }
    </script>
</body>
</html>
```

### TypeScript Usage

```typescript
import { ThemeManager, TokenManager, DesignTokens } from 'utility-css-library';

// Initialize theme management
const themeManager = new ThemeManager();
const tokenManager = new TokenManager();

// Toggle theme programmatically
themeManager.toggleMode();

// Get current theme
const currentMode = themeManager.getCurrentMode(); // 'light' | 'dark'

// Subscribe to theme changes
themeManager.subscribe((mode) => {
    console.log(`Theme changed to: ${mode}`);
});

// Access design tokens
const primaryColor = DesignTokens.colors.primary.value; // #6C5CE7
const primaryForeground = DesignTokens.colors.primary.foreground; // #ffffff
```

## 🎨 Color System

### Semantic Colors with Automatic Contrast

Each color automatically calculates the optimal foreground text color:

```css
/* Yellow warning uses black text for readability */
.btn-warning {
    background-color: var(--color-warning, #E6E35C);
    color: var(--color-warning-foreground, #000000); /* Automatically black */
}

/* Dark colors use white text */
.btn-doom {
    background-color: var(--color-doom, #2B2B2B);
    color: var(--color-doom-foreground, #ffffff); /* Automatically white */
}
```

### Opacity Variants

```css
/* Available for all semantic colors */
.bg-primary-10 { background-color: var(--color-primary-10); } /* 10% opacity */
.bg-primary-20 { background-color: var(--color-primary-20); } /* 20% opacity */
.bg-primary-30 { background-color: var(--color-primary-30); } /* 30% opacity */
.bg-primary-50 { background-color: var(--color-primary-50); } /* 50% opacity */
.bg-primary-70 { background-color: var(--color-primary-70); } /* 70% opacity */
```

## 🌙 Dark Mode

### Automatic Theme Detection

```typescript
// Theme manager automatically detects system preference
const themeManager = new ThemeManager();
// Respects prefers-color-scheme: dark
```

### Manual Theme Control

```css
/* Light mode (default) */
:root {
    --color-background: #ffffff;
    --color-foreground: #09090b;
}

/* Dark mode */
:root.dark,
[data-mode="dark"] {
    --color-background: #09090b;
    --color-foreground: #fafafa;
}
```

## 🎯 Available Utility Classes

### Color Classes

```css
/* Background colors */
.bg-primary, .bg-doom, .bg-white, .bg-critical, .bg-warning, .bg-success, .bg-interactive

/* Text colors */
.text-primary, .text-doom, .text-white, .text-critical, .text-warning, .text-success, .text-interactive

/* Button styles */
.btn-primary, .btn-doom, .btn-white, .btn-critical, .btn-warning, .btn-success, .btn-interactive
```

### Typography

```css
/* Font sizes */
.text-xs, .text-sm, .text-base, .text-lg, .text-xl, .text-2xl, .text-3xl

/* Font weights */
.font-light, .font-normal, .font-medium, .font-semibold, .font-bold
```

### Layout & Spacing

```css
/* Spacing utilities */
.m-1, .m-2, .m-4, .p-1, .p-2, .p-4 /* etc. */

/* Flexbox */
.flex, .flex-col, .justify-center, .items-center /* etc. */

/* Grid */
.grid, .grid-cols-1, .grid-cols-2, .grid-cols-3 /* etc. */
```

## 🔧 Development

### Build the Project

```bash
npm run build        # Production build
npm run build:dev    # Development build
npm run dev          # Development server
npm run watch        # Watch mode
```

### Project Structure

```
src/
├── styles/           # SCSS utility classes
│   ├── abstracts/   # Variables and mixins
│   ├── base/        # Reset and base styles
│   └── utilities/   # Utility classes
├── tokens/          # Design token system
│   ├── design-tokens.ts    # Token definitions
│   ├── theme-manager.ts    # Theme management
│   └── token-manager.ts    # Token utilities
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## 📊 Performance

- **Bundle Size**: ~240KB (CSS + JS)
- **Dependencies**: Minimal, only build tools
- **Browser Support**: Modern browsers (ES2020+)
- **Theme Switch**: < 16ms transition time

## 🎨 Demo

Visit the [live demo](dist/index.html) to see all features in action:

- Interactive color demonstrations
- Real-time theme switching
- Typography system showcase
- Responsive design examples

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Tailwind CSS utility-first approach
- Color contrast algorithms based on WCAG guidelines
- Theme management patterns from modern design systems

---

Built with ❤️ for accessible, intelligent design systems.