"use client";

import Image from "next/image";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function AnimatedHeading({ children }: { children: string }) {
  return (
    <>
      {Array.from(children).map((letter, index) => (
        <span key={`${letter}-${index}`} className="project-heading-letter inline-block">
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </>
  );
}

const projects = [
  {
    number: "01",
    name: "Barbieri",
    category: "Stand",
    location: "Expo Batev · La Rural",
    year: "2026",
    image: "/pdf-projects/barbieri-render-hq.jpg",
    images: [
      "/pdf-projects/barbieri-render-hq.jpg", "/pdf-projects/barbieri-process-page-hq.jpg", "/pdf-projects/barbieri-reality-page-hq.jpg",
    ],
    position: "center",
    description: "Del render a la realidad: un stand pensado para construir una presencia sólida, funcional y memorable.",
  },
  {
    number: "02",
    name: "VTH",
    category: "Stand",
    location: "Expo Automechanika · La Rural",
    year: "2026",
    image: "/pdf-projects/vth-render-hq.jpg",
    images: [
      "/pdf-projects/vth-render-hq.jpg", "/pdf-projects/vth-process-page-hq.jpg", "/pdf-projects/vth-reality-page-hq.jpg",
    ],
    position: "center",
    description: "Del render a la realidad: recorridos, iluminación y detalles constructivos puestos al servicio de la marca.",
  },
  {
    number: "03",
    name: "Argental",
    category: "Stand",
    location: "Expo FITHEP · La Rural",
    year: "2026",
    image: "/pdf-projects/argental-render-hq.jpg",
    images: [
      "/pdf-projects/argental-render-hq.jpg", "/pdf-projects/argental-process-page-hq.jpg", "/pdf-projects/argental-reality-page-hq.jpg",
    ],
    position: "center",
    description: "Del render a la realidad: una arquitectura abierta, funcional y preparada para recibir.",
  },
  {
    number: "04",
    name: "Fera",
    category: "Stand",
    location: "Feria del Libro · La Rural",
    year: "2026",
    image: "/pdf-projects/fera-render-hq.jpg",
    images: [
      "/pdf-projects/fera-render-hq.jpg", "/pdf-projects/fera-process-page-hq.jpg", "/pdf-projects/fera-reality-page-hq.jpg",
    ],
    position: "center",
    description: "Del render a la realidad: una experiencia de marca inmersiva, cálida y llena de detalle.",
  },
  {
    number: "05",
    name: "Biferdil",
    category: "Góndola",
    location: "Shopping Alto Avellaneda",
    year: "2025",
    image: "/pdf-projects/biferdil-render-hq.jpg",
    images: [
      "/pdf-projects/biferdil-render-hq.jpg", "/pdf-projects/biferdil-process-page-hq.jpg", "/pdf-projects/biferdil-reality-page-hq.jpg",
    ],
    position: "center",
    description: "Del render a la realidad: una góndola que transforma exhibición, recorrido e identidad de producto.",
  },
];

type Project = (typeof projects)[number];

function ProjectCard({ project }: { project: Project }) {
  const images = project.images ?? [project.image];
  const [activeImage, setActiveImage] = useState(0);
  const hasGallery = images.length > 1;
  const phase = activeImage === 0 ? "Del render" : activeImage === images.length - 1 ? "A la realidad" : "Proceso constructivo";
  const changeImage = (direction: number) => {
    setActiveImage((current) => (current + direction + images.length) % images.length);
  };

  return (
    <article className="project-stage relative h-[100svh] min-h-[620px] overflow-visible pt-24 md:pt-36">
      <div className="project-zoom-card relative h-full w-full overflow-hidden rounded-[28px] bg-[#161616] text-white will-change-transform">
        {images.map((image, index) => (
          <Image
            key={image}
            src={image}
            alt={index === activeImage ? `${project.category}: ${project.name}` : ""}
            aria-hidden={index !== activeImage}
            fill
            priority={index === 0}
            loading={index === 0 ? undefined : "eager"}
            quality={100}
            sizes="(max-width: 768px) 100vw, 1600px"
            className={`project-image pointer-events-none object-cover transition-opacity duration-500 ease-out ${index === activeImage ? "opacity-100" : "opacity-0"}`}
            style={{ objectPosition: project.position }}
          />
        ))}
        <div className="absolute inset-0 bg-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/10" />

        <div className="absolute left-5 top-5 flex items-center gap-3 text-[14px] font-normal leading-[1.35] tracking-[-0.5px] md:left-8 md:top-8 md:text-[18px]">
          <span>{project.number}</span>
          <span className="h-px w-8 bg-white/70" />
          <span>{project.category}</span>
        </div>

        <div className="absolute right-5 top-5 text-right text-[14px] font-normal leading-[1.35] tracking-[-0.5px] md:right-8 md:top-8 md:text-[18px]">
          <p>{project.location}</p>
          <p>{project.year}</p>
        </div>

        {hasGallery && (
          <div className="absolute inset-x-5 top-1/2 z-10 flex -translate-y-1/2 items-center justify-between md:inset-x-8">
            <button type="button" onClick={() => changeImage(-1)} aria-label="Foto anterior" className="p-3 text-white/60 drop-shadow-lg transition hover:scale-105 hover:text-white" title="Foto anterior"><FiChevronLeft className="size-7 md:size-10" strokeWidth={1} /></button>
            <button type="button" onClick={() => changeImage(1)} aria-label="Foto siguiente" className="p-3 text-white/60 drop-shadow-lg transition hover:scale-105 hover:text-white" title="Foto siguiente"><FiChevronRight className="size-7 md:size-10" strokeWidth={1} /></button>
          </div>
        )}

        <div className="absolute inset-x-5 bottom-6 grid items-end gap-6 md:inset-x-8 md:bottom-8 md:grid-cols-[1.5fr_0.5fr]">
          <div>
            {hasGallery && <p className="mb-4 text-[17px] font-medium leading-[1.35] tracking-[-0.5px] text-white underline decoration-white/80 decoration-1 underline-offset-[6px] md:text-[21px]">{phase}</p>}
            <h3 className="max-w-[1050px] text-[clamp(3.5rem,8.2vw,9rem)] font-medium leading-[0.8] tracking-[-0.075em]">{project.name}</h3>
          </div>
          <div className="max-w-[390px]">
            <p className="whitespace-pre-line text-sm font-medium leading-[1.45] tracking-[-0.02em] text-white/90 md:text-base">{project.description}</p>
            {hasGallery && <div className="mt-4 flex gap-1.5">{images.map((_, index) => <span key={index} className={`h-1.5 rounded-full transition-all ${index === activeImage ? "w-6 bg-white" : "w-1.5 bg-white/50"}`} />)}</div>}
          </div>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section id="proyectos" className="projects-section font-host bg-[#f7f7f5] pb-10 text-[#141411] md:pb-20">
      <header className="mx-auto grid w-[calc(100%-32px)] max-w-[1600px] gap-10 py-24 md:grid-cols-[0.72fr_1.28fr] md:px-10 md:py-32">
        <p className="text-[18px] font-medium uppercase leading-7 tracking-[-0.5px] text-[#191919] md:text-[20px]">
          <span className="text-[#ef3b32]">&#123;</span> PROYECTOS <span className="text-[#ef3b32]">&#125;</span>
        </p>
        <h2 className="max-w-[920px] text-[clamp(3.25rem,6vw,7rem)] font-medium leading-[0.92] tracking-[-0.065em]">
          <AnimatedHeading>Espacios que hacen avanzar marcas.</AnimatedHeading>
        </h2>
      </header>

      <div className="projects-list mx-auto w-[calc(100%-24px)] max-w-[1600px] md:w-[calc(100%-40px)]">
        {projects.map((project) => <ProjectCard key={project.number} project={project} />)}
      </div>
    </section>
  );
}
