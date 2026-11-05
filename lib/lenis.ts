// Native smooth-scrolling helpers (Lenis removed — it caused intermittent scroll locks).

export interface ScrollToOptions {
  offset?: number;
  immediate?: boolean;
  behavior?: ScrollBehavior;
}

export function initLenis() {
  // No-op retained so call sites don't need to change.
}

export function getLenis() {
  return null;
}

export function destroyLenis() {
  // No-op retained so call sites don't need to change.
}

export function scrollTo(
  target: string | number | HTMLElement,
  options: ScrollToOptions = {}
) {
  const offset = options.offset ?? 0;
  const immediate = options.immediate ?? false;
  const behavior: ScrollBehavior = options.behavior ?? (immediate ? 'auto' : 'smooth');

  let top: number | null = null;

  if (typeof target === 'number') {
    top = target + offset;
  } else {
    const element =
      typeof target === 'string'
        ? document.querySelector<HTMLElement>(target)
        : target instanceof HTMLElement
          ? target
          : null;
    if (element) {
      top = element.getBoundingClientRect().top + window.scrollY + offset;
    }
  }

  if (top === null) return;
  window.scrollTo({ top: Math.max(0, top), behavior });
}

// Section anchors may not exist yet right after a route change, and their offset
// keeps shifting while the page lays out. Jump, then keep correcting until stable.
export function scrollToSection(selector: string, options: ScrollToOptions = {}) {
  const offset = options.offset ?? 0;
  const deadline = Date.now() + 2500;
  const jump = (top: number) =>
    scrollTo(top, { ...options, immediate: true, behavior: 'auto' });

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
