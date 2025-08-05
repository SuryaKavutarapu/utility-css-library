/**
 * Main entry point for the Configurable Design System
 * Exports design tokens, utilities, theme manager, and TypeScript types
 */

// Import styles
import './styles/main.scss';

// Import and initialize theme system
import { themeManager } from './tokens/theme-manager';
import { TokenManager } from './tokens/token-manager';

// Import icon system
import { initializeMaterialIcons } from './components/Icon';

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
  IconHelpers,
  initializeMaterialIcons
} from './components/Icon';

export type { IconConfig } from './components/icons';
export { 
  IconUtils, 
  IconSizes, 
  IconColors, 
  CommonIcons,
  type CommonIconName 
} from './components/icons';

// Simple exports to ensure compilation works
export const VERSION = '1.0.0';

// Create global token manager instance
const tokenManager = new TokenManager();

// Export a function to initialize the design system
export async function initializeDesignSystem(): Promise<{ 
  themeManager: typeof themeManager; 
  tokenManager: TokenManager;
  iconsReady: boolean;
}> {
  console.log('🎨 Design System initializing...');
  console.log('📦 Version:', VERSION);
  
  // Initialize Material Icons
  let iconsReady = false;
  try {
    await initializeMaterialIcons();
    iconsReady = true;
    console.log('🎯 Material Icons loaded successfully');
  } catch (error) {
    console.warn('⚠️ Failed to load Material Icons:', error);
  }
  
  console.log('✅ CSS utilities loaded');
  console.log('🎯 Theme system ready');
  console.log('🌓 Current theme:', themeManager.getCurrentTheme(), themeManager.getCurrentMode());
  console.log('🚀 Design System initialized successfully!');
  
  return { themeManager, tokenManager, iconsReady };
}

// Auto-initialize when in browser
if (typeof window !== 'undefined') {
  initializeDesignSystem().then(({ iconsReady }) => {
    // Make themeManager globally available for easy access
    (window as any).themeManager = themeManager;
    
    if (iconsReady) {
      console.log('💫 All systems ready - Theme switching and Material Icons available!');
    }
  });
}
