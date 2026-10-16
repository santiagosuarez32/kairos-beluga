"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { services } from "@/lib/services";
import { FaFacebookF } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";

const links = [
  { href: "#nosotros", label: "Nosotros" },
  { href: "#servicios", label: "Servicios" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#faq", label: "FAQ" },
  { href: "#contacto", label: "Contacto" },
];

const desktopLinks = [
  { href: "#nosotros", label: "Nosotros" },
  { href: "#servicios", label: "Servicios" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#faq", label: "FAQ" },
  { href: "#contacto", label: "Contacto" },
];

function ServiceSelector({ mobile = false, onChoose }: { mobile?: boolean; onChoose: () => void }) {
  const pathname = usePathname();
  return <details className="group/services relative" onPointerEnter={(event) => { if (!mobile && event.pointerType === "mouse") event.currentTarget.open = true; }} onPointerLeave={(event) => { if (!mobile && event.pointerType === "mouse" && !event.currentTarget.contains(document.activeElement)) event.currentTarget.open = false; }} onKeyDown={(event) => { if (event.key === "Escape") { event.currentTarget.open = false; event.currentTarget.querySelector("summary")?.focus(); } }} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) event.currentTarget.open = false; }}>
    <summary className={`flex cursor-pointer list-none items-center justify-center gap-2 [&::-webkit-details-marker]:hidden ${mobile ? "font-host text-3xl font-medium tracking-[-0.05em] text-white" : "text-[18px] tracking-[-0.5px]"}`}><span className="h-1.5 w-1.5 rounded-full bg-current" />Servicios</summary>
    <div className={mobile ? "mt-4 flex flex-col gap-3" : "absolute left-1/2 top-full mt-4 w-72 -translate-x-1/2 rounded-[26px] border border-black/15 bg-[#f7f7f5] p-3 shadow-[0_10px_35px_rgba(0,0,0,0.08)] before:absolute before:inset-x-0 before:-top-4 before:h-4 before:content-['_']"}>{services.map((service) => <a key={service.slug} href={`/servicios/${service.slug}`} aria-current={pathname === `/servicios/${service.slug}` ? "page" : undefined} onClick={(event) => { event.currentTarget.closest("details")?.removeAttribute("open"); onChoose(); }} className={`flex items-center gap-4 rounded-full border border-transparent px-4 py-3 text-base tracking-[-0.03em] transition hover:border-black/25 hover:bg-black/5 aria-[current=page]:text-[#ef3b32] ${mobile ? "text-white hover:bg-white/10" : "text-[#191919]"}`}>{service.label}</a>)}</div>
  </details>;
}

export function Navbar() {
  const pathname = usePathname();
  const homeLink = (href: string) => pathname === "/" ? href : `/${href}`;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
    };

    window.addEventListener("resize", closeOnDesktop);
    return () => window.removeEventListener("resize", closeOnDesktop);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav className="fixed left-1/2 top-7 z-50 grid w-[calc(100%-2.5rem)] max-w-[1120px] -translate-x-1/2 grid-cols-[auto_1fr_auto] items-center rounded-full bg-[#f7f7f5] px-5 py-2.5 text-[#191919] shadow-[0_10px_35px_rgba(255,255,255,0.16),0_4px_14px_rgba(0,0,0,0.16)] md:top-9 md:px-6">
        <a href={homeLink("#top")} aria-label="Kairos Beluga, inicio" className="group justify-self-start" onClick={closeMenu}>
          <Image src="/logo.png" alt="Kairos Beluga" width={180} height={60} priority className="h-auto w-24 brightness-0 transition-[filter,transform,opacity] duration-500 ease-out group-hover:scale-[1.04] group-hover:brightness-50 group-hover:opacity-80 md:w-28" />
        </a>

        <div className="navbar-links absolute left-1/2 hidden -translate-x-1/2 items-center gap-5 lg:flex">
          {desktopLinks.map((link) => link.label === "Servicios" ? <ServiceSelector key={link.label} onChoose={closeMenu} /> : (
            <a key={link.label} href={homeLink(link.href)} className="group flex items-center gap-2 text-[18px] font-normal leading-[1.35] tracking-[-0.5px] text-[#191919] transition-opacity duration-300 hover:opacity-55">
              <span className="h-1.5 w-1.5 rounded-full bg-current transition-all duration-300 group-hover:scale-150 group-hover:shadow-[0_0_10px_3px_rgba(25,25,25,0.28)]" />
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center justify-self-end gap-3 lg:flex">
          <a href="https://www.instagram.com/kairosbeluga/" target="_blank" rel="noreferrer" aria-label="Instagram" className="transition-opacity duration-300 hover:opacity-45"><FiInstagram size={19} strokeWidth={2} /></a>
          <a href="https://www.facebook.com/profile.php?id=61589620041589" target="_blank" rel="noreferrer" aria-label="Facebook" className="transition-opacity duration-300 hover:opacity-45"><FaFacebookF size={16} /></a>
          <a href={homeLink("#contacto")} className="navbar-links rounded-full border border-black/35 px-4 py-1.5 text-[18px] font-normal leading-[1.35] tracking-[-0.5px] transition hover:bg-[#191919] hover:text-white">Hablemos</a>
        </div>

        <button type="button" onClick={() => setIsMobileMenuOpen((open) => !open)} aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={isMobileMenuOpen} className="relative z-50 ml-auto flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden">
          <span className={`h-0.5 w-6 rounded-full bg-[#191919] transition-all duration-300 ${isMobileMenuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 rounded-full bg-[#191919] transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 rounded-full bg-[#191919] transition-all duration-300 ${isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      <div className={`fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-black/95 px-6 backdrop-blur-lg transition-all duration-500 lg:hidden ${isMobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`} aria-hidden={!isMobileMenuOpen}>
        <nav aria-label="Navegación móvil" className="flex translate-y-8 flex-col items-center gap-4 text-center">
          {links.map((link) => link.label === "Servicios" ? <ServiceSelector key={link.label} mobile onChoose={closeMenu} /> : (
            <a key={link.label} href={homeLink(link.href)} onClick={closeMenu} className="font-host text-3xl font-medium tracking-[-0.05em] text-white decoration-1 underline-offset-8 transition-all duration-300 hover:translate-x-1 hover:text-white/60 hover:underline">
              {link.label}
            </a>
          ))}
          <a href={homeLink("#contacto")} onClick={closeMenu} className="mt-3 rounded-full border border-white/60 px-7 py-3 font-host text-base font-medium text-white transition-colors hover:bg-white hover:text-black">Hablemos</a>
          <div className="mt-3 flex items-center gap-5 text-white">
            <a href="https://www.instagram.com/kairosbeluga/" target="_blank" rel="noreferrer" aria-label="Instagram" className="grid size-11 place-items-center rounded-full border border-white/45 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-white hover:bg-white hover:text-black"><FiInstagram size={21} strokeWidth={2} /></a>
            <a href="https://www.facebook.com/profile.php?id=61589620041589" target="_blank" rel="noreferrer" aria-label="Facebook" className="grid size-11 place-items-center rounded-full border border-white/45 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-white hover:bg-white hover:text-black"><FaFacebookF size={18} /></a>
          </div>
        </nav>
      </div>
    </>
  );
}
