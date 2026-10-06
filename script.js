/* ==========================================
   AETHERIA SCRIPT.JS // GSAP, ScrollTrigger & Interactions
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP ScrollTrigger
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // --- Mobile Navigation Toggle ---
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // --- Header Scroll Effect ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(7, 9, 14, 0.95)';
            header.style.borderBottomColor = 'rgba(167, 139, 250, 0.3)';
        } else {
            header.style.background = 'rgba(7, 9, 14, 0.8)';
            header.style.borderBottomColor = 'var(--border-glass)';
        }
    });

    // --- Magnetic CTA Buttons ---
    const magneticButtons = document.querySelectorAll('.magnetic');
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.4)'
            });
        });
    });

    // --- Hero Animations (GSAP) ---
    if (typeof gsap !== 'undefined') {
        const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        heroTl.from('.hero-badge', {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 0.2
        })
        .from('.hero-title', {
            opacity: 0,
            y: 40,
            duration: 1.2
        }, '-=0.6')
        .from('.hero-subtitle', {
            opacity: 0,
            y: 30,
            duration: 1
        }, '-=0.8')
        .from('.hero-cta-group', {
            opacity: 0,
            y: 30,
            duration: 1
        }, '-=0.7')
        .from('.hero-stats', {
            opacity: 0,
            y: 40,
            duration: 1.2,
            onComplete: startCounters
        }, '-=0.6')
        .from('.glass-preview-card, .rotating-stamp', {
            opacity: 0,
            scale: 0.95,
            duration: 1.5,
            stagger: 0.3
        }, '-=1');

        // --- ScrollTrigger Section Reveals ---
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            gsap.from(section.querySelectorAll('.section-header, .about-card, .bento-card, .showcase-item, .pricing-card, .testimonial-card, .cta-banner'), {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 50,
                duration: 1,
                stagger: 0.15,
                ease: 'power3.out'
            });
        });
    } else {
        // Fallback if GSAP fails to load
        startCounters();
    }

    // --- Counter Animation ---
    function startCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(num => {
            const target = parseFloat(num.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const startTime = performance.now();
            const isDecimal = target % 1 !== 0;

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out expo
                const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                
                const currentVal = target * easeProgress;
                num.textContent = isDecimal ? currentVal.toFixed(2) : Math.floor(currentVal);

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    num.textContent = isDecimal ? target.toFixed(2) : target;
                }
            }

            requestAnimationFrame(updateCounter);
        });
    }

    // --- Interactive Showcase Hover Effect ---
    const showcaseItems = document.querySelectorAll('.showcase-item');
    showcaseItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, { y: -8, duration: 0.3, ease: 'power2.out' });
        });
        item.addEventListener('mouseleave', () => {
            gsap.to(item, { y: 0, duration: 0.3, ease: 'power2.out' });
        });
    });

    console.log("Aetheria OS initialized successfully.");
});
