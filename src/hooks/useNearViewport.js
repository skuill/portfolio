import React from "react";

// True once the element comes within `margin` (CSS rootMargin) of the viewport; stays true after that.
const useNearViewport = (ref, margin) => {
  const [near, setNear] = React.useState(false);
  React.useEffect(() => {
    if (near) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true);
      },
      { rootMargin: margin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, margin, near]);
  return near;
};

export default useNearViewport;
