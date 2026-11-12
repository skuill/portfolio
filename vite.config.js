import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { preloadFonts } from "./scripts/preloadFonts.js";
import { readdirSync } from "node:fs";

// Every page of the site: the main page, the list of trips and one page per trip (written by scripts/import_trips.py).
// The main page's key names its files (index-*.js, index-*.css), which scripts/check-container.sh looks for.
const pages = () => ({
  index: "index.html",
  bikepacking: "bikepacking/index.html",
  ...Object.fromEntries(
    readdirSync("bikepacking", { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => [`trip-${entry.name}`, `bikepacking/${entry.name}/index.html`])
  ),
});

export default defineConfig({
  // Both hosts serve the site under /portfolio/: GitHub Pages (skuill.github.io/portfolio) and nginx in Docker.
  base: "/portfolio/",
  build: { rolldownOptions: { input: pages() } },
  plugins: [react(), preloadFonts(["big-shoulders-display-latin-700-normal", "golos-text-latin-400-normal"])],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.js",
  },
});
