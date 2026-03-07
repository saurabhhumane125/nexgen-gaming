// js/scroll.js — Lenis smooth scroll, GSAP canvas sequence, parallax, horizontal scroll

(function () {
    'use strict';

    // --- Lenis Smooth Scroll ---
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    // --- Preloader & Entrance Animations ---
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.style.visibility = 'hidden', 800);
            startEntranceAnimations();
        }
    });

    function startEntranceAnimations() {
        // Fade in hero content
        gsap.from(".fade-element", {
            opacity: 0,
            y: 30,
            stagger: 0.1,
            ease: "power2.out",
            duration: 1,
            delay: 0.2
        });

        // Initialize scroll-triggered fades for the rest of the page
        gsap.utils.toArray('.gsap-fade-up').forEach(el => {
            gsap.to(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    onEnter: () => el.classList.add('is-visible'),
                    once: true
                }
            });
        });
    }

    // --- Parallax ---
    gsap.utils.toArray('.parallax-item').forEach(item => {
        const speed = parseFloat(item.getAttribute('data-speed'));
        const yOffset = (1 - speed) * 150;
        gsap.fromTo(item, { y: 0 }, {
            y: yOffset, ease: "none",
            scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: true }
        });
    });

    // --- "Why Choose Us" section now uses native CSS horizontal scroll ---
    // No GSAP pinning needed — eliminates the black gap scroll glitch

    // Clean up any stale ScrollTrigger pin-spacers from previous page loads
    ScrollTrigger.refresh(true);

})();
