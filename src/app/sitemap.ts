import type { MetadataRoute } from "next";
import { siteContent } from "@/content/siteContent";
import { getAllPosts } from "@/content/blog";
import { getAllCaseStudySlugs } from "@/content/caseStudies";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteContent.brand.siteUrl;
  const routes = [
    "",
    "/servizi",
    "/sviluppo-software",
    "/mvp-startup",
    "/migrazione-shopify",
    "/freelance-sviluppatore-software",
    "/ai",
    "/metodo",
    "/progetti-strategici",
    "/chi-siamo",
    "/lavora-con-noi",
    "/faq",
    "/blog",
    "/contatti",
  ];

  const postRoutes = getAllPosts().map((post) => `/blog/${post.slug}`);
  const caseStudyRoutes = getAllCaseStudySlugs().map(
    (slug) => `/progetti-strategici/${slug}`,
  );

  return [...routes, ...postRoutes, ...caseStudyRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}

