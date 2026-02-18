// Casa Ascendente - Advanced Particle System
// Golden souls ascending with depth and dimension

class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 80;
        this.mouseX = 0;
        this.mouseY = 0;
        this.isMouseOver = false;
        this.scrollY = 0;
        
        this.init();
        this.bindEvents();
        this.animate();
    }
    
    init() {
        this.resize();
        this.createParticles();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(this.createParticle());
        }
    }
    
    createParticle(fromBottom = false) {
        const depth = Math.random(); // 0 = far, 1 = close
        return {
            x: Math.random() * this.canvas.width,
            y: fromBottom ? this.canvas.height + 10 : Math.random() * this.canvas.height,
            size: (Math.random() * 2 + 0.5) * (0.5 + depth * 0.5),
            baseSpeedY: -(Math.random() * 0.6 + 0.2) * (0.5 + depth * 0.5),
            speedY: 0,
            speedX: (Math.random() - 0.5) * 0.2,
            opacity: (Math.random() * 0.4 + 0.1) * (0.5 + depth * 0.5),
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: Math.random() * 0.03 + 0.01,
            depth: depth,
            hue: 35 + Math.random() * 15, // Gold range
            twinkle: Math.random() * Math.PI * 2,
            twinkleSpeed: Math.random() * 0.1 + 0.05
        };
    }
    
    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        
        window.addEventListener('scroll', () => {
            this.scrollY = window.pageYOffset;
        });
        
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.isMouseOver = true;
        });
        
        document.addEventListener('mouseleave', () => {
            this.isMouseOver = false;
        });
    }
    
    drawParticle(particle) {
        // Twinkle effect
        const twinkle = Math.sin(particle.twinkle) * 0.3 + 0.7;
        const pulseOpacity = Math.sin(particle.pulse) * 0.15 + particle.opacity;
        const finalOpacity = pulseOpacity * twinkle;
        
        // Outer glow (larger, softer)
        const glowGradient = this.ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 6
        );
        glowGradient.addColorStop(0, `hsla(${particle.hue}, 80%, 60%, ${finalOpacity * 0.5})`);
        glowGradient.addColorStop(0.3, `hsla(${particle.hue}, 70%, 50%, ${finalOpacity * 0.2})`);
        glowGradient.addColorStop(1, 'transparent');
        
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size * 6, 0, Math.PI * 2);
        this.ctx.fillStyle = glowGradient;
        this.ctx.fill();
        
        // Inner glow
        const innerGradient = this.ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 3
        );
        innerGradient.addColorStop(0, `hsla(${particle.hue}, 90%, 70%, ${finalOpacity})`);
        innerGradient.addColorStop(0.5, `hsla(${particle.hue}, 80%, 55%, ${finalOpacity * 0.5})`);
        innerGradient.addColorStop(1, 'transparent');
        
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        this.ctx.fillStyle = innerGradient;
        this.ctx.fill();
        
        // Bright core
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size * 0.8, 0, Math.PI * 2);
        this.ctx.fillStyle = `hsla(45, 100%, 90%, ${finalOpacity * 1.2})`;
        this.ctx.fill();
    }
    
    updateParticle(particle, index) {
        // Base upward movement
        particle.speedY = particle.baseSpeedY;
        
        // Parallax based on scroll
        const scrollEffect = this.scrollY * 0.0005 * (1 - particle.depth);
        particle.speedY -= scrollEffect;
        
        // Move particle
        particle.y += particle.speedY;
        particle.x += particle.speedX;
        
        // Subtle horizontal wave
        particle.x += Math.sin(particle.pulse * 0.5) * 0.2;
        
        // Pulse and twinkle
        particle.pulse += particle.pulseSpeed;
        particle.twinkle += particle.twinkleSpeed;
        
        // Mouse interaction - magnetic attraction/repulsion
        if (this.isMouseOver) {
            const dx = particle.x - this.mouseX;
            const dy = particle.y - this.mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 150) {
                const force = (150 - dist) / 150;
                // Slight attraction for close particles, repulsion for far
                const direction = particle.depth > 0.5 ? -0.3 : 0.3;
                particle.x += (dx / dist) * force * direction;
                particle.y += (dy / dist) * force * direction;
            }
        }
        
        // Respawn at bottom when particle reaches top
        if (particle.y < -20) {
            this.particles[index] = this.createParticle(true);
        }
        
        // Wrap horizontally with fade
        if (particle.x < -20) particle.x = this.canvas.width + 20;
        if (particle.x > this.canvas.width + 20) particle.x = -20;
    }
    
    drawConnections() {
        // Only connect nearby particles of similar depth
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const p1 = this.particles[i];
                const p2 = this.particles[j];
                
                // Only connect if similar depth
                if (Math.abs(p1.depth - p2.depth) > 0.3) continue;
                
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 100) {
                    const opacity = (1 - dist / 100) * 0.15 * Math.min(p1.depth, p2.depth);
                    
                    // Gradient line
                    const gradient = this.ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
                    gradient.addColorStop(0, `hsla(${p1.hue}, 70%, 50%, ${opacity})`);
                    gradient.addColorStop(1, `hsla(${p2.hue}, 70%, 50%, ${opacity})`);
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = gradient;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Sort by depth (draw far particles first)
        this.particles.sort((a, b) => a.depth - b.depth);
        
        // Draw connections first
        this.drawConnections();
        
        // Update and draw particles
        this.particles.forEach((particle, index) => {
            this.updateParticle(particle, index);
            this.drawParticle(particle);
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem('particles');
});
