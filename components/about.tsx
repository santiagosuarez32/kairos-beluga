import Image from "next/image";

const pillars = [
  {
    title: "Visión comercial.",
    text: "Diseñamos espacios comerciales que conectan cada marca con su público y convierten cada visita en una experiencia.",
  },
  {
    title: "Ejecución integral.",
    text: "Integramos diseño, fabricación, obra, instalaciones y montaje en un proceso claro, ágil y listo para operar.",
  },
  {
    title: "Ritmo y precisión.",
    text: "Coordinamos cada etapa con precisión para cumplir plazos, presupuesto y estándares de calidad.",
  },
];

function PillarIcon({ index }: { index: number }) {
  const icons = ["/card-icons/vision.svg", "/card-icons/precision.svg", "/card-icons/collaboration.svg"];
  return <Image src={icons[index]} alt="" width={80} height={81} className="about-icon h-20 w-20 object-contain" />;
}

export function About() {
  return (
    <section id="nosotros" className="font-host bg-[#f7f7f5] px-5 py-24 text-[#191919] md:px-10 md:py-36">
      <div className="mx-auto max-w-[1400px]">
      <div className="grid gap-12 md:grid-cols-[1fr_737px] md:gap-20">
        <p className="text-[18px] font-medium uppercase leading-7 tracking-[-0.5px] md:text-[20px]"><span className="font-bold text-[#ef3b32]">&#123;</span> Nosotros <span className="font-bold text-[#ef3b32]">&#125;</span></p>
        <h2 className="about-heading max-w-[737px] text-4xl font-medium leading-[0.98] tracking-[-0.05em] md:text-[80px] md:leading-[80px] md:tracking-[-4px] md:[&>span]:whitespace-nowrap">
          <span className="block">Kairos es más que</span>
          <span className="block">construir espacios:</span>
          <span className="block">transformamos ideas</span>
          <span className="block">en marcas que crecen.</span>
        </h2>
      </div>
      <div className="mx-auto mt-16 grid max-w-[1300px] gap-6 md:mt-20 md:grid-cols-3 md:gap-6">
        {pillars.map((pillar, index) => (
          <article key={pillar.title} className="about-card flex min-h-[24rem] flex-col overflow-hidden rounded-2xl bg-white p-8 antialiased md:h-[485px] md:min-h-0 md:p-10">
            <PillarIcon index={index} />
            <div className="mt-auto">
              <h3 className="about-card-title">{pillar.title}</h3>
              <p className="about-card-copy max-w-[337px] md:min-h-[103px]">{pillar.text}</p>
            </div>
          </article>
        ))}
      </div>
      </div>
    </section>
  );
}
