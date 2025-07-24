document.addEventListener('DOMContentLoaded', function() {
    
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    
    function alertar(event) {
        if (!confirm('Você será redirecionado para um site externo. Deseja continuar?')) {
            event.preventDefault();
        }
    }
    
    
    document.querySelectorAll('a[onclick="alertar()"]').forEach(link => {
        link.addEventListener('click', alertar);
    });
    
    
    const form = document.getElementById('atendaForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            
            const nome = document.getElementById('nomesobrenome').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const abordagem = document.getElementById('abordagem').value.trim();
            
            if (!nome || !telefone || !abordagem) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            
            if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(telefone)) {
                alert('Por favor, insira um telefone válido no formato (XX) XXXXX-XXXX');
                return;
            }
            
            
            alert('Formulário enviado com sucesso! Entraremos em contato em breve.');
            form.reset();
        });
    }
    
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                value = '(' + value;
            }
            if (value.length > 3) {
                value = value.substring(0, 3) + ') ' + value.substring(3);
            }
            if (value.length > 10) {
                value = value.substring(0, 10) + '-' + value.substring(10, 14);
            }
            
            e.target.value = value;
        });
    }
});