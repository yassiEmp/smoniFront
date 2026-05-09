const isDev = import.meta.env.MODE === 'development';

export const apiUrl = isDev 
  ? "http://localhost:8000/api/" 
  : "https://api.smoni.fr/api/";

export const imageUrl = isDev
  ? "http://localhost:8000/storage/"
  : "https://api.smoni.fr/storage/";

export const pdfUrl = isDev
  ? "http://localhost:8000/"
  : "https://api.smoni.fr/";