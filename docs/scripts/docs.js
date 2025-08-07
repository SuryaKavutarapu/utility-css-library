// Documentation Site JavaScript

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    initializeThemeToggle();
    initializeCopyButtons();
    initializeNavigation();
    initializeAnimations();
    initializeIconRegistry();
});

// Theme Toggle Functionality
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    if (!themeToggle || !themeIcon) return;
    
    // Update icon based on current theme
    function updateThemeIcon() {
        const isDark = document.documentElement.classList.contains('dark') || 
                      document.documentElement.getAttribute('data-mode') === 'dark';
        themeIcon.textContent = isDark ? '☀️' : '🌙';
    }
    
    // Initial icon update
    updateThemeIcon();
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', function() {
        if (window.themeManager) {
            window.themeManager.toggleMode();
            updateThemeIcon();
            showToast('Theme switched!', 'success');
        }
    });
    
    // Listen for theme changes from the library
    if (window.themeManager) {
        window.themeManager.subscribe(function(mode) {
            updateThemeIcon();
        });
    }
}

// Copy to Clipboard Functionality
function initializeCopyButtons() {
    // Add copy buttons to code blocks
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(function(codeBlock) {
        const pre = codeBlock.parentElement;
        
        // Create copy button
        const copyButton = document.createElement('button');
        copyButton.innerHTML = '📋';
        copyButton.className = 'copy-button absolute top-2 right-2 p-2 text-muted hover:text-foreground transition-colors bg-background/50 rounded';
        copyButton.title = 'Copy to clipboard';
        
        // Make parent relative for absolute positioning
        pre.style.position = 'relative';
        pre.classList.add('copy-container');
        
        // Add copy functionality
        copyButton.addEventListener('click', function() {
            const text = codeBlock.textContent;
            copyToClipboard(text);
            
            // Visual feedback
            copyButton.innerHTML = '✅';
            setTimeout(function() {
                copyButton.innerHTML = '📋';
            }, 2000);
        });
        
        pre.appendChild(copyButton);
    });
}

// Copy install command function
function copyInstallCommand() {
    const command = 'npm install utility-css-library';
    copyToClipboard(command);
    showToast('Install command copied!', 'success');
}

// Generic copy to clipboard function
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(function() {
            showToast('Copied to clipboard!', 'success');
        }).catch(function() {
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}

// Fallback copy method for older browsers
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showToast('Copied to clipboard!', 'success');
    } catch (err) {
        showToast('Failed to copy', 'error');
    }
    
    document.body.removeChild(textArea);
}

// Smooth Navigation
function initializeNavigation() {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 80; // Account for fixed header
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active navigation section
    window.addEventListener('scroll', highlightActiveSection);
}

// Highlight active navigation section
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    let current = '';
    sections.forEach(function(section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(function(link) {
        link.classList.remove('text-primary');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('text-primary');
        }
    });
}

// Initialize animations
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.bg-card, .feature-grid > div');
    animateElements.forEach(function(el) {
        observer.observe(el);
    });
    
    // Add fade-in animation class
    const style = document.createElement('style');
    style.textContent = `
        .animate-fade-in {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize Material Design Icons
function initializeIconRegistry() {
    if (window.IconRegistry) {
        const iconRegistry = new window.IconRegistry();
        
        // Register commonly used icons
        const commonIcons = [
            'home', 'heart', 'star', 'settings', 'rocket', 'check',
            'close', 'menu', 'search', 'user', 'mail', 'phone',
            'calendar', 'clock', 'location', 'download', 'upload',
            'edit', 'delete', 'add', 'remove', 'expand', 'collapse'
        ];
        
        commonIcons.forEach(function(iconName) {
            iconRegistry.register(iconName);
        });
        
        // Initialize all icons on the page
        iconRegistry.renderAll();
    }
}

// Toast notification system
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(function(toast) {
        toast.remove();
    });
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    // Set content based on type
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    const colors = {
        success: 'text-success',
        error: 'text-critical',
        warning: 'text-warning',
        info: 'text-interactive'
    };
    
    toast.innerHTML = `
        <div class="flex items-center space-x-2">
            <span class="text-lg">${icons[type] || icons.info}</span>
            <span class="${colors[type] || colors.info}">${message}</span>
        </div>
    `;
    
    // Add to document
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(function() {
        toast.classList.add('show');
    }, 100);
    
    // Hide toast after 3 seconds
    setTimeout(function() {
        toast.classList.remove('show');
        setTimeout(function() {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Color demonstration functions
function demonstrateColorSystem() {
    const colorDemos = document.querySelectorAll('[data-color-demo]');
    
    colorDemos.forEach(function(demo) {
        const color = demo.getAttribute('data-color-demo');
        
        demo.addEventListener('click', function() {
            showToast(`${color} color showcased!`, 'info');
            
            // Add temporary highlight effect
            demo.style.transform = 'scale(1.05)';
            demo.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.2)';
            
            setTimeout(function() {
                demo.style.transform = '';
                demo.style.boxShadow = '';
            }, 200);
        });
    });
}

// Performance monitoring
function initializePerformanceMonitoring() {
    // Monitor theme switch performance
    if (window.performance && window.performance.mark) {
        const originalToggle = window.themeManager?.toggleMode;
        
        if (originalToggle) {
            window.themeManager.toggleMode = function() {
                performance.mark('theme-toggle-start');
                originalToggle.call(this);
                
                requestAnimationFrame(function() {
                    performance.mark('theme-toggle-end');
                    performance.measure('theme-toggle', 'theme-toggle-start', 'theme-toggle-end');
                    
                    const measures = performance.getEntriesByName('theme-toggle');
                    if (measures.length > 0) {
                        const duration = measures[measures.length - 1].duration;
                        console.log(`Theme toggle took ${duration.toFixed(2)}ms`);
                    }
                });
            };
        }
    }
}

// Error handling
window.addEventListener('error', function(event) {
    console.error('Documentation site error:', event.error);
    showToast('An error occurred. Please refresh the page.', 'error');
});

// Initialize performance monitoring on load
window.addEventListener('load', initializePerformanceMonitoring);

// Export functions for global access
window.copyInstallCommand = copyInstallCommand;
window.showToast = showToast;

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Only register service worker in production
        if (location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('SW registered: ', registration);
                })
                .catch(function(registrationError) {
                    console.log('SW registration failed: ', registrationError);
                });
        }
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // Toggle theme with Ctrl/Cmd + Shift + T
    if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'T') {
        event.preventDefault();
        if (window.themeManager) {
            window.themeManager.toggleMode();
            showToast('Theme toggled with keyboard shortcut!', 'success');
        }
    }
    
    // Copy install command with Ctrl/Cmd + Shift + C
    if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'C') {
        event.preventDefault();
        copyInstallCommand();
    }
});

// Add loading states and progressive enhancement
function enhancePageLoad() {
    // Add loading class to body
    document.body.classList.add('page-loading');
    
    // Remove loading class when everything is ready
    window.addEventListener('load', function() {
        setTimeout(function() {
            document.body.classList.remove('page-loading');
            document.body.classList.add('page-loaded');
        }, 100);
    });
}

// Initialize page load enhancements
enhancePageLoad();
