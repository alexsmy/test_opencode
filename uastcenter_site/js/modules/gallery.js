export function initGallery() {
    const gallerySlides = document.querySelectorAll('.hero-gallery-slide');
    if (gallerySlides.length === 0) return;

    const nextBtn = document.getElementById('heroGalleryNext');
    const prevBtn = document.getElementById('heroGalleryPrev');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        if (index < 0 || index >= gallerySlides.length) return;
        gallerySlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        if (gallerySlides.length === 0) return;
        currentSlide = (currentSlide + 1) % gallerySlides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        if (gallerySlides.length === 0) return;
        currentSlide = (currentSlide - 1 + gallerySlides.length) % gallerySlides.length;
        showSlide(currentSlide);
    }

    function startSlideShow() {
        stopSlideShow();
        slideInterval = setInterval(nextSlide, 3000);
    }

    function stopSlideShow() {
        if (slideInterval) clearInterval(slideInterval);
    }

    if (gallerySlides.length > 1) {
        if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startSlideShow(); });
        if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startSlideShow(); });
        startSlideShow();
    }
}
