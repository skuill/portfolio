import Photo from "./Photo";
import { trips, homeUrl, pageUrl } from "./trips";
import { dateRange, formatNumber } from "./format";

// The list of trips: a card with the cover, dates and a short intro opens each trip.
const TripsPage = () => (
  <>
    <header className="trip-bar">
      <a href={homeUrl}>Vitaly Kvashin</a>
    </header>
    <main className="trip">
      <h1>Bikepacking</h1>
      <p className="trip-intro">Long trips, day by day: the route on a map, photos and the story of every day.</p>
      <ul className="trip-list">
        {trips.map((trip) => (
          <li key={trip.slug}>
            <a href={pageUrl(trip.slug)}>
              <Photo slug={trip.slug} photo={trip.cover} alt="" />
              <span className="trip-card">
                <b>{trip.title}</b>
                <small>
                  {dateRange(trip.start, trip.end)} · {trip.days} days · {formatNumber(trip.km)} km
                </small>
                <span>{trip.intro}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </main>
  </>
);

export default TripsPage;
