// Função para o alerta de redirecionamento
function alertar() {
    if (!confirm('Você será redirecionado da página, deseja continuar?')) {
        event.preventDefault();
    }
}

// Efeito de scroll suave para âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animação dos elementos ao rolar a página
document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.plano, .passos, .planoimg').forEach(el => {
        observer.observe(el);
    });
});