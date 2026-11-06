import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SiteShell } from "@/components/layout/SiteShell";
import { createSiteMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/constants";
import "lenis/dist/lenis.css";
import "./globals.css";

const halyardMicro = localFont({
  src: [
    { path: "./fonts/halyard/HalyardMicro-ExtraLight.ttf", weight: "200", style: "normal" },
    { path: "./fonts/halyard/HalyardMicro-Light.ttf", weight: "300", style: "normal" },
    { path: "./fonts/halyard/HalyardMicro-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/halyard/HalyardMicro-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/halyard/HalyardMicro-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/halyard/HalyardMicro-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/halyard/HalyardMicro-Black.ttf", weight: "900", style: "normal" },
    { path: "./fonts/halyard/HalyardMicro-Italic.ttf", weight: "400", style: "italic" },
  ],
  variable: "--font-halyard-micro",
  display: "swap",
  preload: false,
});

const halyardDisplay = localFont({
  src: [
    { path: "./fonts/halyard-display/HalyardDisplay-ExtraLight.ttf", weight: "200", style: "normal" },
    { path: "./fonts/halyard-display/HalyardDisplay-Light.ttf", weight: "300", style: "normal" },
    { path: "./fonts/halyard-display/HalyardDisplay-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/halyard-display/HalyardDisplay-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/halyard-display/HalyardDisplay-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/halyard-display/HalyardDisplay-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/halyard-display/HalyardDisplay-Black.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-halyard-display",
  display: "swap",
  preload: false,
});

const ivyPrestoHeadlineItalic = localFont({
  src: "./fonts/ivy-presto/IvyPrestoHeadline-Italic.otf",
  variable: "--font-ivy-headline-italic",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  ...createSiteMetadata({
    title: "Metro Design — Marcas, conteúdos e produtos digitais",
    description:
      "Design, comunicação e tecnologia para transformar percepção em valor.",
    path: "/",
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${halyardMicro.variable} ${halyardDisplay.variable} ${ivyPrestoHeadlineItalic.variable}`}
    >
      <body className="antialiased">
        <SiteShell
          header={<Header />}
          footer={<Footer />}
          floatingAction={<WhatsAppButton />}
        >
          {children}
        </SiteShell>
      </body>
    </html>
  );
}
