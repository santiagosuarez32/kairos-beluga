import Image from "next/image";

function AnimatedLine({ children }: { children: string }) {
  return <span className="block whitespace-nowrap">{Array.from(children).map((letter, index) => <span key={`${letter}-${index}`} className="hero-letter inline-block">{letter === " " ? "\u00A0" : letter}</span>)}</span>;
}

export function Hero() {
  return <section id="top" className="bg-[#f7f7f5] px-3 pb-3 pt-3 md:px-4 md:pb-4 md:pt-4"><div className="hero relative mx-auto flex min-h-[calc(100svh-1.5rem)] max-w-[1560px] flex-col justify-end overflow-hidden rounded-2xl px-5 pb-7 pt-28 text-white md:min-h-[calc(100svh-2rem)] md:px-10 md:pb-10"><Image src="/hero.jpg" alt="Stand arquitectónico iluminado" fill priority quality={100} sizes="(max-width: 1592px) calc(100vw - 32px), 1560px" className="hero-image object-cover object-center" /><div className="hero-overlay absolute inset-0 bg-black/35" /><div className="hero-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/20" /><div className="relative z-10 grid items-end gap-6 md:grid-cols-[1.5fr_0.5fr]"><h1 className="max-w-[1400px] text-[8.2vw] font-bold leading-[0.8] tracking-[-0.06em] md:ml-6 md:text-[clamp(3.75rem,5.8vw,7.5rem)]"><AnimatedLine>{"TU PROYECTO IDEAL"}</AnimatedLine><AnimatedLine>{"— HECHO REALIDAD."}</AnimatedLine></h1><p className="hero-meta max-w-[390px] text-left text-[15px] font-normal leading-[1.45] tracking-[-0.02em] text-white/90 md:pb-2 md:text-base">Construimos espacios con precisión y compromiso. Transformamos cada proyecto en una realidad sólida, funcional y duradera.</p></div></div></section>;
}
