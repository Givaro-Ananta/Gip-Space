"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, ArrowLeft, Info } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { projects } from "@/components/data/projectsData"
import ProjectDetailModal from "@/components/ProjectDetailModal"

export default function ProjectsPage() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, amount: 0.05 })
    const [selectedProject, setSelectedProject] = useState(null)

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    }

    return (
        <main className="min-h-screen">
            <Navbar />
            <section className="pt-28 pb-20 bg-gray-950">
                <div className="container mx-auto px-4 md:px-6">
                    {/* Header */}
                    <div className="mb-12">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors mb-6"
                        >
                            <ArrowLeft size={16} />
                            Back to Home
                        </Link>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-3xl md:text-4xl font-bold mb-4"
                        >
                            All{" "}
                            <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                                Projects
                            </span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-gray-400 max-w-2xl"
                        >
                            A complete collection of my projects. Each project showcases
                            different skills and technologies I've worked with.
                        </motion.p>
                    </div>

                    {/* Projects Grid */}
                    <motion.div
                        ref={ref}
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {projects.map((project) => (
                            <motion.div
                                key={project.title}
                                variants={itemVariants}
                                className="bg-gray-800/50 border border-gray-700/50 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-purple-500/10 hover:border-purple-500/30 transition-all duration-300 group flex flex-col h-full"
                            >
                                {/* Clickable Image Header */}
                                <div 
                                    onClick={() => setSelectedProject(project)}
                                    className="relative h-52 overflow-hidden cursor-pointer"
                                >
                                    <Image
                                        src={project.image || "/placeholder.svg"}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <span className="px-4 py-2 bg-purple-600/90 text-white font-medium text-sm rounded-lg backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-1.5">
                                            <Info size={16} />
                                            Lihat Detail
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="p-6 flex flex-col flex-1 justify-between">
                                    <div>
                                        <h3 
                                            onClick={() => setSelectedProject(project)}
                                            className="text-lg font-bold mb-2 group-hover:text-purple-400 cursor-pointer transition-colors"
                                        >
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mb-5">
                                            {project.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2.5 py-1 bg-gray-700/70 rounded-full text-xs text-gray-300"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className="flex gap-4 items-center border-t border-gray-700/50 pt-4 mt-auto">
                                        {project.liveUrl && project.liveUrl !== "#" && (
                                            <a
                                                href={project.liveUrl}
                                                className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors font-medium"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                id={`project-live-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                                            >
                                                <ExternalLink size={16} />
                                                Live Demo
                                            </a>
                                        )}
                                        <button
                                            onClick={() => setSelectedProject(project)}
                                            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-purple-400 transition-colors font-medium ml-auto"
                                        >
                                            <Info size={16} />
                                            Detail Project
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
            <Footer />

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
        </main>
    )
}
