// script.js - Consolidated and optimized version

// Dynamic year update for footer
document.addEventListener('DOMContentLoaded', function() {
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
        mobileMenuButton.addEventListener('click', function() {
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
        mobileServicesToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling
            mobileServicesMenu.classList.toggle('hidden');
            servicesArrow.classList.toggle('rotate-180');
        });
    } else {
        console.error('Mobile services elements missing');
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const nav = document.querySelector('nav');
        if (nav && mobileMenu && !nav.contains(event.target) && !mobileMenu.contains(event.target)) {
            closeMobileMenu();
        }
    });

    // Close services dropdown when clicking on a service link
    if (mobileServicesMenu) {
        const serviceLinks = mobileServicesMenu.querySelectorAll('a');
        serviceLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        });
    }

    // Close menu when window is resized to desktop size
    window.addEventListener('resize', function() {
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
        viewPositionsButton.addEventListener('click', function(e) {
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
            link.addEventListener('click', function() {
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
let currentHeroSlide = 0;
let heroSliderInterval;

function initHeroSlider() {
    const heroSlides = document.querySelectorAll("#hero-slider > div");
    const heroDots = document.querySelectorAll('[onclick^="currentSlide"]');
    
    if (heroSlides.length === 0) return;

    function showHeroSlide(n) {
        currentHeroSlide = (n + heroSlides.length) % heroSlides.length;
        const heroSlider = document.getElementById("hero-slider");
        if (heroSlider) {
            heroSlider.style.transform = `translateX(-${currentHeroSlide * 100}%)`;
        }
        heroDots.forEach((dot) => dot.classList.remove("opacity-100"));
        if (heroDots[currentHeroSlide]) {
            heroDots[currentHeroSlide].classList.add("opacity-100");
        }
    }

    function nextHeroSlide() {
        showHeroSlide(currentHeroSlide + 1);
    }

    // Auto-scroll every 5 seconds
    heroSliderInterval = setInterval(nextHeroSlide, 5000);

    // Init first slide
    showHeroSlide(0);

    // Pause auto-scroll on hover
    const heroSliderContainer = document.querySelector('.relative'); // Adjust selector as needed
    if (heroSliderContainer) {
        heroSliderContainer.addEventListener('mouseenter', () => {
            clearInterval(heroSliderInterval);
        });
        heroSliderContainer.addEventListener('mouseleave', () => {
            heroSliderInterval = setInterval(nextHeroSlide, 5000);
        });
    }
}

// Manual dot click function (needs to be global)
function currentSlide(n) {
    const heroSlides = document.querySelectorAll("#hero-slider > div");
    if (heroSlides.length > 0) {
        currentHeroSlide = n - 1;
        showHeroSlide(currentHeroSlide);
        
        // Reset auto-scroll timer
        if (heroSliderInterval) {
            clearInterval(heroSliderInterval);
            heroSliderInterval = setInterval(nextHeroSlide, 5000);
        }
    }
}

// Initialize hero slider when DOM is loaded
document.addEventListener('DOMContentLoaded', initHeroSlider);