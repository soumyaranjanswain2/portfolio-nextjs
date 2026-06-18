"use client";

import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt } from "react-icons/fa";

import {
  SiNextdotjs,
  SiTailwindcss,
  SiMongodb,
  SiJavascript,
} from "react-icons/si";


import { motion } from "framer-motion";
import { FiBriefcase } from "react-icons/fi";

const experiences = [
  {
    year: "2025 – Present",
    role: "Frontend Developer",
    company: "PropertyOTP",
    current: true,
    description:
      "Building scalable real estate applications using React, Next.js and Tailwind CSS.",
    achievements: [
      "Developed 15+ responsive pages",
      "Integrated APIs & JWT Authentication",
      "Optimized UI performance by 40%",
    ],
    skills: ["React", "Next.js", "Tailwind"],
  },
  {
    year: "2024 – 2025",
    role: "Frontend Developer",
    company: "E-Commerce Platform",
    current: false,
    description:
      "Developed responsive e-commerce applications with dashboards and APIs.",
    achievements: [
      "Built Admin Dashboard",
      "Integrated Payment Gateway",
      "Created Mobile Responsive UI",
    ],
    skills: ["React", "Node.js", "MongoDB"],
  },
  {
    year: "2023 – 2024",
    role: "Freelance Developer",
    company: "Remote",
    current: false,
    description:
      "Created portfolio websites, landing pages and business applications for clients.",
    achievements: [
      "Delivered Multiple Client Projects",
      "Created Responsive Designs",
      "Improved SEO Performance",
    ],
    skills: ["JavaScript", "HTML", "CSS"],
  },
];

const skillIcon = (skill) => {
  if (skill === "React")
    return <FaReact className="text-cyan-400 text-sm" />;

  if (skill === "Next.js")
    return <SiNextdotjs className="text-white text-sm" />;

  if (skill === "Tailwind")
    return <SiTailwindcss className="text-sky-400 text-sm" />;

  if (skill === "MongoDB")
    return <SiMongodb className="text-green-500 text-sm" />;

  if (skill === "Node.js")
    return <FaNodeJs className="text-green-400 text-sm" />;

  if (skill === "JavaScript")
    return <SiJavascript className="text-yellow-400 text-sm" />;

  if (skill === "HTML")
    return <FaHtml5 className="text-orange-500 text-sm" />;

  if (skill === "CSS")
    return <FaCss3Alt className="text-blue-500 text-sm" />;

  return null;
};


export default function Experience() {
  return (
    <section
  id="experience"
  className="relative w-full bg-[#050816] text-white py-16 lg:py-18 overflow-hidden"
>
      {/* Ambient glow */}
     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-600/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
<motion.div
  animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
  transition={{ duration: 5, repeat: Infinity }}
  className="absolute left-10 top-40 hidden lg:block"
>
  <FaReact className="text-cyan-400 text-5xl xl:text-7xl opacity-20" />
</motion.div>
<motion.div
  animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
  transition={{ duration: 6, repeat: Infinity }}
  className="absolute right-10 top-64 hidden lg:block"
>
  <SiTailwindcss className="text-sky-400 text-5xl xl:text-7xl opacity-20 drop-shadow-[0_0_30px_#38bdf8]" />
</motion.div>
<motion.div
  animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }}
  transition={{ duration: 7, repeat: Infinity }}
  className="absolute left-16 bottom-20 hidden lg:block"
>
  <SiMongodb className="text-green-500 text-5xl xl:text-7xl opacity-20 drop-shadow-[0_0_30px_#10b981]" />
</motion.div>
<motion.div
  animate={{ y: [0, 15, 0], rotate: [0, -8, 0] }}
  transition={{ duration: 5.5, repeat: Infinity }}
  className="absolute right-20 bottom-32 hidden lg:block"
>
  <SiNextdotjs className="text-white text-5xl xl:text-7xl opacity-20 drop-shadow-[0_0_30px_#ffffff]" />
</motion.div>
        {/* ── Heading ── */}
        <div className="text-center mb-10">
          <p className="inline-flex items-center gap-2 text-purple-400 uppercase tracking-[5px] text-[11px] font-semibold mb-4">
             <span className="w-6 h-px bg-purple-400/60" />
            Career Journey
             <span className="w-6 h-px bg-purple-400/60" />
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
            Experience{" "}
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              Timeline
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mt-3 text-xs sm:text-sm lg:text-base leading-5">
            My professional journey building modern web applications,
            scalable UIs and full-stack solutions.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto mt-5 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.7)]" />
        </div>

        {/* ── Years badge ── */}
        <div className="flex justify-center mb-10">
          <motion.div
            animate={{
              boxShadow: [
                "0 0 20px rgba(168,85,247,0.3)",
                "0 0 55px rgba(168,85,247,0.8)",
                "0 0 20px rgba(168,85,247,0.3)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full bg-white/5 backdrop-blur-xl border border-purple-500/20 flex flex-col items-center justify-center"
          >
            <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-400">3+</span>
            <span className="text-gray-400 text-xs sm:text-sm mt-1">Years Exp.</span>
          </motion.div>
        </div>
        {/* Stats Row */}
<div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-14">

  <motion.div
    whileHover={{ y: -5, scale: 1.05 }}
    className="text-center"
  >
    <h3 className="text-xl sm:text-2xl font-bold text-purple-400">
      15+
    </h3>
    <p className="text-gray-400 text-xs sm:text-sm">
      Projects
    </p>
  </motion.div>

  <motion.div
    whileHover={{ y: -5, scale: 1.05 }}
    className="text-center"
  >
    <h3 className="text-xl sm:text-2xl font-bold text-cyan-400">
      10+
    </h3>
    <p className="text-gray-400 text-xs sm:text-sm">
      Tech Stack
    </p>
  </motion.div>

  <motion.div
    whileHover={{ y: -5, scale: 1.05 }}
    className="text-center"
  >
    <h3 className="text-xl sm:text-2xl font-bold text-green-400">
      100%
    </h3>
    <p className="text-gray-400 text-xs sm:text-sm">
      Responsive
    </p>
  </motion.div>

</div>


        {/* ── Timeline ── */}
        <div className="relative max-w-5xl mx-auto">

          {/* Vertical line — left on mobile, center on desktop */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="
              absolute top-0 bottom-0
              left-5 md:left-1/2
              w-[2px] -translate-x-1/2
              bg-gradient-to-b from-purple-500 via-cyan-400 to-purple-500
              shadow-[0_0_20px_rgba(168,85,247,0.6)]
            "
          />

          {experiences.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative mb-12 last:mb-0 flex items-start ${
  isEven ? "md:justify-start" : "md:justify-end"
}`}
              >
                {/* Dot */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    boxShadow: ["0 0 8px #a855f7", "0 0 30px #a855f7", "0 0 8px #a855f7"],
                  }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                  className="
                    absolute left-5 md:left-1/2 top-6
                    -translate-x-1/2 z-20
                    w-10 h-10 md:w-14 md:h-14 rounded-full
                    bg-gradient-to-br from-purple-500 to-cyan-400
                    flex items-center justify-center
                    shadow-[0_0_25px_rgba(168,85,247,0.8)]
                  "
                >
                 <FiBriefcase className="text-white text-base md:text-xl" />
                </motion.div>

                {/* Card */}
                <motion.div
                 whileHover={{
  y: -12,
  scale: 1.05,
  rotateX: 10,
  rotateY: 10,
}}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="
                   ml-14 sm:ml-16 md:ml-0 md:w-[46%]
                    relative overflow-hidden
                    rounded-2xl
                    bg-white/5 backdrop-blur-xl
                    border border-white/10
                    p-5 sm:p-6
                    hover:border-purple-500/40
                    hover:shadow-[0_0_35px_rgba(168,85,247,0.25)]
                    transition-colors duration-300
                  "
                >
                  {/* Shine on hover */}
                  <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-gradient-to-r from-transparent via-white/8 to-transparent -translate-x-full hover:translate-x-full transition-all duration-1000 pointer-events-none" />

                  {/* Year */}
                  <p className="text-purple-400 text-xs font-semibold tracking-wider uppercase mb-3">
                    {item.year}
                  </p>
                  

                  {/* Role + Current badge */}
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold leading-snug">{item.role}</h3>
                      <p className="text-cyan-400 text-sm mt-0.5">{item.company}</p>
                    </div>
                    {item.current && (
                      <span className="shrink-0 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-medium">
                        Current
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-6 mt-3 mb-4">
                    {item.description}
                  </p>

                  {/* Achievements */}
                  <ul className="space-y-1.5 mb-4">
                    {item.achievements.map((a, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                       <motion.span
  animate={{
    scale: [1, 1.2, 1],
  }}
  transition={{
    duration: 2,
    repeat: Infinity,
  }}
  className="text-green-400 text-xs"
>
  ✓
</motion.span>
                        {a}
                      </li>
                    ))}
                  </ul>

                  {/* Skill pills */}
                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill) => (
                      <motion.span
                        key={skill}
                        whileHover={{ scale: 1.08 }}
                       className="
flex items-center gap-1.5
px-3 py-1.5
rounded-xl
bg-purple-500/10
border border-purple-500/25
text-purple-300
text-xs
font-medium
hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]
transition-all duration-300
"
                      >
                        {skillIcon(skill)}
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}