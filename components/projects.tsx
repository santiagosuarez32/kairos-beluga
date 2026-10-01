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

const projects = [
  {
    "number": "01",
    "name": "Avianca - Gol",
    "brands": "Avianca - Gol",
    "category": "Stand",
    "location": "Expo FIT",
    "year": "2026",
    "surface": "56 m²",
    "contractor": "BDG SA",
    "image": "/projects-hq/avianca-gol/01-hq.jpg",
    "images": [
      "/projects-hq/avianca-gol/01-hq.jpg",
      "/projects-hq/avianca-gol/02-hq.jpg",
      "/projects-hq/avianca-gol/03-hq.jpg",
      "/projects-hq/avianca-gol/04-hq.jpg"
    ],
    "phases": [
      "Obra terminada",
      "Obra terminada",
      "Montaje",
      "Construcción"
    ],
    "position": "center",
    "description": "Stand de aerolíneas con estructura de carpintería satinada, revestimientos corporativos, mostradores, señalética digital, iluminación integrada y áreas de atención al público."
  },
  {
    "number": "02",
    "name": "VTH",
    "brands": "VTH",
    "category": "Stand",
    "location": "Expo Automechanika",
    "year": "2026",
    "surface": "48 m²",
    "contractor": "Gauss Rubrican SA",
    "image": "/projects-hq/vth/01-hq.jpg",
    "images": [
      "/projects-hq/vth/01-hq.jpg",
      "/projects-hq/vth/02-hq.jpg",
      "/projects-hq/vth/03-hq.jpg",
      "/projects-hq/vth/04-hq.jpg"
    ],
    "phases": [
      "Obra terminada",
      "Montaje",
      "Proceso constructivo",
      "Render"
    ],
    "position": "center",
    "description": "Stand de gran impacto visual, con arcos envolventes de iluminación neón LED, pantalla publicitaria, con áreas de atención y sala de reuniones integrada."
  },
  {
    "number": "03",
    "name": "Medicube - Dr. Melaxin",
    "brands": "Medicube - Dr. Melaxin",
    "category": "Stand",
    "location": "Expo Pigmento Fest",
    "year": "2026",
    "surface": "58 m²",
    "contractor": "Mia Producciones",
    "image": "/projects-hq/medicube-dr-melaxin/01-hq.jpg",
    "images": [
      "/projects-hq/medicube-dr-melaxin/01-hq.jpg",
      "/projects-hq/medicube-dr-melaxin/02-hq.jpg",
      "/projects-hq/medicube-dr-melaxin/03-hq.jpg",
      "/projects-hq/medicube-dr-melaxin/04-hq.jpg"
    ],
    "phases": [
      "Obra terminada",
      "Medicube",
      "Dr. Melaxin",
      "Montaje"
    ],
    "position": "center",
    "description": "Stand multimarca, con mostrador curvo retroiluminado, cartelería de corpóreos neón y estructuras divisorias tubulares. Con predominancia de colores e iluminación para cada marca, respetando su autonomía y siguiendo con la estética de ambas."
  },
  {
    "number": "04",
    "name": "Cdimex · Multimarca",
    "brands": "Cher - Ben Simon - Sarkany - Tucci - Al Shams",
    "category": "Stand",
    "location": "Expo Pigmento Fest",
    "year": "2026",
    "surface": "48 m²",
    "contractor": "Gauss Rubrican SA",
    "image": "/projects-hq/cdimex-multimarca/02-hq.jpg",
    "images": [
      "/projects-hq/cdimex-multimarca/02-hq.jpg",
      "/projects-hq/cdimex-multimarca/01-hq.jpg",
      "/projects-hq/cdimex-multimarca/03-hq.jpg",
      "/projects-hq/cdimex-multimarca/04-hq.jpg"
    ],
    "phases": [
      "Obra terminada",
      "Obra terminada",
      "Montaje",
      "Construcción"
    ],
    "position": "center",
    "description": "Construcción de stand modular de tipo isla, con cenefa en altura, mostradores de exhibición vidriados y mobiliario a medida para marcas de lujo."
  },
  {
    "number": "05",
    "name": "Turopeo",
    "brands": "Turopeo",
    "category": "Stand",
    "location": "Expo FIT",
    "year": "2026",
    "surface": "28 m²",
    "contractor": "Gauss Rubrican SA",
    "image": "/projects-hq/turopeo/01-hq.jpg",
    "images": [
      "/projects-hq/turopeo/01-hq.jpg",
      "/projects-hq/turopeo/02-hq.jpg",
      "/projects-hq/turopeo/03-hq.jpg",
      "/projects-hq/turopeo/04-hq.jpg"
    ],
    "phases": [
      "Obra terminada",
      "Detalle",
      "Montaje",
      "Construcción"
    ],
    "position": "center",
    "description": "Stand de exposición con estructura modular, revestimientos gráficos, mostradores personalizados, iluminación decorativa y elementos vegetales integrados para atención y exhibición de marca."
  },
  {
    "number": "06",
    "name": "Barbieri",
    "brands": "Barbieri",
    "category": "Stand",
    "location": "Expo BATEV",
    "year": "2026",
    "surface": "110 m²",
    "contractor": "Gauss Rubrican SA",
    "image": "/projects-hq/barbieri/01-hq.jpg",
    "images": [
      "/projects-hq/barbieri/01-hq.jpg",
      "/projects-hq/barbieri/02-hq.jpg",
      "/projects-hq/barbieri/03-hq.jpg",
      "/projects-hq/barbieri/04-hq.jpg"
    ],
    "phases": [
      "Obra terminada",
      "Montaje",
      "Construcción",
      "Render"
    ],
    "position": "center",
    "description": "Construcción de stand con forma diamantada, trilogía de pórticos realizados a partir de los perfiles galvanizados de la marca, iluminación LED integrada y exhibidores de carpintería."
  },
  {
    "number": "07",
    "name": "Pantene - Herbal Essences",
    "brands": "Pantene - Herbal Essences",
    "category": "Stand",
    "location": "Expo Pigmento Fest",
    "year": "2026",
    "surface": "48 m²",
    "contractor": "New PGA",
    "image": "/projects-hq/pantene-herbal/01-hq.jpg",
    "images": [
      "/projects-hq/pantene-herbal/01-hq.jpg",
      "/projects-hq/pantene-herbal/02-hq.jpg",
      "/projects-hq/pantene-herbal/03-hq.jpg",
      "/projects-hq/pantene-herbal/04-hq.jpg"
    ],
    "phases": [
      "Obra terminada",
      "Obra terminada",
      "Montaje",
      "Construcción"
    ],
    "position": "center",
    "description": "Construcción de stand doble integrando ambas marcas, con carpintería premium, iluminación LED, estanterías iluminadas, área de interacción/photo opportunity y áreas de venta."
  },
  {
    "number": "08",
    "name": "Coty · Multimarca",
    "brands": "Rimmel - Calvin Klein - Adidas - Boss - Nautica - Davidoff - Sally Hansen",
    "category": "Stand",
    "location": "Expo Pigmento Fest",
    "year": "2026",
    "surface": "48 m²",
    "contractor": "Mia Producciones",
    "image": "/projects-hq/coty-multimarca/01-hq.jpg",
    "images": [
      "/projects-hq/coty-multimarca/01-hq.jpg",
      "/projects-hq/coty-multimarca/02-hq.jpg",
      "/projects-hq/coty-multimarca/03-hq.jpg",
      "/projects-hq/coty-multimarca/04-hq.jpg"
    ],
    "phases": [
      "Obra terminada",
      "Obra terminada",
      "Montaje",
      "Construcción"
    ],
    "position": "center",
    "description": "Construcción de stand interactivo, con activación en formato rueda de la fortuna, arcos iluminados, mostradores vidriados y sector promocional."
  },
  {
    "number": "09",
    "name": "Biferdil",
    "brands": "Biferdil",
    "category": "Góndola",
    "location": "Shopping Bendu",
    "year": "",
    "surface": "6 m²",
    "contractor": "Gauss Rubrican SA",
    "image": "/projects-hq/biferdil/01-hq.jpg",
    "images": [
      "/projects-hq/biferdil/01-hq.jpg",
      "/projects-hq/biferdil/02-hq.jpg",
      "/projects-hq/biferdil/03-hq.jpg",
      "/projects-hq/biferdil/04-hq.jpg"
    ],
    "phases": [
      "Obra terminada",
      "Construcción",
      "Construcción",
      "Render"
    ],
    "position": "center",
    "description": "Góndola comercial con estructura satinada simil laqueada, mobiliario personalizado, vitrinas iluminadas y detalles gráficos para exhibición y atención al público."
  },
  {
    "number": "10",
    "name": "Fera",
    "brands": "Fera",
    "category": "Stand",
    "location": "Expo Feria del Libro",
    "year": "2026",
    "surface": "12 m²",
    "contractor": "Gauss Rubrican SA",
    "image": "/projects-hq/fera/01-hq.jpg",
    "images": [
      "/projects-hq/fera/01-hq.jpg",
      "/projects-hq/fera/02-hq.jpg",
      "/projects-hq/fera/03-hq.jpg",
      "/projects-hq/fera/04-hq.jpg"
    ],
    "phases": [
      "Obra terminada",
      "Construcción",
      "Proceso constructivo",
      "Render"
    ],
    "position": "center",
    "description": "Stand con temática “bosque de fantasía”, con arcos de carpintería, vegetación colgante, iluminación LED cálida y estanterías iluminadas para una mejor exhibición de los libros y su venta."
  }
];

type Project = (typeof projects)[number];

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

function ProjectCard({ project }: { project: Project }) {
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
    if (!hasGallery || !isVisible || !isTabVisible || viewerOpen) return;
    const timer = window.setTimeout(() => {
      setActiveImage((current) => (current + 1) % images.length);
    }, 2500);
    return () => window.clearTimeout(timer);
  }, [activeImage, hasGallery, images.length, isVisible, isTabVisible, viewerOpen]);

  const changeImage = (direction: number) => {
    setActiveImage((current) => (current + direction + images.length) % images.length);
  };

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
          <p>{project.location}</p>
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
      <header className="mx-auto grid w-[calc(100%-32px)] max-w-[1600px] gap-6 pb-4 pt-12 md:grid-cols-[0.72fr_1.28fr] md:px-10 md:pb-5 md:pt-16">
        <p className="text-[18px] font-medium uppercase leading-7 tracking-[-0.5px] text-[#191919] md:text-[20px]">
          <span className="text-[#ef3b32]">&#123;</span> PROYECTOS <span className="text-[#ef3b32]">&#125;</span>
        </p>
        <h2 className="max-w-[920px] text-[clamp(1.3rem,2.9vw,2.75rem)] font-medium leading-[1.02] tracking-[-0.05em]">
          <AnimatedHeading>Espacios que hacen destacar.</AnimatedHeading>
        </h2>
      </header>

      <div className="projects-list mx-auto w-[calc(100%-24px)] max-w-[1600px] md:w-[calc(100%-40px)]">
        {projects.map((project) => <ProjectCard key={project.number} project={project} />)}
      </div>
    </section>
  );
}
