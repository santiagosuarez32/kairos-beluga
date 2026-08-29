import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kairos — Diseño que se mueve",
  description: "Estudio digital de estrategia, identidad y experiencias web.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
