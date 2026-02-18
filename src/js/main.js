// Casa Ascendente - Family Legacy Website
// Ascendemos Siempre — We Always Ascend

document.addEventListener('DOMContentLoaded', () => {
    
    // Navigation scroll effect
    const nav = document.getElementById('nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    const sections = document.querySelectorAll('.story, .values-section, .code-section, .collection, .emblem-section, .join-section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Parallax effect for hero emblem
    const heroEmblem = document.querySelector('.hero .emblem');
    if (heroEmblem) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (scrolled < window.innerHeight) {
                const rate = scrolled * 0.3;
                heroEmblem.style.transform = `translateY(${rate}px)`;
            }
        });
    }
    
    // Form submission handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const button = this.querySelector('button[type="submit"]');
            if (button) {
                const originalText = button.textContent;
                button.textContent = 'Ascending...';
                button.disabled = true;
                
                // Re-enable after submission (Formspree will handle redirect)
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                }, 3000);
            }
        });
    });

    // Console easter egg
    console.log('%c🏛️ CASA ASCENDENTE', 'font-size: 28px; font-weight: bold; color: #D4AF37; text-shadow: 0 0 10px #D4AF3780;');
    console.log('%c"Ascendemos Siempre" — We Always Ascend', 'font-size: 14px; font-style: italic; color: #F4E4BC;');
    console.log('%cThe Ascending House | Est. February 16, 2026', 'font-size: 12px; color: #996515;');
    console.log('%c\nWelcome, Ascender. You found the hidden message.', 'font-size: 12px; color: #C8C8C8;');
    
    // Track visitor (simple analytics placeholder)
    if (typeof gtag === 'undefined') {
        // No analytics loaded - that's fine, we value privacy
        console.log('%c🔒 No tracking. Your privacy is respected.', 'font-size: 10px; color: #666;');
    }
});

// Utility: Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
