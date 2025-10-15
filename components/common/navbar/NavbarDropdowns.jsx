import React, { useEffect, useState } from "react";
import { HoveredLink, MenuItem, ProductItem } from "../../ui/navbar-menu";

export  function NavbarDropdowns({ setActive, active }) {
   const [services, setServices] = useState([]);

   useEffect(() => {
    async function fetchServices() {
      const res = await fetch('/api/services');
      if (res.ok) {
        const data = await res.json();
        setServices(data); // Array of { name, slug, ... }
      }
    }
    fetchServices();
  }, []);

  return (
    <>
      <MenuItem setActive={setActive} active={active} item="Services">
        <div className="flex flex-col space-y-4 text-sm">
          {services.length === 0 
            ? <span className="text-xs text-muted-foreground">Loading...</span>
            : services.map(service => (
                <HoveredLink 
                  key={service._id || service.slug} 
                  href={`/services/${service.slug}`}>
                  {service.name}
                </HoveredLink>
              ))
          }
        </div>
      </MenuItem>

      <MenuItem setActive={setActive} active={active} item="Products">
        <div className="text-sm grid grid-cols-2 gap-10 p-4">
          <ProductItem
            title="Algochurn"
            href="/product"
            src="https://assets.aceternity.com/demos/algochurn.webp"
            description="Prepare for tech interviews like never before."
          />
          <ProductItem
            title="Tailwind Master Kit"
            href="https://tailwindmasterkit.com"
            src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
            description="Production ready Tailwind css components for your next project"
          />
          <ProductItem
            title="Moonbeam"
            href="https://gomoonbeam.com"
            src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
            description="Never write from scratch again. Go from idea to blog in minutes."
          />
          <ProductItem
            title="Rogue"
            href="https://userogue.com"
            src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
            description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
          />
        </div>
      </MenuItem>

      <MenuItem setActive={setActive} active={active} item="Resources">
        <div className="flex flex-col space-y-4 text-sm">
          <HoveredLink href="/whitepaper">Whitepaper</HoveredLink>
          <HoveredLink href="/blogs">Blogs</HoveredLink>
          <HoveredLink href="/webinars">Webinars</HoveredLink>
          <HoveredLink href="/casestudy">Case Study</HoveredLink>
        </div>
      </MenuItem>

      <MenuItem setActive={setActive} active={active} item="Company">
        <div className="flex flex-col space-y-4 text-sm">
          <HoveredLink href="/about">About us</HoveredLink>
          <HoveredLink href="/careers">Careers</HoveredLink>
          <HoveredLink href="/contact">Contact Us</HoveredLink>
        </div>
      </MenuItem>
    </>
  );
}
