import type { MetadataRoute } from "next";
import { headers } from "next/headers";

// The staging subdomains (dev., dev2. ...hemageorgia.com) must stay out of search
// results while the real site is still on hemageorgia.com; everywhere else
// is crawlable as normal.
export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get("host") ?? "";
  const isStaging = /^dev\d*\./.test(host);

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
