"use client";
import React, { useEffect, useRef, useMemo, useCallback } from "react";

// Memoized SVG paths to prevent recreation
const svgPaths = {
  "type-1": {
    path: "M0.928955 40.9769C0.928955 18.9149 18.7917 1.01844 40.8536 0.976903L289.97 0.507853C308.413 0.473128 323.521 15.1483 324.022 33.5845L324.886 65.4007C325.955 104.745 358.022 136.159 397.38 136.417L432.98 136.65C447.818 136.748 459.797 148.799 459.803 163.637L459.982 550.982C459.992 573.08 442.08 591 419.982 591H40.9289C18.8376 591 0.928955 573.091 0.928955 551V40.9769Z",
    height: 591,
    width: 460,
  },
  "type-2": {
    path: "M0.928955 550.023C0.928955 572.085 18.7917 589.982 40.8536 590.023L289.97 590.492C308.413 590.527 323.521 575.852 324.022 557.416L324.886 525.599C325.955 486.255 358.022 454.841 397.38 454.583L432.98 454.35C447.818 454.252 459.797 442.201 459.803 427.363L459.982 40.0178C459.992 17.92 442.08 0 419.982 0H40.9289C18.8376 0 0.928955 17.909 0.928955 40V550.023Z",
    height: 591,
    width: 460,
  },
  "type-3": {
    path: "M459.071 40.9769C459.071 18.9149 441.208 1.01844 419.146 0.976903L170.03 0.507853C151.587 0.473128 136.479 15.1483 135.978 33.5845L135.114 65.4007C134.045 104.745 101.978 136.159 62.62 136.417L27.02 136.65C12.182 136.748 0.202661 148.799 0.196685 163.637L0.0175781 550.982C0.00781231 573.08 17.92 591 40.0178 591H419.071C441.162 591 459.071 573.091 459.071 551V40.9769Z",
    height: 591,
    width: 460,
  },
  "type-4": {
    path: "M459.071 550.023C459.071 572.085 441.208 589.982 419.146 590.023L170.03 590.492C151.587 590.527 136.479 575.852 135.978 557.416L135.114 525.599C134.045 486.255 101.978 454.841 62.62 454.583L27.02 454.35C12.182 454.252 0.202661 442.201 0.196685 427.363L0.0175781 40.0178C0.00781231 17.92 17.92 0 40.0178 0H419.071C441.162 0 459.071 17.909 459.071 40V550.023Z",
    height: 591,
    width: 460,
  },
};

const MaskedDiv = ({
  children,
  maskType = "type-1",
  className = "",
  backgroundColor = "transparent",
  size = 1,
  overlay,
}) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const observerRef = useRef(null);

  // Memoized mask configuration
  const selectedMask = useMemo(() => svgPaths[maskType], [maskType]);

  // Memoized SVG string
  const svgString = useMemo(() => {
    return `data:image/svg+xml,%3Csvg width='${selectedMask.width}' height='${selectedMask.height}' viewBox='0 0 ${selectedMask.width} ${selectedMask.height}' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fillRule='evenodd' clipRule='evenodd' d='${selectedMask.path}' fill='%23D9D9D9'/%3E%3C/svg%3E%0A`;
  }, [selectedMask]);

  // Memoized container style
  const containerStyle = useMemo(() => ({
    aspectRatio: `${selectedMask.width}/${selectedMask.height}`,
    backgroundColor,
    maskImage: `url("${svgString}")`,
    WebkitMaskImage: `url("${svgString}")`,
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskSize: "contain",
    WebkitMaskSize: "contain",
    width: `${size * 100}%`,
    maxWidth: "100%",
    margin: "0 auto",
    contain: 'layout style paint',
    willChange: 'transform',
  }), [selectedMask, backgroundColor, svgString, size]);

  // Optimized video play handler
  const playVideo = useCallback(async (videoElement) => {
    if (!videoElement) return;
    
    try {
      await videoElement.play();
    } catch (error) {
      // Handle autoplay prevention silently
      console.debug('Video autoplay prevented:', error);
    }
  }, []);

  // Optimized video pause handler
  const pauseVideo = useCallback((videoElement) => {
    if (!videoElement) return;
    videoElement.pause();
  }, []);

  // Optimized visibility change handler
  const handleVisibilityChange = useCallback(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (document.hidden) {
      pauseVideo(videoElement);
    } else {
      playVideo(videoElement);
    }
  }, [playVideo, pauseVideo]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    // Document visibility listener
    document.addEventListener("visibilitychange", handleVisibilityChange, { passive: true });

    // Optimized Intersection Observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            playVideo(video);
          } else {
            pauseVideo(video);
          }
        });
      },
      {
        threshold: 0.25, // Play when 25% visible
        rootMargin: '10% 0px', // Start loading 10% before entering viewport
      }
    );

    observerRef.current.observe(videoElement);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (observerRef.current && videoElement) {
        observerRef.current.unobserve(videoElement);
        observerRef.current.disconnect();
      }
    };
  }, [handleVisibilityChange, playVideo, pauseVideo]);

  return (
    <section 
      ref={containerRef}
      className={`relative overflow-hidden gpu-layer ${className}`} 
      style={containerStyle}
    >
      {React.cloneElement(children, {
        ref: videoRef,
        className: `w-full h-full object-cover transition-transform duration-500 hover:scale-102 ${
          children.props.className || ""
        }`,
        style: {
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          ...children.props.style,
        },
      })}
      {overlay && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {overlay}
        </div>
      )}
    </section>
  );
};

export default MaskedDiv;
