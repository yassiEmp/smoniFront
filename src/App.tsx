import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { HelmetProvider } from "react-helmet-async";
import store, { persistor } from "./store/configureStore";
import CustomToast from "@components/generales/CustomToast";

const isServer = typeof window === "undefined";

// PersistGate renders nothing until rehydration completes, which never fires
// during SSR. Render children directly on the server; gate normally on the
// client so localStorage state is restored before the first paint.
const MaybePersistGate = ({ children }: { children: ReactNode }) =>
  isServer ? (
    <>{children}</>
  ) : (
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  );

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

  return (
    <HelmetProvider>
      <Provider store={store}>
        <MaybePersistGate>
          <CustomToast />
          <Outlet />
        </MaybePersistGate>
      </Provider>
    </HelmetProvider>
  );
}

export default App;
