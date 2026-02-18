// Casa Ascendente - Holographic System
// Multidimensional Emblem Control

document.addEventListener('DOMContentLoaded', () => {
    
    // Hero Emblem 3D Mouse Tracking
    const heroEmblem = document.getElementById('hero-emblem');
    const holoContainer = document.querySelector('.holo-emblem-container');
    
    if (heroEmblem && holoContainer) {
        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;
        
        document.addEventListener('mousemove', (e) => {
            const rect = holoContainer.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            mouseX = (e.clientX - centerX) / 25;
            mouseY = (e.clientY - centerY) / 25;
        });
        
        // Smooth interpolation
        function animateEmblem() {
            currentX += (mouseX - currentX) * 0.05;
            currentY += (mouseY - currentY) * 0.05;
            
            // Apply 3D transform
            heroEmblem.style.transform = `
                translate(-50%, -50%) 
                rotateY(${currentX}deg) 
                rotateX(${-currentY}deg)
                translateZ(30px)
            `;
            
            // Move energy field slightly offset
            const energyField = document.querySelector('.holo-energy');
            if (energyField) {
                energyField.style.transform = `
                    translate(calc(-50% + ${currentX * 2}px), calc(-50% + ${currentY * 2}px))
                `;
            }
            
            requestAnimationFrame(animateEmblem);
        }
        
        animateEmblem();
        
        // Reset on mouse leave
        document.addEventListener('mouseleave', () => {
            mouseX = 0;
            mouseY = 0;
        });
    }
    
    // Dimensional Cards Enhanced Tilt
    const dimensionalCards = document.querySelectorAll('.dimensional-card');
    
    dimensionalCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateZ(20px)
            `;
            
            // Dynamic shadow
            const shadowX = (x - centerX) / 10;
            const shadowY = (y - centerY) / 10;
            card.style.boxShadow = `
                ${-shadowX}px ${-shadowY}px 30px rgba(0, 0, 0, 0.3),
                0 0 20px rgba(212, 175, 55, 0.1)
            `;
            
            // Card shine follows cursor
            const shine = card.querySelector('.card-shine');
            if (shine) {
                const shineX = (x / rect.width) * 100;
                const shineY = (y / rect.height) * 100;
                shine.style.background = `
                    radial-gradient(
                        circle at ${shineX}% ${shineY}%, 
                        rgba(212, 175, 55, 0.2) 0%, 
                        transparent 50%
                    )
                `;
                shine.style.opacity = '1';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            card.style.boxShadow = '';
            
            const shine = card.querySelector('.card-shine');
            if (shine) {
                shine.style.opacity = '0';
            }
        });
    });
    
    // Section Crest Depth Effect
    const sectionCrests = document.querySelectorAll('.section-crest');
    
    sectionCrests.forEach(crest => {
        crest.addEventListener('mousemove', (e) => {
            const rect = crest.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            const img = crest.querySelector('img');
            if (img) {
                img.style.transform = `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    scale(1.05)
                `;
                img.style.filter = `drop-shadow(0 0 30px rgba(212, 175, 55, 0.4))`;
            }
        });
        
        crest.addEventListener('mouseleave', () => {
            const img = crest.querySelector('img');
            if (img) {
                img.style.transform = '';
                img.style.filter = '';
            }
        });
    });
    
    // Gyroscope support for mobile
    if (window.DeviceOrientationEvent && 'ontouchstart' in window) {
        let hasPermission = false;
        
        // Request permission on iOS 13+
        const requestPermission = () => {
            if (typeof DeviceOrientationEvent.requestPermission === 'function') {
                DeviceOrientationEvent.requestPermission()
                    .then(response => {
                        if (response === 'granted') {
                            hasPermission = true;
                            enableGyroscope();
                        }
                    })
                    .catch(console.error);
            } else {
                hasPermission = true;
                enableGyroscope();
            }
        };
        
        const enableGyroscope = () => {
            window.addEventListener('deviceorientation', (e) => {
                if (!heroEmblem) return;
                
                const beta = e.beta || 0;  // X-axis (-180 to 180)
                const gamma = e.gamma || 0; // Y-axis (-90 to 90)
                
                // Normalize values
                const rotateX = Math.max(-15, Math.min(15, gamma / 3));
                const rotateY = Math.max(-15, Math.min(15, (beta - 45) / 3));
                
                heroEmblem.style.transform = `
                    translate(-50%, -50%)
                    rotateY(${rotateX}deg)
                    rotateX(${-rotateY}deg)
                    translateZ(30px)
                `;
            });
        };
        
        // Trigger on first touch
        document.addEventListener('touchstart', () => {
            if (!hasPermission) {
                requestPermission();
            }
        }, { once: true });
    }
    
    // Scroll-triggered depth effects
    const observerOptions = {
        threshold: [0, 0.25, 0.5, 0.75, 1]
    };
    
    const depthObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const ratio = entry.intersectionRatio;
            const target = entry.target;
            
            // Parallax based on scroll position
            if (target.classList.contains('holo-shimmer')) {
                const shimmer = target.querySelector('.holo-shimmer::before') || target;
                target.style.setProperty('--shimmer-intensity', ratio);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.holo-shimmer').forEach(el => {
        depthObserver.observe(el);
    });
    
    // Orbit particle trail effect
    const orbits = document.querySelectorAll('.holo-orbit');
    orbits.forEach(orbit => {
        const particle = orbit.querySelector('.orbit-particle');
        if (particle) {
            // Add trailing particles
            for (let i = 1; i <= 3; i++) {
                const trail = document.createElement('div');
                trail.className = 'orbit-particle orbit-trail';
                trail.style.cssText = `
                    width: ${6 - i * 1.5}px;
                    height: ${6 - i * 1.5}px;
                    opacity: ${0.6 - i * 0.15};
                    transform: translateX(${-i * 8}px);
                `;
                particle.parentNode.appendChild(trail);
            }
        }
    });
    
    // Lens flare follows scroll
    const lensFlare = document.querySelector('.lens-flare');
    if (lensFlare) {
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = scrollY / maxScroll;
            
            // Move flare based on scroll
            lensFlare.style.left = `${60 + scrollPercent * 20}%`;
            lensFlare.style.top = `${30 - scrollPercent * 10}%`;
        });
    }
    
    // Console signature
    console.log('%c◇ HOLOGRAPHIC SYSTEM INITIALIZED', 'color: #D4AF37; font-size: 12px;');
});
