// Alternative Design - Interactive Crosshairs

// Create crosshair grid - ~30 crosshairs across page width
function createCrosshairGrid() {
  const grid = document.createElement('div');
  grid.className = 'crosshair-grid';
  document.body.appendChild(grid);
  
  // ~30 crosshairs across width, calculate spacing
  const cols = 30;
  const colSpacing = window.innerWidth / (cols + 1);
  const rows = Math.ceil(window.innerHeight / colSpacing);
  const crosshairs = [];
  
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const crosshair = document.createElement('div');
      crosshair.className = 'crosshair';
      const x = (j + 1) * colSpacing;
      const y = (i + 1) * colSpacing;
      crosshair.style.left = `${x}px`;
      crosshair.style.top = `${y}px`;
      grid.appendChild(crosshair);
      crosshairs.push({
        element: crosshair,
        x: x,
        y: y
      });
    }
  }
  
  return crosshairs;
}

// Crosshair animation configuration
const CROSSHAIR_ANIMATION_ENABLED = window.CROSSHAIR_ANIMATION_ENABLED !== undefined 
  ? window.CROSSHAIR_ANIMATION_ENABLED 
  : true;

// Mouse tracking - no delay for immediate response
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
// Bubble radius is 1/4 of screen (quarter of screen) - will be recalculated on resize
let bubbleRadius = Math.max(window.innerWidth, window.innerHeight) * 0.25;
let animationStartTime = null;
const animationDuration = 1000; // 1 second animation duration

function updateMousePosition(e) {
  if (!CROSSHAIR_ANIMATION_ENABLED) return;
  mouseX = e.clientX; // Immediate update, no delay
  mouseY = e.clientY;
  // Reset animation timer on mouse movement
  animationStartTime = Date.now();
}

function animateCrosshairs(crosshairs) {
  if (!CROSSHAIR_ANIMATION_ENABLED) return;
  
  const currentTime = Date.now();
  const timeSinceStart = animationStartTime ? currentTime - animationStartTime : 0;
  const shouldAnimate = timeSinceStart < animationDuration;
  
  // Freeze mouse position after first second
  if (!shouldAnimate) {
    // Animation stopped, crosshairs will settle smoothly
  }
  
  crosshairs.forEach(crosshair => {
    const dx = crosshair.x - mouseX;
    const dy = crosshair.y - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Initialize current position if not set
    if (crosshair.currentX === undefined) {
      crosshair.currentX = 0;
      crosshair.currentY = 0;
    }
    
    // Calculate target position - much more subtle movement
    let targetCrosshairX = 0;
    let targetCrosshairY = 0;
    let targetOpacity = 0.3;
    
    if (distance < bubbleRadius && shouldAnimate) {
      // Push away effect
      const pushStrength = (1 - distance / bubbleRadius) * 8; // Max 8px push
      const angle = Math.atan2(dy, dx);
      targetCrosshairX = Math.cos(angle) * pushStrength;
      targetCrosshairY = Math.sin(angle) * pushStrength;
      targetOpacity = 0.3 - (distance / bubbleRadius) * 0.15;
    }
    
    // Smooth interpolation
    crosshair.currentX += (targetCrosshairX - crosshair.currentX) * 0.3; // Interpolation factor 0.3
    crosshair.currentY += (targetCrosshairY - crosshair.currentY) * 0.3;
    
    // Always update transform smoothly
    crosshair.element.style.transform = `translate(${crosshair.currentX}px, ${crosshair.currentY}px)`;
    crosshair.element.style.opacity = Math.max(targetOpacity, 0.15);
  });
  
  requestAnimationFrame(() => animateCrosshairs(crosshairs));
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  if (CROSSHAIR_ANIMATION_ENABLED) {
    const crosshairs = createCrosshairGrid();
    
    // Initialize animation start time
    animationStartTime = Date.now();
    
    // Track mouse movement
    document.addEventListener('mousemove', updateMousePosition);
    
    // Start animation loop
    animateCrosshairs(crosshairs);
  
    // Recreate grid on resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function() {
        // Recalculate bubble radius
        bubbleRadius = Math.max(window.innerWidth, window.innerHeight) * 0.25;
        
        const grid = document.querySelector('.crosshair-grid');
        if (grid) grid.remove();
        const newCrosshairs = createCrosshairGrid();
        animateCrosshairs(newCrosshairs);
      }, 250);
    });
  }
});

// Keep existing functionality from main.js
// Function to scroll to content section
function scrollToContent() {
  const bioSection = document.querySelector('#bio');
  if (bioSection) {
    bioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Hide back-to-top button after clicking
    const backToTopContainer = document.querySelector('.back-to-top-container');
    if (backToTopContainer) {
      backToTopContainer.classList.remove('visible');
    }
  }
}

// Copy email to clipboard
function copyEmail(email) {
  navigator.clipboard.writeText(email).then(function() {
    showToast('Email copied to clipboard! ✓');
  }).catch(function(err) {
    showToast('Failed to copy email');
    console.error('Could not copy text: ', err);
  });
}

// Show toast notification
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  
  setTimeout(function() {
    toast.classList.remove('show');
  }, 3000);
}

// Profile photo loading state
document.addEventListener('DOMContentLoaded', function() {
  const profilePhoto = document.querySelector('.profile-photo');
  
  if (profilePhoto) {
    if (profilePhoto.complete) {
      profilePhoto.classList.add('loaded');
    } else {
      profilePhoto.addEventListener('load', function() {
        profilePhoto.classList.add('loaded');
      });
    }
  }
});

// Scroll reveal animations
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      scrollObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all scroll-reveal elements
document.querySelectorAll('.scroll-reveal').forEach(function(el) {
  scrollObserver.observe(el);
});

// Handle scroll to hide hero content when past first page
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  const backToTop = document.querySelector('.back-to-top');
  
  // Hide arrow immediately on any scroll
  if (scrolled > 10) {
    document.body.classList.add('has-scrolled');
  } else {
    document.body.classList.remove('has-scrolled');
  }
  
  // Show back-to-top button only when at the very bottom
  const isAtBottom = scrolled + windowHeight >= documentHeight - 50; // 50px threshold
  const backToTopContainer = document.querySelector('.back-to-top-container');
  if (backToTopContainer) {
    if (isAtBottom) {
      backToTopContainer.classList.add('visible');
    } else {
      backToTopContainer.classList.remove('visible');
    }
  }
  
  // Add 'scrolled' class when user scrolls past 50% of viewport
  if (scrolled > windowHeight * 0.5) {
    document.body.classList.add('scrolled');
  } else {
    document.body.classList.remove('scrolled');
  }
  
  // Gradual yellow glow intensity based on scroll
  const maxScroll = windowHeight * 2;
  const intensity = Math.min(scrolled / maxScroll, 1);
  
  // Set CSS custom property for gradient intensity
  document.documentElement.style.setProperty('--glow-intensity', intensity);
  
  // Subtle parallax effect on hero section
  const hero = document.querySelector('.hero-section');
  if (hero && scrolled < windowHeight) {
    hero.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

// Keyboard navigation improvements
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    const target = e.target;
    if (target.classList.contains('contact-link') || 
        target.classList.contains('hero-section')) {
      target.click();
    }
  }
  
  if (e.key === ' ' || e.key === 'Spacebar') {
    const hero = document.querySelector('.hero-section');
    if (hero && window.pageYOffset < 100) {
      e.preventDefault();
      scrollToContent();
    }
  }
});

// Bio rotation removed - using static text now

console.log('Alternative portfolio design loaded! ✨');

