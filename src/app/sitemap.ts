import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const baseUrl = "https://gogreenmw.com";

const routes = [
  "/",
  "/about",
  "/how-it-works",
  "/solutions",
  "/projects",
  "/impact",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
  }));
}