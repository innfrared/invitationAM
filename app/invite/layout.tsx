import type { Metadata } from "next";

import { getMetadataBase, siteMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  ...siteMetadata,
};

export default function InviteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
