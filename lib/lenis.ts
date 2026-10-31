import Lenis, { type ScrollToOptions } from 'lenis';

let lenis: Lenis | null = null;

export function initLenis() {
  if (lenis) return;

  lenis = new Lenis({
    autoRaf: true,
    lerp: 0.1,
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.2,
    respectReducedMotion: true,
  });
}

export function getLenis() {
  return lenis;
}

export function destroyLenis() {
  lenis?.destroy();
  lenis = null;
}

export function scrollTo(
  target: string | number | HTMLElement,
  options: ScrollToOptions = {}
) {
  if (lenis) {
    // Page height changes while sections mount; refresh before clamping the target.
    lenis.resize();
    lenis.scrollTo(target, options);
    return;
  }

  const offset = options.offset ?? 0;
  const element =
    typeof target === 'string'
      ? document.querySelector<HTMLElement>(target)
      : target instanceof HTMLElement
      ? target
      : null;

  if (element) {
    const top = element.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: 'smooth' });
    return;
  }

  if (typeof target === 'number') {
    window.scrollTo({ top: target + offset, behavior: 'smooth' });
  }
}

// Section anchors may not exist yet right after a route change, and their offset
// keeps shifting while the page lays out. Jump, then keep correcting until stable.
export function scrollToSection(selector: string, options: ScrollToOptions = {}) {
  const offset = options.offset ?? 0;
  const deadline = Date.now() + 2500;
  const jump = (top: number) => scrollTo(top, { ...options, immediate: true });

  const attempt = () => {
    const element = document.querySelector<HTMLElement>(selector);
    if (!element) {
      if (Date.now() < deadline) window.setTimeout(attempt, 100);
      return;
    }

    const top = element.getBoundingClientRect().top + window.scrollY + offset;
    if (Math.abs(window.scrollY - top) > 2) jump(top);

    if (Date.now() < deadline) {
      window.setTimeout(() => {
        const current = document.querySelector<HTMLElement>(selector);
        if (!current) return;
        const currentTop = current.getBoundingClientRect().top + window.scrollY + offset;
        if (Math.abs(currentTop - top) > 2) attempt();
      }, 250);
    }
  };

  attempt();
}
