window.addEventListener('DOMContentLoaded', (): void => {
  const music = document.getElementById('bg-music') as HTMLAudioElement | null;
  const musicBtn = document.getElementById('music-btn') as HTMLButtonElement | null;
  const pauseIcon = document.getElementById('pause-icon') as HTMLElement | null;
  const playIcon = document.getElementById('play-icon') as HTMLElement | null;

  if (!music) return;

  function updateUI(): void {
    if (!pauseIcon || !playIcon) return;
    if (music!.paused) {
      pauseIcon.style.display = 'none';
      playIcon.style.display = 'block';
    } else {
      pauseIcon.style.display = 'block';
      playIcon.style.display = 'none';
    }
  }

  const savedTime: number = parseFloat(localStorage.getItem('musicTime') || '0');
  if (savedTime > 0 && isFinite(savedTime)) {
    music.currentTime = savedTime;
  }

  function saveState(): void {
    localStorage.setItem('musicTime', music!.currentTime.toString());
    localStorage.setItem('musicPlaying', (!music!.paused).toString());
  }

  music.addEventListener('play', (): void => { updateUI(); saveState(); });
  music.addEventListener('pause', (): void => { updateUI(); saveState(); });
  music.addEventListener('timeupdate', saveState);

  const tryPlay = (): void => {
    music!.play()
      .then((): void => {
        document.removeEventListener('click', tryPlay);
      })
      .catch((): void => {
      });
  };
  music.play()
    .then(updateUI)
    .catch((): void => {
      updateUI();
      document.addEventListener('click', tryPlay);
    });

  window.addEventListener('beforeunload', saveState);

  if (musicBtn) {
    musicBtn.addEventListener('click', (e: MouseEvent): void => {
      e.stopPropagation();
      document.removeEventListener('click', tryPlay);
      if (music.paused) {
        music.play().catch((err: unknown): void => console.log('Play failed:', err));
      } else {
        music.pause();
      }
    });
  }
});