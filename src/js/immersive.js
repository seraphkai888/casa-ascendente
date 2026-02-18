// Casa Ascendente - Immersive Experience
// 3D Effects, AR Modal, Interactive Elements

document.addEventListener('DOMContentLoaded', () => {
    
    // 3D Tilt Effect for Cards
    const tiltCards = document.querySelectorAll('[data-tilt]');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            
            // Move shine effect
            const shine = card.querySelector('.card-shine');
            if (shine) {
                const shineX = (x / rect.width) * 100;
                const shineY = (y / rect.height) * 100;
                shine.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(212, 175, 55, 0.15) 0%, transparent 50%)`;
                shine.style.opacity = '1';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            
            const shine = card.querySelector('.card-shine');
            if (shine) {
                shine.style.opacity = '0';
            }
        });
    });
    
    // AR Modal
    const launchArBtn = document.getElementById('launch-ar');
    const arModal = document.getElementById('ar-modal');
    const closeArBtn = document.getElementById('close-ar');
    
    if (launchArBtn && arModal) {
        launchArBtn.addEventListener('click', (e) => {
            e.preventDefault();
            arModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeArBtn && arModal) {
        closeArBtn.addEventListener('click', () => {
            arModal.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Close on backdrop click
        arModal.addEventListener('click', (e) => {
            if (e.target === arModal) {
                arModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && arModal && arModal.classList.contains('active')) {
            arModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Parallax scroll effect for emblem section
    const parallaxBg = document.querySelector('.emblem-parallax-bg');
    if (parallaxBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const section = parallaxBg.closest('section');
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const rate = scrolled * 0.1;
                    parallaxBg.style.transform = `rotate(${rate}deg)`;
                }
            }
        });
    }
    
    // Text reveal animation on scroll
    const revealTexts = document.querySelectorAll('.reveal-text');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.5 });
    
    revealTexts.forEach(text => {
        revealObserver.observe(text);
    });
    
    // Holographic emblem mouse tracking
    const hologramContainer = document.querySelector('.hologram-container');
    
    if (hologramContainer) {
        document.addEventListener('mousemove', (e) => {
            const rect = hologramContainer.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const angleX = (e.clientY - centerY) / 30;
            const angleY = (e.clientX - centerX) / 30;
            
            const emblem = hologramContainer.querySelector('.emblem');
            if (emblem) {
                emblem.style.transform = `rotateX(${-angleX}deg) rotateY(${angleY}deg)`;
            }
        });
    }
    
    // Smooth scroll with easing for immersive feel
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80;
                smoothScrollTo(targetPosition, 1000);
            }
        });
    });
    
    function smoothScrollTo(targetPosition, duration) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            // Easing function (ease-out-quart)
            const easing = 1 - Math.pow(1 - progress, 4);
            
            window.scrollTo(0, startPosition + distance * easing);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }
        
        requestAnimationFrame(animation);
    }
    
    // Add loaded class after page load for entrance animations
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
    
    // Check for AR support and update UI
    if ('xr' in navigator) {
        navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
            const arNote = document.querySelector('.ar-note');
            if (arNote && supported) {
                arNote.textContent = 'AR supported on this device';
                arNote.style.color = '#D4AF37';
            }
        }).catch(() => {
            // AR not supported, keep default message
        });
    }
    
});
