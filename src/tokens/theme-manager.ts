import { DesignTokens, ThemeMode, getThemeTokens } from './design-tokens';

export class ThemeManager {
  private currentTheme: string = 'default';
  private currentMode: ThemeMode = 'light';
  private tokens: DesignTokens;
  private listeners: Set<(theme: string, mode: ThemeMode, tokens: DesignTokens) => void> = new Set();

  constructor() {
    this.tokens = getThemeTokens('default', 'light');
    this.initializeTheme();
  }

  private initializeTheme(): void {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const savedMode = localStorage.getItem('theme-mode') as ThemeMode;
    
    if (savedTheme) {
      this.currentTheme = savedTheme;
    }
    
    if (savedMode) {
      this.currentMode = savedMode;
    } else {
      // Detect system preference
      this.currentMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    // Update tokens based on current theme and mode
    this.tokens = getThemeTokens(this.currentTheme as any, this.currentMode);
    
    this.applyTheme();
    this.setupSystemThemeListener();
  }

  private setupSystemThemeListener(): void {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme-mode')) {
        this.setMode(e.matches ? 'dark' : 'light');
      }
    });
  }

  public setTheme(themeName: string): void {
    this.currentTheme = themeName;
    localStorage.setItem('theme', themeName);
    this.tokens = getThemeTokens(themeName as any, this.currentMode);
    this.applyTheme();
    this.notifyListeners();
  }

  public setMode(mode: ThemeMode): void {
    this.currentMode = mode;
    localStorage.setItem('theme-mode', mode);
    this.tokens = getThemeTokens(this.currentTheme as any, mode);
    this.applyTheme();
    this.notifyListeners();
  }

  public toggleMode(): void {
    this.setMode(this.currentMode === 'light' ? 'dark' : 'light');
  }

  public getCurrentTheme(): string {
    return this.currentTheme;
  }

  public getCurrentMode(): ThemeMode {
    return this.currentMode;
  }

  public getTokens(): DesignTokens {
    return this.tokens;
  }

  private applyTheme(): void {
    const root = document.documentElement;
    
    // Apply color tokens as CSS custom properties
    const colorTokens = this.tokens.colors;
    
    // Semantic colors with automatic contrast
    this.setCSSProperty(root, '--color-primary', colorTokens.primary.DEFAULT);
    this.setCSSProperty(root, '--color-primary-foreground', colorTokens.primary.foreground);
    this.setCSSProperty(root, '--color-primary-hover', colorTokens.primary.hover);
    this.setCSSProperty(root, '--color-primary-pressed', colorTokens.primary.pressed);
    this.setCSSProperty(root, '--color-primary-focus', colorTokens.primary.focus);
    this.setCSSProperty(root, '--color-primary-subtle', colorTokens.primary.subtle);
    this.setCSSProperty(root, '--color-primary-muted', colorTokens.primary.muted);
    this.setCSSProperty(root, '--color-primary-emphasis', colorTokens.primary.emphasis);
    
    // Primary opacity variants
    this.setCSSProperty(root, '--color-primary-10', colorTokens.primary['10']);
    this.setCSSProperty(root, '--color-primary-20', colorTokens.primary['20']);
    this.setCSSProperty(root, '--color-primary-30', colorTokens.primary['30']);
    this.setCSSProperty(root, '--color-primary-50', colorTokens.primary['50']);
    this.setCSSProperty(root, '--color-primary-70', colorTokens.primary['70']);
    
    // Doom colors
    this.setCSSProperty(root, '--color-doom', colorTokens.doom.DEFAULT);
    this.setCSSProperty(root, '--color-doom-foreground', colorTokens.doom.foreground);
    this.setCSSProperty(root, '--color-doom-hover', colorTokens.doom.hover);
    this.setCSSProperty(root, '--color-doom-pressed', colorTokens.doom.pressed);
    
    // White colors
    this.setCSSProperty(root, '--color-white', colorTokens.white.DEFAULT);
    this.setCSSProperty(root, '--color-white-foreground', colorTokens.white.foreground);
    
    // Critical colors
    this.setCSSProperty(root, '--color-critical', colorTokens.critical.DEFAULT);
    this.setCSSProperty(root, '--color-critical-foreground', colorTokens.critical.foreground);
    this.setCSSProperty(root, '--color-critical-hover', colorTokens.critical.hover);
    this.setCSSProperty(root, '--color-critical-pressed', colorTokens.critical.pressed);
    this.setCSSProperty(root, '--color-critical-subtle', colorTokens.critical.subtle);
    
    // Warning colors
    this.setCSSProperty(root, '--color-warning', colorTokens.warning.DEFAULT);
    this.setCSSProperty(root, '--color-warning-foreground', colorTokens.warning.foreground);
    this.setCSSProperty(root, '--color-warning-hover', colorTokens.warning.hover);
    this.setCSSProperty(root, '--color-warning-pressed', colorTokens.warning.pressed);
    this.setCSSProperty(root, '--color-warning-subtle', colorTokens.warning.subtle);
    
    // Success colors
    this.setCSSProperty(root, '--color-success', colorTokens.success.DEFAULT);
    this.setCSSProperty(root, '--color-success-foreground', colorTokens.success.foreground);
    this.setCSSProperty(root, '--color-success-hover', colorTokens.success.hover);
    this.setCSSProperty(root, '--color-success-pressed', colorTokens.success.pressed);
    this.setCSSProperty(root, '--color-success-subtle', colorTokens.success.subtle);
    
    // Interactive colors
    this.setCSSProperty(root, '--color-interactive', colorTokens.interactive.DEFAULT);
    this.setCSSProperty(root, '--color-interactive-foreground', colorTokens.interactive.foreground);
    this.setCSSProperty(root, '--color-interactive-hover', colorTokens.interactive.hover);
    this.setCSSProperty(root, '--color-interactive-pressed', colorTokens.interactive.pressed);
    this.setCSSProperty(root, '--color-interactive-subtle', colorTokens.interactive.subtle);

    // Mode-specific colors
    const modeColors = this.currentMode === 'dark' ? colorTokens.dark : colorTokens.light;
    
    this.setCSSProperty(root, '--color-background', modeColors.background);
    this.setCSSProperty(root, '--color-foreground', modeColors.foreground);
    
    // Surface colors
    this.setCSSProperty(root, '--color-surface-primary', modeColors.surface.primary);
    this.setCSSProperty(root, '--color-surface-secondary', modeColors.surface.secondary);
    this.setCSSProperty(root, '--color-surface-tertiary', modeColors.surface.tertiary);
    this.setCSSProperty(root, '--color-surface-elevated', modeColors.surface.elevated);
    this.setCSSProperty(root, '--color-surface-overlay', modeColors.surface.overlay);
    
    // Text colors
    this.setCSSProperty(root, '--color-text-primary', modeColors.text.primary);
    this.setCSSProperty(root, '--color-text-secondary', modeColors.text.secondary);
    this.setCSSProperty(root, '--color-text-tertiary', modeColors.text.tertiary);
    this.setCSSProperty(root, '--color-text-inverse', modeColors.text.inverse);
    this.setCSSProperty(root, '--color-text-disabled', modeColors.text.disabled);
    this.setCSSProperty(root, '--color-text-placeholder', modeColors.text.placeholder);
    
    // Border colors
    this.setCSSProperty(root, '--color-border-default', modeColors.border.default);
    this.setCSSProperty(root, '--color-border-subtle', modeColors.border.subtle);
    this.setCSSProperty(root, '--color-border-strong', modeColors.border.strong);
    this.setCSSProperty(root, '--color-border-focus', modeColors.border.focus);

    // Surface system colors
    this.setCSSProperty(root, '--color-surface-background', colorTokens.surface.background);
    this.setCSSProperty(root, '--color-surface-foreground', colorTokens.surface.foreground);
    this.setCSSProperty(root, '--color-surface-card', colorTokens.surface.card);
    this.setCSSProperty(root, '--color-surface-popover', colorTokens.surface.popover);
    this.setCSSProperty(root, '--color-surface-modal', colorTokens.surface.modal);
    this.setCSSProperty(root, '--color-surface-hover', colorTokens.surface.hover);
    this.setCSSProperty(root, '--color-surface-pressed', colorTokens.surface.pressed);
    this.setCSSProperty(root, '--color-surface-border', colorTokens.surface.border);
    this.setCSSProperty(root, '--color-surface-divider', colorTokens.surface.divider);

    // Typography tokens
    const typographyTokens = this.tokens.typography;
    this.setCSSProperty(root, '--font-family-sans', typographyTokens.fontFamily.sans.join(', '));
    this.setCSSProperty(root, '--font-family-serif', typographyTokens.fontFamily.serif.join(', '));
    this.setCSSProperty(root, '--font-family-mono', typographyTokens.fontFamily.mono.join(', '));
    
    // Font sizes
    Object.entries(typographyTokens.fontSize).forEach(([key, value]) => {
      this.setCSSProperty(root, `--font-size-${key}`, value);
    });
    
    // Font weights
    Object.entries(typographyTokens.fontWeight).forEach(([key, value]) => {
      this.setCSSProperty(root, `--font-weight-${key}`, value.toString());
    });
    
    // Line heights
    Object.entries(typographyTokens.lineHeight).forEach(([key, value]) => {
      this.setCSSProperty(root, `--line-height-${key}`, value.toString());
    });

    // Spacing tokens
    Object.entries(this.tokens.spacing).forEach(([key, value]) => {
      this.setCSSProperty(root, `--spacing-${key.replace('.', '-')}`, value);
    });

    // Border radius tokens
    Object.entries(this.tokens.borders.radius).forEach(([key, value]) => {
      this.setCSSProperty(root, `--border-radius-${key}`, value);
    });
    
    // Border width tokens
    Object.entries(this.tokens.borders.width).forEach(([key, value]) => {
      this.setCSSProperty(root, `--border-width-${key}`, value);
    });

    // Shadow tokens
    Object.entries(this.tokens.shadows).forEach(([key, value]) => {
      this.setCSSProperty(root, `--shadow-${key}`, value);
    });
    
    // Transition tokens
    Object.entries(this.tokens.transitions.duration).forEach(([key, value]) => {
      this.setCSSProperty(root, `--transition-duration-${key}`, value);
    });
    
    Object.entries(this.tokens.transitions.timing).forEach(([key, value]) => {
      this.setCSSProperty(root, `--transition-timing-${key}`, value);
    });

    // Breakpoint tokens
    Object.entries(this.tokens.breakpoints).forEach(([key, value]) => {
      this.setCSSProperty(root, `--breakpoint-${key}`, value);
    });

    // Set the theme mode class
    root.classList.remove('light', 'dark');
    root.classList.add(this.currentMode);
    
    // Set data attributes for CSS selection
    root.setAttribute('data-theme', this.currentTheme);
    root.setAttribute('data-mode', this.currentMode);
  }

  private setCSSProperty(element: HTMLElement, property: string, value: string): void {
    element.style.setProperty(property, value);
  }

  public subscribe(callback: (theme: string, mode: ThemeMode, tokens: DesignTokens) => void): () => void {
    this.listeners.add(callback);
    
    return () => {
      this.listeners.delete(callback);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(callback => {
      callback(this.currentTheme, this.currentMode, this.tokens);
    });
  }

  // Utility methods for getting specific token values
  public getColor(path: string): string | undefined {
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

  public getSpacing(key: keyof typeof this.tokens.spacing): string {
    return this.tokens.spacing[key];
  }

  public getTypography(category: keyof typeof this.tokens.typography, key: string): any {
    const categoryObj = this.tokens.typography[category];
    if (categoryObj && typeof categoryObj === 'object') {
      return (categoryObj as any)[key];
    }
    return undefined;
  }

  // Helper method to get optimal text color for any background
  public getOptimalTextColor(backgroundColor: string): string {
    // Re-export the utility function
    const { getOptimalTextColor } = require('./design-tokens');
    return getOptimalTextColor(backgroundColor);
  }

  // Helper method to check if current mode is dark
  public isDarkMode(): boolean {
    return this.currentMode === 'dark';
  }

  // Helper method to get semantic color with automatic contrast
  public getSemanticColor(colorName: 'primary' | 'doom' | 'white' | 'critical' | 'warning' | 'success' | 'interactive', variant: 'DEFAULT' | 'foreground' | 'hover' | 'pressed' | 'focus' | 'subtle' | 'muted' | 'emphasis' | '10' | '20' | '30' | '50' | '70' = 'DEFAULT'): string {
    return this.tokens.colors[colorName][variant];
  }
}

// Create global theme manager instance
export const themeManager = new ThemeManager();

// Export for global access
if (typeof window !== 'undefined') {
  (window as any).themeManager = themeManager;
}
