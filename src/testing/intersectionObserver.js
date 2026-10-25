import { act } from "@testing-library/react";

// Test double for IntersectionObserver (jsdom has none): the test decides when the observed elements come near the viewport.
export const installIntersectionObserver = () => {
  const observers = new Set();
  window.IntersectionObserver = class {
    constructor(callback) {
      this.callback = callback;
      this.targets = new Set();
      observers.add(this);
    }
    observe(target) {
      this.targets.add(target);
    }
    unobserve(target) {
      this.targets.delete(target);
    }
    disconnect() {
      this.targets.clear();
      observers.delete(this);
    }
  };
  return {
    // What a reader scrolling down the whole page triggers: every observed element intersects once.
    scrollThroughPage: () =>
      act(() => {
        for (const observer of [...observers]) {
          const entries = [...observer.targets].map((target) => ({ target, isIntersecting: true }));
          if (entries.length) observer.callback(entries, observer);
        }
      }),
  };
};
