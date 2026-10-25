import { render, screen, waitFor, within } from "@testing-library/react";
import Project from "./Project";
import { installIntersectionObserver } from "../../testing/intersectionObserver";

const API = "https://api.github.com";
const username = "skuill";
const allReposUrl = `${API}/users/${username}/repos?sort=updated&direction=desc`;
const languagesUrl = (name) => `${API}/repos/${username}/${name}/languages`;

// A repository as the snapshot stores it and loadGithubProjects returns it.
const project = (name, stars) => ({
  name,
  description: `${name} description`,
  svn_url: `https://github.com/${username}/${name}`,
  stargazers_count: stars,
  pushed_at: "2026-10-01T10:00:00Z",
  languages: { "C#": 750, HTML: 250 },
});
const snapshot = [project("old-a", 1), project("old-b", 2)];
const live = [project("repo-a", 5), project("repo-b", 6)];
const github = { username, latest: 2, specific: [], repos: snapshot };
// The same repository as GitHub's list answers with it.
const githubRepo = ({ name, description, svn_url, stargazers_count, pushed_at }) => ({
  id: name,
  name,
  description,
  svn_url,
  stargazers_count,
  pushed_at,
  languages_url: languagesUrl(name),
});
const liveList = [...live, project("repo-c", 0)].map(githubRepo);

// What a reader sees on a card.
const expectedCard = ({ name, description, svn_url, stargazers_count }) => ({
  title: name,
  description,
  links: [
    ["Clone Project", `${svn_url}/archive/master.zip`],
    ["Repo", svn_url],
    ["C#: 75 %", `${svn_url}/search?l=C#`],
    ["HTML: 25 %", `${svn_url}/search?l=HTML`],
    [`Stars ${stargazers_count}`, `${svn_url}/stargazers`],
  ],
  updated: "Updated on October 1, 2026",
});
const renderedCards = () =>
  screen.getAllByRole("heading", { level: 5 }).map((title) => {
    const card = title.closest(".card");
    return {
      title: title.textContent,
      description: card.querySelector(".card-text").textContent,
      links: within(card)
        .getAllByRole("link")
        .map((link) => [link.textContent.trim(), link.getAttribute("href")]),
      updated: within(card).getByText(/^Updated/).textContent,
    };
  });
const requestedUrls = () => global.fetch.mock.calls.map(([url]) => url).sort();

// Test double for the GitHub API: answers with `responses[url]`, a 403 for anything else.
const githubAnswers = (responses) => {
  global.fetch = jest.fn(async (url) =>
    url in responses
      ? { ok: true, status: 200, json: async () => responses[url] }
      : { ok: false, status: 403, statusText: "Forbidden", json: async () => ({}) }
  );
};

let viewport;
beforeEach(() => {
  viewport = installIntersectionObserver();
  jest.spyOn(console, "error").mockImplementation(() => {});
});
afterEach(() => jest.restoreAllMocks());

const renderProjects = () =>
  render(<Project heading="Recent Projects" github={github} projects={{ websites: [] }} />);

test("shows the snapshot at once and asks GitHub nothing until the reader scrolls near the projects", () => {
  githubAnswers({});

  renderProjects();

  expect(renderedCards()).toEqual(snapshot.map(expectedCard));
  expect(global.fetch).not.toHaveBeenCalled();
});

test("replaces the snapshot with live GitHub data once the reader scrolls near the projects", async () => {
  githubAnswers({
    [allReposUrl]: liveList,
    ...Object.fromEntries(live.map(({ name, languages }) => [languagesUrl(name), languages])),
  });
  renderProjects();

  viewport.scrollThroughPage();
  await screen.findByText("repo-a");

  expect(renderedCards()).toEqual(live.map(expectedCard));
  expect(requestedUrls()).toEqual([allReposUrl, ...live.map(({ name }) => languagesUrl(name))].sort());
  expect(console.error).not.toHaveBeenCalled();
});

test("keeps the snapshot when GitHub refuses the list", async () => {
  githubAnswers({});
  renderProjects();

  viewport.scrollThroughPage();
  await waitFor(() => expect(console.error).toHaveBeenCalled());

  expect(renderedCards()).toEqual(snapshot.map(expectedCard));
  expect(console.error.mock.calls).toEqual([[`403 Forbidden: ${allReposUrl}`]]);
});

test("keeps the snapshot when the languages of one repository do not load", async () => {
  githubAnswers({ [allReposUrl]: liveList, [languagesUrl("repo-a")]: live[0].languages });
  renderProjects();

  viewport.scrollThroughPage();
  await waitFor(() => expect(console.error).toHaveBeenCalled());

  expect(renderedCards()).toEqual(snapshot.map(expectedCard));
  expect(console.error.mock.calls).toEqual([[`403 Forbidden: ${languagesUrl("repo-b")}`]]);
});
