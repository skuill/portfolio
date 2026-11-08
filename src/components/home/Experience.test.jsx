import { fireEvent, render, screen, within } from "@testing-library/react";
import Experience from "./Experience";
import { experiences } from "../../editable-stuff/config";

const resume = "/resume.pdf";
const picks = () => screen.getAllByRole("button").map((button) => [button.textContent, button.getAttribute("aria-pressed")]);

// Every card is on the page to hold the height; only the current one is shown.
const cards = (container) =>
  [...container.querySelectorAll(".panel")].map((card) => ({
    role: within(card).getByRole("heading", { level: 3 }).textContent,
    company: card.querySelector(".dates").textContent,
    summary: card.querySelector("p").textContent,
    achievements: [...card.querySelectorAll("li")].map((item) => item.textContent),
    resume: within(card).getByRole("link", { name: "Full list in the resume" }).getAttribute("href"),
  }));
const currentCards = (container) => [...container.querySelectorAll(".panel.current h3")].map((title) => title.parentElement.querySelector(".dates").textContent);

test("lists every company and keeps a card for each in the same stack", () => {
  const { container } = render(<Experience experiences={experiences} resume={resume} />);

  expect(picks()).toEqual(experiences.data.map((job, index) => [`${job.company}${job.dates}`, String(index === 0)]));
  expect(cards(container)).toEqual(
    experiences.data.map(({ role, company, summary, achievements }) => ({ role, company, summary, achievements, resume }))
  );
  expect(container.querySelector(".stack").children).toHaveLength(experiences.data.length);
});

test("shows the card of the picked company only", () => {
  const { container } = render(<Experience experiences={experiences} resume={resume} />);
  expect(currentCards(container)).toEqual([experiences.data[0].company]);

  fireEvent.click(screen.getByRole("button", { name: new RegExp(experiences.data[3].company) }));

  expect(currentCards(container)).toEqual([experiences.data[3].company]);
  expect(picks().map(([, pressed]) => pressed)).toEqual(experiences.data.map((_, index) => String(index === 3)));
});

test("a job without achievements has no empty list", () => {
  const data = [{ company: "Acme", logo: "acme.png", role: "Developer", dates: "2020", summary: "Summary", achievements: [] }];

  const { container } = render(<Experience experiences={{ heading: "Experience", data }} resume={resume} />);

  expect(container.querySelector(".panel ul")).toBeNull();
});
