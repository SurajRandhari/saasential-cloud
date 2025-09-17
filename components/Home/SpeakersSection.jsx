"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SpinningText } from "@/components/magicui/spinning-text";

const images = [
  "/images/speakers/speakers-1.jpg",
  "/images/speakers/speakers-2.jpg",
  "/images/speakers/speakers-3.jpg",
  "/images/speakers/speakers-4.jpg",
];

export default function SpeakersSection() {
  const [current, setCurrent] = useState(0);

  // Auto change every 3s
  useEffect(() => {
    const interval = setInterval(
      () => setCurrent((prev) => (prev + 1) % images.length),
      3000
    );
    return () => clearInterval(interval);
  }, []);

  // Mask SVG for desktop
  const maskSvg = `url("data:image/svg+xml;utf8,
    <svg xmlns='http://www.w3.org/2000/svg' width='320' height='420' viewBox='0 0 320 420'>
      <rect width='320' height='420' fill='white'/>
      <path d='M0 350 Q80 400 160 350 T320 350 V420 H0 Z' fill='black'/>
    </svg>")`;

  return (
    <section className="w-full bg-white py-20 px-4 md:px-40 flex justify-center">
      <div className="flex flex-col md:flex-row items-start gap-14">
        
        {/* Left Column */}
        <div className="space-y-14 flex-1">
          {/* Mobile: circular images above title */}
          <div className="flex md:hidden justify-center items-center gap-4">
            {images.slice(0, 3).map((src, i) => (
              <div
                key={i}
                className={`relative rounded-full overflow-hidden ${
                  i === 1 ? "w-28 h-28" : "w-20 h-20"
                }`}
              >
                <Image src={src} alt={`Speaker ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>

          <h2 className="text-2xl md:text-4xl font-normal capitalize leading-tight md:leading-[52px]  text-center md:text-left">
            The Power Behind <br /> the Training!
          </h2>
          <p className="text-gray-600 text-lg max-w-xl w-3/4 text-center md:text-left">
            Driven by results, backed by knowledge – meet the team behind your
            progress.!
          </p>
          <div className="flex justify-center md:justify-start">
            <button className="border border-gray-800 px-6 py-3 text-base font-medium flex items-center gap-2 hover:bg-gray-100 transition">
              Explore opportunities →
            </button>
          </div>
        </div>

        {/* Right Column (Desktop Only) */}
        <div className="hidden md:flex relative justify-center flex-1">
          <div className="relative w-[320px] h-[420px] overflow-hidden">
            {/* Current visible image */}
            <Image
              src={images[current]}
              alt={`Speaker ${current + 1}`}
              fill
              className="object-cover"
            />

            {/* Incoming image with wave mask */}
            <AnimatePresence>
              <motion.div
                key={current}
                initial={{ y: "-100%" }}
                animate={{ y: "0%" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="absolute inset-0"
                style={{
                  WebkitMaskImage: maskSvg,
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskSize: "cover",
                  maskImage: maskSvg,
                  maskRepeat: "no-repeat",
                  maskSize: "cover",
                }}
              >
                <Image
                  src={images[current]}
                  alt={`Speaker ${current + 1}`}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Spinning Text */}
          <div className="absolute -bottom-20 -right-8 md:-right-20 w-40 h-40 flex items-center justify-center p-6">
            <SpinningText
              className="text-gray-400 font-semibold text-md uppercase tracking-tight"
              duration={12}
              radius={8}
            >
              Certified Instructors • Certified Instructors •
            </SpinningText>
          </div>
        </div>
      </div>
    </section>
  );
}
