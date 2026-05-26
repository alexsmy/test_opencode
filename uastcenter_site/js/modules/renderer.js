export function setContent(elementId, content, isHtml = false) {
    const element = document.getElementById(elementId);
    if (!element) return false;
    if (isHtml) element.innerHTML = content;
    else element.textContent = content;
    return true;
}

export function setAttribute(elementId, attributeName, value) {
    const element = document.getElementById(elementId);
    if (!element) return false;
    element.setAttribute(attributeName, value);
    return true;
}

export function setStyle(elementId, property, value) {
    const element = document.getElementById(elementId);
    if (!element) return false;
    element.style[property] = value;
    return true;
}

export function createPictureTag(src, alt, className) {
    const picture = document.createElement('picture');
    const img = document.createElement('img');
    const hasWebp = document.documentElement.classList.contains('webp');
    if (hasWebp) {
        const source = document.createElement('source');
        source.srcset = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        source.type = 'image/webp';
        picture.appendChild(source);
    }
    img.src = src;
    img.alt = alt || '';
    if (className) img.className = className;
    img.loading = 'lazy';
    picture.appendChild(img);
    return picture;
}
