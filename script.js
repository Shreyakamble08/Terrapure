// script.js - Consolidated and optimized version

// Dynamic year update for footer
document.addEventListener('DOMContentLoaded', function () {
    let year = new Date().getFullYear();
    let yearElement = document.querySelector('.year');
    if (yearElement) {
        yearElement.textContent = year;
    }

    console.log('DOM Loaded - Script Starting');

    // Mobile menu functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileServicesToggle = document.getElementById('mobile-services-toggle');
    const mobileServicesMenu = document.getElementById('mobile-services-menu');
    const servicesArrow = document.getElementById('services-arrow');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const crossIcon = document.getElementById('cross-icon');

    // Function to toggle menu icons
    function toggleMenuIcons(isMenuOpen) {
        if (hamburgerIcon && crossIcon) {
            if (isMenuOpen) {
                hamburgerIcon.classList.add('hidden');
                crossIcon.classList.remove('hidden');
            } else {
                hamburgerIcon.classList.remove('hidden');
                crossIcon.classList.add('hidden');
            }
        }
    }

    // Function to close mobile menu
    function closeMobileMenu() {
        if (mobileMenu) mobileMenu.classList.add('hidden');
        if (mobileServicesMenu) mobileServicesMenu.classList.add('hidden');
        if (servicesArrow) servicesArrow.classList.remove('rotate-180');
        toggleMenuIcons(false);
    }

    // Function to open mobile menu
    function openMobileMenu() {
        if (mobileMenu) mobileMenu.classList.remove('hidden');
        toggleMenuIcons(true);
    }

    // Toggle mobile menu
    if (mobileMenuButton && mobileMenu) {
        console.log('Mobile menu elements found');
        mobileMenuButton.addEventListener('click', function () {
            if (mobileMenu.classList.contains('hidden')) {
                openMobileMenu();
            } else {
                closeMobileMenu();
            }
        });
    } else {
        console.error('Mobile menu elements missing');
    }

    // Toggle mobile services dropdown
    if (mobileServicesToggle && mobileServicesMenu && servicesArrow) {
        console.log('Mobile services elements found');
        mobileServicesToggle.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent event bubbling
            mobileServicesMenu.classList.toggle('hidden');
            servicesArrow.classList.toggle('rotate-180');
        });
    } else {
        console.error('Mobile services elements missing');
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (event) {
        const nav = document.querySelector('nav');
        if (nav && mobileMenu && !nav.contains(event.target) && !mobileMenu.contains(event.target)) {
            closeMobileMenu();
        }
    });

    // Close services dropdown when clicking on a service link
    if (mobileServicesMenu) {
        const serviceLinks = mobileServicesMenu.querySelectorAll('a');
        serviceLinks.forEach(link => {
            link.addEventListener('click', function () {
                closeMobileMenu();
            });
        });
    }

    // Close menu when window is resized to desktop size
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 768) {
            closeMobileMenu();
        }
    });

    // Smooth Scroll for View Open Positions Button
    const viewPositionsButton = document.getElementById('view-positions');
    const openPositionsSection = document.getElementById('open-positions');
    console.log('Button element:', viewPositionsButton);
    console.log('Section element:', openPositionsSection);

    if (viewPositionsButton && openPositionsSection) {
        console.log('Scroll elements found - Adding listener');
        viewPositionsButton.addEventListener('click', function (e) {
            e.preventDefault();
            console.log('Button clicked! Starting scroll...');

            // Calculate position with offset for fixed header
            const headerOffset = 80;
            const elementPosition = openPositionsSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            // Use scrollTo with smooth behavior for better control
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            console.log('Smooth scroll triggered with offset');
        });
    } else {
        console.error('Scroll elements not found! Button:', viewPositionsButton, 'Section:', openPositionsSection);
    }

    // Close mobile menu when clicking on links
    if (mobileMenu) {
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function () {
                closeMobileMenu();
            });
        });
    }

    console.log('Script Setup Complete');
});

// Form validation function
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

// Hero slider functionality
// Compact Hero Slider Functionality
let currentHeroSlide = 0;
const heroSlides = document.querySelectorAll("#hero-slider > div");
const heroDots = document.querySelectorAll('[onclick^="currentSlide"]');
let heroSliderInterval;

function showHeroSlide(n) {
    currentHeroSlide = (n + heroSlides.length) % heroSlides.length;
    document.getElementById("hero-slider").style.transform = `translateX(-${currentHeroSlide * 100
        }%)`;

    // Update dots with enhanced styling
    heroDots.forEach((dot, index) => {
        if (index === currentHeroSlide) {
            dot.classList.add("bg-white", "scale-125");
            dot.classList.remove("bg-white/70", "scale-100");
        } else {
            dot.classList.add("bg-white/70", "scale-100");
            dot.classList.remove("bg-white", "scale-125");
        }
    });
}

function nextSlide() {
    showHeroSlide(currentHeroSlide + 1);
    resetAutoScroll();
}

function prevSlide() {
    showHeroSlide(currentHeroSlide - 1);
    resetAutoScroll();
}

function resetAutoScroll() {
    clearInterval(heroSliderInterval);
    heroSliderInterval = setInterval(nextSlide, 5000);
}

// Auto-scroll every 5 seconds
heroSliderInterval = setInterval(nextSlide, 5000);

// Manual dot click
function currentSlide(n) {
    showHeroSlide(n);
    resetAutoScroll();
}

// Pause auto-scroll on hover
const heroSliderContainer =
    document.querySelector("#hero-slider").parentElement;
heroSliderContainer.addEventListener("mouseenter", () => {
    clearInterval(heroSliderInterval);
});
heroSliderContainer.addEventListener("mouseleave", () => {
    heroSliderInterval = setInterval(nextSlide, 3000);
});

// Init first slide
showHeroSlide(0);

//about section animation
document.addEventListener('DOMContentLoaded', function () {
    const aboutSection = document.getElementById('about-section');
    const imageSlide = document.querySelector('.image-slide');
    const contentSlide = document.querySelector('.content-slide');
    const tagsContainer = document.querySelector('.tags-container');
    const buttonsContainer = document.querySelector('.buttons-container');
    const badges = document.querySelectorAll('.badge-1, .badge-2');
    const bgElements = document.querySelector('.absolute.inset-0');
    const typingHeading = document.querySelector('.typing-heading');

    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Section becomes visible
                aboutSection.classList.add('is-visible');

                // Start background elements animation
                bgElements.classList.add('animate-bg-elements');

                // Start image slide animation
                setTimeout(() => {
                    imageSlide.classList.add('animate-slide');
                }, 200);

                // Start content animations
                setTimeout(() => {
                    contentSlide.classList.add('animate-content');
                    tagsContainer.classList.add('animate-tags');
                    buttonsContainer.classList.add('animate-buttons');
                }, 400);

                // Start badge animations
                setTimeout(() => {
                    badges.forEach(badge => {
                        badge.classList.add('animate-badge');
                    });
                }, 800);

                // Stop observing after animations start
                observer.unobserve(aboutSection);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    // Start observing
    observer.observe(aboutSection);

    // Fallback for browsers without IntersectionObserver
    if (!('IntersectionObserver' in window)) {
        aboutSection.classList.add('is-visible');
        bgElements.classList.add('animate-bg-elements');
        imageSlide.classList.add('animate-slide');
        contentSlide.classList.add('animate-content');
        tagsContainer.classList.add('animate-tags');
        buttonsContainer.classList.add('animate-buttons');
        badges.forEach(badge => {
            badge.classList.add('animate-badge');
        });
    }
});

//video modal functionality
document.addEventListener('DOMContentLoaded', function () {
    const section = document.getElementById('services-section');
    const contentColumn = document.querySelector('.content-column');
    const videoColumn = document.querySelector('.video-column');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animate-in class to trigger animations
                section.classList.add('animate-in');
                contentColumn.classList.add('animate-in');
                videoColumn.classList.add('animate-in');

                // Stop observing after animations start
                observer.unobserve(section);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });

    observer.observe(section);
});



// Initialize animations when section comes into view
document.addEventListener('DOMContentLoaded', function () {
    const section = document.getElementById('services-section');
    const contentColumn = document.querySelector('.content-column');
    const videoColumn = document.querySelector('.video-column');
    const statsContainer = document.querySelector('.stats-container');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animate-in class to trigger animations
                section.classList.add('animate-in');
                contentColumn.classList.add('animate-in');
                videoColumn.classList.add('animate-in');
                statsContainer.classList.add('animate-in');

                // Start counter animation
                animateCounter();

                // Stop observing after animations start
                observer.unobserve(section);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });

    observer.observe(section);
});


// stats count
  function animateStats() {
    const counters = document.querySelectorAll('.count-up');

    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const circle = counter.closest('.group').querySelector('.progress-circle');
      const radius = circle.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;

      circle.style.strokeDasharray = circumference;
      circle.style.strokeDashoffset = circumference;
      circle.classList.add('progress-circle-glow');

      let count = 0;
      const duration = 3000; // 3 seconds
      const intervalTime = 20; // 20ms per step
      const steps = duration / intervalTime;
      const increment = target / steps;

      let step = 0;

      const interval = setInterval(() => {
        step++;
        count += increment;
        if (count > target) count = target;

        counter.innerText = Math.floor(count);

        // Animate stroke dash offset
        const offset = circumference - (count / target) * circumference;
        circle.style.strokeDashoffset = offset;

        if (count >= target) clearInterval(interval);
      }, intervalTime);
    });
  }

  // Intersection Observer to trigger animation when visible
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.relative.py-20');
  if (statsSection) observer.observe(statsSection);
