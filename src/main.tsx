import { ViteReactSSG } from "vite-react-ssg";
import { routes } from "./routes";
import { installAuthInterceptor } from "@api/axiosClient";
// Self-host Outfit + Inter (drops the Google Fonts request, kills layout shift
// from font-swap and removes a third-party preconnect). Outfit is only used in
// 700/900; Inter spans 300–900 across body, blog, headers.
import "@fontsource/outfit/700.css";
import "@fontsource/outfit/900.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";
import "./index.css";

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
