import type { Metadata } from "next";

export function getMetadataBase(): URL {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    return new URL(fromEnv.endsWith("/") ? fromEnv : `${fromEnv}/`);
  }

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    return new URL(`https://${vercel}/`);
  }

  return new URL("http://localhost:3000/");
}

const title = "Հրավեր";

export const siteMetadata: Metadata = {
  title,
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title,
    type: "website",
    locale: "hy_AM",
    siteName: title,
  },
  twitter: {
    card: "summary_large_image",
    title,
  },
};
