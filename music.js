"use strict";
window.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');
    const pauseIcon = document.getElementById('pause-icon');
    const playIcon = document.getElementById('play-icon');
    if (!music)
        return;
    function updateUI() {
        if (!pauseIcon || !playIcon)
            return;
        if (music.paused) {
            pauseIcon.style.display = 'none';
            playIcon.style.display = 'block';
        }
        else {
            pauseIcon.style.display = 'block';
            playIcon.style.display = 'none';
        }
    }
    const savedTime = parseFloat(localStorage.getItem('musicTime') || '0');
    if (savedTime > 0 && isFinite(savedTime)) {
        music.currentTime = savedTime;
    }
    function saveState() {
        localStorage.setItem('musicTime', music.currentTime.toString());
        localStorage.setItem('musicPlaying', (!music.paused).toString());
    }
    music.addEventListener('play', () => { updateUI(); saveState(); });
    music.addEventListener('pause', () => { updateUI(); saveState(); });
    music.addEventListener('timeupdate', saveState);
    const tryPlay = () => {
        music.play()
            .then(() => {
            document.removeEventListener('click', tryPlay);
        })
            .catch(() => {
        });
    };
    music.play()
        .then(updateUI)
        .catch(() => {
        updateUI();
        document.addEventListener('click', tryPlay);
    });
    window.addEventListener('beforeunload', saveState);
    if (musicBtn) {
        musicBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            document.removeEventListener('click', tryPlay);
            if (music.paused) {
                music.play().catch((err) => console.log('Play failed:', err));
            }
            else {
                music.pause();
            }
        });
    }
});
