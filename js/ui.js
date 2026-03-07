// js/ui.js — Mobile menu, header scroll, pricing select, booking form

(function () {
    'use strict';

    // --- Mobile Menu ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.classList.replace('ph-list', 'ph-x');
            } else {
                icon.classList.replace('ph-x', 'ph-list');
            }
        });
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                menuBtn.querySelector('i').classList.replace('ph-x', 'ph-list');
            });
        });
    }

    // --- Header Scroll Effect ---
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(11, 11, 15, 0.95)';
                header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
            } else {
                header.style.background = 'rgba(11, 11, 15, 0.8)';
                header.style.boxShadow = 'none';
            }
        });
    }

    // --- Pricing Card to Booking Form ---
    const selectPlanBtns = document.querySelectorAll('.select-plan');
    const platformSelect = document.getElementById('platform');
    selectPlanBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const planType = e.target.getAttribute('data-type');
            if (platformSelect && planType) platformSelect.value = planType;
        });
    });

    // --- Booking Form WhatsApp Integration ---
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const platform = document.getElementById('platform').value;
            const game = document.getElementById('game').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;

            const waNumber = "918779663354";
            const message = `*New Booking Request - NexGen Lounge*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Platform:* ${platform}%0A*Game:* ${game}%0A*Date:* ${date}%0A*Time:* ${time}%0A%0A_Please confirm my slot._`;
            window.open(`https://wa.me/${waNumber}?text=${message}`, '_blank');
            bookingForm.reset();
        });
    }

    // --- Stats Counter Animation ---
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length) {
        const animateCounter = (el) => {
            const target = parseFloat(el.getAttribute('data-target'));
            const isDecimal = target % 1 !== 0;
            const duration = 2000;
            const startTime = performance.now();

            const step = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = eased * target;

                el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);

                if (progress < 1) {
                    requestAnimationFrame(step);
                }
            };
            requestAnimationFrame(step);
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(el => observer.observe(el));
    }

    // --- Scroll to Top Button ---
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 600) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

})();
