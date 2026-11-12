import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..", "..");
const SITE = "https://skuill.com/portfolio/";
const read = (path) => new DOMParser().parseFromString(readFileSync(join(ROOT, path), "utf8"), "text/html");
const trips = readdirSync(join(ROOT, "bikepacking"), { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name);
const head = (page) => ({
  title: page.title,
  canonical: page.querySelector('link[rel="canonical"]')?.getAttribute("href"),
  url: page.querySelector('meta[property="og:url"]')?.getAttribute("content"),
  description: Boolean(page.querySelector('meta[name="description"]')?.getAttribute("content")),
  analytics: Boolean(page.querySelector('script[src*="googletagmanager.com/gtag/js"]')),
  trip: page.getElementById("root")?.dataset.trip,
  entry: page.querySelector('script[type="module"]')?.getAttribute("src"),
});

test("the list of trips has its own address, description and analytics", () => {
  expect(head(read("bikepacking/index.html"))).toEqual({
    title: "Bikepacking · Vitaly Kvashin",
    canonical: `${SITE}bikepacking/`,
    url: `${SITE}bikepacking/`,
    description: true,
    analytics: true,
    trip: "",
    entry: "/src/bikepacking/main.jsx",
  });
});

test.each(trips)("the page of %s names its trip and its own address", (slug) => {
  const data = JSON.parse(readFileSync(join(ROOT, "src", "trips", slug, "trip.json"), "utf8"));

  expect(head(read(`bikepacking/${slug}/index.html`))).toEqual({
    title: `${data.title} · Bikepacking · Vitaly Kvashin`,
    canonical: `${SITE}bikepacking/${slug}/`,
    url: `${SITE}bikepacking/${slug}/`,
    description: true,
    analytics: true,
    trip: slug,
    entry: "/src/bikepacking/main.jsx",
  });
});
