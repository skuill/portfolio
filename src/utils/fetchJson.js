// GET a JSON document with the browser's fetch; throws on HTTP errors so callers can fall back.
export const fetchJson = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`);
  return response.json();
};
