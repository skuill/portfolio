import { buildSpots, createMosaicEngine, vivid } from "./mosaicEngine";
import { FIGURES, UNIT } from "./figures";
import { installIntersectionObserver } from "../../testing/intersectionObserver";

const AUTO_MS = 9000;
const lastFigure = FIGURES.length - 1;

let viewport;
let holder;
let now;
let engines;
const onChange = vi.fn();

const engine = (options = {}) => {
  const created = createMosaicEngine({ holder, canvas: document.createElement("canvas"), density: 1.2, onChange, ...options });
  engines.push(created);
  return created;
};
const advance = (ms) => {
  now += ms;
  vi.advanceTimersByTime(ms);
};
const mouse = { clientX: 10, clientY: 10, detail: 1 };
const reducedMotion = () => {
  window.matchMedia = () => ({ matches: true });
};

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["setInterval", "clearInterval", "setTimeout", "clearTimeout", "requestAnimationFrame", "cancelAnimationFrame"] });
  viewport = installIntersectionObserver();
  holder = document.createElement("button");
  now = 100000;
  vi.spyOn(performance, "now").mockImplementation(() => now);
  onChange.mockClear();
  engines = [];
});
afterEach(() => {
  engines.forEach((created) => created.destroy());
  vi.useRealTimers();
  vi.restoreAllMocks();
});

test("vivid moves a colour away from its grey, leaves grey alone and stays in the colour range", () => {
  expect(vivid([100, 100, 100], 1.5).map(Math.round)).toEqual([100, 100, 100]);
  expect(vivid([120, 100, 100], 2).map(Math.round)).toEqual([134, 94, 94]);
  expect(vivid([255, 0, 0], 3).map(Math.round)).toEqual([255, 0, 0]);
});

test("tiles are laid inside the circle, and a larger density means fewer of them", () => {
  const fine = buildSpots(1);
  const coarse = buildSpots(2);

  expect(coarse.length).toBeLessThan(fine.length);
  expect(fine.every(({ x, y }) => Math.hypot(x - UNIT / 2, y - UNIT / 2) < UNIT / 2)).toBe(true);
});

test("assembles its first picture once, when it first comes into view", () => {
  const mosaic = engine({ start: 3 });
  expect(mosaic.state()).toMatchObject({ current: 3, assembled: false, running: false });

  viewport.intersect(holder);
  expect(mosaic.state()).toMatchObject({ current: 3, assembled: true, running: true });
  expect(onChange.mock.calls).toEqual([[3]]);

  viewport.intersect(holder, false);
  viewport.intersect(holder);
  expect(onChange.mock.calls).toEqual([[3]]);
});

test("a click always changes the picture, also while tiles are in flight, and wraps after the last one", () => {
  const mosaic = engine({ start: lastFigure - 1 });
  viewport.intersect(holder);
  onChange.mockClear();

  mosaic.click(mouse);
  expect(mosaic.state()).toMatchObject({ current: lastFigure, running: true });

  mosaic.click(mouse);
  expect(mosaic.state()).toMatchObject({ current: 0, running: true });
  expect(onChange.mock.calls).toEqual([[lastFigure], [0]]);
});

test("hover changes the picture, and the click that ends the same approach does not change it again", () => {
  const mosaic = engine();
  viewport.intersect(holder);
  advance(3000);
  onChange.mockClear();

  mosaic.pointerEnter(mouse);
  now += 499;
  mosaic.click(mouse);
  expect(onChange.mock.calls).toEqual([[1]]);

  now += 1;
  mosaic.click(mouse);
  expect(onChange.mock.calls).toEqual([[1], [2]]);
});

test("hover does not interrupt tiles in flight", () => {
  const mosaic = engine();
  viewport.intersect(holder);
  onChange.mockClear();

  mosaic.pointerEnter(mouse);

  expect(onChange).not.toHaveBeenCalled();
  expect(mosaic.state().current).toBe(0);
});

test("goTo flies to the chosen picture and ignores the one already shown", () => {
  const mosaic = engine({ start: 2 });

  mosaic.goTo(2);
  expect(onChange).not.toHaveBeenCalled();

  mosaic.goTo(5);
  expect(mosaic.state()).toMatchObject({ current: 5, running: true });
  expect(onChange.mock.calls).toEqual([[5]]);
});

test("a picture chosen before the mosaic comes into view is the one it assembles", () => {
  const mosaic = engine({ start: 1 });
  mosaic.goTo(4);
  onChange.mockClear();

  viewport.intersect(holder);

  expect(mosaic.state().current).toBe(4);
  expect(onChange.mock.calls).toEqual([[4]]);
});

test("changes by itself only when asked, in view, not hovered and left alone", () => {
  const still = engine();
  viewport.intersect(holder);
  advance(AUTO_MS * 2);
  expect(still.state().current).toBe(0);
  still.destroy();

  holder = document.createElement("button");
  const mosaic = engine({ auto: true });
  advance(AUTO_MS);
  expect(mosaic.state().current).toBe(0); // not in view yet

  viewport.intersect(holder);
  advance(3000);
  vi.runOnlyPendingTimers();
  mosaic.pointerEnter(mouse); // figure 1, and now hovered
  advance(3000);
  vi.runOnlyPendingTimers();
  now += AUTO_MS * 2;
  vi.advanceTimersByTime(AUTO_MS);
  expect(mosaic.state().current).toBe(1);

  mosaic.pointerLeave();
  now += AUTO_MS * 2;
  vi.advanceTimersByTime(AUTO_MS);
  expect(mosaic.state().current).toBe(2);
});

test("does not change by itself right after the reader changed the picture", () => {
  const mosaic = engine({ auto: true });
  viewport.intersect(holder);
  advance(3000);
  mosaic.click(mouse);
  advance(3000);
  expect(mosaic.state()).toMatchObject({ current: 1, running: false });

  vi.advanceTimersByTime(AUTO_MS); // the timer ticks, but the click was only 3 seconds ago
  expect(mosaic.state().current).toBe(1);

  now += AUTO_MS;
  vi.advanceTimersByTime(AUTO_MS);
  expect(mosaic.state().current).toBe(2);
});

test("with reduced motion the picture changes at once and nothing flies or changes by itself", () => {
  reducedMotion();
  const mosaic = engine({ auto: true });

  viewport.intersect(holder);
  expect(mosaic.state()).toMatchObject({ current: 0, assembled: true, running: false });

  mosaic.click(mouse);
  expect(mosaic.state()).toMatchObject({ current: 1, running: false });
  expect(onChange.mock.calls).toEqual([[1]]);

  now += AUTO_MS * 3;
  vi.advanceTimersByTime(AUTO_MS * 3);
  expect(mosaic.state().current).toBe(1);
});

test("stops everything when destroyed", () => {
  const mosaic = engine({ auto: true });
  viewport.intersect(holder);
  advance(3000); // the tiles have landed and the first automatic change is still ahead
  expect(mosaic.state()).toMatchObject({ current: 0, running: false });

  mosaic.destroy();
  now += AUTO_MS * 3;
  vi.advanceTimersByTime(AUTO_MS * 3);

  expect(mosaic.state().current).toBe(0);
  expect(onChange.mock.calls).toEqual([[0]]);
});
