import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { services } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  return [{ url: siteUrl, images: ["/projects-hq/barbieri/01-hq.jpg", "/projects-hq/vth/01-hq.jpg", "/projects-hq/fera/01-hq.jpg"].map((path) => `${siteUrl}${path}`) }, ...services.map(({ slug }) => ({ url: `${siteUrl}/servicios/${slug}` }))];
}
