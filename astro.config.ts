import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import { FontaineTransform } from "fontaine";

export default defineConfig({
  site: "https://alliejon.es",
  integrations: [preact(), mdx(), tailwind()],
  legacy: {
    collections: true,
  },
  redirects: {
    "/atom.xml": "/feed.xml",
  },
  vite: {
    plugins: [
      FontaineTransform.vite({
        fallbacks: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Arial",
          "Noto Sans",
        ],
        resolvePath: (id) => new URL(`./public${id}`, import.meta.url),
      }),
    ],
  },
});
