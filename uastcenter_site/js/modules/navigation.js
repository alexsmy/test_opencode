export function initNavigation(siteContent) {
    const mainHeader = document.getElementById('mainHeader');
    const mainNav = document.getElementById('mainNav');
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const pageOverlay = document.querySelector('.page-overlay');
    const body = document.body;
    if (!mainHeader || !mainNav || !mobileNavToggle) return;

    const iconMenu = mobileNavToggle.querySelector('.icon-menu');
    const iconClose = mobileNavToggle.querySelector('.icon-close');

    function openMobileNav() {
        mainNav.classList.add('active');
        mobileNavToggle.setAttribute('aria-expanded', 'true');
        if (iconMenu) iconMenu.style.display = 'none';
        if (iconClose) iconClose.style.display = 'block';
        body.classList.add('mobile-nav-open');
    }

    function closeMobileNav() {
        mainNav.classList.remove('active');
        mobileNavToggle.setAttribute('aria-expanded', 'false');
        if (iconMenu) iconMenu.style.display = 'block';
        if (iconClose) iconClose.style.display = 'none';
        body.classList.remove('mobile-nav-open');
    }

    mobileNavToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (body.classList.contains('mobile-nav-open')) closeMobileNav();
        else openMobileNav();
    });

    if (pageOverlay) pageOverlay.addEventListener('click', closeMobileNav);

    const allNavLinks = document.querySelectorAll('#mainNav a[href^="#"]');
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#') && targetId.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = mainHeader.offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
                closeMobileNav();
            } else if (targetId === '#') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                closeMobileNav();
            }
        });
    });

    const allSections = document.querySelectorAll('section[id]');
    function updateActiveNavLink() {
        let currentSectionId = '';
        const headerOffset = mainHeader.offsetHeight + 40;
        allSections.forEach(section => {
            const sectionTop = section.offsetTop - headerOffset;
            if (window.pageYOffset >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });
        if (!currentSectionId && allSections.length > 0 && window.pageYOffset < (allSections[0].offsetTop - headerOffset)) {
            currentSectionId = 'hero';
        }
        document.querySelectorAll('#mainNavLinks a.nav-link').forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.length > 1 && href.substring(1) === currentSectionId) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink();
}
