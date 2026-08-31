import Image from "next/image";
import { FaFacebookF } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";

const links = [
  { href: "#nosotros", label: "Nosotros" },
  { href: "#nosotros", label: "Servicios" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#contacto", label: "Contacto" },
];

export function Navbar() {
  return <nav className="fixed left-1/2 top-7 z-50 grid w-[calc(100%-2.5rem)] max-w-[1120px] -translate-x-1/2 grid-cols-[auto_1fr_auto] items-center rounded-full bg-[#f7f7f5] px-5 py-2.5 text-[#191919] shadow-[0_10px_35px_rgba(255,255,255,0.16),0_4px_14px_rgba(0,0,0,0.16)] md:top-9 md:px-6"><a href="#top" aria-label="Kairos Beluga, inicio" className="group justify-self-start"><Image src="/logo.png" alt="Kairos Beluga" width={180} height={60} priority className="h-auto w-24 brightness-0 transition-[filter,transform,opacity] duration-500 ease-out group-hover:scale-[1.04] group-hover:brightness-50 group-hover:opacity-80 md:w-28" /></a><div className="navbar-links absolute left-1/2 hidden -translate-x-1/2 items-center gap-5 lg:flex">{links.map((link) => <a key={link.label} href={link.href} className="group flex items-center gap-2 text-[18px] font-normal leading-[1.35] tracking-[-0.5px] text-[#191919] transition-opacity duration-300 hover:opacity-55"><span className="h-1.5 w-1.5 rounded-full bg-current transition-all duration-300 group-hover:scale-150 group-hover:shadow-[0_0_10px_3px_rgba(25,25,25,0.28)]" />{link.label}</a>)}</div><div className="flex items-center justify-self-end gap-3"><a href="#" aria-label="Instagram" className="transition-opacity duration-300 hover:opacity-45"><FiInstagram size={19} strokeWidth={2} /></a><a href="#" aria-label="Facebook" className="transition-opacity duration-300 hover:opacity-45"><FaFacebookF size={16} /></a><a href="#contacto" className="navbar-links rounded-full border border-black/35 px-4 py-1.5 text-[18px] font-normal leading-[1.35] tracking-[-0.5px] transition hover:bg-[#191919] hover:text-white">Hablemos</a></div></nav>;
}
