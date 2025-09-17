"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone } from "lucide-react";
import AceWorldMapDemo from "../nextbunny/features/AceWorldMapDemo";
import { TextGifHeadingFour, TextGifHeadingOne, TextGifHeadingThree, TextGifHeadingTwo } from "../textGif/TextGifDemo";
import { GradientButton } from "../common/my-button/GradientButton";

export default function Contact() {
  return (
    <section className=" font-['Oxanium']">
      {/* Banner Section with Video */}
      <div className="relative w-full h-[320px] md:h-[420px] overflow-hidden flex items-center justify-center ">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/contact.webm"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      <section className="relative w-full ">
        <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-start  ">
          {/* Left side: Contact Info */}
          <div className="flex flex-col justify-center space-y-6">
            <h2 className="text-4xl font-semibold">Contact Us</h2>
            <div className="  text-thin">
              <p>
                {" "}
                At <strong>SAASENTIAL</strong>, we believe meaningful growth
                begins with the right conversation.{" "}
              </p>

              <p>
                Whether you're a startup ready to scale or an established
                business seeking digital momentum, we’re here to support your
                journey. We specialize in crafting intelligent, forward-thinking
                solutions that help businesses adapt, evolve, and thrive in a
                rapidly changing world.
              </p>

              <p>
                If you’re looking to enhance your digital presence, streamline
                operations, or explore new opportunities — we’re ready to
                listen.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-blue-400" />
              <span>info@squareevents.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-blue-400" />
              <span>Support: (+21) 123 456 586</span>
            </div>
          </div>

          {/* Right side: Form Box */}
          <div className="bg-white/30 text-gray-500 rounded-xl shadow-lg pt-0 p-8 border border-white/20 backdrop-blur-md">
                  <TextGifHeadingOne>For More Details</TextGifHeadingOne>
            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Full Name"
                  className="bg-white text-black placeholder:text-gray-500 rounded-md px-4 py-2 border border-transparent shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0B8AE5]"
                />
                <Input
                  placeholder="Company"
                  className="bg-white text-black placeholder:text-gray-500 rounded-md px-4 py-2 border border-transparent shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0B8AE5]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Email"
                  className="bg-white text-black placeholder:text-gray-500 rounded-md px-4 py-2 border border-transparent shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0B8AE5]"
                />
                <Input
                  placeholder="Phone number"
                  className="bg-white text-black placeholder:text-gray-500 rounded-md px-4 py-2 border border-transparent shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0B8AE5]"
                />
              </div>

              <Input
                placeholder="Location"
                className="bg-white text-black placeholder:text-gray-500 rounded-md px-4 py-2 border border-transparent shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0B8AE5]"
              />

              <Textarea
                placeholder="Your message"
                rows={10}
                className="bg-white text-black placeholder:text-gray-500 rounded-md px-4 py-2 border border-transparent shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0B8AE5]"
              />

              <GradientButton
                variant="gradient"
                className="mt-4 px-6 py-3 w-fit  text-base font-medium"
              >
                Send Message
              </GradientButton>
            </form>
          </div>
        </div>
      </section>
      <div>
        <AceWorldMapDemo />
      </div>
      
    </section>
  );
}
