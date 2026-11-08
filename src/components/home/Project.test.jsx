import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import Project from "./Project";
import { installIntersectionObserver } from "../../testing/intersectionObserver";

const API = "https://api.github.com";
const username = "skuill";
const repoUrl = (name) => `${API}/repos/${username}/${name}`;

const site = {
  name: "site.com",
  hook: "A site",
  text: "About the site",
  stack: "React",
  url: "https://site.com/",
  links: [],
  preview: { image: "site.webp", alt: "The site" },
};
const library = {
  name: "Library",
  repo: "Library",
  hook: "A library",
  text: "About the library",
  stat: "100+ downloads",
  stack: "C#",
  url: "https://github.com/skuill/Library",
  links: [{ label: "NuGet", url: "https://nuget.org/library" }],
  preview: { code: "var x = 1;" },
};
const bot = {
  name: "Bot",
  repo: "Bot",
  urlLabel: "@bot",
  hook: "A bot",
  text: "About the bot",
  stack: ".NET",
  url: "https://t.me/bot",
  links: [{ label: "GitHub", url: "https://github.com/skuill/Bot" }],
  preview: { chat: { ask: "Band", reply: "What?", options: ["Lyrics", "Tracks"] } },
};
const items = [site, library, bot];
const families = { tools: { title: "The tools", text: "About the tools" } };
const github = {
  username,
  repos: [
    { name: "Library", stargazers_count: 1 },
    { name: "Bot", stargazers_count: 2 },
  ],
};

const githubAnswers = (responses) => {
  globalThis.fetch = vi.fn(async (url) =>
    url in responses
      ? { ok: true, status: 200, json: async () => responses[url] }
      : { ok: false, status: 403, statusText: "Forbidden", json: async () => ({}) }
  );
};

let viewport;
beforeEach(() => {
  viewport = installIntersectionObserver();
  vi.spyOn(console, "error").mockImplementation(() => {});
});
afterEach(() => vi.restoreAllMocks());

const renderProjects = (shown = items) => render(<Project heading="Recent projects" github={github} items={shown} families={families} />);
const picks = () => screen.getAllByRole("button").map((button) => ({ text: button.textContent, pressed: button.getAttribute("aria-pressed") }));
const stats = (container) => [...container.querySelectorAll(".pick")].map((pick) => pick.querySelector("em")?.textContent);
const metas = (container) =>
  [...container.querySelectorAll(".show-meta > div")].map((meta) => ({
    current: meta.classList.contains("current"),
    title: within(meta).getByRole("heading", { level: 3 }).textContent,
    stack: meta.querySelector(".tech").textContent,
    links: within(meta).getAllByRole("link").map((link) => [link.textContent, link.getAttribute("href")]),
  }));

test("shows the picks, the snapshot stars and asks GitHub nothing until the reader scrolls near", () => {
  githubAnswers({});

  const { container } = renderProjects();

  expect(picks()).toEqual([
    { text: "A siteAbout the site", pressed: "true" },
    { text: "A libraryAbout the library100+ downloads · ★ 1", pressed: "false" },
    { text: "A botAbout the bot★ 2", pressed: "false" },
  ]);
  expect(stats(container)).toEqual([undefined, "100+ downloads · ★ 1", "★ 2"]);
  expect(globalThis.fetch).not.toHaveBeenCalled();
});

test("every project's title is the link to it, with its other links beside", () => {
  githubAnswers({});

  const { container } = renderProjects();

  expect(metas(container)).toEqual([
    { current: true, title: "site.com", stack: "React", links: [["site.com", "https://site.com/"]] },
    { current: false, title: "Library", stack: "C#", links: [["Library", "https://github.com/skuill/Library"], ["NuGet", "https://nuget.org/library"]] },
    { current: false, title: "@bot", stack: ".NET", links: [["@bot", "https://t.me/bot"], ["GitHub", "https://github.com/skuill/Bot"]] },
  ]);
});

test("picking a project shows its own preview and details", () => {
  githubAnswers({});
  const { container } = renderProjects();
  const stage = () => container.querySelector(".stage-box");
  const currentTitles = () => metas(container).filter(({ current }) => current).map(({ title }) => title);

  expect(within(stage()).getByRole("img")).toHaveAttribute("alt", "The site");
  expect(currentTitles()).toEqual(["site.com"]);

  fireEvent.click(screen.getByRole("button", { name: /A library/ }));
  expect(stage().querySelector("pre")).toHaveTextContent("var x = 1;");
  expect(currentTitles()).toEqual(["Library"]);

  fireEvent.click(screen.getByRole("button", { name: /A bot/ }));
  expect(stage().textContent).toBe("BandWhat?LyricsTracks");
  expect(currentTitles()).toEqual(["@bot"]);
});

test("neighbouring projects of one family share a title and each stays selectable", () => {
  githubAnswers({});
  const shown = [site, { ...library, family: "tools" }, { ...bot, family: "tools" }];
  const { container } = renderProjects(shown);

  const family = container.querySelector(".pick-family");
  expect(container.querySelectorAll(".pick-family")).toHaveLength(1);
  expect([family.querySelector(":scope > b").textContent, family.querySelector(":scope > span").textContent]).toEqual(["The tools", "About the tools"]);
  expect(within(family).getAllByRole("button").map((button) => button.querySelector("b").textContent)).toEqual(["A library", "A bot"]);
  expect(container.querySelector(".picks > .pick b").textContent).toBe("A site");

  fireEvent.click(within(family).getByRole("button", { name: /A bot/ }));

  expect(container.querySelector(".stage-box").textContent).toBe("BandWhat?LyricsTracks");
  expect(within(family).getAllByRole("button").map((button) => button.getAttribute("aria-pressed"))).toEqual(["false", "true"]);
});

test("replaces the snapshot stars with live ones once the reader scrolls near", async () => {
  githubAnswers({
    [repoUrl("Library")]: { name: "Library", stargazers_count: 50 },
    [repoUrl("Bot")]: { name: "Bot", stargazers_count: 60 },
  });
  const { container } = renderProjects();

  viewport.scrollThroughPage();

  await waitFor(() => expect(stats(container)).toEqual([undefined, "100+ downloads · ★ 50", "★ 60"]));
  expect(globalThis.fetch.mock.calls.map(([url]) => url).sort()).toEqual([repoUrl("Bot"), repoUrl("Library")]);
  expect(console.error).not.toHaveBeenCalled();
});

test("keeps the snapshot stars when GitHub refuses", async () => {
  githubAnswers({ [repoUrl("Library")]: { name: "Library", stargazers_count: 50 } });
  const { container } = renderProjects();

  viewport.scrollThroughPage();
  await waitFor(() => expect(console.error).toHaveBeenCalled());

  expect(stats(container)).toEqual([undefined, "100+ downloads · ★ 1", "★ 2"]);
  expect(console.error.mock.calls).toEqual([[`403 Forbidden: ${repoUrl("Bot")}`]]);
});
