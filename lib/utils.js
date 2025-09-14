import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function Container({ className, children }) {
  return (
    <div
      className={cn(
        " w-full max-w-[1600px] mx-auto h-full items-center px-4 sm:px-6 md:px-8 lg:px-12 ",
        className
      )}
    >
      {children}
    </div>
  )
}