import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "Kairos Beluga: diseño, construcción y montaje de stands en Buenos Aires. Del render a la realidad.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const [photo, logo, font] = await Promise.all([
    readFile(path.join(process.cwd(), "public/projects-hq/barbieri/01-hq.jpg")),
    readFile(path.join(process.cwd(), "public/logo.png")),
    readFile(path.join(process.cwd(), "public/fonts/HostGrotesk-Bold.ttf")),
  ]);
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#161616", color: "white", fontFamily: "Host Grotesk" }}>
      <img src={`data:image/jpeg;base64,${photo.toString("base64")}`} alt="" width={1200} height={630} style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", backgroundImage: "linear-gradient(90deg, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.78) 42%, rgba(0,0,0,0.12) 100%)" }} />
      <div style={{ display: "flex", flexDirection: "column", padding: "48px 56px", width: "100%", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ display: "flex", padding: "10px 18px", borderRadius: 14, background: "#161616" }}><img src={`data:image/png;base64,${logo.toString("base64")}`} width={116} height={72} alt="Kairos Beluga" style={{ objectFit: "contain" }} /></div>
          <div style={{ display: "flex", fontSize: 30 }}>KAIROS BELUGA</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 700 }}>
          <div style={{ display: "flex", fontSize: 70, lineHeight: 1.02, letterSpacing: -3 }}>Del render</div>
          <div style={{ display: "flex", fontSize: 70, lineHeight: 1.02, letterSpacing: -3 }}>a la realidad.</div>
          <div style={{ display: "flex", marginTop: 25, fontSize: 27, lineHeight: 1.35, maxWidth: 570 }}>Diseño, construcción y montaje de stands y espacios comerciales.</div>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#f7f7f5", gap: 14 }}><span style={{ color: "#ef3b32" }}>BUENOS AIRES</span><span>·</span><span>ARGENTINA</span></div>
      </div>
    </div>,
    { ...size, fonts: [{ name: "Host Grotesk", data: font, weight: 700, style: "normal" }] },
  );
}
