import { FaWhatsapp } from "react-icons/fa";

const whatsappUrl =
  "https://wa.me/?text=Hola%20Kairos%2C%20quiero%20conversar%20sobre%20un%20proyecto.";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className="group fixed bottom-5 right-5 z-50 grid h-16 w-16 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_rgba(0,0,0,0.35)] transition-all duration-200 hover:-translate-y-1 hover:scale-105 hover:bg-[#1da851] hover:shadow-[0_16px_34px_rgba(0,0,0,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366] md:bottom-7 md:right-7"
    >
      <span className="whatsapp-halo" aria-hidden="true" />
      <span className="whatsapp-ring" aria-hidden="true" />
      <span className="whatsapp-ring whatsapp-ring-delayed" aria-hidden="true" />
      <FaWhatsapp aria-hidden="true" className="relative z-10" size={29} />
    </a>
  );
}
