import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import { ToolCase, ToolCaseIcon } from "lucide-react";

const reviews = [
  {
    name: "Semrush",
    img: "https://logo.clearbit.com/semrush.com",
  },
  {
    name: "Ahrefs",
    img: "https://logo.clearbit.com/ahrefs.com",
  },
  {
    name: "Moz",
    img: "https://logo.clearbit.com/moz.com",
  },
  {
    name: "Screaming Frog",
    img: "https://logo.clearbit.com/screamingfrog.co.uk",
  },
  {
    name: "Surfer SEO",
    img: "https://logo.clearbit.com/surferseo.com",
  },
  {
    name: "Google Analytics",
    img: "https://logo.clearbit.com/marketingplatform.google.com",
  },
  {
    name: "Google Search Console",
    img: "https://logo.clearbit.com/google.com",
  },
  {
    name: "Yoast SEO",
    img: "https://logo.clearbit.com/yoast.com",
  },
  {
    name: "Rank Math",
    img: "https://logo.clearbit.com/rankmath.com",
  },
  {
    name: "SE Ranking",
    img: "https://logo.clearbit.com/seranking.com",
  },
  {
    name: "Similarweb",
    img: "https://logo.clearbit.com/similarweb.com",
  },
  {
    name: "Keyword.com",
    img: "https://logo.clearbit.com/keyword.com",
  },
];


// Duplicate the data for seamless looping
const firstRow = [...reviews.slice(0, reviews.length / 2), ...reviews.slice(0, reviews.length / 2)];
const secondRow = [...reviews.slice(reviews.length / 2), ...reviews.slice(reviews.length / 2)];

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className={cn(
        "relative h-full cursor-pointer overflow-hidden rounded-full flex items-center mr-4 px-6 py-2 min-w-fit whitespace-nowrap",
        "bg-white/80 backdrop-blur-sm border border-gray-200/50",
        "transition-all duration-300 ease-in-out",
        "hover:bg-white/90 hover:border-gray-300/50 hover:scale-105 hover:shadow-lg"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <img 
          className="rounded-full flex-shrink-0" 
          width="32" 
          height="32" 
          alt={`${name}'s avatar`} 
          src={img} 
        />
        <figcaption className="text-sm font-medium text-gray-800">
          {name}
        </figcaption>
      </div>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden  bg-gradient-to-b from-gray-50/50 to-white pt-[150px]">
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center text-center mb-12 px-4">
        {/* Small Section Title */}

        
        
        {/* Main Title */}
        <h2 className="text-2xl md:text-4xl font-normal capitalize leading-tight md:leading-[52px]  max-w-4xl">
          We are using
          <br />
          the best-fit tool stack to scale
          <br />
          your marketing performance
        </h2>
      </div>

      {/* Marquee Section */}
      <div className="relative w-full">
        <Marquee 
          pauseOnHover 
          className="[--duration:30s] mb-4" 
          speed={40}
        >
          {firstRow.map((review, index) => (
            <ReviewCard key={`${review.username}-${index}`} {...review} />
          ))}
        </Marquee>
        
        <Marquee 
          reverse 
          pauseOnHover 
          className="[--duration:30s]" 
          speed={40}
        >
          {secondRow.map((review, index) => (
            <ReviewCard key={`${review.username}-reverse-${index}`} {...review} />
          ))}
        </Marquee>
        
        {/* Gradient overlays for smooth fade effect */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-gray-50 via-gray-50/80 to-transparent z-10"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-gray-50 via-gray-50/80 to-transparent z-10"></div>
      </div>
    </div>
  );
}
