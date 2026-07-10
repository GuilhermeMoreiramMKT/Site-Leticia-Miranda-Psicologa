import { useEffect, useState } from "react";
import { Link } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImg from "@assets/Logo_Le-removebg-preview_1778616799049.png";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const WHATSAPP_LINK = "https://dub.sh/comecarjornada";

function trackWhatsappClick(eventName: string) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, {
      page_location: window.location.href,
    });
  }
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  function openWhatsapp(eventName: string) {
    trackWhatsappClick(eventName);
    window.open(WHATSAPP_LINK, "_blank");
    closeMenu();
  }

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 max-w-6xl flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 cursor-pointer"
            onClick={closeMenu}
            data-testid="link-home-logo"
          >
            <img src={logoImg} alt="Logo Letícia Miranda" className="h-10 w-auto" />
            <div className="flex flex-col leading-tight">
              <span className="font-serif text-2xl font-semibold tracking-wide">Letícia Miranda</span>
              <span className="text-xs text-muted-foreground tracking-wide">CRP 06/180091</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="hover:text-primary transition-colors">
              Início
            </Link>
            <Link href="/especialidades" className="hover:text-primary transition-colors">
              Especialidades
            </Link>
            <Link href="/formacao" className="hover:text-primary transition-colors">
              Formação
            </Link>
            <Link href="/como-funciona" className="hover:text-primary transition-colors">
              Como funciona
            </Link>
            <Link href="/#contato" className="hover:text-primary transition-colors">
              Contato
            </Link>
          </nav>

          <Button
            className="hidden md:flex bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6"
            onClick={() => openWhatsapp("whatsapp_click_header")}
            data-testid="button-nav-cta"
          >
            Agendar Consulta
          </Button>

          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-4 md:hidden flex flex-col gap-6"
          >
            <Link href="/" onClick={closeMenu} className="text-xl font-serif text-left border-b pb-4">
              Início
            </Link>

            <Link href="/especialidades" onClick={closeMenu} className="text-xl font-serif text-left border-b pb-4">
              Especialidades
            </Link>

            <Link href="/formacao" onClick={closeMenu} className="text-xl font-serif text-left border-b pb-4">
              Formação
            </Link>

            <Link href="/como-funciona" onClick={closeMenu} className="text-xl font-serif text-left border-b pb-4">
              Como funciona
            </Link>

            <Link href="/#contato" onClick={closeMenu} className="text-xl font-serif text-left border-b pb-4">
              Contato
            </Link>

            <Button
              className="bg-primary text-primary-foreground rounded-full py-6 text-lg mt-4"
              onClick={() => openWhatsapp("whatsapp_click_mobile_menu")}
            >
              Agendar Consulta
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}