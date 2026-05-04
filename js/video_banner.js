/* =========================================================
   LÓGICA DO POP-UP DO VÍDEO DO BANNER
   Arquivo: js/video_banner.js
   ========================================================= */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        const openButtons = document.querySelectorAll('.video-banner-open');
        const modal = document.getElementById('videoBannerModal');
        const player = document.getElementById('videoBannerPlayer');
        const closeButtons = document.querySelectorAll('[data-video-close]');

        if (!openButtons.length || !modal || !player) {
            return;
        }

        function openModal() {
            modal.classList.add('is-active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.classList.add('video-banner-no-scroll');

            player.currentTime = 0;
            player.play().catch(function () {
                // Alguns navegadores podem bloquear autoplay.
                // Nesse caso, o usuário inicia pelo controle do player.
            });
        }

        function closeModal() {
            modal.classList.remove('is-active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('video-banner-no-scroll');

            player.pause();
            player.currentTime = 0;
        }

        openButtons.forEach(function (button) {
            button.addEventListener('click', openModal);
        });

        closeButtons.forEach(function (button) {
            button.addEventListener('click', closeModal);
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && modal.classList.contains('is-active')) {
                closeModal();
            }
        });
    });
})();
