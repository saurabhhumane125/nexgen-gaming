// js/interactions.js — Custom cursor, magnetic buttons, 3D tilt cards

(function () {
    'use strict';

    // --- Custom Cursor ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (window.matchMedia("(hover: hover)").matches) {
        window.addEventListener('mousemove', (e) => {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
            gsap.to(cursorOutline, {
                x: e.clientX, y: e.clientY,
                duration: 0.15, ease: "power2.out"
            });
        });
        document.querySelectorAll('a, button, .select-plan').forEach(el => {
            el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
        });

        // --- Magnetic Buttons ---
        document.querySelectorAll('.magnetic').forEach((el) => {
            el.addEventListener('mousemove', (e) => {
                const pos = el.getBoundingClientRect();
                const x = e.pageX - pos.left - pos.width / 2;
                const y = e.pageY - pos.top - pos.height / 2;
                gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.5, ease: "power2.out" });
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(el, { x: 0, y: 0, duration: 1.2, ease: "elastic.out(1, 0.3)" });
            });
        });

        // --- 3D Tilt Cards ---
        document.querySelectorAll('.tilt-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -15;
                const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 15;
                gsap.to(card, { rotateX, rotateY, transformPerspective: 1000, duration: 0.5, ease: "power2.out" });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { rotateX: 0, rotateY: 0, duration: 1.2, ease: "elastic.out(1, 0.3)" });
            });
        });
    }

})();

// --- Floating Particles System (desktop only) ---
(function () {
    'use strict';
    if (!window.matchMedia("(hover: hover)").matches) return;

    const container = document.getElementById('particles');
    if (!container) return;

    const PARTICLE_COUNT = 20;
    const colors = ['rgba(0,229,255,0.5)', 'rgba(123,60,255,0.4)', 'rgba(255,255,255,0.2)'];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const dot = document.createElement('div');
        dot.classList.add('particle');
        const size = Math.random() * 4 + 2;
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        dot.style.left = `${Math.random() * 100}%`;
        dot.style.background = colors[Math.floor(Math.random() * colors.length)];
        dot.style.animationDuration = `${Math.random() * 12 + 8}s`;
        dot.style.animationDelay = `${Math.random() * 10}s`;
        container.appendChild(dot);
    }
})();
