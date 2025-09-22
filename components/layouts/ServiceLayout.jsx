"use client";
import React, { useEffect, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import FadeOverlay from "@/components/ui/FadeOverlay";
import Image from "next/image";
import { GradientButton } from "../common/my-button/GradientButton";

gsap.registerPlugin(ScrollTrigger);

// Bullet component
function Bullet({ children }) {
  return (
    <li className="flex items-start gap-2">
      <span className="text-neutral-400 select-none">-</span>
      <span>{children}</span>
    </li>
  );
}

const ServiceLayout = ({ heroData, servicesData, industriesData, className = "" }) => {
  const containerRef = useRef(null);

  // Use useLayoutEffect instead of useEffect for better sync
  useLayoutEffect(() => {
    // Clear any existing transforms on initial load
    gsap.set(".image-container", { clearProps: "all" });
    
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".image-container").forEach((img) => {
        // Set initial state explicitly
        gsap.set(img, { y: 0 });
        
        gsap.to(img, {
          y: "-100vh",
          ease: "none",
          scrollTrigger: {
            trigger: img.closest("section"),
            start: "top top", 
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            // Force refresh on page load
            refreshPriority: -1,
            onRefresh: () => {
              // Reset transform on refresh
              gsap.set(img, { y: 0 });
            }
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Handle page refresh and browser restore behavior  
  useEffect(() => {
    // Force scroll to top on page load (prevents browser restore scroll position)
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };

    const handleLoad = () => {
      // Clear all transforms and refresh
      gsap.set(".image-container", { clearProps: "all" });
      ScrollTrigger.refresh(true);
      
      // Small delay to ensure proper positioning
      setTimeout(() => {
        ScrollTrigger.refresh(true);
      }, 100);
    };

    // Prevent browser from restoring scroll position
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Force page to start at top
    window.scrollTo(0, 0);

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('load', handleLoad);
      // Restore scroll restoration behavior
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'auto';
      }
    };
  }, []);

  // Safe fallback for hero image
  const heroImage = servicesData && servicesData.length > 0 ? servicesData[0].image : null;

  return (
    <>
      <div 
        ref={containerRef} 
        className={`relative gradient-container ${className}`}
      >
        {/* Hero Section - First section with only heading and paragraph */}
        <section className="h-[70vh] w-full flex items-end justify-between px-8 lg:px-16">
          <div className="flex-1 pr-8 z-20">
            <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6 w-3/5">
              {heroData?.title || "Default Title"}
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
              {heroData?.description || "Default description"}
            </p>
          </div>
        </section>

        {/* Services Sections - Rest sections with heading, paragraph, and bullets */}
        {servicesData && servicesData.map((service, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <section
              key={service.title || index}
              className="h-screen w-full flex items-center justify-between px-8 lg:px-16 sticky top-0 z-10 "
            >
              {isEven ? (
                <>
                  {/* Text Content - Left Side */}
                  <div className="flex-1 pr-8 z-20 bg-white">
                    <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-6">
                      {service.title}
                    </h2>
                    <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
                      {service.description}
                    </p>
                    {/* Bullets */}
                    {service.bullets && (
                      <ul className="space-y-2 text-sm">
                        {service.bullets.map((bullet, bulletIndex) => (
                          <Bullet key={`${bullet}-${bulletIndex}`}>{bullet}</Bullet>
                        ))}
                      </ul>
                    )}
                    <GradientButton className="mt-4">Read More</GradientButton>

                  </div>
                  
                  {/* Image - Right Side */}
                  <FadeOverlay>
                    <div className="image-container flex items-center justify-center h-full">
                      <Image
                        src={service.image?.src || "https://images.pexels.com/photos/7661184/pexels-photo-7661184.jpeg"}
                        alt={service.image?.alt || `${service.title} illustration`}
                        width={1200}
                        height={800}
                        priority={index === 0}
                        className="max-h-[80vh] max-w-full object-contain rounded-lg shadow-lg mx-auto"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </FadeOverlay>
                </>
              ) : (
                <>
                  {/* Image - Left Side */}
                  <FadeOverlay>
                    <div className="image-container flex items-center justify-center h-full">
                      <Image
                        src={service.image?.src || "https://images.pexels.com/photos/7661184/pexels-photo-7661184.jpeg"}
                        alt={service.image?.alt || `${service.title} illustration`}
                        width={1200}
                        height={800}
                        priority={index === 0}
                        className="max-h-[80vh] max-w-full object-contain rounded-lg shadow-lg mx-auto"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </FadeOverlay>
                  
                  {/* Text Content - Right Side */}
                  <div className="flex-1 pl-8 z-20">
                    <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-6">
                      {service.title}
                    </h2>
                    <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
                      {service.description}
                    </p>
                    {/* Bullets */}
                    {service.bullets && (
                      <ul className="space-y-2 text-sm">
                        {service.bullets.map((bullet, bulletIndex) => (
                          <Bullet key={`${bullet}-${bulletIndex}`}>{bullet}</Bullet>
                        ))}
                      </ul>
                    )}
                    <GradientButton className="mt-4">Read More</GradientButton>
                  </div>

                </>
              )}
            </section>
          );
        })}
      </div>

      {/* Industries Section */}
      {industriesData && industriesData.length > 0 && (
        <section className="relative bg-neutral-950 text-neutral-100" style={{ zIndex: 200 }}>
          <div className="mx-auto max-w-[1600px] py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-12">
            <h3 className="text-xl font-semibold tracking-tight">Industries</h3>
            <p className="mt-2 text-sm text-neutral-400 max-w-[60ch]">
              We partner with clients across multiple sectors to ship meaningful products and results.
            </p>
            <div className="mt-8 divide-y divide-neutral-800 border-y border-neutral-800">
              {industriesData.map((row, rowIndex) => (
                <div
                  key={row.name || rowIndex}
                  className="grid grid-cols-1 md:grid-cols-3 gap-3 py-4"
                >
                  <div className="font-medium">{row.name}</div>
                  <div className="md:col-span-2 text-sm text-neutral-400">{row.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ServiceLayout;
