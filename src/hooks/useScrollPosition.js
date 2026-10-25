import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

const isBrowser = typeof window !== `undefined`;

function getScrollPosition({ element, useWindow }) {
  if (!isBrowser) return { x: 0, y: 0 };

  const target = element ? element.current : document.body;
  const position = target.getBoundingClientRect();

  return useWindow
    ? { x: window.scrollX, y: window.scrollY }
    : { x: position.left, y: position.top };
}

// Calls effect({ prevPos, currPos }) on every scroll (at most once per `wait` ms when it is set);
// subscribes again when `deps` change.
export function useScrollPosition(effect, deps = [], element = null, useWindow = false, wait = null) {
  const position = useRef(getScrollPosition({ useWindow }));

  useIsomorphicLayoutEffect(() => {
    if (!isBrowser) {
      return;
    }

    let throttleTimeout = null;

    const callBack = () => {
      const currPos = getScrollPosition({ element, useWindow });
      effect({ prevPos: position.current, currPos });
      position.current = currPos;
      throttleTimeout = null;
    };

    const handleScroll = () => {
      if (wait) {
        if (throttleTimeout === null) {
          throttleTimeout = setTimeout(callBack, wait);
        }
      } else {
        callBack();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      throttleTimeout && clearTimeout(throttleTimeout);
    };
  }, deps);
}
