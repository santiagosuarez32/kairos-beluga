import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "Stand construido por Kairos Beluga: foto de presentación del sitio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const photo = await readFile(path.join(process.cwd(), "public/hero-image.png"));
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#161616" }}>
      <img src={`data:image/png;base64,${photo.toString("base64")}`} alt={alt} width={1200} height={630} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
    </div>,
    size,
  );
}