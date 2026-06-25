"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { X, ExternalLink, Github, Cpu, Database, Layers, CheckCircle } from "lucide-react"

export default function ProjectDetailModal({ project, isOpen, onClose }) {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen || !project) return null

  // Helper to check if a url is valid
  const hasLiveUrl = project.liveUrl && project.liveUrl !== "#"
  const hasGithubUrl = project.githubUrl && project.githubUrl !== "#"

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
      {/* Glassmorphic Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Content Wrapper */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", duration: 0.4 }}
        className="bg-gray-900 border border-gray-800 rounded-2xl max-w-4xl w-full max-h-[85vh] overflow-y-auto relative shadow-2xl z-10 scrollbar-thin scrollbar-thumb-gray-800"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white p-2 rounded-full bg-gray-800/50 hover:bg-gray-800 transition-colors z-20"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Modal Layout */}
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="mb-6 pr-10">
            <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest">
              Project Showcase
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
              {project.title}
            </h3>
            <div className="flex flex-wrap gap-2 mt-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 bg-gray-800 rounded-full text-xs text-gray-300 border border-gray-700/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left Column: Image and Actions */}
            <div className="md:col-span-5 flex flex-col gap-6">
              <div className="relative aspect-video md:aspect-square w-full rounded-xl overflow-hidden bg-gray-950 border border-gray-800">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {hasLiveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium text-sm rounded-xl transition-all duration-300 shadow-md shadow-purple-500/10 hover:shadow-purple-500/20 active:scale-[0.98]"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                )}
                {hasGithubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 text-white font-medium text-sm rounded-xl transition-all duration-300 active:scale-[0.98]"
                  >
                    <Github size={16} />
                    GitHub Repo
                  </a>
                )}
              </div>
            </div>

            {/* Right Column: Descriptions, Features, Tech Stack */}
            <div className="md:col-span-7 flex flex-col gap-6">
              {/* Description */}
              <div>
                <h4 className="text-md font-bold text-white mb-2">Tentang Proyek</h4>
                <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">
                  {project.longDescription || project.description}
                </p>
              </div>

              {/* Key Features */}
              {project.features && project.features.length > 0 && (
                <div>
                  <h4 className="text-md font-bold text-white mb-3">Fitur Utama</h4>
                  <ul className="space-y-2">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-300">
                        <CheckCircle size={16} className="text-purple-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack Details */}
              {project.techStackDetailed && (
                <div className="space-y-6 pt-4 border-t border-gray-800">
                  <h4 className="text-md font-bold text-white flex items-center gap-2">
                    <Cpu className="text-purple-400" size={18} />
                    Teknologi & Stack
                  </h4>

                  {/* Frontend (Dashboard) */}
                  {project.techStackDetailed.frontend && project.techStackDetailed.frontend.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                        Frontend (Dashboard)
                      </div>
                      <div className="overflow-x-auto rounded-xl border border-gray-800/80 bg-gray-950/40">
                        <table className="min-w-full divide-y divide-gray-800 text-xs text-left">
                          <thead className="bg-gray-800/50 text-gray-400">
                            <tr>
                              <th className="px-4 py-2.5 font-semibold text-gray-300">Teknologi</th>
                              <th className="px-4 py-2.5 font-semibold text-gray-300 w-16 text-center">Versi</th>
                              <th className="px-4 py-2.5 font-semibold text-gray-300">Fungsi</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-800 text-gray-300">
                            {project.techStackDetailed.frontend.map((item) => (
                              <tr key={item.name} className="hover:bg-gray-800/20 transition-colors">
                                <td className="px-4 py-2.5 font-medium text-purple-400">{item.name}</td>
                                <td className="px-4 py-2.5 text-center text-gray-400">{item.version || "—"}</td>
                                <td className="px-4 py-2.5 text-gray-400 leading-relaxed">{item.function}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Backend / Data Processing */}
                  {project.techStackDetailed.backend && project.techStackDetailed.backend.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                        Backend / Data Processing
                      </div>
                      <div className="overflow-x-auto rounded-xl border border-gray-800/80 bg-gray-950/40">
                        <table className="min-w-full divide-y divide-gray-800 text-xs text-left">
                          <thead className="bg-gray-800/50 text-gray-400">
                            <tr>
                              <th className="px-4 py-2.5 font-semibold text-gray-300">Teknologi</th>
                              <th className="px-4 py-2.5 font-semibold text-gray-300 w-16 text-center">Versi</th>
                              <th className="px-4 py-2.5 font-semibold text-gray-300">Fungsi</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-800 text-gray-300">
                            {project.techStackDetailed.backend.map((item) => (
                              <tr key={item.name} className="hover:bg-gray-800/20 transition-colors">
                                <td className="px-4 py-2.5 font-medium text-blue-400">{item.name}</td>
                                <td className="px-4 py-2.5 text-center text-gray-400">{item.version || "—"}</td>
                                <td className="px-4 py-2.5 text-gray-400 leading-relaxed">{item.function}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ETL Pipeline Section */}
          {project.pipeline && project.pipeline.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-800">
              <h4 className="text-md font-bold text-white mb-5 flex items-center gap-2">
                <Layers className="text-indigo-400" size={18} />
                Pipeline Pengolahan Data (ETL)
              </h4>
              <div className="relative border-l border-gray-800 ml-4 pl-6 space-y-6">
                {project.pipeline.map((step, idx) => {
                  const colonIndex = step.indexOf(":")
                  const title = colonIndex !== -1 ? step.substring(0, colonIndex) : step
                  const desc = colonIndex !== -1 ? step.substring(colonIndex + 1).trim() : ""

                  return (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[33px] top-0.5 bg-indigo-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold ring-4 ring-gray-900">
                        {idx + 1}
                      </div>
                      <h5 className="font-semibold text-sm text-gray-200">{title}</h5>
                      {desc && <p className="text-gray-400 text-xs mt-1 leading-relaxed">{desc}</p>}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
