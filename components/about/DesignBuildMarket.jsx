"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";

const gradients = [
  "linear-gradient(90deg, #007cf0, #00dfd8)", // Design
  "linear-gradient(90deg, #7928ca, #ff0080)", // Build
  "linear-gradient(90deg, #ff4d4d, #f9cb28)", // Market
];

export default function DesignBuildMarket() {
  const refs = [useRef(null), useRef(null), useRef(null)];

  const transitionDuration = 0.8;
  const pauseBetween = 0.5;

  useEffect(() => {
    const timeline = gsap.timeline({ repeat: -1, repeatDelay: pauseBetween });

    refs.forEach((ref, i) => {
      timeline
        .to(ref.current, {
          webkitBackgroundClip: "text",
          webkitTextFillColor: "transparent",
          backgroundImage: gradients[i],
          duration: transitionDuration,
          ease: "power1.inOut",
        })
        .to(
          ref.current,
          {
            webkitTextFillColor: "white",
            duration: transitionDuration,
            ease: "power1.inOut",
          },
          `+=${pauseBetween}`
        );
    });
  }, []);

  return (
    <section className="relative w-full h-screen bg-black text-white flex flex-col justify-center items-center px-6 text-center overflow-hidden space-y-10">
      <h1 className="text-4xl md:text-6xl  flex space-x-6">
        {["Design.", "Build.", "Market."].map((word, idx) => (
          <span key={idx} ref={refs[idx]}>
            {word}
          </span>
        ))}
      </h1>

      <p className="mt-6 max-w-2xl mx-auto text-lg leading-relaxed text-gray-300">
        It’s in Webandcrafts’ DNA to transform your brand into its best digital
        self. We are driven by a customer-centric approach in creating engaging,
        interactive and immersive experiences that deliver only the best.
      </p>

      <Link
        href="#"
        className="mt-8 inline-block px-6 py-3 border border-white rounded hover:bg-white hover:text-black transition"
      >
        Our expertise →
      </Link>

      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-700 rounded-full opacity-30 blur-3xl animate-blob"></div>
    </section>
  );
}