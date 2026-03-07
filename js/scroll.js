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

    // --- Horizontal Scroll ("Why Choose Us") ---
    if (window.innerWidth >= 768) {
        const section = document.querySelector('.why-choose-section');
        const track = document.querySelector('.horizontal-track');
        if (section && track) {
            const scrollWidth = track.scrollWidth - window.innerWidth;
            gsap.to(track, {
                x: -scrollWidth,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: () => `+=${scrollWidth}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true
                }
            });
        }
    }

})();
