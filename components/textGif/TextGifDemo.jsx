"use client";
import React, { useEffect, useState } from "react";

/**
 * Reusable internal primitive that uses the verified-working approach:
 * - Preloads GIF
 * - Overlays background-clipped text
 */
function TextGifPrimitive({
  children,
  gifUrl,
  fontSize = "4rem",
  fontWeight = "bold",
  opacity = 1,
  backgroundSize = "200% 200%",
  backgroundRepeat = "repeat",
  backgroundPosition = "center",
}) {
  const [gifLoaded, setGifLoaded] = useState(false);

  useEffect(() => {
    if (!gifUrl) return;
    const img = new window.Image();
    img.onload = () => setGifLoaded(true);
    img.src = gifUrl;
  }, [gifUrl]);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Base Text (fallback/outline) */}
      <div
        style={{
          fontSize,
          fontWeight,
          color: "#222",
        }}
      >
        {children}
      </div>

      {/* GIF Overlay */}
      {gifLoaded && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            fontSize,
            fontWeight,
            backgroundImage: `url(${gifUrl})`,
            backgroundSize,
            backgroundRepeat,
            backgroundPosition,
            opacity,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            pointerEvents: "none",
            zIndex: 2,
          }}
        >
          {children}
        </div>
      )}

      {/* Ensure transparent fill for WebKit */}
      <style jsx>{`
        div {
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
}

/**
 * 1) Heading One
 * - Confetti-like GIF
 * - Extra large size, bold
 */
export function TextGifHeadingOne({ children, fontSize = "3rem" }) {
  const gifUrl = "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2k3bjdrOWVka3BkejgzMWwwN3QyMnphNXNmOWQzM284MTlseDVlaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YV3hvYumOAvWNLRAPH/giphy.gif";
  return (
    <TextGifPrimitive
      gifUrl={gifUrl}
      fontSize={fontSize}   // ✅ passed from props
      fontWeight="bold"
      opacity={0.9}
      backgroundSize="200% 200%"
      textShadow="0 2px 8px rgba(0,0,0,0.25)"
    >
      {children}
    </TextGifPrimitive>
  );
}


/**
 * 2) Heading Two
 * - Alternate GIF
 * - Larger size for hero sections
 */
export function TextGifHeadingTwo({ children }) {
  const gifUrl = "https://media.giphy.com/media/fnglNFjBGiyAFtm6ke/giphy.gif";
  return (
    <TextGifPrimitive
      gifUrl={gifUrl}
      fontSize="5rem"
      fontWeight="bold"
      opacity={0.9} // was 0.5
      backgroundSize="200% 200%"
      textShadow="0 2px 8px rgba(0,0,0,0.25)" // NEW
    >
      {children}
    </TextGifPrimitive>
  );
}

/**
 * 3) Heading Three
 * - Slightly smaller, heavier weight
 */
export function TextGifHeadingThree({ children }) {
  const gifUrl = "https://media.giphy.com/media/9Pmfazv34l7aNIKK05/giphy.gif";
  return (
    <TextGifPrimitive
      gifUrl={gifUrl}
      fontSize="3.5rem"
      fontWeight="900"
      opacity={0.9} // was 0.5
      backgroundSize="180% 180%"
      textShadow="0 2px 8px rgba(0,0,0,0.25)" // NEW
    >
      {children}
    </TextGifPrimitive>
  );
}

/**
 * 4) Heading Four
 * - Very large display headline
 */
export function TextGifHeadingFour({ children }) {
  const gifUrl = "https://media.giphy.com/media/4bhs1boql4XVJgmm4H/giphy.gif";
  return (
    <TextGifPrimitive
      gifUrl={gifUrl}
      fontSize="6rem"
      fontWeight="800"
      opacity={0.9} // was 0.5
      backgroundSize="220% 220%"
      textShadow="0 2px 8px rgba(0,0,0,0.25)" // NEW
    >
      {children}
    </TextGifPrimitive>
  );
}
