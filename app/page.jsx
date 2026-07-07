"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Contact from "@/components/get-in-touch"
import Footer from "@/components/footer"
import { ScrollProgressBar } from "@/components/VelocityScroll"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <main className="min-h-screen">
      <ScrollProgressBar />
      <Navbar />
      <div className={`transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </main>
  )
}

