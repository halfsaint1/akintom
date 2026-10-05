import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { newsPosts } from "@/lib/data/news";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" },
    { path: "/testimonials", priority: 0.7, changeFrequency: "monthly" },
    { path: "/news", priority: 0.8, changeFrequency: "weekly" },
    { path: "/apply", priority: 0.95, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
    ...newsPosts.map((post) => ({
      path: `/news/${post.slug}`,
      priority: 0.65,
      changeFrequency: "monthly" as const,
    })),
  ];

  return routes.map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
