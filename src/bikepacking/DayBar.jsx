import { useEffect, useRef } from "react";
import { DAY_COLORS } from "./mapStyle";

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
            title={`Day ${day.number} · ${day.km} km`}
            className={selected !== null && selected !== day.number ? "faded" : undefined}
            style={{ flexGrow: day.km, "--km": day.km, background: DAY_COLORS[index % DAY_COLORS.length] }}
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
