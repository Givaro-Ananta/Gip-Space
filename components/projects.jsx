"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, ArrowRight, Info } from "lucide-react"
import { projects } from "./data/projectsData"
import ProjectDetailModal from "./ProjectDetailModal"
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/VelocityScroll"

const MAX_PREVIEW = 4

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const previewProjects = projects.slice(0, MAX_PREVIEW)

  return (
    <section id="projects" className="py-16 md:py-24 bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <FadeUp>
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              My{" "}
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Here are some of my recent projects. Each project showcases different skills and technologies I&apos;ve worked
              with.
            </p>
          </div>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {previewProjects.map((project) => (
            <StaggerItem key={project.title}>
            <motion.div
              className="bg-gray-800/60 border border-gray-700/50 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 flex flex-col h-full"
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 200 } }}
            >
              {/* Clickable Image Header */}
              <button
                type="button"
                aria-label={`Lihat Detail: ${project.title}`}
                aria-haspopup="dialog"
                onClick={() => setSelectedProject(project)}
                className="relative block w-full shrink-0 aspect-video overflow-hidden cursor-pointer group"
              >
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1200px) 560px, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="px-4 py-2 bg-purple-600/90 text-white font-medium text-sm rounded-lg backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-1.5">
                    <Info size={16} />
                    Lihat Detail
                  </span>
                </span>
              </button>
              
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2 cursor-pointer hover:text-purple-400 transition-colors">
                    <button type="button" onClick={() => setSelectedProject(project)} className="text-left" aria-haspopup="dialog">
                      {project.title}
                    </button>
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-gray-700 rounded-full text-xs text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-2 items-center border-t border-gray-700/50 pt-4 mt-auto">
                  {project.liveUrl && project.liveUrl !== "#" && (
                    <a
                      href={project.liveUrl}
                      className="flex min-h-11 items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedProject(project)}
                    aria-haspopup="dialog"
                    className="flex min-h-11 items-center gap-1.5 text-sm text-gray-400 hover:text-purple-400 transition-colors font-medium ml-auto"
                  >
                    <Info size={16} />
                    Detail Project
                  </button>
                </div>
              </div>
            </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeUp delay={0.2}>
          <div className="text-center mt-12">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors font-medium"
            >
              View All Projects
              <ArrowRight size={16} />
            </Link>
          </div>
        </FadeUp>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            isOpen={!!selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

