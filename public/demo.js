// Demo script for testing Material Icons integration
document.addEventListener('DOMContentLoaded', function() {
  console.log('🎨 Design System Demo Loaded');
  
  // Test Material Icons if available
  if (typeof window.DesignSystem !== 'undefined' && window.DesignSystem.Icon) {
    console.log('✅ Material Icons system available');
    
    // Add some dynamic icons for testing
    try {
      const container = document.querySelector('.demo-section:last-child');
      if (container) {
        const dynamicDemo = document.createElement('div');
        dynamicDemo.innerHTML = `
          <h3 class="fallback-text-primary" style="margin: 2rem 0 1rem 0;">Dynamic Icon Creation (JavaScript)</h3>
          <div id="dynamic-icons" style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
            <!-- Icons will be created here by JavaScript -->
          </div>
          <button id="add-icon-btn" class="btn btn-primary" style="margin-bottom: 1rem;">
            Add Random Icon
          </button>
        `;
        container.appendChild(dynamicDemo);
        
        const iconsContainer = document.getElementById('dynamic-icons');
        const addIconBtn = document.getElementById('add-icon-btn');
        
        const iconNames = ['star', 'favorite', 'thumb_up', 'lightbulb', 'rocket_launch', 'psychology', 'auto_awesome'];
        const colors = ['primary', 'success', 'warning', 'critical', 'interactive'];
        
        addIconBtn.addEventListener('click', function() {
          const randomIcon = iconNames[Math.floor(Math.random() * iconNames.length)];
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          
          const icon = window.DesignSystem.Icon.create(randomIcon, {
            size: 'lg',
            color: randomColor,
            interactive: true,
            title: `${randomIcon} (${randomColor})`
          });
          
          iconsContainer.appendChild(icon);
        });
        
        // Add initial icons
        iconNames.slice(0, 3).forEach((iconName, index) => {
          const icon = window.DesignSystem.Icon.create(iconName, {
            size: 'lg',
            color: colors[index],
            interactive: true,
            title: iconName
          });
          iconsContainer.appendChild(icon);
        });
      }
    } catch (error) {
      console.warn('⚠️ Could not create dynamic icons demo:', error);
    }
  } else {
    console.log('⚠️ Material Icons system not available');
  }
  
  // Add theme toggle functionality
  const themeToggle = document.querySelector('[data-theme-toggle]');
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const newTheme = isDark ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      
      // Update the toggle icon
      themeToggle.textContent = isDark ? 'dark_mode' : 'light_mode';
      themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'dark' : 'light'} mode`);
      
      console.log(`🌓 Theme switched to: ${newTheme}`);
    });
  }
  
  // Add some interactive examples
  const interactiveIcons = document.querySelectorAll('.material-icon--interactive');
  interactiveIcons.forEach(icon => {
    icon.addEventListener('click', function() {
      console.log(`🎯 Clicked icon: ${this.textContent}`);
      
      // Add a little animation
      this.style.transform = 'scale(1.2)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  });
  
  console.log(`📊 Found ${interactiveIcons.length} interactive icons`);
});
