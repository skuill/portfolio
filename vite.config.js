import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Both hosts serve the site under /portfolio/: GitHub Pages (skuill.github.io/portfolio) and nginx in Docker.
  base: "/portfolio/",
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.js",
  },
});
