import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SiteShell } from "@/components/layout/SiteShell";
import { createSiteMetadata } from "@/lib/metadata";
import "lenis/dist/lenis.css";
import "./globals.css";

const halyardText = localFont({
  src: [
    { path: "./fonts/halyard/HalyardText-ExtraLight.ttf", weight: "200", style: "normal" },
    { path: "./fonts/halyard/HalyardText-Light.ttf", weight: "300", style: "normal" },
    { path: "./fonts/halyard/HalyardText-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/halyard/HalyardText-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/halyard/HalyardText-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/halyard/HalyardText-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/halyard/HalyardText-Black.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-halyard-text",
  display: "swap",
  preload: false,
});

const halyardDisplay = localFont({
  src: [
    { path: "./fonts/halyard/HalyardDisplay-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/halyard/HalyardDisplay-SemiBold.ttf", weight: "600", style: "normal" },
  ],
  variable: "--font-halyard-display",
  display: "swap",
  preload: false,
});

const ivyPrestoDisplay = localFont({
  src: "./fonts/ivy-presto/IvyPrestoDisplay-Regular.otf",
  variable: "--font-ivy-display",
  display: "swap",
  preload: false,
});

const ivyPrestoHeadline = localFont({
  src: [
    { path: "./fonts/ivy-presto/IvyPrestoHeadline-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/ivy-presto/IvyPrestoHeadline-Italic.otf", weight: "400", style: "italic" },
  ],
  variable: "--font-ivy-headline",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = createSiteMetadata({
  title: "Metro Design — Marcas, conteúdos e produtos digitais",
  description:
    "Design, comunicação e tecnologia para transformar percepção em valor.",
  path: "/",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${halyardText.variable} ${halyardDisplay.variable} ${ivyPrestoDisplay.variable} ${ivyPrestoHeadline.variable}`}
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
