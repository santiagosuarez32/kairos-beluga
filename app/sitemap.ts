import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { services } from "@/lib/services";
import { projects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, images: [`${siteUrl}/hero-image.png`, ...projects.map((project) => `${siteUrl}${project.image}`)] },
    ...services.map(({ slug, category }) => ({
      url: `${siteUrl}/servicios/${slug}`,
      images: projects.filter((project) => project.category === category).map((project) => `${siteUrl}${project.image}`),
    })),
  ];
}
