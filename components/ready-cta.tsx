export function ReadyCta() {
  return (
    <section className="ready-cta bg-[#f7f7f5] px-5 pb-24 pt-12 text-center md:px-10 md:pb-32 md:pt-16">
      <div className="mx-auto max-w-[860px]">
        <p className="ready-word font-host text-[clamp(5.5rem,14vw,14rem)] font-medium leading-[0.78] tracking-[-0.09em] text-[#ef3b32]">¿LISTOS?</p>
        <p className="ready-copy mx-auto mt-12 max-w-[440px] font-host text-[18px] font-medium leading-[1.35] tracking-[-0.04em] text-[#262624] md:mt-14 md:text-[21px]">
          El próximo espacio de tu marca empieza con una buena conversación. Hagámoslo realidad.
        </p>
        <a href="#contacto" className="ready-button mt-7 inline-flex rounded-full bg-black px-6 py-3 font-host text-[16px] font-medium tracking-[-0.03em] text-white transition-transform duration-300 hover:scale-105 md:mt-8">Hablemos</a>
      </div>
    </section>
  );
}
