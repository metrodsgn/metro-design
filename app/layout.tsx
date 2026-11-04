import type { Metadata } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SiteShell } from "@/components/layout/SiteShell";
import { createSiteMetadata } from "@/lib/metadata";
import "lenis/dist/lenis.css";
import "./globals.css";

const halyard = localFont({
  src: [
    { path: "../public/fonts/halyard/HalyardText-ExtraLight.ttf", weight: "200", style: "normal" },
    { path: "../public/fonts/halyard/HalyardText-Light.ttf", weight: "300", style: "normal" },
    { path: "../public/fonts/halyard/HalyardText-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/halyard/HalyardText-Medium.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/halyard/HalyardText-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../public/fonts/halyard/HalyardText-Bold.ttf", weight: "700", style: "normal" },
    { path: "../public/fonts/halyard/HalyardText-Black.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-halyard",
  display: "swap",
  preload: false,
});

const ivyPresto = localFont({
  src: [
    { path: "../public/fonts/ivy-presto/IvyPrestoDisplay-Regular.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/ivy-presto/IvyPrestoDisplay-Italic.otf", weight: "400", style: "italic" },
  ],
  variable: "--font-ivy-presto",
  display: "swap",
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
      className={`${halyard.variable} ${ivyPresto.variable}`}
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
