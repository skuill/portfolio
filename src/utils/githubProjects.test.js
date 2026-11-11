import { loadGithubProjects } from "./githubProjects.js";

const API = "https://api.github.com";
const username = "skuill";
const repoUrl = (name) => `${API}/repos/${username}/${name}`;
// A repository as GitHub answers with it (trimmed: the real one has dozens of fields).
const githubRepo = (name, stargazers_count) => ({ id: name, name, full_name: `${username}/${name}`, stargazers_count, fork: false });

// Test double for the GitHub API: answers with `responses[url]`, a 403 for anything else.
const githubAnswers = (responses) => {
  globalThis.fetch = vi.fn(async (url) =>
    url in responses
      ? { ok: true, status: 200, json: async () => responses[url] }
      : { ok: false, status: 403, statusText: "Forbidden", json: async () => ({}) }
  );
};

const settings = { username, repos: [{ name: "repo-a", stargazers_count: 0 }, { name: "repo-b", stargazers_count: 0 }] };

test("returns only the name and the stars of each repository, one request each", async () => {
  githubAnswers({ [repoUrl("repo-a")]: githubRepo("repo-a", 5), [repoUrl("repo-b")]: githubRepo("repo-b", 7) });

  const projects = await loadGithubProjects(settings);

  expect(projects).toEqual([
    { name: "repo-a", stargazers_count: 5 },
    { name: "repo-b", stargazers_count: 7 },
  ]);
  expect(globalThis.fetch.mock.calls.map(([url]) => url).sort()).toEqual([repoUrl("repo-a"), repoUrl("repo-b")]);
});

test("fails when GitHub refuses any request", async () => {
  githubAnswers({ [repoUrl("repo-a")]: githubRepo("repo-a", 5) });

  await expect(loadGithubProjects(settings)).rejects.toThrow(new Error(`403 Forbidden: ${repoUrl("repo-b")}`));
});
