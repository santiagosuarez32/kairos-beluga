import Image from "next/image";

const links = [
  ["Nosotros", "#nosotros"],
  ["Servicios", "#servicios"],
  ["Proyectos", "#proyectos"],
  ["FAQ", "#faq"],
  ["Contacto", "#contacto"],
];

export function Footer() {
  return (
    <footer id="contacto" className="bg-[#f7f7f5] px-3 pb-3 text-white md:px-5 md:pb-5">
      <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[14px] bg-black">
        <div className="relative aspect-[1.35] w-full md:aspect-[2.25]">
          <Image src="/pdf-projects/biferdil-render-v2.jpg" alt="Proyecto Biferdil de Kairos Beluga" fill quality={100} sizes="(max-width: 768px) 100vw, 1400px" className="object-cover" />
        </div>

        <div className="grid gap-12 px-6 py-12 md:grid-cols-[1.4fr_0.6fr_0.6fr] md:px-12 md:py-16">
          <div>
            <h2 className="font-host text-[clamp(3rem,5vw,5.3rem)] font-medium leading-[0.92] tracking-[-0.07em]">
              Espacios que<br />
              conectan.
            </h2>
            <p className="mt-5 max-w-[420px] font-host text-[16px] font-light leading-[1.4] tracking-[-0.03em] text-white md:text-[18px]">
              Kairos transforma ideas en espacios de marca que atraen, conectan y hacen avanzar.
            </p>
            <a href="mailto:hola@kairosbeluga.com" className="mt-7 inline-block border-b border-white/70 pb-1 font-host text-[17px] font-medium tracking-[-0.03em] transition-opacity hover:opacity-60">
              hola@kairosbeluga.com
            </a>
          </div>

          <nav aria-label="Navegación de pie de página" className="grid content-start gap-3 font-host text-[17px] font-medium tracking-[-0.03em]">
            {links.map(([label, href]) => <a className="transition-opacity hover:opacity-60" href={href} key={label}>{label}</a>)}
          </nav>

          <div className="grid content-start gap-3 font-host text-[17px] font-medium tracking-[-0.03em]">
            <a className="transition-opacity hover:opacity-60" href="https://www.instagram.com" target="_blank" rel="noreferrer">Instagram ↗</a>
            <a className="transition-opacity hover:opacity-60" href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <p className="mt-5 max-w-[200px] font-light text-[15px] leading-[1.35] text-white">Buenos Aires, Argentina</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white px-6 py-5 font-host text-[13px] font-light tracking-[-0.02em] text-white md:flex-row md:items-center md:justify-between md:px-12">
          <span>© 2026 Kairos Beluga. Todos los derechos reservados.</span>
          <span>Diseño que se mueve.</span>
        </div>

        <div className="relative mx-auto aspect-[2/1] w-[min(82vw,860px)] overflow-hidden">
          <Image
            src="/footer-logo-vector-hq.png"
            alt="Constructora Kairos Beluga"
            fill
            quality={100}
            sizes="(max-width: 768px) 82vw, 860px"
            className="object-contain invert"
          />
        </div>
      </div>
    </footer>
  );
}
