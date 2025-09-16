import AbouotVideoSEc from "@/components/about/AbouotVideoSEc";
import AboutConutiing from "@/components/about/AboutConutiing";
import AboutHero from "@/components/about/AboutHero";
import PageTop from "@/components/PageTop";
import React from "react";

export default function About() {
  return (
    <>
      <div className='container mx-auto font-["Oxanium"]'>
        <AboutHero />
      </div>
      <AbouotVideoSEc />
      <AboutConutiing />
    </>
  );
}
