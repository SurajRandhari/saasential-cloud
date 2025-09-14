// components/ui/AnimatedLetters.js
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const AnimatedLetters = ({
  text,
  className = "",
  colors = {
    initial: "#000",
    hover: "#0B8AE5"
  },
  isActive = false,
  activeColor = "#0B8AE5"
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const containerVariants = {
    initial: {},
    animateIn: {
      transition: { staggerChildren: 0.04, staggerDirection: 1 },
    },
    animateOut: {
      transition: { staggerChildren: 0.04, staggerDirection: -1 },
    },
  };

  const letterVariants = {
    initial: { 
      color: isActive ? activeColor : colors.initial
    },
    animateIn: {
      color: colors.hover,
      transition: { type: "spring", stiffness: 120, damping: 14 },
    },
    animateOut: {
      color: isActive ? activeColor : colors.initial,
      transition: { type: "spring", stiffness: 120, damping: 14 },
    },
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="initial"
      animate={isHovered ? "animateIn" : "animateOut"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text.split("").map((char, idx) => (
        <motion.span 
          key={`${char}-${idx}`} 
          variants={letterVariants}
          className="inline-block"
          style={{ willChange: 'color' }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default AnimatedLetters;
