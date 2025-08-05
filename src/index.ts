/**
 * Main entry point for the Configurable Design System
 * Exports design tokens, utilities, theme manager, and TypeScript types
 */

// Import styles
import './styles/main.scss';

// Import and initialize theme system
import { themeManager } from './tokens/theme-manager';
import { TokenManager } from './tokens/token-manager';

// Export theme-related functionality
export { 
  defaultTokens, 
  darkTokens,
  themes, 
  getThemeTokens,
  type DesignTokens,
  type ThemeConfig 
} from './tokens/design-tokens';
export { themeManager, ThemeManager } from './tokens/theme-manager';
export { TokenManager } from './tokens/token-manager';

// Simple exports to ensure compilation works
export const VERSION = '1.0.0';

// Create global token manager instance
const tokenManager = new TokenManager();

// Export a function to initialize the design system
export function initializeDesignSystem(): { themeManager: typeof themeManager; tokenManager: TokenManager } {
  console.log('🎨 Design System initialized successfully!');
  console.log('📦 Version:', VERSION);
  console.log('✅ CSS utilities loaded');
  console.log('🎯 Theme system ready');
  console.log('🌓 Current theme:', themeManager.getCurrentTheme(), themeManager.getCurrentMode());
  
  return { themeManager, tokenManager };
}

// Auto-initialize when in browser
if (typeof window !== 'undefined') {
  initializeDesignSystem();
}
