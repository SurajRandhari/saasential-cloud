"use client";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Only register on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomeAbout() {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const section2TextRef = useRef(null);
  const section2Ref = useRef(null);
  const scrollTriggerRefs = useRef([]);

  // Handle client-side hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Memoized text content
  const textContent = useMemo(
    () =>
      "Where SaaS speed meets sales precision — we bridge marketing and sales to spark smarter growth. With 20+ years cracking tough markets and a 2M+ contact engine under the hood, we don't just find leads — we predict them.",
    []
  );

  // Optimized resize handler
  const checkMobile = useCallback(() => {
    const mobile = window.innerWidth < 768;
    if (mobile !== isMobile) {
      setIsMobile(mobile);
    }
  }, [isMobile]);

  useEffect(() => {
    if (!isClient) return;

    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });

    // Optimize text animation
    const textElement = section2TextRef.current;
    if (textElement && textContent) {
      // Create character spans with DocumentFragment for better performance
      const fragment = document.createDocumentFragment();
      const tempDiv = document.createElement("div");

      const spanHTML = textContent
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          return `<span class="char gpu-layer" style="color: #d1d5db; transition: color 0.15s cubic-bezier(0.4, 0, 0.2, 1);">${char}</span>`;
        })
        .join("");

      tempDiv.innerHTML = spanHTML;
      while (tempDiv.firstChild) {
        fragment.appendChild(tempDiv.firstChild);
      }

      textElement.innerHTML = "";
      textElement.appendChild(fragment);

      const charSpans = textElement.querySelectorAll(".char");

      // Only create ScrollTrigger on client side
      if (typeof window !== "undefined" && ScrollTrigger) {
        const textScrollTrigger = ScrollTrigger.create({
          trigger: section2TextRef.current,
          start: isMobile ? "top 90%" : "top 80%",
          end: isMobile ? "top 10%" : "top 20%",
          scrub: isMobile ? 1 : true,
          invalidateOnRefresh: true,
          refreshPriority: -1,
          onUpdate: (self) => {
            const progress = self.progress;
            const charsToAnimate = Math.floor(progress * charSpans.length);

            // Batch DOM updates for better performance
            const updates = [];
            charSpans.forEach((char, index) => {
              const newColor = index <= charsToAnimate ? "#000" : "#d1d5db";
              if (char.style.color !== newColor) {
                updates.push(() => (char.style.color = newColor));
              }
            });

            if (updates.length > 0) {
              requestAnimationFrame(() => {
                updates.forEach((update) => update());
              });
            }
          },
        });

        scrollTriggerRefs.current.push(textScrollTrigger);
      }
    }

    // Fade effect for section
    const section2Element = section2Ref.current;
    if (section2Element && typeof window !== "undefined" && ScrollTrigger) {
      const fadeScrollTrigger = ScrollTrigger.create({
        trigger: section2Element,
        start: "bottom bottom",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
        refreshPriority: -1,
        onUpdate: (self) => {
          const opacity = 1 - self.progress;
          requestAnimationFrame(() => {
            section2Element.style.opacity = opacity;
          });
        },
      });

      scrollTriggerRefs.current.push(fadeScrollTrigger);
    }

    return () => {
      window.removeEventListener("resize", checkMobile);

      // Kill all ScrollTriggers
      scrollTriggerRefs.current.forEach((trigger) => trigger.kill());
      scrollTriggerRefs.current = [];
    };
  }, [isClient, isMobile, textContent, checkMobile]);

  return (
    <section
      ref={section2Ref}
      className="sticky top-30 z-10 flex items-start justify-center  px-10 md:px-36 py-20"
      style={{ willChange: "opacity" }}
      data-section="home-about" 
    >
      <div className="absolute inset-0 bg-opacity-20"></div>
      <h1
        ref={section2TextRef}
        className={`
          relative z-10 font-normal px-4 sm:px-8 md:px-20 leading-relaxed gpu-layer
          ${isMobile ? "text-2xl sm:text-3xl" : "text-5xl"}
        `}
        style={{
          lineHeight: isMobile ? "1.4" : "1.3",
          willChange: "transform",
        }}
      >
        {!isClient ? textContent : null}
      </h1>
    </section>
  );
}
