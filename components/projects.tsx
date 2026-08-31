import Image from "next/image";

const projects = [
  {
    number: "01",
    name: "Vicente Tamari",
    category: "Stand comercial",
    location: "Buenos Aires, Argentina",
    year: "2025",
    image: "/hero.jpg",
    position: "center",
    description: "Diseño, fabricación y montaje integral de un espacio pensado para recibir, comunicar y operar.",
  },
  {
    number: "02",
    name: "Expansión retail",
    category: "Locales comerciales",
    location: "Argentina",
    year: "2024",
    image: "/hero-venue-4k.jpg",
    position: "center",
    description: "Una ejecución coordinada de punta a punta para transformar una identidad de marca en un espacio real.",
  },
  {
    number: "03",
    name: "Presencia de marca",
    category: "Góndolas y exhibición",
    location: "Buenos Aires, Argentina",
    year: "2024",
    image: "/hero.jpg",
    position: "left center",
    description: "Soluciones de exhibición precisas, funcionales y listas para integrarse al ritmo del punto de venta.",
  },
];

export function Projects() {
  return (
    <section id="proyectos" className="projects-section bg-[#f5f4f0] pb-10 text-[#141411] md:pb-20">
      <header className="mx-auto grid w-[calc(100%-32px)] max-w-[1600px] gap-10 py-24 md:grid-cols-[0.72fr_1.28fr] md:px-10 md:py-32">
        <p className="text-sm font-semibold uppercase tracking-[-0.02em]">
          <span className="text-[#777772]">&#123;</span> PROYECTOS <span className="text-[#777772]">&#125;</span>
        </p>
        <h2 className="max-w-[920px] text-[clamp(3.25rem,6vw,7rem)] font-medium leading-[0.92] tracking-[-0.065em]">
          Espacios que hacen avanzar marcas.
        </h2>
      </header>

      <div className="projects-list mx-auto w-[calc(100%-24px)] max-w-[1600px] md:w-[calc(100%-40px)]">
        {projects.map((project) => (
          <article key={project.number} className="project-stage relative h-[100svh] min-h-[620px] overflow-visible">
            <div className="project-zoom-card relative h-full w-full overflow-hidden bg-[#161616] text-white will-change-transform">
              <Image
                src={project.image}
                alt={`${project.category}: ${project.name}`}
                fill
                quality={100}
                sizes="(max-width: 768px) 100vw, 1600px"
                className="project-image object-cover"
                style={{ objectPosition: project.position }}
              />
              <div className="absolute inset-0 bg-black/25" />
              <div className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

              <div className="absolute left-5 top-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.12em] md:left-8 md:top-8 md:text-sm">
                <span>{project.number}</span>
                <span className="h-px w-8 bg-white/70" />
                <span>{project.category}</span>
              </div>

              <div className="absolute right-5 top-5 text-right text-[11px] font-medium uppercase leading-[1.35] tracking-[0.1em] md:right-8 md:top-8 md:text-sm">
                <p>{project.location}</p>
                <p>{project.year}</p>
              </div>

              <div className="absolute inset-x-5 bottom-6 grid items-end gap-6 md:inset-x-8 md:bottom-8 md:grid-cols-[1.5fr_0.5fr]">
                <h3 className="max-w-[1050px] text-[clamp(3.5rem,8.2vw,9rem)] font-medium leading-[0.8] tracking-[-0.075em]">
                  {project.name}
                </h3>
                <p className="max-w-[390px] text-sm font-medium leading-[1.45] tracking-[-0.02em] text-white/90 md:pb-2 md:text-base">
                  {project.description}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
