document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS animation library
  AOS.init({
    duration: 800,
    easing: 'ease',
    once: true,
    offset: 100
  });
  
  // Fix for Inoveai redirection issue
  // Prevent clicks to unwanted domains
  document.addEventListener('click', function(e) {
    // Check if it's a link
    if (e.target.tagName === 'A' || e.target.closest('a')) {
      const link = e.target.tagName === 'A' ? e.target : e.target.closest('a');
      const href = link.getAttribute('href');
      
      // Check if it's an external link to unwanted domains
      if (href && (
          href.includes('inoveai') || 
          (href.includes('inov') && !href.includes('inovea')) ||
          (href.startsWith('http') && !href.includes('cdnjs.cloudflare.com') && 
          !href.includes('fonts.googleapis.com') && 
          !href.includes('fonts.gstatic.com')))) {
        console.error('Blocked navigation to:', href);
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }
  }, true);
  
  // Header scroll effect
  const header = document.querySelector('.header');
  
  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', handleScroll);
  
  // Mobile menu functionality
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  let mobileMenu;
  
  function setupMobileMenu() {
    // Create mobile menu if it doesn't exist
    if (!document.querySelector('.mobile-menu')) {
      mobileMenu = document.createElement('div');
      mobileMenu.classList.add('mobile-menu');
      
      // Clone navigation links
      const navLinks = document.querySelector('.nav-links').cloneNode(true);
      navLinks.classList.add('mobile-nav-links');
      
      // Clone actions
      const navActions = document.querySelector('.nav-actions').cloneNode(true);
      navActions.classList.add('mobile-nav-actions');
      
      // Append to mobile menu
      mobileMenu.appendChild(navLinks);
      mobileMenu.appendChild(navActions);
      
      // Append to body
      document.body.appendChild(mobileMenu);
    } else {
      mobileMenu = document.querySelector('.mobile-menu');
    }
  }
  
  function toggleMobileMenu() {
    if (!mobileMenu) {
      setupMobileMenu();
    }
    
    const isActive = mobileMenu.classList.contains('active');
    
    // Toggle active class
    mobileMenu.classList.toggle('active');
    
    // Animate menu button
    const bars = mobileMenuBtn.querySelectorAll('.bar');
    
    if (!isActive) {
      // Transform to X
      bars[0].style.transform = 'translateY(8px) rotate(45deg)';
      bars[1].style.opacity = '0';
      bars[2].style.transform = 'translateY(-8px) rotate(-45deg)';
      
      // Prevent scrolling
      document.body.style.overflow = 'hidden';
    } else {
      // Reset
      bars.forEach(bar => {
        bar.style.transform = '';
        bar.style.opacity = '';
      });
      
      // Allow scrolling
      document.body.style.overflow = '';
    }
  }
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }
  
  // Testimonial slider
  const testimonialSlider = document.querySelector('.testimonial-slider');
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.querySelector('.testimonial-nav.prev');
  const nextBtn = document.querySelector('.testimonial-nav.next');
  
  if (testimonialSlider && testimonialSlides.length > 0) {
    let currentSlide = 0;
    
    // Initially show only first slide and hide others
    testimonialSlides.forEach((slide, index) => {
      if (index !== 0) {
        slide.style.display = 'none';
      }
    });
    
    function showSlide(index) {
      // Hide all slides
      testimonialSlides.forEach(slide => {
        slide.style.display = 'none';
      });
      
      // Show the requested slide
      testimonialSlides[index].style.display = 'block';
      
      // Add fade in animation
      testimonialSlides[index].style.animation = 'fadeIn 0.5s ease forwards';
    }
    
    function nextSlide() {
      currentSlide = (currentSlide + 1) % testimonialSlides.length;
      showSlide(currentSlide);
    }
    
    function prevSlide() {
      currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
      showSlide(currentSlide);
    }
    
    // Set up click handlers for navigation
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Auto advance slides
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause auto-advance on hover
    testimonialSlider.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', () => {
      slideInterval = setInterval(nextSlide, 5000);
    });
  }
  
  // FAQ accordion functionality
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    // Initially hide all answers except the first one
    if (item !== faqItems[0]) {
      answer.style.display = 'none';
    }
    
    question.addEventListener('click', () => {
      const isOpen = answer.style.display !== 'none';
      
      // Close all other answers
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.querySelector('.faq-answer').style.display = 'none';
        }
      });
      
      // Toggle this answer
      answer.style.display = isOpen ? 'none' : 'block';
      
      // Add slide down animation if opening
      if (!isOpen) {
        answer.style.animation = 'slideDown 0.3s ease forwards';
      }
    });
  });
  
  // Scroll to section when clicking on navigation links
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      // Only handle anchor links
      if (targetId.startsWith('#') && targetId !== '#') {
        e.preventDefault();
        
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          // Close mobile menu if open
          if (mobileMenu && mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
          }
          
          // Scroll to the section with offset for header
          window.scrollTo({
            top: targetSection.offsetTop - header.offsetHeight,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Add animation for the hero section elements
  const heroElements = document.querySelectorAll('.fade-in');
  heroElements.forEach(element => {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  });
  
  // Add hover effects for feature cards
  const featureCards = document.querySelectorAll('.feature-card');
  
  featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
      this.style.boxShadow = 'var(--shadow-lg)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.boxShadow = 'var(--shadow-md)';
    });
  });
  
  // Form submission handling
  const zipForm = document.querySelector('.zip-form');
  
  if (zipForm) {
    zipForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const zipInput = this.querySelector('.zip-input');
      const zipCode = zipInput.value.trim();
      
      if (zipCode !== '') {
        // In a real implementation, this would check delivery availability
        // For now, just show a confirmation message
        const deliveryCheck = document.querySelector('.delivery-check');
        const originalContent = deliveryCheck.innerHTML;
        
        deliveryCheck.innerHTML = `
          <h3>Thank you!</h3>
          <p class="success-message">We deliver to ${zipCode}! Sign up to get started.</p>
          <div class="hero-cta" style="margin-top: 1rem;">
            <a href="#" class="btn btn-primary">Get Started</a>
          </div>
        `;
        
        // Add success styling
        deliveryCheck.classList.add('success');
      }
    });
  }
  
  // Add scroll reveal animations
  const revealElements = document.querySelectorAll('.process-step, .feature-card, .faq-item');
  
  const revealOnScroll = function() {
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('revealed');
      }
    });
  };
  
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Check on initial load
  
  // Add keyframe animation for slide down
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
}); 