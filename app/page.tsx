"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Brands } from "@/components/brands";
import { Projects } from "@/components/projects";
import { Explorations } from "@/components/explorations";
import { Faq } from "@/components/faq";
import { ReadyCta } from "@/components/ready-cta";
import { About } from "@/components/about";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";

export default function Home() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Same Lenis response used by the reference: a short, eased glide on wheel input.
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      // Keep the same scrolling feel as the reference even when the OS
      // accessibility preference is set to reduce motion.
      respectReducedMotion: false,
    });
    lenis.on("scroll", ScrollTrigger.update);
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
      gsap.utils.toArray<HTMLElement>(".project-stage").forEach((stage) => {
        const card = stage.querySelector<HTMLElement>(".project-zoom-card");
        const image = stage.querySelector<HTMLElement>(".project-image");

        if (card) {
          gsap.timeline({
            scrollTrigger: {
              trigger: stage,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.35,
              invalidateOnRefresh: true,
            },
          })
            .fromTo(card, {
              scale: 0.82,
              borderRadius: 28,
              transformOrigin: "center center",
            }, {
              scale: 1,
              borderRadius: 28,
              duration: 1,
              ease: "none",
            })
            .to(card, {
              scale: 0.58,
              borderRadius: 28,
              duration: 1,
              ease: "none",
            });
        }

        if (image) {
          gsap.fromTo(image, { scale: 1.05 }, {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: stage,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });
      gsap.from(".about-heading", { opacity: 0, y: 60, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".about-heading", start: "top 75%" } });
      gsap.from(".about-card", { opacity: 0, y: 54, scale: 0.975, filter: "blur(5px)", stagger: 0.12, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".about-card", start: "top 82%" } });
      gsap.from(".about-icon", { opacity: 0, rotation: -14, scale: 0.82, transformOrigin: "50% 50%", stagger: 0.12, duration: 0.7, ease: "back.out(1.4)", scrollTrigger: { trigger: ".about-card", start: "top 82%" } });
      gsap.to(".about-icon", { y: -10, duration: 1.55, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: 0.08 });
      gsap.to(".brand-track", { xPercent: -50, duration: 24, repeat: -1, ease: "none" });
      gsap.from(".project-heading-letter", {
        opacity: 0.001,
        filter: "blur(10px)",
        y: 10,
        duration: 0.58,
        stagger: 0.026,
        ease: "power2.out",
        scrollTrigger: { trigger: ".projects-section", start: "top 74%", once: true },
      });
      gsap.from(".faq-heading, .faq-contact-link", {
        opacity: 0,
        y: 36,
        filter: "blur(6px)",
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".faq-section", start: "top 74%", once: true },
      });
      gsap.from(".faq-item", {
        opacity: 0,
        y: 22,
        stagger: 0.09,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: { trigger: ".faq-section", start: "top 66%", once: true },
      });
      gsap.from(".ready-word", {
        opacity: 0.001, y: 40, filter: "blur(10px)", duration: 0.85, ease: "power3.out",
        scrollTrigger: { trigger: ".ready-cta", start: "top 78%", once: true },
      });
      gsap.from(".ready-copy, .ready-button", {
        opacity: 0, y: 18, stagger: 0.12, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: ".ready-cta", start: "top 72%", once: true },
      });
    }, root);

    return () => {
      cancelAnimationFrame(frameId);
      ctx.revert();
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main ref={root} className="overflow-hidden bg-[#f7f7f5] text-[#191919]">
      <Navbar />
      <Hero />
      <Brands />
      <About />
      <Projects />
      <Explorations />
      <Faq />
      <ReadyCta />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
