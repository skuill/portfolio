import { act, fireEvent, render, screen, within } from "@testing-library/react";
import TripPage from "./TripPage";
import TripMap from "./TripMap";
import { loadTrip } from "./trips";
import { testRoute, testTrip } from "./testTrip";

vi.mock("./trips", () => ({
  loadTrip: vi.fn(),
  photoUrl: (slug, name, size) => `/${slug}/${name}${size === "small" ? "-s" : ""}.webp`,
  homeUrl: "/portfolio/#interests",
  pageUrl: (slug) => `/portfolio/bikepacking/${slug ? `${slug}/` : ""}`,
}));
// The map has its own tests; here it only reports what it shows and lets the test pick a day on it.
vi.mock("./TripMap", () => ({ default: vi.fn(() => null) }));

beforeEach(() => {
  window.history.replaceState(null, "", "/portfolio/bikepacking/test-trip/");
  loadTrip.mockReset();
  loadTrip.mockResolvedValue({ trip: testTrip, route: testRoute });
  TripMap.mockClear();
  Element.prototype.scrollIntoView = vi.fn();
});

const renderTrip = async () => {
  render(<TripPage slug="test-trip" />);
  await screen.findByRole("heading", { level: 1 });
};
const dayHeading = () => screen.getByRole("heading", { level: 2 }).textContent;
const gallery = () => [...document.querySelectorAll(".gallery img")].map((img) => img.getAttribute("src"));
const story = () => [...document.querySelectorAll(".story p")].map((p) => p.textContent);
const pressed = () => within(screen.getByRole("navigation", { name: "Days" })).getAllByRole("button").filter((b) => b.getAttribute("aria-pressed") === "true").map((b) => b.textContent);
const mapSelected = () => TripMap.mock.lastCall[0].selected;

test("loads its own trip and shows the whole trip first: numbers, the first photo of each day and the intro", async () => {
  await renderTrip();

  expect(loadTrip.mock.calls).toEqual([["test-trip"]]);
  expect(document.querySelector(".trip-stats").textContent).toBe("27 Jun to 29 Jun 2026 · 3 days · 250 km · ↑ 1,800 m");
  expect(dayHeading()).toBe("All days");
  expect(pressed()).toEqual(["All"]);
  expect(gallery()).toEqual(["/test-trip/d01-01-s.webp", "/test-trip/d02-01-s.webp"]);
  expect([...document.querySelectorAll(".gallery-day")].map((label) => label.textContent)).toEqual(["Day 1", "Day 2"]);
  expect(story()).toEqual(["Three days of test gravel."]);
  expect(document.querySelector(".day-numbers").style.background).toBe("");
  expect(mapSelected()).toBeNull();
  expect(TripMap.mock.lastCall[0].route).toBe(testRoute);
});

test("a day picked in the strip shows its numbers, photos and story, and goes into the address", async () => {
  await renderTrip();

  fireEvent.click(screen.getByRole("button", { name: "Day 1" }));

  expect(window.location.hash).toBe("#day-1");
  expect(dayHeading()).toBe("Day 1: Start");
  expect(pressed()).toEqual(["1"]);
  expect([...document.querySelectorAll(".day-numbers dd")].map((dd) => dd.textContent)).toEqual([
    "80.5 km", "600 m", "5 h 10 min", "8 h 0 min", "15.6 km/h", "120 m", "15 to 24 °C", "101 bpm",
  ]);
  expect(document.querySelector(".profile figcaption").textContent).toBe("120 m10 m81 km");
  expect(document.querySelector(".day-numbers").style.background).toBe("rgba(208, 138, 104, 0.16)");
  expect(gallery()).toEqual(["/test-trip/d01-01-s.webp", "/test-trip/d01-02-s.webp"]);
  expect(story()).toEqual(["Day one, first paragraph.", "Day one, second paragraph."]);
  expect(mapSelected()).toBe(1);
});

test("a day picked on the map is shown the same way", async () => {
  await renderTrip();

  act(() => TripMap.mock.lastCall[0].onSelect(2));

  expect(window.location.hash).toBe("#day-2");
  expect(dayHeading()).toBe("Day 2");
  expect(gallery()).toEqual(["/test-trip/d02-01-s.webp", "/test-trip/d02-02-s.webp", "/test-trip/d02-03-s.webp"]);
  expect(story()).toEqual(["Day two."]);
});

test("a link with a day opens that day, an unknown day opens the whole trip", async () => {
  window.history.replaceState(null, "", "#day-2");
  await renderTrip();
  expect(dayHeading()).toBe("Day 2");
  expect(mapSelected()).toBe(2);
});

test("an unknown day in the link opens the whole trip", async () => {
  window.history.replaceState(null, "", "#day-9");
  await renderTrip();
  expect(dayHeading()).toBe("All days");
  expect(mapSelected()).toBeNull();
});

test("the Back button returns to the previous day", async () => {
  await renderTrip();
  fireEvent.click(screen.getByRole("button", { name: "Day 1" }));
  fireEvent.click(screen.getByRole("button", { name: "Day 2" }));

  act(() => {
    window.history.replaceState(null, "", "#day-1");
    window.dispatchEvent(new PopStateEvent("popstate"));
  });

  expect(dayHeading()).toBe("Day 1: Start");
});

test("a photo in the whole-trip view opens its day; the day links go back and forth", async () => {
  await renderTrip();

  fireEvent.click(screen.getByRole("button", { name: "Open day 2" }));
  expect(dayHeading()).toBe("Day 2");

  fireEvent.click(screen.getByRole("button", { name: "Day 3 →" }));
  expect(dayHeading()).toBe("Day 3: Home");
  expect(screen.queryByRole("button", { name: /Day 4/ })).toBeNull();

  fireEvent.click(screen.getByRole("button", { name: "← Day 2" }));
  expect(dayHeading()).toBe("Day 2");
  expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
});

test("a day without photos or story shows neither", async () => {
  window.history.replaceState(null, "", "#day-3");
  await renderTrip();

  expect(gallery()).toEqual([]);
  expect(story()).toEqual([]);
});

test("a photo of a day opens full screen; the strip, arrows, a tap and a swipe move between photos and Esc closes", async () => {
  window.history.replaceState(null, "", "#day-2");
  await renderTrip();
  const shown = () => screen.getByRole("dialog").querySelector("img").getAttribute("src");

  fireEvent.click(screen.getByRole("button", { name: "Open photo 2" }));
  expect(screen.getByRole("dialog", { name: "Day 2" })).toBeInTheDocument();
  expect(shown()).toBe("/test-trip/d02-02.webp");
  expect(screen.getByRole("button", { name: "Close" })).toHaveFocus();

  fireEvent.keyDown(window, { key: "ArrowRight" });
  expect(shown()).toBe("/test-trip/d02-03.webp");
  fireEvent.keyDown(window, { key: "ArrowRight" });
  expect(shown()).toBe("/test-trip/d02-01.webp");
  const strip = () => [...screen.getByRole("dialog").querySelectorAll(".filmstrip button")].map((b) => [b.getAttribute("aria-label"), b.getAttribute("aria-current")]);
  expect(strip()).toEqual([["Photo 1", "true"], ["Photo 2", "false"], ["Photo 3", "false"]]);
  fireEvent.click(screen.getByRole("button", { name: "Photo 3" }));
  expect(shown()).toBe("/test-trip/d02-03.webp");
  const stage = screen.getByRole("dialog").querySelector(".lightbox-stage");
  fireEvent.pointerDown(stage, { clientX: 100 });
  fireEvent.pointerUp(stage, { clientX: 200 });
  expect(shown()).toBe("/test-trip/d02-02.webp");
  fireEvent.pointerDown(stage, { clientX: 200 });
  fireEvent.pointerUp(stage, { clientX: 205 });
  expect(shown()).toBe("/test-trip/d02-03.webp");

  fireEvent.keyDown(window, { key: "Escape" });
  expect(screen.queryByRole("dialog")).toBeNull();
});

test("links back to the main page and to all trips", async () => {
  await renderTrip();

  expect(within(document.querySelector(".trip-bar")).getAllByRole("link").map((a) => [a.textContent, a.getAttribute("href")])).toEqual([
    ["Vitaly Kvashin", "/portfolio/#interests"],
    ["All trips", "/portfolio/bikepacking/"],
  ]);
});

test("the arrows by the day title go to the neighbouring days and stop at the ends", async () => {
  await renderTrip();
  expect(screen.queryByRole("button", { name: "Previous day" })).toBeNull();

  fireEvent.click(screen.getByRole("button", { name: "Next day" }));
  expect(dayHeading()).toBe("Day 1: Start");
  expect(screen.getByRole("button", { name: "Previous day" })).toBeDisabled();

  fireEvent.click(screen.getByRole("button", { name: "Next day" }));
  fireEvent.click(screen.getByRole("button", { name: "Next day" }));
  expect(dayHeading()).toBe("Day 3: Home");
  expect(screen.getByRole("button", { name: "Next day" })).toBeDisabled();

  fireEvent.click(screen.getByRole("button", { name: "Previous day" }));
  expect(dayHeading()).toBe("Day 2");
});

test("the strip of the full-screen view keeps the current photo in its middle", async () => {
  window.history.replaceState(null, "", "#day-2");
  await renderTrip();
  fireEvent.click(screen.getByRole("button", { name: "Open photo 1" }));
  const strip = screen.getByRole("dialog").querySelector(".filmstrip");
  strip.scrollTo = vi.fn();
  Object.defineProperty(strip, "clientWidth", { value: 300 });
  Object.defineProperties(strip.children[2], { offsetLeft: { value: 400 }, clientWidth: { value: 60 } });

  fireEvent.click(screen.getByRole("button", { name: "Photo 3" }));

  expect(strip.scrollTo).toHaveBeenLastCalledWith({ left: 280, behavior: "smooth" });
});

const reportTrip = {
  ...testTrip,
  links: [{ text: "The original, in Russian", href: "https://example.com/original" }],
  general: {
    title: "Trip report",
    blocks: [
      { h: "The route" },
      { p: "From [Gyumri](https://example.com/gyumri) to **Batumi** and back." },
      { ol: ["Armenia", "Georgia"] },
      { ul: ["Rain", "Dogs"] },
    ],
  },
};
const report = () => {
  const article = document.querySelector(".story .general");
  return article && [...article.children].map((node) => [node.tagName, node.innerHTML]);
};
const REPORT = [
  ["H3", "Trip report"],
  ["H4", "The route"],
  ["P", 'From <a href="https://example.com/gyumri" target="_blank" rel="noopener noreferrer">Gyumri</a> to <b>Batumi</b> and back.'],
  ["OL", "<li>Armenia</li><li>Georgia</li>"],
  ["UL", "<li>Rain</li><li>Dogs</li>"],
];

test("a trip with a report links to the original and shows the report instead of the intro and under days without a story", async () => {
  loadTrip.mockResolvedValue({ trip: reportTrip, route: testRoute });
  await renderTrip();

  expect([...document.querySelectorAll(".trip-links a")].map((a) => [a.textContent, a.getAttribute("href"), a.getAttribute("target")])).toEqual([
    ["The original, in Russian ↗", "https://example.com/original", "_blank"],
  ]);
  expect(report()).toEqual(REPORT);
  expect(story()).toEqual(["From Gyumri to Batumi and back."]);

  fireEvent.click(screen.getByRole("button", { name: "Day 1" }));
  expect(report()).toBeNull();
  expect(story()).toEqual(["Day one, first paragraph.", "Day one, second paragraph."]);

  fireEvent.click(screen.getByRole("button", { name: "Day 3" }));
  expect(report()).toEqual(REPORT);
});

test("a trip without links shows no line for them", async () => {
  await renderTrip();
  expect(document.querySelector(".trip-links")).toBeNull();
});
