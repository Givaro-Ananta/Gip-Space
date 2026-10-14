"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";

const PRIMARY_GRADIENT = "bg-gradient-to-r from-purple-600 to-blue-600";
const SECONDARY_BG = "bg-gray-800 hover:bg-gray-700";
const TEXT_PRIMARY = "text-white";
const TEXT_SECONDARY = "text-gray-300";
const TEXT_TERTIARY = "text-gray-400";

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const textRef = useRef(null);
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Scroll-driven parallax untuk hero
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const rawScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  const y = useSpring(rawY, { stiffness: 80, damping: 20 });
  const opacity = useSpring(rawOpacity, { stiffness: 80, damping: 20 });
  const scale = useSpring(rawScale, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    setIsMobile(media.matches);
    const listener = (e) => setIsMobile(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  useEffect(() => {
    const textElement = textRef.current;
    if (!textElement) return;

    const roles = [
      "a Data Science student",
      "curious about AI",
      "exploring machine learning",
      "learning to build ML models",
    ];
    if (reduceMotion) {
      textElement.textContent = roles.join(" · I’m ");
      return;
    }
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let timer;

    const type = () => {
      const currentRole = roles[roleIndex];
      textElement.textContent = isDeleting
        ? currentRole.substring(0, charIndex - 1)
        : currentRole.substring(0, charIndex + 1);

      charIndex += isDeleting ? -1 : 1;
      typingSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 1000;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }

      timer = setTimeout(type, typingSpeed);
    };

    timer = setTimeout(type, 1000);
    return () => clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[100svh] py-28 flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"
    >
      {/* Velocity-driven parallax content wrapper */}
      <motion.div
        style={isMobile || reduceMotion ? { y: 0, opacity: 1, scale: 1 } : { y, opacity, scale }}
        className="container px-4 md:px-6 z-10"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`px-4 py-1 mb-4 rounded-full text-sm font-medium ${SECONDARY_BG} ${TEXT_SECONDARY} inline-block`}
        >
          Welcome to my portfolio
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, type: "spring", damping: 20 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6"
        >
          Hi, I&apos;m{" "}
          <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Givaro Ananta
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`text-xl md:text-2xl ${TEXT_SECONDARY} mb-6 min-h-16 sm:min-h-8`}
        >
          I&apos;m <span ref={textRef} className={`${TEXT_PRIMARY} font-medium`}></span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className={`max-w-2xl ${TEXT_TERTIARY} leading-relaxed mb-8 mx-auto`}
        >
          I enjoy working with data and figuring out what it can tell us.
          Here, I share my projects and what I&apos;m learning along the way
          as I explore AI and machine learning.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex justify-center items-center flex-col sm:flex-row gap-4"
        >
          <Link
            href="#projects"
            className={`px-6 py-3 rounded-lg ${PRIMARY_GRADIENT} ${TEXT_PRIMARY} font-medium shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all hover:scale-105`}
          >
            Explore My Projects
          </Link>
          <Link
            href="#contact"
            className={`px-6 py-3 rounded-lg ${SECONDARY_BG} ${TEXT_PRIMARY} font-medium transition-all hover:scale-105`}
          >
            Let&apos;s Talk
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        style={isMobile || reduceMotion ? { opacity: 1 } : { opacity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <a href="#about" aria-label="Scroll to About Me" className={`${TEXT_TERTIARY} hover:${TEXT_PRIMARY} transition-colors`}>
          <ArrowDown size={24} />
        </a>
      </motion.div>
    </section>
  );
}
