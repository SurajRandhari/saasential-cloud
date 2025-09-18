"use client";
import React, { useState, useMemo, useCallback } from "react";
import ProjectCard from "@/components/ProjectCard";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import AnimatedLetters from "../ui/AnimatedLetters";

const projectData = [
  {
    category: "Training",
    name: "SaaS Training",
    Description:
      "Ready for a new look? We'll help you update to a more modern design that reflects your current branding, brings your website's look and feel up to your standards, and appeals to prospects.",
    images: [
      {
        src: "/images/services/servicess-1.jpg",
        label: "Service One",
        url: "/",
      },
      {
        src: "/images/services/servicess-2.jpg",
        label: "Service Two",
        url: "/",
      },
      {
        src: "/images/services/servicess-3.jpg",
        label: "Service Three",
        url: "/",
      },
      {
        src: "/images/services/servicess-4.jpg",
        label: "Service Four",
        url: "/",
      },
      {
        src: "/images/services/servicess-5.jpg",
        label: "Service Five",
        url: "/",
      },
    ],
    link: "/",
  },
  {
    category: "Services",
    name: "Marketing for SaaS",
    Description:
      "Ready for a new look? We'll help you update to a more modern design that reflects your current branding, brings your website's look and feel up to your standards, and appeals to prospects.",
    images: [
      { src: "/images/services/servicess-1.jpg", label: "SEO" },
      { src: "/images/services/servicess-2.jpg", label: "Email Marketing" },
      { src: "/images/services/servicess-3.jpg", label: "Web Development" },
      { src: "/images/services/servicess-4.jpg", label: "Service Four" },
      { src: "/images/services/servicess-5.jpg", label: "Service Five" },
    ],
    link: "/",
  },
  {
    category: "Products",
    name: "Software Sales Support",
    Description:
      "Ready for a new look? We'll help you update to a more modern design that reflects your current branding, brings your website's look and feel up to your standards, and appeals to prospects.",
    images: [
      { src: "/images/services/servicess-1.jpg", label: "SEO" },
      { src: "/images/services/servicess-2.jpg", label: "Email Marketing" },
      { src: "/images/services/servicess-3.jpg", label: "Web Development" },
      { src: "/images/services/servicess-4.jpg", label: "Service Four" },
      { src: "/images/services/servicess-5.jpg", label: "Service Five" },
    ],
    link: "/",
  },
];

const HomeCarasoul = () => {
  const [category, setCategory] = useState("Training");

  // Memoize categories to prevent recalculation
  const categories = useMemo(
    () => [...new Set(projectData.map((item) => item.category))],
    []
  );

  // Memoize filtered projects
  const filteredProjects = useMemo(
    () => projectData.filter((project) => project.category === category),
    [category]
  );

  // Memoize category change handler
  const handleCategoryChange = useCallback((newCategory) => {
    setCategory(newCategory);
  }, []);

  return (
    <section className=" z-20 bg-white flex items-center justify-center text-sm font-normal pt-[150px]">
      <div className="w-full">
        <Tabs
          value={category}
          onValueChange={handleCategoryChange}
          className="mb-4"
        >
          <div className="flex justify-center">
            <TabsList
              className="grid gap-2 md:gap-4 max-w-[1240px] mx-auto mb-8 md:border-none dark:border-none"
              style={{
                gridTemplateColumns: `repeat(${categories.length}, 1fr)`,
              }}
            >
              {categories.map((cat) => (
                <TabsTrigger
                  value={cat}
                  key={cat}
                  className="capitalize font-normal text-lg md:text-xl px-4 py-2"
                >
                  <AnimatedLetters
                    text={cat}
                    isActive={category === cat}
                    colors={{
                      initial: "currentColor", // inherits from TabsTrigger
                      hover: "#0B8AE5",
                    }}
                    activeColor="#0B8AE5"
                  />
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div>
            <TabsContent value={category} className="mt-0">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={`${project.category}-${index}`}
                  project={project}
                />
              ))}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default HomeCarasoul;
