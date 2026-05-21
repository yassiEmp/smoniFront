const useLocalBackend = import.meta.env.VITE_USE_LOCAL_BACKEND === 'true';

export const apiUrl = useLocalBackend
  ? "http://localhost:8000/api/"
  : "https://api.smoni.fr/api/";

export const imageUrl = useLocalBackend
  ? "http://localhost:8000/storage/"
  : "https://api.smoni.fr/storage/";

export const pdfUrl = useLocalBackend
  ? "http://localhost:8000/"
  : "https://api.smoni.fr/";