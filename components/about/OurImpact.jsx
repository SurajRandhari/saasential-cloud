"use client";

import Link from "next/link";
import React from "react";
import { GradientButton } from "../common/my-button/GradientButton";

const impactData = [
  { number: "700+", label: "Projects launched successfully across the globe" },
  { number: "10M", label: "Daily customer engagement through our projects" },
  { number: "100+", label: "Digital transformation stories that made a difference" },
];

export default function OurImpact() {
  return (
    <section className="w-full py-24 bg-white text-black text-center px-6">
      
      <h2 className="text-2xl md:text-4xl font-normal capitalize leading-tight md:leading-[52px]  mb-6">Our Impact</h2>
      
      <p className=" text-sm md:text-lg leading-relaxed max-w-3xl mx-auto text-gray-600 mb-12">
        Every innovation that happens here is out of a quest to get better at what we are already doing.  
        We deliver ideas that make a difference, create experiences that transform lives and build ecosystems that foster progress.
      </p>
      
      <div className="flex flex-col md:flex-row justify-center items-center gap-12 mb-12">
        {impactData.map((impact, index) => (
          <div key={index} className="flex flex-col items-center">
            <h3 className="text-7xl ">{impact.number}</h3>
            <p className="text-center text-gray-600 mt-4 max-w-xs">{impact.label}</p>
          </div>
        ))}
      </div>

      <Link
        href="#"
      >
        <GradientButton>  
        Our Impact →
        </GradientButton>
      </Link>
    </section>
  );
}