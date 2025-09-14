import React from "react";
import Image from "next/image";
import Link from "next/link";
import { NavbarDropdowns } from "./NavbarDropdowns";
import { Menu, MenuItem } from "../ui/navbar-menu";
import { GradientButton } from "../my-button/GradientButton";

export  function DesktopNavbar({ active, setActive }) {
  return (
    <div className="hidden md:block">
      <Menu setActive={setActive}>
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/">
            <Image
              src="/images/logo/Saas_Logo_blk.png"
              alt="Logo"
              width={140}
              height={40}
              className="object-contain cursor-pointer"
              priority
            />
          </Link>
        </div>

        <div className="flex items-center space-x-6">
          <MenuItem setActive={setActive} active={active} item="Training" href="/training" />
          
          <NavbarDropdowns 
            setActive={setActive} 
            active={active} 
          />

          <Link href="/schedule-demo">
            <GradientButton
              variant="gradient"
              className="text-center justify-center text-black text-base font-normal leading-tight"
            >
              Schedule Demo
            </GradientButton>
          </Link>
        </div>
      </Menu>
    </div>
  );
}
