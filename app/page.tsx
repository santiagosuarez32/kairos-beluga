"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Brands } from "@/components/brands";
import { Projects } from "@/components/projects";
import { About } from "@/components/about";
import { Footer } from "@/components/footer";

export default function Home() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    let frameId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };
    frameId = requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      gsap.from(".hero-image", { opacity: 0, scale: 1.04, duration: 1.2, ease: "power2.out" });
      gsap.from(".hero-overlay", { opacity: 0, duration: 0.8, stagger: 0.05, ease: "power1.out" });
      gsap.from(".hero-letter", { opacity: 0.001, filter: "blur(10px)", y: 10, duration: 0.58, stagger: 0.026, ease: "power2.out", delay: 0.28 });
      gsap.from(".hero-meta", { opacity: 0, filter: "blur(8px)", y: 10, duration: 0.65, ease: "power2.out", delay: 0.45 });
      gsap.to(".orb", { y: -80, x: 45, rotation: 25, ease: "none", scrollTrigger: { trigger: ".hero", scrub: 1 } });
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
        gsap.from(card, { y: 80, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 82%" } });
      });
      gsap.from(".about-heading", { opacity: 0, y: 60, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".about-heading", start: "top 75%" } });
      gsap.from(".about-card", { opacity: 0, y: 54, scale: 0.975, filter: "blur(5px)", stagger: 0.12, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".about-card", start: "top 82%" } });
      gsap.from(".about-icon", { opacity: 0, rotation: -14, scale: 0.82, transformOrigin: "50% 50%", stagger: 0.12, duration: 0.7, ease: "back.out(1.4)", scrollTrigger: { trigger: ".about-card", start: "top 82%" } });
      gsap.to(".brand-track", { xPercent: -50, duration: 24, repeat: -1, ease: "none" });
    }, root);

    return () => {
      cancelAnimationFrame(frameId);
      ctx.revert();
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main ref={root} className="overflow-hidden bg-[#191919] text-[#f5f5f3]">
      <Navbar />
      <Hero />
      <Brands />
      <About />
      <Projects />
      <Footer />
    </main>
  );
}
