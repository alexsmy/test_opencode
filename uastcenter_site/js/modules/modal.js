import { createPictureTag } from './renderer.js';

export function initModal(siteContent) {
    const modal = document.getElementById('detailsModal');
    const modalTitleEl = document.getElementById('modalTitle');
    const modalBodyEl = document.getElementById('modalBody');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    if (!modal) return;

    const allModalData = {};
    if (siteContent.directions && siteContent.directions.items) {
        siteContent.directions.items.forEach(item => {
            if (item.modalDetails) allModalData[item.id] = item.modalDetails;
        });
    }
    if (siteContent.projects && siteContent.projects.items) {
        siteContent.projects.items.forEach(item => {
            if (item.modalDetails) allModalData[item.id] = item.modalDetails;
        });
    }

    function openModal(id) {
        const data = allModalData[id];
        if (!data) return;
        modalTitleEl.textContent = data.title;
        let imageHtml = '';
        if (data.image) {
            const pic = createPictureTag(data.image, data.alt || data.title, 'modal-main-image');
            const wrapper = document.createElement('div');
            wrapper.appendChild(pic);
            imageHtml = wrapper.innerHTML;
        }
        modalBodyEl.innerHTML = imageHtml + (data.htmlContent || '');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        modalBodyEl.scrollTop = 0;
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    document.body.addEventListener('click', function(event) {
        const target = event.target.closest('.direction-details-btn, .project-details-btn');
        if (target) {
            const modalId = target.dataset.modalid;
            if (modalId) openModal(modalId);
        }
    });

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
}
