// Trip data written by scripts/import_trips.py into src/trips/.
import index from "../trips/index.json";

const tripFiles = import.meta.glob("../trips/*/trip.json", { import: "default" });
const routeFiles = import.meta.glob("../trips/*/route.json", { import: "default" });
const photoFiles = import.meta.glob("../trips/*/photos/*.webp", { eager: true, query: "?url", import: "default" });

// All trips, newest first: what the list page shows.
export const trips = index;

// The full trip and its route (one list of [lon, lat] points per day), loaded only on the trip's page.
export const loadTrip = async (slug) => {
  const [trip, route] = await Promise.all([tripFiles[`../trips/${slug}/trip.json`](), routeFiles[`../trips/${slug}/route.json`]()]);
  return { trip, route };
};

export const photoUrl = (slug, name, size = "large") => photoFiles[`../trips/${slug}/photos/${name}${size === "small" ? "-s" : ""}.webp`];

export const pageUrl = (slug) => `${import.meta.env.BASE_URL}bikepacking/${slug ? `${slug}/` : ""}`;
export const homeUrl = `${import.meta.env.BASE_URL}#interests`;
