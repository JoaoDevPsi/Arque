document.addEventListener('DOMContentLoaded', function() {
    // Verifica autenticação
    if (!checkAuth()) {
        window.location.href = 'login.html';
        return;
    }
    
    // Elementos do DOM
    const postForm = document.getElementById('postForm');
    const postType = document.getElementById('postType');
    const singleImageSection = document.getElementById('singleImageSection');
    const carouselSection = document.getElementById('carouselSection');
    const carouselImages = document.getElementById('carouselImages');
    const addImageBtn = document.getElementById('addImageBtn');
    const deleteBtn = document.getElementById('deleteBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    
    // Dados do post sendo editado
    let currentPost = null;
    let carouselItems = [];
    
    // Verifica se está editando um post existente
    const urlParams = new URLSearchParams(window.location.search);
    const editPostId = urlParams.get('edit');
    
    // Event Listeners
    postType.addEventListener('change', togglePostType);
    addImageBtn.addEventListener('click', addCarouselImage);
    postForm.addEventListener('submit', savePost);
    deleteBtn.addEventListener('click', deleteCurrentPost);
    cancelBtn.addEventListener('click', () => window.location.href = 'admin.html');
    logoutBtn.addEventListener('click', logout);
    
    // Inicialização
    if (editPostId) {
        loadPostForEditing(editPostId);
        deleteBtn.style.display = 'inline-block';
    } else {
        deleteBtn.style.display = 'none';
    }
    
    // Funções
    function togglePostType() {
        const type = postType.value;
        singleImageSection.style.display = type === 'single' ? 'block' : 'none';
        carouselSection.style.display = type === 'carousel' ? 'block' : 'none';
    }
    
    function addCarouselImage() {
        const url = document.getElementById('newImageUrl').value.trim();
        const alt = document.getElementById('newImageAlt').value.trim();
        const link = document.getElementById('newImageLink').value.trim();
        
        if (!url) {
            alert('URL da imagem é obrigatória');
            return;
        }
        
        const newImage = {
            image: url,
            alt: alt || 'Imagem do carrossel',
            link: link || '#'
        };
        
        carouselItems.push(newImage);
        renderCarouselImages();
        
        // Limpa campos
        document.getElementById('newImageUrl').value = '';
        document.getElementById('newImageAlt').value = '';
        document.getElementById('newImageLink').value = '';
    }
    
    function renderCarouselImages() {
        carouselImages.innerHTML = '';
        carouselItems.forEach((item, index) => {
            const imageDiv = document.createElement('div');
            imageDiv.className = 'image-preview';
            imageDiv.innerHTML = `
                <img src="${item.image}" alt="${item.alt}">
                <button class="remove-image" data-index="${index}">×</button>
            `;
            carouselImages.appendChild(imageDiv);
        });
        
        // Adiciona eventos para remover imagens
        document.querySelectorAll('.remove-image').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                carouselItems.splice(index, 1);
                renderCarouselImages();
            });
        });
    }
    
    function loadPostForEditing(postId) {
        const posts = JSON.parse(localStorage.getItem('galleryPosts')) || [];
        const post = posts.find(p => p.id === postId);
        
        if (!post) {
            alert('Post não encontrado');
            window.location.href = 'admin.html';
            return;
        }
        
        currentPost = post;
        document.getElementById('postId').value = post.id;
        postType.value = post.type;
        
        if (post.type === 'single') {
            document.getElementById('imageUrl').value = post.image;
            document.getElementById('imageAlt').value = post.alt;
            document.getElementById('imageLink').value = post.link;
        } else if (post.type === 'carousel') {
            carouselItems = [...post.images];
            renderCarouselImages();
        }
        
        togglePostType();
    }
    
    function savePost(e) {
        e.preventDefault();
        
        const type = postType.value;
        let postData;
        
        if (type === 'single') {
            const imageUrl = document.getElementById('imageUrl').value.trim();
            const imageAlt = document.getElementById('imageAlt').value.trim();
            const imageLink = document.getElementById('imageLink').value.trim() || '#';
            
            if (!imageUrl) {
                alert('URL da imagem é obrigatória');
                return;
            }
            
            postData = {
                id: document.getElementById('postId').value || generateId(),
                type: 'single',
                image: imageUrl,
                alt: imageAlt || 'Imagem do post',
                link: imageLink,
                createdAt: new Date().toISOString()
            };
        } else {
            if (carouselItems.length === 0) {
                alert('Adicione pelo menos uma imagem ao carrossel');
                return;
            }
            
            postData = {
                id: document.getElementById('postId').value || generateId(),
                type: 'carousel',
                images: [...carouselItems],
                createdAt: new Date().toISOString()
            };
        }
        
        // Salva no localStorage
        const posts = JSON.parse(localStorage.getItem('galleryPosts')) || [];
        
        if (currentPost) {
            // Atualiza post existente
            const index = posts.findIndex(p => p.id === currentPost.id);
            if (index !== -1) {
                posts[index] = postData;
            }
        } else {
            // Adiciona novo post
            posts.push(postData);
        }
        
        localStorage.setItem('galleryPosts', JSON.stringify(posts));
        alert('Post salvo com sucesso!');
        window.location.href = 'admin.html';
    }
    
    function deleteCurrentPost() {
        if (!confirm('Tem certeza que deseja excluir este post permanentemente?')) {
            return;
        }
        
        const posts = JSON.parse(localStorage.getItem('galleryPosts')) || [];
        const updatedPosts = posts.filter(p => p.id !== currentPost.id);
        localStorage.setItem('galleryPosts', JSON.stringify(updatedPosts));
        alert('Post excluído com sucesso!');
        window.location.href = 'admin.html';
    }
    
    function generateId() {
        return 'post_' + Math.random().toString(36).substr(2, 9);
    }
});