import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { FiArrowUpRight, FiMail } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { Navbar } from "@/components/navbar";
import { ProjectCard } from "@/components/projects";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { services } from "@/lib/services";
import { projects } from "@/lib/projects";

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  return { title: `${service?.label ?? "Servicios"} | Kairos Beluga`, description: `Construimos tu ${service?.singular ?? "proyecto"}. Conocé nuestros trabajos y contactanos para cotizar.` };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  const selected = projects.filter((project) => project.category === service.category);

  return <main id="top" className="min-h-screen bg-[#f7f7f5] font-host text-[#191919]">
    <Navbar />
    <section id="contacto" className="mx-auto max-w-[1400px] space-y-8 px-5 pb-12 pt-36 md:px-10 md:pb-20 md:pt-44">
      <nav aria-label="Ruta de navegación" className="text-sm text-black/55"><a href="/" className="hover:underline">Inicio</a> / <a href="/#servicios" className="hover:underline">Servicios</a> / <strong className="text-black">{service.label}</strong></nav>
      <p className="text-[18px] font-medium uppercase leading-7 tracking-[-0.5px] md:text-[20px]"><span className="text-[#ef3b32]">&#123;</span> Servicios · {service.label} <span className="text-[#ef3b32]">&#125;</span></p>
      <h1 className="max-w-[980px] text-[clamp(2.5rem,5.8vw,6rem)] font-medium leading-[0.95] tracking-[-0.065em]">Hacemos tu idea realidad, construimos tu <span className="text-[#ef3b32]">{service.singular}</span>.</h1>
      <p className="max-w-[720px] text-xl font-medium leading-[1.3] tracking-[-0.04em] text-[#4b4b49] md:text-2xl">Contactanos para cotizar tu nuevo proyecto.</p>
      <div className="flex flex-wrap gap-3">
        <a href="https://wa.me/5491136401776" className="inline-flex items-center gap-3 rounded-full bg-[#191919] px-6 py-3 text-base font-medium tracking-[-0.03em] text-white transition-transform duration-300 hover:scale-105"><FaWhatsapp size={18} aria-hidden="true" />WhatsApp 11 3640-1776</a>
        <a href="https://wa.me/5491166753340" className="inline-flex items-center gap-3 rounded-full bg-[#191919] px-6 py-3 text-base font-medium tracking-[-0.03em] text-white transition-transform duration-300 hover:scale-105"><FaWhatsapp size={18} aria-hidden="true" />WhatsApp 11 6675-3340</a>
        <a href="mailto:kairosbeluga@gmail.com" className="inline-flex items-center gap-3 break-all rounded-full border border-black/25 px-6 py-3 text-base font-medium tracking-[-0.03em] transition-colors hover:bg-[#191919] hover:text-white"><FiMail size={18} className="shrink-0" aria-hidden="true" />kairosbeluga@gmail.com</a>
      </div>
    </section>
    <section id="proyectos" className="projects-section bg-[#f7f7f5] pb-10 text-[#191919] md:pb-20">
      <header className="mx-auto grid max-w-[1400px] gap-6 px-5 pb-10 pt-12 md:grid-cols-[0.72fr_1.28fr] md:px-10 md:pt-16">
        <p className="text-[18px] font-medium uppercase leading-7 tracking-[-0.5px] md:text-[20px]"><span className="text-[#ef3b32]">&#123;</span> Proyectos <span className="text-[#ef3b32]">&#125;</span></p>
        <div className="space-y-4"><h2 className="text-[clamp(1.3rem,2.9vw,2.75rem)] font-medium leading-[1.02] tracking-[-0.05em]">Nuestros proyectos.</h2><p className="text-lg leading-relaxed tracking-[-0.02em] text-[#4b4b49]">{service.label} que construimos en trabajos anteriores.</p><p className="text-sm text-black/55">{String(selected.length).padStart(2, "0")} {selected.length === 1 ? "proyecto" : "proyectos"}</p></div>
      </header>
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        {selected.map((project, index) => <ProjectCard key={project.number} project={project} layout="detail" index={index} />)}
        {selected.length === 0 && <div className="mx-auto my-8 max-w-[1400px] rounded-2xl bg-white px-6 py-12 md:p-12"><p className="text-xl font-medium tracking-[-0.04em]">Próximamente compartiremos nuestros proyectos de {service.label.toLowerCase()}.</p><p className="mt-3 text-[#4b4b49]">Mientras tanto, contactanos para conversar sobre tu idea.</p></div>}
      </div>
    </section>
    <section className="bg-[#f7f7f5] px-5 pb-24 pt-12 text-center md:px-10 md:pb-32 md:pt-16">
      <div className="mx-auto max-w-[860px]">
        <p className="text-[clamp(5.5rem,14vw,14rem)] font-medium leading-[0.78] tracking-[-0.09em] text-[#ef3b32]">¿LISTOS?</p>
        <h2 className="mx-auto mt-12 max-w-[580px] text-[18px] font-medium leading-[1.35] tracking-[-0.04em] text-[#262624] md:mt-14 md:text-[21px]">¿Listo para {service.article} {service.singular}? Cotizalo con nosotros.</h2>
        <a href="https://wa.me/5491136401776" className="mt-7 inline-flex items-center gap-3 rounded-full bg-black px-6 py-3 text-base font-medium tracking-[-0.03em] text-white transition-transform duration-300 hover:scale-105 md:mt-8">Escribinos por WhatsApp <FiArrowUpRight aria-hidden="true" /></a>
        <a href="/" className="mx-auto mt-6 block w-fit text-sm text-black/55 transition-opacity hover:opacity-60">← Volver al inicio</a>
      </div>
    </section>
    <Footer homePrefix="/" />
    <WhatsAppButton />
  </main>;
}
