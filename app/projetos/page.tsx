import type { Metadata } from "next";
import { createSiteMetadata } from "@/lib/metadata";
import ProjectsHero3D from "@/components/sections/ProjectsHero3D";

export const metadata: Metadata = createSiteMetadata({
  title: "Projetos — Metro Design",
  description:
    "Conheça os projetos de branding, comunicação e audiovisual que a Metro Design já realizou.",
  path: "/projetos",
});

export default function ProjetosPage() {
  return (
    <>
      <ProjectsHero3D />
      <section
        style={{
          background: "#f2f2ef",
          padding: "8vh 6vw 12vh",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(36px, 6vw, 72px)",
            fontWeight: 600,
            marginBottom: "5vh",
          }}
        >
          Projetos <span style={{ color: "var(--color-accent, #ff2e2e)" }}>metro</span>
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                aspectRatio: "4 / 3",
                background: "#141414",
                borderRadius: 20,
                overflow: "hidden",
                display: "flex",
                alignItems: "flex-end",
                padding: 18,
                color: "#fff",
                fontSize: 14,
                letterSpacing: 0.5,
              }}
            >
              <span>Projeto {String(i + 1).padStart(2, "0")}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
