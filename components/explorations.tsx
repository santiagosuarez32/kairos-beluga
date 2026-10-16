import Image from "next/image";

const explorations = [
  {
    "image": "/marquee/20260331_130614.jpg",
    "alt": "Plano del stand VTH durante su construcción en taller",
    "position": "center"
  },
  {
    "image": "/marquee/20260331_125720.jpg",
    "alt": "Fabricación de estructuras curvas en el taller",
    "position": "center"
  },
  {
    "image": "/marquee/20260407_194726.jpg",
    "alt": "Montaje del stand VTH en La Rural",
    "position": "center"
  },
  {
    "image": "/marquee/20260529_161721.jpg",
    "alt": "Equipo trabajando en el montaje de un stand",
    "position": "center"
  },
  {
    "image": "/marquee/20260721_124157.jpg",
    "alt": "Trabajo de carpintería y terminaciones en taller",
    "position": "center"
  }
];

export function Explorations() {
  return (
    <section className="explorations overflow-hidden bg-[#f7f7f5] py-12 text-[#141411] md:py-16">
      <div className="section-heading-layout">
        <p className="font-host text-[18px] font-medium uppercase leading-7 tracking-[-0.5px] md:text-[20px]">
          <span className="text-[#ef3b32]">&#123;</span> NUESTRA VISIÓN <span className="text-[#ef3b32]">&#125;</span>
        </p>

        <div className="grid gap-6">
          <h2 className="font-host text-[clamp(1.6rem,3.1vw,2.875rem)] md:text-[clamp(1.3rem,2.9vw,2.75rem)] font-medium leading-[1.05] tracking-[-0.05em]">
            Espacios que<br />
            conectan.
          </h2>
          <p className="max-w-[720px] pb-1 font-host text-xl font-medium leading-[1.3] tracking-[-0.04em] text-[#4b4b49] md:text-[clamp(1.25rem,1.65vw,1.7rem)]">
            Construimos espacios que transforman marcas en experiencias memorables.
          </p>
        </div>
      </div>

      <div className="explorations-marquee mt-14 md:mt-20">
        <div className="explorations-track">
          {[0, 1].map((group) => (
            <div className="explorations-group" aria-hidden={group === 1} key={group}>
              {explorations.map((exploration, index) => (
                <figure
                  className={`exploration-card relative w-[270px] shrink-0 overflow-hidden rounded-[22px] bg-[#d9d8d3] md:w-[390px] ${[
                    "h-[277px] md:h-[400px]",
                    "h-[353px] md:h-[510px]",
                    "h-[263px] md:h-[380px]",
                    "h-[318px] md:h-[460px]",
                    "h-[277px] md:h-[400px]",
                    "h-[353px] md:h-[510px]",
                    "h-[291px] md:h-[420px]",
                    "h-[346px] md:h-[500px]",
                    "h-[284px] md:h-[410px]",
                    "h-[325px] md:h-[470px]",
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
