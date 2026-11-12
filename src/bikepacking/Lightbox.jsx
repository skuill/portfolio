import { useEffect, useRef } from "react";
import Photo from "./Photo";

const SWIPE = 40; // px of horizontal movement that count as a swipe

// Photos full screen with a strip of all of them below. A click on the strip, the arrow keys, a swipe or a tap on the
// photo move between them; Esc or the close button returns to the page.
const Lightbox = ({ slug, photos, index, label, onIndex, onClose }) => {
  const closeRef = useRef(null);
  const stripRef = useRef(null);
  const pressRef = useRef(null);
  const go = (step) => onIndex((index + step + photos.length) % photos.length);

  useEffect(() => {
    const opener = document.activeElement;
    closeRef.current.focus();
    return () => opener?.focus?.();
  }, []);

  useEffect(() => {
    // The current photo stays in the middle of the strip.
    const strip = stripRef.current;
    const current = strip?.children[index];
    if (current) strip.scrollTo?.({ left: current.offsetLeft - (strip.clientWidth - current.clientWidth) / 2, behavior: "smooth" });
  }, [index]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onIndex((index + 1) % photos.length);
      if (event.key === "ArrowLeft") onIndex((index - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, photos.length, onIndex, onClose]);

  const onPointerUp = (event) => {
    if (pressRef.current === null) return;
    const moved = event.clientX - pressRef.current;
    pressRef.current = null;
    go(moved > SWIPE ? -1 : 1); // a swipe right goes back; a swipe left or a tap goes forward
  };

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={label}>
      <button ref={closeRef} type="button" className="lightbox-close" aria-label="Close" onClick={onClose}>
        ✕
      </button>
      <figure
        className="lightbox-stage"
        onPointerDown={(event) => (pressRef.current = event.clientX)}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (pressRef.current = null)}
      >
        <Photo key={photos[index].name} slug={slug} photo={photos[index]} alt={`${label}, photo ${index + 1}`} size="large" eager />
        <figcaption>
          {index + 1} / {photos.length}
        </figcaption>
      </figure>
      <div ref={stripRef} className="filmstrip">
        {photos.map((photo, n) => (
          <button key={photo.name} type="button" aria-label={`Photo ${n + 1}`} aria-current={n === index} onClick={() => onIndex(n)}>
            <Photo slug={slug} photo={photo} alt="" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Lightbox;
