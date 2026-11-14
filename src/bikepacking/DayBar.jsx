import { useEffect, useRef } from "react";
import { DAY_COLORS, labelColor } from "./mapStyle";

// A rest day has no distance; it still gets a segment wide enough for its number, as wide as a day of this many km.
const REST_WIDTH_KM = 20;

// The trip as one bar: a segment per day, as wide as its distance, in the colour of its track on the map.
const DayBar = ({ days, selected, onSelect }) => {
  const segmentsRef = useRef(null);

  // On a phone the bar scrolls sideways: keep the chosen day in the middle of it.
  useEffect(() => {
    const bar = segmentsRef.current;
    const chosen = bar.querySelector('[aria-pressed="true"]');
    if (chosen && bar.scrollWidth > bar.clientWidth) {
      bar.scrollLeft = chosen.offsetLeft - (bar.clientWidth - chosen.clientWidth) / 2;
    }
  }, [selected]);

  return (
    <nav className="day-bar" aria-label="Days">
      <button type="button" className="day-all" aria-pressed={selected === null} onClick={() => onSelect(null)}>
        All
      </button>
      <div ref={segmentsRef} className="day-segments">
        {days.map((day, index) => (
          <button
            key={day.number}
            type="button"
            aria-pressed={selected === day.number}
            aria-label={`Day ${day.number}`}
            title={`Day ${day.number} · ${day.km ? `${day.km} km` : "rest day"}`}
            className={selected !== null && selected !== day.number ? "faded" : undefined}
            style={{ flexGrow: Math.max(day.km, REST_WIDTH_KM), "--km": Math.max(day.km, REST_WIDTH_KM), background: DAY_COLORS[index % DAY_COLORS.length], color: labelColor(DAY_COLORS[index % DAY_COLORS.length]) }}
            onClick={() => onSelect(day.number)}
          >
            <span>{day.number}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default DayBar;
