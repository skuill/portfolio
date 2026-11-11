// Star counts of the repositories in the Projects section: the page loads them live, scripts/github-projects.js saves a snapshot.
const API = "https://api.github.com";

// GET a JSON document with fetch; throws on HTTP errors so callers can fall back.
const fetchJson = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`);
  return response.json();
};

// One request per repository. Throws if any fails, so the caller keeps what it already has.
export const loadGithubProjects = ({ username, repos }) =>
  Promise.all(
    repos.map(async ({ name }) => {
      const { stargazers_count } = await fetchJson(`${API}/repos/${username}/${name}`);
      return { name, stargazers_count };
    })
  );
