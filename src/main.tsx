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
