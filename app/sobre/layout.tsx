import type { ReactNode } from "react";
import { Archivo } from "next/font/google";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: "variable",
  axes: ["wdth"],
  display: "swap",
});

export default function SobreLayout({ children }: { children: ReactNode }) {
  return <div className={archivo.variable}>{children}</div>;
}
