// ============================================
// SHARED MUSIC PLAYER — persists across pages via localStorage
// Include this on any page that should continue the music
// (index.html and blog/blog.html). Do NOT include it on
// individual blog post pages.
// ============================================
window.addEventListener('DOMContentLoaded', () => {
  const music = document.getElementById('bg-music');
  const musicBtn = document.getElementById('music-btn');
  const pauseIcon = document.getElementById('pause-icon');
  const playIcon = document.getElementById('play-icon');

  if (!music) return;

  // Update play/pause icons if this page has a music button
  function updateUI() {
    if (!pauseIcon || !playIcon) return;
    if (music.paused) {
      pauseIcon.style.display = 'none';
      playIcon.style.display = 'block';
    } else {
      pauseIcon.style.display = 'block';
      playIcon.style.display = 'none';
    }
  }

  // Restore where we left off on the previous page (if any)
  const savedTime = parseFloat(localStorage.getItem('musicTime') || '0');
  if (savedTime > 0 && isFinite(savedTime)) {
    music.currentTime = savedTime;
  }

  function saveState() {
    localStorage.setItem('musicTime', music.currentTime);
    localStorage.setItem('musicPlaying', (!music.paused).toString());
  }

  music.addEventListener('play', () => { updateUI(); saveState(); });
  music.addEventListener('pause', () => { updateUI(); saveState(); });
  music.addEventListener('timeupdate', saveState);

  // Retry helper for the click-to-unlock-autoplay fallback
  const tryPlay = () => {
    music.play()
      .then(() => {
        document.removeEventListener('click', tryPlay);
      })
      .catch(() => {
        // still blocked, keep waiting for a click
      });
  };

  // Always attempt to play immediately on every page load — this matches
  // how the original single-page site behaved. If the browser blocks it
  // (autoplay policy), fall back to starting on the first click anywhere.
  music.play()
    .then(updateUI)
    .catch(() => {
      updateUI();
      document.addEventListener('click', tryPlay);
    });

  // Save current position/state right before leaving the page
  window.addEventListener('beforeunload', saveState);

  // Manual toggle button (only present on some pages)
  if (musicBtn) {
    musicBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      document.removeEventListener('click', tryPlay);
      if (music.paused) {
        music.play().catch(err => console.log('Play failed:', err));
      } else {
        music.pause();
      }
    });
  }
});