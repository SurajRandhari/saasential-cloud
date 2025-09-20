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

// Numbers with text
const items = [
  { value: "400+", text: "Projects Delivered" },
  { value: "6000+", text: "Cups of Coffee" },
  { value: "8000+", text: "Happy Clients" },
  { value: "7000+", text: "Hours of Support" },
];

export default function AboutConutiing() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={containerRef}
      className="relative h-[600vh] bg-black text-white "
    >
      <div className="sticky top-0 h-screen flex items-center justify-center">
        {/* Background Video */}
        <OptimizedVideo
          src="https://res.cloudinary.com/ddk3xqd3h/video/upload/v1758051890/media/website/hrlwmbroq0wdj9hatf4l.mp4"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 object-cover z-0 opacity-30"
        />

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-32 md:12 w-full max-w-4xl px-6">
          {/* LEFT */}
          <div className="flex flex-col justify-center items-start text-start w-full md:w-1/2">
            <motion.h2
              className="text-4xl md:text-6xl font-normal capitalize leading-tight md:leading-[52px]"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              What we do
            </motion.h2>

            <motion.p
              className="mt-4 md:mt-8 text-sm md:text-lg leading-relaxed max-w-sm md:max-w-md"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              We turn raw ideas into production-ready products — guiding you
              from concept and design all the way to launch and continuous
              growth.
            </motion.p>
          </div>

          {/* RIGHT */}
          <div className="relative flex justify-center items-center w-full md:w-1/2">
            {items.map((item, i) => {
              const start = i / items.length;
              const end = (i + 1) / items.length;

              // opacity fades in/out
              const opacity = useTransform(
                scrollYProgress,
                [start - 0.1, start, end - 0.1, end],
                [0, 1, 1, 0]
              );

              // scale slightly pops
              const scale = useTransform(
                scrollYProgress,
                [start - 0.1, start, end - 0.1, end],
                [0.9, 1, 1, 0.9]
              );

              // y motion → slide up faster
              const y = useTransform(
                scrollYProgress,
                [start - 0.1, start, end],
                [100, 0, -100] // comes from bottom → exits top
              );

              return (
                <motion.div
                  key={i}
                  className="absolute flex flex-col items-start justify-center"
                  style={{ opacity, scale, y }}
                  transition={{ duration: 0.4, ease: "easeOut" }} // fast
                >
                  <h3 className="text-6xl md:text-8xl font-normal leading-tight">
                    {item.value}
                  </h3>
                  <p className="mt-2 text-lg md:text-xl">{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
