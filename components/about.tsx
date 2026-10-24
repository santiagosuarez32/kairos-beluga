import Image from "next/image";

const pillars = [
  {
    title: "Visión comercial.",
    text: "Construimos locales comerciales y gastronómicos, stands publicitarios y activaciones que conectan a cada marca con su público.",
  },
  {
    title: "Ejecución integral.",
    text: "De la idea a la realidad. Integramos tu diseño con la fabricación, la construcción y el montaje en un proceso claro y listo para operar.",
  },
  {
    title: "Ritmo y precisión.",
    text: "Coordinamos cada etapa con precisión para cumplir los plazos y estándares de calidad.",
  },
];

function PillarIcon({ index }: { index: number }) {
  const icons = ["/card-icons/vision.svg", "/card-icons/precision.svg", "/card-icons/collaboration.svg"];
  return <Image src={icons[index]} alt="" width={80} height={81} className="about-icon h-16 w-16 object-contain" />;
}

export function About() {
  return (
    <section id="nosotros" className="font-host bg-[#f7f7f5] py-12 text-[#191919] md:py-16">
      <div className="section-heading-layout">
        <p className="text-[18px] font-medium uppercase tracking-[-0.5px] md:text-[20px]"><span className="font-bold text-[#ef3b32]">&#123;</span> Nosotros <span className="font-bold text-[#ef3b32]">&#125;</span></p>
        <h2 className="about-heading text-[clamp(1.6rem,3.1vw,2.875rem)] md:text-[clamp(1.3rem,2.9vw,2.75rem)] font-medium section-title tracking-[-0.05em]">
          <span className="block">Kairos es más que construir</span>
          <span className="block">espacios: transformamos ideas</span>
          <span className="block">en marcas que crecen.</span>
        </h2>
      </div>
      <div className="px-6 md:px-10">
      <div id="servicios" className="mx-auto mt-10 grid max-w-[1300px] gap-6 md:mt-12 md:grid-cols-3 md:gap-6">
        {pillars.map((pillar, index) => (
          <article key={pillar.title} className="about-card flex min-h-[20rem] flex-col overflow-hidden rounded-2xl bg-white px-5 py-7 antialiased md:h-[390px] md:min-h-0 md:p-8">
            <PillarIcon index={index} />
            <div className="mt-auto">
              <h3 className="about-card-title">{pillar.title}</h3>
              <p className="about-card-copy max-w-none md:max-w-[337px] md:min-h-[96px]">{pillar.text}</p>
            </div>
          </article>
        ))}
      </div>
      </div>
    </section>
  );
}
