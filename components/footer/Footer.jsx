"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";
import { Mail, Phone } from "lucide-react";
import { GradientButton } from "../my-button/GradientButton";

// Animated Text Component (same as before)
const AnimatedText = ({ text, isActive = false }) => {
    const [isHovered, setIsHovered] = useState(false);

    const containerVariants = {
        initial: {},
        hover: {
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0,
            },
        },
        exit: {
            transition: {
                staggerChildren: 0.03,
                staggerDirection: -1,
            },
        },
    };

    const letterVariants = {
        initial: { 
            color: "#333",
        },
        hover: {
            color: "#0096ff",
            transition: { 
                type: "spring", 
                stiffness: 120, 
                damping: 14,
                duration: 0.3
            },
        },
        exit: {
            color: "#333",
            transition: { 
                type: "spring", 
                stiffness: 120, 
                damping: 14,
                duration: 0.3
            },
        },
    };

    return (
        <motion.span
            className="cursor-pointer inline-block"
            variants={containerVariants}
            initial="initial"
            animate={isHovered ? "hover" : "exit"}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {text.split("").map((letter, index) => (
                <motion.span
                    key={`${letter}-${index}`}
                    variants={letterVariants}
                    className="inline-block"
                >
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
        </motion.span>
    );
};

// Social Icons Array with custom SVGs
const socialIcons = [
    {
        name: "Facebook",
        src: "images/socials/fb.svg",
        alt: "Facebook",
        href: "https://facebook.com/saasential"
    },
    {
        name: "Instagram", 
        src: "images/socials/insta.svg",
        alt: "Instagram",
        href: "https://instagram.com/saasential"
    },
    {
        name: "LinkedIn",
        src: "images/socials/linkedin.svg", 
        alt: "LinkedIn",
        href: "https://linkedin.com/company/saasential"
    },
    {
        name: "WhatsApp",
        src: "images/socials/whatsapp.svg",
        alt: "WhatsApp", 
        href: "https://wa.me/1234567890"
    },
    {
        name: "X (Twitter)",
        src: "images/socials/x.svg",
        alt: "X (Twitter)",
        href: "https://x.com/saasential"
    }
];

export default function Footer() {
    return (
        <footer className="w-full bg-[#f8f9fa] text-[#333] px-4 sm:px-6 md:px-10 py-8 md:py-12 text-sm font-normal font-['Oxanium']">
            {/* Top Grid - Responsive layout */}
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12 items-start">

                {/* Column 1: Logo + Description */}
                <div className="flex flex-col text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start space-x-3 h-12 mb-4 lg:mb-6">
                        <Image
                            src="/images/logo/Saas_Logo_blk.png"
                            alt="Saasential Logo"
                            width={190}
                            height={100}
                            className="object-contain"
                            priority
                        />
                        {/* <AnimatedText text="SAASENTIAL" /> */}
                    </div>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-sm mx-auto lg:mx-0">
                        Saasential is your trusted partner in business growth, offering comprehensive corporate training solutions, cutting-edge digital marketing services, and expert software sales support.
                    </p>
                </div>

                {/* Column 2: Navigation Links - Mobile: 2 columns, Desktop: 2 columns */}
                <div className="grid grid-cols-2 gap-4 lg:gap-8 text-center lg:text-left">
                    {/* Industries */}
                    <div className="flex flex-col">
                        <h4 className="text-[#0096ff] font-semibold text-sm lg:text-base h-8 lg:h-12 flex items-center justify-center lg:justify-start mb-2 lg:mb-4">
                            Industries
                        </h4>
                        <ul className="space-y-1 lg:space-y-3 text-gray-700 text-xs lg:text-sm leading-relaxed">
                            <li><AnimatedText text="Healthcare" /></li>
                            <li><AnimatedText text="Banking & Financial" /></li>
                            <li><AnimatedText text="Retail & eCommerce" /></li>
                            <li><AnimatedText text="Public Sector" /></li>
                            <li><AnimatedText text="IT Companies" /></li>
                            <li><AnimatedText text="Video Marketing" /></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="flex flex-col">
                        <h4 className="text-[#0096ff] font-semibold text-sm lg:text-base h-8 lg:h-12 flex items-center justify-center lg:justify-start mb-2 lg:mb-4">
                            Company
                        </h4>
                        <ul className="space-y-1 lg:space-y-3 text-gray-700 text-xs lg:text-sm leading-relaxed">
                            <li><AnimatedText text="Training" /></li>
                            <li><AnimatedText text="Service" /></li>
                            <li><AnimatedText text="Products" /></li>
                            <li><AnimatedText text="Works" /></li>
                            <li><AnimatedText text="Blog" /></li>
                            <li><AnimatedText text="Contact Us" /></li>
                        </ul>
                    </div>
                </div>

                {/* Column 3: Newsletter + Social */}
                <div className="flex flex-col text-center lg:text-left">
                    <h4 className="text-[#0096ff] font-semibold text-sm lg:text-base h-8 lg:h-12 flex items-center justify-center lg:justify-start mb-2 lg:mb-4">
                        Join a Newsletter
                    </h4>
                    
                    <label htmlFor="newsletter-email" className="text-gray-700 text-xs lg:text-sm mb-2 lg:mb-3 block">
                        Your Email
                    </label>
                    
                    {/* Newsletter Form */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 lg:gap-3 mb-4 lg:mb-6">
                        <input
                            id="newsletter-email"
                            type="email"
                            placeholder="Enter Your Email"
                            className="flex-1 px-3 lg:px-4 py-2 lg:py-3 border border-[#0096ff] text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0096ff]/50 transition-all duration-300 text-xs lg:text-sm"
                        />
                        <GradientButton
                            variant="gradient"
                            className="px-4 lg:px-6 py-2 lg:py-3 text-black text-xs lg:text-sm font-medium whitespace-nowrap hover:scale-105 transition-transform duration-300"
                        >
                            Subscribe
                        </GradientButton>
                    </div>
                    
                    {/* Social Icons */}
                    <div className="flex gap-3 lg:gap-5 justify-center lg:justify-start">
                        {socialIcons.map((social, index) => (
                            <a
                                key={index}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group cursor-pointer transition-all duration-200 ease-out hover:scale-110"
                                aria-label={social.name}
                                style={{
                                    willChange: 'transform',
                                    transform: 'translateZ(0)'
                                }}
                            >
                                <Image
                                    src={social.src}
                                    alt={social.alt}
                                    width={32}
                                    height={32}
                                    className="lg:w-10 lg:h-10 object-contain transition-all duration-200 ease-out group-hover:drop-shadow-lg"
                                    style={{
                                        filter: 'drop-shadow(0 0 0 transparent)',
                                        willChange: 'filter'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.filter = 'drop-shadow(0 6px 12px rgba(0, 150, 255, 0.4))';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.filter = 'drop-shadow(0 0 0 transparent)';
                                    }}
                                />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-blue-200 my-6 lg:my-10" />

            {/* Bottom Row - Contact Info */}
            <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center justify-between text-gray-700 space-y-3 lg:space-y-0 text-center lg:text-left">
                <div className="text-xs lg:text-sm">
                    <AnimatedText text="© 2025 | Saasential. All rights reserved." />
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-3 lg:gap-8">
                    <a 
                        href="mailto:hello@saasential.com"
                        className="flex items-center gap-2 hover:text-[#0096ff] transition-colors duration-300 hover:scale-105 text-xs lg:text-sm"
                    >
                        <Mail className="w-3 h-3 lg:w-4 lg:h-4 text-[#0096ff]" />
                        <AnimatedText text="hello@saasential.com" />
                    </a>
                    
                    <a 
                        href="tel:+1000000000"
                        className="flex items-center gap-2 hover:text-[#0096ff] transition-colors duration-300 hover:scale-105 text-xs lg:text-sm"
                    >
                        <Phone className="w-3 h-3 lg:w-4 lg:h-4 text-[#0096ff]" />
                        <AnimatedText text="+1 000-000-0000" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
