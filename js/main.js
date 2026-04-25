// ============================================
// MAIN JS - Mobile Menu, Swiper, Modals
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // ========== INICIALIZAÇÃO DOS SWIPERS ==========
    function initSwipers() {
        if (typeof Swiper !== 'undefined') {
            // Swiper do Hero (3 slides)
            const heroSwiper = new Swiper('.hero-swiper', {
                loop: true,
                effect: 'slide',
                autoplay: { delay: 8000, disableOnInteraction: false },
                speed: 800,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                }
            });

            // Swiper dos Ebooks
            const ebooksSwiper = new Swiper('.ebooks-swiper', {
                slidesPerView: 1,
                spaceBetween: 20,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                breakpoints: {
                    640: { slidesPerView: 2, spaceBetween: 20 },
                    1024: { slidesPerView: 4, spaceBetween: 25 }
                }
            });

            // Swiper dos Prints (se existir)
            const printsSwiperEl = document.querySelector('.prints-swiper');
            if (printsSwiperEl) {
                const printsSwiper = new Swiper('.prints-swiper', {
                    slidesPerView: 1,
                    spaceBetween: 20,
                    centeredSlides: false,
                    loop: false,
                    autoplay: { delay: 5000, disableOnInteraction: false },
                    navigation: {
                        nextEl: '.prints-next',
                        prevEl: '.prints-prev',
                    },
                    pagination: {
                        el: '.prints-pagination',
                        clickable: true,
                    },
                    breakpoints: {
                        768: { slidesPerView: 2, spaceBetween: 20 },
                        1024: { slidesPerView: 3, spaceBetween: 24 }
                    }
                });
            }

            // ========== SWIPER DOS DEPOIMENTOS ==========
            // Configuração: 3 cards desktop | 2 cards tablet | 1 card mobile
            const testimonialsSwiper = new Swiper('.testimonials-swiper', {
                slidesPerView: 1,
                spaceBetween: 24,
                loop: true,
                autoplay: {
                    delay: 6000,
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
                breakpoints: {
                    // Mobile: 1 card
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 16,
                    },
                    // Tablet: 2 cards
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    // Desktop: 3 cards
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 24,
                    }
                }
            });

            console.log('Todos os Swipers inicializados!');
        } else {
            console.log('Aguardando Swiper...');
            setTimeout(initSwipers, 100);
        }
    }

    initSwipers();

    // ========== VÍDEO DO SLIDE 2 - BOTÃO SOBREPOSTO ==========
    const heroVideoContainer = document.getElementById('heroVideoContainer');
    const heroVideoBtn = document.getElementById('heroVideoBtn');

    function playHeroVideoInline() {
        if (heroVideoContainer) {
            const videoId = 'dQw4w9WgXcQ'; // Substitua pelo ID do seu vídeo do YouTube
            heroVideoContainer.innerHTML = `
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1" 
                    title="Vídeo Giovanna Galhardo - Método de Estimulação Infantil" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                    style="aspect-ratio: 4/3; width: 100%; border-radius: 24px;">
                </iframe>
            `;
        }
    }

    if (heroVideoBtn) {
        heroVideoBtn.addEventListener('click', playHeroVideoInline);
    }

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

    if (mobileToggle) mobileToggle.addEventListener('click', toggleMobileMenu);

    document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 900 && menu) {
                menu.classList.remove('active');
                if (mobileToggle) mobileToggle.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                if (spans[0]) spans[0].style.transform = 'none';
                if (spans[1]) spans[1].style.opacity = '1';
                if (spans[2]) spans[2].style.transform = 'none';
            }
        });
    });

    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href !== '#' && href !== '#home' && href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
            if (href === current) link.classList.add('active');
        });
    }

    window.addEventListener('scroll', updateActiveMenu);
    updateActiveMenu();

    // ========== NAVBAR SCROLL ==========
    const navbar = document.querySelector('.navbar');
    const logoImg = document.querySelector('.logo-img');

    function handleNavbarScroll() {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
                if (logoImg) logoImg.src = 'assets/logoggpurple1.png';
            } else {
                navbar.classList.remove('scrolled');
                if (logoImg) logoImg.src = 'assets/logogg6.png';
            }
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll();

    // ========== VIDEO MODAL (fallback) ==========
    const videoModal = document.getElementById('videoModal');
    const openVideoBtn = document.getElementById('openVideoModalBtn');
    const closeVideoBtn = document.querySelector('.video-modal-close');
    const videoIframe = document.getElementById('videoIframe');
    const videoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&modestbranding=1';

    function openVideoModalFunc() {
        if (videoModal && videoIframe) {
            videoIframe.src = videoUrl;
            videoModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeVideoModalFunc() {
        if (videoModal && videoIframe) {
            videoIframe.src = '';
            videoModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    if (openVideoBtn) openVideoBtn.addEventListener('click', openVideoModalFunc);
    if (closeVideoBtn) closeVideoBtn.addEventListener('click', closeVideoModalFunc);
    if (videoModal) videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) closeVideoModalFunc();
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal && videoModal.classList.contains('show')) closeVideoModalFunc();
    });

    // ========== PRINT MODAL (versão antiga - para prints1,2,3) ==========
    const printModal = document.getElementById('printModal');
    const printModalClose = document.querySelector('.print-modal-close');
    const printModalBody = document.getElementById('printModalBody');

    const printContents = {
        print1: `
            <div class="print-card print-card-whatsapp" style="max-width: 100%; border-radius: 0;">
                <div class="print-card-header">
                    <div class="social-icon-bg whatsapp-bg"><i class="fab fa-whatsapp"></i></div>
                    <span>WhatsApp</span>
                </div>
                <div class="print-card-content">
                    <div class="message-bubble received">
                        <div class="message-author"><strong>Carla M.</strong></div>
                        <p>"Eu não sabia como ajudar meu filho. Depois do acompanhamento da Giovanna, ele começou a andar em 2 meses! ❤️"</p>
                    </div>
                    <div class="message-bubble received">
                        <div class="message-author"><strong>Carla M.</strong></div>
                        <p>"Estou muito emocionada! Recomendo demais 🙏"</p>
                    </div>
                    <div class="message-bubble received">
                        <div class="message-author"><strong>Carla M.</strong></div>
                        <p>"Hoje ele conseguiu subir escadas sozinho! Antes ele nem engatinhava direito. Giovanna mudou nossa vida!"</p>
                    </div>
                </div>
                <div class="print-card-footer">
                    <strong>Carla M. - mãe do Pedro (2 anos)</strong>
                </div>
            </div>
        `,
        print2: `
            <div class="print-card print-card-instagram" style="max-width: 100%; border-radius: 0;">
                <div class="print-card-header">
                    <div class="social-icon-bg instagram-bg"><i class="fab fa-instagram"></i></div>
                    <span>Instagram</span>
                </div>
                <div class="print-card-content">
                    <div class="insta-post">
                        <div class="insta-post-header">
                            <strong>juliana_rodrigues</strong>
                        </div>
                        <div class="insta-post-image">
                            <i class="fas fa-image"></i>
                            <span>Evolução do Lucas</span>
                        </div>
                        <div class="insta-post-caption">
                            <p>Hoje meu filho conseguiu sentar sozinho! 🥹 Há 3 meses ele nem sustentava a cabeça. Obrigada, @giovannagalhardo! Vocês precisam conhecer esse método 💜</p>
                        </div>
                    </div>
                </div>
                <div class="print-card-footer">
                    <strong>Juliana R. - mãe do Lucas (3 anos)</strong>
                </div>
            </div>
        `,
        print3: `
            <div class="print-card print-card-facebook" style="max-width: 100%; border-radius: 0;">
                <div class="print-card-header">
                    <div class="social-icon-bg facebook-bg"><i class="fab fa-facebook-f"></i></div>
                    <span>Facebook</span>
                </div>
                <div class="print-card-content">
                    <div class="fb-post">
                        <div class="fb-post-header">
                            <strong>Patrícia Santos</strong>
                            <p>Grupo Mães Especiais</p>
                        </div>
                        <div class="fb-post-message">
                            <p>Gente, preciso compartilhar minha felicidade! Minha filha Sofia, que tem autismo, começou a fazer contato visual depois que comecei as atividades que a Giovanna ensinou. Não tenho palavras! 💜</p>
                            <p>Em apenas 1 mês de acompanhamento, ela já está olhando nos olhos e interagindo mais. Recomendo de olhos fechados!</p>
                        </div>
                    </div>
                </div>
                <div class="print-card-footer">
                    <strong>Patrícia S. - mãe da Sofia (5 anos)</strong>
                </div>
            </div>
        `
    };

    function openPrintModal(printId) {
        if (printModal && printModalBody && printContents[printId]) {
            printModalBody.innerHTML = printContents[printId];
            printModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }

    function closePrintModal() {
        if (printModal) {
            printModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    document.querySelectorAll('.print-card').forEach(card => {
        card.addEventListener('click', function(e) {
            e.stopPropagation();
            const modalId = this.getAttribute('data-print-modal');
            if (modalId) openPrintModal(modalId);
        });
    });

    if (printModalClose) printModalClose.addEventListener('click', closePrintModal);
    if (printModal) printModal.addEventListener('click', function(e) {
        if (e.target === printModal) closePrintModal();
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && printModal && printModal.classList.contains('show')) closePrintModal();
    });

    // ========== MODAL DE DEPOIMENTOS COM PRINTS (versão nova - para depoimento1-5) ==========
    const testimonialModal = document.getElementById('testimonialModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.querySelector('.modal-close');

    // Mapeamento das imagens dos depoimentos
    const depoimentoImages = {
        'depoimento1': 'assets/depoimento1.png',
        'depoimento2': 'assets/depoimento2.png',
        'depoimento3': 'assets/depoimento3.png',
        'depoimento4': 'assets/depoimento4.png',
        'depoimento5': 'assets/depoimento5.png',
        'depoimento6': 'assets/depoimento6.png',
        'depoimento7': 'assets/depoimento7.png'
    };

    // Função para abrir o modal (disponível globalmente)
    window.openPrintModal = function(depoimentoId) {
        if (testimonialModal && modalImage && depoimentoImages[depoimentoId]) {
            modalImage.src = depoimentoImages[depoimentoId];
            testimonialModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    };

    // Função para fechar o modal
    function closeTestimonialModal() {
        if (testimonialModal) {
            testimonialModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    // Eventos do modal
    if (modalClose) {
        modalClose.addEventListener('click', closeTestimonialModal);
    }

    if (testimonialModal) {
        testimonialModal.addEventListener('click', function(e) {
            if (e.target === testimonialModal) {
                closeTestimonialModal();
            }
        });
    }

    // Fechar com ESC (para ambos os modais)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (testimonialModal && testimonialModal.classList.contains('show')) {
                closeTestimonialModal();
            }
            if (printModal && printModal.classList.contains('show')) {
                closePrintModal();
            }
        }
    });

    // ========== AOS INIT ==========
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true, offset: 100, disable: false });
    }
    
    console.log('Site Giovanna Galhardo carregado com sucesso!');
});

// CERTIFICADOS 

document.addEventListener('DOMContentLoaded', function() {
    // Inicializa Swiper dos Certificados - MESMA CONFIGURAÇÃO DOS DEPOIMENTOS
    const certificatesSwiper = new Swiper('.certificates-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        navigation: {
            nextEl: '.certificates-swiper .swiper-button-next',
            prevEl: '.certificates-swiper .swiper-button-prev',
        },
        pagination: {
            el: '.certificates-swiper .swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            480: {
                slidesPerView: 1.2,
                spaceBetween: 16,
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2.5,
                spaceBetween: 24,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            }
        }
    });

    // Modal para Certificados
    const certModal = document.getElementById('certificateModal');
    const certModalImage = document.getElementById('certificateModalImage');
    const certModalCaption = document.getElementById('certificateModalCaption');
    const certCloseBtn = document.querySelector('.certificate-modal-close');

    function openCertModal(imageSrc, title) {
        certModalImage.src = imageSrc;
        certModalCaption.textContent = title;
        certModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeCertModal() {
        certModal.classList.remove('show');
        document.body.style.overflow = '';
    }

    // Função global para ser chamada pelo botão
    window.openCertModalFromBtn = function(btn) {
        const card = btn.closest('.certificate-card');
        if (card) {
            const imgSrc = card.getAttribute('data-cert-image');
            const title = card.querySelector('.certificate-title')?.innerText || 'Certificado';
            if (imgSrc) openCertModal(imgSrc, title);
        }
    };

    // Evento de clique no card inteiro
    const certCards = document.querySelectorAll('.certificate-card');
    certCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Se clicou no botão, não faz nada (o botão já chama a função)
            if (e.target.closest('.btn-ver-certificado')) return;
            
            const imgSrc = this.getAttribute('data-cert-image');
            const title = this.querySelector('.certificate-title')?.innerText || 'Certificado';
            if (imgSrc) openCertModal(imgSrc, title);
        });

        // Overlay de zoom também abre o modal
        const overlay = card.querySelector('.certificate-overlay');
        if (overlay) {
            overlay.addEventListener('click', function(e) {
                e.stopPropagation();
                const imgSrc = card.getAttribute('data-cert-image');
                const title = card.querySelector('.certificate-title')?.innerText || 'Certificado';
                if (imgSrc) openCertModal(imgSrc, title);
            });
        }
    });

    // Fechar modal
    if (certCloseBtn) certCloseBtn.addEventListener('click', closeCertModal);
    
    certModal.addEventListener('click', function(e) {
        if (e.target === certModal) closeCertModal();
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && certModal.classList.contains('show')) closeCertModal();
    });
});