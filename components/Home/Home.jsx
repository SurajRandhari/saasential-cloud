import React, { Suspense } from "react";
import HomeHero from "./HomeHero";
import HomeAbout from "./HomeAbout";
import HomeCarasoul from "./HomeCarasoul";
import SpeakersSection from "./SpeakersSection";

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
    </div>
  );
}
