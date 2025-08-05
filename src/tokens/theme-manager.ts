/**
 * Theme Manager
 * Handles theme switching, CSS custom properties generation, and mode management
 */

import { DesignTokens, themes, getThemeTokens } from './design-tokens';

export class ThemeManager {
  private currentTheme: string = 'ocean';
  private currentMode: 'light' | 'dark' = 'light';
  private rootElement: HTMLElement;

  constructor() {
    this.rootElement = document.documentElement;
    this.init();
  }

  private init() {
    // Check for saved theme preference or default to 'ocean'
    const savedTheme = localStorage.getItem('preferred-theme') || 'ocean';
    const savedMode = (localStorage.getItem('preferred-mode') as 'light' | 'dark') || 'light';
    
    // Check for system preference if no saved mode
    if (!localStorage.getItem('preferred-mode')) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.currentMode = prefersDark ? 'dark' : 'light';
    } else {
      this.currentMode = savedMode;
    }

    this.currentTheme = savedTheme;
    this.applyTheme();

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('preferred-mode')) {
        this.currentMode = e.matches ? 'dark' : 'light';
        this.applyTheme();
      }
    });
  }

  /**
   * Set the current theme
   */
  setTheme(themeId: string) {
    if (!themes[themeId]) {
      console.warn(`Theme "${themeId}" not found`);
      return;
    }

    this.currentTheme = themeId;
    localStorage.setItem('preferred-theme', themeId);
    this.applyTheme();
  }

  /**
   * Set the current mode (light/dark)
   */
  setMode(mode: 'light' | 'dark') {
    this.currentMode = mode;
    localStorage.setItem('preferred-mode', mode);
    this.applyTheme();
  }

  /**
   * Toggle between light and dark modes
   */
  toggleMode() {
    this.setMode(this.currentMode === 'light' ? 'dark' : 'light');
  }

  /**
   * Get current theme ID
   */
  getCurrentTheme(): string {
    return this.currentTheme;
  }

  /**
   * Get current mode
   */
  getCurrentMode(): 'light' | 'dark' {
    return this.currentMode;
  }

  /**
   * Get current theme tokens
   */
  getCurrentTokens(): DesignTokens {
    return getThemeTokens(this.currentTheme, this.currentMode);
  }

  /**
   * Apply the current theme to the document
   */
  private applyTheme() {
    const tokens = this.getCurrentTokens();
    
    // Remove all theme classes
    this.rootElement.classList.remove('light', 'dark');
    Object.keys(themes).forEach(themeId => {
      this.rootElement.classList.remove(`theme-${themeId}`);
    });

    // Add current theme classes
    this.rootElement.classList.add(this.currentMode);
    this.rootElement.classList.add(`theme-${this.currentTheme}`);

    // Apply CSS custom properties
    this.setCSSCustomProperties(tokens);

    // Dispatch theme change event
    window.dispatchEvent(new CustomEvent('themechange', {
      detail: {
        theme: this.currentTheme,
        mode: this.currentMode,
        tokens
      }
    }));
  }

  /**
   * Convert design tokens to CSS custom properties
   */
  private setCSSCustomProperties(tokens: DesignTokens) {
    const root = this.rootElement.style;

    // Colors
    Object.entries(tokens.colors.primary).forEach(([key, value]) => {
      root.setProperty(`--color-primary-${key}`, value);
    });

    Object.entries(tokens.colors.secondary).forEach(([key, value]) => {
      root.setProperty(`--color-secondary-${key}`, value);
    });

    Object.entries(tokens.colors.accent).forEach(([key, value]) => {
      root.setProperty(`--color-accent-${key}`, value);
    });

    Object.entries(tokens.colors.success).forEach(([key, value]) => {
      root.setProperty(`--color-success-${key}`, value);
    });

    Object.entries(tokens.colors.warning).forEach(([key, value]) => {
      root.setProperty(`--color-warning-${key}`, value);
    });

    Object.entries(tokens.colors.error).forEach(([key, value]) => {
      root.setProperty(`--color-error-${key}`, value);
    });

    Object.entries(tokens.colors.info).forEach(([key, value]) => {
      root.setProperty(`--color-info-${key}`, value);
    });

    Object.entries(tokens.colors.neutral).forEach(([key, value]) => {
      root.setProperty(`--color-neutral-${key}`, value);
    });

    // Surface colors
    Object.entries(tokens.colors.surface).forEach(([key, value]) => {
      root.setProperty(`--color-surface-${key}`, value);
    });

    // Text colors
    Object.entries(tokens.colors.text).forEach(([key, value]) => {
      root.setProperty(`--color-text-${key}`, value);
    });

    // Semantic colors
    Object.entries(tokens.colors.semantic).forEach(([key, value]) => {
      root.setProperty(`--color-semantic-${key}`, value);
    });

    // Spacing
    Object.entries(tokens.spacing).forEach(([key, value]) => {
      root.setProperty(`--spacing-${key}`, value);
    });

    // Typography
    root.setProperty('--font-family-sans', tokens.typography.fontFamily.sans.join(', '));
    root.setProperty('--font-family-serif', tokens.typography.fontFamily.serif.join(', '));
    root.setProperty('--font-family-mono', tokens.typography.fontFamily.mono.join(', '));

    Object.entries(tokens.typography.fontSize).forEach(([key, value]) => {
      root.setProperty(`--font-size-${key}`, value);
    });

    Object.entries(tokens.typography.fontWeight).forEach(([key, value]) => {
      root.setProperty(`--font-weight-${key}`, value.toString());
    });

    Object.entries(tokens.typography.lineHeight).forEach(([key, value]) => {
      root.setProperty(`--line-height-${key}`, value);
    });

    Object.entries(tokens.typography.letterSpacing).forEach(([key, value]) => {
      root.setProperty(`--letter-spacing-${key}`, value);
    });

    // Shadows
    Object.entries(tokens.shadows).forEach(([key, value]) => {
      root.setProperty(`--shadow-${key}`, value);
    });

    // Borders
    Object.entries(tokens.borders.width).forEach(([key, value]) => {
      root.setProperty(`--border-width-${key}`, value);
    });

    Object.entries(tokens.borders.radius).forEach(([key, value]) => {
      root.setProperty(`--border-radius-${key}`, value);
    });

    // Transitions
    Object.entries(tokens.transitions.duration).forEach(([key, value]) => {
      root.setProperty(`--transition-duration-${key}`, value);
    });

    Object.entries(tokens.transitions.timing).forEach(([key, value]) => {
      root.setProperty(`--transition-timing-${key}`, value);
    });

    // Z-index
    Object.entries(tokens.zIndex).forEach(([key, value]) => {
      root.setProperty(`--z-index-${key}`, value.toString());
    });
  }

  /**
   * Get available themes
   */
  getAvailableThemes() {
    return Object.values(themes);
  }

  /**
   * Generate CSS for contrast checking
   */
  generateContrastCSS(): string {
    const tokens = this.getCurrentTokens();
    
    return `
      /* High contrast button styles */
      .btn-high-contrast {
        background-color: var(--color-surface-foreground);
        color: var(--color-surface-background);
        border: 2px solid var(--color-surface-foreground);
      }
      
      .btn-high-contrast:hover {
        background-color: var(--color-surface-background);
        color: var(--color-surface-foreground);
        border-color: var(--color-surface-foreground);
      }
      
      /* Focus indicators with high contrast */
      .focus-high-contrast:focus {
        outline: 3px solid var(--color-semantic-ring);
        outline-offset: 2px;
      }
      
      /* Link styles with proper contrast */
      .link-high-contrast {
        color: var(--color-text-link);
        text-decoration: underline;
        text-decoration-thickness: 2px;
        text-underline-offset: 2px;
      }
      
      .link-high-contrast:hover {
        color: var(--color-text-linkHover);
        text-decoration-thickness: 3px;
      }
    `;
  }
}

// Create global theme manager instance
export const themeManager = new ThemeManager();

// Export for global access
if (typeof window !== 'undefined') {
  (window as any).themeManager = themeManager;
}
