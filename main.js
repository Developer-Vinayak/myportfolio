"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const photoCard = document.getElementById('photoCard');
    const gallerySection = document.getElementById('gallerySection');
    const closeGallery = document.getElementById('closeGallery');
    if (!photoCard || !gallerySection || !closeGallery)
        return;
    const openGallery = () => {
        gallerySection.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    const closeGalleryFn = () => {
        gallerySection.classList.remove('active');
        document.body.style.overflow = 'auto';
    };
    photoCard.addEventListener('click', () => {
        openGallery();
    });
    // Close button
    closeGallery.addEventListener('click', () => {
        closeGalleryFn();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && gallerySection.classList.contains('active')) {
            closeGalleryFn();
        }
    });
    gallerySection.addEventListener('click', (e) => {
        if (e.target === gallerySection) {
            closeGalleryFn();
        }
    });
    const imgTiles = document.querySelectorAll('.img-tile');
    imgTiles.forEach((tile) => {
        tile.addEventListener('click', () => {
            const img = tile.querySelector('img');
            const label = (img === null || img === void 0 ? void 0 : img.alt) || (img === null || img === void 0 ? void 0 : img.src) || 'image';
            console.log(`Opening: ${label}`);
        });
    });
});
