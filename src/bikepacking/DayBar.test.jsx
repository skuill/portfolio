import { fireEvent, render, screen } from "@testing-library/react";
import DayBar from "./DayBar";
import { DAY_COLORS } from "./mapStyle";
import { testTrip } from "./testTrip";

const segments = () =>
  [...document.querySelectorAll(".day-segments button")].map((b) => ({
    label: b.getAttribute("aria-label"),
    title: b.getAttribute("title"),
    grow: b.style.flexGrow,
    color: b.style.background,
    pressed: b.getAttribute("aria-pressed"),
    faded: b.classList.contains("faded"),
  }));
const rgb = (hex) => `rgb(${[1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(", ")})`;

test("every day is a segment as wide as its distance, in its map colour", () => {
  render(<DayBar days={testTrip.days} selected={null} onSelect={vi.fn()} />);

  expect(segments()).toEqual(
    testTrip.days.map((day, index) => ({
      label: `Day ${day.number}`,
      title: `Day ${day.number} · ${day.km} km`,
      grow: String(day.km),
      color: rgb(DAY_COLORS[index]),
      pressed: "false",
      faded: false,
    }))
  );
  expect(screen.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "true");
});

test("the chosen day stands out and the others fade", () => {
  render(<DayBar days={testTrip.days} selected={2} onSelect={vi.fn()} />);

  expect(segments().map(({ pressed, faded }) => [pressed, faded])).toEqual([["false", true], ["true", false], ["false", true]]);
  expect(screen.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "false");
});

test("a click picks the day, All picks the whole trip", () => {
  const onSelect = vi.fn();
  render(<DayBar days={testTrip.days} selected={2} onSelect={onSelect} />);

  fireEvent.click(screen.getByRole("button", { name: "Day 3" }));
  fireEvent.click(screen.getByRole("button", { name: "All" }));

  expect(onSelect.mock.calls).toEqual([[3], [null]]);
});

test("when the bar is wider than the screen, the chosen day is scrolled to its middle", () => {
  const { container, rerender } = render(<DayBar days={testTrip.days} selected={null} onSelect={vi.fn()} />);
  const bar = container.querySelector(".day-segments");
  Object.defineProperties(bar, { scrollWidth: { value: 900 }, clientWidth: { value: 300 } });
  const third = bar.children[2];
  Object.defineProperties(third, { offsetLeft: { value: 500 }, clientWidth: { value: 40 } });

  rerender(<DayBar days={testTrip.days} selected={3} onSelect={vi.fn()} />);

  expect(bar.scrollLeft).toBe(370);
});
