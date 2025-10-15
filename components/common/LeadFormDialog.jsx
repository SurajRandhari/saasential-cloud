"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { GradientButton } from "./my-button/GradientButton";


export function LeadFormDialog({ buttonLabel = "Get Started" }) {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("✅ Thank you! We’ll contact you soon.");
  };

  return (
    <Dialog>
      {/* Trigger styled same as GradientButton */}
      <DialogTrigger asChild>
        <GradientButton className="w-fit">{buttonLabel}</GradientButton>
      </DialogTrigger>

      {/* Modern Glassy Dialog */}
      <DialogContent className="sm:max-w-[500px] bg-white backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl p-6 z-[9999]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-center bg-gradient-to-r from-[#06BDFF] via-[#3b82f6] to-[#06BDFF] bg-clip-text text-transparent">
            Let’s Connect 🚀
          </DialogTitle>
          <p className="text-sm text-gray-500 text-center mt-1">
            Fill out the form and our team will reach out shortly.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Full Name */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="fullname" className="text-sm font-medium text-gray-700">
              Full Name
            </Label>
            <Input
              id="fullname"
              name="fullname"
              placeholder="John Doe"
              value={formData.fullname}
              onChange={handleChange}
              required
              className="rounded-xl border-gray-300 focus:border-[#06BDFF] focus:ring-2 focus:ring-[#06BDFF]/40 transition-all duration-200"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="rounded-xl border-gray-300 focus:border-[#06BDFF] focus:ring-2 focus:ring-[#06BDFF]/40 transition-all duration-200"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
              Phone
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+91 9876543210"
              value={formData.phone}
              onChange={handleChange}
              required
              className="rounded-xl border-gray-300 focus:border-[#06BDFF] focus:ring-2 focus:ring-[#06BDFF]/40 transition-all duration-200"
            />
          </div>

          {/* Subject */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
              Subject
            </Label>
            <Input
              id="subject"
              name="subject"
              placeholder="Service inquiry or topic"
              value={formData.subject}
              onChange={handleChange}
              required
              className="rounded-xl border-gray-300 focus:border-[#06BDFF] focus:ring-2 focus:ring-[#06BDFF]/40 transition-all duration-200"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="message" className="text-sm font-medium text-gray-700">
              Message
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Write your message..."
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              className="rounded-xl border-gray-300 focus:border-[#06BDFF] focus:ring-2 focus:ring-[#06BDFF]/40 transition-all duration-200 resize-none"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-center pt-4">
            <GradientButton type="submit" className="w-fit py-2 text-base font-semibold">
              Send Message
            </GradientButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
