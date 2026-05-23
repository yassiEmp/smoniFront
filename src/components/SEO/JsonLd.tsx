// See PageHead.tsx — vite-react-ssg's <Head> is the SSR-aware wrapper that
// injects into <head> instead of leaking into <body>.
import { Head as Helmet } from "vite-react-ssg";

interface JsonLdProps {
  data: object | object[];
}

const JsonLd = ({ data }: JsonLdProps) => {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <Helmet>
      {payload.map((item, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
};

export default JsonLd;
