import { loadGithubProjects } from "./githubProjects.mjs";

const API = "https://api.github.com";
const username = "skuill";
const allReposUrl = `${API}/users/${username}/repos?sort=updated&direction=desc`;
// A repository as GitHub answers with it (trimmed: the real one has dozens of fields).
const githubRepo = (name) => ({
  id: name,
  name,
  full_name: `${username}/${name}`,
  description: `${name} description`,
  svn_url: `https://github.com/${username}/${name}`,
  stargazers_count: 3,
  pushed_at: "2026-10-01T10:00:00Z",
  languages_url: `${API}/repos/${username}/${name}/languages`,
  fork: false,
});
const project = (name) => ({
  name,
  description: `${name} description`,
  svn_url: `https://github.com/${username}/${name}`,
  stargazers_count: 3,
  pushed_at: "2026-10-01T10:00:00Z",
  languages: { "C#": 1000, [name]: 1 },
});

// Test double for the GitHub API: answers with `responses[url]`, a 403 for anything else.
const githubAnswers = (responses) => {
  global.fetch = jest.fn(async (url) =>
    url in responses
      ? { ok: true, status: 200, json: async () => responses[url] }
      : { ok: false, status: 403, statusText: "Forbidden", json: async () => ({}) }
  );
};
const languagesOf = (...names) =>
  Object.fromEntries(names.map((name) => [githubRepo(name).languages_url, { "C#": 1000, [name]: 1 }]));
const requestedUrls = () => global.fetch.mock.calls.map(([url]) => url).sort();

test("returns the latest repositories and the specific ones with their languages and only the fields the cards show", async () => {
  githubAnswers({
    [allReposUrl]: ["repo-a", "repo-b", "repo-c"].map(githubRepo),
    [`${API}/repos/${username}/old-one`]: githubRepo("old-one"),
    ...languagesOf("repo-a", "repo-b", "old-one"),
  });

  const projects = await loadGithubProjects({ username, latest: 2, specific: ["old-one", "repo-a"] });

  expect(projects).toEqual(["repo-a", "repo-b", "old-one"].map(project));
  expect(requestedUrls()).toEqual(
    [allReposUrl, `${API}/repos/${username}/old-one`, ...Object.keys(languagesOf("repo-a", "repo-b", "old-one"))].sort()
  );
});

test("fails when GitHub refuses any request", async () => {
  githubAnswers({ [allReposUrl]: ["repo-a", "repo-b"].map(githubRepo), ...languagesOf("repo-a") });

  await expect(loadGithubProjects({ username, latest: 2, specific: [] })).rejects.toThrow(
    new Error(`403 Forbidden: ${githubRepo("repo-b").languages_url}`)
  );
});
