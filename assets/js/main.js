// Function to scroll to content section
function scrollToContent() {
  const bioSection = document.querySelector('#bio');
  if (bioSection) {
    bioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
  
  // Hide arrow immediately on any scroll
  if (scrolled > 10) {
    document.body.classList.add('has-scrolled');
  } else {
    document.body.classList.remove('has-scrolled');
  }
  
  // Add 'scrolled' class when user scrolls past 50% of viewport
  if (scrolled > windowHeight * 0.5) {
    document.body.classList.add('scrolled');
  } else {
    document.body.classList.remove('scrolled');
  }
  
  // Gradual amber glow intensity based on scroll
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
  // Add Enter key support for clickable elements
  if (e.key === 'Enter') {
    const target = e.target;
    if (target.classList.contains('contact-link') || 
        target.classList.contains('hero-section')) {
      target.click();
    }
  }
  
  // Allow spacebar to scroll from hero section
  if (e.key === ' ' || e.key === 'Spacebar') {
    const hero = document.querySelector('.hero-section');
    if (hero && window.pageYOffset < 100) {
      e.preventDefault();
      scrollToContent();
    }
  }
});

console.log('Portfolio site loaded successfully! ✨');
