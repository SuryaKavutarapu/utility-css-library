/**
 * Advanced Design Tokens System
 * Intelligent theming with automatic color contrast and dark/light mode support
 * Based on semantic color roles from the provided color palette
 */

// Color calculation utilities
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export function getLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;

  const { r, g, b } = rgb;
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function getOptimalTextColor(backgroundColor: string): string {
  const whiteContrast = getContrastRatio(backgroundColor, '#FFFFFF');
  const blackContrast = getContrastRatio(backgroundColor, '#000000');
  return whiteContrast > blackContrast ? '#FFFFFF' : '#000000';
}

export function addOpacity(hex: string, opacity: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
}

export function darken(hex: string, amount: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  const darkenedR = Math.max(0, rgb.r - Math.round(255 * amount));
  const darkenedG = Math.max(0, rgb.g - Math.round(255 * amount));
  const darkenedB = Math.max(0, rgb.b - Math.round(255 * amount));
  
  return `#${darkenedR.toString(16).padStart(2, '0')}${darkenedG.toString(16).padStart(2, '0')}${darkenedB.toString(16).padStart(2, '0')}`;
}

export function lighten(hex: string, amount: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  const lightenedR = Math.min(255, rgb.r + Math.round(255 * amount));
  const lightenedG = Math.min(255, rgb.g + Math.round(255 * amount));
  const lightenedB = Math.min(255, rgb.b + Math.round(255 * amount));
  
  return `#${lightenedR.toString(16).padStart(2, '0')}${lightenedG.toString(16).padStart(2, '0')}${lightenedB.toString(16).padStart(2, '0')}`;
}

// Core Design Token Interfaces
export interface DesignTokens {
  colors: ColorSystem;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  shadows: ShadowTokens;
  borders: BorderTokens;
  transitions: TransitionTokens;
  breakpoints: BreakpointTokens;
  zIndex: ZIndexTokens;
}

export interface ColorSystem {
  // Semantic colors from the palette
  primary: ThemeAwareColor;    // #6C5CE7 (Purple)
  doom: ThemeAwareColor;       // #2B2B2B (Dark Gray/Black)
  white: ThemeAwareColor;      // #FFFFFF (White)
  critical: ThemeAwareColor;   // #E62E5C (Red/Pink)
  warning: ThemeAwareColor;    // #E6E5C (Yellow/Orange)
  success: ThemeAwareColor;    // #37B26C (Green)
  interactive: ThemeAwareColor; // #0984E3 (Blue)
  
  // System colors
  neutral: ColorScale;
  surface: SurfaceColors;
  text: TextColors;
  border: BorderColors;
  
  // Mode-specific overrides
  light: ModeColors;
  dark: ModeColors;
}

export interface ThemeAwareColor {
  // Main color value
  DEFAULT: string;
  
  // Automatic contrast text (calculated based on luminance)
  foreground: string;
  
  // Interactive states
  hover: string;
  pressed: string;
  focus: string;
  
  // Opacity variants
  '10': string;  // 10% opacity
  '20': string;  // 20% opacity
  '30': string;  // 30% opacity
  '50': string;  // 50% opacity
  '70': string;  // 70% opacity
  
  // Accessible variants
  subtle: string;    // Lighter version for backgrounds
  muted: string;     // Muted version for secondary elements
  emphasis: string;  // Darker version for emphasis
}

export interface ModeColors {
  background: string;
  foreground: string;
  surface: {
    primary: string;
    secondary: string;
    tertiary: string;
    elevated: string;
    overlay: string;
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    inverse: string;
    disabled: string;
    placeholder: string;
  };
  border: {
    default: string;
    subtle: string;
    strong: string;
    focus: string;
  };
}

export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export interface SurfaceColors {
  background: string;
  foreground: string;
  card: string;
  popover: string;
  modal: string;
  hover: string;
  pressed: string;
  focus: string;
  border: string;
  divider: string;
}

export interface TextColors {
  primary: string;
  secondary: string;
  tertiary: string;
  inverse: string;
  disabled: string;
  placeholder: string;
  link: string;
  linkHover: string;
}

export interface BorderColors {
  default: string;
  subtle: string;
  strong: string;
  interactive: string;
  focus: string;
  error: string;
  warning: string;
  success: string;
}

// Helper function to create theme-aware colors
export function createThemeAwareColor(baseColor: string): ThemeAwareColor {
  const foreground = getOptimalTextColor(baseColor);
  
  return {
    DEFAULT: baseColor,
    foreground,
    hover: darken(baseColor, 0.1),
    pressed: darken(baseColor, 0.2),
    focus: addOpacity(baseColor, 0.2),
    '10': addOpacity(baseColor, 0.1),
    '20': addOpacity(baseColor, 0.2),
    '30': addOpacity(baseColor, 0.3),
    '50': addOpacity(baseColor, 0.5),
    '70': addOpacity(baseColor, 0.7),
    subtle: lighten(baseColor, 0.4),
    muted: addOpacity(baseColor, 0.6),
    emphasis: darken(baseColor, 0.15)
  };
}

// Base color palette (from your image)
export const BASE_COLORS = {
  primary: '#6C5CE7',    // Purple
  doom: '#2B2B2B',       // Dark Gray/Black  
  white: '#FFFFFF',      // White
  critical: '#E62E5C',   // Red/Pink
  warning: '#E6E35C',    // Yellow
  success: '#37B26C',    // Green
  interactive: '#0984E3' // Blue
} as const;

// Typography tokens
export interface TypographyTokens {
  fontFamily: {
    sans: string[];
    serif: string[];
    mono: string[];
  };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
    '6xl': string;
  };
  fontWeight: {
    thin: number;
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
    extrabold: number;
    black: number;
  };
  lineHeight: {
    none: number;
    tight: number;
    snug: number;
    normal: number;
    relaxed: number;
    loose: number;
  };
  letterSpacing: {
    tighter: string;
    tight: string;
    normal: string;
    wide: string;
    wider: string;
    widest: string;
  };
}

// Spacing tokens
export interface SpacingTokens {
  0: string;
  px: string;
  0.5: string;
  1: string;
  1.5: string;
  2: string;
  2.5: string;
  3: string;
  3.5: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
  11: string;
  12: string;
  14: string;
  16: string;
  20: string;
  24: string;
  28: string;
  32: string;
  36: string;
  40: string;
  44: string;
  48: string;
  52: string;
  56: string;
  60: string;
  64: string;
  72: string;
  80: string;
  96: string;
}

// Shadow tokens
export interface ShadowTokens {
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  inner: string;
  none: string;
}

// Border tokens
export interface BorderTokens {
  width: {
    0: string;
    1: string;
    2: string;
    4: string;
    8: string;
  };
  radius: {
    none: string;
    sm: string;
    base: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    full: string;
  };
}

// Transition tokens
export interface TransitionTokens {
  duration: {
    75: string;
    100: string;
    150: string;
    200: string;
    300: string;
    500: string;
    700: string;
    1000: string;
  };
  timing: {
    linear: string;
    in: string;
    out: string;
    inOut: string;
  };
}

// Breakpoint tokens
export interface BreakpointTokens {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

// Z-index tokens
export interface ZIndexTokens {
  auto: string;
  0: number;
  10: number;
  20: number;
  30: number;
  40: number;
  50: number;
}

// Theme configuration
export interface ThemeConfig {
  name: string;
  mode: 'light' | 'dark';
  colors: ColorSystem;
}

export type ThemeMode = 'light' | 'dark';

// Default tokens implementation
export const defaultTokens: DesignTokens = {
  colors: {
    // Semantic colors with intelligent contrast
    primary: createThemeAwareColor(BASE_COLORS.primary),
    doom: createThemeAwareColor(BASE_COLORS.doom),
    white: createThemeAwareColor(BASE_COLORS.white),
    critical: createThemeAwareColor(BASE_COLORS.critical),
    warning: createThemeAwareColor(BASE_COLORS.warning),
    success: createThemeAwareColor(BASE_COLORS.success),
    interactive: createThemeAwareColor(BASE_COLORS.interactive),

    // Neutral color scale
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
      950: '#0a0a0a'
    },

    // Surface colors for light mode
    surface: {
      background: '#ffffff',
      foreground: '#09090b',
      card: '#ffffff',
      popover: '#ffffff',
      modal: '#ffffff',
      hover: '#f4f4f5',
      pressed: '#e4e4e7',
      focus: '#f1f5f9',
      border: '#e4e4e7',
      divider: '#f1f5f9'
    },

    // Text colors for light mode
    text: {
      primary: '#09090b',
      secondary: '#71717a',
      tertiary: '#a1a1aa',
      inverse: '#fafafa',
      disabled: '#d4d4d8',
      placeholder: '#a1a1aa',
      link: '#2563eb',
      linkHover: '#1d4ed8'
    },

    // Border colors
    border: {
      default: '#e4e4e7',
      subtle: '#f1f5f9',
      strong: '#d4d4d8',
      interactive: '#2563eb',
      focus: '#3b82f6',
      error: '#ef4444',
      warning: '#f59e0b',
      success: '#10b981'
    },

    // Light mode colors
    light: {
      background: '#ffffff',
      foreground: '#09090b',
      surface: {
        primary: '#ffffff',
        secondary: '#f8fafc',
        tertiary: '#f1f5f9',
        elevated: '#ffffff',
        overlay: 'rgba(0, 0, 0, 0.5)'
      },
      text: {
        primary: '#09090b',
        secondary: '#64748b',
        tertiary: '#94a3b8',
        inverse: '#ffffff',
        disabled: '#cbd5e1',
        placeholder: '#94a3b8'
      },
      border: {
        default: '#e2e8f0',
        subtle: '#f1f5f9',
        strong: '#cbd5e1',
        focus: '#3b82f6'
      }
    },

    // Dark mode colors
    dark: {
      background: '#09090b',
      foreground: '#fafafa',
      surface: {
        primary: '#09090b',
        secondary: '#1a1a1a',
        tertiary: '#262626',
        elevated: '#1a1a1a',
        overlay: 'rgba(0, 0, 0, 0.8)'
      },
      text: {
        primary: '#fafafa',
        secondary: '#a1a1aa',
        tertiary: '#71717a',
        inverse: '#09090b',
        disabled: '#52525b',
        placeholder: '#71717a'
      },
      border: {
        default: '#27272a',
        subtle: '#1a1a1a',
        strong: '#3f3f46',
        focus: '#3b82f6'
      }
    }
  },

  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      mono: ['Fira Code', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace']
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem'
    },
    fontWeight: {
      thin: 100,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900
    },
    lineHeight: {
      none: 1,
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em'
    }
  },

  spacing: {
    0: '0px',
    px: '1px',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem'
  },

  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    none: '0 0 #0000'
  },

  borders: {
    width: {
      0: '0px',
      1: '1px',
      2: '2px',
      4: '4px',
      8: '8px'
    },
    radius: {
      none: '0px',
      sm: '0.125rem',
      base: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
      full: '9999px'
    }
  },

  transitions: {
    duration: {
      75: '75ms',
      100: '100ms',
      150: '150ms',
      200: '200ms',
      300: '300ms',
      500: '500ms',
      700: '700ms',
      1000: '1000ms'
    },
    timing: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  },

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },

  zIndex: {
    auto: 'auto',
    0: 0,
    10: 10,
    20: 20,
    30: 30,
    40: 40,
    50: 50
  }
};

// Dark mode tokens
export const darkTokens: DesignTokens = {
  ...defaultTokens,
  colors: {
    ...defaultTokens.colors,
    
    // Override surface colors for dark mode
    surface: {
      background: '#09090b',
      foreground: '#fafafa',
      card: '#0a0a0a',
      popover: '#09090b',
      modal: '#0a0a0a',
      hover: '#1a1a1a',
      pressed: '#262626',
      focus: '#1e293b',
      border: '#27272a',
      divider: '#1a1a1a'
    },

    // Override text colors for dark mode
    text: {
      primary: '#fafafa',
      secondary: '#a1a1aa',
      tertiary: '#71717a',
      inverse: '#09090b',
      disabled: '#52525b',
      placeholder: '#71717a',
      link: '#60a5fa',
      linkHover: '#93c5fd'
    },

    // Override border colors for dark mode
    border: {
      default: '#27272a',
      subtle: '#1a1a1a',
      strong: '#3f3f46',
      interactive: '#3b82f6',
      focus: '#60a5fa',
      error: '#ef4444',
      warning: '#f59e0b',
      success: '#10b981'
    }
  }
};

// Available themes with light and dark variants
export const themes = {
  default: {
    light: defaultTokens,
    dark: darkTokens
  }
} as const;

// Helper function to get theme tokens
export function getThemeTokens(themeName: keyof typeof themes = 'default', mode: ThemeMode = 'light'): DesignTokens {
  return themes[themeName][mode];
}
