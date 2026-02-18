// Casa Ascendente - Particle System
// Golden particles that rise like ascending souls

class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;
        this.mouseX = 0;
        this.mouseY = 0;
        this.isMouseOver = false;
        
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
        return {
            x: Math.random() * this.canvas.width,
            y: fromBottom ? this.canvas.height + 10 : Math.random() * this.canvas.height,
            size: Math.random() * 2 + 0.5,
            speedY: -(Math.random() * 0.5 + 0.2),
            speedX: (Math.random() - 0.5) * 0.3,
            opacity: Math.random() * 0.5 + 0.1,
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: Math.random() * 0.02 + 0.01
        };
    }
    
    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        
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
        const pulseOpacity = Math.sin(particle.pulse) * 0.2 + particle.opacity;
        
        // Golden glow
        const gradient = this.ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 3
        );
        gradient.addColorStop(0, `rgba(212, 175, 55, ${pulseOpacity})`);
        gradient.addColorStop(0.5, `rgba(212, 175, 55, ${pulseOpacity * 0.3})`);
        gradient.addColorStop(1, 'transparent');
        
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
        
        // Core
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(244, 228, 188, ${pulseOpacity})`;
        this.ctx.fill();
    }
    
    updateParticle(particle, index) {
        // Move upward (ascending)
        particle.y += particle.speedY;
        particle.x += particle.speedX;
        
        // Pulse effect
        particle.pulse += particle.pulseSpeed;
        
        // Mouse interaction - particles gently move away
        if (this.isMouseOver) {
            const dx = particle.x - this.mouseX;
            const dy = particle.y - this.mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 100) {
                const force = (100 - dist) / 100;
                particle.x += (dx / dist) * force * 0.5;
                particle.y += (dy / dist) * force * 0.5;
            }
        }
        
        // Respawn at bottom when particle reaches top
        if (particle.y < -10) {
            this.particles[index] = this.createParticle(true);
        }
        
        // Wrap horizontally
        if (particle.x < -10) particle.x = this.canvas.width + 10;
        if (particle.x > this.canvas.width + 10) particle.x = -10;
    }
    
    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 120) {
                    const opacity = (1 - dist / 120) * 0.1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = `rgba(212, 175, 55, ${opacity})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw connections first (behind particles)
        this.drawConnections();
        
        // Update and draw particles
        this.particles.forEach((particle, index) => {
            this.updateParticle(particle, index);
            this.drawParticle(particle);
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem('particles');
});
