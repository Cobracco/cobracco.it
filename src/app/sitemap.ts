import type { MetadataRoute } from "next";
import { siteContent } from "@/content/siteContent";
import { getAllPosts } from "@/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteContent.brand.siteUrl;
  const routes = [
    "",
    "/servizi",
    "/sviluppo-software",
    "/mvp-startup",
    "/ai",
    "/metodo",
    "/chi-siamo",
    "/lavora-con-noi",
    "/blog",
    "/contatti",
  ];

  const postRoutes = getAllPosts().map((post) => `/blog/${post.slug}`);

  return [...routes, ...postRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}

