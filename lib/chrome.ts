// Tiny module store so the fixed navbar and a page-level sticky section nav
// can agree on one piece of chrome state without wrapping the tree in context.

export interface ChromeState {
  /** True while a page renders its own sticky section navigation. */
  hasSectionNav: boolean;
  /** True while that page is scrolled down and the navbar should step away. */
  navHidden: boolean;
}

let state: ChromeState = { hasSectionNav: false, navHidden: false };
const listeners = new Set<(state: ChromeState) => void>();

const emit = () => {
  for (const listener of listeners) listener(state);
};

export function subscribeChrome(listener: (state: ChromeState) => void) {
  listeners.add(listener);
  listener(state);
  return () => {
    listeners.delete(listener);
  };
}

export function setHasSectionNav(value: boolean) {
  if (state.hasSectionNav === value) return;
  state = { hasSectionNav: value, navHidden: value ? state.navHidden : false };
  emit();
}

export function setNavHidden(value: boolean) {
  if (!state.hasSectionNav || state.navHidden === value) return;
  state = { ...state, navHidden: value };
  emit();
}

export const getChromeState = () => state;
