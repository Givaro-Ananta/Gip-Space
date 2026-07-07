"use client"

import { FaHtml5, FaCss3Alt, FaJs, FaPython, FaGitAlt, FaGithub, FaFigma, FaNpm } from "react-icons/fa"
import {
  SiNextdotjs,
  SiTailwindcss,
  SiStreamlit,
  SiVercel,
  SiMongodb,
  SiMysql,
  SiQgis,
  SiJupyter,
  SiR,
} from "react-icons/si"
import { motion } from "framer-motion"
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/VelocityScroll"

const skills = [
  { name: "Python",       icon: <FaPython className="text-[#3776AB]" size={36} /> },
  { name: "R",            icon: <SiR className="text-[#276DC3]" size={36} /> },
  { name: "HTML5",        icon: <FaHtml5 className="text-[#E34F26]" size={36} /> },
  { name: "CSS3",         icon: <FaCss3Alt className="text-[#1572B6]" size={36} /> },
  { name: "JavaScript",   icon: <FaJs className="text-[#F7DF1E]" size={36} /> },
  { name: "Next.js",      icon: <SiNextdotjs size={36} /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#06B6D4]" size={36} /> },
  { name: "MongoDB",      icon: <SiMongodb className="text-[#47A248]" size={36} /> },
  { name: "MySQL",        icon: <SiMysql className="text-[#4479A1]" size={36} /> },
  { name: "Streamlit",    icon: <SiStreamlit className="text-[#FF4B4B]" size={36} /> },
]

const technologies = [
  { name: "Git",    icon: <FaGitAlt className="text-[#F05032]" size={24} /> },
  { name: "GitHub", icon: <FaGithub size={24} /> },
  { name: "QGIS",   icon: <SiQgis className="text-[#589632]" size={24} /> },
  { name: "Figma",  icon: <FaFigma className="text-[#F24E1E]" size={24} /> },
  { name: "npm",    icon: <FaNpm className="text-[#CB3837]" size={24} /> },
  { name: "Vercel", icon: <SiVercel size={24} /> },
  { name: "Jupyter",icon: <SiJupyter className="text-[#F37626]" size={24} /> },
]

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">

        {/* Heading */}
        <FadeUp>
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              My{" "}
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                Skills
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              I&apos;m currently learning and building projects with these technologies. Here&apos;s an overview of the skills
              I&apos;m developing along my journey in Machine Learning and Data Science.
            </p>
          </div>
        </FadeUp>

        {/* Core Competencies */}
        <FadeUp delay={0.05}>
          <h3 className="text-xl font-semibold mb-8 text-center">Core Competencies</h3>
        </FadeUp>

        {/* Skills — stagger masuk satu per satu */}
        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-14">
          {skills.map((skill) => (
            <StaggerItem key={skill.name}>
              <motion.div
                className="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors duration-300 cursor-default h-full"
                whileHover={{ y: -6, scale: 1.04, transition: { type: "spring", stiffness: 300 } }}
              >
                <div className="mb-3">{skill.icon}</div>
                <h4 className="font-medium text-sm text-center">{skill.name}</h4>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Technologies & Tools */}
        <FadeUp delay={0.05}>
          <h3 className="text-xl font-semibold mb-8 text-center">Technologies &amp; Tools</h3>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {technologies.map((tech) => (
            <StaggerItem key={tech.name}>
              <motion.div
                className="flex flex-col items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-300 cursor-default h-full"
                whileHover={{ y: -4, scale: 1.05, transition: { type: "spring", stiffness: 300 } }}
              >
                <div className="mb-2">{tech.icon}</div>
                <span className="text-sm text-center">{tech.name}</span>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  )
}
