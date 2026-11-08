import { preloadFonts } from "./preloadFonts.js";

const plugin = () => {
  const created = preloadFonts(["display-700", "text-400"]);
  created.configResolved({ base: "/portfolio/" });
  return created;
};
const bundle = {
  "assets/display-700-abc.woff2": {},
  "assets/display-700-abc.woff": {},
  "assets/text-400-def.woff2": {},
  "assets/text-500-ghi.woff2": {},
  "assets/index-jkl.js": {},
};
const link = (file) => ({
  tag: "link",
  attrs: { rel: "preload", as: "font", type: "font/woff2", href: `/portfolio/${file}`, crossorigin: "" },
  injectTo: "head-prepend",
});

test("adds a preload link under the site's base path for the named woff2 fonts only", () => {
  expect(plugin().transformIndexHtml.handler("", { bundle })).toEqual([link("assets/display-700-abc.woff2"), link("assets/text-400-def.woff2")]);
});

test("adds nothing on the dev server, where there is no bundle", () => {
  expect(plugin().transformIndexHtml.handler("", {})).toEqual([]);
});
