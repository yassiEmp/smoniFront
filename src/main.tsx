import { ViteReactSSG } from "vite-react-ssg";
import { routes } from "./routes";
import { installAuthInterceptor } from "@api/axiosClient";
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
