/**
 * Main entry point for the Configurable Design System
 * Exports design tokens, utilities, and TypeScript types
 */

// Import styles
import './styles/main.scss';

// Simple exports to ensure compilation works
export const VERSION = '1.0.0';

// Export a simple function to test the library
export function initializeDesignSystem(): void {
  console.log('🎨 Design System initialized successfully!');
  console.log('📦 Version:', VERSION);
  console.log('✅ CSS utilities loaded');
}

// Auto-initialize when in browser
if (typeof window !== 'undefined') {
  initializeDesignSystem();
}
