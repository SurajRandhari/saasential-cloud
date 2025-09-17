"use client"
import { useRef } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

// Optimized image (no animation, using Next.js Image)
function OptimizedImage({ src, alt, className = "", rounded = "rounded-md", eager = false }) {
  const ref = useRef(null)
  return (
    <div ref={ref} className="overflow-hidden">
      <Image
        src={src}
        alt={alt}
        width={600}
        height={800}
        className={`w-full h-auto object-cover ${rounded} ${className}`}
        loading={eager ? "eager" : "lazy"}
        priority={eager}
      />
    </div>
  )
}

// Bullet list
function Bullet({ children }) {
  return (
    <li className="flex items-start gap-2">
      <span className="text-neutral-400 select-none">-</span>
      <span>{children}</span>
    </li>
  )
}

export default function ServicesHome() {
  return (
    <div className="w-full">
      <main className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <Hero />
        <Services />
      </main>
      <Industries />
    </div>
  )
}

function Hero() {
  return (
    <section className="py-10 sm:py-14 lg:py-16 h-[80vh] flex justify-center items-center">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div className="space-y-5">
          <h1 className="text-3xl sm:text-5xl font-semibold leading-snug tracking-tight">
            A full-service digital innovation partner
          </h1>
          <p className="text-muted-foreground max-w-[55ch]">
            We craft brands, products, websites, and growth programs with strategy, design, and technology.
          </p>
        </div>
      </div>
    </section>
  )
}

function Services() {
  const services = [
    {
      title: "Branding & Logo",
      description: "Define a distinctive identity and visual system that scales across every touchpoint.",
      bullets: [
        "Logo Design & Brand Guidelines",
        "Graphic Design",
        "Diagrams & Infographics",
        "Motion Graphics & Animations",
        "Mockups",
        "Editing & VFX",
      ],
      image: {
        src: "https://images.pexels.com/photos/7661184/pexels-photo-7661184.jpeg",
        alt: "Branding moodboard on desk",
      }
    },
    {
      title: "Experience Design",
      description: "Design human-centered interfaces across platforms that are clear, elegant, and delightful.",
      bullets: [
        "UI & UX Design",
        "Website Design",
        "Mobile Experience",
        "Commerce Experience",
        "Human–Machine Interface",
      ],
      image: {
        src: "https://images.pexels.com/photos/9219061/pexels-photo-9219061.jpeg",
        alt: "Person holding smartphone with colorful UI",
      }
    },
    {
      title: "Technologies",
      description: "Ship fast with robust, scalable engineering that powers your business.",
      bullets: [
        "Web Development",
        "Web-app Development",
        "CMS",
        "E-commerce",
        "Data & Analytics",
        "Mobile App Development",
        "Quality Assurance & Testing",
      ],
      image: {
        src: "https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg",
        alt: "Developer writing code on laptop",
      }
    },
    {
      title: "Marketing",
      description: "Full-funnel growth programs that connect brand to performance and compounding results.",
      bullets: [
        "Search Engine Optimization (SEO)",
        "Email Marketing",
        "Content Marketing",
        "Social Media Marketing",
        "Performance Marketing",
        "Analytics Marketing",
        "Marketing Business Database",
      ],
      image: {
        src: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg",
        alt: "Analytics dashboard on laptop with charts",
      }
    }
  ]

  return (
    <section className="relative">
      {services.map((service, index) => (
        <ServiceBlock
          key={service.title}
          {...service}
          index={index}
          reversed={index % 2 !== 0}
          totalServices={services.length}
        />
      ))}
    </section>
  )
}

function ServiceBlock({ title, description, bullets, image, index, reversed = false, totalServices }) {
  const textZIndex = 100 
  const imageZIndex = 10 + index
  
  return (
    <div className="relative">
      {/* Sticky Text Container */}
      <div 
        className="sticky top-0 h-screen flex items-center pointer-events-none"
        style={{ zIndex: textZIndex }}
      >
        <div 
          className={`
            w-full max-w-7xl mx-auto px-8 flex
            ${reversed ? 'justify-end' : 'justify-start'}
          `}
        >
          <div 
            className={`
              w-full max-w-md px-8 py-16 pointer-events-auto
              bg-white/95 backdrop-blur-sm
              ${reversed ? 'text-right' : 'text-left'}
            `}
          >
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight mb-4">
              {title}
            </h2>
            <p className="text-muted-foreground mb-6">
              {description}
            </p>
            <ul className="space-y-2 text-sm">
              {bullets.map((bullet) => (
                <Bullet key={bullet}>{bullet}</Bullet>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Scrolling Image Container */}
      <div 
        className="absolute top-0 left-0 right-0 h-screen flex items-center"
        style={{ zIndex: imageZIndex }}
      >
        <div 
          className={`
            w-full max-w-7xl mx-auto px-8 flex
            ${reversed ? 'justify-start' : 'justify-end'}
          `}
        >
          <div className="w-full max-w-xl">
            <Card className="border-0 overflow-hidden">
              <CardContent className="p-0">
                <OptimizedImage 
                  src={image.src} 
                  alt={image.alt}
                  className="aspect-[4/3]"
                  eager={index === 0}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* IMPORTANT: Spacer for ALL sections except the very last one */}
      <div className="h-screen" />
    </div>
  )
}


function Industries() {
  const rows = [
    { name: "Fintech", detail: "Strategy, UX, Mobile, Web for banking, cards, wallets, and investing." },
    { name: "Crypto & Web3", detail: "Exchanges, wallets, on-ramps, analytics, and developer tools." },
    { name: "Technology", detail: "Devtools, cloud, platforms, and enterprise productivity." },
    { name: "Ecommerce & Platforms", detail: "Stores, subscriptions, search, PIM, headless storefronts." },
    { name: "Education", detail: "Learning products, course platforms, admin tools." },
    { name: "Food & Beverage", detail: "DTC, packaging systems, retail experiences." },
    { name: "Startups & VC", detail: "Product-market storytelling, sites, and brand systems." },
    { name: "Healthcare & Life Sciences", detail: "Clinical tools, patient apps, diagnostics UIs." },
    { name: "Telecommunications", detail: "Network ops, B2B portals, internal tooling." },
    { name: "Mobility", detail: "Maps, logistics, vehicle software, booking." },
    { name: "Logistics", detail: "Tracking, routing, warehouse, and freight products." },
  ]

  return (
    <section className="relative bg-neutral-950 text-neutral-100" style={{ zIndex: 200 }}>
      <div className="mx-auto max-w-[1600px] py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-12">
        <h3 className="text-xl font-semibold tracking-tight">Industries</h3>
        <p className="mt-2 text-sm text-neutral-400 max-w-[60ch]">
          We partner with clients across multiple sectors to ship meaningful products and results.
        </p>
        <div className="mt-8 divide-y divide-neutral-800 border-y border-neutral-800">
          {rows.map((r) => (
            <div
              key={r.name}
              className="grid grid-cols-1 md:grid-cols-3 gap-3 py-4"
            >
              <div className="font-medium">{r.name}</div>
              <div className="md:col-span-2 text-sm text-neutral-400">{r.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

