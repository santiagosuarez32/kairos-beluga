"use client";

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";
import gsap from "gsap";

function useSmoothCaret(value: unknown) {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const syncRef = useRef<() => void>(() => {});

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const field = wrapper?.querySelector("input, textarea") as HTMLInputElement | HTMLTextAreaElement | null;
    const caret = wrapper?.querySelector<HTMLElement>("[data-caret]");
    if (!wrapper || !field || !caret) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const mirror = document.createElement("div");
    mirror.setAttribute("aria-hidden", "true");
    mirror.style.cssText = "position:fixed;left:-10000px;top:0;visibility:hidden;pointer-events:none;";
    document.body.appendChild(mirror);
    let composing = false;
    let disposed = false;
    let frame = 0;
    let position = 0;
    let target = 0;
    let velocity = 0;
    let previousTime = 0;
    let initialized = false;
    const originalCaret = field.style.caretColor;

    const animate = (time: number) => {
      const elapsed = Math.min((time - previousTime) / 1000 || 1 / 60, 0.032);
      previousTime = time;
      // Same spring response as the approved input: stiffness 500, damping 30, mass .5.
      for (let i = 0; i < 4; i++) {
        const dt = elapsed / 4;
        velocity += ((500 * (target - position) - 30 * velocity) / 0.5) * dt;
        position += velocity * dt;
      }
      gsap.set(caret, { x: position });
      if (Math.abs(target - position) > 0.05 || Math.abs(velocity) > 0.05) frame = requestAnimationFrame(animate);
      else { frame = 0; position = target; gsap.set(caret, { x: target }); }
    };

    const update = () => {
      if (disposed) return;
      const enabled = !media.matches && !composing;
      field.style.caretColor = enabled ? "transparent" : originalCaret;
      if (!enabled || document.activeElement !== field || field.selectionStart !== field.selectionEnd) {
        caret.style.opacity = "0";
        initialized = false;
        return;
      }
      const style = getComputedStyle(field);
      for (const property of ["font", "font-feature-settings", "font-variation-settings", "letter-spacing", "line-height", "text-transform", "text-indent", "tab-size", "padding-top", "padding-right", "padding-bottom", "padding-left", "word-break", "overflow-wrap"]) {
        mirror.style.setProperty(property, style.getPropertyValue(property));
      }
      const multiline = field.tagName === "TEXTAREA";
      mirror.style.boxSizing = "border-box";
      mirror.style.width = multiline ? `${field.clientWidth}px` : "max-content";
      mirror.style.whiteSpace = multiline ? "pre-wrap" : "pre";
      mirror.replaceChildren(document.createTextNode(field.value.slice(0, field.selectionStart ?? 0)));
      const marker = document.createElement("span");
      marker.textContent = "\u200b";
      mirror.appendChild(marker);
      // Retain following text so wrapping matches editing in the middle of a word.
      mirror.appendChild(document.createTextNode(field.value.slice(field.selectionStart ?? 0) || "\u200b"));
      const bounds = mirror.getBoundingClientRect();
      const point = marker.getBoundingClientRect();
      const fontSize = parseFloat(style.fontSize);
      const lineHeight = parseFloat(style.lineHeight) || fontSize * 1.06;
      const height = fontSize * 0.9;
      const left = point.left - bounds.left - field.scrollLeft;
      const top = point.top - bounds.top - field.scrollTop + (point.height - height) / 2;
      target = field.offsetLeft + field.clientLeft + left;
      if (!initialized) {
        position = target;
        velocity = 0;
        gsap.set(caret, { x: target });
        initialized = true;
      }
      gsap.set(caret, { y: field.offsetTop + field.clientTop + top, height: Math.min(height, lineHeight) });
      caret.style.opacity = left >= 0 && left < field.clientWidth && top >= 0 && top + height <= field.clientHeight ? "1" : "0";
      if (!frame) { previousTime = performance.now(); frame = requestAnimationFrame(animate); }
    };
    const startComposition = () => { composing = true; update(); };
    const endComposition = () => { composing = false; update(); };
    const events = ["input", "focus", "blur", "select", "keyup", "click", "scroll", "change"];
    events.forEach((event) => field.addEventListener(event, update));
    field.addEventListener("compositionstart", startComposition);
    field.addEventListener("compositionend", endComposition);
    document.addEventListener("selectionchange", update);
    media.addEventListener("change", update);
    document.fonts.addEventListener("loadingdone", update);
    const resize = new ResizeObserver(update);
    resize.observe(field);
    syncRef.current = update;
    void document.fonts.ready.then(update);
    update();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resize.disconnect();
      events.forEach((event) => field.removeEventListener(event, update));
      field.removeEventListener("compositionstart", startComposition);
      field.removeEventListener("compositionend", endComposition);
      document.removeEventListener("selectionchange", update);
      media.removeEventListener("change", update);
      document.fonts.removeEventListener("loadingdone", update);
      field.style.caretColor = originalCaret;
      mirror.remove();
      syncRef.current = () => {};
    };
  }, []);

  useEffect(() => { syncRef.current(); }, [value]);
  return wrapperRef;
}

export function SmoothInput(props: ComponentPropsWithoutRef<"input">) {
  const ref = useSmoothCaret(props.value);
  return <span ref={ref} className="smooth-field"><input {...props} /><span data-caret aria-hidden="true" className="smooth-field-caret" /></span>;
}

export function SmoothTextarea(props: ComponentPropsWithoutRef<"textarea">) {
  const ref = useSmoothCaret(props.value);
  return <span ref={ref} className="smooth-field"><textarea {...props} /><span data-caret aria-hidden="true" className="smooth-field-caret" /></span>;
}
