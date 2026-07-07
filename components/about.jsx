"use client"

import { FileText, Mail, MapPin } from "lucide-react"
import Link from "next/link"
import { FadeUp, SlideIn, ZoomIn } from "@/components/VelocityScroll"

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">

          {/* Heading — curtain reveal style */}
          <FadeUp>
            <div className="text-center mb-10">
              <h2 className="text-sm uppercase tracking-wider text-purple-500 mb-2">About Me</h2>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                AI Enthusiast &amp; Data Science Student with a passion for uncovering insights from data
              </h3>
              <div className="w-20 h-1 bg-purple-500 mx-auto"></div>
            </div>
          </FadeUp>

          {/* Bio text slides from left */}
          <SlideIn from="left" delay={0.1}>
            <p className="text-gray-300 mb-8 text-lg leading-relaxed text-center">
              I&apos;m a Data Science student passionate about artificial intelligence and machine learning.
              I enjoy exploring datasets, building predictive models, and turning raw data into actionable
              insights that drive smarter decisions.
            </p>
          </SlideIn>

          {/* Cards — zoom in */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 max-w-xl mx-auto">
            <ZoomIn delay={0.15}>
              <div className="flex items-center gap-3 bg-gray-800 p-4 rounded-lg h-full">
                <MapPin className="text-purple-500 shrink-0" size={24} />
                <span className="text-gray-300">Lampung, Indonesia</span>
              </div>
            </ZoomIn>
            <ZoomIn delay={0.25}>
              <div className="flex items-center gap-3 bg-gray-800 p-4 rounded-lg h-full">
                <Mail className="text-purple-500 shrink-0" size={24} />
                <span className="text-gray-300">givaroananta02@gmail.com</span>
              </div>
            </ZoomIn>
          </div>

          {/* CTA slides from right */}
          <SlideIn from="right" delay={0.2}>
            <div className="text-center">
              <Link
                href="/CV ATS GIVARO ANANTA.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Givaro_Ananta_CV.pdf"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-purple-500 text-white font-medium hover:bg-purple-600 transition-all hover:scale-105"
              >
                <FileText size={18} /> Download Resume
              </Link>
            </div>
          </SlideIn>

        </div>
      </div>
    </section>
  )
}
