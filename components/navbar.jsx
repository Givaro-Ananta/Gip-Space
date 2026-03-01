"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Github, Linkedin, Instagram } from "lucide-react"
import { navLinks } from "./data/navLinks"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    // Simple debounce implementation
    const debounce = (func, wait) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Scroll spy logic
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

    const debouncedHandleScroll = debounce(handleScroll, 100);
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => window.removeEventListener("scroll", debouncedHandleScroll);
  }, []);

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
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Instagram size={20} className="transition-transform duration-200 group-hover:-translate-y-1" />
              </a>
              <a
                href="https://github.com/Givaro-Ananta"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Github size={20} className="transition-transform duration-200 group-hover:-translate-y-1" />
              </a>
              <a
                href="https://linkedin.com/in/givaro-ananta"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Linkedin size={20} className="transition-transform duration-200 group-hover:-translate-y-1" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-gray-300 hover:text-white" aria-label={isOpen ? "Close menu" : "Open menu"} aria-expanded={isOpen} aria-controls="mobile-menu" onClick={() => setIsOpen(!isOpen)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsOpen(!isOpen); }}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        id="mobile-menu"
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
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://github.com/Givaro-Ananta"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/givaro-ananta"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
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

