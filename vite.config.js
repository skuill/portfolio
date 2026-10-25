import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Both hosts serve the site under /portfolio/: GitHub Pages (skuill.github.io/portfolio) and nginx in Docker.
  base: "/portfolio/",
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // Bootstrap 5.3 shares its variables only through @import (the module system arrives in Bootstrap 6),
        // so its own deprecation warnings are hidden and @import stays allowed in our stylesheets.
        quietDeps: true,
        silenceDeprecations: ["import"],
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.js",
  },
});
