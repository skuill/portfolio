import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { preloadFonts } from "./scripts/preloadFonts.js";

export default defineConfig({
  // Both hosts serve the site under /portfolio/: GitHub Pages (skuill.github.io/portfolio) and nginx in Docker.
  base: "/portfolio/",
  plugins: [react(), preloadFonts(["big-shoulders-display-latin-700-normal", "golos-text-latin-400-normal"])],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.js",
  },
});
