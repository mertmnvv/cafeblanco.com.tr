document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentImageIndex = 0;
    let images = [];

    // Lightbox HTML'ini oluştur
    const lightboxHTML = `
        <div class="lightbox">
            <div class="lightbox-content">
                <img src="" alt="Gallery Image" class="lightbox-image">
                <button class="lightbox-close" aria-label="Kapat">
                    <i class="fas fa-times"></i>
                </button>
                <button class="lightbox-nav lightbox-prev" aria-label="Önceki">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="lightbox-nav lightbox-next" aria-label="Sonraki">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>
    `;

    // Lightbox'ı sayfaya ekle
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);

    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const closeButton = lightbox.querySelector('.lightbox-close');
    const prevButton = lightbox.querySelector('.lightbox-prev');
    const nextButton = lightbox.querySelector('.lightbox-next');

    // Galeri görsellerini topla
    galleryItems.forEach((item, index) => {
        const image = item.querySelector('img');
        images.push(image.src);

        item.addEventListener('click', () => {
            currentImageIndex = index;
            showLightbox();
        });
    });

    // Lightbox'ı göster
    function showLightbox() {
        lightboxImage.src = images[currentImageIndex];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Animasyon ekle
        lightboxImage.style.opacity = '0';
        setTimeout(() => {
            lightboxImage.style.opacity = '1';
        }, 50);
    }

    // Lightbox'ı kapat
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        
        // Animasyon ekle
        lightboxImage.style.opacity = '0';
        setTimeout(() => {
            lightboxImage.src = '';
        }, 300);
    }

    // Önceki görsel
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateImage();
    }

    // Sonraki görsel
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateImage();
    }

    // Görsel güncelleme
    function updateImage() {
        lightboxImage.style.opacity = '0';
        setTimeout(() => {
            lightboxImage.src = images[currentImageIndex];
            lightboxImage.style.opacity = '1';
        }, 200);
    }

    // Event listeners
    closeButton.addEventListener('click', closeLightbox);
    prevButton.addEventListener('click', showPrevImage);
    nextButton.addEventListener('click', showNextImage);

    // Klavye kontrolleri
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
    });

    // Lightbox dışına tıklandığında kapat
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Dokunmatik ekran için swipe desteği
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeLength = touchEndX - touchStartX;

        if (Math.abs(swipeLength) > swipeThreshold) {
            if (swipeLength > 0) {
                showPrevImage();
            } else {
                showNextImage();
            }
        }
    }
}); 