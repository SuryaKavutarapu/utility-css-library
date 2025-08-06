/**
 * Material Design Icon Component
 * Renders SVG icons from the Material Design Icons library
 */

import { IconConfig, IconSize, IconColor, getIconPath, ICON_SIZES, ICON_COLORS } from './icon-registry';

/**
 * Icon component class for creating and managing Material Design Icons
 */
export class Icon {
  private element: SVGElement;
  private config: Required<IconConfig>;

  constructor(iconName: string, config: IconConfig = {}) {
    // Set default configuration
    this.config = {
      size: config.size || ICON_SIZES.MD,
      color: config.color || ICON_COLORS.INHERIT,
      className: config.className || '',
      title: config.title || iconName,
      ariaLabel: config.ariaLabel || iconName,
      interactive: config.interactive || false,
      rotate: config.rotate || 0,
      flip: config.flip || undefined as any
    };

    // Create the SVG element
    this.element = this.createSVGElement(iconName);
    this.applyConfiguration();
  }

  /**
   * Create the base SVG element
   */
  private createSVGElement(iconName: string): SVGElement {
    console.log(`🔧 Creating SVG for icon: ${iconName}`);
    const pathData = getIconPath(iconName);
    console.log(`🔧 Path data for ${iconName}:`, pathData ? `${pathData.substring(0, 50)}...` : 'NULL');
    
    if (!pathData) {
      console.warn(`Icon "${iconName}" not found in Material Design Icons`);
      // Return a placeholder icon
      return this.createPlaceholderIcon(iconName);
    }

    // Create SVG element
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('class', 'mdi-icon');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-hidden', 'true');

    // Create path element
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData);
    path.setAttribute('fill', 'currentColor');

    svg.appendChild(path);
    console.log(`✅ SVG created for ${iconName}:`, svg.outerHTML.substring(0, 100) + '...');
    return svg;
  }

  /**
   * Create a placeholder icon for missing icons
   */
  private createPlaceholderIcon(iconName: string): SVGElement {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('class', 'mdi-icon mdi-icon--placeholder');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-hidden', 'true');

    // Create a simple question mark path
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M10,19H13V22H10V19M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,6A4,4 0 0,0 8,10H10A2,2 0 0,1 12,8A2,2 0 0,1 14,10C14,12 11,11.75 11,15H13C13,12.75 16,12.5 16,10A4,4 0 0,0 12,6Z');
    path.setAttribute('fill', 'currentColor');

    svg.appendChild(path);
    svg.setAttribute('title', `Icon "${iconName}" not found`);
    return svg;
  }

  /**
   * Apply configuration to the SVG element
   */
  private applyConfiguration(): void {
    const { size, color, className, title, ariaLabel, interactive, rotate, flip } = this.config;

    // Apply size class
    this.element.classList.add(`mdi-icon--${size}`);

    // Apply color class
    if (color !== ICON_COLORS.INHERIT) {
      this.element.classList.add(`mdi-icon--${color}`);
    }

    // Apply custom className
    if (className) {
      this.element.classList.add(...className.split(' '));
    }

    // Apply title and aria-label
    if (title) {
      this.element.setAttribute('title', title);
    }

    if (ariaLabel) {
      this.element.setAttribute('aria-label', ariaLabel);
      this.element.setAttribute('aria-hidden', 'false');
    }

    // Apply interactive class
    if (interactive) {
      this.element.classList.add('mdi-icon--interactive');
    }

    // Apply transformations
    const transforms: string[] = [];
    
    if (rotate !== 0) {
      transforms.push(`rotate(${rotate}deg)`);
    }

    if (flip) {
      switch (flip) {
        case 'horizontal':
          transforms.push('scaleX(-1)');
          break;
        case 'vertical':
          transforms.push('scaleY(-1)');
          break;
        case 'both':
          transforms.push('scaleX(-1) scaleY(-1)');
          break;
      }
    }

    if (transforms.length > 0) {
      this.element.style.transform = transforms.join(' ');
    }
  }

  /**
   * Update icon configuration
   */
  public updateConfig(newConfig: Partial<IconConfig>): void {
    this.config = { ...this.config, ...newConfig };
    
    // Remove old classes
    this.element.setAttribute('class', 'mdi-icon');
    
    // Reapply configuration
    this.applyConfiguration();
  }

  /**
   * Get the SVG element
   */
  public getElement(): SVGElement {
    return this.element;
  }

  /**
   * Get the outer HTML of the icon
   */
  public toString(): string {
    return this.element.outerHTML;
  }

  /**
   * Clone the icon with optional new configuration
   */
  public clone(newConfig?: Partial<IconConfig>): Icon {
    const iconName = this.element.getAttribute('title') || 'unknown';
    const config = newConfig ? { ...this.config, ...newConfig } : this.config;
    return new Icon(iconName, config);
  }

  /**
   * Static method to create an icon
   */
  public static create(iconName: string, config?: IconConfig): Icon {
    return new Icon(iconName, config);
  }

  /**
   * Static method to create an icon element directly
   */
  public static createElement(iconName: string, config?: IconConfig): SVGElement {
    return new Icon(iconName, config).getElement();
  }

  /**
   * Static method to create icon HTML string
   */
  public static createHTML(iconName: string, config?: IconConfig): string {
    return new Icon(iconName, config).toString();
  }
}

/**
 * Icon factory for common icon creation patterns
 */
export class IconFactory {
  /**
   * Create a navigation icon
   */
  public static navigation(iconName: string, size: IconSize = ICON_SIZES.MD): Icon {
    return new Icon(iconName, {
      size,
      color: ICON_COLORS.INHERIT,
      interactive: true,
      className: 'mdi-icon--navigation'
    });
  }

  /**
   * Create an action icon
   */
  public static action(iconName: string, color: IconColor = ICON_COLORS.PRIMARY): Icon {
    return new Icon(iconName, {
      size: ICON_SIZES.MD,
      color,
      interactive: true,
      className: 'mdi-icon--action'
    });
  }

  /**
   * Create a status icon
   */
  public static status(iconName: string, color: IconColor): Icon {
    return new Icon(iconName, {
      size: ICON_SIZES.SM,
      color,
      className: 'mdi-icon--status'
    });
  }

  /**
   * Create a decorative icon
   */
  public static decorative(iconName: string, size: IconSize = ICON_SIZES.LG): Icon {
    return new Icon(iconName, {
      size,
      color: ICON_COLORS.SECONDARY,
      className: 'mdi-icon--decorative'
    });
  }

  /**
   * Create a loading/spinner icon
   */
  public static loading(size: IconSize = ICON_SIZES.MD): Icon {
    return new Icon('loading', {
      size,
      color: ICON_COLORS.PRIMARY,
      className: 'mdi-icon--loading'
    });
  }
}

// Export icon utilities
export type { IconConfig, IconSize, IconColor } from './icon-registry';
export { ICON_SIZES, ICON_COLORS } from './icon-registry';
