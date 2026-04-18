// ============================================
// MAIN JS - Mobile Menu, Cookie Modal, Smooth Scroll, Swiper
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== INICIALIZAÇÃO DO SWIPER ==========
    function initSwiper() {
        if (typeof Swiper !== 'undefined') {
            const heroSwiper = new Swiper('.hero-swiper', {
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                effect: 'slide',
                speed: 800,
            });
            console.log('Swiper inicializado com sucesso!');
        } else {
            console.log('Aguardando Swiper carregar...');
            setTimeout(initSwiper, 100);
        }
    }
    
    initSwiper();
    
    // ========== MOBILE MENU ==========
    const mobileToggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.menu');
    
    function toggleMobileMenu() {
        if (!mobileToggle || !menu) return;
        
        mobileToggle.classList.toggle('active');
        menu.classList.toggle('active');
        
        const spans = mobileToggle.querySelectorAll('span');
        if (menu.classList.contains('active')) {
            if (spans[0]) spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (spans[1]) spans[1].style.opacity = '0';
            if (spans[2]) spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            if (spans[0]) spans[0].style.transform = 'none';
            if (spans[1]) spans[1].style.opacity = '1';
            if (spans[2]) spans[2].style.transform = 'none';
        }
    }
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Fechar menu ao clicar em link
    document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 900 && menu) {
                menu.classList.remove('active');
                if (mobileToggle) {
                    mobileToggle.classList.remove('active');
                    const spans = mobileToggle.querySelectorAll('span');
                    if (spans[0]) spans[0].style.transform = 'none';
                    if (spans[1]) spans[1].style.opacity = '1';
                    if (spans[2]) spans[2].style.transform = 'none';
                }
            }
        });
    });
    
    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '' && href !== '#home') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    if (window.innerWidth <= 900 && menu && menu.classList.contains('active')) {
                        toggleMobileMenu();
                    }
                }
            }
        });
    });
    
    // ========== ACTIVE MENU ON SCROLL ==========
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.menu a');
    
    function updateActiveMenu() {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if (href === current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveMenu);
    updateActiveMenu();
    
    // ========== NAVBAR SCROLL COLOR CHANGE + LOGO TROCA ==========
    const navbar = document.querySelector('.navbar');
    const logoImg = document.querySelector('.logo-img');
    
    function handleNavbarScroll() {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
                if (logoImg) {
                    logoImg.src = 'assets/logoggpurple1.png';
                }
            } else {
                navbar.classList.remove('scrolled');
                if (logoImg) {
                    logoImg.src = 'assets/logogg6.png';
                }
            }
        }
    }
    
    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll();
    
    // ========== COOKIE MODAL ==========
    const cookieModal = document.getElementById('cookieModal');
    const acceptBtn = document.getElementById('acceptCookies');
    const declineBtn = document.getElementById('declineCookies');
    
    const cookieChoice = localStorage.getItem('cookieChoice');
    
    if (!cookieChoice && cookieModal) {
        setTimeout(() => {
            cookieModal.classList.remove('CookiePolicyModal--hide');
        }, 1000);
    }
    
    function handleCookieAccept() {
        localStorage.setItem('cookieChoice', 'accepted');
        if (cookieModal) {
            cookieModal.classList.add('CookiePolicyModal--hide');
        }
    }
    
    function handleCookieDecline() {
        localStorage.setItem('cookieChoice', 'declined');
        if (cookieModal) {
            cookieModal.classList.add('CookiePolicyModal--hide');
        }
    }
    
    if (acceptBtn) {
        acceptBtn.addEventListener('click', handleCookieAccept);
    }
    
    if (declineBtn) {
        declineBtn.addEventListener('click', handleCookieDecline);
    }
    
    // ========== ANIMATION ON SCROLL ==========
    const animatedElements = document.querySelectorAll('.card, .service-category, .testimonial, .plan-card');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    function animateOnScroll() {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;
            
            if (elementPosition < screenPosition - 50) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
    
    console.log('Site Giovanna Galhardo carregado com sucesso!');
});