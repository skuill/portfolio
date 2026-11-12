import { useEffect, useRef, useState } from "react";
import TripMap from "./TripMap";
import { DAY_COLORS } from "./mapStyle";
import ElevationProfile from "./ElevationProfile";
import DayNumbers from "./DayNumbers";
import DayBar from "./DayBar";
import { dayNumbers, tripNumbers } from "./numbers";
import Photo from "./Photo";
import Lightbox from "./Lightbox";
import useDayInAddress from "./useDayInAddress";
import { loadTrip, homeUrl, pageUrl } from "./trips";
import { dateRange, formatNumber, shortDate } from "./format";

// One trip: the map, a strip of days, the photos of the chosen day and its story. With no day chosen:
// the first photo of every day (a click opens that day) and the intro of the trip.
const TripPage = ({ slug }) => {
  const [data, setData] = useState(null);
  const [selected, choose] = useDayInAddress();
  const [open, setOpen] = useState(null);
  const daysRef = useRef(null);

  useEffect(() => {
    loadTrip(slug).then(setData, (error) => console.error(error));
  }, [slug]);

  if (!data) return <p className="trip-loading">Loading the trip</p>;

  const { trip, route } = data;
  const day = selected && trip.days[selected - 1] ? trip.days[selected - 1] : null;
  const photos = day ? day.photos : trip.days.filter((d) => d.photos.length).map((d) => ({ ...d.photos[0], day: d.number }));
  const goTo = (number) => {
    choose(number);
    daysRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <header className="trip-bar">
        <a href={homeUrl}>Vitaly Kvashin</a>
        <a href={pageUrl()}>All trips</a>
      </header>
      <main className="trip">
        <h1>{trip.title}</h1>
        <p className="trip-stats">
          {dateRange(trip.start, trip.end)} · {trip.days.length} days · {formatNumber(trip.km)} km · ↑ {formatNumber(trip.up)} m
        </p>
        <p className="trip-intro">{trip.intro}</p>

        <TripMap route={route} days={trip.days} selected={day ? day.number : null} onSelect={choose} />

        <div ref={daysRef} className="day-bar-anchor">
          <DayBar days={trip.days} selected={day ? day.number : null} onSelect={choose} />
        </div>

        <section className="day" aria-live="polite">
          <div className="day-head">
            {day && (
              <button type="button" aria-label="Previous day" disabled={day.number === 1} onClick={() => choose(day.number - 1)}>
                ‹
              </button>
            )}
            <h2>{day ? `Day ${day.number}${day.title ? `: ${day.title}` : ""}` : "All days"}</h2>
            <button type="button" aria-label="Next day" disabled={day?.number === trip.days.length} onClick={() => choose(day ? day.number + 1 : 1)}>
              ›
            </button>
          </div>
          {day && <p className="day-stats">{shortDate(day.date)}</p>}
          <DayNumbers numbers={day ? dayNumbers(day) : tripNumbers(trip)} color={day ? DAY_COLORS[(day.number - 1) % DAY_COLORS.length] : undefined} />
          {day && <ElevationProfile profile={day.profile} highest={day.highest} lowest={day.lowest} color={DAY_COLORS[(day.number - 1) % DAY_COLORS.length]} />}

          <div key={day ? day.number : "all"} className="gallery">
            {photos.map((photo, index) => (
              <button
                key={photo.name}
                type="button"
                className="gallery-item"
                style={{ "--ratio": photo.width / photo.height }}
                aria-label={day ? `Open photo ${index + 1}` : `Open day ${photo.day}`}
                onClick={() => (day ? setOpen(index) : goTo(photo.day))}
              >
                <Photo slug={trip.slug} photo={photo} alt="" sizes={`${Math.round((photo.width / photo.height) * 300)}px`} />
                {!day && <span className="gallery-day">Day {photo.day}</span>}
              </button>
            ))}
          </div>

          <div className="story">
            {(day ? day.story : [trip.intro]).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {day && (
            <nav className="day-turn" aria-label="Other days">
              {day.number > 1 && (
                <button type="button" onClick={() => goTo(day.number - 1)}>
                  ← Day {day.number - 1}
                </button>
              )}
              {day.number < trip.days.length && (
                <button type="button" onClick={() => goTo(day.number + 1)}>
                  Day {day.number + 1} →
                </button>
              )}
            </nav>
          )}
        </section>
      </main>
      {open !== null && day && (
        <Lightbox slug={trip.slug} photos={day.photos} index={open} label={`Day ${day.number}`} onIndex={setOpen} onClose={() => setOpen(null)} />
      )}
    </>
  );
};

export default TripPage;
