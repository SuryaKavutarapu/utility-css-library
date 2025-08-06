/**
 * Material Design Icons Registry
 * Comprehensive icon system with all 7400+ Material Design Icons
 */

// Import icon path data from @mdi/js
import * as mdiIcons from '@mdi/js';

/**
 * Icon categories based on Material Design Icons organization
 */
export const ICON_CATEGORIES = {
  ACTION: 'action',
  ALERT: 'alert', 
  AV: 'av',
  COMMUNICATION: 'communication',
  CONTENT: 'content',
  DEVICE: 'device',
  EDITOR: 'editor',
  FILE: 'file',
  HARDWARE: 'hardware',
  IMAGE: 'image',
  MAPS: 'maps',
  NAVIGATION: 'navigation',
  NOTIFICATION: 'notification',
  PLACES: 'places',
  SOCIAL: 'social',
  TOGGLE: 'toggle',
  TRANSPORTATION: 'transportation',
  // Extended categories
  ACCOUNT: 'account',
  ARROW: 'arrow',
  CALENDAR: 'calendar',
  CHART: 'chart',
  CLOUD: 'cloud',
  DATABASE: 'database',
  FOOD: 'food',
  GAME: 'game',
  HOME: 'home',
  MEDICAL: 'medical',
  MUSIC: 'music',
  SECURITY: 'security',
  SHOPPING: 'shopping',
  WEATHER: 'weather',
  GENERAL: 'general'
} as const;

export type IconCategory = typeof ICON_CATEGORIES[keyof typeof ICON_CATEGORIES];

/**
 * Icon size variants
 */
export const ICON_SIZES = {
  XS: 'xs',   // 12px
  SM: 'sm',   // 16px
  MD: 'md',   // 24px (default)
  LG: 'lg',   // 32px
  XL: 'xl',   // 48px
  '2XL': '2xl' // 64px
} as const;

export type IconSize = typeof ICON_SIZES[keyof typeof ICON_SIZES];

/**
 * Icon color variants based on design system
 */
export const ICON_COLORS = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  WARNING: 'warning',
  CRITICAL: 'critical',
  INTERACTIVE: 'interactive',
  DOOM: 'doom',
  WHITE: 'white',
  INHERIT: 'inherit',
  CURRENT: 'current'
} as const;

export type IconColor = typeof ICON_COLORS[keyof typeof ICON_COLORS];

/**
 * Icon configuration interface
 */
export interface IconConfig {
  size?: IconSize;
  color?: IconColor;
  className?: string;
  title?: string;
  ariaLabel?: string;
  interactive?: boolean;
  rotate?: number;
  flip?: 'horizontal' | 'vertical' | 'both';
}

/**
 * Icon metadata interface
 */
export interface IconMetadata {
  name: string;
  category: IconCategory;
  tags: string[];
  aliases: string[];
  deprecated?: boolean;
  version?: string;
}

/**
 * Extract all icon names from @mdi/js
 */
export function getAllIconNames(): string[] {
  return Object.keys(mdiIcons)
    .filter(key => key.startsWith('mdi'))
    .sort();
}

/**
 * Get icon path data by name
 */
export function getIconPath(iconName: string): string | null {
  // If the icon name already starts with 'mdi', use it directly
  if (iconName.startsWith('mdi')) {
    const mdiKey = iconName as keyof typeof mdiIcons;
    return mdiIcons[mdiKey] || null;
  }
  
  // Convert kebab-case to camelCase with mdi prefix for legacy names
  const camelName = iconName
    .split('-')
    .map((word, index) => index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
  
  const mdiKey = `mdi${camelName.charAt(0).toUpperCase() + camelName.slice(1)}` as keyof typeof mdiIcons;
  
  return mdiIcons[mdiKey] || null;
}

/**
 * Categorize icons based on their names and common patterns
 */
export function categorizeIcon(iconName: string): IconCategory {
  const name = iconName.toLowerCase();
  
  // Account and user related
  if (name.includes('account') || name.includes('user') || name.includes('person') || 
      name.includes('profile') || name.includes('avatar')) {
    return ICON_CATEGORIES.ACCOUNT;
  }
  
  // Arrow and navigation
  if (name.includes('arrow') || name.includes('chevron') || name.includes('navigate')) {
    return ICON_CATEGORIES.ARROW;
  }
  
  // Calendar and time
  if (name.includes('calendar') || name.includes('clock') || name.includes('time') || 
      name.includes('schedule') || name.includes('date')) {
    return ICON_CATEGORIES.CALENDAR;
  }
  
  // Charts and analytics
  if (name.includes('chart') || name.includes('graph') || name.includes('analytics') || 
      name.includes('trending') || name.includes('stats')) {
    return ICON_CATEGORIES.CHART;
  }
  
  // Cloud and network
  if (name.includes('cloud') || name.includes('server') || name.includes('network') || 
      name.includes('wifi') || name.includes('signal')) {
    return ICON_CATEGORIES.CLOUD;
  }
  
  // Communication
  if (name.includes('message') || name.includes('chat') || name.includes('mail') || 
      name.includes('phone') || name.includes('comment') || name.includes('talk')) {
    return ICON_CATEGORIES.COMMUNICATION;
  }
  
  // Database and storage
  if (name.includes('database') || name.includes('storage') || name.includes('backup') || 
      name.includes('sync') || name.includes('download') || name.includes('upload')) {
    return ICON_CATEGORIES.DATABASE;
  }
  
  // Device and hardware
  if (name.includes('phone') || name.includes('tablet') || name.includes('computer') || 
      name.includes('laptop') || name.includes('monitor') || name.includes('device')) {
    return ICON_CATEGORIES.DEVICE;
  }
  
  // File operations
  if (name.includes('file') || name.includes('folder') || name.includes('document') || 
      name.includes('pdf') || name.includes('attachment')) {
    return ICON_CATEGORIES.FILE;
  }
  
  // Food and dining
  if (name.includes('food') || name.includes('restaurant') || name.includes('coffee') || 
      name.includes('pizza') || name.includes('drink')) {
    return ICON_CATEGORIES.FOOD;
  }
  
  // Gaming
  if (name.includes('game') || name.includes('controller') || name.includes('dice') || 
      name.includes('cards') || name.includes('puzzle')) {
    return ICON_CATEGORIES.GAME;
  }
  
  // Home and building
  if (name.includes('home') || name.includes('house') || name.includes('building') || 
      name.includes('office') || name.includes('room')) {
    return ICON_CATEGORIES.HOME;
  }
  
  // Maps and location
  if (name.includes('map') || name.includes('location') || name.includes('place') || 
      name.includes('pin') || name.includes('marker') || name.includes('gps')) {
    return ICON_CATEGORIES.MAPS;
  }
  
  // Medical and health
  if (name.includes('medical') || name.includes('health') || name.includes('hospital') || 
      name.includes('heart') || name.includes('pill') || name.includes('doctor')) {
    return ICON_CATEGORIES.MEDICAL;
  }
  
  // Music and audio
  if (name.includes('music') || name.includes('audio') || name.includes('sound') || 
      name.includes('volume') || name.includes('speaker') || name.includes('headphone')) {
    return ICON_CATEGORIES.MUSIC;
  }
  
  // Navigation UI
  if (name.includes('menu') || name.includes('close') || name.includes('back') || 
      name.includes('forward') || name.includes('next') || name.includes('previous')) {
    return ICON_CATEGORIES.NAVIGATION;
  }
  
  // Notifications and alerts
  if (name.includes('notification') || name.includes('alert') || name.includes('warning') || 
      name.includes('error') || name.includes('bell')) {
    return ICON_CATEGORIES.NOTIFICATION;
  }
  
  // Security
  if (name.includes('security') || name.includes('lock') || name.includes('key') || 
      name.includes('shield') || name.includes('password')) {
    return ICON_CATEGORIES.SECURITY;
  }
  
  // Shopping and commerce
  if (name.includes('shop') || name.includes('cart') || name.includes('store') || 
      name.includes('basket') || name.includes('purchase') || name.includes('payment')) {
    return ICON_CATEGORIES.SHOPPING;
  }
  
  // Social media
  if (name.includes('share') || name.includes('like') || name.includes('favorite') || 
      name.includes('social') || name.includes('twitter') || name.includes('facebook')) {
    return ICON_CATEGORIES.SOCIAL;
  }
  
  // Transportation
  if (name.includes('car') || name.includes('bus') || name.includes('train') || 
      name.includes('plane') || name.includes('bike') || name.includes('transport')) {
    return ICON_CATEGORIES.TRANSPORTATION;
  }
  
  // Weather
  if (name.includes('weather') || name.includes('sun') || name.includes('rain') || 
      name.includes('cloud') || name.includes('snow') || name.includes('storm')) {
    return ICON_CATEGORIES.WEATHER;
  }
  
  // Default to general
  return ICON_CATEGORIES.GENERAL;
}

/**
 * Create icon registry with all available icons
 */
export function createIconRegistry(): Map<string, IconMetadata> {
  const registry = new Map<string, IconMetadata>();
  const allIcons = getAllIconNames();
  
  allIcons.forEach(iconName => {
    const category = categorizeIcon(iconName);
    const metadata: IconMetadata = {
      name: iconName,
      category,
      tags: iconName.split('-'),
      aliases: [],
      version: '1.0.0'
    };
    
    registry.set(iconName, metadata);
  });
  
  return registry;
}

/**
 * Get icons by category
 */
export function getIconsByCategory(category: IconCategory): string[] {
  const registry = createIconRegistry();
  return Array.from(registry.values())
    .filter(icon => icon.category === category)
    .map(icon => icon.name);
}

/**
 * Search icons by name or tags
 */
export function searchIcons(query: string): string[] {
  const registry = createIconRegistry();
  const searchTerm = query.toLowerCase();
  
  return Array.from(registry.values())
    .filter(icon => 
      icon.name.includes(searchTerm) || 
      icon.tags.some(tag => tag.includes(searchTerm))
    )
    .map(icon => icon.name);
}

// Export the complete registry
export const ICON_REGISTRY = createIconRegistry();

// Export popular icon collections for quick access
export const POPULAR_ICONS = {
  COMMON: [
    'mdiHome', 'mdiAccount', 'mdiCog', 'mdiMagnify', 'mdiClose', 'mdiMenu', 'mdiArrowLeft', 'mdiArrowRight',
    'mdiCheck', 'mdiPlus', 'mdiMinus', 'mdiPencil', 'mdiDelete', 'mdiDownload', 'mdiUpload', 'mdiShare'
  ],
  NAVIGATION: [
    'mdiArrowUp', 'mdiArrowDown', 'mdiArrowLeft', 'mdiArrowRight', 'mdiChevronUp', 'mdiChevronDown',
    'mdiChevronLeft', 'mdiChevronRight', 'mdiMenu', 'mdiClose', 'mdiArrowLeft', 'mdiArrowRight'
  ],
  ACTIONS: [
    'mdiPlus', 'mdiMinus', 'mdiPencil', 'mdiDelete', 'mdiContentSave', 'mdiCancel', 'mdiCheck', 'mdiRefresh',
    'mdiContentCopy', 'mdiContentPaste', 'mdiContentCut', 'mdiUndo', 'mdiRedo', 'mdiPrinter'
  ],
  COMMUNICATION: [
    'mdiEmail', 'mdiPhone', 'mdiMessage', 'mdiChat', 'mdiVideo', 'mdiMicrophone', 'mdiBell',
    'mdiBell', 'mdiComment', 'mdiReply'
  ],
  MEDIA: [
    'mdiPlay', 'mdiPause', 'mdiStop', 'mdiSkipNext', 'mdiSkipPrevious', 'mdiVolumeHigh', 'mdiVolumeMedium',
    'mdiVolumeOff', 'mdiImage', 'mdiVideo', 'mdiCamera'
  ]
};
