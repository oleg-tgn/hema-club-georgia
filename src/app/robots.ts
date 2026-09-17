import type { MetadataRoute } from "next";
import { headers } from "next/headers";

// The staging subdomain (dev.hemageorgia.com) must stay out of search
// results while the real site is still on hemageorgia.com; everywhere else
// is crawlable as normal.
export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get("host") ?? "";
  const isStaging = host.startsWith("dev.");

  if (isStaging) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
  };
}
