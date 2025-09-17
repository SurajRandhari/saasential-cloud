"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const OptimizedVideo = ({ src, className, ...props }) => (
  <video
    autoPlay
    loop
    muted
    playsInline
    src={src}
    className={className}
    {...props}
  />
);

const items = ["400+", "6000+", "8000+", "7000+"];

export default function AboutConutiing() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={containerRef}
      className="relative h-[600vh] bg-black text-white" // Keep the tall height for sticky effect
    >
      <div className="sticky top-0 flex flex-col md:flex-row h-screen w-full justify-center items-center gap-14">
        {/* Background Video */}
        <OptimizedVideo
          src="https://res.cloudinary.com/ddk3xqd3h/video/upload/v1758051890/media/website/hrlwmbroq0wdj9hatf4l.mp4"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full object-cover z-0 opacity-30"
        />

        {/* LEFT */}
        <div className="flex flex-col justify-center items-center text-center w-full md:w-1/2 px-6 md:pl-12">
          <motion.h2
            className="text-4xl md:text-6xl font-normal capitalize leading-tight md:leading-[52px]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            What we do
          </motion.h2>

          <motion.p
            className="mt-4 md:mt-8 text-sm md:text-lg leading-relaxed max-w-sm md:max-w-md"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We turn raw ideas into production-ready products — guiding you from
            concept and design all the way to launch and continuous growth.
          </motion.p>
        </div>

        {/* RIGHT */}
        <div className="relative flex items-center justify-center w-full md:w-1/2">
          {items.map((percentage, i) => {
            const start = i / items.length;
            const end = (i + 1) / items.length;

            const opacity = useTransform(
              scrollYProgress,
              [start - 0.1, start, end - 0.1, end],
              [0, 1, 1, 0]
            );

            const scale = useTransform(
              scrollYProgress,
              [start - 0.1, start, end - 0.1, end],
              [0.8, 1, 1, 0.8]
            );

            const y = useTransform(
              scrollYProgress,
              [start - 0.1, start],
              [50, 0]
            );

            return (
              <motion.div
                key={i}
                className="absolute inset-0 flex items-center justify-center"
                style={{ opacity, scale, y }}
              >
                <h3 className="text-6xl md:text-8xl font-normal capitalize leading-tight">
                  {percentage}
                </h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
