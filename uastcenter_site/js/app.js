import { setContent, setAttribute, setStyle, createPictureTag } from './modules/renderer.js';
import { initNavigation } from './modules/navigation.js';
import { initGallery } from './modules/gallery.js';
import { initModal } from './modules/modal.js';
import { initAnimations } from './modules/animations.js';

document.addEventListener('DOMContentLoaded', function() {
    if (typeof siteContent === 'undefined') return;

    document.title = siteContent.global.pageTitle || document.title;
    setAttribute('logoImage', 'src', siteContent.global.logoUrl);
    setAttribute('logoImage', 'alt', 'Логотип НТЦ УАСТ');
    setContent('logoText', siteContent.global.logoText);
    setContent('logoAccent', siteContent.global.logoAccent);

    const mainNavLinksContainer = document.getElementById('mainNavLinks');
    if (mainNavLinksContainer && siteContent.navigation) {
        siteContent.navigation.forEach(item => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = item.href;
            a.textContent = item.text;
            a.classList.add('nav-link');
            if (item.active) a.classList.add('active');
            li.appendChild(a);
            mainNavLinksContainer.appendChild(li);
        });
    }

    if (siteContent.hero) {
        setContent('heroTitle', siteContent.hero.title, true);
        setContent('heroSubtitle', siteContent.hero.subtitle, true);
        setStyle('heroBackground', 'backgroundImage', `url(${siteContent.hero.backgroundImage})`);
        const gallerySlidesContainer = document.getElementById('heroGallerySlides');
        if (gallerySlidesContainer && siteContent.hero.galleryImages) {
            siteContent.hero.galleryImages.forEach((imgUrl, index) => {
                const slide = document.createElement('div');
                slide.className = 'hero-gallery-slide';
                if (index === 0) slide.classList.add('active');
                slide.style.backgroundImage = `url(${imgUrl})`;
                gallerySlidesContainer.appendChild(slide);
            });
        }
    }

    if (siteContent.about) {
        setContent('aboutTitle', siteContent.about.title);
        setContent('aboutParagraph1', siteContent.about.paragraph1);
        setContent('aboutParagraph2', siteContent.about.paragraph2);
        setStyle('aboutBackground', 'backgroundImage', `url(${siteContent.about.backgroundImage})`);
        const aboutImage = document.getElementById('aboutImage');
        if (aboutImage && siteContent.about.imageSrc) {
            const pic = createPictureTag(siteContent.about.imageSrc, siteContent.about.imageAlt);
            aboutImage.parentNode.replaceChild(pic, aboutImage);
        }
        if (siteContent.about.button) {
            setContent('aboutButton', siteContent.about.button.text);
            setAttribute('aboutButton', 'href', siteContent.about.button.href);
        }
    }

    if (siteContent.directions) {
        setContent('directionsSectionTitle', siteContent.directions.sectionTitle);
        setStyle('directionsBackground', 'backgroundImage', `url(${siteContent.directions.backgroundImage})`);
        const directionsGrid = document.getElementById('directionsGridContainer');
        if (directionsGrid && siteContent.directions.items) {
            siteContent.directions.items.forEach((item, index) => {
                const card = document.createElement('div');
                card.className = 'direction-item-card reveal-on-scroll';
                card.dataset.direction = item.id;
                card.dataset.scrollDelay = index * 150;
                const picWrapper = document.createElement('div');
                picWrapper.className = 'direction-card-image-wrapper';
                const pic = createPictureTag(item.imageSrc, item.imageAlt);
                picWrapper.appendChild(pic);
                const contentDiv = document.createElement('div');
                contentDiv.className = 'direction-card-content';
                contentDiv.innerHTML = `<h3>${item.title}</h3><p>${item.description}</p><button class="btn btn-secondary direction-details-btn" data-modalid="${item.id}">${item.buttonText}</button>`;
                card.appendChild(picWrapper);
                card.appendChild(contentDiv);
                directionsGrid.appendChild(card);
            });
        }
    }

    if (siteContent.projects) {
        setContent('projectsSectionTitle', siteContent.projects.sectionTitle);
        setStyle('projectsBackground', 'backgroundImage', `url(${siteContent.projects.backgroundImage})`);
        const projectsGrid = document.getElementById('projectsGridContainer');
        if (projectsGrid && siteContent.projects.items) {
            siteContent.projects.items.forEach((item, index) => {
                const card = document.createElement('div');
                card.className = 'project-card reveal-on-scroll';
                card.dataset.scrollDelay = index * 150;
                const picWrapper = document.createElement('div');
                picWrapper.className = 'project-card-image-wrapper';
                const pic = createPictureTag(item.imageSrc, item.imageAlt);
                picWrapper.appendChild(pic);
                const contentDiv = document.createElement('div');
                contentDiv.className = 'project-card-content';
                contentDiv.innerHTML = `<h3>${item.title}</h3><p>${item.description}</p><button class="btn project-details-btn" data-modalid="${item.id}">${item.buttonText}</button>`;
                card.appendChild(picWrapper);
                card.appendChild(contentDiv);
                projectsGrid.appendChild(card);
            });
        }
    }

    if (siteContent.contact) {
        setContent('contactSectionTitle', siteContent.contact.sectionTitle);
        setContent('contactInfoTitle', siteContent.contact.infoTitle);
        setContent('contactAddress', siteContent.contact.address, true);
        if (siteContent.contact.phone) {
            const tel = siteContent.contact.phone.replace(/[\s\(\)\-]/g, '');
            setContent('contactPhone', `<a href="tel:${tel}">${siteContent.contact.phone}</a>`, true);
        }
        setContent('contactEmail', `<a href="mailto:${siteContent.contact.email}">${siteContent.contact.email}</a>`, true);
        setContent('contactTagline', siteContent.contact.tagline, true);
        if (siteContent.contact.image) {
            setAttribute('contactMapImage', 'src', siteContent.contact.image);
        }
        if (siteContent.contact.backgroundImage) {
            setStyle('contactBackground', 'backgroundImage', `url(${siteContent.contact.backgroundImage})`);
        }
        const icons = siteContent.global.contactIcons;
        ['Address', 'Phone', 'Email'].forEach(key => {
            const el = document.getElementById('contactIcon' + key);
            const iconKey = key.toLowerCase();
            if (el && icons[iconKey]) {
                el.innerHTML = `<img src="${icons[iconKey]}" alt="Иконка ${key === 'Email' ? 'email' : key === 'Phone' ? 'телефона' : 'адреса'}" width="24" height="24">`;
            }
        });
    }

    if (siteContent.footer) {
        setContent('footerCopyright', siteContent.footer.copyrightText, true);
        setContent('footerTagline', siteContent.footer.tagline);
    }

    initNavigation(siteContent);
    initGallery();
    initModal(siteContent);
    initAnimations();
});
