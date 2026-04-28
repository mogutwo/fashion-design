/**
 * NOIR STUDIO - Interactive Features
 * Mobile-first fashion website
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initSmoothScroll();
    initScrollAnimations();
    initParallax();
});

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Scroll-triggered animations using Intersection Observer
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe product cards
    document.querySelectorAll('.product-card').forEach(card => {
        observer.observe(card);
    });
    
    // Observe lookbook items
    document.querySelectorAll('.lookbook-item').forEach(item => {
        observer.observe(item);
    });
    
    // Observe about section
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        observer.observe(aboutSection);
    }
}

/**
 * Subtle parallax effect on hero shapes
 */
function initParallax() {
    const shapes = document.querySelectorAll('.hero-shape');
    if (shapes.length === 0) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                shapes.forEach((shape, index) => {
                    const speed = (index + 1) * 0.1;
                    const yPos = scrollY * speed;
                    shape.style.transform = `translateY(${yPos}px)${index === 1 ? ' rotate(45deg)' : ''}`;
                });
                ticking = false;
            });
            ticking = true;
        }
    });
}

/**
 * Quick view modal (placeholder for future implementation)
 */
function initQuickView() {
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = btn.closest('.product-card');
            const productName = card.querySelector('.product-name').textContent;
            // Placeholder - could open a modal with product details
            console.log(`Quick view: ${productName}`);
        });
    });
}

// Initialize quick view
initQuickView();