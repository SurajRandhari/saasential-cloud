"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";

// Utility function to randomly shuffle an array
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Utility function to distribute logos across multiple columns
const distributeLogos = (allLogos, columnCount) => {
  const shuffled = shuffleArray(allLogos);
  const columns = Array.from({ length: columnCount }, () => []);

  // Distribute logos evenly across columns
  shuffled.forEach((logo, index) => {
    columns[index % columnCount].push(logo);
  });

  // Ensure all columns have the same number of logos
  const maxLength = Math.max(...columns.map((col) => col.length));
  columns.forEach((col) => {
    while (col.length < maxLength) {
      col.push(shuffled[Math.floor(Math.random() * shuffled.length)]);
    }
  });

  return columns;
};

// LogoColumn component: Displays a single column of animated logos
const LogoColumn = React.memo(({ logos, index, currentTime }) => {
  const cycleInterval = 2500; // Increased for better UX
  const columnDelay = index * 300; // Increased stagger
  
  // Calculate which logo should be displayed
  const adjustedTime = (currentTime + columnDelay) % (cycleInterval * logos.length);
  const currentIndex = Math.floor(adjustedTime / cycleInterval);

  // Memoize the current logo
  const currentLogo = useMemo(() => logos[currentIndex], [logos, currentIndex]);

  return (
    <motion.div
      className="w-24 h-14 md:w-48 md:h-24 overflow-hidden relative performance-section"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.15,
        duration: 0.6,
        ease: "easeOut",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentLogo.id}-${currentIndex}`}
          className="absolute inset-0 flex items-center justify-center gpu-layer"
          initial={{ y: "15%", opacity: 0, filter: "blur(4px)" }}
          animate={{
            y: "0%",
            opacity: 1,
            filter: "blur(0px)",
            transition: {
              type: "spring",
              stiffness: 200,
              damping: 25,
              mass: 1,
              duration: 0.4,
            },
          }}
          exit={{
            y: "-15%",
            opacity: 0,
            filter: "blur(2px)",
            transition: {
              type: "tween",
              ease: "easeIn",
              duration: 0.25,
            },
          }}
        >
          <Image
            src={currentLogo.src}
            alt={currentLogo.name}
            width={128}
            height={128}
            className="w-20 h-20 md:w-32 md:h-32 max-w-[80%] max-h-[80%] object-contain"
            priority={index === 0 && currentIndex === 0} // Prioritize first visible logo
            loading={index === 0 && currentIndex === 0 ? "eager" : "lazy"}
            sizes="(max-width: 768px) 80px, 128px"
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
});

// Set display name for better debugging
LogoColumn.displayName = "LogoColumn";

// Main LogoCarousel component
function LogoCarousel({ columnCount = 3 }) {
  const [logoSets, setLogoSets] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);

  // Fixed: Memoized array of logos with correct paths (leading slash)
  const allLogos = useMemo(() => [
    { name: "Apple", id: 1, src: "/images/clients-logos/1.png" },
    { name: "Supabase", id: 2, src: "/images/clients-logos/2.png" },
    { name: "Vercel", id: 3, src: "/images/clients-logos/3.png" },
    { name: "Lowes", id: 4, src: "/images/clients-logos/4.png" },
    { name: "Ally", id: 5, src: "/images/clients-logos/5.png" },
    { name: "Pierre", id: 6, src: "/images/clients-logos/6.png" },
    { name: "BMW", id: 7, src: "/images/clients-logos/7.png" },
    { name: "Claude", id: 8, src: "/images/clients-logos/1.png" },
    { name: "Next.js", id: 9, src: "/images/clients-logos/2.png" },
    { name: "Tailwind CSS", id: 10, src: "/images/clients-logos/3.png" },
    { name: "Upstash", id: 11, src: "/images/clients-logos/4.png" },
    { name: "TypeScript", id: 12, src: "/images/clients-logos/5.png" },
    { name: "Stripe", id: 13, src: "/images/clients-logos/6.png" },
    { name: "OpenAI", id: 14, src: "/images/clients-logos/7.png" },
  ], []);

  // Distribute logos across columns when component mounts
  useEffect(() => {
    const distributedLogos = distributeLogos(allLogos, columnCount);
    setLogoSets(distributedLogos);
  }, [allLogos, columnCount]);

  // Optimized time update function
  const updateTime = useCallback(() => {
    setCurrentTime((prevTime) => prevTime + 150); // Slightly slower for smoother animation
  }, []);

  // Set up interval with cleanup
  useEffect(() => {
    const intervalId = setInterval(updateTime, 150);
    return () => clearInterval(intervalId);
  }, [updateTime]);

  // Render the logo columns
  return (
    <div className="flex space-x-4 justify-center items-center performance-section">
      {logoSets.map((logos, index) => (
        <LogoColumn 
          key={`column-${index}`} 
          logos={logos} 
          index={index} 
          currentTime={currentTime} 
        />
      ))}
    </div>
  );
}

export { LogoCarousel };
export default LogoCarousel;
