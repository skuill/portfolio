import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { installIntersectionObserver } from "./testing/intersectionObserver";
import { mainBody, about, experiences, projects, skills, interests, getInTouch } from "./editable-stuff/config";

const API = "https://api.github.com";
const repoUrls = projects.github.repos.map(({ name }) => `${API}/repos/${projects.github.username}/${name}`);

let viewport;
beforeEach(() => {
  viewport = installIntersectionObserver();
  // Test doubles for the page's external clients: the GitHub API (fetch) and Google Analytics (gtag).
  globalThis.fetch = vi.fn(async () => ({ ok: true, status: 200, json: async () => ({ stargazers_count: 3 }) }));
  window.gtag = vi.fn();
});

test("renders the name and every enabled section in order", () => {
  render(<App />);

  expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(`${mainBody.firstName} ${mainBody.lastName}`);
  expect(screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent)).toEqual([
    about.heading,
    experiences.heading,
    projects.heading,
    skills.heading,
    interests.heading,
    getInTouch.heading,
  ]);
});

test("every section starts hidden and appears when the reader reaches it", () => {
  const { container } = render(<App />);
  const contents = () => [...container.querySelectorAll(".wrap")];
  expect(contents().filter((content) => content.classList.contains("in"))).toEqual([]);

  viewport.scrollThroughPage();

  expect(contents().filter((content) => !content.classList.contains("in"))).toEqual([]);
});

test("loads the stars of the shown repositories from GitHub once the reader scrolls, nothing else", async () => {
  render(<App />);
  expect(globalThis.fetch).not.toHaveBeenCalled();

  viewport.scrollThroughPage();
  await screen.findAllByText(/★ 3/);

  expect(globalThis.fetch.mock.calls.map(([url]) => url).sort()).toEqual([...repoUrls].sort());
});

test("reports a resume click to Google Analytics", () => {
  render(<App />);

  fireEvent.click(screen.getByRole("button", { name: "Resume/CV" }));

  expect(window.gtag.mock.calls).toEqual([["event", "Click", { event_category: "Resume", event_label: "Resume Download" }]]);
});
