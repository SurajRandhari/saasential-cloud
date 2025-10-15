"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

// Utility: Shuffle array once
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Utility: Distribute logos evenly
const distributeLogos = (allLogos, columnCount) => {
  const shuffled = shuffleArray(allLogos);
  const columns = Array.from({ length: columnCount }, () => []);
  
  shuffled.forEach((logo, index) => {
    columns[index % columnCount].push(logo);
  });
  
  return columns;
};

// Optimized LogoColumn - No blur, simpler animations
const LogoColumn = React.memo(({ logos, columnIndex }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cycleInterval = 2500; // 2.5 seconds per logo

  useEffect(() => {
    // Stagger start time per column
    const startDelay = columnIndex * 400;
    
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % logos.length);
      }, cycleInterval);
      
      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(timer);
  }, [logos.length, columnIndex, cycleInterval]);

  const currentLogo = logos[currentIndex];

  return (
    <motion.div
      className="w-24 h-14 md:w-48 md:h-24 overflow-hidden relative flex items-center justify-center rounded-lg border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: columnIndex * 0.15,
        duration: 0.5,
        ease: "easeOut",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentLogo.id}-${currentIndex}`}
          className="absolute inset-0 flex items-center justify-center p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 0.4,
              ease: "easeOut"
            }
          }}
          exit={{ 
            opacity: 0, 
            y: -10,
            transition: {
              duration: 0.3,
              ease: "easeIn"
            }
          }}
        >
          <Image
            src={currentLogo.src}
            alt={currentLogo.name}
            width={128}
            height={128}
            className="w-full h-full object-contain"
            loading={columnIndex === 0 && currentIndex === 0 ? "eager" : "lazy"}
            sizes="(max-width: 768px) 96px, 160px"
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
});

LogoColumn.displayName = "LogoColumn";

// Main LogoCarousel component - Optimized
export default function LogoCarousel({ columnCount = 3 }) {
  // Memoized logos array
  const allLogos = useMemo(
    () => [
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
    ],
    []
  );

  // Distribute logos once on mount
  const logoColumns = useMemo(
    () => distributeLogos(allLogos, columnCount),
    [allLogos, columnCount]
  );

  return (
    <div className="flex gap-6 md:gap-8 justify-center items-center">
      {logoColumns.map((logos, index) => (
        <LogoColumn key={`column-${index}`} logos={logos} columnIndex={index} />
      ))}
    </div>
  );
}

export { LogoCarousel };
