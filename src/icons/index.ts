/**
 * Material Design Icons Library
 * Complete icon system with 7400+ Material Design Icons
 */

// Registry and configuration imports
import {
  ICON_CATEGORIES,
  ICON_SIZES,
  ICON_COLORS,
  POPULAR_ICONS,
  getAllIconNames,
  getIconPath,
  categorizeIcon,
  getIconsByCategory,
  searchIcons,
  createIconRegistry
} from './icon-registry';

// Core imports
import { Icon, IconFactory } from './Icon';
import { IconUtils, IconSet, ICON_SETS } from './icon-utils';

// Core exports
export { Icon, IconFactory } from './Icon';
export { IconUtils, IconSet, ICON_SETS } from './icon-utils';

// Registry and configuration exports
export {
  ICON_CATEGORIES,
  ICON_SIZES,
  ICON_COLORS,
  POPULAR_ICONS,
  getAllIconNames,
  getIconPath,
  categorizeIcon,
  getIconsByCategory,
  searchIcons,
  createIconRegistry
} from './icon-registry';

// Type exports
export type {
  IconConfig,
  IconSize,
  IconColor,
  IconCategory,
  IconMetadata
} from './icon-registry';

/**
 * Global icon API for easy access
 */
export const MaterialIcons = {
  // Create icon instances
  create: (iconName: string, config?: any) => new Icon(iconName, config),
  
  // Factory methods
  navigation: IconFactory.navigation,
  action: IconFactory.action,
  status: IconFactory.status,
  decorative: IconFactory.decorative,
  loading: IconFactory.loading,
  
  // Utility methods
  search: searchIcons,
  getByCategory: getIconsByCategory,
  getAllNames: getAllIconNames,
  exists: IconUtils.iconExists,
  
  // Icon sets
  sets: ICON_SETS,
  
  // Categories
  categories: ICON_CATEGORIES,
  
  // Popular collections
  popular: POPULAR_ICONS
};

// Make available globally
if (typeof window !== 'undefined') {
  (window as any).MaterialIcons = MaterialIcons;
}

// Default export
export default MaterialIcons;
