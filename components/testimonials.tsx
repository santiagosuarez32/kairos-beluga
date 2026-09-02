import { StaticMeshGradientSunset } from "@/components/ui/static-mesh-gradient-sunset";

const quote = "Kairos entendió nuestra visión y la convirtió en un espacio que expresa la marca en cada detalle.";

export function Testimonials() {
  return (
    <section className="testimonials relative h-[100svh] min-h-[620px] overflow-hidden bg-[#080808] text-[#f5f5f3]">
      <div className="testimonial-panel relative isolate flex h-full items-center justify-center overflow-hidden px-6 py-20 md:px-12">
        <StaticMeshGradientSunset className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-black/20" aria-hidden="true" />

        <div className="relative z-10 mx-auto flex max-w-[1100px] flex-col items-center text-center">
          <p className="mb-14 text-xs font-semibold uppercase tracking-[0.08em] md:mb-20 md:text-sm">
            <span className="text-[#ff3b30]">&#123;</span> TESTIMONIOS <span className="text-[#ff3b30]">&#125;</span>
          </p>
          <blockquote>
            <p className="testimonial-quote font-host text-[clamp(2.55rem,4.75vw,3.75rem)] font-bold leading-none tracking-[-0.01em]">
              <span aria-hidden="true">“</span>
              {quote.split(" ").map((word, index) => (
                <span className="testimonial-word" key={`${word}-${index}`}>{word}{" "}</span>
              ))}
              <span aria-hidden="true">”</span>
            </p>
            <footer className="testimonial-author mt-10 text-base font-semibold tracking-[-0.03em] md:mt-14 md:text-xl">
              María Fernanda, Directora de marca.
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
