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
  const icons = [
    <svg key="globe" viewBox="0 0 88 88" aria-hidden className="about-icon h-20 w-20 fill-none stroke-black/80 stroke-[1.25]">
      <circle cx="44" cy="44" r="38" /><ellipse cx="44" cy="44" rx="14" ry="38" /><ellipse cx="44" cy="44" rx="27" ry="38" /><path d="M8 29c21 11 51 11 72 0M6 44h76M8 59c21-11 51-11 72 0M15 16c17 12 41 12 58 0M15 72c17-12 41-12 58 0" />
    </svg>,
    <svg key="precision" viewBox="0 0 88 88" aria-hidden className="about-icon h-20 w-20 fill-none stroke-black/80 stroke-[1.25]">
      <rect x="4" y="4" width="80" height="80" /><path d="M9 9 79 79M9 21l58 58M9 35l44 44M9 49l30 30M9 9l70 14v56" />
    </svg>,
    <svg key="collaboration" viewBox="0 0 88 88" aria-hidden className="about-icon h-20 w-20 fill-none stroke-black/80 stroke-[1.25]">
      <polygon points="44,3 74,15 85,44 74,73 44,85 14,73 3,44 14,15" /><polygon points="44,11 68,23 77,44 68,65 44,77 20,65 11,44 20,23" /><path d="m44 3 24 62M74 15 20 65M85 44H3M74 73 20 23M44 85 68 23M14 73l60-58" />
    </svg>,
  ];

  return icons[index];
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
