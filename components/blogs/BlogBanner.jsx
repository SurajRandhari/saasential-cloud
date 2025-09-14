import React from "react";
import { TextGifHeadingOne } from "../textGif/TextGifDemo";

export default function BlogBanner() {
  return (
    <div className="relative w-full h-[350px] md:h-[420px] overflow-hidden flex items-center justify-center">
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-20" // ✅ opacity added
        src="/videos/webinar.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="mx-auto px-4 py-16 text-center">
          <TextGifHeadingOne fontSize="6rem">Blogs</TextGifHeadingOne>
        </div>
    </div>
  );
}
