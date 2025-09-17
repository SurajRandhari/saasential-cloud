"use client";
import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // Removed unused modules

// Swiper styles
import "swiper/css";
import MaskedDiv from "../ui/masked-div";

export function MaskedDivSwiperCarousel() {
  // Memoized slide data to prevent recreation on every render
  const slidesData = useMemo(() => [
    {
      maskType: "type-1",
      videoSrc: "https://videos.pexels.com/video-files/7710243/7710243-uhd_2560_1440_30fps.mp4",
      title: "Branding",
    },
    {
      maskType: "type-2",
      videoSrc: "https://videos.pexels.com/video-files/18069803/18069803-uhd_1440_2560_24fps.mp4",
      title: "Experience Design",
    },
    {
      maskType: "type-3",
      videoSrc: "https://videos.pexels.com/video-files/18069166/18069166-uhd_2560_1440_24fps.mp4",
      title: "Marketing",
    },
    {
      maskType: "type-4",
      videoSrc: "https://videos.pexels.com/video-files/18069701/18069701-uhd_2560_1440_24fps.mp4",
      title: "Technologies",
    },
  ], []);

  // Optimized Swiper configuration
  const swiperConfig = useMemo(() => ({
    modules: [Autoplay],
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    autoplay: {
      delay: 4000, // Increased for better UX
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    speed: 600, // Reduced for smoother transitions
    grabCursor: true,
    touchRatio: 1,
    touchAngle: 45,
    breakpoints: {
      640: { slidesPerView: 1.5, spaceBetween: 20 },
      768: { slidesPerView: 2, spaceBetween: 30 },
      1024: { slidesPerView: 2.5, spaceBetween: 40 },
      1280: { slidesPerView: 3, spaceBetween: 50 },
      1536: { slidesPerView: 3.5, spaceBetween: 60 },
    },
  }), []);

  return (
    <div className="max-w-7xl mx-auto my-20 px-4 performance-section">
      <Swiper
        {...swiperConfig}
        className="maskedDiv-swiper"
      >
        {/* Generate SwiperSlide from data - doubled for seamless loop */}
        {[...slidesData, ...slidesData].map((slide, index) => (
          <SwiperSlide key={`${slide.maskType}-${index}`}>
            <MaskedDiv
  maskType={slide.maskType}
  size={0.95}
  className="mx-auto relative"
  overlay={
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {/* Gradient scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      {/* Text */}
      <h3 className="relative z-10 text-white text-2xl md:text-3xl font-semibold drop-shadow-lg px-4 pb-4">
        {slide.title}
      </h3>
    </div>
  }
>
  <video 
    autoPlay
    loop
    muted
    playsInline
    preload="metadata"
    loading="lazy"
    className="w-full h-full object-cover"
  >
    <source src={slide.videoSrc} type="video/mp4" />
  </video>
</MaskedDiv>

          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
