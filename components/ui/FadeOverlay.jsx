import React from "react";

export default function FadeOverlay({ children }) {
  return (
    <div
      className="flex-1 flex items-center justify-center overflow-hidden relative h-screen"
      style={{
        background: `
          linear-gradient(
            180deg,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,1) 20%,
            rgba(255,255,255,1) 100%
          )
        `,
      }}
    >
      {children}
    </div>
  );
}
