import type { Metadata } from "next";
import {
  Space_Grotesk,
  Inter,
  Instrument_Serif,
  JetBrains_Mono,
} from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SiteShell } from "@/components/layout/SiteShell";
import { createSiteMetadata } from "@/lib/metadata";
import "lenis/dist/lenis.css";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
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
    <html lang="pt-BR">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${instrumentSerif.variable} ${jetBrainsMono.variable} antialiased`}
      >
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
