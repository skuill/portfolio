import { useState } from "react";
import { photoUrl } from "./trips";

const SMALL = 480; // longest side of the small copy, see scripts/import_trips.py

// A trip photo: the blurred preview first, the photo fades in once loaded. With `sizes`, the browser picks the
// small or the large copy for the space and the screen; without it, the given size is used.
const Photo = ({ slug, photo, alt, size = "small", sizes, eager = false }) => {
  const [loaded, setLoaded] = useState(false);
  const scale = SMALL / Math.max(photo.width, photo.height);
  const srcSet = sizes
    ? `${photoUrl(slug, photo.name, "small")} ${Math.round(photo.width * scale)}w, ${photoUrl(slug, photo.name, "large")} ${photo.width}w`
    : undefined;
  return (
    <span className="trip-photo" style={{ "--blur": `url(${photo.blur})`, "--ratio": photo.width / photo.height, aspectRatio: `${photo.width} / ${photo.height}` }}>
      <img
        src={photoUrl(slug, photo.name, size)}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        width={photo.width}
        height={photo.height}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={loaded ? "loaded" : undefined}
        onLoad={() => setLoaded(true)}
      />
    </span>
  );
};

export default Photo;
