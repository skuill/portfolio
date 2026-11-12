# Bikepacking pages

`/portfolio/bikepacking/` lists the long trips; every trip has its own page, for example `/portfolio/bikepacking/gravel-land-saga/`. The pages do not depend on Strava or any other service that can change or lose data: texts, photos and tracks are part of the site. Only the map tiles come from OpenStreetMap.

## A trip page
- The map shows the whole route, one colour per day ([Leaflet](https://leafletjs.com/), OpenStreetMap tiles with softened colours).
- Under it, a bar with a segment per day, as wide as the day's distance and in the colour of its track. A click on a segment or on a track on the map picks that day; the arrows by the day title go to the neighbouring days.
- For the picked day: date, numbers from the track (distance, climbing, moving time, time on the road, average speed, highest point, temperature, average heart rate, when recorded), the elevation profile, the photos in rows of one height and the story of the day. With no day picked: the numbers of the whole trip, the first photo of every day (a click opens that day) and the intro.
- The picked day is in the address (`#day-5`): a link opens that day, the Back button returns to the previous one.
- Photos open full screen with a strip of all photos of the day; the strip, the arrow keys, a tap or a swipe move between them.

## How the data gets here
The trips come from a local archive that is not part of the repository: one folder per trip with `diary.md` (the days with their numbers and stories), `tracks/` (a GPX per day) and `photos/day-NN_date/`. The archive was built from the Strava data export; its own tools pick the photos (`selection.json` per trip: the photos of every day in their order and the cover of the trip).

`npm run trips` (Python 3.11+ with Pillow) imports every trip listed in `scripts/trips.json`:

| Written | What |
|---|---|
| `src/trips/<slug>/trip.json` | Title, intro, dates, totals, cover and every day: numbers, elevation profile, story, photos |
| `src/trips/<slug>/route.json` | The route, one list of `[lon, lat]` points per day, simplified to within 6 m of the recording |
| `src/trips/<slug>/photos/` | Every picked photo in two sizes (1600 px and 480 px on the long side, WebP) |
| `src/trips/<slug>/cover.webp` | The cover, small, for the card in Interests |
| `src/trips/<slug>/sources.json` | Which archive photo each site photo came from, so a new run encodes only what changed |
| `src/trips/index.json` | The short list of all trips for the list page |
| `bikepacking/<slug>/index.html` | The trip's page, from `scripts/trip-page.html` |

The archive path comes from the `TRIPS_ARCHIVE` environment variable, for example `TRIPS_ARCHIVE=/path/to/archive npm run trips`.

Lines that the watch app adds to every description ("240 Training Load", "-- from COROS") are dropped, and a Strava mention of another athlete keeps only the name. A day without a picked photo gets 8 photos spread evenly over the day.

## Adding a trip
1. Add the trip to the archive and pick its photos there.
2. Add an entry to `scripts/trips.json`: `slug` (the address), `archive` (the folder in the archive), `title`, `intro` (a short paragraph in English), `dayTitlePrefix` (a regular expression removed from the day titles, or empty) and `trimStartKm` / `trimEndKm` (kilometres hidden at the start and end of the route when it starts or ends at home).
3. `npm run trips`, check the page with `npm start`, commit the changes in `src/trips/` and `bikepacking/`.

Every page of the site is listed in `vite.config.js` from the folders in `bikepacking/`, so a new trip needs no other change. The trip card in Interests points to a trip by its `slug` in `config.js` and takes its distance from the trip data.

## Size
A trip of 19 days with 275 photos is about 90 MB in the repository. A page loads only its own trip; photos load as they come into view.
