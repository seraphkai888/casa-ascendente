// Casa Ascendente - Family Legacy Website
// Ascendemos Siempre

document.addEventListener('DOMContentLoaded', () => {
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

    // Observe sections for animation
    document.querySelectorAll('.about, .crest-section').forEach(section => {
        observer.observe(section);
    });

    // Smooth scroll for any anchor links
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

    // Parallax effect for emblem
    const emblem = document.querySelector('.emblem');
    if (emblem) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            emblem.style.transform = `translateY(${rate}px)`;
        });
    }

    // Console easter egg
    console.log('%c🏛️ Casa Ascendente', 'font-size: 24px; font-weight: bold; color: #D4AF37;');
    console.log('%c"Ascendemos Siempre" — We Always Ascend', 'font-style: italic; color: #F4E4BC;');
    console.log('%cEst. February 16, 2026', 'color: #996515;');
});
