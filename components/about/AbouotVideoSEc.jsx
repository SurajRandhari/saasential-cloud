"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function AbouotVideoSEc() {
  const ref = useRef(null);
  
  // Track scroll progress of this specific element
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"] // When element enters viewport to when it leaves
  });

  // Transform scroll progress to width (15% to 100%)
  const width = useTransform(scrollYProgress, [0, 0.5], ["53%", "100%"]);
  
  // Transform scroll progress to height (400px to 600px)
  const height = useTransform(scrollYProgress, [0, 0.5], ["400px", "600px"]);
  
  // Transform scroll progress to opacity (0.5 to 1)
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);
  
  // Transform scroll progress to scale (0.95 to 1)
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

  // Transform scroll progress for smooth video zoom - SLOWER (1 to 1.1)
  const videoScale = useTransform(scrollYProgress, [0, 0.8], [1, 1.1]);

  return (
    <div className="flex justify-center w-full  pt-10">
      <motion.div
        ref={ref}
        style={{
          width,
          opacity,
          scale,
        }}
        className="overflow-hidden"
      >
        <motion.div 
          className="relative w-full overflow-hidden"
          style={{ height }}
        >
          <motion.video
            className="w-full h-full object-cover"
            style={{ scale: videoScale }}
            autoPlay
            muted
            loop
            playsInline
          >
            <source
              src="https://res.cloudinary.com/ddk3xqd3h/video/upload/v1758050961/about_cljjfy.mp4"
              type="video/mp4"
            />
          </motion.video>
        </motion.div>
      </motion.div>
    </div>
  );
}
