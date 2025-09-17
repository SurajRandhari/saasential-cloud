"use client"

import LogoCarousel from "../ui/logo-carousel"
import Link from "next/link"

export function LogoCarouselDemo() {
  return (
    <div className="space-y-8 pb-20">
      <div className="w-full max-w-screen-lg mx-auto flex flex-col items-center space-y-8">
        <div className="text-center">
          <text className="text-2xl md:text-4xl font-normal capitalize leading-tight md:leading-[52px]" >
            The best are already here
          </text>
          <Link href="https://www.newcult.co" target="_blank">
            <h2 className="text-2xl">Our Clients</h2>
          </Link>
        </div>

        <LogoCarousel columnCount={3} />
      </div>
    </div>
  )
}
