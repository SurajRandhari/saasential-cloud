import React, { Suspense } from "react";
import HomeHero from "./HomeHero";
import HomeAbout from "./HomeAbout";
import HomeCarasoul from "./HomeCarasoul";
import SpeakersSection from "./SpeakersSection";
import { MaskedDivSwiperCarousel } from "./MaskedDivSwiperCarousel";
import { LogoCarouselDemo } from "./LogoCarouselDemo";
import ParticleRing from "./ParticleRing";
import HomeBlog from "./HomeBlog";
import { MarqueeDemo } from "./Marquee";
import RequestDemoMain from "./RequestDemoMain";

export default function Home() {
  return (
    <div>
      <HomeHero />
      <HomeAbout />
      <Suspense
        fallback={<div className="h-96 bg-gray-100 animate-pulse rounded" />}
      >
        <HomeCarasoul />
      </Suspense>
      <SpeakersSection />
      <MaskedDivSwiperCarousel />
      <LogoCarouselDemo />
      <ParticleRing />
      <HomeBlog />
      <MarqueeDemo />
      <RequestDemoMain />
    </div>
  );
}
