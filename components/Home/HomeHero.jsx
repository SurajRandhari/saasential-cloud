// page.jsx
"use client";
import React, { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { GradientButton } from "../common/my-button/GradientButton";
import { GradientButtonTwo } from "../common/my-button/GradientButtonTwo";

// Memoized video component
const OptimizedVideo = React.memo(({ src, className, ...props }) => (
  <video
    autoPlay
    loop
    muted
    playsInline
    preload="metadata"
    className={className}
    {...props}
  >
    <source src={src} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
));

OptimizedVideo.displayName = "OptimizedVideo";

export default function HomeHero() {
  return (
    <>
      {/* Hero Section - Fade entire section including content */}
      <motion.section className="relative h-screen w-full bg-white overflow-hidden">
        {/* Background Video */}
        <OptimizedVideo
          src="https://res.cloudinary.com/ddk3xqd3h/video/upload/v1757754812/media/website/kbnhdulig8ecglnxkmy2.mp4"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-5"
        />

        {/* Content Container */}
        <div className="relative z-10 w-full h-full flex flex-col lg:flex-row items-center justify-center gap-8 px-4 md:px-10">
            
          <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
            <div className="text-gray-600 text-lg md:text-xl font-normal mb-4 md:mb-2 ">
              Future Ready
            </div>

            <h1 className="text-gray-800 text-2xl sm:text-3xl md:text-4xl font-normal uppercase leading-tight md:leading-[52px] mb-6 md:mb-4 ">
              Where Business
              <br />
              Meets Innovation -
              <br />
              From Software to Strategy
            </h1>

            <div className="flex gap-6">
              <GradientButton
                variant="gradient"
                className="w-fit mx-auto lg:mx-0 px-6 md:px-4 py-4 md:py-5 text-black text-sm md:text-base font-normal transition-all duration-300"
              >
                Get a Free Consultation
              </GradientButton>
              <GradientButtonTwo
                variant="gradient"
                className="w-fit mx-auto lg:mx-0 px-6 md:px-4 py-4 md:py-5 text-black text-sm md:text-base font-normal transition-all duration-300"
              >
                Explore Services
              </GradientButtonTwo>
            </div>
          </div>

          <div className="relative">
            <OptimizedVideo
              src="https://res.cloudinary.com/ddk3xqd3h/video/upload/v1757755547/media/website/i9aafcm1y8dabkp9ukiz.mp4"
              className="w-full h-full object-cover shadow-md"
            />
          </div>
        </div>
      </motion.section>
    </>
  );
}
