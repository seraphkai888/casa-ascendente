// Casa Ascendente - Main Script
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
        
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
    
    // Intersection Observer for section animations
    const observerOptions = {
        root: null,
        rootMargin: '-50px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Stagger animation for child elements
                const children = entry.target.querySelectorAll('.pillar-card, .product-card');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('.story, .pillars-section, .ar-section, .collection, .emblem-section, .welcome-section, .join-section');
    sections.forEach(section => observer.observe(section));

    // Form submission with visual feedback
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const button = this.querySelector('button[type="submit"]');
            if (button) {
                const span = button.querySelector('span') || button;
                const originalText = span.textContent;
                
                span.textContent = 'Ascending...';
                button.disabled = true;
                button.style.opacity = '0.7';
                
                // Visual pulse effect
                button.classList.add('submitting');
                
                setTimeout(() => {
                    span.textContent = originalText;
                    button.disabled = false;
                    button.style.opacity = '1';
                    button.classList.remove('submitting');
                }, 3000);
            }
        });
    });

    // Console branding
    const styles = {
        title: 'font-family: serif; font-size: 28px; font-weight: bold; color: #D4AF37; text-shadow: 0 0 10px #D4AF3750;',
        motto: 'font-family: serif; font-size: 14px; font-style: italic; color: #F4E4BC;',
        date: 'font-family: serif; font-size: 11px; color: #996515;',
        hidden: 'font-family: serif; font-size: 10px; color: #666;'
    };
    
    console.log('%cCASA ASCENDENTE', styles.title);
    console.log('%c"Ascendemos Siempre"', styles.motto);
    console.log('%cThe Ascending House — Est. MMXXVI', styles.date);
    console.log('%c\n◇ Welcome, Ascender. The journey begins here.', styles.hidden);
    
});
