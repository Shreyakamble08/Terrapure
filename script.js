// script.js

// Mobile menu toggle
 // Mobile menu functionality
  document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileServicesToggle = document.getElementById('mobile-services-toggle');
    const mobileServicesMenu = document.getElementById('mobile-services-menu');
    const servicesArrow = document.getElementById('services-arrow');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const crossIcon = document.getElementById('cross-icon');

    // Function to toggle menu icons
    function toggleMenuIcons(isMenuOpen) {
      if (isMenuOpen) {
        hamburgerIcon.classList.add('hidden');
        crossIcon.classList.remove('hidden');
      } else {
        hamburgerIcon.classList.remove('hidden');
        crossIcon.classList.add('hidden');
      }
    }

    // Function to close mobile menu
    function closeMobileMenu() {
      mobileMenu.classList.add('hidden');
      mobileServicesMenu.classList.add('hidden');
      servicesArrow.classList.remove('rotate-180');
      toggleMenuIcons(false);
    }

    // Function to open mobile menu
    function openMobileMenu() {
      mobileMenu.classList.remove('hidden');
      toggleMenuIcons(true);
    }

    // Toggle mobile menu
    mobileMenuButton.addEventListener('click', function() {
      if (mobileMenu.classList.contains('hidden')) {
        openMobileMenu();
      } else {
        closeMobileMenu();
      }
    });

    // Toggle mobile services dropdown
    mobileServicesToggle.addEventListener('click', function(e) {
      e.stopPropagation(); // Prevent event bubbling
      mobileServicesMenu.classList.toggle('hidden');
      servicesArrow.classList.toggle('rotate-180');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideNav = document.querySelector('nav').contains(event.target);
      const isClickInsideMobileMenu = mobileMenu.contains(event.target);
      
      if (!isClickInsideNav && !isClickInsideMobileMenu) {
        closeMobileMenu();
      }
    });

    // Close services dropdown when clicking on a service link
    const serviceLinks = mobileServicesMenu.querySelectorAll('a');
    serviceLinks.forEach(link => {
      link.addEventListener('click', function() {
        closeMobileMenu();
      });
    });

    // Close menu when window is resized to desktop size
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 768) {
        closeMobileMenu();
      }
    });
  });

function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    let isValid = true;
    
    // Reset error messages
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    
    // Validate name
    if (!name.value.trim()) {
        showError(name, 'Please enter your name');
        isValid = false;
    }
    
    // Validate email
    if (!email.value.trim()) {
        showError(email, 'Please enter your email');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate message
    if (!message.value.trim()) {
        showError(message, 'Please enter your message');
        isValid = false;
    }
    
    return isValid;
}

function showError(input, message) {
    const error = document.createElement('div');
    error.className = 'error-message text-red-500 text-sm mt-1';
    error.textContent = message;
    input.parentNode.appendChild(error);
    input.classList.add('border-red-500');
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}


//hero slider 
      let currentHeroSlide = 0;
      const heroSlides = document.querySelectorAll("#hero-slider > div");
      const heroDots = document.querySelectorAll('[onclick^="currentSlide"]');

      function showHeroSlide(n) {
        currentHeroSlide = (n + heroSlides.length) % heroSlides.length;
        document.getElementById("hero-slider").style.transform = `translateX(-${
          currentHeroSlide * 100
        }%)`;
        heroDots.forEach((dot) => dot.classList.remove("opacity-100"));
        heroDots[currentHeroSlide].classList.add("opacity-100");
      }

      function nextHeroSlide() {
        showHeroSlide(currentHeroSlide + 1);
      }

      // Auto-scroll every 5 seconds
      setInterval(nextHeroSlide, 5000);

      // Init first slide
      showHeroSlide(0);

      // Manual dot click
      function currentSlide(n) {
        showHeroSlide(n - 1);
      }
    