/**
 * Design Tokens Configuration
 * Central configuration for all design tokens including colors, typography, spacing, etc.
 * Supports multiple themes with light/dark mode variants and WCAG AA contrast compliance
 */

export interface DesignTokens {
  colors: ColorTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  shadows: ShadowTokens;
  borders: BorderTokens;
  transitions: TransitionTokens;
  breakpoints: BreakpointTokens;
  zIndex: ZIndexTokens;
}

export interface ColorTokens {
  primary: ColorScale;
  secondary: ColorScale;
  accent: ColorScale;
  success: ColorScale;
  warning: ColorScale;
  error: ColorScale;
  info: ColorScale;
  neutral: ColorScale;
  surface: SurfaceColors;
  text: TextColors;
  semantic: SemanticColors;
}

export interface SemanticColors {
  destructive: string;
  destructiveHover: string;
  destructiveForeground: string;
  constructive: string;
  constructiveHover: string;
  constructiveForeground: string;
  muted: string;
  mutedForeground: string;
  ring: string;
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
  };
  lineHeight: {
    none: string;
    tight: string;
    snug: string;
    normal: string;
    relaxed: string;
    loose: string;
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

export interface SpacingTokens {
  0: string;
  1: string;
  2: string;
  3: string;
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

export interface ShadowTokens {
  none: string;
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  inner: string;
}

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
    'in-out': string;
  };
}

export interface BreakpointTokens {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface ZIndexTokens {
  hide: number;
  base: number;
  docked: number;
  dropdown: number;
  sticky: number;
  banner: number;
  overlay: number;
  modal: number;
  popover: number;
  skipLink: number;
  toast: number;
  tooltip: number;
}

/**
 * Default Design Tokens - Light Theme (Ocean Blue)
 * High contrast colors following WCAG AA guidelines
 */
export const defaultTokens: DesignTokens = {
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9', // Main primary color
      600: '#0284c7', // Hover state (darker for contrast)
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
      950: '#082f49',
    },
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b', // Main secondary color
      600: '#475569', // Hover state
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617',
    },
    accent: {
      50: '#fdf2f8',
      100: '#fce7f3',
      200: '#fbcfe8',
      300: '#f9a8d4',
      400: '#f472b6',
      500: '#ec4899', // Main accent color
      600: '#db2777', // Hover state
      700: '#be185d',
      800: '#9d174d',
      900: '#831843',
      950: '#500724',
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e', // Main success color
      600: '#16a34a', // Hover state
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
      950: '#052e16',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b', // Main warning color
      600: '#d97706', // Hover state
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
      950: '#451a03',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444', // Main error color
      600: '#dc2626', // Hover state
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
      950: '#450a0a',
    },
    info: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9', // Main info color (same as primary)
      600: '#0284c7', // Hover state
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
      950: '#082f49',
    },
    neutral: {
      50: '#fafafa',
      100: '#f4f4f5',
      200: '#e4e4e7',
      300: '#d4d4d8',
      400: '#a1a1aa',
      500: '#71717a',
      600: '#52525b',
      700: '#3f3f46',
      800: '#27272a',
      900: '#18181b',
      950: '#09090b',
    },
    surface: {
      background: '#ffffff',
      foreground: '#09090b',
      card: '#ffffff',
      popover: '#ffffff',
      modal: '#ffffff',
      hover: '#f4f4f5',
      pressed: '#e4e4e7',
      focus: '#0ea5e9',
      border: '#e4e4e7',
      divider: '#f4f4f5',
    },
    text: {
      primary: '#09090b', // High contrast on white
      secondary: '#52525b', // Medium contrast
      tertiary: '#71717a', // Lower contrast
      inverse: '#ffffff', // White text on dark backgrounds
      disabled: '#d4d4d8',
      placeholder: '#a1a1aa',
      link: '#0284c7', // Darker blue for better contrast
      linkHover: '#0369a1', // Even darker on hover
    },
    semantic: {
      destructive: '#dc2626',
      destructiveHover: '#b91c1c',
      destructiveForeground: '#ffffff',
      constructive: '#16a34a',
      constructiveHover: '#15803d',
      constructiveForeground: '#ffffff',
      muted: '#f4f4f5',
      mutedForeground: '#71717a',
      ring: '#0ea5e9',
    },
  },
  typography: {
    fontFamily: {
      sans: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'sans-serif',
      ],
      serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      mono: [
        'SF Mono',
        'Monaco',
        'Inconsolata',
        'Roboto Mono',
        'Consolas',
        'monospace',
      ],
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
      '6xl': '3.75rem',
    },
    fontWeight: {
      thin: 100,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },
  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
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
    96: '24rem',
  },
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  },
  borders: {
    width: {
      0: '0',
      1: '1px',
      2: '2px',
      4: '4px',
      8: '8px',
    },
    radius: {
      none: '0',
      sm: '0.125rem',
      base: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
      full: '9999px',
    },
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
      1000: '1000ms',
    },
    timing: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  zIndex: {
    hide: -1,
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },
};

/**
 * Dark Theme Tokens - Ocean Blue Dark
 * High contrast colors following WCAG AA guidelines for dark mode
 */
export const darkTokens: DesignTokens = {
  ...defaultTokens,
  colors: {
    ...defaultTokens.colors,
    surface: {
      background: '#09090b',
      foreground: '#fafafa',
      card: '#18181b',
      popover: '#27272a',
      modal: '#18181b',
      hover: '#27272a',
      pressed: '#3f3f46',
      focus: '#38bdf8',
      border: '#27272a',
      divider: '#3f3f46',
    },
    text: {
      primary: '#fafafa', // High contrast on dark
      secondary: '#d4d4d8', // Medium contrast
      tertiary: '#a1a1aa', // Lower contrast
      inverse: '#09090b', // Dark text on light backgrounds
      disabled: '#52525b',
      placeholder: '#71717a',
      link: '#60a5fa', // Lighter blue for dark backgrounds
      linkHover: '#93c5fd', // Even lighter on hover
    },
    semantic: {
      destructive: '#ef4444',
      destructiveHover: '#f87171',
      destructiveForeground: '#ffffff',
      constructive: '#22c55e',
      constructiveHover: '#4ade80',
      constructiveForeground: '#000000',
      muted: '#27272a',
      mutedForeground: '#a1a1aa',
      ring: '#38bdf8',
    },
  },
};

/**
 * Forest Green Theme - Light
 */
export const forestLightTokens: DesignTokens = {
  ...defaultTokens,
  colors: {
    ...defaultTokens.colors,
    primary: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e', // Main primary color
      600: '#16a34a', // Hover state
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
      950: '#052e16',
    },
    secondary: {
      50: '#fefce8',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b', // Main secondary color
      600: '#d97706', // Hover state
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
      950: '#451a03',
    },
    accent: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9', // Main accent color
      600: '#0284c7', // Hover state
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
      950: '#082f49',
    },
    text: {
      primary: '#052e16', // Dark green for text
      secondary: '#166534',
      tertiary: '#22c55e',
      inverse: '#ffffff',
      disabled: '#bbf7d0',
      placeholder: '#86efac',
      link: '#15803d',
      linkHover: '#166534',
    },
  },
};

/**
 * Forest Green Theme - Dark
 */
export const forestDarkTokens: DesignTokens = {
  ...forestLightTokens,
  colors: {
    ...forestLightTokens.colors,
    surface: {
      background: '#052e16',
      foreground: '#f0fdf4',
      card: '#14532d',
      popover: '#166534',
      modal: '#14532d',
      hover: '#166534',
      pressed: '#15803d',
      focus: '#4ade80',
      border: '#166534',
      divider: '#15803d',
    },
    text: {
      primary: '#f0fdf4',
      secondary: '#dcfce7',
      tertiary: '#bbf7d0',
      inverse: '#052e16',
      disabled: '#166534',
      placeholder: '#22c55e',
      link: '#86efac',
      linkHover: '#bbf7d0',
    },
    semantic: {
      destructive: '#ef4444',
      destructiveHover: '#f87171',
      destructiveForeground: '#ffffff',
      constructive: '#4ade80',
      constructiveHover: '#86efac',
      constructiveForeground: '#000000',
      muted: '#166534',
      mutedForeground: '#bbf7d0',
      ring: '#4ade80',
    },
  },
};

/**
 * Purple Cosmic Theme - Light
 */
export const cosmicLightTokens: DesignTokens = {
  ...defaultTokens,
  colors: {
    ...defaultTokens.colors,
    primary: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7', // Main primary color
      600: '#9333ea', // Hover state
      700: '#7c3aed',
      800: '#6b21a8',
      900: '#581c87',
      950: '#3b0764',
    },
    secondary: {
      50: '#fdf2f8',
      100: '#fce7f3',
      200: '#fbcfe8',
      300: '#f9a8d4',
      400: '#f472b6',
      500: '#ec4899', // Main secondary color
      600: '#db2777', // Hover state
      700: '#be185d',
      800: '#9d174d',
      900: '#831843',
      950: '#500724',
    },
    accent: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9', // Main accent color
      600: '#0284c7', // Hover state
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
      950: '#082f49',
    },
    text: {
      primary: '#3b0764', // Dark purple for text
      secondary: '#6b21a8',
      tertiary: '#9333ea',
      inverse: '#ffffff',
      disabled: '#e9d5ff',
      placeholder: '#d8b4fe',
      link: '#7c3aed',
      linkHover: '#6b21a8',
    },
  },
};

/**
 * Purple Cosmic Theme - Dark
 */
export const cosmicDarkTokens: DesignTokens = {
  ...cosmicLightTokens,
  colors: {
    ...cosmicLightTokens.colors,
    surface: {
      background: '#3b0764',
      foreground: '#faf5ff',
      card: '#581c87',
      popover: '#6b21a8',
      modal: '#581c87',
      hover: '#6b21a8',
      pressed: '#7c3aed',
      focus: '#c084fc',
      border: '#6b21a8',
      divider: '#7c3aed',
    },
    text: {
      primary: '#faf5ff',
      secondary: '#f3e8ff',
      tertiary: '#e9d5ff',
      inverse: '#3b0764',
      disabled: '#6b21a8',
      placeholder: '#a855f7',
      link: '#d8b4fe',
      linkHover: '#e9d5ff',
    },
    semantic: {
      destructive: '#ef4444',
      destructiveHover: '#f87171',
      destructiveForeground: '#ffffff',
      constructive: '#22c55e',
      constructiveHover: '#4ade80',
      constructiveForeground: '#000000',
      muted: '#6b21a8',
      mutedForeground: '#e9d5ff',
      ring: '#c084fc',
    },
  },
};

/**
 * Sunset Orange Theme - Light
 */
export const sunsetLightTokens: DesignTokens = {
  ...defaultTokens,
  colors: {
    ...defaultTokens.colors,
    primary: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#f97316', // Main primary color
      600: '#ea580c', // Hover state
      700: '#c2410c',
      800: '#9a3412',
      900: '#7c2d12',
      950: '#431407',
    },
    secondary: {
      50: '#fefce8',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b', // Main secondary color
      600: '#d97706', // Hover state
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
      950: '#451a03',
    },
    accent: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444', // Main accent color
      600: '#dc2626', // Hover state
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
      950: '#450a0a',
    },
    text: {
      primary: '#431407', // Dark orange for text
      secondary: '#9a3412',
      tertiary: '#c2410c',
      inverse: '#ffffff',
      disabled: '#fed7aa',
      placeholder: '#fdba74',
      link: '#c2410c',
      linkHover: '#9a3412',
    },
  },
};

/**
 * Sunset Orange Theme - Dark
 */
export const sunsetDarkTokens: DesignTokens = {
  ...sunsetLightTokens,
  colors: {
    ...sunsetLightTokens.colors,
    surface: {
      background: '#431407',
      foreground: '#fff7ed',
      card: '#7c2d12',
      popover: '#9a3412',
      modal: '#7c2d12',
      hover: '#9a3412',
      pressed: '#c2410c',
      focus: '#fb923c',
      border: '#9a3412',
      divider: '#c2410c',
    },
    text: {
      primary: '#fff7ed',
      secondary: '#ffedd5',
      tertiary: '#fed7aa',
      inverse: '#431407',
      disabled: '#9a3412',
      placeholder: '#f97316',
      link: '#fdba74',
      linkHover: '#fed7aa',
    },
    semantic: {
      destructive: '#ef4444',
      destructiveHover: '#f87171',
      destructiveForeground: '#ffffff',
      constructive: '#22c55e',
      constructiveHover: '#4ade80',
      constructiveForeground: '#000000',
      muted: '#9a3412',
      mutedForeground: '#fed7aa',
      ring: '#fb923c',
    },
  },
};

/**
 * Theme Registry
 */
export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  light: DesignTokens;
  dark: DesignTokens;
}

export const themes: Record<string, ThemeConfig> = {
  ocean: {
    id: 'ocean',
    name: 'Ocean Blue',
    description: 'Professional blue theme with excellent contrast',
    light: defaultTokens,
    dark: darkTokens,
  },
  forest: {
    id: 'forest',
    name: 'Forest Green',
    description: 'Natural green theme for eco-friendly designs',
    light: forestLightTokens,
    dark: forestDarkTokens,
  },
  cosmic: {
    id: 'cosmic',
    name: 'Cosmic Purple',
    description: 'Creative purple theme for artistic applications',
    light: cosmicLightTokens,
    dark: cosmicDarkTokens,
  },
  sunset: {
    id: 'sunset',
    name: 'Sunset Orange',
    description: 'Warm orange theme for energetic interfaces',
    light: sunsetLightTokens,
    dark: sunsetDarkTokens,
  },
};

/**
 * Helper function to get theme tokens
 */
export function getThemeTokens(themeId: string, mode: 'light' | 'dark' = 'light'): DesignTokens {
  const theme = themes[themeId];
  if (!theme) {
    console.warn(`Theme "${themeId}" not found, falling back to ocean theme`);
    return mode === 'dark' ? darkTokens : defaultTokens;
  }
  return mode === 'dark' ? theme.dark : theme.light;
}
