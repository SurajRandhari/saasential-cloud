import { NavbarHead } from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

export default function MainLayout({ children }) {
  return (
    <>
      <NavbarHead />
      <main role="main" className="will-change-transform">
        {children}
      </main>
      <Footer />
    </>
  );
}
