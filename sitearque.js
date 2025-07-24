document.addEventListener('DOMContentLoaded', function() {
    // Atualiza o ano no footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Função de alerta para links externos
    function alertar() {
        return confirm('Você será redirecionado para um site externo. Deseja continuar?');
    }

    // Carrossel Avançado
    class Carousel {
        constructor(container) {
            this.container = container;
            this.items = Array.from(container.querySelectorAll('.carousel-item'));
            this.prevBtn = container.querySelector('.carousel-control.prev');
            this.nextBtn = container.querySelector('.carousel-control.next');
            this.currentIndex = 0;
            this.interval = null;
            this.autoPlayDelay = 5000; // 5 segundos
            this.isPaused = false;

            this.init();
        }

        init() {
            // Mostra o primeiro item
            this.showItem(this.currentIndex);
            
            // Event listeners
            this.prevBtn.addEventListener('click', () => {
                this.prev();
                this.resetAutoPlay();
            });
            
            this.nextBtn.addEventListener('click', () => {
                this.next();
                this.resetAutoPlay();
            });

            // Pausa ao interagir
            this.container.addEventListener('mouseenter', () => this.pause());
            this.container.addEventListener('mouseleave', () => this.play());

            // Inicia o autoplay
            this.startAutoPlay();
        }

        showItem(index) {
            // Atualiza índice atual
            this.currentIndex = index;
            
            // Esconde todos os itens
            this.items.forEach(item => item.classList.remove('active'));
            
            // Mostra o item atual
            this.items[this.currentIndex].classList.add('active');
        }

        next() {
            const newIndex = (this.currentIndex + 1) % this.items.length;
            this.showItem(newIndex);
        }

        prev() {
            const newIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
            this.showItem(newIndex);
        }

        startAutoPlay() {
            if (!this.interval && !this.isPaused) {
                this.interval = setInterval(() => this.next(), this.autoPlayDelay);
            }
        }

        stopAutoPlay() {
            if (this.interval) {
                clearInterval(this.interval);
                this.interval = null;
            }
        }

        resetAutoPlay() {
            this.stopAutoPlay();
            this.startAutoPlay();
        }

        pause() {
            this.isPaused = true;
            this.stopAutoPlay();
        }

        play() {
            this.isPaused = false;
            this.startAutoPlay();
        }
    }

    // Inicializa o carrossel se existir na página
    const carouselElement = document.querySelector('.carousel');
    if (carouselElement) {
        new Carousel(carouselElement);
    }
});