/**
 * Token Manager - Runtime configuration and theme management
 */

import { DesignTokens, defaultTokens } from './design-tokens';

export class TokenManager {
  private tokens: DesignTokens;
  private customProperties: Map<string, string> = new Map();
  private observers: Set<(tokens: DesignTokens) => void> = new Set();

  constructor(initialTokens: Partial<DesignTokens> = {}) {
    this.tokens = this.mergeTokens(defaultTokens, initialTokens);
    this.generateCSSCustomProperties();
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
