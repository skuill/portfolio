import { render } from "@testing-library/react";
import L from "leaflet";
import TripMap from "./TripMap";
import { dayStyle, DAY_COLORS, labelColor } from "./mapStyle";
import { testRoute, testTrip } from "./testTrip";

// Leaflet needs a real browser layout; the test double records what the map was asked to draw.
vi.mock("leaflet", () => {
  const map = { fitBounds: vi.fn(), remove: vi.fn() };
  const lines = [];
  const polyline = vi.fn((latLngs, style) => {
    const line = {
      latLngs,
      style,
      handlers: {},
      addTo: vi.fn(() => line),
      setStyle: vi.fn((next) => (line.style = next)),
      bringToFront: vi.fn(),
      bindTooltip: vi.fn((text) => (line.tooltip = text)),
      on: vi.fn((event, handler) => (line.handlers[event] = handler)),
    };
    lines.push(line);
    return line;
  });
  return {
    default: {
      map: vi.fn(() => map),
      tileLayer: vi.fn(() => ({ addTo: vi.fn() })),
      polyline,
      latLngBounds: vi.fn((points) => ({ points })),
      Browser: { mobile: false },
      __map: map,
      __lines: lines,
    },
  };
});

const drawn = () => L.__lines.filter((line) => line.style.opacity !== 0);
const targets = () => L.__lines.filter((line) => line.style.opacity === 0);
const latLngsOf = (index) => testRoute[index].map(([lon, lat]) => [lat, lon]);

beforeEach(() => {
  L.__lines.length = 0;
  vi.clearAllMocks();
});

test("draws every day in its own colour with a wide invisible track to click, and shows the whole route", () => {
  render(<TripMap route={testRoute} days={testTrip.days} selected={null} onSelect={vi.fn()} />);

  expect(drawn().map((line) => [line.latLngs, line.style])).toEqual(testRoute.map((_, index) => [latLngsOf(index), dayStyle(index, null)]));
  expect(targets().map((line) => [line.latLngs, line.style.weight, line.tooltip])).toEqual([
    [latLngsOf(0), 18, "Day 1 · 80.5 km · ↑ 600 m"],
    [latLngsOf(1), 18, "Day 2 · 120.2 km · ↑ 900 m"],
    [latLngsOf(2), 18, "Day 3 · 49.3 km · ↑ 300 m"],
  ]);
  expect(L.__map.fitBounds).toHaveBeenLastCalledWith({ points: [0, 1, 2].flatMap(latLngsOf) }, { padding: [24, 24] });
});

test("a click on a day's track picks that day", () => {
  const onSelect = vi.fn();
  render(<TripMap route={testRoute} days={testTrip.days} selected={null} onSelect={onSelect} />);

  targets()[1].handlers.click();

  expect(onSelect.mock.calls).toEqual([[2]]);
});

test("the picked day is drawn on top in full and fills the map, the others fade", () => {
  const { rerender } = render(<TripMap route={testRoute} days={testTrip.days} selected={null} onSelect={vi.fn()} />);

  rerender(<TripMap route={testRoute} days={testTrip.days} selected={3} onSelect={vi.fn()} />);

  expect(drawn().map((line) => line.style)).toEqual([dayStyle(0, 3), dayStyle(1, 3), dayStyle(2, 3)]);
  expect(drawn().map((line) => line.bringToFront.mock.calls.length)).toEqual([0, 0, 1]);
  expect(L.__map.fitBounds).toHaveBeenLastCalledWith({ points: latLngsOf(2) }, { padding: [24, 24] });
});

test("removes the map when the page leaves it", () => {
  const { unmount } = render(<TripMap route={testRoute} days={testTrip.days} selected={null} onSelect={vi.fn()} />);

  unmount();

  expect(L.__map.remove).toHaveBeenCalledTimes(1);
});

test("day styles: all days equal, or the picked one bold and the rest faded", () => {
  expect(dayStyle(9, null)).toEqual({ color: DAY_COLORS[1], weight: 4, opacity: 0.9 });
  expect(dayStyle(0, 1)).toEqual({ color: DAY_COLORS[0], weight: 6, opacity: 1 });
  expect(dayStyle(1, 1)).toEqual({ color: DAY_COLORS[1], weight: 3, opacity: 0.3 });
});

test("the number on a day's colour is white where it is readable and dark ink on the light colours", () => {
  expect(DAY_COLORS.map(labelColor)).toEqual(["#22282f", "#fff", "#22282f", "#22282f", "#22282f", "#fff", "#22282f", "#fff"]);
});
