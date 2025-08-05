import { IconConfig, IconUtils, CommonIcons, CommonIconName } from './icons';

// Re-export IconConfig for convenience
export type { IconConfig };

/**
 * Material Icon factory for creating themed icons without any framework dependencies
 */
export class Icon {
  /**
   * Create a basic Material Icon element
   */
  static create(name: string | CommonIconName, config: IconConfig = {}): HTMLElement {
    // Resolve common icon names
    const iconName = Object.prototype.hasOwnProperty.call(CommonIcons, name) 
      ? CommonIcons[name as CommonIconName] 
      : name;

    return IconUtils.createIcon(iconName, config);
  }

  /**
   * Create an accessible icon with proper ARIA labels
   */
  static createAccessible(
    name: string | CommonIconName, 
    label: string, 
    config: IconConfig = {}
  ): HTMLElement {
    const iconName = Object.prototype.hasOwnProperty.call(CommonIcons, name) 
      ? CommonIcons[name as CommonIconName] 
      : name;

    return IconUtils.createAccessibleIcon(iconName, label, config);
  }

  /**
   * Create a theme toggle icon that changes based on current mode
   */
  static createThemeToggle(isDark: boolean = false, config: IconConfig = {}): HTMLElement {
    const iconName = isDark ? 'light_mode' : 'dark_mode';
    const defaultConfig: IconConfig = {
      color: 'interactive',
      interactive: true,
      ...config
    };

    const icon = this.create(iconName, defaultConfig);
    icon.setAttribute('data-theme-toggle', 'true');
    icon.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
    icon.setAttribute('role', 'button');
    icon.setAttribute('tabindex', '0');

    return icon;
  }

  /**
   * Create a status icon for different states
   */
  static createStatus(
    status: 'success' | 'warning' | 'error' | 'info', 
    config: IconConfig = {}
  ): HTMLElement {
    const iconMap = {
      success: 'check_circle',
      warning: 'warning',
      error: 'error',
      info: 'info'
    };
    
    const colorMap = {
      success: 'success',
      warning: 'warning',
      error: 'critical',
      info: 'interactive'
    } as const;

    const defaultConfig: IconConfig = {
      color: colorMap[status],
      ...config
    };

    return this.create(iconMap[status], defaultConfig);
  }

  /**
   * Create a navigation icon
   */
  static createNavigation(
    direction: 'back' | 'forward' | 'up' | 'down' | 'menu' | 'close',
    config: IconConfig = {}
  ): HTMLElement {
    const iconMap = {
      back: 'arrow_back',
      forward: 'arrow_forward', 
      up: 'expand_less',
      down: 'expand_more',
      menu: 'menu',
      close: 'close'
    };

    const defaultConfig: IconConfig = {
      color: 'primary',
      interactive: config.interactive ?? true,
      ...config
    };

    return this.create(iconMap[direction], defaultConfig);
  }

  /**
   * Create an action icon
   */
  static createAction(
    action: 'add' | 'edit' | 'delete' | 'save' | 'search' | 'filter' | 'more',
    config: IconConfig = {}
  ): HTMLElement {
    const iconMap = {
      add: 'add',
      edit: 'edit',
      delete: 'delete',
      save: 'save',
      search: 'search',
      filter: 'filter_list',
      more: 'more_vert'
    };

    const defaultConfig: IconConfig = {
      color: 'primary',
      interactive: true,
      ...config
    };

    return this.create(iconMap[action], defaultConfig);
  }
}

/**
 * Icon helper functions for common operations
 */
export class IconHelpers {
  /**
   * Add an icon to the beginning of an element
   */
  static prependIcon(
    element: HTMLElement, 
    iconName: string | CommonIconName, 
    config: IconConfig = {}
  ): HTMLElement {
    const icon = Icon.create(iconName, config);
    element.prepend(icon);
    return icon;
  }

  /**
   * Add an icon to the end of an element
   */
  static appendIcon(
    element: HTMLElement, 
    iconName: string | CommonIconName, 
    config: IconConfig = {}
  ): HTMLElement {
    const icon = Icon.create(iconName, config);
    element.append(icon);
    return icon;
  }

  /**
   * Replace element content with an icon
   */
  static replaceWithIcon(
    element: HTMLElement, 
    iconName: string | CommonIconName, 
    config: IconConfig = {}
  ): void {
    const icon = Icon.create(iconName, config);
    element.innerHTML = '';
    element.appendChild(icon);
  }

  /**
   * Create a button with an icon
   */
  static createIconButton(
    iconName: string | CommonIconName,
    label: string,
    config: IconConfig = {}
  ): HTMLButtonElement {
    const button = document.createElement('button');
    button.className = 'btn btn-icon';
    button.setAttribute('aria-label', label);
    button.setAttribute('title', label);

    const icon = Icon.create(iconName, { 
      interactive: false, // Button handles interaction
      ...config 
    });
    
    button.appendChild(icon);
    return button;
  }

  /**
   * Create a text button with an icon
   */
  static createTextIconButton(
    iconName: string | CommonIconName,
    text: string,
    iconPosition: 'start' | 'end' = 'start',
    config: IconConfig = {}
  ): HTMLButtonElement {
    const button = document.createElement('button');
    button.className = 'btn';

    const icon = Icon.create(iconName, { 
      interactive: false,
      size: 'sm',
      ...config 
    });
    
    const textNode = document.createTextNode(text);

    if (iconPosition === 'start') {
      button.appendChild(icon);
      button.appendChild(textNode);
    } else {
      button.appendChild(textNode);
      button.appendChild(icon);
    }

    return button;
  }

  /**
   * Update theme toggle icon based on current mode
   */
  static updateThemeToggleIcon(icon: HTMLElement, isDark: boolean): void {
    const newIconName = isDark ? 'light_mode' : 'dark_mode';
    icon.textContent = newIconName;
    icon.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
  }

  /**
   * Initialize icons for an entire container
   */
  static initializeContainer(container: HTMLElement = document.body): void {
    // Find all elements with data-icon attribute
    const iconElements = container.querySelectorAll('[data-icon]');
    
    iconElements.forEach((element) => {
      const iconName = element.getAttribute('data-icon');
      const size = element.getAttribute('data-icon-size') as IconConfig['size'] || 'md';
      const color = element.getAttribute('data-icon-color') as IconConfig['color'] || 'inherit';
      const variant = element.getAttribute('data-icon-variant') as IconConfig['variant'] || 'filled';
      const interactive = element.hasAttribute('data-icon-interactive');

      if (iconName) {
        const config: IconConfig = { size, color, variant, interactive };
        IconHelpers.replaceWithIcon(element as HTMLElement, iconName, config);
      }
    });

    // Initialize theme toggle buttons
    const themeToggles = container.querySelectorAll('[data-theme-toggle]');
    themeToggles.forEach((toggle) => {
      toggle.addEventListener('click', () => {
        if ((window as any).themeManager) {
          (window as any).themeManager.toggleMode();
          const isDark = (window as any).themeManager.getCurrentMode() === 'dark';
          IconHelpers.updateThemeToggleIcon(toggle as HTMLElement, isDark);
        }
      });

      toggle.addEventListener('keydown', (e: Event) => {
        const keyEvent = e as KeyboardEvent;
        if (keyEvent.key === 'Enter' || keyEvent.key === ' ') {
          e.preventDefault();
          (toggle as HTMLElement).click();
        }
      });
    });
  }
}

/**
 * Initialize Material Icons system
 */
export async function initializeMaterialIcons(): Promise<void> {
  await IconUtils.initialize();
  
  // Auto-initialize icons when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      IconHelpers.initializeContainer();
    });
  } else {
    IconHelpers.initializeContainer();
  }
}
