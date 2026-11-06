import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Metro Design — Branding e comunicação estratégica";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const halyardMicroBold = await readFile(join(process.cwd(), "app/fonts/halyard/HalyardMicro-Bold.ttf"));
const halyardDisplayRegular = await readFile(join(process.cwd(), "app/fonts/halyard-display/HalyardDisplay-Regular.ttf"));

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "88px",
          backgroundColor: "#0a0a0a",
          color: "#f5f5f5",
          fontFamily: "Halyard Micro",
        }}
      >
        <div
          style={{
            color: "#ff2e2e",
            fontSize: 86,
            fontWeight: 700,
            letterSpacing: -8,
          }}
        >
          metro.
        </div>
        <div
          style={{
            width: 72,
            height: 3,
            marginTop: 38,
            marginBottom: 28,
            backgroundColor: "#ff2e2e",
          }}
        />
        <div style={{ fontFamily: "Halyard Micro", fontSize: 42, lineHeight: 1.25, maxWidth: 900 }}>
          Branding e comunicação estratégica.
        </div>
        <div
          style={{
            position: "absolute",
            right: 88,
            bottom: 64,
            color: "#a0a0a0",
            fontSize: 22,
          }}
        >
          metrodesign.com.br
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Halyard Micro", data: halyardMicroBold, weight: 700, style: "normal" },
        { name: "Halyard Display", data: halyardDisplayRegular, weight: 400, style: "normal" },
      ],
    },
  );
}
