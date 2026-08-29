document.addEventListener('DOMContentLoaded', (): void => {
  const photoCard: HTMLElement | null = document.getElementById('photoCard');
  const gallerySection: HTMLElement | null = document.getElementById('gallerySection');
  const closeGallery: HTMLButtonElement | null = document.getElementById('closeGallery') as HTMLButtonElement | null;

  if (!photoCard || !gallerySection || !closeGallery) return;

  const openGallery = (): void => {
    gallerySection.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeGalleryFn = (): void => {
    gallerySection.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  photoCard.addEventListener('click', (): void => {
    if (gallerySection.classList.contains('active')) {
      closeGalleryFn();
    } else {
      openGallery();
    }
  });

  closeGallery.addEventListener('click', (): void => {
    closeGalleryFn();
  });

  document.addEventListener('keydown', (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && gallerySection.classList.contains('active')) {
      closeGalleryFn();
    }
  });
  gallerySection.addEventListener('click', (e: MouseEvent): void => {
    if (e.target === gallerySection) {
      closeGalleryFn();
    }
  });

  const imgTiles: NodeListOf<HTMLElement> = document.querySelectorAll('.img-tile');
  imgTiles.forEach((tile: HTMLElement): void => {
    tile.addEventListener('click', (): void => {
      const img = tile.querySelector('img') as HTMLImageElement | null;
      const label: string = img?.alt || img?.src || 'image';
      console.log(`Opening: ${label}`);
    });
  });
});