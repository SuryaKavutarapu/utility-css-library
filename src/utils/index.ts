/**
 * Utility functions for the design system
 */

import { DesignTokens, ColorTokens } from '../tokens/design-tokens';
import { TokenManager } from '../tokens/token-manager';

/**
 * Create a new TokenManager instance with custom tokens
 */
export function createTokenManager(tokens?: Partial<DesignTokens>): TokenManager {
  return new TokenManager(tokens);
}

/**
 * Generate CSS custom properties from design tokens
 */
export function generateCSSCustomProperties(tokens: DesignTokens): string {
  const manager = new TokenManager(tokens);
  return manager.toCSSCustomProperties();
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
 * Get color value from color scale
 */
export function getColorValue(colors: ColorTokens, colorName: keyof ColorTokens, shade: number): string {
  const colorScale = colors[colorName];
  if (typeof colorScale === 'object' && colorScale !== null) {
    return (colorScale as any)[shade] || '';
  }
  return typeof colorScale === 'string' ? colorScale : '';
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
 * Merge design tokens with defaults
 */
export function mergeTokens(base: DesignTokens, override: Partial<DesignTokens>): DesignTokens {
  return {
    ...base,
    ...override,
    colors: { ...base.colors, ...override.colors },
    typography: { ...base.typography, ...override.typography },
    spacing: { ...base.spacing, ...override.spacing },
    shadows: { ...base.shadows, ...override.shadows },
    borders: { ...base.borders, ...override.borders },
    transitions: { ...base.transitions, ...override.transitions },
    breakpoints: { ...base.breakpoints, ...override.breakpoints },
    zIndex: { ...base.zIndex, ...override.zIndex },
  };
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
