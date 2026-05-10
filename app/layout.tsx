import type { Metadata } from "next";
import { Noto_Sans_Armenian, Noto_Serif_Armenian } from "next/font/google";

import { StyledComponentsRegistry } from "./registry";

const armSerif = Noto_Serif_Armenian({
  variable: "--font-arm-serif",
  subsets: ["armenian"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  adjustFontFallback: true,
});

const armSans = Noto_Sans_Armenian({
  variable: "--font-arm-sans",
  subsets: ["armenian"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Արթուր Մնացականյանի 50-ամյակի հրավեր",
  description:
    "Խորհրդավոր տոնական հրավեր։ 27 հունիսի, 2026, Արարատ ռեստորան։",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hy" className={`${armSerif.variable} ${armSans.variable}`}>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
