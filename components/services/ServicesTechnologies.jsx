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

export default function ServicesTechnologies() {
  return (
    <div className="w-full">
      <main className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
      <div className="h-30"></div>
      <Hero />
        <Services />
      </main>
      <Industries />
    </div>
  )
}

function Hero() {
  return (
    <section className="py-10 sm:py-14 lg:py-16 h-[60vh] flex justify-center items-center">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div className="space-y-5">
          <h1 className="text-3xl sm:text-5xl font-semibold leading-snug tracking-tight">
          Emerging technologies shape the future of business.
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
    title: "Web Development",
    description: "Build fast, scalable, and secure websites tailored to your business needs.",
    bullets: [
      "Custom website design & development",
      "Responsive and mobile-first layouts",
      "SEO-friendly architecture",
      "Performance optimization",
      "Cross-browser compatibility",
    ],
    image: {
      src: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
      alt: "Developer coding website on laptop",
    }
  },
  {
    title: "Web-app Development",
    description: "Create powerful, interactive, and scalable web applications for any industry.",
    bullets: [
      "Single-page applications (SPA)",
      "Progressive web apps (PWA)",
      "API integration & backend connectivity",
      "Real-time data handling",
      "Secure authentication systems",
    ],
    image: {
      src: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg",
      alt: "Web app dashboard on desktop screen",
    }
  },
  {
    title: "CMS",
    description: "Design and implement content management systems for easy updates and scalability.",
    bullets: [
      "WordPress, Drupal, Strapi, and Headless CMS",
      "Custom theme and plugin development",
      "Content workflows and version control",
      "SEO and multilingual support",
      "Integration with third-party tools",
    ],
    image: {
      src: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg",
      alt: "CMS dashboard on computer screen",
    }
  },
  {
    title: "E-commerce",
    description: "Develop e-commerce platforms that enhance customer experience and drive sales.",
    bullets: [
      "Custom e-commerce websites",
      "Shopify, WooCommerce, Magento integration",
      "Product catalog & inventory management",
      "Secure payment gateway setup",
      "Personalized shopping experience",
    ],
    image: {
      src: "https://images.pexels.com/photos/3943745/pexels-photo-3943745.jpeg",
      alt: "Online shopping cart on laptop",
    }
  },
  {
    title: "Data & Analytics",
    description: "Leverage data-driven insights to improve performance, usability, and growth strategies.",
    bullets: [
      "Data collection and processing",
      "Business intelligence dashboards",
      "User behavior analytics",
      "Conversion tracking & funnels",
      "Predictive analytics with AI/ML",
    ],
    image: {
      src: "https://images.pexels.com/photos/669619/pexels-photo-669619.jpeg",
      alt: "Analytics dashboard on multiple monitors",
    }
  },
  {
    title: "Mobile App Development",
    description: "Design and develop native and cross-platform mobile applications.",
    bullets: [
      "iOS and Android app development",
      "Cross-platform with Flutter/React Native",
      "App store deployment & optimization",
      "Push notifications & engagement tools",
      "Mobile security best practices",
    ],
    image: {
      src: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg",
      alt: "Person using mobile application on smartphone",
    }
  },
  {
    title: "Quality Assurance & Testing",
    description: "Ensure software reliability, performance, and security with rigorous testing.",
    bullets: [
      "Manual and automated testing",
      "Cross-browser & cross-device checks",
      "Performance & load testing",
      "Bug tracking and reporting",
      "Security and compliance testing",
    ],
    image: {
      src: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
      alt: "Tester reviewing software on laptop",
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
        className={`sticky top-0 h-screen flex ${
          index === 0 ? "items-start" : "items-center"
        } pointer-events-none`}
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
              bg-white/95 backdrop-blur-sm text-left
            
            `}
          >
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
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

