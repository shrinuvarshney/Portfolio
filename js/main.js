// Initialize AOS with enhanced settings
AOS.init({
    duration: 1000,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    once: false,
    mirror: true,
    anchorPlacement: 'top-bottom',
    disable: false,
    startEvent: 'DOMContentLoaded',
    offset: 100,
    delay: 50,
    useClassNames: true,
    disableMutationObserver: false,
    throttleDelay: 99,
    debounceDelay: 50
});

// Add hover effect for skill badges
document.querySelectorAll('.skill-badge-container').forEach((badge, index) => {
    badge.style.animationDelay = `${index * 100}ms`;
    badge.addEventListener('mouseover', function() {
        this.style.zIndex = '1';
    });
    badge.addEventListener('mouseleave', function() {
        setTimeout(() => {
            this.style.zIndex = '0';
        }, 300);
    });
});

// Add scroll-triggered animations for skill categories
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-category').forEach(category => {
    category.style.transform = 'translateY(20px)';
    category.style.opacity = '0';
    category.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    skillObserver.observe(category);
});

// Smooth animation for progress bars
const animateProgressBars = () => {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, 100);
    });
};

// Trigger progress bar animation when skills section is in view
const skillsSection = document.querySelector('#skills');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgressBars();
            // Animate skill badges
            const badges = document.querySelectorAll('.skill-badge-container');
            badges.forEach((badge, index) => {
                setTimeout(() => {
                    badge.style.opacity = '1';
                    badge.style.transform = 'scale(1)';
                }, index * 100);
            });
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

if (skillsSection) {
    observer.observe(skillsSection);
}

// Function to reset AOS animations
function resetAOS() {
    const elements = document.querySelectorAll('[data-aos]');
    elements.forEach(element => {
        element.classList.remove('aos-animate');
    });
    AOS.refresh();
}

// Reset animations when scrolling up
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    if (st < lastScrollTop) {
        // Scrolling up
        resetAOS();
    }
    lastScrollTop = st <= 0 ? 0 : st;
});

// Initialize Particles.js
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#0984e3'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#0984e3',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        }
    },
    retina_detect: true
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar color change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(45, 52, 54, 0.95)';
    } else {
        navbar.style.backgroundColor = 'rgba(45, 52, 54, 0.9)';
    }
});

// Refresh AOS on scroll
window.addEventListener('scroll', () => {
    AOS.refresh();
});

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll('.nav-link');
const menuToggle = document.getElementById('navbarNav');
const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle: false});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (menuToggle.classList.contains('show')) {
            bsCollapse.toggle();
        }
    });
});
