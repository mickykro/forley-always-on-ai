import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  noIndex?: boolean;
}

const SEO = ({
  title,
  description,
  canonicalUrl = import.meta.env.VITE_DOMAIN_URL || "https://call4li.com",
  ogImage = import.meta.env.VITE_OG_IMAGE || "https://storage.googleapis.com/gpt-engineer-file-uploads/BznbHi8FA0h8NpJ5xTQqZqFHOWw2/social-images/social-1758443376531-forli-mascot.png",
  ogType = "website",
  noIndex = false,
}: SEOProps) => {
  const fullTitle = title.includes("Call4li") ? title : `${title} | Call4li`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Call4li" />
      <meta property="og:locale" content="he_IL" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};

export default SEO;
