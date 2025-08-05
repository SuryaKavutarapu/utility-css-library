/**
 * Utility functions for the design system
 */

import { DesignTokens, getOptimalTextColor, getLuminance, getContrastRatio, addOpacity, darken, lighten } from '../tokens/design-tokens';
import { TokenManager } from '../tokens/token-manager';

/**
 * Create a new TokenManager instance
 */
export function createTokenManager(): TokenManager {
  return new TokenManager();
}

/**
 * Generate CSS custom properties from design tokens
 */
export function generateCSSCustomProperties(): string {
  const manager = new TokenManager();
  return manager.generateCSSString();
}

/**
 * Convert hex color to RGB values
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Calculate color luminance
 */
export function calculateLuminance(hex: string): number {
  return getLuminance(hex);
}

/**
 * Get optimal text color for background
 */
export function getOptimalText(backgroundColor: string): string {
  return getOptimalTextColor(backgroundColor);
}

/**
 * Calculate contrast ratio between two colors
 */
export function calculateContrastRatio(color1: string, color2: string): number {
  return getContrastRatio(color1, color2);
}

/**
 * Add opacity to a hex color
 */
export function withOpacity(hex: string, opacity: number): string {
  return addOpacity(hex, opacity);
}

/**
 * Darken a hex color
 */
export function darkenColor(hex: string, amount: number): string {
  return darken(hex, amount);
}

/**
 * Lighten a hex color
 */
export function lightenColor(hex: string, amount: number): string {
  return lighten(hex, amount);
}

/**
 * Get semantic color with automatic contrast
 */
export function getSemanticColor(
  colorName: 'primary' | 'doom' | 'white' | 'critical' | 'warning' | 'success' | 'interactive',
  variant: 'DEFAULT' | 'foreground' | 'hover' | 'pressed' | 'focus' | 'subtle' | 'muted' | 'emphasis' | '10' | '20' | '30' | '50' | '70' = 'DEFAULT'
): string {
  const manager = new TokenManager();
  return manager.getSemanticColor(colorName, variant);
}

/**
 * Validate design tokens structure
 */
export function validateTokens(tokens: Partial<DesignTokens>): boolean {
  const requiredKeys = ['colors', 'typography', 'spacing', 'shadows', 'borders', 'transitions'];
  
  for (const key of requiredKeys) {
    if (!(key in tokens)) {
      console.warn(`Missing required token category: ${key}`);
      return false;
    }
  }
  
  return true;
}

/**
 * Generate responsive CSS classes
 */
export function generateResponsiveClasses(
  baseClass: string,
  breakpoints: Record<string, string>
): string {
  let css = `.${baseClass} { /* base styles */ }\n`;
  
  Object.entries(breakpoints).forEach(([breakpoint, size]) => {
    css += `@media (min-width: ${size}) {\n`;
    css += `  .${breakpoint}\\:${baseClass} { /* responsive styles */ }\n`;
    css += `}\n`;
  });
  
  return css;
}

/**
 * Create a theme-aware button class
 */
export function createThemeButton(colorName: 'primary' | 'doom' | 'white' | 'critical' | 'warning' | 'success' | 'interactive'): Record<string, string> {
  return {
    'background-color': `var(--color-${colorName})`,
    'color': `var(--color-${colorName}-foreground)`,
    'border': `1px solid var(--color-${colorName})`,
    'padding': 'var(--spacing-2) var(--spacing-4)',
    'border-radius': 'var(--border-radius-md)',
    'font-weight': 'var(--font-weight-medium)',
    'transition': 'all var(--transition-duration-200) var(--transition-timing-out)',
    'cursor': 'pointer'
  };
}

/**
 * Create hover state for theme-aware button
 */
export function createThemeButtonHover(colorName: 'primary' | 'doom' | 'white' | 'critical' | 'warning' | 'success' | 'interactive'): Record<string, string> {
  return {
    'background-color': `var(--color-${colorName}-hover)`,
    'border-color': `var(--color-${colorName}-hover)`,
    'transform': 'translateY(-1px)',
    'box-shadow': 'var(--shadow-md)'
  };
}

/**
 * Create pressed state for theme-aware button
 */
export function createThemeButtonPressed(colorName: 'primary' | 'doom' | 'white' | 'critical' | 'warning' | 'success' | 'interactive'): Record<string, string> {
  return {
    'background-color': `var(--color-${colorName}-pressed)`,
    'border-color': `var(--color-${colorName}-pressed)`,
    'transform': 'translateY(0)',
    'box-shadow': 'var(--shadow-sm)'
  };
}

// Re-export color utilities from design tokens
export { 
  hexToRgb as convertHexToRgb,
  getLuminance,
  getContrastRatio,
  getOptimalTextColor,
  addOpacity,
  darken,
  lighten
} from '../tokens/design-tokens';
