"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import DottedMap from "dotted-map";
import Image from "next/image";

export default function AceWorldMap({
  dots = [],
  lineColor = "--primary",
  dotColor = "--primary",
  mapColor = "--accent-foreground",
}) {
  const svgRef = useRef(null);

  const getColorValue = (cssVar) => {
    if (cssVar.startsWith("#")) return cssVar;
    if (typeof window === "undefined") {
      return `rgb(0, 0, 0)`;
    }
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    const rawValue = computedStyle.getPropertyValue(cssVar).trim();
    return `rgb(${rawValue})`;
  };

  const [svgMap, setSvgMap] = useState("");

  useEffect(() => {
    const map = new DottedMap({ height: 100, grid: "diagonal" });
    const newSvgMap = map.getSVG({
      radius: 0.22,
      color: getColorValue(mapColor),
      shape: "circle",
      backgroundColor: "transparent",
    });
    setSvgMap(newSvgMap);
  }, [mapColor]);

  const projectPoint = useMemo(() => {
    return (lat, lng) => {
      const x = (lng + 180) * (800 / 360);
      const y = (90 - lat) * (400 / 180);
      return { x, y };
    };
  }, []);

  const paths = useMemo(
    () =>
      dots.map((dot) => {
        const startPoint = projectPoint(dot.start.lat, dot.start.lng);
        const endPoint = projectPoint(dot.end.lat, dot.end.lng);
        const midX = (startPoint.x + endPoint.x) / 2;
        const midY = Math.min(startPoint.y, endPoint.y) - 50;
        return {
          path: `M ${startPoint.x} ${startPoint.y} Q ${midX} ${midY} ${endPoint.x} ${endPoint.y}`,
          startPoint,
          endPoint,
        };
      }),
    [dots, projectPoint]
  );

  return (
    <div className="w-full aspect-2/1 bg-background rounded-md relative">
      <Image
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full pointer-events-none select-none opacity-30 dark:opacity-[0.15]"
        alt="world map"
        height="495"
        width="1056"
        draggable={false}
        priority
        style={{
        opacity:0.15
        }}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        {paths.map((path, i) => (
          <g key={`path-group-${i}`}>
            <motion.path
              d={path.path}
              fill="none"
              stroke="url(#path-gradient)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 1,
                delay: 0.5 * i,
                ease: "easeOut",
                repeat: Infinity,        // Makes animation repeat forever
                repeatType: "loop",      // Restarts from beginning each time
                repeatDelay: 0.5,        // Optional: delay between repeats
              }}
            />
          </g>
        ))}

        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--background))" stopOpacity="0" />
            <stop offset="5%" stopColor="#60a5fa" stopOpacity="1" />
            <stop offset="95%" stopColor="#60a5fa" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--background))" stopOpacity="0" />
          </linearGradient>
        </defs>

        {paths.map((path, i) => (
          <g key={`points-group-${i}`}>
            {["start", "end"].map((pointType) => {
              const point =
                pointType === "start" ? path.startPoint : path.endPoint;
              return (
                <g key={`${pointType}-${i}`}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="2"
                    fill="#60a5fa"
                  />
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="2"
                    fill="#60a5fa"
                    opacity="0.5"
                  >
                    <animate
                      attributeName="r"
                      from="2"
                      to="8"
                      dur="1.5s"
                      begin="0s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      from="0.5"
                      to="0"
                      dur="1.5s"
                      begin="0s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              );
            })}
          </g>
        ))}
      </svg>
    </div>
  );
}
