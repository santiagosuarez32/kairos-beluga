import Image from "next/image";
import { FiInstagram, FiMail } from "react-icons/fi";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";

const links = [
  ["Nosotros", "#nosotros"],
  ["Servicios", "#servicios"],
  ["Proyectos", "#proyectos"],
  ["FAQ", "#faq"],
  ["Contacto", "#contacto"],
];
const socials = [
  { name: "Instagram", href: "https://www.instagram.com/kairosbeluga/", Icon: FiInstagram },
  { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61589620041589", Icon: FaFacebookF },
  { name: "11 3640-1776", href: "https://wa.me/5491136401776", Icon: FaWhatsapp },
  { name: "11 6675-3340", href: "https://wa.me/5491166753340", Icon: FaWhatsapp },
  { name: "Email", href: "mailto:kairosbeluga@gmail.com", Icon: FiMail },
];

export function Footer() {
  return (
    <>
      <footer className="relative isolate overflow-hidden bg-[#f7f7f5] px-5 font-host text-[#191919] md:px-10">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-40 -z-10 select-none whitespace-nowrap text-center text-[clamp(5rem,17vw,22rem)] font-medium leading-none tracking-[-0.075em] text-black/[0.055] [mask-image:linear-gradient(to_bottom,black,transparent)] md:top-36">Kairos Beluga</div>
        <div className="mx-auto flex max-w-[1400px] flex-col items-center pb-24 pt-20 text-center md:pb-32 md:pt-24">
          <a href="#top" aria-label="Kairos Beluga, volver al inicio" className="rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
            <Image src="/logo.png" alt="Kairos Beluga" width={180} height={60} className="h-auto w-28 brightness-0" />
          </a>
          <h2 className="mt-9 text-[28px] font-medium leading-[1.15] tracking-[-0.045em] md:text-[32px]">Conectá con Kairos.<br />Seguinos en redes.</h2>
          <p className="mt-3 text-[15px] tracking-[-0.025em] text-black/65 md:text-base">Ideas, proyectos y todo lo que estamos construyendo.</p>
          <div className="mt-10 grid w-full max-w-[470px] grid-cols-2 gap-3">
            {socials.map(({ name, href, Icon }) => (
              <a key={name} href={href} target={href.startsWith("https") ? "_blank" : undefined} rel={href.startsWith("https") ? "noreferrer" : undefined} className={`group flex items-center justify-between gap-3 rounded-[22px] border border-black/10 bg-white/75 px-5 py-4 text-sm font-medium transition-colors hover:border-black/30 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 md:px-7 md:text-base ${name === "Email" ? "col-span-2" : ""}`}>
                {name}<span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#191919] text-white transition-transform group-hover:-rotate-12"><Icon size={15} aria-hidden="true" /></span>
              </a>
            ))}
          </div>
        </div>
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-6 border-t border-black/15 py-8 text-sm md:flex-row md:py-10">
          <nav aria-label="Navegación de pie de página" className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {links.map(([label, href]) => <a key={label} href={href} className="border-b border-black/50 pb-1 transition-opacity hover:opacity-50">{label}</a>)}
          </nav>
          <p className="text-center text-xs text-black/55 md:text-sm">© 2026 Kairos Beluga. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  );
}
