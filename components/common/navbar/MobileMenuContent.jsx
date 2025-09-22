"use client";
import React, { useState } from "react";
import Link from "next/link";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { GradientButton } from "../my-button/GradientButton";


export default function MobileMenuContent({ setIsMobileMenuOpen }) {
  const [openDropdowns, setOpenDropdowns] = useState({});

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleDropdown = (section) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="px-4 py-6 space-y-4">
      {/* Training */}
      <div>
        <Link 
          href="/training" 
          className="block text-black text-lg font-medium hover:text-gray-600 transition-colors py-2"
          onClick={handleLinkClick}
        >
          Training
        </Link>
      </div>

      {/* Services Dropdown */}
      <div>
        <button
          onClick={() => toggleDropdown('services')}
          className="flex items-center justify-between w-full text-black text-lg font-medium hover:text-gray-600 transition-colors py-2"
        >
          Services
          {openDropdowns.services ? 
            <IconChevronUp size={20} /> : 
            <IconChevronDown size={20} />
          }
        </button>
        
        {openDropdowns.services && (
          <div className="pl-4 mt-2 space-y-2 border-l border-gray-300">
           
            <Link href="/services/branding" className="block text-gray-600 hover:text-black transition-colors py-1" onClick={handleLinkClick}>
              Branding
            </Link>
            <Link href="/services/experience-design" className="block text-gray-600 hover:text-black transition-colors py-1" onClick={handleLinkClick}>
              Experience Design
            </Link>
            <Link href="/services/technologies" className="block text-gray-600 hover:text-black transition-colors py-1" onClick={handleLinkClick}>
              Technologies
            </Link>
            <Link href="/services/marketin" className="block text-gray-600 hover:text-black transition-colors py-1" onClick={handleLinkClick}>
              Marketing
            </Link>
          </div>
        )}
      </div>

      {/* Products Dropdown */}
      <div>
        <button
          onClick={() => toggleDropdown('products')}
          className="flex items-center justify-between w-full text-black text-lg font-medium hover:text-gray-600 transition-colors py-2"
        >
          Products
          {openDropdowns.products ? 
            <IconChevronUp size={20} /> : 
            <IconChevronDown size={20} />
          }
        </button>
        
        {openDropdowns.products && (
          <div className="pl-4 mt-2 space-y-2 border-l border-gray-300">
            <Link href="/product" className="block text-gray-600 hover:text-black transition-colors py-1" onClick={handleLinkClick}>
              Algochurn
            </Link>
            <Link href="https://tailwindmasterkit.com" className="block text-gray-600 hover:text-black transition-colors py-1" onClick={handleLinkClick}>
              Tailwind Master Kit
            </Link>
            <Link href="https://gomoonbeam.com" className="block text-gray-600 hover:text-black transition-colors py-1" onClick={handleLinkClick}>
              Moonbeam
            </Link>
            <Link href="https://userogue.com" className="block text-gray-600 hover:text-black transition-colors py-1" onClick={handleLinkClick}>
              Rogue
            </Link>
          </div>
        )}
      </div>

      {/* Resources Dropdown */}
      <div>
        <button
          onClick={() => toggleDropdown('resources')}
          className="flex items-center justify-between w-full text-black text-lg font-medium hover:text-gray-600 transition-colors py-2"
        >
          Resources
          {openDropdowns.resources ? 
            <IconChevronUp size={20} /> : 
            <IconChevronDown size={20} />
          }
        </button>
        
        {openDropdowns.resources && (
          <div className="pl-4 mt-2 space-y-2 border-l border-gray-300">
            <Link href="/whitepaper" className="block text-gray-600 hover:text-black transition-colors py-1" onClick={handleLinkClick}>
              Whitepaper
            </Link>
            <Link href="/blogs" className="block text-gray-600 hover:text-black transition-colors py-1" onClick={handleLinkClick}>
              Blogs
            </Link>
            <Link href="/webinars" className="block text-gray-600 hover:text-black transition-colors py-1" onClick={handleLinkClick}>
              Webinars
            </Link>
            <Link href="/casestudy" className="block text-gray-600 hover:text-black transition-colors py-1" onClick={handleLinkClick}>
              Case Study
            </Link>
          </div>
        )}
      </div>

      {/* Company Dropdown */}
      <div>
        <button
          onClick={() => toggleDropdown('company')}
          className="flex items-center justify-between w-full text-black text-lg font-medium hover:text-gray-600 transition-colors py-2"
        >
          Company
          {openDropdowns.company ? 
            <IconChevronUp size={20} /> : 
            <IconChevronDown size={20} />
          }
        </button>
        
        {openDropdowns.company && (
          <div className="pl-4 mt-2 space-y-2 border-l border-gray-300">
            <Link href="/about" className="block text-gray-600 hover:text-black transition-colors py-1" onClick={handleLinkClick}>
              About us
            </Link>
            <Link href="/careers" className="block text-gray-600 hover:text-black transition-colors py-1" onClick={handleLinkClick}>
              Careers
            </Link>
            <Link href="/contact" className="block text-gray-600 hover:text-black transition-colors py-1" onClick={handleLinkClick}>
              Contact Us
            </Link>
          </div>
        )}
      </div>

      {/* Schedule Demo Button */}
      <div className="pt-4 border-t border-gray-300">
        <Link href="/schedule-demo" onClick={handleLinkClick}>
          <GradientButton
            variant="gradient"
            className="w-fit text-center justify-center text-black text-base font-normal leading-tight"
          >
            Schedule Demo
          </GradientButton>
        </Link>
      </div>
    </div>
  );
}
