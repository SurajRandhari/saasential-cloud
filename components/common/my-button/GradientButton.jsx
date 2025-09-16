"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

function GradientButton({ className, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium",
        "h-10 px-6  text-black cursor-pointer",
        "bg-gradient-to-r from-white via-[#06BDFF] to-white",
        "bg-[length:200%_100%] bg-left hover:bg-right",
        "transition-[background-position,colors] duration-700 ease-in-out",
        className
      )}
      {...props}
    />
  );
}

export { GradientButton };
