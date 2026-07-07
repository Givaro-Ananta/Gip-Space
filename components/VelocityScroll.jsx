"use client";

import { useState, useEffect, useRef } from "react";
import {
  useScroll,
  useSpring,
  useTransform,
  motion,
} from "framer-motion";

/* ─────────────────────────────────────────────
   useIsMobile Hook
───────────────────────────────────────────── */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    setIsMobile(media.matches);
    const listener = (e) => setIsMobile(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);
  return isMobile;
}

/* ─────────────────────────────────────────────
   ScrollProgressBar
   Progress bar tipis di atas halaman
───────────────────────────────────────────── */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[9999] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #a855f7, #3b82f6)",
      }}
    />
  );
}

/* ─────────────────────────────────────────────
   FadeUp  — fade + slide naik dengan scale
───────────────────────────────────────────── */
export function FadeUp({ children, className = "", delay = 0, once = false }) {
  const isMobile = useIsMobile();
  return (
    <motion.div
      className={className}
      initial={isMobile ? { opacity: 0, y: 25 } : { opacity: 0, y: 60, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once, amount: 0.15 }}
      transition={isMobile ? {
        type: "tween",
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
        duration: 0.6,
        delay
      } : {
        type: "spring",
        damping: 22,
        stiffness: 90,
        delay
      }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   SlideIn  — slide dari kiri atau kanan
───────────────────────────────────────────── */
export function SlideIn({ children, className = "", delay = 0, from = "left", once = false }) {
  const isMobile = useIsMobile();
  const x = from === "left" ? -80 : 80;
  const mobileX = from === "left" ? -35 : 35;
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ opacity: 0, x: isMobile ? mobileX : x }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once, amount: 0.15 }}
        transition={isMobile ? {
          type: "tween",
          ease: [0.16, 1, 0.3, 1], // easeOutExpo
          duration: 0.6,
          delay
        } : {
          type: "spring",
          damping: 24,
          stiffness: 100,
          delay
        }}
        style={{ willChange: "transform, opacity" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ZoomIn  — muncul dari kecil (scale)
───────────────────────────────────────────── */
export function ZoomIn({ children, className = "", delay = 0, once = false }) {
  const isMobile = useIsMobile();
  return (
    <motion.div
      className={className}
      initial={isMobile ? { opacity: 0, y: 20 } : { opacity: 0, scale: 0.75 }}
      whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, scale: 1 }}
      viewport={{ once, amount: 0.15 }}
      transition={isMobile ? {
        type: "tween",
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
        duration: 0.6,
        delay
      } : {
        type: "spring",
        damping: 20,
        stiffness: 110,
        delay
      }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   RevealLine  — seperti curtain reveal (clip-path)
───────────────────────────────────────────── */
export function RevealLine({ children, className = "", delay = 0, once = false }) {
  const isMobile = useIsMobile();
  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
      viewport={{ once, amount: 0.2 }}
      transition={isMobile ? {
        type: "tween",
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
        duration: 0.7,
        delay
      } : {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay
      }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Stagger — container dengan stagger children
───────────────────────────────────────────── */
const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", damping: 22, stiffness: 120 },
  },
};

export function StaggerContainer({ children, className = "", once = false }) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }) {
  const isMobile = useIsMobile();
  
  const mobileStaggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
        duration: 0.5
      },
    },
  };
  
  const desktopStaggerItem = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", damping: 22, stiffness: 120 },
    },
  };

  return (
    <motion.div
      className={className}
      variants={isMobile ? mobileStaggerItem : desktopStaggerItem}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   ScrollReveal  — backward-compat alias
───────────────────────────────────────────── */
export function ScrollReveal({ children, className = "", delay = 0, direction = "up" }) {
  if (direction === "left")  return <SlideIn from="left" delay={delay} className={className}>{children}</SlideIn>;
  if (direction === "right") return <SlideIn from="right" delay={delay} className={className}>{children}</SlideIn>;
  return <FadeUp delay={delay} className={className}>{children}</FadeUp>;
}

/* ─────────────────────────────────────────────
   ParallaxSection — parallax vertikal
───────────────────────────────────────────── */
export function ParallaxSection({ children, className = "", speed = 0.3 }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [-50 * speed * 10, 50 * speed * 10]);
  const smoothY = useSpring(rawY, { stiffness: 100, damping: 30 });
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y: smoothY }}>{children}</motion.div>
    </div>
  );
}
