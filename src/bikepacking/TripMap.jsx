import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { dayStyle } from "./mapStyle";

// The standard OpenStreetMap tiles: free with attribution, no key. Their colours are softened in _trip.scss.
const TILES = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// The route with one colour per day. A click on a day's track picks that day; the picked day is drawn on top and fills the map.
const TripMap = ({ route, days, selected, onSelect }) => {
  const boxRef = useRef(null);
  const mapRef = useRef(null);
  const linesRef = useRef([]);
  const onSelectRef = useRef(onSelect);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    // One finger scrolls the page on phones; the map moves with two fingers or the zoom buttons.
    const map = L.map(boxRef.current, { scrollWheelZoom: false, dragging: !L.Browser.mobile, zoomSnap: 0.25 });
    L.tileLayer(TILES, { attribution: ATTRIBUTION, maxZoom: 18 }).addTo(map);
    linesRef.current = route.map((points, index) => {
      const latLngs = points.map(([lon, lat]) => [lat, lon]);
      const line = L.polyline(latLngs, dayStyle(index, null)).addTo(map);
      // A wide invisible twin of the track makes it easy to hit with the mouse.
      const target = L.polyline(latLngs, { weight: 18, opacity: 0 }).addTo(map);
      target.bindTooltip(`Day ${days[index].number} · ${days[index].km} km · ↑ ${days[index].up} m`, { sticky: true });
      target.on("click", () => onSelectRef.current(days[index].number));
      return { line, latLngs };
    });
    const all = linesRef.current.flatMap(({ latLngs }) => latLngs);
    if (all.length) map.fitBounds(L.latLngBounds(all), { padding: [24, 24] });
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [route, days]);

  useEffect(() => {
    const map = mapRef.current;
    linesRef.current.forEach(({ line }, index) => {
      line.setStyle(dayStyle(index, selected));
      if (index + 1 === selected) line.bringToFront();
    });
    const shown = linesRef.current.filter((_, index) => selected === null || index + 1 === selected).flatMap(({ latLngs }) => latLngs);
    if (shown.length) map.fitBounds(L.latLngBounds(shown), { padding: [24, 24] });
  }, [selected, route, days]);

  return <div ref={boxRef} className="trip-map" role="region" aria-label="Map of the route, one colour per day" />;
};

export default TripMap;
