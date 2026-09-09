"use client";

import { useState, type FormEvent } from "react";
import { FiArrowUpRight, FiMail, FiMapPin } from "react-icons/fi";

export function Contact() {
  const [prepared, setPrepared] = useState(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `Nuevo proyecto: ${data.get("service")}`;
    const body = `Nombre: ${data.get("name")}\nEmail: ${data.get("email")}\nTipo de proyecto: ${data.get("service")}\n\n${data.get("message")}`;
    window.location.href = `mailto:hola@kairosbeluga.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setPrepared(true);
  }
  const field = "mt-3 w-full rounded-none border-0 border-b border-black/15 bg-transparent px-0 pb-4 text-base font-normal text-[#191919] placeholder:text-[#818187] focus:border-[#ef3b32] focus:outline-none focus:ring-0";
  return (
    <section id="contacto" aria-labelledby="contact-title" className="scroll-mt-24 bg-[#f7f7f5] px-3 pb-16 font-host md:px-5 md:pb-24">
      <div className="contact-panel relative isolate mx-auto grid max-w-[1400px] gap-12 overflow-hidden rounded-[32px] p-6 md:grid-cols-2 md:gap-10 md:p-12 lg:p-14">
        <div aria-hidden="true" className="contact-ribbon pointer-events-none absolute inset-0 -z-10" />
        <div className="flex flex-col justify-between gap-12 py-5 md:py-12">
          <div>

            <h2 id="contact-title" className="mt-9 max-w-[580px] text-[clamp(2.8rem,5vw,5.4rem)] font-medium leading-[1.02] tracking-[-0.065em]">Construyamos<br />tu próximo<br />espacio.</h2>
          </div>
          <div className="grid gap-4 text-base tracking-[-0.03em]">
            <a href="mailto:hola@kairosbeluga.com" className="group flex items-center gap-4">
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-[#f7f7f5]"><FiMail size={22} /></span>
              <span><span className="block font-medium">Escribinos</span><span className="break-all group-hover:underline">hola@kairosbeluga.com</span></span>
            </a>
            <div className="flex items-center gap-4"><span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-[#f7f7f5]"><FiMapPin size={22} /></span><span><span className="block font-medium">Dónde estamos</span>Buenos Aires, Argentina</span></div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="min-w-0 rounded-[26px] border border-white/80 bg-[#f7f7f8] p-6 md:p-10 lg:p-12">
          <h3 className="mb-9 text-[clamp(1.7rem,2.5vw,2.4rem)] font-medium leading-tight tracking-[-0.055em]">Contanos tu idea</h3>
          <div className="grid gap-6">
            <label className="text-sm font-medium" htmlFor="contact-name">Tu nombre<input id="contact-name" name="name" autoComplete="name" required maxLength={120} placeholder="Nombre y apellido" className={field} /></label>
            <label className="text-sm font-medium" htmlFor="contact-email">Email<input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="Tu correo electrónico" className={field} /></label>
            <fieldset>
              <legend className="text-sm font-medium">¿Qué tenés en mente?</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Stands y eventos", "Espacios comerciales", "Exhibidores", "Asesoramiento", "Otro proyecto"].map((service) => (
                  <label key={service} className="relative cursor-pointer">
                    <input type="radio" name="service" value={service} required className="peer sr-only" />
                    <span className="block rounded-full border border-black/15 px-4 py-2.5 text-sm transition-colors hover:border-black/50 peer-checked:border-[#191919] peer-checked:bg-[#191919] peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-black">{service}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="text-sm font-medium" htmlFor="contact-message">Más sobre tu proyecto<textarea id="contact-message" name="message" required maxLength={3000} rows={4} placeholder="Contanos qué necesitás, dónde y para cuándo." className={`${field} resize-y`} /></label>
          </div>
          <button type="submit" className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#191919] px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#ef3b32] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ef3b32]">Preparar correo<FiArrowUpRight size={18} /></button>
          <p className="mt-4 text-xs leading-relaxed text-[#68686b]" role="status">{prepared ? "Correo preparado. Completá el envío desde tu aplicación de email. Si no se abrió, escribinos a hola@kairosbeluga.com." : "Se abrirá tu aplicación de email con el mensaje listo para enviar."}</p>
        </form>
      </div>
    </section>
  );
}
