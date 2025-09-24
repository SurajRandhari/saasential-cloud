// app/whitepaper/page.jsx

import { TextGifHeadingOne } from "@/components/textGif/TextGifDemo";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { listWhitepapers } from "@/lib/services/whitepaper";
import Image from "next/image";
import Link from "next/link";

export default async function WhitepaperHub() {
  const items = await listWhitepapers();

  return (
    <div className="mt-12 p-6">
      <div className="mx-auto px-4 py-16 text-center">
        <TextGifHeadingOne fontSize="6rem">Whitepaper</TextGifHeadingOne>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
        {items.map((w) => (
          <div
            key={w._id}
            className="border-[0.2] border-gray-200 rounded overflow-hidden"
          >
            {/* Image (not portrait) */}
            <div className="w-full h-70 relative">
              <Image
                src={w.thumb?.secure_url}
                alt={w.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Interactive Hover Button */}
            <div className="p-4 flex justify-center">
              <Link href={`/whitepaper/${w.slug}`}>
                <InteractiveHoverButton>Read More</InteractiveHoverButton>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
