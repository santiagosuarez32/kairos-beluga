"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiChevronLeft, FiChevronRight, FiMaximize2, FiX, FiZoomIn, FiZoomOut } from "react-icons/fi";

function AnimatedHeading({ children }: { children: string }) {
  return (
    <>
      {children.split(" ").map((word, wordIndex, words) => (
        <span key={`${word}-${wordIndex}`}>
          <span className="max-md:inline-block max-md:whitespace-nowrap">
            {Array.from(word).map((letter, index) => (
              <span key={index} className="project-heading-letter inline-block">{letter}</span>
            ))}
          </span>
          {wordIndex < words.length - 1 && <span className="project-heading-letter inline-block">{"\u00A0"}</span>}
        </span>
      ))}
    </>
  );
}



import { projects, type Project } from "@/lib/projects";


function PhotoViewer({ project, activeImage, onChange, onClose }: { project: Project; activeImage: number; onChange: (direction: number) => void; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog?.showModal();
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    setZoomed(false);
    viewportRef.current?.scrollTo(0, 0);
  }, [activeImage]);

  return createPortal(
    <dialog ref={dialogRef} aria-labelledby={`photo-title-${project.number}`}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") { event.preventDefault(); onChange(-1); }
        if (event.key === "ArrowRight") { event.preventDefault(); onChange(1); }
      }}
      className="fixed inset-0 m-0 h-[100dvh] max-h-none w-screen max-w-none border-0 bg-[#111]/95 p-0 font-host text-white backdrop:bg-black/80">
      <div data-lenis-prevent className="flex h-full flex-col px-3 pb-[max(12px,env(safe-area-inset-bottom))] pt-[max(12px,env(safe-area-inset-top))] md:px-6 md:py-5">
        <header className="flex shrink-0 items-center justify-between gap-3 pb-3">
          <div className="min-w-0">
            <h2 id={`photo-title-${project.number}`} className="truncate text-base font-medium md:text-xl">{project.name}</h2>
            <p aria-live="polite" className="mt-1 text-xs text-white/65 md:text-sm">{project.phases[activeImage]} · {activeImage + 1} / {project.images.length}</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button type="button" onClick={() => setZoomed((value) => !value)} aria-label={zoomed ? "Reducir foto" : "Ampliar detalle"} aria-pressed={zoomed} className="grid size-11 place-items-center rounded-full bg-white/10 transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">{zoomed ? <FiZoomOut size={22} /> : <FiZoomIn size={22} />}</button>
            <button type="button" onClick={onClose} aria-label="Cerrar visor" className="grid size-11 place-items-center rounded-full bg-white/10 transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"><FiX size={24} /></button>
          </div>
        </header>
        <div ref={viewportRef} className="relative min-h-0 flex-1 overflow-auto overscroll-contain" data-lenis-prevent
          onTouchStart={(event) => { touchStart.current = !zoomed && event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null; }}
          onTouchEnd={(event) => {
            const start = touchStart.current;
            touchStart.current = null;
            if (!start || zoomed || !event.changedTouches[0]) return;
            const dx = event.changedTouches[0].clientX - start.x;
            const dy = event.changedTouches[0].clientY - start.y;
            if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) onChange(dx < 0 ? 1 : -1);
          }}>
          <div className={`relative ${zoomed ? "h-[200%] w-[200%]" : "h-full w-full"}`}>
            <Image src={project.images[activeImage]} alt={`${project.name}: ${project.phases[activeImage]}`} fill unoptimized quality={100} sizes="100vw" className="object-contain" />
          </div>
        </div>
        <nav aria-label="Navegación de fotos" className="flex shrink-0 items-center justify-between gap-4 pt-3">
          <button type="button" onClick={() => onChange(-1)} aria-label="Foto anterior" className="flex min-h-11 items-center gap-2 rounded-full bg-white/10 px-4 text-sm transition hover:bg-white/20"><FiChevronLeft size={22} /><span>Anterior</span></button>
          <span className="text-xs text-white/60">{activeImage + 1} / {project.images.length}</span>
          <button type="button" onClick={() => onChange(1)} aria-label="Foto siguiente" className="flex min-h-11 items-center gap-2 rounded-full bg-white/10 px-4 text-sm transition hover:bg-white/20"><span>Siguiente</span><FiChevronRight size={22} /></button>
        </nav>
      </div>
    </dialog>, document.body,
  );
}

export function ProjectCard({ project, layout = "card" }: { project: Project; layout?: "card" | "detail" }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const images = project.images ?? [project.image];
  const [activeImage, setActiveImage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const hasGallery = images.length > 1;
  const phase = project.phases[activeImage];

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting && entry.intersectionRatio >= 0.35);
    }, { threshold: [0, 0.35] });
    observer.observe(card);
    const updateTabVisibility = () => setIsTabVisible(!document.hidden);
    updateTabVisibility();
    document.addEventListener("visibilitychange", updateTabVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateTabVisibility);
    };
  }, []);

  useEffect(() => {
    if (layout === "detail" || !hasGallery || !isVisible || !isTabVisible || viewerOpen) return;
    const timer = window.setTimeout(() => {
      setActiveImage((current) => (current + 1) % images.length);
    }, 2500);
    return () => window.clearTimeout(timer);
  }, [activeImage, hasGallery, images.length, isVisible, isTabVisible, viewerOpen, layout]);

  const changeImage = (direction: number) => {
    setActiveImage((current) => (current + direction + images.length) % images.length);
  };

  if (layout === "detail") return (
    <article className="grid items-center gap-8 border-t border-black/15 py-10 md:py-14 lg:grid-cols-2 lg:gap-12">
      <div ref={cardRef} className="min-w-0">
        <button ref={openButtonRef} type="button" onClick={() => setViewerOpen(true)} aria-label={`Ampliar foto de ${project.name}`} className="group relative block h-[280px] w-full cursor-zoom-in overflow-hidden rounded-[28px] bg-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ef3b32] md:h-[440px]">
          <Image src={images[activeImage]} alt={`${project.name}: ${phase}`} fill unoptimized sizes="(max-width: 1024px) 100vw, 640px" className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" style={{ objectPosition: project.position }} />
          <span className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-black/15 bg-[#f7f7f5] px-5 py-3 text-sm font-medium tracking-[-0.03em] text-[#191919]"><FiMaximize2 size={17} aria-hidden="true" />Ver foto</span>
        </button>
        <div className="mt-3 grid grid-cols-4 gap-3" aria-label={`Fotos de ${project.name}`}>
          {images.map((image, imageIndex) => <button key={image} type="button" onClick={() => setActiveImage(imageIndex)} aria-label={`Ver foto ${imageIndex + 1}: ${project.phases[imageIndex]}`} aria-pressed={activeImage === imageIndex} className={`relative h-16 overflow-hidden rounded-2xl border transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ef3b32] md:h-[84px] ${activeImage === imageIndex ? "border-[#ef3b32] ring-1 ring-[#ef3b32]" : "border-black/15 opacity-60 hover:opacity-100"}`}><Image src={image} alt="" fill unoptimized sizes="160px" className="object-cover" /></button>)}
        </div>
      </div>
      <div className="min-w-0 space-y-5">
        
        <div className="flex flex-wrap items-stretch gap-2">{[project.location, project.year, project.surface, phase].filter(Boolean).map((value, valueIndex) => <span key={valueIndex} className="inline-flex min-h-10 items-center justify-center whitespace-nowrap rounded-2xl border border-black/20 px-3.5 py-2 text-center text-sm leading-[1.35] tracking-[-0.02em] text-[#4b4b49]">{value.replace(/\n/g, " · ")}</span>)}</div>
        <h3 className="text-[clamp(2rem,3.4vw,3.5rem)] font-medium leading-[1.02] tracking-[-0.05em]">{project.name}</h3>
        {project.name.includes("Multimarca") && <p className="text-sm leading-relaxed text-black/55">{project.brands}</p>}
        <p className="text-base leading-relaxed tracking-[-0.02em] text-[#4b4b49] md:text-lg">{project.description}</p>
        <p className="text-sm text-black/55">Contratado por: <strong className="font-medium text-[#191919]">{project.contractor}</strong></p>
      </div>
      {viewerOpen && <PhotoViewer project={project} activeImage={activeImage} onChange={changeImage} onClose={() => { setViewerOpen(false); openButtonRef.current?.focus({ preventScroll: true }); }} />}
    </article>
  );

  return (
    <article className="project-stage relative h-[calc(68svh-16px)] min-h-[464px] overflow-visible pt-4 md:h-[calc(100svh-120px)] md:min-h-[500px] md:pt-6">
      <div ref={cardRef} className="project-zoom-card relative h-full w-full overflow-hidden rounded-[28px] bg-[#161616] text-white will-change-transform">
        <button ref={openButtonRef} type="button" onClick={() => setViewerOpen(true)} aria-label={`Abrir foto de ${project.name} en pantalla completa`} className="absolute inset-0 z-[1] cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white" />
        <button type="button" onClick={() => setViewerOpen(true)} aria-label={`Ampliar foto de ${project.name}`} className="absolute left-5 top-5 z-10 flex min-h-11 items-center gap-2 rounded-full border border-white/25 bg-black/30 px-3 text-xs text-white backdrop-blur-md transition hover:bg-black/60 md:left-8 md:top-8 md:px-4 md:text-sm"><FiMaximize2 size={17} /><span>Ver foto</span></button>
        {images.map((image, index) => (
          <Image
            key={image}
            src={image}
            alt={index === activeImage ? `${project.category}: ${project.name}` : ""}
            aria-hidden={index !== activeImage}
            fill
            priority={project.number === "01" && index === 0}
            loading={project.number === "01" && index === 0 ? undefined : "lazy"}
            unoptimized
            quality={100}
            sizes="(max-width: 768px) 100vw, 1600px"
            className={`project-image pointer-events-none object-cover transition-opacity duration-500 ease-out ${index === activeImage ? "opacity-100" : "opacity-0"}`}
            style={{ objectPosition: project.position }}
          />
        ))}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black/10" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/20" />

        <div className="pointer-events-none absolute inset-x-5 top-16 z-[2] text-center text-[12px] font-normal leading-[1.35] tracking-[-0.5px] md:inset-x-auto md:right-8 md:top-8 md:text-right md:text-[18px]">
          <p className="whitespace-pre-line">{project.location}</p>
          {project.year && <p>{project.year}</p>}
          <p>{project.surface}</p>
        </div>

        {hasGallery && (
          <div className="absolute inset-x-5 top-1/2 z-10 flex -translate-y-1/2 items-center justify-between md:inset-x-8">
            <button type="button" onClick={() => changeImage(-1)} aria-label="Foto anterior" className="p-3 text-white/60 drop-shadow-lg transition hover:scale-105 hover:text-white" title="Foto anterior"><FiChevronLeft className="size-7 md:size-10" strokeWidth={1} /></button>
            <button type="button" onClick={() => changeImage(1)} aria-label="Foto siguiente" className="p-3 text-white/60 drop-shadow-lg transition hover:scale-105 hover:text-white" title="Foto siguiente"><FiChevronRight className="size-7 md:size-10" strokeWidth={1} /></button>
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-5 bottom-6 z-[2] grid items-end gap-5 text-center md:inset-x-8 md:bottom-8 md:grid-cols-[1.5fr_0.5fr] md:text-left">
          <div>
            {hasGallery && <p className="mb-4 text-[17px] font-medium leading-[1.35] tracking-[-0.5px] text-white underline decoration-white/80 decoration-1 underline-offset-[6px] md:text-[21px]">{phase}</p>}
            <h3 className={`max-w-[1050px] font-medium leading-[0.9] tracking-[-0.075em] ${project.name.length > 15 ? "text-[clamp(1.75rem,4vw,4.25rem)]" : "text-[clamp(3rem,7vw,7.5rem)]"}`}>{project.name}</h3>
          </div>
          <div className="mx-auto max-w-[330px] md:mx-0 md:max-w-[390px]">
            {project.name.includes("Multimarca") && <p className="mb-2 text-xs font-medium leading-relaxed text-white/85">{project.brands}</p>}
            <p className="whitespace-pre-line text-sm font-medium leading-[1.45] tracking-[-0.02em] text-white/90 md:text-base">{project.description}</p>
            <p className="mt-2 text-xs leading-relaxed text-white/70">Contratado por: {project.contractor}</p>
            {hasGallery && <div className="mt-4 flex justify-center gap-1.5 md:justify-start">{images.map((_, index) => <span key={index} className={`h-1.5 rounded-full transition-all ${index === activeImage ? "w-6 bg-white" : "w-1.5 bg-white/50"}`} />)}</div>}
          </div>
        </div>
      </div>
      {viewerOpen && <PhotoViewer project={project} activeImage={activeImage} onChange={changeImage} onClose={() => { setViewerOpen(false); openButtonRef.current?.focus({ preventScroll: true }); }} />}
    </article>
  );
}

export function Projects() {


  return (
    <section id="proyectos" className="projects-section font-host bg-[#f7f7f5] pb-10 text-[#141411] md:pb-20">
      <header className="section-heading-layout pb-4 pt-12 md:pb-5 md:pt-16">
        <p className="text-[18px] font-medium uppercase leading-7 tracking-[-0.5px] text-[#191919] md:text-[20px]">
          <span className="text-[#ef3b32]">&#123;</span> PROYECTOS <span className="text-[#ef3b32]">&#125;</span>
        </p>
        <h2 className="text-[clamp(1.6rem,3.1vw,2.875rem)] md:text-[clamp(1.3rem,2.9vw,2.75rem)] font-medium leading-[1.02] tracking-[-0.05em]">
          <AnimatedHeading>Espacios que hacen destacar.</AnimatedHeading>
        </h2>
      </header>

      <div className="projects-list mx-auto w-[calc(100%-24px)] max-w-[1600px] md:w-[calc(100%-40px)]">
        {projects.map((project) => <ProjectCard key={project.number} project={project} />)}
      </div>
    </section>
  );
}
