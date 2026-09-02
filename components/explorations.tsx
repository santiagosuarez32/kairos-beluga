import Image from "next/image";

const explorations = [
  {
    image: "/pdf-projects/barbieri-render-hq.jpg",
    alt: "Proyecto Barbieri",
    position: "center",
  },
  {
    image: "/pdf-projects/vth-render-hq.jpg",
    alt: "Proyecto VTH",
    position: "center",
  },
  {
    image: "/pdf-projects/argental-render-hq.jpg",
    alt: "Proyecto Argental",
    position: "center",
  },
  {
    image: "/pdf-projects/fera-render-hq.jpg",
    alt: "Proyecto Fera",
    position: "center",
  },
  {
    image: "/pdf-projects/biferdil-render-hq.jpg",
    alt: "Proyecto Biferdil",
    position: "center",
  },
  {
    image: "/pdf-projects/barbieri-render-hq.jpg",
    alt: "Proyecto Barbieri",
    position: "center",
  },
  {
    image: "/pdf-projects/vth-render-hq.jpg",
    alt: "Proyecto VTH",
    position: "center",
  },
  {
    image: "/pdf-projects/argental-render-hq.jpg",
    alt: "Proyecto Argental",
    position: "center",
  },
  {
    image: "/pdf-projects/fera-render-hq.jpg",
    alt: "Proyecto Fera",
    position: "center",
  },
  {
    image: "/pdf-projects/biferdil-render-hq.jpg",
    alt: "Proyecto Biferdil",
    position: "center",
  },
];

export function Explorations() {
  return (
    <section className="explorations overflow-hidden bg-[#f7f7f5] py-24 text-[#141411] md:py-32">
      <div className="mx-auto w-[calc(100%-40px)] max-w-[1280px]">
        <p className="mb-8 font-host text-[18px] font-medium uppercase leading-7 tracking-[-0.5px] md:mb-12 md:text-[20px]">
          <span className="text-[#ef3b32]">&#123;</span> EXPLORATIONS <span className="text-[#ef3b32]">&#125;</span>
        </p>

        <div className="grid gap-8 md:grid-cols-[0.94fr_1.06fr] md:items-end md:gap-20">
          <h2 className="font-host text-[clamp(3.75rem,5.1vw,6rem)] font-medium leading-[1.02] tracking-[-0.07em]">
            Espacios que<br />
            conectan.
          </h2>
          <p className="max-w-[720px] pb-1 font-host text-xl font-medium leading-[1.3] tracking-[-0.04em] text-[#4b4b49] md:text-[clamp(1.25rem,1.65vw,1.7rem)]">
            Creamos espacios que transforman marcas en experiencias memorables. Descubrí proyectos diseñados para atraer, conectar y avanzar con precisión.
          </p>
        </div>
      </div>

      <div className="explorations-marquee mt-14 md:mt-20">
        <div className="explorations-track">
          {[0, 1].map((group) => (
            <div className="explorations-group" aria-hidden={group === 1} key={group}>
              {explorations.map((exploration, index) => (
                <figure
                  className={`exploration-card relative h-[400px] w-[270px] shrink-0 overflow-hidden rounded-[22px] bg-[#d9d8d3] md:w-[390px] ${[
                    "md:h-[400px] md:translate-y-[4px]",
                    "md:h-[510px]",
                    "md:h-[380px] md:translate-y-[-12px]",
                    "md:h-[460px] md:translate-y-[2px]",
                    "md:h-[400px] md:translate-y-[6px]",
                    "md:h-[510px]",
                    "md:h-[420px] md:translate-y-[-8px]",
                    "md:h-[500px] md:translate-y-[4px]",
                    "md:h-[410px] md:translate-y-[-4px]",
                    "md:h-[470px] md:translate-y-[6px]",
                  ][index]}`}
                  key={`${group}-${index}-${exploration.image}`}
                >
                  <Image
                    src={exploration.image}
                    alt={group === 0 ? exploration.alt : ""}
                    fill
                    quality={100}
                    sizes="(max-width: 767px) 280px, 390px"
                    className="object-cover"
                    style={{ objectPosition: exploration.position }}
                  />
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
