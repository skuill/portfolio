// Vite plugin: lets the browser fetch the fonts of the first screen together with the page. Without it they are
// requested only after the whole script has run, and the first screen shows in a fallback font until they arrive.
export const preloadFonts = (names) => {
  let base = "/";
  return {
    name: "preload-fonts",
    configResolved(config) {
      base = config.base;
    },
    transformIndexHtml: {
      order: "post",
      handler: (html, { bundle }) =>
        Object.keys(bundle ?? {})
          .filter((file) => file.endsWith(".woff2") && names.some((name) => file.includes(name)))
          .map((file) => ({
            tag: "link",
            attrs: { rel: "preload", as: "font", type: "font/woff2", href: `${base}${file}`, crossorigin: "" },
            injectTo: "head-prepend",
          })),
    },
  };
};
