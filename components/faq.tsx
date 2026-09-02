"use client";

import { useState } from "react";
import { FiPlus } from "react-icons/fi";

const questions = [
  {
    question: "¿Qué tipo de espacios diseñan?",
    answer: "Diseñamos stands, espacios comerciales, activaciones y exhibiciones pensadas para que cada marca se vea, se recorra y conecte.",
  },
  {
    question: "¿Acompañan todo el proceso?",
    answer: "Sí. Llevamos cada proyecto desde la idea y el diseño hasta la producción, el montaje y la entrega final.",
  },
  {
    question: "¿Pueden trabajar con nuestra identidad de marca?",
    answer: "Claro. Traducimos los códigos de tu marca a un espacio coherente, funcional y memorable para tu público.",
  },
  {
    question: "¿Con cuánta anticipación conviene empezar?",
    answer: "Cuanto antes, mejor. Así podemos definir la estrategia, producir con precisión y llegar a la feria sin improvisaciones.",
  },
  {
    question: "¿Trabajan fuera de Buenos Aires?",
    answer: "Sí. Coordinamos proyectos y montajes donde tu marca necesite estar, con el mismo seguimiento de principio a fin.",
  },
];

export function Faq() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(0);

  return (
    <section id="faq" className="faq-section bg-[#f7f7f5] py-24 text-[#141411] md:py-32">
      <div className="mx-auto w-[calc(100%-40px)] max-w-[1280px]">
        <p className="mb-8 font-host text-[18px] font-medium uppercase leading-7 tracking-[-0.5px] md:mb-12 md:text-[20px]">
          <span className="text-[#ef3b32]">&#123;</span> FAQ <span className="text-[#ef3b32]">&#125;</span>
        </p>

        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div>
            <h2 className="faq-heading max-w-[560px] font-host text-[clamp(3.5rem,5.2vw,6rem)] font-medium leading-[0.93] tracking-[-0.07em]">
              ¿Tenés más<br />
              preguntas?
            </h2>
            <a href="#contacto" className="faq-contact-link mt-10 inline-flex items-center gap-3 border-b border-[#141411] pb-1 font-host text-[17px] font-medium tracking-[-0.03em] transition-opacity hover:opacity-55 md:text-[20px]">
              Hablemos de tu proyecto <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="border-t border-[#141411]/30">
            {questions.map((item, index) => {
              const isOpen = openQuestion === index;
              return (
                <article className="faq-item border-b border-[#141411]/30" key={item.question}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenQuestion(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left font-host text-[clamp(1.25rem,1.7vw,1.7rem)] font-medium leading-[1.15] tracking-[-0.05em] md:py-7"
                  >
                    <span>{item.question}</span>
                    <FiPlus className={`size-6 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} strokeWidth={1.5} />
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <p className={`max-w-[620px] pb-7 font-host text-[17px] leading-[1.45] tracking-[-0.03em] text-[#4b4b49] transition-all duration-300 ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`}>
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
