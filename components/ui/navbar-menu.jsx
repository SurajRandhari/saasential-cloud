"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";


const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};


// Modify the props
export const MenuItem = ({
  setActive,
  active,
  item,
  children,
  href,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const hasChildren = !!children;
  const pathname = usePathname();
  const isRouteActive = href && pathname === href;
  const letters = item.split("");

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
    initial: { color: isRouteActive ? "#0B8AE5" : "#000" },
    animateIn: {
      color: "#0B8AE5",
      transition: { type: "spring", stiffness: 120, damping: 14 },
    },
    animateOut: {
      color: isRouteActive ? "#0B8AE5" : "#000",
      transition: { type: "spring", stiffness: 120, damping: 14 },
    },
  };

  const label = (
    <motion.p
      className="cursor-pointer text-black dark:text-white flex space-x-[1px] overflow-hidden"
      variants={containerVariants}
      initial="initial"
      animate={isHovered ? "animateIn" : "animateOut"}
    >
      {letters.map((char, idx) => (
        <motion.span key={idx} variants={letterVariants}>
          {char}
        </motion.span>
      ))}
    </motion.p>
  );

  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={() => {
        setIsHovered(true);
        setActive(hasChildren ? item : null);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setActive(null);
      }}
    >
      {href ? <Link href={href}>{label}</Link> : label}

      {active === item && children && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 z-50">
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 24, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={transition}
            className="w-[2px] bg-[#0B8AE5] dark:bg-white mx-auto mb-1"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: -6 }}
            exit={{ opacity: 0 }}
            transition={transition}
            className="bg-white dark:bg-black backdrop-blur-sm border-t-2 border-[#0B8AE5] nav-box-shadow px-4 py-4"
          >
            <motion.div layout className="w-max">
              {children}
            </motion.div>
          </motion.div>
        </div>
      )}
    </div>
  );
};


export const Menu = ({
  setActive,
  children
}) => {
  return (
    <nav
      // resets the state
      onMouseLeave={() => setActive(null)}
      className="relative rounded-md  nav-box-shadow border border-transparent dark:bg-black dark:border-white/[0.2] bg-white shadow-input flex justify-between space-x-4 p-3 overflow-visible">
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src
}) => {
  return (
    <Link href={href} className="flex space-x-2">
      <img
        src={src}
        width={140}
        height={70}
        alt={title}
        className="shrink-0 rounded-md shadow-2xl" />
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </Link>
  );
};


export const HoveredLink = ({ children, href }) => {
  const text = children.toString().split("");
  const [isHovered, setIsHovered] = useState(false);

  const containerVariants = {
    initial: {},
    animateIn: {
      transition: {
        staggerChildren: 0.04,
        staggerDirection: 1, // left to right
      },
    },
    animateOut: {
      transition: {
        staggerChildren: 0.04,
        staggerDirection: -1, // right to left
      },
    },
  };

  const letterVariants = {
    initial: { color: "#333" },
    animateIn: {
      color: "#0B8AE5",
      transition: { type: "spring", stiffness: 120, damping: 14 },
    },
    animateOut: {
      color: "#333",
      transition: { type: "spring", stiffness: 120, damping: 14 },
    },
  };

  return (
    <Link href={href} className="inline-block">
      <motion.span
        className="flex space-x-[1px] overflow-hidden"
        variants={containerVariants}
        initial="initial"
        animate={isHovered ? "animateIn" : "animateOut"}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {text.map((char, index) => (
          <motion.span key={index} variants={letterVariants}>
            {char}
          </motion.span>
        ))}
      </motion.span>
    </Link>
  );
};

