// ============================================
// MAIN JS - Mobile Menu, Cookie Modal, Smooth Scroll
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== MOBILE MENU - ATUALIZADO ==========
    const mobileToggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.menu');
    
    function toggleMobileMenu() {
        if (!mobileToggle || !menu) return;
        
        mobileToggle.classList.toggle('active');
        menu.classList.toggle('active');
        
        // Animação do toggle (X)
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
    
    // Fechar menu ao clicar em um link
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
                    
                    // Close mobile menu after click
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
                // Troca a logo para a versão roxa quando scrollado
                if (logoImg) {
                    logoImg.src = 'assets/logoggpurple1.png';
                }
            } else {
                navbar.classList.remove('scrolled');
                // Volta para a logo original quando no topo
                if (logoImg) {
                    logoImg.src = 'assets/logogg6.png';
                }
            }
        }
    }
    
    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Call on load to check initial state
    
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
        console.log('Cookies aceitos');
    }
    
    function handleCookieDecline() {
        localStorage.setItem('cookieChoice', 'declined');
        if (cookieModal) {
            cookieModal.classList.add('CookiePolicyModal--hide');
        }
        console.log('Cookies recusados');
    }
    
    if (acceptBtn) {
        acceptBtn.addEventListener('click', handleCookieAccept);
    }
    
    if (declineBtn) {
        declineBtn.addEventListener('click', handleCookieDecline);
    }
    
    // ========== ANIMATION ON SCROLL ==========
    const animatedElements = document.querySelectorAll('.card, .course-card, .service-category, .testimonial, .plan');
    
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
    
    // ========== STICKY HEADER SHADOW ==========
    const header = document.querySelector('.navbar');
    
    function headerScroll() {
        if (header) {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            } else {
                header.style.boxShadow = 'none';
            }
        }
    }
    
    window.addEventListener('scroll', headerScroll);
    
    console.log('Site Giovanna Galhardo carregado com sucesso!');
});