import { useState } from "react";
import Section from "../Section";
import Mosaic from "../Mosaic/Mosaic";
import { FIGURES } from "../Mosaic/figures";
import { shuffle } from "../../utils/shuffle";
import trips from "../../trips/index.json";

const covers = import.meta.glob("../../trips/*/cover.webp", { eager: true, query: "?url", import: "default" });

const FIRST_FIGURE = 1;

// The exact distance of a trip from its data and a link to its page.
const tripLink = (slug) => ({
  distance: `${new Intl.NumberFormat("en-GB").format(trips.find((t) => t.slug === slug).km)} km`,
  url: `${import.meta.env.BASE_URL}bikepacking/${slug}/`,
});

// The featured trip as a photo like the others: its cover from the trip data.
const tripPhoto = ({ slug, label }) => ({
  img: covers[`../../trips/${slug}/cover.webp`],
  blur: trips.find((t) => t.slug === slug).cover.blur,
  alt: "",
  label,
  ...tripLink(slug),
});

const Photo = ({ photo }) => {
  const [loaded, setLoaded] = useState(false);
  const content = (
    <>
      <img src={photo.img} alt={photo.alt} className={loaded ? "loaded" : undefined} loading="lazy" decoding="async" onLoad={() => setLoaded(true)} />
      <figcaption>
        {photo.distance && <b>{photo.distance}</b>}
        {photo.label}
      </figcaption>
    </>
  );
  return <figure style={{ "--blur": `url(${photo.blur})` }}>{photo.url ? <a href={photo.url}>{content}</a> : content}</figure>;
};

// A link of the config: addresses inside the site get the base path.
const href = (link) => (/^https?:/.test(link) ? link : `${import.meta.env.BASE_URL}${link}`);

const Interests = ({ heading, intro, allTrips, trip, images }) => {
  const [figure, setFigure] = useState(FIRST_FIGURE);
  // A new order on every visit.
  const [photos] = useState(() => shuffle(images).map((image) => (image.trip ? { ...image, ...tripLink(image.trip) } : image)));

  return (
    <Section id="interests" tall crumble>
      <div className="interests">
        <div>
          <h2>{heading}</h2>
          <p>
            {intro.map((part) => (typeof part === "string" ? part : <a key={part.href} href={href(part.href)}>{part.text}</a>))}
          </p>
          <ul className="words">
            {FIGURES.map(({ name }, index) => (
              <li key={name}>
                <button type="button" aria-pressed={index === figure} onMouseEnter={() => setFigure(index)} onFocus={() => setFigure(index)} onClick={() => setFigure(index)}>
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <Mosaic id="medal" density={1.15} start={FIRST_FIGURE} figure={figure} onFigureChange={setFigure} />
      </div>
      <div className="photos">
        {[tripPhoto(trip), ...photos].map((photo) => (
          <Photo key={photo.label} photo={photo} />
        ))}
      </div>
      <a className="all-trips" href={href(allTrips.href)}>
        {allTrips.text}
      </a>
    </Section>
  );
};

export default Interests;
