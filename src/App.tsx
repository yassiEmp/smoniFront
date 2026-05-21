import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { HelmetProvider } from "react-helmet-async";
import store, { persistor } from "./store/configureStore";
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

  return (
    <HelmetProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <CustomToast />
          <Outlet />
        </PersistGate>
      </Provider>
    </HelmetProvider>
  );
}

export default App;
