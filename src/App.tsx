import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Provider } from "react-redux";
import store from "./store/configureStore";
import CustomToast from "@components/generales/CustomToast";

function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace('#', '');
      const timeoutId = window.setTimeout(() => {
        const el = document.getElementById(elementId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 0);
      return () => window.clearTimeout(timeoutId);
    }
  }, [location]);

  // No <HelmetProvider> wrapper here — vite-react-ssg owns the HelmetProvider
  // around the route tree during SSR (via its own <Head> component) so that
  // emitted tags are injected into <head> of the prerendered HTML. Wrapping
  // again here would create a second, app-local context whose state never
  // reaches the SSR template.
  return (
    <Provider store={store}>
      <CustomToast />
      <Outlet />
    </Provider>
  );
}

export default App;
