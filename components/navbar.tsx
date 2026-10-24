"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
    <div className={mobile ? "mt-4 flex flex-col gap-3" : "absolute left-1/2 top-full mt-4 w-72 -translate-x-1/2 rounded-[26px] border border-black/15 bg-[#f7f7f5] p-3 shadow-[0_10px_35px_rgba(0,0,0,0.08)] before:absolute before:inset-x-0 before:-top-4 before:h-4 before:content-['_']"}>{services.map((service) => <Link key={service.slug} href={`/servicios/${service.slug}`} aria-current={pathname === `/servicios/${service.slug}` ? "page" : undefined} onClick={(event) => { event.currentTarget.closest("details")?.removeAttribute("open"); onChoose(); }} className={`flex items-center gap-4 rounded-full border border-transparent px-4 py-3 text-base tracking-[-0.03em] transition hover:border-black/25 hover:bg-black/5 aria-[current=page]:text-[#ef3b32] ${mobile ? "text-white hover:bg-white/10" : "text-[#191919]"}`}>{service.label}</Link>)}</div>
  </details>;
}

export function Navbar() {
  const pathname = usePathname();
  const homeLink = (href: string) => pathname === "/" ? href : `/${href}`;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileView, setMobileView] = useState<"main" | "services">("main");

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
        setMobileView("main");
      }
    };
    window.addEventListener("keydown", onEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onEscape);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
    };

    window.addEventListener("resize", closeOnDesktop);
    return () => window.removeEventListener("resize", closeOnDesktop);
  }, []);

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setMobileView("main");
  };

  return (
    <>
      <nav className="fixed left-1/2 top-7 z-50 grid w-[calc(100%-2.5rem)] max-w-[1120px] -translate-x-1/2 grid-cols-[auto_1fr_auto] items-center rounded-full bg-[#f7f7f5] px-5 py-2.5 text-[#191919] shadow-[0_10px_35px_rgba(255,255,255,0.16),0_4px_14px_rgba(0,0,0,0.16)] md:top-9 md:px-6">
        <Link href={homeLink("#top")} aria-label="Kairos Beluga, inicio" className="group justify-self-start" onClick={closeMenu}>
          <Image src="/logo.png" alt="Kairos Beluga" width={180} height={60} priority className="h-auto w-24 brightness-0 transition-[filter,transform,opacity] duration-500 ease-out group-hover:scale-[1.04] group-hover:brightness-50 group-hover:opacity-80 md:w-28" />
        </Link>

        <div className="navbar-links absolute left-1/2 hidden -translate-x-1/2 items-center gap-5 lg:flex">
          {desktopLinks.map((link) => link.label === "Servicios" ? <ServiceSelector key={link.label} onChoose={closeMenu} /> : (
            <Link key={link.label} href={homeLink(link.href)} className="group flex items-center gap-2 text-[18px] font-normal leading-[1.35] tracking-[-0.5px] text-[#191919] transition-opacity duration-300 hover:opacity-55">
              <span className="h-1.5 w-1.5 rounded-full bg-current transition-all duration-300 group-hover:scale-150 group-hover:shadow-[0_0_10px_3px_rgba(25,25,25,0.28)]" />
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center justify-self-end gap-3 lg:flex">
          <a href="https://www.instagram.com/kairosbeluga/" target="_blank" rel="noreferrer" aria-label="Instagram" className="transition-opacity duration-300 hover:opacity-45"><FiInstagram size={19} strokeWidth={2} /></a>
          <a href="https://www.facebook.com/profile.php?id=61589620041589" target="_blank" rel="noreferrer" aria-label="Facebook" className="transition-opacity duration-300 hover:opacity-45"><FaFacebookF size={16} /></a>
          <Link href={homeLink("#contacto")} className="navbar-links rounded-full border border-black/35 px-4 py-1.5 text-[18px] font-normal leading-[1.35] tracking-[-0.5px] transition hover:bg-[#191919] hover:text-white">Hablemos</Link>
        </div>

        <button type="button" onClick={() => { setMobileView("main"); setIsMobileMenuOpen((open) => !open); }} aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={isMobileMenuOpen} aria-controls="mobile-navigation" className="relative z-50 ml-auto flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden">
          <span className={`h-0.5 w-6 rounded-full bg-[#191919] transition-all duration-300 ${isMobileMenuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 rounded-full bg-[#191919] transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 rounded-full bg-[#191919] transition-all duration-300 ${isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      <div id="mobile-navigation" data-lenis-prevent inert={!isMobileMenuOpen} className={`fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-black/95 px-7 pb-[max(40px,env(safe-area-inset-bottom))] pt-36 font-host text-white backdrop-blur-lg transition-all duration-300 lg:hidden ${isMobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`} aria-hidden={!isMobileMenuOpen}>
        <nav aria-label={mobileView === "services" ? "Servicios" : "Navegación móvil"} className="mx-auto flex min-h-full max-w-md flex-col items-center justify-center gap-4 text-center">
          {mobileView === "services" ? <>
            <button type="button" onClick={() => setMobileView("main")} className="mb-2 min-h-11 px-4 text-base text-white/70 hover:text-white">← Volver al menú</button>
            <h2 className="mb-3 text-3xl font-medium tracking-[-0.05em]">Servicios</h2>
            {services.map((service) => <Link key={service.slug} href={`/servicios/${service.slug}`} onClick={closeMenu} aria-current={pathname === `/servicios/${service.slug}` ? "page" : undefined} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-xl font-normal leading-tight tracking-[-0.03em] hover:bg-white/10 aria-[current=page]:text-[#ef3b32]"><span aria-hidden="true">-</span>{service.label}</Link>)}
          </> : <>
          {links.map((link) => link.label === "Servicios" ? <button key={link.label} type="button" onClick={() => setMobileView("services")} className="min-h-11 font-host text-3xl font-medium tracking-[-0.05em] text-white hover:text-white/60">Servicios <span aria-hidden="true">↗</span></button> : (
            <Link key={link.label} href={homeLink(link.href)} onClick={closeMenu} className="font-host text-3xl font-medium tracking-[-0.05em] text-white decoration-1 underline-offset-8 transition-all duration-300 hover:translate-x-1 hover:text-white/60 hover:underline">
              {link.label}
            </Link>
          ))}
          <Link href={homeLink("#contacto")} onClick={closeMenu} className="mt-3 rounded-full border border-white/60 px-7 py-3 font-host text-base font-medium text-white transition-colors hover:bg-white hover:text-black">Hablemos</Link>
          <div className="mt-3 flex items-center gap-5 text-white">
            <a href="https://www.instagram.com/kairosbeluga/" target="_blank" rel="noreferrer" aria-label="Instagram" className="grid size-11 place-items-center rounded-full border border-white/45 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-white hover:bg-white hover:text-black"><FiInstagram size={21} strokeWidth={2} /></a>
            <a href="https://www.facebook.com/profile.php?id=61589620041589" target="_blank" rel="noreferrer" aria-label="Facebook" className="grid size-11 place-items-center rounded-full border border-white/45 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:border-white hover:bg-white hover:text-black"><FaFacebookF size={18} /></a>
          </div>
          </>}
        </nav>
      </div>
    </>
  );
}
