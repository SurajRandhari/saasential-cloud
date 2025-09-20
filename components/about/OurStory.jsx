import React from "react";

const cards = [
  {
    title: "Our Purpose",
    description:
      "To deliver experiences that change the way your customers feel about your business",
    imageUrl:
      "https://webandcrafts.com/_next/image?url=https%3A%2F%2Fadmin.wac.co%2Fuploads%2Fpuopose_thump_296e93fb29.png&w=1080&q=90", // Replace with your image path
    link: "#",
  },
  {
    title: "Our Team",
    description:
      "Holistic leadership, holistic growth! A team of visionaries connected by shared commitments for a unified vision",
    imageUrl:
      "https://webandcrafts.com/_next/image?url=https%3A%2F%2Fadmin.wac.co%2Fuploads%2FTeam_thump_fbce73b0a4.png&w=1080&q=90",
    link: "#",
  },
  {
    title: "Awards & Recognitions",
    description:
      "Our dedication is fueled by your compliments, inspiring us to push the boundaries of excellence",
    imageUrl:
      "https://webandcrafts.com/_next/image?url=https%3A%2F%2Fadmin.wac.co%2Fuploads%2FWards_thump_e75529fc0d.png&w=1080&q=90",
    link: "#",
  },
  {
    title: "Our Brands",
    description:
      "We are one, but we are many! Transform your digital footprint with our trusted brands",
    imageUrl:
      "https://webandcrafts.com/_next/image?url=https%3A%2F%2Fadmin.wac.co%2Fuploads%2FBrands_thump_d1e6423cf4.png&w=1080&q=90",
    link: "#",
  },
];

export default function OurStory() {
  return (
    // <section className="w-full mt-8 px-4 space-y-8 py-20 z-40">
      <section className="relative w-full mt-8 px-4 space-y-8 py-20 z-20 bg-white">
      <div className="w-full flex flex-col text-center justify-center items-center">
        <h1 className="text-4xl md:text-6xl font-normal capitalize leading-tight md:leading-[52px]">
          Our Story
        </h1>
        <p className="mt-8 md:mt-12 text-sm md:text-lg leading-relaxed max-w-3xl text-gray-600">
          From humble origins to global trailblazers – the transformational
          journey of an Indian startup from a small town in Kerala, that moulded
          itself into a global technology game changer and now stands out from
          its peers. Our story is worth a good read!
        </p>
      </div>
      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 px-0 md:px-40">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white overflow-hidden flex flex-col px-8 group" // added group
          >
            {/* Image wrapper with hover zoom */}
            <div className="overflow-hidden">
              <img
                src={card.imageUrl}
                alt={card.title}
                className="w-full h-20 object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            <div className="py-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-600 flex-grow">{card.description}</p>
              <a
                href={card.link}
                className="mt-4 text-blue-600 hover:underline inline-flex items-center"
              >
                Learn more →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
