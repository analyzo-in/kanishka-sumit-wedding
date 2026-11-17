import { Howl } from 'howler';

let bgMusic: Howl | null = null;
let isMuted = false;

function getStoredMute(): boolean {
  try {
    return localStorage.getItem('wedding-muted') === 'true';
  } catch { return false; }
}

function setStoredMute(val: boolean) {
  try {
    localStorage.setItem('wedding-muted', val ? 'true' : 'false');
  } catch {}
}

export function initMusic(src: string) {
  isMuted = getStoredMute();
  bgMusic = new Howl({
    src: [src],
    loop: true,
    volume: isMuted ? 0 : 0.5,
    html5: true,
    preload: true,
  });
}

export function startMusic() {
  if (!bgMusic) return;
  if (!bgMusic.playing()) {
    bgMusic.play();
    bgMusic.fade(0, isMuted ? 0 : 0.5, 2500);
  }
}

export function toggleMute(): boolean {
  isMuted = !isMuted;
  setStoredMute(isMuted);
  if (bgMusic) {
    bgMusic.volume(isMuted ? 0 : 0.5);
  }
  return isMuted;
}

export function getMuted(): boolean {
  return isMuted;
}

export function pauseMusic() {
  if (bgMusic && bgMusic.playing()) bgMusic.pause();
}

export function resumeMusic() {
  if (bgMusic && !bgMusic.playing() && !isMuted) bgMusic.play();
}

// Handle visibility change
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pauseMusic();
    else resumeMusic();
  });
}

