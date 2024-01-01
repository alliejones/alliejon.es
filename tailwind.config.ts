import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import TypographyPlugin from "@tailwindcss/typography";

const hexToRgb = (hex: string) => {
  hex = hex.replace("#", "");
  hex = hex.length === 3 ? hex.replace(/./g, "$&$&") : hex;
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `${r} ${g} ${b}`;
};

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: {
          white: "#faf9fa",
          50: "#E0E0FF",
          100: "#dcdcf9",
          200: "#c4c3e0",
          300: "#acaac8",
          400: "#9692b0",
          500: "#7f7a98",
          600: "#6a6481",
          700: "#554e6b",
          800: "#413956",
          900: "#2e2541",
          950: "#150F1F",
        },
      },
      fontFamily: {
        sans: ["Inter", `"Inter fallback"`, ...defaultTheme.fontFamily.sans],
      },
      typography: (theme: (key: string) => string) => ({
        DEFAULT: {
          css: {
            fontSize: "1.1rem",
            "--tw-prose-body": theme("colors.ink.950"),
            "--tw-prose-headings": theme("colors.ink.800"),
            "--tw-prose-lead": theme("colors.ink.700"),
            "--tw-prose-links": theme("colors.ink.800"),
            "--tw-prose-bold": theme("colors.ink.950"),
            "--tw-prose-counters": theme("colors.ink.500"),
            "--tw-prose-bullets": theme("colors.ink.400"),
            "--tw-prose-hr": theme("colors.ink.100"),
            "--tw-prose-quotes": theme("colors.ink.700"),
            "--tw-prose-quote-borders": theme("colors.ink.100"),
            "--tw-prose-captions": theme("colors.ink.700"),
            "--tw-prose-kbd": theme("colors.ink.900"),
            "--tw-prose-kbd-shadows": hexToRgb(theme("colors.ink.900")),
            "--tw-prose-code": theme("colors.ink.300"),
            "--tw-prose-pre-code": theme("colors.ink.800"),
            "--tw-prose-pre-bg": theme("colors.ink.50"),
            "--tw-prose-th-borders": theme("colors.ink.200"),
            "--tw-prose-td-borders": theme("colors.ink.100"),
            "--tw-prose-invert-body": theme("colors.ink.50"),
            "--tw-prose-invert-headings": theme("colors.ink.200"),
            "--tw-prose-invert-lead": theme("colors.ink.200"),
            "--tw-prose-invert-links": theme("colors.ink.white"),
            "--tw-prose-invert-bold": theme("colors.ink.50"),
            "--tw-prose-invert-counters": theme("colors.ink.400"),
            "--tw-prose-invert-bullets": theme("colors.ink.500"),
            "--tw-prose-invert-hr": theme("colors.ink.900"),
            "--tw-prose-invert-quotes": theme("colors.ink.200"),
            "--tw-prose-invert-quote-borders": theme("colors.ink.900"),
            "--tw-prose-invert-captions": theme("colors.ink.300"),
            "--tw-prose-invert-kbd": theme("colors.ink.white"),
            "--tw-prose-invert-kbd-shadows": hexToRgb(
              theme("colors.ink.white")
            ),
            "--tw-prose-invert-code": theme("colors.ink.white"),
            "--tw-prose-invert-pre-code": theme("colors.ink.200"),
            "--tw-prose-invert-pre-bg": theme("colors.ink.900"),
            "--tw-prose-invert-th-borders": theme("colors.ink.500"),
            "--tw-prose-invert-td-borders": theme("colors.ink.700"),
          },
        },
      }),
    },
  },
  plugins: [TypographyPlugin],
} satisfies Config;
