// jest-dom matchers for DOM nodes in Vitest, e.g. expect(element).toHaveTextContent(/react/i).
import "@testing-library/jest-dom/vitest";
import { installCanvas } from "./testing/canvas";
import { installIntersectionObserver } from "./testing/intersectionObserver";

// Browser features jsdom does not have. A test that needs to drive one installs its own.
beforeEach(() => {
  installCanvas();
  installIntersectionObserver();
  window.matchMedia = () => ({ matches: false });
});
