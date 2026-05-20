/// <reference types="vite/client" />
/// <reference types="vite-imagetools/client" />
declare module 'react-google-recaptcha';

declare type Picture = {
  sources: Record<string, string>;
  img: { src: string; w: number; h: number };
};