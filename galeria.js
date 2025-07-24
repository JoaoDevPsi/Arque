const SESSION_KEY = 'adminSession';

function checkAuth() {
    const session = JSON.parse(sessionStorage.getItem(SESSION_KEY));
    return session && session.user === 'admin';
}

function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    alert('Sessão encerrada!');
    window.location.href = 'login.html';
}

function deletePost(postId) {
    const posts = JSON.parse(localStorage.getItem('galleryPosts')) || [];
    const updatedPosts = posts.filter(post => post.id !== postId);
    localStorage.setItem('galleryPosts', JSON.stringify(updatedPosts));
    alert('Post removido com sucesso!');
    location.reload();
}

document.addEventListener('DOMContentLoaded', function() {
    const isAdmin = checkAuth();
    const session = JSON.parse(sessionStorage.getItem(SESSION_KEY));

    // Admin Controls Initialization
    if (isAdmin) {
        const adminBar = document.createElement('div');
        adminBar.style.position = 'fixed';
        adminBar.style.top = '0';
        adminBar.style.left = '0';
        adminBar.style.right = '0';
        adminBar.style.backgroundColor = '#3897f0';
        adminBar.style.color = 'white';
        adminBar.style.padding = '10px';
        adminBar.style.zIndex = '1000';
        adminBar.style.display = 'flex';
        adminBar.style.justifyContent = 'space-between';
        adminBar.style.alignItems = 'center';
        
        adminBar.innerHTML = `
            <span>Modo Admin (${session?.user || 'Usuário'})</span>
            <div>
                <button id="addPostBtn" style="margin-right: 10px;">+ Novo Post</button>
                <button id="logoutBtn">Sair</button>
            </div>
        `;
        
        document.body.prepend(adminBar);
        
        document.getElementById('logoutBtn').addEventListener('click', logout);
        document.getElementById('addPostBtn').addEventListener('click', () => {
            window.location.href = 'admin-editor.html';
        });

        document.querySelectorAll('.delete-post').forEach(btn => {
            btn.addEventListener('click', function() {
                const postId = this.getAttribute('data-id');
                if (confirm('Tem certeza que deseja excluir este post?')) {
                    deletePost(postId);
                }
            });
        });
        
        document.querySelectorAll('.edit-post').forEach(btn => {
            btn.addEventListener('click', function() {
                const postId = this.getAttribute('data-id');
                window.location.href = `admin-editor.html?edit=${postId}`;
            });
        });
    }

    // Instagram Gallery Loading
    const posts = JSON.parse(localStorage.getItem('galleryPosts')) || [];
    const gallery = document.querySelector('.instagram-grid');
    
    if (gallery) {
        gallery.innerHTML = '';
        posts.forEach(post => {
            if (post.type === 'single') {
                gallery.innerHTML += `
                    <div class="instagram-single" data-id="${post.id}">
                        <a href="${post.link}" target="_blank">
                            <img src="${post.image}" alt="${post.alt}" loading="lazy">
                        </a>
                        ${isAdmin ? `
                            <div class="post-actions">
                                <button class="edit-post" data-id="${post.id}">✏️</button>
                                <button class="delete-post" data-id="${post.id}">🗑️</button>
                            </div>
                        ` : ''}
                    </div>
                `;
            } else if (post.type === 'carousel') {
                gallery.innerHTML += `
                    <div class="instagram-carousel" data-id="${post.id}">
                        <button class="carousel-prev">❮</button>
                        <button class="carousel-next">❯</button>
                        <div class="carousel-indicators">
                            ${post.images.map((_, i) => `
                                <button class="carousel-indicator ${i === 0 ? 'active' : ''}" data-slide="${i}"></button>
                            `).join('')}
                        </div>
                        ${post.images.map((img, i) => `
                            <div class="carousel-slide ${i === 0 ? 'active' : ''}">
                                <a href="${img.link}" target="_blank">
                                    <img src="${img.image}" alt="${img.alt}" loading="lazy">
                                </a>
                            </div>
                        `).join('')}
                        ${isAdmin ? `
                            <div class="post-actions">
                                <button class="edit-post" data-id="${post.id}">✏️</button>
                                <button class="delete-post" data-id="${post.id}">🗑️</button>
                            </div>
                        ` : ''}
                    </div>
                `;
            }
        });
    }
    
    // Instagram Carousels Initialization
    const carousels = document.querySelectorAll('.instagram-carousel');
    carousels.forEach((carousel) => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        const indicators = carousel.querySelectorAll('.carousel-indicator');
        let currentSlide = 0;
        let autoplay;
        
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });
            currentSlide = index;
        }
        
        function changeSlide(newIndex) {
            if (newIndex >= slides.length) newIndex = 0;
            if (newIndex < 0) newIndex = slides.length - 1;
            showSlide(newIndex);
        }
        
        function startAutoplay() {
            autoplay = setInterval(() => changeSlide(currentSlide + 1), 5000);
        }
        
        function resetAutoplay() {
            clearInterval(autoplay);
            startAutoplay();
        }
        
        prevBtn.addEventListener('click', () => {
            changeSlide(currentSlide - 1);
            resetAutoplay();
        });
        
        nextBtn.addEventListener('click', () => {
            changeSlide(currentSlide + 1);
            resetAutoplay();
        });
        
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                changeSlide(index);
                resetAutoplay();
            });
        });
        
        carousel.addEventListener('mouseenter', () => clearInterval(autoplay));
        carousel.addEventListener('mouseleave', startAutoplay);
        
        showSlide(0);
        startAutoplay();
    });

    // Clinic Photos Lightbox
    const clinicPhotosSection = document.querySelector('.clinic-photos-section');
    if (!clinicPhotosSection) return;

    const allClinicImages = Array.from(clinicPhotosSection.querySelectorAll('.photos-container img'));
    let currentImageIndex = 0;

    function createLightbox() {
        if (document.getElementById('clinicLightbox')) {
            return;
        }
        const lightboxHTML = `
            <div id="clinicLightbox" class="lightbox">
                <span class="lightbox-close">&times;</span>
                <img class="lightbox-content" id="lightboxImage">
                <a class="lightbox-nav-btn lightbox-prev">&#10094;</a>
                <a class="lightbox-nav-btn lightbox-next">&#10095;</a>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    }

    createLightbox();

    const lightbox = document.getElementById('clinicLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    function openLightbox(index) {
        currentImageIndex = index;
        lightboxImage.src = allClinicImages[currentImageIndex].src;
        lightboxImage.alt = allClinicImages[currentImageIndex].alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % allClinicImages.length;
        lightboxImage.src = allClinicImages[currentImageIndex].src;
        lightboxImage.alt = allClinicImages[currentImageIndex].alt;
    }

    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + allClinicImages.length) % allClinicImages.length;
        lightboxImage.src = allClinicImages[currentImageIndex].src;
        lightboxImage.alt = allClinicImages[currentImageIndex].alt;
    }

    allClinicImages.forEach((img, index) => {
        img.addEventListener('click', () => openLightbox(index));
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        } else if (e.key === 'ArrowRight' && lightbox.classList.contains('active')) {
            nextImage();
        } else if (e.key === 'ArrowLeft' && lightbox.classList.contains('active')) {
            prevImage();
        }
    });
});