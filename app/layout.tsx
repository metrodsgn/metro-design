import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SiteShell } from "@/components/layout/SiteShell";
import { createSiteMetadata } from "@/lib/metadata";
import "lenis/dist/lenis.css";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = createSiteMetadata({
  title: "Metro Design — Branding e Comunicação Estratégica",
  description:
    "Transformamos negócios com design e comunicação estratégica. Agência de branding e design em Fortaleza-CE.",
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
      className={`${inter.variable} ${instrumentSerif.variable}`}
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
