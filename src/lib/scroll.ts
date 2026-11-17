import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
// Mobile browsers resize the visual viewport while the address bar collapses.
// Ignoring that transient resize prevents pinned scenes from jumping mid-scroll.
ScrollTrigger.config({ ignoreMobileResize: true });

let lenis: Lenis | null = null;

export function initScroll() {
  lenis = new Lenis({
    lerp: 0.09,
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function destroyScroll() {
  lenis?.destroy();
  lenis = null;
}

export function getLenis() {
  return lenis;
}

export { gsap, ScrollTrigger };
