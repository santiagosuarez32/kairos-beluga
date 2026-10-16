import type { Metadata } from "next";

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "https://kairos-beluga.vercel.app");

export const siteUrl = new URL(configuredUrl).origin;
export const siteName = "Kairos Beluga";
export const isIndexable = process.env.VERCEL_ENV !== "preview" && process.env.NODE_ENV === "production";
export const socialImage = { url: "/opengraph-image", width: 1200, height: 630, alt: "Stand construido por Kairos Beluga: foto de presentación del sitio" };
export const siteTitle = "Kairos Beluga | Diseño y construcción de stands";
export const siteDescription = "Diseño, construcción y montaje de stands, góndolas y locales comerciales y gastronómicos. Desde Buenos Aires a todo el país. Cotizá con Kairos Beluga.";

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteUrl || "http://localhost:3000"),
  title: { default: siteTitle, template: "%s | Kairos Beluga" },
  description: siteDescription,
  applicationName: siteName,
  keywords: ["Kairos Beluga", "diseño de stands", "construcción de stands", "montaje de stands", "stands para ferias", "stands para exposiciones", "stands Buenos Aires", "arquitectura comercial", "construcción de locales comerciales", "locales gastronómicos", "góndolas comerciales", "exhibidores a medida", "stands Argentina", "stands Canning"],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  category: "Diseño y construcción de stands y espacios comerciales",
  ...(siteUrl ? { alternates: { canonical: siteUrl } } : {}),
  icons: { icon: "/favicon.ico", shortcut: "/favicon.ico" },
  openGraph: {
    type: "website", locale: "es_AR", siteName,
    title: siteTitle, description: siteDescription,
    images: [socialImage],
    ...(siteUrl ? { url: siteUrl } : {}),
  },
  twitter: {
    card: "summary_large_image", title: siteTitle, description: siteDescription,
    images: [socialImage],
  },
  robots: {
    index: isIndexable, follow: true,
    googleBot: { index: isIndexable, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  ...(process.env.GOOGLE_SITE_VERIFICATION ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } } : {}),
};

const businessStructuredData = {
  "@type": "LocalBusiness",
  name: siteName,
  legalName: "Kairos Beluga S.A.",
  description: siteDescription,
  ...(siteUrl ? { "@id": `${siteUrl}/#empresa`, url: siteUrl, image: `${siteUrl}/opengraph-image`, logo: `${siteUrl}/logo.png` } : {}),
  email: "kairosbeluga@gmail.com",
  telephone: "+54 9 11 3640-1776",
  contactPoint: ["+54 9 11 3640-1776", "+54 9 11 6675-3340"].map((telephone) => ({ "@type": "ContactPoint", telephone, contactType: "customer service", availableLanguage: "Spanish" })),
  address: { "@type": "PostalAddress", streetAddress: "Perito Moreno 1155", addressLocality: "Canning", addressRegion: "Buenos Aires", addressCountry: "AR" },
  areaServed: { "@type": "Country", name: "Argentina" },
  sameAs: ["https://www.instagram.com/kairosbeluga/", "https://www.facebook.com/profile.php?id=61589620041589"],
  hasOfferCatalog: {
    "@type": "OfferCatalog", name: "Stands y espacios comerciales",
    itemListElement: ["Diseño y construcción de stands para ferias", "Montaje de stands para exposiciones", "Diseño y fabricación de góndolas comerciales", "Exhibidores y espacios comerciales a medida"].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name, provider: { "@type": "Organization", name: siteName } } })),
  },
};

export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    businessStructuredData,
    { "@type": "WebSite", name: siteName, inLanguage: "es-AR", ...(siteUrl ? { "@id": `${siteUrl}/#website`, url: siteUrl, publisher: { "@id": `${siteUrl}/#empresa` } } : {}) },
  ],
};
