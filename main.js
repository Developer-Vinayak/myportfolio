// ============================================
// MUSIC PLAYER
// ============================================
window.addEventListener('DOMContentLoaded', () => {
  const music = document.getElementById('bg-music');
  const musicBtn = document.getElementById('music-btn');
  const pauseIcon = document.getElementById('pause-icon');
  const playIcon = document.getElementById('play-icon');

  // Sync the button icons to the actual audio state
  function updateUI() {
    if (music.paused) {
      pauseIcon.style.display = 'none';
      playIcon.style.display = 'block';
    } else {
      pauseIcon.style.display = 'block';
      playIcon.style.display = 'none';
    }
  }

  // Keep icons in sync whenever audio plays or pauses
  music.addEventListener('play', updateUI);
  music.addEventListener('pause', updateUI);

  // Autoplay on first user interaction (browser policy workaround)
  const startAutoplay = () => {
    music.play()
      .then(() => {
        document.removeEventListener('click', startAutoplay);
      })
      .catch(err => {
        console.log('Autoplay click trigger failed:', err);
      });
  };

  // Try immediate autoplay; fall back to click-triggered start
  music.play()
    .then(updateUI)
    .catch(() => {
      updateUI(); // Show play icon while paused
      document.addEventListener('click', startAutoplay);
    });

  // Manual toggle — stop propagation so it doesn't fire the autoplay listener
  musicBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    document.removeEventListener('click', startAutoplay);

    if (music.paused) {
      music.play().catch(err => console.log('Play failed:', err));
    } else {
      music.pause();
    }
  });
});

// ============================================
// PHOTO PULL-DOWN INTERACTION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  const photoCard = document.getElementById('photoCard');
  const blogSection = document.getElementById('blogSection');
  const closeBlog = document.getElementById('closeBlog');
  let isDragging = false;
  let startY = 0;
  let currentY = 0;
  let pullProgress = 0;
  const threshold = 60; // pixels to pull before opening

  // Only run if elements exist
  if (!photoCard || !blogSection || !closeBlog) return;

  // Mouse events
  photoCard.addEventListener('mousedown', function(e) {
    isDragging = true;
    startY = e.clientY;
    currentY = startY;
    photoCard.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';
  });

  document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    currentY = e.clientY;
    const deltaY = currentY - startY;
    
    if (deltaY > 0) {
      pullProgress = Math.min(deltaY / threshold, 1);
      const scale = 1 + (pullProgress * 0.05);
      const rotation = pullProgress * 3;
      photoCard.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
      
      // Update pull indicator
      const pullIndicator = document.querySelector('.pull-indicator');
      const arrow = pullIndicator?.querySelector('.arrow-down');
      if (pullIndicator && arrow) {
        if (pullProgress > 0.3) {
          arrow.style.transform = `translateY(${pullProgress * 10}px)`;
          pullIndicator.style.background = `rgba(232, 200, 122, ${0.5 + pullProgress * 0.5})`;
        }
      }
    }
  });

  document.addEventListener('mouseup', function(e) {
    if (!isDragging) return;
    isDragging = false;
    photoCard.style.cursor = 'ns-resize';
    document.body.style.userSelect = 'auto';
    
    const deltaY = currentY - startY;
    
    if (deltaY > threshold) {
      // Open blog section
      blogSection.classList.add('active');
      document.body.style.overflow = 'hidden';
      
      // Reset photo
      photoCard.style.transform = 'scale(1) rotate(0deg)';
      const pullIndicator = document.querySelector('.pull-indicator');
      const arrow = pullIndicator?.querySelector('.arrow-down');
      if (pullIndicator && arrow) {
        arrow.style.transform = 'translateY(0)';
        pullIndicator.style.background = 'var(--accent)';
      }
    } else {
      // Reset photo animation
      photoCard.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
      photoCard.style.transform = 'scale(1) rotate(0deg)';
      setTimeout(() => {
        photoCard.style.transition = 'transform 0.3s ease';
      }, 500);
      
      const pullIndicator = document.querySelector('.pull-indicator');
      const arrow = pullIndicator?.querySelector('.arrow-down');
      if (pullIndicator && arrow) {
        arrow.style.transform = 'translateY(0)';
        pullIndicator.style.background = 'var(--accent)';
      }
    }
  });

  // Touch events for mobile
  let touchStartY = 0;
  let touchCurrentY = 0;

  photoCard.addEventListener('touchstart', function(e) {
    touchStartY = e.touches[0].clientY;
    touchCurrentY = touchStartY;
  }, { passive: true });

  photoCard.addEventListener('touchmove', function(e) {
    touchCurrentY = e.touches[0].clientY;
    const deltaY = touchCurrentY - touchStartY;
    
    if (deltaY > 0 && deltaY > threshold) {
      e.preventDefault();
      // Add haptic feedback if available
      if (navigator.vibrate) navigator.vibrate(10);
    }
  }, { passive: false });

  photoCard.addEventListener('touchend', function(e) {
    const deltaY = touchCurrentY - touchStartY;
    if (deltaY > threshold) {
      blogSection.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }, { passive: true });

  // Close blog section
  closeBlog.addEventListener('click', function() {
    blogSection.classList.remove('active');
    document.body.style.overflow = 'auto';
  });

  // Close with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && blogSection.classList.contains('active')) {
      blogSection.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  // Click outside to close (on background)
  blogSection.addEventListener('click', function(e) {
    if (e.target === blogSection) {
      blogSection.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  // ============================================
  // BLOG CARD INTERACTIONS
  // ============================================
  const blogCards = document.querySelectorAll('.blog-card');
  blogCards.forEach(card => {
    card.addEventListener('click', function() {
      // This is where you can add functionality
      // to open individual blog posts
      const title = this.querySelector('h3')?.textContent || 'Blog Post';
      console.log(`Opening: ${title}`);
      // You can add a redirect or modal here
    });
  });
});