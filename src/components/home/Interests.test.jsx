import { fireEvent, render, screen, within } from "@testing-library/react";
import Interests from "./Interests";
import Mosaic from "../Mosaic/Mosaic";
import { FIGURES } from "../Mosaic/figures";
import { shuffle } from "../../utils/shuffle";

// The page's Mosaic is replaced to see which picture it is told to show and to report one of its own.
vi.mock("../Mosaic/Mosaic", () => ({ default: vi.fn(() => null) }));
vi.mock("../../utils/shuffle", () => ({ shuffle: vi.fn() }));

const images = [
  { img: "a.webp", alt: "Photo A", distance: "1,000 km", label: "Trip A", url: "https://example.com/a" },
  { img: "b.webp", alt: "Photo B", label: "Trip B" },
];
const props = {
  heading: "Interests",
  intro: { before: "Before", after: ". After." },
  strava: { label: "on Strava", url: "https://strava.example/me" },
  trip: { distance: "1,900 km", label: "across Sweden" },
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

test("shows the intro with the Strava link, a word per picture and the trip with the photos in shuffled order", () => {
  const { container } = render(<Interests {...props} />);

  expect(container.querySelector(".interests p").textContent).toBe("Before on Strava. After.");
  expect(screen.getByRole("link", { name: "on Strava" })).toHaveAttribute("href", props.strava.url);
  expect(within(screen.getByRole("list")).getAllByRole("button").map((b) => b.textContent)).toEqual(FIGURES.map(({ name }) => name));
  expect(container.querySelector(".trip").textContent).toBe("1,900 kmacross Sweden");
  expect(
    [...container.querySelectorAll("figure")].map((figure) => ({
      alt: figure.querySelector("img").getAttribute("alt"),
      caption: figure.querySelector("figcaption").textContent,
      link: figure.querySelector("a")?.getAttribute("href"),
    }))
  ).toEqual([
    { alt: "Photo B", caption: "Trip B", link: undefined },
    { alt: "Photo A", caption: "1,000 kmTrip A", link: "https://example.com/a" },
  ]);
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

test("keeps one shuffled order while the reader plays with the words", () => {
  render(<Interests {...props} />);

  fireEvent.click(word("Camping"));
  fireEvent.click(word("Bass"));

  expect(shuffle).toHaveBeenCalledTimes(1);
});
