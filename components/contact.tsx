"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { FiArrowUpRight, FiCheck, FiChevronDown, FiInstagram, FiMail, FiMapPin } from "react-icons/fi";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { SmoothInput, SmoothTextarea } from "@/components/ui/smooth-field";

type FieldName = "name" | "email" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;

function validateField(field: HTMLInputElement | HTMLTextAreaElement): string {
  const value = field.value.trim();
  if (!value) return { name: "Ingresá tu nombre.", email: "Ingresá tu email.", message: "Contanos un poco sobre tu proyecto." }[field.name as FieldName];
  if (field.name === "name" && value.length < 2) return "Ingresá al menos 2 caracteres.";
  if (field.name === "email" && (field.validity.typeMismatch || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))) return "Ingresá un email válido, por ejemplo nombre@dominio.com.";
  if (field.name === "message" && value.length < 10) return "Agregá un poco más de detalle (al menos 10 caracteres).";
  if (field.maxLength > 0 && value.length > field.maxLength) return `Usá hasta ${field.maxLength} caracteres.`;
  return "";
}

export function Contact() {
  const [prepared, setPrepared] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [validFields, setValidFields] = useState<Partial<Record<FieldName, boolean>>>({});
  const services = ["Stands y eventos", "Espacios comerciales", "Exhibidores", "Asesoramiento", "Otro proyecto"];
  const [service, setService] = useState("");
  const [serviceOpen, setServiceOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [serviceError, setServiceError] = useState(false);
  const serviceMenu = useRef<HTMLDivElement>(null);
  const serviceButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!serviceOpen) return;
    const closeOutside = (event: PointerEvent) => {
      if (!serviceMenu.current?.contains(event.target as Node)) setServiceOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [serviceOpen]);

  function chooseService(value: string) {
    setService(value);
    setServiceError(false);
    setServiceOpen(false);
    serviceButton.current?.focus();
  }
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const nextErrors: FieldErrors = {};
    const nextValid: Partial<Record<FieldName, boolean>> = {};
    for (const name of ["name", "email", "message"] as const) {
      const input = form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement;
      const error = validateField(input);
      nextValid[name] = !error;
      if (error) nextErrors[name] = error;
    }
    setErrors(nextErrors);
    setValidFields(nextValid);
    setServiceError(!service);
    setPrepared(false);
    if (Object.keys(nextErrors).length || !service) {
      const first = nextErrors.name ? "name" : nextErrors.email ? "email" : !service ? "service" : "message";
      if (first === "service") {
        setServiceOpen(true);
        serviceButton.current?.focus();
      } else {
        (form.elements.namedItem(first) as HTMLElement)?.focus();
      }
      return;
    }
    const data = new FormData(form);
    for (const name of ["name", "email", "message"]) data.set(name, String(data.get(name) ?? "").trim());
    const subject = `Nuevo proyecto: ${data.get("service")}`;
    const body = `Nombre: ${data.get("name")}\nEmail: ${data.get("email")}\nTipo de proyecto: ${data.get("service")}\n\n${data.get("message")}`;
    window.location.href = `mailto:kairosbeluga@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setPrepared(true);
  }
  const field = "mt-2 w-full rounded-none border-0 border-b border-black/15 bg-transparent px-0 pb-2.5 text-base font-normal leading-[var(--text-leading)] tracking-[-0.02em] text-[#191919] placeholder:text-[#818187] focus:border-[#ef3b32] focus:outline-none focus:ring-0 aria-[invalid=true]:border-[#ef3b32]";
  function validationProps(name: FieldName) {
    return {
      "data-valid": validFields[name] ? "true" : undefined,
      "aria-invalid": Boolean(errors[name]),
      "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
      onBlur: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const error = validateField(event.currentTarget);
        setValidFields((previous) => ({ ...previous, [name]: !error }));
        setErrors((previous) => ({ ...previous, [name]: error }));
      },
      onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPrepared(false);
        const error = validateField(event.currentTarget);
        setValidFields((previous) => ({ ...previous, [name]: !error }));
        if (errors[name]) {
          setErrors((previous) => ({ ...previous, [name]: error }));
        }
      },
    };
  }
  const errorMessage = (name: FieldName) => errors[name] && <span id={`contact-${name}-error`} role="status" className="mt-2 block text-xs font-normal leading-[var(--text-leading)] text-[#ba2922]">{errors[name]}</span>;
  return (
    <section id="contacto" aria-labelledby="contact-title" className="scroll-mt-24 bg-[#f7f7f5] px-3 pb-16 font-host md:px-5 md:pb-24">
      <div className="contact-panel relative isolate mx-auto grid max-w-[1400px] gap-12 overflow-hidden rounded-[32px] p-6 md:grid-cols-2 md:gap-10 md:p-12 lg:p-14">
        <div aria-hidden="true" className="contact-ribbon pointer-events-none absolute inset-0 -z-10" />
        <div className="flex flex-col gap-8">
          <div>

            <h2 id="contact-title" className="max-w-[580px] text-[clamp(2rem,2.7vw,2.75rem)] font-medium leading-[var(--text-leading)] tracking-[-0.065em]">Construyamos<br /><span className="whitespace-nowrap">tu próximo espacio.</span></h2>
          </div>
          <div className="contact-details grid gap-4 text-base tracking-[-0.03em]">
            <a href="mailto:kairosbeluga@gmail.com" className="group flex items-center gap-4">
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl border border-white/70 bg-white/60 backdrop-blur-md"><FiMail size={22} aria-hidden="true" /></span>
              <span><span className="block font-medium">Escribinos</span><span className="break-all group-hover:underline">kairosbeluga@gmail.com</span></span>
            </a>
            <div className="flex items-center gap-4"><span className="grid size-14 shrink-0 place-items-center rounded-2xl border border-white/70 bg-white/60 backdrop-blur-md"><FiMapPin size={22} aria-hidden="true" /></span><span><span className="block font-medium">Dónde estamos</span>Canning, Buenos Aires, Argentina</span></div>
            <div className="flex items-center gap-4">
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl border border-white/70 bg-white/60 backdrop-blur-md"><FaWhatsapp size={24} aria-hidden="true" /></span>
              <span className="flex flex-col">
                <span className="font-medium">WhatsApp</span>
                <a href="https://wa.me/5491136401776" target="_blank" rel="noreferrer" className="hover:underline">+54 9 11 3640-1776</a>
                <a href="https://wa.me/5491166753340" target="_blank" rel="noreferrer" className="hover:underline">+54 9 11 6675-3340</a>
              </span>
            </div>
            <nav aria-label="Redes sociales" className="grid gap-4">
              <a href="https://www.instagram.com/kairosbeluga/" target="_blank" rel="noreferrer" className="group flex items-center gap-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl border border-white/70 bg-white/60 backdrop-blur-md transition group-hover:bg-white/85"><FiInstagram size={23} aria-hidden="true" /></span>
                <span className="group-hover:underline"><span className="font-medium">Instagram:</span> Kairos Beluga</span>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61589620041589" target="_blank" rel="noreferrer" className="group flex items-center gap-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl border border-white/70 bg-white/60 backdrop-blur-md transition group-hover:bg-white/85"><FaFacebookF size={20} aria-hidden="true" /></span>
                <span className="group-hover:underline"><span className="font-medium">Facebook:</span> Kairos Beluga Constructora</span>
              </a>
            </nav>
          </div>
        </div>
        <form noValidate onSubmit={handleSubmit} className="contact-form min-w-0 self-start rounded-[26px] border border-white/80 bg-[#f7f7f8] p-5 md:p-7 lg:p-8">
          <h3 className="mb-5 text-[clamp(1.7rem,2.5vw,2.4rem)] font-medium leading-tight tracking-[-0.055em]">Contanos tu idea</h3>
          <div className="grid gap-4">
            <label className="text-sm font-medium" htmlFor="contact-name">Tu nombre<SmoothInput id="contact-name" name="name" autoComplete="name" required minLength={2} maxLength={120} placeholder="Nombre y apellido" className={field} {...validationProps("name")} />{errorMessage("name")}</label>
            <label className="text-sm font-medium" htmlFor="contact-email">Email<input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="Tu correo electrónico" className={field} {...validationProps("email")} />{errorMessage("email")}</label>
            <div ref={serviceMenu} className="relative">
              <label id="contact-service-label" htmlFor="contact-service" className="text-sm font-medium">¿Qué tenés en mente?</label>
              <input type="hidden" name="service" value={service} />
              <button
                ref={serviceButton} id="contact-service" type="button" role="combobox"
                aria-labelledby="contact-service-label" aria-expanded={serviceOpen}
                aria-controls="contact-service-options" aria-haspopup="listbox" aria-required="true"
                aria-invalid={serviceError} aria-describedby={serviceError ? "contact-service-error" : undefined}
                aria-activedescendant={serviceOpen ? `service-option-${activeService}` : undefined}
                onClick={() => { setActiveService(Math.max(0, services.indexOf(service))); setServiceOpen((open) => !open); }}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                    event.preventDefault();
                    setServiceOpen(true);
                    setActiveService((index) => serviceOpen ? (index + (event.key === "ArrowDown" ? 1 : -1) + services.length) % services.length : Math.max(0, services.indexOf(service)));
                  } else if (serviceOpen && (event.key === "Enter" || event.key === " ")) {
                    event.preventDefault(); chooseService(services[activeService]);
                  } else if (event.key === "Escape" || event.key === "Tab") {
                    setServiceOpen(false);
                  } else if (serviceOpen && (event.key === "Home" || event.key === "End")) {
                    event.preventDefault(); setActiveService(event.key === "Home" ? 0 : services.length - 1);
                  }
                }}
                className={`mt-2 flex w-full items-center justify-between gap-3 rounded-2xl border bg-white/60 px-4 py-3 text-left text-base font-normal tracking-[-0.02em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ef3b32] ${serviceOpen || serviceError ? "border-[#ef3b32]" : "border-black/15 hover:border-black/35"}`}
              >
                <span className={service ? "text-[#191919]" : "text-[#818187]"}>{service || "Seleccioná una opción"}</span>
                <FiChevronDown aria-hidden="true" className={`shrink-0 transition-transform duration-200 ${serviceOpen ? "rotate-180" : ""}`} size={18} />
              </button>
              {serviceOpen && (
                <div id="contact-service-options" role="listbox" aria-labelledby="contact-service-label" className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-black/10 bg-[#f7f7f8] p-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.12)]">
                  {services.map((option, index) => (
                    <div key={option} id={`service-option-${index}`} role="option" aria-selected={service === option}
                      onPointerDown={(event) => event.preventDefault()} onClick={() => chooseService(option)} onPointerMove={() => setActiveService(index)}
                      className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm font-normal transition-colors ${activeService === index ? "bg-[#191919] text-white" : "text-[#191919]"}`}>
                      {option}{service === option && <FiCheck size={16} aria-hidden="true" />}
                    </div>
                  ))}
                </div>
              )}
              {serviceError && <p id="contact-service-error" className="mt-2 text-xs text-[#ef3b32]">Seleccioná el tipo de proyecto.</p>}
            </div>
            <label className="text-sm font-medium" htmlFor="contact-message">Más sobre tu proyecto<SmoothTextarea id="contact-message" name="message" required minLength={10} maxLength={3000} rows={3} placeholder="Contanos qué necesitás, dónde y para cuándo." className={`${field} resize-y`} {...validationProps("message")} />{errorMessage("message")}</label>
          </div>
          <button type="submit" className="mt-5 inline-flex items-center gap-3 rounded-full bg-[#191919] px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#ef3b32] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ef3b32]">Preparar correo<FiArrowUpRight size={18} /></button>
          <p className="mt-3 text-xs text-[#68686b]" role="status">{prepared ? "Correo preparado. Completá el envío desde tu aplicación de email. Si no se abrió, escribinos a kairosbeluga@gmail.com." : "Se abrirá tu aplicación de email con el mensaje listo para enviar."}</p>
        </form>
      </div>
    </section>
  );
}
