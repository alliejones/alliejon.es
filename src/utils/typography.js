import Typography from "typography";
import CodePlugin from "typography-plugin-code";

const typography = new Typography({
  baseFontSize: "18px",
  baseLineHeight: 1.666,
  headerFontFamily: ["Arvo", "serif"],
  bodyFontFamily: ["PT Sans", "sans-serif"],
  googleFonts: [
    {
      name: "PT Sans",
      styles: ["400", "400i", "700"],
    },
    {
      name: "PT Mono",
      styles: ["400"],
    },
    {
      name: "Arvo",
      styles: ["400b"],
    },
  ],
  plugins: [new CodePlugin()],
  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
    "tt,code": {
      fontFamily: '"PT Mono",Menlo,Courier,monospace',
    },
    "h1,h2,h3,h4,h5,h6": {
      color: "#08938E",
    },
    a: {
      color: "#22636B",
      fontWeight: "bold",
      textDecoration: "none",
    },
    "a:hover": {
      textDecoration: "underline",
    },
  }),
});
export default typography;
