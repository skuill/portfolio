import { readFileSync } from "node:fs";
import { join } from "node:path";
import { mainBody } from "./editable-stuff/config";

// The page head is static HTML: link preview crawlers and most search engine bots do not run the app's JavaScript.
const read = (path) => readFileSync(join(import.meta.dirname, "..", path));
const page = new DOMParser().parseFromString(read("index.html").toString(), "text/html");
const tags = Object.fromEntries(
  [...page.head.querySelectorAll("meta[name], meta[property]")].map((meta) => [
    meta.getAttribute("property") ?? meta.name,
    meta.content,
  ])
);

const SITE = "https://skuill.com/portfolio/";
const name = `${mainBody.firstName} ${mainBody.lastName}`;
const role = "Backend Developer (C# / .NET)";
const profile = (network) => mainBody.icons.find((icon) => icon.image === `fa-${network}`).url;

test("points search engines to skuill.com and gives link previews a title, a description and an absolute image", () => {
  expect({
    title: page.title,
    canonical: [...page.head.querySelectorAll('link[rel="canonical"]')].map((link) => link.getAttribute("href")),
    tags,
  }).toEqual({
    title: `${name} · ${role}`,
    canonical: [SITE],
    tags: {
      viewport: "width=device-width, initial-scale=1",
      "theme-color": "#000000",
      description: tags.description,
      "og:type": "website",
      "og:url": SITE,
      "og:title": `${name} · ${role}`,
      "og:description": tags.description,
      "og:image": `${SITE}social-image.png`,
      "og:image:width": "1200",
      "og:image:height": "630",
      "og:image:alt": `${name}, ${role}`,
      "twitter:card": "summary_large_image",
    },
  });
});

test("tells search engines who the page is about, with the profiles linked from the first screen", () => {
  const structuredData = [...page.head.querySelectorAll('script[type="application/ld+json"]')].map((script) =>
    JSON.parse(script.textContent)
  );

  expect(structuredData).toEqual([
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name,
      jobTitle: role,
      url: SITE,
      sameAs: [profile("github"), profile("linkedin")],
    },
  ]);
});

test("ships the preview image from public/ in the size the tags announce", () => {
  const png = read(`public/${new URL(tags["og:image"]).pathname.replace("/portfolio/", "")}`);

  // A PNG starts with an 8-byte signature and the IHDR chunk: length, type, then width and height (big-endian).
  expect({ chunk: png.toString("ascii", 12, 16), width: png.readUInt32BE(16), height: png.readUInt32BE(20) }).toEqual({
    chunk: "IHDR",
    width: Number(tags["og:image:width"]),
    height: Number(tags["og:image:height"]),
  });
});

test("lets every crawler in", () => {
  const rules = read("public/robots.txt")
    .toString()
    .split(/\r?\n/)
    .filter((line) => line && !line.startsWith("#"));

  expect(rules).toEqual(["User-agent: *", "Allow: /"]);
});
