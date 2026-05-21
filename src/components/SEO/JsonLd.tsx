import { Helmet } from "react-helmet-async";

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
