import { NavbarHead } from "@/components/common/navbar/Navbar";
import Footer from "@/components/common/footer/Footer";

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
