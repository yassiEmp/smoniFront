import { ViteReactSSG } from "vite-react-ssg";
import { routes } from "./routes";
import { installAuthInterceptor } from "@api/axiosClient";

// Self-host Outfit + Inter without letting Vite preload every (weight, subset,
// format) permutation. FR-locale only — latin subset, woff2-only (no woff
// fallback). We import the woff2 files via `?url` so Vite emits hashed assets
// but does NOT scan a CSS file for url() references — that's what was producing
// 107 preload tags before. Inter weights: 400, 500, 600, 700, 800, 900 (no
// font-light/thin/extralight referenced in src). Outfit: 700, 900.
import interLatin400 from "@fontsource/inter/files/inter-latin-400-normal.woff2?url";
import interLatin500 from "@fontsource/inter/files/inter-latin-500-normal.woff2?url";
import interLatin600 from "@fontsource/inter/files/inter-latin-600-normal.woff2?url";
import interLatin700 from "@fontsource/inter/files/inter-latin-700-normal.woff2?url";
import interLatin800 from "@fontsource/inter/files/inter-latin-800-normal.woff2?url";
import interLatin900 from "@fontsource/inter/files/inter-latin-900-normal.woff2?url";
import outfitLatin700 from "@fontsource/outfit/files/outfit-latin-700-normal.woff2?url";
import outfitLatin900 from "@fontsource/outfit/files/outfit-latin-900-normal.woff2?url";

import "./index.css";
import "@components/generales/HomeStepSection.css";
import "@components/generales/HomeLocationSection.css";

const fontFaceCSS = `
@font-face{font-family:'Inter';font-style:normal;font-display:swap;font-weight:400;src:url(${interLatin400}) format('woff2')}
@font-face{font-family:'Inter';font-style:normal;font-display:swap;font-weight:500;src:url(${interLatin500}) format('woff2')}
@font-face{font-family:'Inter';font-style:normal;font-display:swap;font-weight:600;src:url(${interLatin600}) format('woff2')}
@font-face{font-family:'Inter';font-style:normal;font-display:swap;font-weight:700;src:url(${interLatin700}) format('woff2')}
@font-face{font-family:'Inter';font-style:normal;font-display:swap;font-weight:800;src:url(${interLatin800}) format('woff2')}
@font-face{font-family:'Inter';font-style:normal;font-display:swap;font-weight:900;src:url(${interLatin900}) format('woff2')}
@font-face{font-family:'Outfit';font-style:normal;font-display:swap;font-weight:700;src:url(${outfitLatin700}) format('woff2')}
@font-face{font-family:'Outfit';font-style:normal;font-display:swap;font-weight:900;src:url(${outfitLatin900}) format('woff2')}
`;

if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.setAttribute("data-fonts", "self-hosted");
  style.textContent = fontFaceCSS;
  document.head.appendChild(style);
}

export const createRoot = ViteReactSSG(
  {
    routes,
    basename: import.meta.env.BASE_URL,
  },
  ({ isClient }) => {
    if (isClient) {
      installAuthInterceptor();
    }
  },
);
