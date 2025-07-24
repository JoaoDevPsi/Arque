document.addEventListener('DOMContentLoaded', function() {
    const pessoas = [
        {
            nome: 'Ricardo',
            curriculo: ["Psicólogo", "Pós-graduado em Psicologia Analitica"],
            contato: "5571991337317",
            imagem: "img/ric.jpg",
            especialidades: ["Ansiedade", "Depressão", "Crises de Pânico"],
            // crp: "27/21157",
            formacao: ["Graduação em Psicologia - EBMSP", "Especialização - IJBA"],
            bio: "psicólogo clínico de orientação junguiana, formado pela Escola Bahiana de Medicina e Saúde Pública e pós-graduado pelo Instituto Junguiano da Bahia e atualmente membro fundador da Clínica Arquê. Sua prática é pautada por uma escuta profunda, respeitosa e simbólica, buscando acolher cada pessoa em sua singularidade, Apaixonado por mitologia, contos de fadas, relações humanas e cultura pop, Ricardo acredita que nossas histórias internas se conectam com narrativas universais que nos ajudam a compreender quem somos. Seu trabalho é um convite para quem deseja olhar para a própria jornada com mais significado, cuidado e transformação"
        },
        {
            nome: 'Fernando',
            curriculo: ["Psicologo", "Pós-graduado"],
            contato: "5571991337317",
            imagem: "img/nando.jpg",
            especialidades: ["Psicoterapia Analítica", "Morte e morrer", "Suicidio"],
            formacao: ["Psicólogo com formação pela Escola Bahiana de Medicina e Saúde Pública (EBMSP) e especialização em Psicoterapia Analítica pelo Instituto Junguiano da Bahia (IJBA). É membro fundador do Programa de Ações e Estudos sobre o Suicídio (PAES), onde atuava com seriedade e sensibilidade em temáticas complexas da saúde mental."],
            bio: "Com uma escuta atenta e um olhar voltado ao processo de autoconhecimento, Fernando acredita que cada trajetória humana é marcada por desafios que também revelam possibilidades de transformação. Seus principais temas de estudo incluem Contos de Fadas, Morte e o Morrer, Suicídio, Transtorno de Déficit de Atenção e Hiperatividade (TDAH), Mitologia e Sandplay."
        },
        {
            nome: 'Fernanda',
            curriculo: ["Psicologa", "Pós-graduanda"],
            contato: "5571991337317",
            imagem: "img/nanda.jpg",
            especialidades: ["Psicologia Infantil", "Orientação Vocacional"],
            formacao: ["Formada pela Escola Bahiana de Medicina e Saúde Pública e pós-graduanda em Psicoterapia Analítica pelo IJEP, Fernanda desenvolve um trabalho que une técnica, sensibilidade e criatividade. Acredita em uma psicologia viva, humana e plural, que se faz no encontro entre pessoas e na escuta genuína das singularidades."],
            bio: "Apaixonada por arte, fotografia e literatura, traz a tais recursos como aliados em seus processos terapêuticos. Seus campos de interesse incluem os estudos sobre o feminino, interpretação dos sonhos, mitologia e contos de fadas — elementos que atravessam e enriquecem sua prática clínica."
        },
        {
            nome: 'João',
            curriculo: ["Psicólogo", "Pós-graduando"],
            contato: "5571991337317", // Substitua pelo número real
            imagem: "img/nando.jpg",
            especialidades: ["Terapia de Casal", "Orientação Profissional"],
            formacao: ["Graduação em Psicologia - UFBA", "Pós-graduação em Andamento - Terapia Familiar"],
            bio: "Atendimento focado em relações interpessoais e desenvolvimento profissional"
        },
        {
            nome: 'Alana',
            curriculo: ["Psicóloga", "Pós-graduada"],
            contato: "5571991337317", // Substitua pelo número real
            imagem: "img/nanda.jpg",
            especialidades: ["Psicologia Hospitalar", "Cuidados Paliativos"],
            formacao: ["Graduação em Psicologia - UNIFACS", "Especialização em Psicologia Hospitalar"],
            bio: "Atuação humanizada em contextos hospitalares"
        },
        {
            nome: 'Julia Perret',
            curriculo: ["Psicóloga", "Pós-graduada"],
            contato: "5571991337317", // Substitua pelo número real
            imagem: "img/ric.jpg",
            especialidades: ["Neuropsicologia", "Reabilitação Cognitiva"],
            formacao: ["Graduação em Psicologia - UCSAL", "Especialização em Neuropsicologia"],
            bio: "Avaliação e intervenção neuropsicológica para todas as idades"
        },
        {
            nome: 'Louise',
            curriculo: ["Psicóloga", "Pós-graduada"],
            contato: "5571991337317", // Substitua pelo número real
            imagem: "img/nando.jpg",
            especialidades: ["Psicopedagogia", "Dificuldades de Aprendizagem"],
            formacao: ["Graduação em Psicologia - UNEB", "Especialização em Psicopedagogia"],
            bio: "Atendimento psicopedagógico para crianças e adolescentes"
        },
         {
            nome: 'Julia',
            curriculo: ["Psicóloga", "Pós-graduada"],
            contato: "5571991337317", // Substitua pelo número real
            imagem: "img/ric.jpg",
            especialidades: ["Neuropsicologia", "Reabilitação Cognitiva"],
            formacao: ["Graduação em Psicologia - UCSAL", "Especialização em Neuropsicologia"],
            bio: "Avaliação e intervenção neuropsicológica para todas as idades"
        },
        {
            nome: 'Maysa',
            curriculo: ["Psicóloga", "Pós-graduada"],
            contato: "5571991337317", // Substitua pelo número real
            imagem: "img/nanda.jpg",
            especialidades: ["Psicologia Esportiva", "Preparação Mental"],
            formacao: ["Graduação em Psicologia - UESC", "Especialização em Psicologia do Esporte"],
            bio: "Trabalho com atletas e equipes esportivas"
        }
    ];

    let currentModal = null;
    let currentIndex = 0;

    function createCard(person, index) {
        const card = document.createElement('div');
        card.classList.add('card');
        
        card.innerHTML = `
            <div class="card-img-container">
                <img src="${person.imagem || 'img/padrao.jpg'}" alt="${person.nome}" class="foto-profissional" onerror="this.src='img/padrao.jpg'">
            </div>
            <div class="card-content">
                <h2>${person.nome}</h2>
                <p>${person.curriculo.join(' | ')}</p>
                <button class="card-btn">Agendar consulta</button>
            </div>
        `;
        
        card.querySelector('.card-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            window.open(`https://wa.me/${person.contato}?text=Olá ${person.nome}, gostaria de agendar uma consulta`, '_blank');
        });
        
        card.addEventListener('click', () => {
            currentIndex = index;
            openModal(pessoas[currentIndex]);
        });
        
        return card;
    }

    function openModal(person) {
        closeModal(); // Fecha qualquer modal aberto
        
        const modal = document.createElement('div');
        modal.classList.add('modal-perfil');
        currentModal = modal;
        
        modal.innerHTML = `
            <div class="modal-conteudo">
                <button class="fechar-modal">&times;</button>
                <div class="modal-img-container">
                    <img src="${person.imagem || 'img/padrao.jpg'}" alt="${person.nome}" class="modal-foto" onerror="this.src='img/padrao.jpg'">
                </div>
                <div class="modal-nav">
                    <button class="nav-btn prev-btn">‹</button>
                    <h2>${person.nome}</h2>
                    <button class="nav-btn next-btn">›</button>
                </div>
                <div class="detalhes">
                    <h3>Especialidades</h3>
                    <ul>${(person.especialidades || ['Não informado']).map(e => `<li>${e}</li>`).join('')}</ul>
                    <h3>Formação</h3>
                    <p>${(person.formacao || ['Não informado']).join('<br>')}</p>
                    <h3>Sobre</h3>
                    <p>${person.bio || 'Informações não disponíveis'}</p>
                </div>
                <button class="botao-contato">Agendar com ${person.nome}</button>
            </div>
        `;
        
        // Event handlers
        modal.querySelector('.fechar-modal').addEventListener('click', closeModal);
        
        modal.querySelector('.botao-contato').addEventListener('click', () => {
            window.open(`https://wa.me/${person.contato}?text=Olá ${person.nome}, gostaria de agendar uma consulta`, '_blank');
        });
        
        modal.querySelector('.prev-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + pessoas.length) % pessoas.length;
            updateModalContent(pessoas[currentIndex]);
        });
        
        modal.querySelector('.next-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % pessoas.length;
            updateModalContent(pessoas[currentIndex]);
        });
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }

    function updateModalContent(person) {
        if (!currentModal) return;
        
        currentModal.querySelector('.modal-foto').src = person.imagem || 'img/padrao.jpg';
        currentModal.querySelector('.modal-nav h2').textContent = person.nome;
        currentModal.querySelector('.detalhes ul').innerHTML = 
            (person.especialidades || ['Não informado']).map(e => `<li>${e}</li>`).join('');
        currentModal.querySelector('.detalhes p:nth-of-type(1)').innerHTML = 
            (person.formacao || ['Não informado']).join('<br>');
        currentModal.querySelector('.detalhes p:nth-of-type(2)').textContent = 
            person.bio || 'Informações não disponíveis';
        currentModal.querySelector('.botao-contato').textContent = `Agendar com ${person.nome}`;
    }

    function closeModal() {
        if (currentModal) {
            currentModal.classList.remove('active');
            
            setTimeout(() => {
                if (currentModal && currentModal.parentNode) {
                    document.body.removeChild(currentModal);
                }
                currentModal = null;
                document.body.style.overflow = 'auto';
            }, 300);
        }
    }

    function init() {
        const container = document.getElementById('container');
        container.innerHTML = '';
        
        pessoas.forEach((person, index) => {
            container.appendChild(createCard(person, index));
        });
    }

    init();
});