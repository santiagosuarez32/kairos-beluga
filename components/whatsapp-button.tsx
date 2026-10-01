"use client";

import { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiX } from "react-icons/fi";

const contacts = [
  { number: "+54 9 11 3640-1776", phone: "5491136401776" },
  { number: "+54 9 11 6675-3340", phone: "5491166753340" },
];
const message = encodeURIComponent("Hola Kairos Beluga, quiero conversar sobre un proyecto.");

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="fixed bottom-5 right-5 z-50 font-host md:bottom-7 md:right-7">
      {open && (
        <nav id="whatsapp-contacts" aria-label="Elegí un número de WhatsApp" className="absolute bottom-20 right-0 flex w-[min(280px,calc(100vw-40px))] flex-col gap-2 rounded-2xl border border-black/10 bg-[#f7f7f5] p-3 shadow-xl">
          {contacts.map(({ number, phone }) => (
            <a key={phone} href={`https://wa.me/${phone}?text=${message}`} target="_blank" rel="noopener noreferrer"
              onClick={() => setOpen(false)} aria-label={`Escribir por WhatsApp al ${number}`}
              className="flex min-h-12 items-center gap-3 rounded-xl bg-[#128c46] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#0d7037] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#128c46]">
              <FaWhatsapp size={23} aria-hidden="true" />{number}
            </a>
          ))}
        </nav>
      )}
      <button ref={buttonRef} type="button" onClick={() => setOpen((value) => !value)}
        aria-expanded={open} aria-controls="whatsapp-contacts" aria-label={open ? "Cerrar opciones de WhatsApp" : "Elegir número de WhatsApp"}
        className="group relative grid h-16 w-16 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_rgba(0,0,0,0.35)] transition-all duration-200 hover:-translate-y-1 hover:scale-105 hover:bg-[#1da851] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366]">
        <span className="whatsapp-halo" aria-hidden="true" />
        <span className="whatsapp-ring" aria-hidden="true" />
        <span className="whatsapp-ring whatsapp-ring-delayed" aria-hidden="true" />
        {open ? <FiX aria-hidden="true" className="relative z-10" size={29} /> : <FaWhatsapp aria-hidden="true" className="relative z-10" size={29} />}
      </button>
    </div>
  );
}
