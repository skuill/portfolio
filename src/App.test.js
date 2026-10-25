import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { installIntersectionObserver } from "./testing/intersectionObserver";
import {
  mainBody,
  about,
  experiences,
  repos,
  skills,
  interests,
  getInTouch,
} from "./editable-stuff/config";

const API = "https://api.github.com";
const allReposUrl = `${API}/users/${repos.github.username}/repos?sort=updated&direction=desc`;
const repo = (name) => ({
  id: name,
  name,
  description: `${name} description`,
  svn_url: `https://github.com/${repos.github.username}/${name}`,
  stargazers_count: 3,
  languages_url: `${API}/repos/${repos.github.username}/${name}/languages`,
  pushed_at: "2026-10-01T10:00:00Z",
});
const githubRepos = ["repo-a", "repo-b", "repo-c", "repo-d", "repo-e"].map(repo);
const shownRepos = githubRepos.slice(0, repos.github.latest);

// Test doubles for the page's external clients: the GitHub API (fetch) and Google Analytics (gtag).
const jsonResponse = (body) => ({ ok: true, status: 200, json: async () => body });
let viewport;
beforeEach(() => {
  viewport = installIntersectionObserver();
  global.fetch = jest.fn(async (url) => {
    if (url === allReposUrl) return jsonResponse(githubRepos);
    if (url.endsWith("/languages")) return jsonResponse({ "C#": 1000 });
    throw new Error(`Unexpected request: ${url}`);
  });
  window.gtag = jest.fn();
  // jsdom has no ResizeObserver; the navbar only uses it to switch its background on scroll.
  window.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

const waitForRepos = async () => {
  for (const { name } of shownRepos) {
    await screen.findByText(name);
  }
};
const renderPage = async () => {
  render(<App />);
  viewport.scrollThroughPage();
  await waitForRepos();
};

test("renders the name and every enabled section in order", async () => {
  await renderPage();

  expect(screen.getByRole("heading", { level: 1 }).textContent.replace(/\s+/g, " ").trim()).toBe(
    `${mainBody.firstName} ${mainBody.middleName} ${mainBody.lastName}`.replace(/\s+/g, " ").trim()
  );
  expect(screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent)).toEqual([
    about.heading,
    experiences.heading,
    repos.heading,
    skills.heading,
    interests.heading,
    getInTouch.heading,
  ]);
});

test("loads the latest repositories and their languages from GitHub once the reader scrolls, nothing else", async () => {
  render(<App />);
  expect(global.fetch).not.toHaveBeenCalled();

  viewport.scrollThroughPage();
  await waitForRepos();

  expect(global.fetch.mock.calls.map(([url]) => url).sort()).toEqual(
    [allReposUrl, ...shownRepos.map((r) => r.languages_url)].sort()
  );
});

test("reports a resume click to Google Analytics", async () => {
  await renderPage();

  fireEvent.click(screen.getByRole("button", { name: "Resume/CV" }));

  expect(window.gtag.mock.calls).toEqual([
    ["event", "Click", { event_category: "Resume", event_label: "Resume Download" }],
  ]);
});
