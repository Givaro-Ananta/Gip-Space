"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Github, Linkedin, Instagram } from "lucide-react"
import { navLinks } from "./data/navLinks"

export default function Navbar() {
  const pathname = usePathname()
  const menuButtonRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Scroll spy logic
      if (pathname === "/projects") {
        setActiveSection("projects");
        return;
      }
      const sections = ["home", "about", "skills", "projects", "contact"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const viewportMid = window.innerHeight / 3;
          return rect.top <= viewportMid && rect.bottom >= viewportMid;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const media = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => { if (media.matches) setIsOpen(false); };
    document.addEventListener("keydown", closeOnEscape);
    media.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      media.removeEventListener("change", closeOnDesktop);
    };
  }, [isOpen]);

  // navLinks imported from data/navLinks.js

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-gray-900/90 backdrop-blur-md py-3 shadow-md" : "bg-transparent py-5"}`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
              Gipz<span className="text-white"> Space</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.name.toLowerCase();
              return (
                <div key={link.name}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "location" : undefined}
                    className={`transition-colors relative group ${isActive ? "text-white" : "text-gray-300 hover:text-white"}`}
                  >
                    {link.name}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                    ></span>
                  </Link>
                </div>
              )
            })}
          </nav>

          {/* Social Icons & Mobile Menu Button wrapper */}
          <div className="flex items-center space-x-4">
            {/* Social Icons */}
            <div className="hidden md:flex items-center space-x-2">
              <a
                href="https://instagram.com/givarooo"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg p-2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Instagram size={20} className="transition-transform duration-200 group-hover:-translate-y-1" />
              </a>
              <a
                href="https://github.com/Givaro-Ananta"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg p-2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Github size={20} className="transition-transform duration-200 group-hover:-translate-y-1" />
              </a>
              <a
                href="https://linkedin.com/in/givaro-ananta"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg p-2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Linkedin size={20} className="transition-transform duration-200 group-hover:-translate-y-1" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button ref={menuButtonRef} type="button" className="md:hidden inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-gray-300 hover:text-white hover:bg-gray-800" aria-label={isOpen ? "Close menu" : "Open menu"} aria-expanded={isOpen} aria-controls="mobile-menu" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        id="mobile-menu"
        hidden={!isOpen}
        className={`md:hidden bg-gray-900 shadow-lg transition-all duration-300 ${isOpen ? "opacity-100 max-h-96" : "opacity-0 max-h-0 overflow-hidden"}`}
      >
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => {
              const isActive = activeSection === link.name.toLowerCase();
              return (
                <Link
                  key={link.name}
                  href={link.href}
                    aria-current={isActive ? "location" : undefined}
                  className={`py-2 transition-colors flex items-center gap-2 ${isActive ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 font-medium" : "text-gray-300 hover:text-white"}`}
                  onClick={() => setIsOpen(false)}
                >
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>}
                  {link.name}
                </Link>
              )
            })}
            <div className="flex space-x-4 pt-4 border-t border-gray-800">
              <a
                href="https://instagram.com/givarooo"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://github.com/Givaro-Ananta"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/givaro-ananta"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

