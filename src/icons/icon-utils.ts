/**
 * Icon Utilities
 * Helper functions and utilities for working with Material Design Icons
 */

import { Icon, IconFactory } from './Icon';
import { 
  IconConfig, 
  IconCategory, 
  ICON_CATEGORIES, 
  getIconsByCategory, 
  searchIcons, 
  getAllIconNames,
  POPULAR_ICONS
} from './icon-registry';

/**
 * Icon utility class with convenient methods
 */
export class IconUtils {
  /**
   * Render an icon into a DOM element
   */
  public static renderInto(
    container: HTMLElement, 
    iconName: string, 
    config?: IconConfig
  ): Icon {
    const icon = new Icon(iconName, config);
    container.appendChild(icon.getElement());
    return icon;
  }

  /**
   * Replace all icon placeholders in a container
   */
  public static replacePlaceholders(container: HTMLElement): void {
    const placeholders = container.querySelectorAll('[data-icon]');
    console.log(`🔧 Found ${placeholders.length} placeholders to replace`);
    
    placeholders.forEach((placeholder, index) => {
      const iconName = placeholder.getAttribute('data-icon');
      const size = placeholder.getAttribute('data-icon-size') as any;
      const color = placeholder.getAttribute('data-icon-color') as any;
      const className = placeholder.getAttribute('data-icon-class');
      
      console.log(`🔧 Processing placeholder ${index + 1}: iconName="${iconName}", size="${size}", color="${color}"`);
      
      if (iconName) {
        try {
          const icon = new Icon(iconName, {
            size,
            color,
            className: className || undefined
          });
          
          const newElement = icon.getElement();
          console.log(`🔧 Created element for ${iconName}:`, newElement.outerHTML.substring(0, 100) + '...');
          
          if (placeholder.parentNode) {
            placeholder.parentNode.replaceChild(newElement, placeholder);
            console.log(`✅ Replaced placeholder ${index + 1} successfully`);
          } else {
            console.warn(`⚠️ Placeholder ${index + 1} has no parent node`);
          }
        } catch (error) {
          console.error(`❌ Error creating icon for ${iconName}:`, error);
        }
      } else {
        console.warn(`⚠️ Placeholder ${index + 1} has no data-icon attribute`);
      }
    });
    
    console.log(`🔧 Placeholder replacement complete`);
  }

  /**
   * Create an icon sprite for better performance
   */
  public static createSprite(iconNames: string[]): SVGElement {
    const sprite = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    sprite.setAttribute('style', 'display: none;');
    sprite.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    
    iconNames.forEach(iconName => {
      const icon = new Icon(iconName);
      const symbol = document.createElementNS('http://www.w3.org/2000/svg', 'symbol');
      symbol.setAttribute('id', `icon-${iconName}`);
      symbol.setAttribute('viewBox', '0 0 24 24');
      
      // Copy the path from the icon
      const iconElement = icon.getElement();
      const path = iconElement.querySelector('path');
      if (path) {
        symbol.appendChild(path.cloneNode(true));
      }
      
      sprite.appendChild(symbol);
    });
    
    return sprite;
  }

  /**
   * Preload icons for better performance
   */
  public static preloadIcons(iconNames: string[]): Promise<void[]> {
    const promises = iconNames.map(iconName => {
      return new Promise<void>((resolve) => {
        const icon = new Icon(iconName);
        // Just creating the icon preloads it
        resolve();
      });
    });
    
    return Promise.all(promises);
  }

  /**
   * Get icon suggestions based on search term
   */
  public static getSuggestions(searchTerm: string, limit: number = 10): string[] {
    const results = searchIcons(searchTerm);
    return results.slice(0, limit);
  }

  /**
   * Validate if an icon exists
   */
  public static iconExists(iconName: string): boolean {
    const allIcons = getAllIconNames();
    return allIcons.includes(iconName);
  }

  /**
   * Get random icons from a category
   */
  public static getRandomIcons(category?: IconCategory, count: number = 5): string[] {
    const icons = category ? getIconsByCategory(category) : getAllIconNames();
    const shuffled = icons.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  /**
   * Create an icon picker interface
   */
  public static createIconPicker(
    container: HTMLElement,
    onSelect: (iconName: string) => void,
    options: {
      searchable?: boolean;
      categories?: IconCategory[];
      size?: number;
    } = {}
  ): void {
    const { searchable = true, categories, size = 200 } = options;
    
    // Create picker structure
    const picker = document.createElement('div');
    picker.className = 'icon-picker';
    
    // Add search if enabled
    if (searchable) {
      const searchInput = document.createElement('input');
      searchInput.type = 'text';
      searchInput.placeholder = 'Search icons...';
      searchInput.className = 'icon-picker__search';
      
      searchInput.addEventListener('input', (e) => {
        const query = (e.target as HTMLInputElement).value;
        const results = query ? searchIcons(query).slice(0, size) : [];
        updateIconGrid(results);
      });
      
      picker.appendChild(searchInput);
    }
    
    // Create icon grid
    const grid = document.createElement('div');
    grid.className = 'icon-grid icon-picker__grid';
    picker.appendChild(grid);
    
    function updateIconGrid(iconNames: string[]) {
      grid.innerHTML = '';
      
      iconNames.forEach(iconName => {
        const item = document.createElement('div');
        item.className = 'icon-grid-item icon-picker__item';
        
        const icon = new Icon(iconName, { size: 'md' as any });
        const nameSpan = document.createElement('span');
        nameSpan.className = 'icon-name';
        nameSpan.textContent = iconName;
        
        item.appendChild(icon.getElement());
        item.appendChild(nameSpan);
        
        item.addEventListener('click', () => {
          onSelect(iconName);
        });
        
        grid.appendChild(item);
      });
    }
    
    // Initialize with popular icons or category icons
    const initialIcons = categories 
      ? categories.flatMap(cat => getIconsByCategory(cat)).slice(0, size)
      : POPULAR_ICONS.COMMON.slice(0, Math.min(size, POPULAR_ICONS.COMMON.length));
    
    updateIconGrid(initialIcons);
    
    container.appendChild(picker);
  }
}

/**
 * Icon set manager for organizing related icons
 */
export class IconSet {
  private icons: Map<string, Icon> = new Map();
  private name: string;

  constructor(name: string, iconNames: string[] = []) {
    this.name = name;
    iconNames.forEach(iconName => {
      this.add(iconName);
    });
  }

  /**
   * Add an icon to the set
   */
  public add(iconName: string, config?: IconConfig): void {
    const icon = new Icon(iconName, config);
    this.icons.set(iconName, icon);
  }

  /**
   * Get an icon from the set
   */
  public get(iconName: string): Icon | undefined {
    return this.icons.get(iconName);
  }

  /**
   * Remove an icon from the set
   */
  public remove(iconName: string): boolean {
    return this.icons.delete(iconName);
  }

  /**
   * Get all icon names in the set
   */
  public getIconNames(): string[] {
    return Array.from(this.icons.keys());
  }

  /**
   * Get all icons in the set
   */
  public getIcons(): Icon[] {
    return Array.from(this.icons.values());
  }

  /**
   * Create a sprite for this icon set
   */
  public createSprite(): SVGElement {
    return IconUtils.createSprite(this.getIconNames());
  }

  /**
   * Export the icon set as CSS classes
   */
  public toCSSClasses(): string {
    const css: string[] = [];
    
    this.icons.forEach((icon, iconName) => {
      const className = `icon-${iconName.replace(/[^a-zA-Z0-9]/g, '-')}`;
      css.push(`
.${className}::before {
  content: "${icon.toString()}";
}
      `.trim());
    });
    
    return css.join('\n');
  }
}

/**
 * Predefined icon sets for common use cases
 */
export const ICON_SETS = {
  NAVIGATION: new IconSet('navigation', [
    'mdiMenu', 'mdiClose', 'mdiArrowLeft', 'mdiArrowRight', 'mdiArrowUp', 'mdiArrowDown',
    'mdiChevronLeft', 'mdiChevronRight', 'mdiChevronUp', 'mdiChevronDown', 'mdiHome'
  ]),
  
  ACTIONS: new IconSet('actions', [
    'mdiPlus', 'mdiMinus', 'mdiPencil', 'mdiDelete', 'mdiContentSave', 'mdiCancel', 'mdiCheck', 'mdiClose',
    'mdiRefresh', 'mdiMagnify', 'mdiFilter', 'mdiSort', 'mdiContentCopy', 'mdiShare'
  ]),
  
  COMMUNICATION: new IconSet('communication', [
    'mdiEmail', 'mdiPhone', 'mdiMessage', 'mdiChat', 'mdiVideo', 'mdiMicrophone', 'mdiSpeaker',
    'mdiBell', 'mdiBell', 'mdiComment', 'mdiReply', 'mdiArrowRight'
  ]),
  
  MEDIA: new IconSet('media', [
    'mdiPlay', 'mdiPause', 'mdiStop', 'mdiSkipNext', 'mdiSkipPrevious', 'mdiVolumeHigh',
    'mdiVolumeLow', 'mdiVolumeOff', 'mdiImage', 'mdiVideo', 'mdiCamera', 'mdiMusic'
  ]),
  
  FILES: new IconSet('files', [
    'mdiFile', 'mdiFolder', 'mdiFolderOpen', 'mdiDownload', 'mdiUpload', 'mdiAttachment',
    'mdiFilePdf', 'mdiFileDocument', 'mdiImage', 'mdiArchive', 'mdiTrashCan', 'mdiRestore'
  ]),
  
  STATUS: new IconSet('status', [
    'mdiCheckCircle', 'mdiAlertCircle', 'mdiInformation', 'mdiHelpCircle', 'mdiCloseCircle',
    'mdiLoading', 'mdiCheck', 'mdiAlert', 'mdiCloseCircle', 'mdiClock'
  ])
};

// Export types
export type { IconConfig, IconCategory } from './icon-registry';
export { ICON_CATEGORIES, POPULAR_ICONS } from './icon-registry';
export { Icon, IconFactory } from './Icon';
