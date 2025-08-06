/**
 * Main entry point for the Configurable Design System
 * Exports design tokens, utilities, theme manager, and icon system
 */

// Import styles
import './styles/main.scss';

// Import and initialize theme system
import { themeManager } from './tokens/theme-manager';
import { TokenManager } from './tokens/token-manager';

// Import icon system
import MaterialIcons from '@mdi/js';
import { IconUtils } from './icons';

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

// Export icon system
export { 
  Icon, 
  IconFactory, 
  IconUtils, 
  IconSet, 
  ICON_SETS,
  ICON_CATEGORIES,
  ICON_SIZES,
  ICON_COLORS,
  POPULAR_ICONS,
  MaterialIcons
} from './icons';

export type {
  IconConfig,
  IconSize,
  IconColor,
  IconCategory,
  IconMetadata
} from './icons';

// Simple exports to ensure compilation works
export const VERSION = '1.0.0';

// Create global token manager instance
const tokenManager = new TokenManager();

// Export a function to initialize the design system
export async function initializeDesignSystem(): Promise<{ 
  themeManager: typeof themeManager; 
  tokenManager: TokenManager;
  icons: typeof MaterialIcons;
}> {
  console.log('🎨 Design System initializing...');
  console.log('📦 Version:', VERSION);
  
  console.log('✅ CSS utilities loaded');
  console.log('🎯 Theme system ready');
  console.log('🎨 Icon system ready - 7400+ Material Design Icons available');
  console.log('🌓 Current theme:', themeManager.getCurrentTheme(), themeManager.getCurrentMode());
  console.log('🚀 Design System initialized successfully!');
  
  return { themeManager, tokenManager, icons: MaterialIcons };
}

// Auto-initialize when in browser and create global DesignSystem object
if (typeof window !== 'undefined') {
  initializeDesignSystem().then(() => {
    // Make themeManager globally available for easy access
    (window as any).themeManager = themeManager;
    
    // Create the DesignSystem global object that demo scripts expect
    (window as any).DesignSystem = {
      themeManager,
      tokenManager,
      MaterialIcons,
      IconUtils,
      VERSION,
      initialize: initializeDesignSystem,
      isReady: true
    };
    
    console.log('🌍 DesignSystem attached to window object');
    console.log('📦 Available:', Object.keys((window as any).DesignSystem));
    console.log('💫 All systems ready - Theme switching available!');
  });
}
