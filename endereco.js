document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const captionText = document.getElementById('caption');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const triggers = document.querySelectorAll('.lightbox-trigger');

    // Variáveis de controle
    let currentIndex = 0;
    const images = Array.from(triggers).map(img => ({
        src: img.src,
        alt: img.alt
    }));

    // Função para mostrar imagem específica
    function showImage(index) {
        if (images.length === 0) return;
        
        // Corrige índice se for além dos limites
        currentIndex = (index + images.length) % images.length;
        
        lightboxImg.src = images[currentIndex].src;
        captionText.textContent = images[currentIndex].alt;
    }

    // Event Listeners
    triggers.forEach((trigger, index) => {
        trigger.addEventListener('click', () => {
            currentIndex = index;
            lightbox.style.display = 'block';
            showImage(currentIndex);
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita fechar o lightbox
        showImage(currentIndex - 1);
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showImage(currentIndex + 1);
    });

    // Fecha ao clicar fora da imagem
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    // Navegação por teclado
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'block') {
            if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
            if (e.key === 'ArrowRight') showImage(currentIndex + 1);
            if (e.key === 'Escape') lightbox.style.display = 'none';
        }
    });
});