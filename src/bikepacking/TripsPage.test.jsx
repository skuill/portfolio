import { render, screen, within } from "@testing-library/react";
import TripsPage from "./TripsPage";
import { trips } from "./trips";

test("every imported trip has a card with its cover, dates, size and intro that opens its page", () => {
  render(<TripsPage />);

  const cards = screen.getAllByRole("listitem").map((item) => ({
    link: within(item).getByRole("link").getAttribute("href"),
    title: item.querySelector("b").textContent,
    facts: item.querySelector("small").textContent,
    intro: item.querySelector(".trip-card > span").textContent,
    cover: item.querySelector("img").getAttribute("src") !== null,
  }));

  expect(cards.length).toBe(trips.length);
  expect(cards[0]).toEqual({
    link: `${import.meta.env.BASE_URL}bikepacking/${trips[0].slug}/`,
    title: trips[0].title,
    facts: expect.stringMatching(new RegExp(`· ${trips[0].days} days · [\\d,]+ km$`)),
    intro: trips[0].intro,
    cover: true,
  });
  expect(screen.getByRole("link", { name: "Vitaly Kvashin" })).toHaveAttribute("href", `${import.meta.env.BASE_URL}#interests`);
});
