import { ViteReactSSG } from "vite-react-ssg";
import { routes } from "./routes";
import { installAuthInterceptor } from "@api/axiosClient";

// Self-hosted Outfit + Inter (FR-locale, latin subset, woff2-only). @font-face
// declarations live in styles/fonts.css so they ship with the main CSS bundle
// and are parsed at first CSS parse — that lets the browser fetch fonts before
// JS executes (the prior runtime-injected approach delayed the fetch until
// after hydration and produced the visible swap shift on the hero).
// Font files are served from /public/fonts so URLs are stable and preloadable
// from index.html.
import "./index.css";
import "./styles/fonts.css";
import "@components/generales/HomeStepSection.css";
import "@components/generales/HomeLocationSection.css";

// Hydration-stack recovery. When the user spam-refreshes during initial load,
// lazy route/component chunks (HomeCertificationLabel, responsive-picture…)
// can be aborted mid-fetch. On the *next* reload, React 19's hydration
// recovery appends a fresh client render to #root as a SIBLING of the SSG
// content instead of replacing it — visible as the whole page rendering
// twice top-to-bottom. We detect that state (two <header> children inside
// #root) and trigger a single hard reload; cached chunks resolve on the
// retry so the second load lands clean. sessionStorage flag prevents an
// infinite reload loop if recovery somehow keeps failing.
if (typeof window !== "undefined") {
  const RECOVERY_KEY = "__smoni_hydration_recovery__";
  const checkStacked = () => {
    const root = document.getElementById("root");
    if (!root) return;
    const headers = Array.from(root.children).filter((c) => c.tagName === "HEADER");
    if (headers.length > 1) {
      if (sessionStorage.getItem(RECOVERY_KEY)) return; // already retried once, give up
      sessionStorage.setItem(RECOVERY_KEY, "1");
      window.location.reload();
    } else {
      sessionStorage.removeItem(RECOVERY_KEY);
    }
  };
  window.addEventListener("load", () => setTimeout(checkStacked, 250));
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
