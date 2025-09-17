import  React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

function Bullet({ children }) {
  return (
    <li className="flex items-start gap-2">
      <Check className="mt-0.5 h-4 w-4 text-emerald-600 shrink-0" />
      <span>{children}</span>
    </li>
  )
}

export default function ServicesHome() {
  return (
    <div className="w-full">
      <Header />

      <main className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
        <Hero />

        <Services />
      </main>

      <Industries />

      <Footer />
    </div>
  )
}

function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/55 border-b">
      <div className="mx-auto max-w-[1100px] h-14 px-4 sm:px-6 lg:px-8 flex items-center gap-4">
        <Link href="#" className="font-semibold tracking-tight">
          clay
        </Link>
        <nav className="ml-auto hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="#" className="hover:text-foreground transition">
            Work
          </Link>
          <Link href="#" className="hover:text-foreground transition">
            Services
          </Link>
          <Link href="#" className="hover:text-foreground transition">
            About
          </Link>
          <Link href="#" className="hover:text-foreground transition">
            Careers
          </Link>
          <Link href="#" className="hover:text-foreground transition">
            Contact
          </Link>
        </nav>
        <Button variant="ghost" size="icon" className="ml-auto md:hidden" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="py-10 sm:py-14 lg:py-16">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div className="space-y-5">
          <h1 className="text-3xl sm:text-4xl font-semibold leading-snug tracking-tight">
            A full-service digital innovation partner
          </h1>
          <p className="text-muted-foreground max-w-[50ch]">
            Our product design and technology expertise helps top brands create digital experiences.
          </p>
        </div>
        <div className="relative">
          <Image
            src={
              "/placeholder.svg?height=640&width=900&query=abstract%203d%20white%20stacked%20shapes%20soft%20shadows"
            }
            alt="Abstract 3D white shapes"
            width={900}
            height={640}
            className="w-full h-auto rounded-lg object-cover"
            priority
          />
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <div className="space-y-20 sm:space-y-24">
      {/* Branding */}
      <ServiceBlock
        title="Branding"
        description="We define your story, strategy, and visual language across every touchpoint to help brands evolve and delight audiences."
        bullets={[
          "Brand Strategy",
          "Visual Identity",
          "Design Systems",
          "Motion",
          "Brand Guidelines",
          "Name Exploration",
        ]}
        image={{
          src: "/placeholder.svg?height=420&width=520",
          alt: "Branding mockup",
        }}
      />

      {/* Digital Products */}
      <ServiceBlock
        title="Digital Products"
        description="From discovery to launch, we design and build world‑class mobile and web apps that customers love to use."
        bullets={[
          "Product Strategy",
          "UX Research",
          "UX Architecture & Flows",
          "UI & Interaction Design",
          "iOS, Android, Web",
          "Design Systems",
          "Design Sprints",
        ]}
        image={{
          src: "/placeholder.svg?height=420&width=520",
          alt: "Mobile app preview",
        }}
        reversed
      />

      {/* Websites */}
      <ServiceBlock
        title="Websites"
        description="We craft marketing websites that articulate your value, increase conversion, and scale with your team and brand."
        bullets={[
          "Content Strategy",
          "Information Architecture",
          "Design & Art Direction",
          "Front‑end Development",
          "Headless CMS",
          "Design-to-code handoff",
          "Creative production",
        ]}
        image={{
          src: "/placeholder.svg?height=420&width=520",
          alt: "Website preview on mobile",
        }}
      />

      {/* Content */}
      <ServiceBlock
        title="Content"
        description="We create content that resonates in a digital world— motion graphics, product renders, site art, and brand campaigns."
        bullets={["Art Direction", "Motion & Graphic Design", "Illustration", "3D", "Campaigns"]}
        image={{
          src: "/placeholder.svg?height=420&width=520",
          alt: "3D character on desk",
        }}
        reversed
      />

      {/* Development */}
      <ServiceBlock
        title="Development"
        description="Our design team partners with engineering to create accessible, performant products and sites with robust design systems."
        bullets={[
          "Front‑end Engineering",
          "Architecture & Tooling",
          "Web & Native Development",
          "Headless CMS & Integrations",
          "Design Systems & UI Kits",
          "Accessibility, QA, Performance",
        ]}
        image={{
          src: "/placeholder.svg?height=420&width=520",
          alt: "UI components preview",
        }}
      />
    </div>
  )
}

function ServiceBlock({
  title = "Service",
  description = "Description",
  bullets = [],
  image = { src: "/placeholder.svg?height=420&width=520", alt: "Preview" },
  reversed = false,
}) {
  return (
    <section className="grid gap-8 md:grid-cols-2 md:items-center">
      <div className={reversed ? "md:order-2" : ""}>
        <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-3 text-muted-foreground">{description}</p>
        <ul className="mt-5 space-y-2 text-sm">
          {bullets.map((b) => (
            <Bullet key={b}>{b}</Bullet>
          ))}
        </ul>
      </div>
      <div className={reversed ? "md:order-1" : ""}>
        <Card className="border-0 shadow-none">
          <CardContent className="p-0">
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              width={900}
              height={640}
              className="w-full h-auto rounded-md object-cover"
            />
          </CardContent>
        </Card>
      </div>
    </section>
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
    <section className="mt-24 bg-neutral-950 text-neutral-100">
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h3 className="text-xl font-semibold tracking-tight">Industries</h3>
        <p className="mt-2 text-sm text-neutral-400 max-w-[60ch]">
          We partner with clients across multiple sectors to ship meaningful products and results.
        </p>

        <div className="mt-8 divide-y divide-neutral-800 border-y border-neutral-800">
          {rows.map((r) => (
            <div key={r.name} className="grid grid-cols-1 md:grid-cols-3 gap-3 py-4">
              <div className="font-medium">{r.name}</div>
              <div className="md:col-span-2 text-sm text-neutral-400">{r.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-neutral-50 relative overflow-hidden">
      <div className="absolute inset-x-0 -top-24 opacity-70 pointer-events-none">
        <Image
          src={"/placeholder.svg?height=500&width=1400&query=soft%20abstract%203d%20white%20ribbons"}
          alt="Abstract ribbons"
          width={1400}
          height={500}
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="relative mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <h4 className="text-2xl font-semibold tracking-tight">Let&apos;s Talk</h4>
            <div className="mt-4 text-sm">
              <a href="mailto:hello@clay.studio" className="underline underline-offset-4">
                hello@clay.studio
              </a>
              <div className="mt-1 text-muted-foreground">+1 415 796 6262</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div className="space-y-2">
              <div className="font-medium">Services</div>
              <ul className="space-y-1 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Branding
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Product
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Websites
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Development
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <div className="font-medium">Company</div>
              <ul className="space-y-1 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Clients
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Clay — All rights reserved.</div>
          <div className="sm:ml-auto flex items-center gap-3">
            <Link href="#" className="hover:text-foreground flex items-center gap-1">
              <span>Get in touch</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
