import { act } from "@testing-library/react";

// Test double for IntersectionObserver (jsdom has none): the test decides when the observed elements come near the viewport.
export const installIntersectionObserver = () => {
  const observers = new Set();
  window.IntersectionObserver = class {
    constructor(callback, options) {
      this.callback = callback;
      this.options = options;
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
  const report = (matches, isIntersecting) =>
    act(() => {
      for (const observer of [...observers]) {
        const entries = [...observer.targets].filter(matches).map((target) => ({ target, isIntersecting }));
        if (entries.length) observer.callback(entries, observer);
      }
    });
  return {
    // What a reader scrolling down the whole page triggers: every observed element intersects once.
    scrollThroughPage: () => report(() => true, true),
    // One element enters or leaves the viewport.
    intersect: (element, isIntersecting = true) => report((target) => target === element, isIntersecting),
  };
};
