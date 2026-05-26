export function initAnimations() {
    const mainHeader = document.getElementById('mainHeader');
    const aboutSection = document.getElementById('about');
    const backToTopBtn = document.getElementById('backToTopBtn');
    const animatedElements = document.querySelectorAll('.reveal-on-scroll');

    function handleScroll() {
        if (mainHeader) {
            mainHeader.classList.toggle('scrolled', window.scrollY > 30);
        }
        if (backToTopBtn && aboutSection) {
            const threshold = aboutSection.offsetTop - window.innerHeight / 2;
            backToTopBtn.classList.toggle('visible', window.scrollY > threshold);
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = parseInt(entry.target.dataset.scrollDelay) || 0;
                    setTimeout(() => entry.target.classList.add('visible'), delay);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '50px' });
        animatedElements.forEach(el => observer.observe(el));
    } else {
        animatedElements.forEach(el => el.classList.add('visible'));
    }
}
