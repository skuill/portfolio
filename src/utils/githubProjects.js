// GitHub projects for the Projects section: the page loads them live, scripts/github-projects.js saves a snapshot.
const API = "https://api.github.com";

// GET a JSON document with fetch; throws on HTTP errors so callers can fall back.
const fetchJson = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`);
  return response.json();
};

// The `latest` recently updated repositories plus the `specific` ones, with their languages (bytes per language)
// and only the fields the cards show. Throws if any request fails, so the caller keeps what it already has.
export const loadGithubProjects = async ({ username, latest, specific }) => {
  const recent = (await fetchJson(`${API}/users/${username}/repos?sort=updated&direction=desc`)).slice(0, latest);
  const extra = specific.filter((name) => !recent.some((repo) => repo.name === name));
  const repos = [...recent, ...(await Promise.all(extra.map((name) => fetchJson(`${API}/repos/${username}/${name}`))))];
  return Promise.all(
    repos.map(async ({ name, description, svn_url, stargazers_count, pushed_at, languages_url }) => ({
      name,
      description,
      svn_url,
      stargazers_count,
      pushed_at,
      languages: await fetchJson(languages_url),
    }))
  );
};
