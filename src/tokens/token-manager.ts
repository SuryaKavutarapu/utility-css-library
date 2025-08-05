/**
 * Token Manager - Simplified token access and CSS generation
 * Works with the new semantic color system
 */

import { DesignTokens, ThemeMode, getThemeTokens } from './design-tokens';
import { themeManager } from './theme-manager';

export class TokenManager {
  private tokens: DesignTokens;
  private observers: Set<(tokens: DesignTokens) => void> = new Set();

  constructor() {
    this.tokens = getThemeTokens('default', 'light');
    this.setupThemeListener();
  }

  /**
   * Setup theme change listener
   */
  private setupThemeListener(): void {
    themeManager.subscribe((theme: string, mode: ThemeMode, tokens: DesignTokens) => {
      this.tokens = tokens;
      this.notifyObservers();
    });
  }

  /**
   * Get current tokens
   */
  getTokens(): DesignTokens {
    return { ...this.tokens };
  }

  /**
   * Get a specific color token with dot notation
   * Example: getColor('primary.DEFAULT') or getColor('primary.foreground')
   */
  getColor(path: string): string | undefined {
    const keys = path.split('.');
    let current: any = this.tokens.colors;
    
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return undefined;
      }
    }
    
    return typeof current === 'string' ? current : undefined;
  }

  /**
   * Get semantic colors with intelligent contrast
   */
  getSemanticColor(
    colorName: 'primary' | 'doom' | 'white' | 'critical' | 'warning' | 'success' | 'interactive',
    variant: 'DEFAULT' | 'foreground' | 'hover' | 'pressed' | 'focus' | 'subtle' | 'muted' | 'emphasis' | '10' | '20' | '30' | '50' | '70' = 'DEFAULT'
  ): string {
    return this.tokens.colors[colorName][variant];
  }

  /**
   * Get spacing value
   */
  getSpacing(key: keyof typeof this.tokens.spacing): string {
    return this.tokens.spacing[key];
  }

  /**
   * Get typography value
   */
  getTypography(category: 'fontFamily' | 'fontSize' | 'fontWeight' | 'lineHeight' | 'letterSpacing', key: string): any {
    const categoryObj = this.tokens.typography[category];
    if (categoryObj && typeof categoryObj === 'object') {
      return (categoryObj as any)[key];
    }
    return undefined;
  }

  /**
   * Get shadow value
   */
  getShadow(key: keyof typeof this.tokens.shadows): string {
    return this.tokens.shadows[key];
  }

  /**
   * Get border radius value
   */
  getBorderRadius(key: keyof typeof this.tokens.borders.radius): string {
    return this.tokens.borders.radius[key];
  }

  /**
   * Get border width value
   */
  getBorderWidth(key: keyof typeof this.tokens.borders.width): string {
    return this.tokens.borders.width[key];
  }

  /**
   * Get transition duration
   */
  getTransitionDuration(key: keyof typeof this.tokens.transitions.duration): string {
    return this.tokens.transitions.duration[key];
  }

  /**
   * Get transition timing function
   */
  getTransitionTiming(key: keyof typeof this.tokens.transitions.timing): string {
    return this.tokens.transitions.timing[key];
  }

  /**
   * Get breakpoint value
   */
  getBreakpoint(key: keyof typeof this.tokens.breakpoints): string {
    return this.tokens.breakpoints[key];
  }

  /**
   * Get z-index value
   */
  getZIndex(key: keyof typeof this.tokens.zIndex): string | number {
    return this.tokens.zIndex[key];
  }

  /**
   * Generate CSS custom properties for all tokens
   */
  generateCSSCustomProperties(): Map<string, string> {
    const cssVars = new Map<string, string>();
    
    // Semantic colors with automatic contrast
    const semanticColors = ['primary', 'doom', 'white', 'critical', 'warning', 'success', 'interactive'] as const;
    const colorVariants = ['DEFAULT', 'foreground', 'hover', 'pressed', 'focus', 'subtle', 'muted', 'emphasis', '10', '20', '30', '50', '70'] as const;
    
    semanticColors.forEach(colorName => {
      colorVariants.forEach(variant => {
        const value = this.tokens.colors[colorName][variant];
        if (value) {
          const varName = variant === 'DEFAULT' 
            ? `--color-${colorName}` 
            : `--color-${colorName}-${variant}`;
          cssVars.set(varName, value);
        }
      });
    });

    // Mode-specific colors
    const currentMode = themeManager.getCurrentMode();
    const modeColors = currentMode === 'dark' ? this.tokens.colors.dark : this.tokens.colors.light;
    
    cssVars.set('--color-background', modeColors.background);
    cssVars.set('--color-foreground', modeColors.foreground);
    
    // Surface colors
    Object.entries(modeColors.surface).forEach(([key, value]) => {
      cssVars.set(`--color-surface-${key}`, value);
    });
    
    // Text colors
    Object.entries(modeColors.text).forEach(([key, value]) => {
      cssVars.set(`--color-text-${key}`, value);
    });
    
    // Border colors
    Object.entries(modeColors.border).forEach(([key, value]) => {
      cssVars.set(`--color-border-${key}`, value);
    });

    // Typography
    cssVars.set('--font-family-sans', this.tokens.typography.fontFamily.sans.join(', '));
    cssVars.set('--font-family-serif', this.tokens.typography.fontFamily.serif.join(', '));
    cssVars.set('--font-family-mono', this.tokens.typography.fontFamily.mono.join(', '));
    
    Object.entries(this.tokens.typography.fontSize).forEach(([key, value]) => {
      cssVars.set(`--font-size-${key}`, value);
    });
    
    Object.entries(this.tokens.typography.fontWeight).forEach(([key, value]) => {
      cssVars.set(`--font-weight-${key}`, value.toString());
    });
    
    Object.entries(this.tokens.typography.lineHeight).forEach(([key, value]) => {
      cssVars.set(`--line-height-${key}`, value.toString());
    });

    // Spacing
    Object.entries(this.tokens.spacing).forEach(([key, value]) => {
      cssVars.set(`--spacing-${key.replace('.', '-')}`, value);
    });

    // Borders
    Object.entries(this.tokens.borders.radius).forEach(([key, value]) => {
      cssVars.set(`--border-radius-${key}`, value);
    });
    
    Object.entries(this.tokens.borders.width).forEach(([key, value]) => {
      cssVars.set(`--border-width-${key}`, value);
    });

    // Shadows
    Object.entries(this.tokens.shadows).forEach(([key, value]) => {
      cssVars.set(`--shadow-${key}`, value);
    });

    // Transitions
    Object.entries(this.tokens.transitions.duration).forEach(([key, value]) => {
      cssVars.set(`--transition-duration-${key}`, value);
    });
    
    Object.entries(this.tokens.transitions.timing).forEach(([key, value]) => {
      cssVars.set(`--transition-timing-${key}`, value);
    });

    // Breakpoints
    Object.entries(this.tokens.breakpoints).forEach(([key, value]) => {
      cssVars.set(`--breakpoint-${key}`, value);
    });

    return cssVars;
  }

  /**
   * Generate CSS string from custom properties
   */
  generateCSSString(): string {
    const cssVars = this.generateCSSCustomProperties();
    const varsString = Array.from(cssVars.entries())
      .map(([prop, value]) => `  ${prop}: ${value};`)
      .join('\n');
    
    return `:root {\n${varsString}\n}`;
  }

  /**
   * Apply CSS custom properties to the document
   */
  applyCSSCustomProperties(): void {
    const cssVars = this.generateCSSCustomProperties();
    const root = document.documentElement;
    
    cssVars.forEach((value, property) => {
      root.style.setProperty(property, value);
    });
  }

  /**
   * Get CSS media query for breakpoint
   */
  getBreakpointMediaQuery(breakpoint: keyof typeof this.tokens.breakpoints, direction: 'min' | 'max' = 'min'): string {
    const value = this.tokens.breakpoints[breakpoint];
    return `@media (${direction}-width: ${value})`;
  }

  /**
   * Check if current mode is dark
   */
  isDarkMode(): boolean {
    return themeManager.getCurrentMode() === 'dark';
  }

  /**
   * Subscribe to token changes
   */
  subscribe(callback: (tokens: DesignTokens) => void): () => void {
    this.observers.add(callback);
    
    return () => {
      this.observers.delete(callback);
    };
  }

  /**
   * Notify observers of token changes
   */
  private notifyObservers(): void {
    this.observers.forEach(callback => {
      callback(this.tokens);
    });
  }

  /**
   * Create utility class definitions
   */
  generateUtilityClasses(): Record<string, Record<string, Record<string, string>>> {
    const utilities: Record<string, Record<string, Record<string, string>>> = {};

    // Color utilities
    utilities.colors = {};
    
    // Semantic color utilities
    const semanticColors = ['primary', 'doom', 'white', 'critical', 'warning', 'success', 'interactive'] as const;
    semanticColors.forEach(colorName => {
      utilities.colors[`bg-${colorName}`] = {
        'background-color': `var(--color-${colorName})`,
        'color': `var(--color-${colorName}-foreground)`
      };
      
      utilities.colors[`text-${colorName}`] = {
        'color': `var(--color-${colorName})`
      };
      
      utilities.colors[`border-${colorName}`] = {
        'border-color': `var(--color-${colorName})`
      };
      
      // Hover states
      utilities.colors[`hover\\:bg-${colorName}:hover`] = {
        'background-color': `var(--color-${colorName}-hover)`,
        'color': `var(--color-${colorName}-foreground)`
      };
    });

    // Spacing utilities
    utilities.spacing = {};
    Object.keys(this.tokens.spacing).forEach(key => {
      const className = key.replace('.', '-');
      utilities.spacing[`p-${className}`] = { 'padding': `var(--spacing-${className})` };
      utilities.spacing[`m-${className}`] = { 'margin': `var(--spacing-${className})` };
      utilities.spacing[`px-${className}`] = { 
        'padding-left': `var(--spacing-${className})`,
        'padding-right': `var(--spacing-${className})`
      };
      utilities.spacing[`py-${className}`] = { 
        'padding-top': `var(--spacing-${className})`,
        'padding-bottom': `var(--spacing-${className})`
      };
      utilities.spacing[`mx-${className}`] = { 
        'margin-left': `var(--spacing-${className})`,
        'margin-right': `var(--spacing-${className})`
      };
      utilities.spacing[`my-${className}`] = { 
        'margin-top': `var(--spacing-${className})`,
        'margin-bottom': `var(--spacing-${className})`
      };
    });

    // Typography utilities
    utilities.typography = {};
    Object.keys(this.tokens.typography.fontSize).forEach(key => {
      utilities.typography[`text-${key}`] = {
        'font-size': `var(--font-size-${key})`
      };
    });

    Object.keys(this.tokens.typography.fontWeight).forEach(key => {
      utilities.typography[`font-${key}`] = {
        'font-weight': `var(--font-weight-${key})`
      };
    });

    // Border utilities
    utilities.borders = {};
    Object.keys(this.tokens.borders.radius).forEach(key => {
      utilities.borders[`rounded-${key}`] = {
        'border-radius': `var(--border-radius-${key})`
      };
    });

    // Shadow utilities
    utilities.shadows = {};
    Object.keys(this.tokens.shadows).forEach(key => {
      if (key !== 'none') {
        utilities.shadows[`shadow-${key}`] = {
          'box-shadow': `var(--shadow-${key})`
        };
      }
    });
    utilities.shadows['shadow-none'] = { 'box-shadow': 'none' };

    return utilities;
  }
}

// Create global token manager instance
export const tokenManager = new TokenManager();

// Export for global access
if (typeof window !== 'undefined') {
  (window as any).tokenManager = tokenManager;
}
