/**
 * Token Manager - Runtime configuration and theme management
 * Enhanced with multi-theme support and contrast validation
 */

import { DesignTokens, defaultTokens, themes, getThemeTokens } from './design-tokens';
import { themeManager } from './theme-manager';

export class TokenManager {
  private tokens: DesignTokens;
  private customProperties: Map<string, string> = new Map();
  private observers: Set<(tokens: DesignTokens) => void> = new Set();
  private currentTheme: string = 'ocean';
  private currentMode: 'light' | 'dark' = 'light';

  constructor(initialTokens: Partial<DesignTokens> = {}) {
    this.tokens = this.mergeTokens(defaultTokens, initialTokens);
    this.generateCSSCustomProperties();
    this.setupThemeListener();
  }

  /**
   * Setup theme change listener
   */
  private setupThemeListener(): void {
    window.addEventListener('themechange', (event: any) => {
      this.currentTheme = event.detail.theme;
      this.currentMode = event.detail.mode;
      this.tokens = event.detail.tokens;
      this.generateCSSCustomProperties();
      this.applyCSSCustomProperties();
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
   * Update tokens partially or completely
   */
  updateTokens(newTokens: Partial<DesignTokens>): void {
    this.tokens = this.mergeTokens(this.tokens, newTokens);
    this.generateCSSCustomProperties();
    this.applyCSSCustomProperties();
    this.notifyObservers();
  }

  /**
   * Switch to a specific theme
   */
  setTheme(themeId: string, mode?: 'light' | 'dark'): void {
    if (mode) {
      themeManager.setMode(mode);
    }
    themeManager.setTheme(themeId);
  }

  /**
   * Get current theme information
   */
  getCurrentTheme(): { id: string; mode: 'light' | 'dark'; name: string } {
    const theme = themes[this.currentTheme];
    return {
      id: this.currentTheme,
      mode: this.currentMode,
      name: theme?.name || 'Unknown'
    };
  }

  /**
   * Get all available themes
   */
  getAvailableThemes() {
    return Object.values(themes);
  }

  /**
   * Set a specific token value
   */
  setToken(path: string, value: any): void {
    this.setNestedProperty(this.tokens, path, value);
    this.generateCSSCustomProperties();
    this.applyCSSCustomProperties();
    this.notifyObservers();
  }

  /**
   * Get a specific token value
   */
  getToken(path: string): any {
    return this.getNestedProperty(this.tokens, path);
  }

  /**
   * Validate color contrast ratio
   */
  validateContrast(foreground: string, background: string): { ratio: number; isAccessible: boolean; level: string } {
    const ratio = this.calculateContrastRatio(foreground, background);
    const isAALevel = ratio >= 4.5;
    const isAAALevel = ratio >= 7.0;
    const isLargeTextAA = ratio >= 3.0;
    
    let level = 'Fail';
    if (isAAALevel) level = 'AAA';
    else if (isAALevel) level = 'AA';
    else if (isLargeTextAA) level = 'AA Large';
    
    return {
      ratio: Math.round(ratio * 100) / 100,
      isAccessible: isAALevel,
      level
    };
  }

  /**
   * Calculate contrast ratio between two colors
   */
  private calculateContrastRatio(color1: string, color2: string): number {
    const l1 = this.getLuminance(color1);
    const l2 = this.getLuminance(color2);
    const brightest = Math.max(l1, l2);
    const darkest = Math.min(l1, l2);
    return (brightest + 0.05) / (darkest + 0.05);
  }

  /**
   * Get relative luminance of a color
   */
  private getLuminance(color: string): number {
    const rgb = this.hexToRgb(color);
    if (!rgb) return 0;
    
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  /**
   * Convert hex color to RGB
   */
  private hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  /**
   * Get high contrast color combinations
   */
  getHighContrastPairs(): Array<{ foreground: string; background: string; ratio: number }> {
    const colors = this.tokens.colors;
    const pairs: Array<{ foreground: string; background: string; ratio: number }> = [];
    
    // Test primary combinations
    const primaryBg = colors.primary[500];
    const textColors = [colors.text.primary, colors.text.inverse, colors.surface.background, colors.surface.foreground];
    
    textColors.forEach(textColor => {
      const contrast = this.validateContrast(textColor, primaryBg);
      if (contrast.isAccessible) {
        pairs.push({
          foreground: textColor,
          background: primaryBg,
          ratio: contrast.ratio
        });
      }
    });
    
    return pairs.sort((a, b) => b.ratio - a.ratio);
  }

  /**
   * Get CSS custom property name for a token path
   */
  getCSSCustomProperty(path: string): string {
    const cssVarName = `--cds-${path.replace(/\./g, '-')}`;
    return this.customProperties.get(cssVarName) || '';
  }

  /**
   * Generate theme variants (light/dark)
   */
  generateThemeVariant(variant: 'light' | 'dark'): DesignTokens {
    const baseTokens = { ...this.tokens };

    if (variant === 'dark') {
      // Invert surface colors for dark theme
      baseTokens.colors.surface = {
        background: '#09090b',
        foreground: '#fafafa',
        card: '#18181b',
        popover: '#27272a',
        modal: '#18181b',
        hover: '#27272a',
        pressed: '#3f3f46',
        focus: '#0ea5e9',
        border: '#27272a',
        divider: '#3f3f46',
      };

      // Invert text colors for dark theme
      baseTokens.colors.text = {
        primary: '#fafafa',
        secondary: '#a1a1aa',
        tertiary: '#71717a',
        inverse: '#09090b',
        disabled: '#52525b',
        placeholder: '#71717a',
        link: '#38bdf8',
        linkHover: '#7dd3fc',
      };
    }

    return baseTokens;
  }

  /**
   * Apply theme variant
   */
  applyTheme(variant: 'light' | 'dark'): void {
    const themeTokens = this.generateThemeVariant(variant);
    this.updateTokens(themeTokens);
    document.documentElement.setAttribute('data-theme', variant);
  }

  /**
   * Subscribe to token changes
   */
  subscribe(observer: (tokens: DesignTokens) => void): () => void {
    this.observers.add(observer);
    return () => this.observers.delete(observer);
  }

  /**
   * Export tokens as CSS custom properties
   */
  toCSSCustomProperties(): string {
    let css = ':root {\n';
    for (const [property, value] of this.customProperties) {
      css += `  ${property}: ${value};\n`;
    }
    css += '}\n';

    // Add dark theme
    css += '[data-theme="dark"] {\n';
    const darkTokens = this.generateThemeVariant('dark');
    const darkProperties = this.flattenTokens(darkTokens);
    for (const [key, value] of Object.entries(darkProperties)) {
      const cssVar = `--cds-${key.replace(/\./g, '-')}`;
      css += `  ${cssVar}: ${value};\n`;
    }
    css += '}\n';

    return css;
  }

  /**
   * Export tokens as SCSS variables
   */
  toSCSSVariables(): string {
    let scss = '// Design Tokens as SCSS Variables\n\n';
    const flatTokens = this.flattenTokens(this.tokens);

    for (const [key, value] of Object.entries(flatTokens)) {
      const scssVar = `$${key.replace(/\./g, '-')}`;
      scss += `${scssVar}: ${value};\n`;
    }

    return scss;
  }

  /**
   * Private: Merge tokens deeply
   */
  private mergeTokens(base: DesignTokens, override: Partial<DesignTokens>): DesignTokens {
    const merged = { ...base };

    for (const [key, value] of Object.entries(override)) {
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        (merged as any)[key] = { ...(merged as any)[key], ...value };
      } else {
        (merged as any)[key] = value;
      }
    }

    return merged;
  }

  /**
   * Private: Generate CSS custom properties from tokens
   */
  private generateCSSCustomProperties(): void {
    this.customProperties.clear();
    const flatTokens = this.flattenTokens(this.tokens);

    for (const [key, value] of Object.entries(flatTokens)) {
      const cssVar = `--cds-${key.replace(/\./g, '-')}`;
      this.customProperties.set(cssVar, String(value));
    }
  }

  /**
   * Private: Apply CSS custom properties to document
   */
  private applyCSSCustomProperties(): void {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    for (const [property, value] of this.customProperties) {
      root.style.setProperty(property, value);
    }
  }

  /**
   * Private: Flatten nested tokens object
   */
  private flattenTokens(tokens: any, prefix = ''): Record<string, any> {
    const flat: Record<string, any> = {};

    for (const [key, value] of Object.entries(tokens)) {
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (value && typeof value === 'object' && !Array.isArray(value)) {
        Object.assign(flat, this.flattenTokens(value, newKey));
      } else {
        flat[newKey] = value;
      }
    }

    return flat;
  }

  /**
   * Private: Set nested property by dot notation path
   */
  private setNestedProperty(obj: any, path: string, value: any): void {
    const keys = path.split('.');
    let current = obj;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!(key in current) || typeof current[key] !== 'object') {
        current[key] = {};
      }
      current = current[key];
    }

    current[keys[keys.length - 1]] = value;
  }

  /**
   * Private: Get nested property by dot notation path
   */
  private getNestedProperty(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  /**
   * Private: Notify observers of token changes
   */
  private notifyObservers(): void {
    for (const observer of this.observers) {
      observer(this.tokens);
    }
  }
}

// Global token manager instance
export const tokenManager = new TokenManager();
