import { fireEvent, render, screen, within } from "@testing-library/react";
import Interests from "./Interests";
import Mosaic from "../Mosaic/Mosaic";
import { FIGURES } from "../Mosaic/figures";
import { shuffle } from "../../utils/shuffle";
import trips from "../../trips/index.json";

// The page's Mosaic is replaced to see which picture it is told to show and to report one of its own.
vi.mock("../Mosaic/Mosaic", () => ({ default: vi.fn(() => null) }));
vi.mock("../../utils/shuffle", () => ({ shuffle: vi.fn() }));

const images = [
  { img: "a.webp", blur: "data:blur-a", alt: "Photo A", distance: "1,000 km", label: "Trip A", url: "https://example.com/a" },
  { img: "b.webp", blur: "data:blur-b", alt: "Photo B", label: "Trip B" },
];
const props = {
  heading: "Interests",
  intro: ["Before ", { text: "trips", href: "bikepacking/" }, ", then ", { text: "on Strava", href: "https://strava.example/me" }, ". After."],
  allTrips: { text: "All trips →", href: "bikepacking/" },
  trip: { slug: trips[0].slug, label: "across Sweden" },
  images,
};

beforeEach(() => {
  Mosaic.mockClear();
  shuffle.mockReset();
  shuffle.mockImplementation((list) => [...list].reverse());
});

const shownFigure = () => Mosaic.mock.lastCall[0].figure;
const pressedWords = () => within(screen.getByRole("list")).getAllByRole("button").filter((b) => b.getAttribute("aria-pressed") === "true").map((b) => b.textContent);
const word = (name) => screen.getByRole("button", { name });

test("shows the intro with its links, a word per picture and the trip with the photos in shuffled order", () => {
  const { container } = render(<Interests {...props} />);

  expect(container.querySelector(".interests p").textContent).toBe("Before trips, then on Strava. After.");
  expect(screen.getByRole("link", { name: "on Strava" })).toHaveAttribute("href", "https://strava.example/me");
  expect(screen.getByRole("link", { name: "trips" })).toHaveAttribute("href", `${import.meta.env.BASE_URL}bikepacking/`);
  expect(screen.getByRole("link", { name: "All trips →" })).toHaveAttribute("href", `${import.meta.env.BASE_URL}bikepacking/`);
  expect(within(screen.getByRole("list")).getAllByRole("button").map((b) => b.textContent)).toEqual(FIGURES.map(({ name }) => name));
  expect(
    [...container.querySelectorAll("figure")].map((figure) => ({
      alt: figure.querySelector("img").getAttribute("alt"),
      caption: figure.querySelector("figcaption").textContent,
      link: figure.querySelector("a")?.getAttribute("href"),
    }))
  ).toEqual([
    { alt: "", caption: `${new Intl.NumberFormat("en-GB").format(trips[0].km)} kmacross Sweden`, link: `${import.meta.env.BASE_URL}bikepacking/${trips[0].slug}/` },
    { alt: "Photo B", caption: "Trip B", link: undefined },
    { alt: "Photo A", caption: "1,000 kmTrip A", link: "https://example.com/a" },
  ]);
  expect(container.querySelector("figure img").getAttribute("src")).toMatch(/cover\.webp$/);
  expect(shuffle.mock.calls).toEqual([[images]]);
});

test.each([
  ["mouse over", fireEvent.mouseEnter],
  ["focus", fireEvent.focus],
  ["click", fireEvent.click],
])("%s on a word shows its picture", (_, event) => {
  render(<Interests {...props} />);
  expect(shownFigure()).toBe(1);

  event(word("Camping"));

  expect(shownFigure()).toBe(FIGURES.findIndex(({ name }) => name === "Camping"));
  expect(pressedWords()).toEqual(["Camping"]);
});

test("a picture the mosaic moves to by itself lights up its word", async () => {
  render(<Interests {...props} />);

  const { act } = await import("@testing-library/react");
  act(() => Mosaic.mock.lastCall[0].onFigureChange(6));

  expect(pressedWords()).toEqual([FIGURES[6].name]);
});

test("each photo shows its blurred preview and fades in on its own once it has loaded", () => {
  const { container } = render(<Interests {...props} />);
  const figures = () => [...container.querySelectorAll("figure")];
  const loaded = () => figures().map((figure) => figure.querySelector("img").classList.contains("loaded"));

  expect(figures().map((figure) => figure.style.getPropertyValue("--blur"))).toEqual([`url(${trips[0].cover.blur})`, "url(data:blur-b)", "url(data:blur-a)"]);
  expect(loaded()).toEqual([false, false, false]);

  fireEvent.load(screen.getByAltText("Photo A"));

  expect(loaded()).toEqual([false, false, true]);
});

test("keeps one shuffled order while the reader plays with the words", () => {
  render(<Interests {...props} />);

  fireEvent.click(word("Camping"));
  fireEvent.click(word("Bass"));

  expect(shuffle).toHaveBeenCalledTimes(1);
});
