import axios from 'axios';
import { apiUrl } from '.';
import store from '@store/configureStore';
import { logout } from '@store/slices/authSlice';

// Global axios defaults for cookie-based Sanctum SPA auth:
//   - withCredentials: send the laravel_session + XSRF-TOKEN cookies
//   - withXSRFToken: read XSRF-TOKEN cookie and mirror it into the
//     X-XSRF-TOKEN header on state-changing requests
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const SANCTUM_BASE = apiUrl.replace(/\/api\/?$/, '');

/**
 * Must be called once before the first authenticated request (typically
 * right before /login). Sanctum sets the XSRF-TOKEN cookie that Laravel
 * then validates on subsequent state-changing requests.
 */
export async function ensureCsrfCookie(): Promise<void> {
  await axios.get(`${SANCTUM_BASE}/sanctum/csrf-cookie`);
}

// Single response interceptor for session expiry. When the server says
// 401, the cookie session is gone â€” clear local user state and kick the
// user back to the login page. Mirrors the old authMiddleware's 24h
// auto-logout, but driven by the server instead of a client-side timer.
let installed = false;
export function installAuthInterceptor(): void {
  if (installed) return;
  installed = true;
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
        const path = window.location.pathname;
        if (!path.startsWith('/connexion') && !path.startsWith('/inscription')) {
          store.dispatch(logout());
          window.location.href = '/connexion';
        }
      }
      return Promise.reject(error);
    }
  );
}
