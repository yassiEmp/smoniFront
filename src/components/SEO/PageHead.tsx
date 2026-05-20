import { Helmet } from "react-helmet-async";

const SITE_URL = "https://smoni.fr";
const DEFAULT_OG_IMAGE = "/og-home.jpg";

export interface PageHeadProps {
  title: string;
  description: string;
  canonicalPath: string;
  ogImage?: string;
}

const PageHead = ({
  title,
  description,
  canonicalPath,
  ogImage = DEFAULT_OG_IMAGE,
}: PageHeadProps) => {
  const url = `${SITE_URL}${canonicalPath}`;
  const image = ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default PageHead;
