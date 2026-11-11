import { useState } from "react";
import Section from "../Section";
import CrumbleEdge from "../CrumbleEdge";
import Mosaic from "../Mosaic/Mosaic";
import { FIGURES } from "../Mosaic/figures";
import { shuffle } from "../../utils/shuffle";

const FIRST_FIGURE = 1;
const TRIP_EDGE = [240, 214, 160];

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

const Interests = ({ heading, intro, strava, trip, images }) => {
  const [figure, setFigure] = useState(FIRST_FIGURE);
  // A new order on every visit.
  const [photos] = useState(() => shuffle(images));

  return (
    <Section id="interests" tall crumble>
      <div className="interests">
        <div>
          <h2>{heading}</h2>
          <p>
            {intro.before} <a href={strava.url}>{strava.label}</a>
            {intro.after}
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
        <div className="trip">
          <strong>{trip.distance}</strong>
          <span>{trip.label}</span>
          <CrumbleEdge color={TRIP_EDGE} />
        </div>
        {photos.map((photo) => (
          <Photo key={photo.label} photo={photo} />
        ))}
      </div>
    </Section>
  );
};

export default Interests;
