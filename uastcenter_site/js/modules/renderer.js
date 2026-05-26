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
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt || '';
    if (className) img.className = className;
    img.loading = 'lazy';
    return img;
}
