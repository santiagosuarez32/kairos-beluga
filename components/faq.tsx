"use client";

import { useState } from "react";
import { FiPlus } from "react-icons/fi";

const questions = [
  {
    question: "¿Qué tipo de espacios construyen?",
    answer: "Construimos espacios comerciales pensados para potenciar la identidad de cada marca.",
  },
  {
    question: "¿Acompañan todo el proceso?",
    answer: "Sí. Llevamos cada proyecto desde la idea y diseño hasta la producción, el montaje y la entrega final.",
  },
  {
    question: "¿Pueden trabajar con nuestra identidad de marca?",
    answer: "Claro. Traducimos los códigos de tu marca a un espacio coherente, funcional y memorable para tu público.",
  },
  {
    question: "¿Con cuánta anticipación conviene empezar?",
    answer: "Cuanto antes, mejor. Así podemos planificar cada etapa, trabajar con precisión y llegar al resultado final a tiempo.",
  },
  {
    question: "¿Trabajan fuera de Buenos Aires?",
    answer: "Sí. Coordinamos proyectos y montajes a lo largo de todo el país, con el mismo seguimiento de principio a fin.",
  },
];

export function Faq() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(0);

  return (
    <section id="faq" className="faq-section bg-[#f7f7f5] py-12 text-[#141411] md:py-16">
      <div className="mx-auto w-[calc(100%-48px)] max-w-[900px] md:w-[calc(100%-32px)] md:px-10">
        <p className="mb-10 text-center font-host text-[18px] font-medium uppercase leading-7 tracking-[-0.5px] md:text-[20px]">
          <span className="text-[#ef3b32]">&#123;</span> FAQ <span className="text-[#ef3b32]">&#125;</span>
        </p>

        <div className="grid gap-6">
          <div className="text-left">
            <h2 className="faq-heading whitespace-nowrap font-host text-[clamp(1.6rem,3.1vw,2.875rem)] md:text-[clamp(1.3rem,2.9vw,2.75rem)] font-medium leading-[1.05] tracking-[-0.05em]">
              ¿Tenés más preguntas?
            </h2>
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
                    className="flex w-full items-center justify-between gap-6 py-4 text-left font-host text-[18px] font-normal leading-[1.3] tracking-[-0.03em] md:py-5 md:text-[22px]"
                  >
                    <span>{item.question}</span>
                    <FiPlus className={`size-6 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} strokeWidth={1.5} />
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <p className={`max-w-none pb-4 font-host text-[17px] leading-[1.25] tracking-[-0.03em] text-[#4b4b49] transition-all duration-300 ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`}>
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <a href="#contacto" className="faq-contact-link inline-flex w-fit items-center gap-3 border-b border-[#141411] pb-1 font-host text-[17px] font-medium tracking-[-0.03em] transition-opacity hover:opacity-55 md:text-[20px]">
            Hablemos de tu proyecto <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
