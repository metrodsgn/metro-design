import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

type SiteMetadataOptions = {
  title: string;
  description: string;
  path: string;
};

export function createSiteMetadata({
  title,
  description,
  path,
}: SiteMetadataOptions): Metadata {
  const url = new URL(path, SITE.url).toString();

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "pt_BR",
      siteName: SITE.name,
      url,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Metro Design — Branding e comunicação estratégica",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}
