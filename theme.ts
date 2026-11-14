import {loadFont} from "@remotion/google-fonts/Baloo2";

const {fontFamily} = loadFont("normal", {
  weights: ["600", "800"],
  subsets: ["latin"],
});

export const FONT = `${fontFamily}, "Segoe UI", Arial, sans-serif`;

/** Warna garis tepi seluruh karakter (cokelat tua, tebal & rapi). */
export const OUT = "#3a2318";

export const C = {
  skin: "#fcd5b0",
  skinShade: "#f0b78f",
  hijab: "#c8bfb5",
  hijabShade: "#a89f94",
  scarf: "#e9a53f",
  scarfShade: "#c98a2b",
  dress: "#a9c9dc",
  dressShade: "#8db0c8",
  rose: "#f1a49c",
  roseDark: "#d9847f",
  leaf: "#a69a58",
  shoe: "#4a3224",
  cream: "#fff4e0",
  ink: "#2b2118",
  gold: "#ffd04d",
  red: "#e5484d",
  green: "#2fa36b",
  navy: "#1d3557",
};

export const TOPIC = {
  riba: {name: "RIBA", c1: "#dff4f1", c2: "#8fd0c9", accent: "#1f8a8a", dark: "#0f5557"},
  maysir: {name: "MAYSIR", c1: "#f1e7fc", c2: "#c3a5ee", accent: "#7a3fc7", dark: "#43207a"},
  risywah: {name: "RISYWAH", c1: "#fde9d6", c2: "#f5b987", accent: "#d2691e", dark: "#7a3a0c"},
} as const;

export type TopicTheme = (typeof TOPIC)[keyof typeof TOPIC];
