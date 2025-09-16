"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

import { useScrollDirection } from "@/hooks/useScrollDirection";
import { DesktopNavbar } from "./DesktopNavbar";
import { MobileNavbar } from "./MobileNavbar";

export function NavbarHead() {
  return (
    <div className="relative w-full">
      <Navbar />
    </div>
  );
}

function Navbar({ className }) {
  const [active, setActive] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollDirection = useScrollDirection();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div 
      className={cn(
        "fixed top-0 w-full z-[9999] px-4 transition-transform duration-300 ease-in-out",
        scrollDirection === "down" ? "-translate-y-full" : "translate-y-0",
        className
      )}
    >
      <div className="max-w-[1600px] w-full mx-auto pt-4">
        <DesktopNavbar active={active} setActive={setActive} />
        <MobileNavbar 
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
        />
      </div>
    </div>
  );
}
