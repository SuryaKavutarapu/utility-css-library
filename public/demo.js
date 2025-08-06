// Demo script for the Utility CSS Library
document.addEventListener('DOMContentLoaded', function() {
  console.log('🎨 Utility CSS Library Demo Loaded');
  
  // Initialize with a more robust check
  initializeDesignSystem();
});

function initializeDesignSystem() {
  // Check if Design System is available
  if (typeof window.DesignSystem !== 'undefined') {
    console.log('✅ Design System available immediately');
    console.log('Available features:', Object.keys(window.DesignSystem));
    
    // Initialize icon demos when design system is ready
    initializeIconDemos();
  } else {
    console.log('ℹ️ Design System loading... waiting for it to become available');
    
    // Set up a more persistent check
    let attempts = 0;
    const maxAttempts = 50; // 5 seconds max wait
    
    const checkInterval = setInterval(() => {
      attempts++;
      
      if (typeof window.DesignSystem !== 'undefined') {
        console.log(`✅ Design System available after ${attempts * 100}ms`);
        clearInterval(checkInterval);
        initializeIconDemos();
      } else if (attempts >= maxAttempts) {
        console.error('❌ Design System failed to load after 5 seconds');
        clearInterval(checkInterval);
      }
    }, 100);
  }
  
  // Add theme toggle functionality
  const themeToggle = document.querySelector('[data-theme-toggle]');
  if (themeToggle && window.themeManager) {
    themeToggle.addEventListener('click', function() {
      window.themeManager.toggleMode();
      console.log(`🌓 Theme switched to: ${window.themeManager.getCurrentMode()}`);
    });
  }
  
  console.log('✨ Demo initialization complete');
}

function initializeIconDemos() {
  const { MaterialIcons, IconUtils } = window.DesignSystem;
  
  if (!MaterialIcons || !IconUtils) {
    console.warn('MaterialIcons or IconUtils not available');
    console.log('DesignSystem keys:', Object.keys(window.DesignSystem || {}));
    return;
  }
  
  console.log('🎨 Initializing icon demos...');
  console.log('MaterialIcons methods:', Object.keys(MaterialIcons));
  console.log('IconUtils methods:', Object.keys(IconUtils));
  
  // Test icon creation first
  console.log('Testing icon creation...');
  try {
    const testIcon = MaterialIcons.create('mdiHome', { size: 'md' });
    console.log('✅ Test icon created:', testIcon);
    const element = testIcon.getElement();
    console.log('Test icon element:', element);
    console.log('Element HTML:', element.outerHTML);
    
    // Test direct DOM insertion
    const testContainer = document.createElement('div');
    testContainer.style.cssText = 'position: fixed; top: 50px; right: 50px; z-index: 10000; background: red; padding: 10px;';
    testContainer.appendChild(element.cloneNode(true));
    document.body.appendChild(testContainer);
    console.log('✅ Direct icon inserted into DOM for visual test');
    
  } catch (error) {
    console.error('❌ Error creating test icon:', error);
  }
  
  // Check if placeholder elements exist
  const placeholders = document.querySelectorAll('[data-icon]');
  console.log(`Found ${placeholders.length} placeholder elements:`, placeholders);
  
  // Use IconUtils to replace all icon placeholders
  console.log('Replacing placeholders...');
  try {
    IconUtils.replacePlaceholders(document.body);
    console.log('✅ Placeholders replaced');
    
    // Check what happened to our placeholders
    const remainingPlaceholders = document.querySelectorAll('[data-icon]');
    console.log(`Remaining placeholders after replacement: ${remainingPlaceholders.length}`);
    
    // Check for actual icon elements
    const iconElements = document.querySelectorAll('.mdi-icon');
    console.log(`Found ${iconElements.length} icon elements after replacement:`, iconElements);
    
  } catch (error) {
    console.error('❌ Error replacing placeholders:', error);
  }
  
  // Populate popular icons
  populatePopularIcons(MaterialIcons);
  
  // Setup interactive icons with event handlers
  setupInteractiveIconHandlers();
  
  // Setup icon search
  setupIconSearch(MaterialIcons);
  
  console.log('✅ Icon demos initialized');
}

function populatePopularIcons(MaterialIcons) {
  const container = document.getElementById('popular-icons');
  if (!container) return;
  
  const popularIcons = MaterialIcons.popular.COMMON.slice(0, 20);
  
  popularIcons.forEach(iconName => {
    try {
      const icon = MaterialIcons.create(iconName, { size: 'md' });
      
      const item = document.createElement('div');
      item.className = 'icon-grid-item';
      
      const nameSpan = document.createElement('span');
      nameSpan.className = 'icon-name';
      nameSpan.textContent = iconName;
      
      item.appendChild(icon.getElement());
      item.appendChild(nameSpan);
      
      container.appendChild(item);
    } catch (error) {
      console.warn(`Could not create icon: ${iconName}`, error);
    }
  });
}

function setupInteractiveIconHandlers() {
  // Add click handlers to interactive icons
  const interactiveIcons = document.querySelectorAll('.mdi-icon--interactive');
  
  interactiveIcons.forEach((element, index) => {
    element.addEventListener('click', () => {
      const iconName = element.getAttribute('data-icon') || 'unknown';
      console.log(`Clicked ${iconName} icon!`);
      element.style.transform = 'scale(0.9)';
      setTimeout(() => {
        element.style.transform = '';
      }, 150);
    });
  });
}

function setupIconSearch(MaterialIcons) {
  const searchInput = document.getElementById('icon-search');
  const searchBtn = document.getElementById('search-btn');
  const resultsContainer = document.getElementById('search-results');
  
  if (!searchInput || !searchBtn || !resultsContainer) return;
  
  function performSearch() {
    const query = searchInput.value.trim();
    if (!query) {
      resultsContainer.style.display = 'none';
      return;
    }
    
    try {
      const results = MaterialIcons.search(query).slice(0, 50);
      resultsContainer.innerHTML = '';
      
      if (results.length === 0) {
        resultsContainer.innerHTML = '<p style="text-align: center; color: var(--color-text-secondary);">No icons found</p>';
      } else {
        results.forEach(iconName => {
          try {
            const icon = MaterialIcons.create(iconName, { size: 'md' });
            
            const item = document.createElement('div');
            item.className = 'icon-grid-item';
            
            const nameSpan = document.createElement('span');
            nameSpan.className = 'icon-name';
            nameSpan.textContent = iconName;
            
            item.appendChild(icon.getElement());
            item.appendChild(nameSpan);
            
            resultsContainer.appendChild(item);
          } catch (error) {
            console.warn(`Could not create search result icon: ${iconName}`, error);
          }
        });
      }
      
      resultsContainer.style.display = 'grid';
    } catch (error) {
      console.error('Search error:', error);
      resultsContainer.innerHTML = '<p style="text-align: center; color: var(--color-critical);">Search error occurred</p>';
      resultsContainer.style.display = 'block';
    }
  }
  
  searchBtn.addEventListener('click', performSearch);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  });
}
