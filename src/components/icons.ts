import { DesignTokens } from '../tokens/design-tokens';

/**
 * Icon configuration that integrates with our design system
 */
export interface IconConfig {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'critical' | 'interactive' | 'doom' | 'white' | 'inherit';
  variant?: 'filled' | 'outlined' | 'round' | 'sharp' | 'two-tone';
  className?: string;
  interactive?: boolean;
}

/**
 * Icon size mappings that align with our design tokens
 */
export const IconSizes = {
  xs: '12px',   // 0.75rem
  sm: '14px',   // 0.875rem  
  md: '16px',   // 1rem (default)
  lg: '20px',   // 1.25rem
  xl: '24px',   // 1.5rem
  '2xl': '32px' // 2rem
} as const;

/**
 * Icon color mappings that use our semantic color system
 */
export const IconColors = {
  primary: 'var(--color-primary, #6C5CE7)',
  secondary: 'var(--color-text-secondary, #71717a)',
  success: 'var(--color-success, #37B26C)',
  warning: 'var(--color-warning, #E6E35C)',
  critical: 'var(--color-critical, #E62E5C)',
  interactive: 'var(--color-interactive, #0984E3)',
  doom: 'var(--color-doom, #2B2B2B)',
  white: 'var(--color-white, #FFFFFF)',
  inherit: 'currentColor'
} as const;

/**
 * Material Icons font family configuration for each variant
 */
export const MaterialIconsFontFamilies = {
  filled: 'Material Icons',
  outlined: 'Material Icons Outlined',
  round: 'Material Icons Round',
  sharp: 'Material Icons Sharp',
  'two-tone': 'Material Icons Two Tone'
} as const;

/**
 * Icon utility class generator and manager
 */
export class IconUtils {
  private static isInitialized = false;

  /**
   * Initialize Material Icons by loading Google Fonts
   */
  static async initialize(): Promise<void> {
    if (this.isInitialized) return;

    // Load Material Icons fonts from Google Fonts
    const fontLinks = [
      'https://fonts.googleapis.com/icon?family=Material+Icons',
      'https://fonts.googleapis.com/icon?family=Material+Icons+Outlined',
      'https://fonts.googleapis.com/icon?family=Material+Icons+Round',
      'https://fonts.googleapis.com/icon?family=Material+Icons+Sharp',
      'https://fonts.googleapis.com/icon?family=Material+Icons+Two+Tone'
    ];

    const promises = fontLinks.map(href => {
      return new Promise<void>((resolve, reject) => {
        const existing = document.querySelector(`link[href="${href}"]`);
        if (existing) {
          resolve();
          return;
        }

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.onload = () => resolve();
        link.onerror = () => reject(new Error(`Failed to load ${href}`));
        document.head.appendChild(link);
      });
    });

    try {
      await Promise.all(promises);
      this.injectIconStyles();
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to load Material Icons:', error);
    }
  }

  /**
   * Inject icon styles into the document
   */
  private static injectIconStyles(): void {
    const existingStyle = document.getElementById('material-icons-styles');
    if (existingStyle) return;

    const style = document.createElement('style');
    style.id = 'material-icons-styles';
    style.textContent = this.generateIconCSS();
    document.head.appendChild(style);
  }

  /**
   * Generate complete CSS for Material Icons integration
   */
  static generateIconCSS(): string {
    const baseStyles = `
      /* Material Icons Base Styles */
      .material-icon {
        font-family: 'Material Icons';
        font-weight: normal;
        font-style: normal;
        font-size: 24px;
        line-height: 1;
        letter-spacing: normal;
        text-transform: none;
        display: inline-block;
        white-space: nowrap;
        word-wrap: normal;
        direction: ltr;
        -webkit-font-feature-settings: 'liga';
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        user-select: none;
        vertical-align: middle;
      }

      /* Variant-specific font families */
      .material-icon--outlined { font-family: 'Material Icons Outlined'; }
      .material-icon--round { font-family: 'Material Icons Round'; }
      .material-icon--sharp { font-family: 'Material Icons Sharp'; }
      .material-icon--two-tone { font-family: 'Material Icons Two Tone'; }
    `;

    const themeStyles = this.generateIconThemeCSS();
    const sizeClasses = this.generateSizeClasses();
    const colorClasses = this.generateColorClasses();
    const stateClasses = this.generateStateClasses();

    return baseStyles + themeStyles + sizeClasses + colorClasses + stateClasses;
  }

  /**
   * Generate CSS custom properties for icon theming
   */
  static generateIconThemeCSS(): string {
    return `
      /* Icon Theme Variables */
      :root {
        --icon-color-primary: var(--color-primary, #6C5CE7);
        --icon-color-secondary: var(--color-text-secondary, #71717a);
        --icon-color-success: var(--color-success, #37B26C);
        --icon-color-warning: var(--color-warning, #E6E35C);
        --icon-color-critical: var(--color-critical, #E62E5C);
        --icon-color-interactive: var(--color-interactive, #0984E3);
        --icon-color-doom: var(--color-doom, #2B2B2B);
        --icon-color-white: var(--color-white, #FFFFFF);
        --icon-opacity-hover: 0.8;
        --icon-opacity-disabled: 0.4;
        --icon-transition: all 0.2s ease;
      }

      /* Dark Mode Icon Adjustments */
      :root.dark,
      [data-mode="dark"] {
        --icon-color-secondary: #a1a1aa;
        --icon-color-doom: #fafafa;
        --icon-opacity-hover: 0.9;
        --icon-opacity-disabled: 0.3;
      }
    `;
  }

  /**
   * Generate size classes
   */
  private static generateSizeClasses(): string {
    return Object.entries(IconSizes)
      .map(([size, value]) => `
        .material-icon--${size} {
          font-size: ${value} !important;
          width: ${value};
          height: ${value};
        }
      `).join('');
  }

  /**
   * Generate color classes
   */
  private static generateColorClasses(): string {
    return Object.keys(IconColors)
      .map(color => `
        .material-icon--${color} {
          color: var(--icon-color-${color}, ${IconColors[color as keyof typeof IconColors]}) !important;
        }
      `).join('');
  }

  /**
   * Generate state classes
   */
  private static generateStateClasses(): string {
    return `
      /* Icon States */
      .material-icon--hover:hover {
        opacity: var(--icon-opacity-hover, 0.8);
        transition: var(--icon-transition);
      }

      .material-icon--disabled {
        opacity: var(--icon-opacity-disabled, 0.4);
        cursor: not-allowed;
        pointer-events: none;
      }

      .material-icon--interactive {
        cursor: pointer;
        transition: var(--icon-transition);
      }

      .material-icon--interactive:hover {
        transform: scale(1.05);
        opacity: var(--icon-opacity-hover, 0.8);
      }

      .material-icon--interactive:active {
        transform: scale(0.95);
      }

      /* Button integration */
      .btn .material-icon {
        vertical-align: middle;
        margin-right: 0.25rem;
      }

      .btn .material-icon:last-child {
        margin-right: 0;
        margin-left: 0.25rem;
      }

      .btn .material-icon:only-child {
        margin: 0;
      }
    `;
  }

  /**
   * Create a Material Icon element
   */
  static createIcon(iconName: string, config: IconConfig = {}): HTMLElement {
    const {
      size = 'md',
      color = 'inherit',
      variant = 'filled',
      className = '',
      interactive = false
    } = config;

    const icon = document.createElement('span');
    icon.className = [
      'material-icon',
      variant !== 'filled' && `material-icon--${variant}`,
      `material-icon--${size}`,
      color !== 'inherit' && `material-icon--${color}`,
      interactive && 'material-icon--interactive',
      className
    ].filter(Boolean).join(' ');

    icon.textContent = iconName;
    icon.setAttribute('aria-hidden', 'true');

    return icon;
  }

  /**
   * Create an icon with accessibility support
   */
  static createAccessibleIcon(iconName: string, label: string, config: IconConfig = {}): HTMLElement {
    const icon = this.createIcon(iconName, config);
    icon.setAttribute('aria-label', label);
    icon.setAttribute('role', 'img');
    icon.removeAttribute('aria-hidden');
    return icon;
  }

  /**
   * Get icon size in pixels
   */
  static getIconSize(size: IconConfig['size'] = 'md'): string {
    return IconSizes[size];
  }

  /**
   * Get icon color CSS value
   */
  static getIconColor(color: IconConfig['color'] = 'inherit'): string {
    return IconColors[color];
  }

  /**
   * Add icon to existing element
   */
  static addIconToElement(element: HTMLElement, iconName: string, config: IconConfig = {}): HTMLElement {
    const icon = this.createIcon(iconName, config);
    element.prepend(icon);
    return icon;
  }

  /**
   * Replace element content with icon
   */
  static replaceWithIcon(element: HTMLElement, iconName: string, config: IconConfig = {}): void {
    const icon = this.createIcon(iconName, config);
    element.innerHTML = '';
    element.appendChild(icon);
  }
}

/**
 * Common Material Icons used in design systems
 */
export const CommonIcons = {
  // Navigation
  menu: 'menu',
  close: 'close',
  arrow_back: 'arrow_back',
  arrow_forward: 'arrow_forward',
  expand_more: 'expand_more',
  expand_less: 'expand_less',
  
  // Actions
  add: 'add',
  edit: 'edit',
  delete: 'delete',
  save: 'save',
  search: 'search',
  filter_list: 'filter_list',
  more_vert: 'more_vert',
  more_horiz: 'more_horiz',
  
  // Status
  check: 'check',
  check_circle: 'check_circle',
  error: 'error',
  warning: 'warning',
  info: 'info',
  
  // Interface
  home: 'home',
  dashboard: 'dashboard',
  settings: 'settings',
  account_circle: 'account_circle',
  notifications: 'notifications',
  help: 'help',
  
  // Theme
  light_mode: 'light_mode',
  dark_mode: 'dark_mode',
  brightness_auto: 'brightness_auto',
  
  // Content
  visibility: 'visibility',
  visibility_off: 'visibility_off',
  copy: 'content_copy',
  download: 'download',
  upload: 'upload',
  
  // Communication
  mail: 'mail',
  phone: 'phone',
  chat: 'chat',
  
  // Media
  play_arrow: 'play_arrow',
  pause: 'pause',
  stop: 'stop',
  volume_up: 'volume_up',
  volume_off: 'volume_off'
} as const;

export type CommonIconName = keyof typeof CommonIcons;
