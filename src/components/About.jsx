"use client";

import {
  FiUser,
  FiMapPin,
  FiBriefcase,
  FiClock,
  FiMail,
  FiSend,
  FiDownload,
} from "react-icons/fi";

import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaFigma,
  FaHtml5,
  FaCss3Alt,
} from "react-icons/fa";

import {
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiPostman,
  SiJsonwebtokens,
  SiRedux,
} from "react-icons/si";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { motion } from "framer-motion";

export default function About() {
  const SkillCard = ({ skill }) => (
    <motion.div
      whileHover={{
        scale: 1.08,
        y: -10,
        rotateX: 8,
        rotateY: 8,
      }}
      className="
        group
        relative
        overflow-hidden
        bg-gradient-to-br
        from-[#1a1f35]
        to-[#0f172a]
        border border-white/10
        rounded-2xl
        h-[110px]
        sm:h-[120px]
        lg:h-[130px]
        flex flex-col
        items-center
        justify-center
        gap-3
        cursor-pointer
        shadow-[0_10px_30px_rgba(0,0,0,0.35)]
        hover:border-purple-500/40
        hover:shadow-[0_15px_40px_rgba(168,85,247,0.35)]
        transition-all duration-300
      "
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000" />
      {skill.icon}
      <p className="text-xs sm:text-sm text-center font-medium px-1">
        {skill.name}
      </p>
    </motion.div>
  );

  const skills = [
    {
      name: "React",
      icon: <FaReact className="text-cyan-400 text-4xl sm:text-5xl drop-shadow-[0_0_15px_#22d3ee]" />,
    },
    {
      name: "Next.js",
      icon: <SiNextdotjs className="text-white text-4xl sm:text-5xl drop-shadow-[0_0_15px_#ffffff]" />,
    },
    {
      name: "JavaScript",
      icon: <SiJavascript className="text-yellow-400 text-4xl sm:text-5xl drop-shadow-[0_0_15px_#facc15]" />,
    },
    {
      name: "TypeScript",
      icon: <SiTypescript className="text-blue-400 text-4xl sm:text-5xl drop-shadow-[0_0_15px_#60a5fa]" />,
    },
    {
      name: "Tailwind CSS",
      icon: <SiTailwindcss className="text-sky-400 text-4xl sm:text-5xl drop-shadow-[0_0_15px_#38bdf8]" />,
    },
    {
      name: "HTML5",
      icon: <FaHtml5 className="text-orange-500 text-4xl sm:text-5xl drop-shadow-[0_0_15px_#f97316]" />,
    },
    {
      name: "CSS3",
      icon: <FaCss3Alt className="text-blue-500 text-4xl sm:text-5xl drop-shadow-[0_0_15px_#3b82f6]" />,
    },
    {
      name: "Node.js",
      icon: <FaNodeJs className="text-green-400 text-4xl sm:text-5xl drop-shadow-[0_0_15px_#22c55e]" />,
    },
    {
      name: "Express.js",
      icon: <SiExpress className="text-gray-300 text-4xl sm:text-5xl drop-shadow-[0_0_15px_#d1d5db]" />,
    },
    {
      name: "MongoDB",
      icon: <SiMongodb className="text-green-500 text-4xl sm:text-5xl drop-shadow-[0_0_15px_#10b981]" />,
    },
    {
      name: "REST API",
      icon: <SiPostman className="text-orange-400 text-4xl sm:text-5xl drop-shadow-[0_0_15px_#fb923c]" />,
    },
    {
      name: "JWT",
      icon: <SiJsonwebtokens className="text-pink-500 text-4xl sm:text-5xl drop-shadow-[0_0_15px_#ec4899]" />,
    },
    {
      name: "Git & GitHub",
      icon: <FaGitAlt className="text-orange-500 text-4xl sm:text-5xl drop-shadow-[0_0_15px_#f97316]" />,
    },
    {
      name: "Redux",
      icon: <SiRedux className="text-violet-400 text-4xl sm:text-5xl drop-shadow-[0_0_15px_#8b5cf6]" />,
    },
    {
      name: "Figma",
      icon: <FaFigma className="text-pink-500 text-4xl sm:text-5xl drop-shadow-[0_0_15px_#ec4899]" />,
    },
  ];

  return (
    // ✅ FIXED: Removed min-h-screen / min-h-[calc(100vh-80px)] — caused Chrome overflow.
    // Use w-full + py padding only. Height is driven by content, not viewport constraints.
    <section
      id="about"
      className="w-full bg-[#050816] text-white py-16 lg:py-20"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-12 lg:items-start">

          {/* ── About Card ── */}
          <div className="bg-[#0f172a]/60 border border-white/10 rounded-2xl p-4 sm:p-5 lg:p-7 flex flex-col">
            <p className="text-purple-400 text-xs sm:text-sm uppercase tracking-wider">
              About Me
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">
              About {""}
              <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
               Me
            </span>
              <div className="w-12 h-1 mt-2 rounded-full bg-gradient-to-r from-purple-500 via-violet-400 to-cyan-400 shadow-[0_0_15px_rgba(168,85,247,0.8)]" />
            </h2>

            <p className="text-gray-400 leading-7 mb-6 text-sm sm:text-base">
              Frontend Developer with 3+ years of experience building responsive,
              scalable, and high-performance web applications using React.js,
              Next.js, JavaScript, and modern frontend technologies. Passionate
              about creating exceptional user experiences and clean, maintainable
              code.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex gap-3 items-start">
                <FiUser className="text-purple-400 text-xl shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-gray-400 text-sm">Name</p>
                  <p className="text-sm sm:text-base">Soumya Ranjan Swain</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <FiMapPin className="text-purple-400 text-xl shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-gray-400 text-sm">Location</p>
                  <p className="text-sm sm:text-base">India</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <FiBriefcase className="text-purple-400 text-xl shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-gray-400 text-sm">Experience</p>
                  <p className="text-sm sm:text-base">3+ Years</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <FiClock className="text-purple-400 text-xl shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-gray-400 text-sm">Availability</p>
                  <p className="text-sm sm:text-base">Open To Work</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <FiMail className="text-purple-400 text-xl shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-xs sm:text-sm break-all leading-5">
                    soumyaranjan8428@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <FiSend className="text-purple-400 text-xl shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-gray-400 text-sm">Freelance</p>
                  <p className="text-sm sm:text-base">Available</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-2 flex justify-center sm:justify-start">
              <a
                href="/resume/Soumya_Ranjan_2026.pdf"
                download
                className="
                  group relative overflow-hidden
                  w-full sm:w-auto
                  flex items-center justify-center gap-3
                  px-6 py-3 rounded-2xl
                  bg-gradient-to-r from-purple-600 via-violet-500 to-cyan-500
                  text-white font-semibold text-sm sm:text-base
                  shadow-[0_10px_30px_rgba(168,85,247,0.5)]
                  hover:shadow-[0_0_40px_rgba(168,85,247,0.9)]
                  hover:-translate-y-1 hover:scale-105
                  transition-all duration-300
                "
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-all duration-1000" />
                <span className="relative z-10">Download Resume</span>
                <FiDownload className="relative z-10 text-xl group-hover:animate-bounce" />
              </a>
            </div>
          </div>

          {/* ── Skills Card ── */}
          <section id="about">
            <div className="bg-[#0f172a]/60 border border-white/10 rounded-2xl p-5 sm:p-6 lg:p-8 flex flex-col">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Technical {" "}
                <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
               Skills
            </span>
              </h2>
              <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full mb-6 sm:mb-8" />

              {/* Mobile / Tablet Slider (< lg) */}
              <div className="block lg:hidden pb-10">
                <Swiper
                  modules={[Navigation, Pagination]}
                  navigation
                  pagination={{ clickable: true }}
                  spaceBetween={16}
                  slidesPerView={1}
                  breakpoints={{
                    480: { slidesPerView: 1 },
                    640: { slidesPerView: 1 },
                  }}
                >
                  {[skills.slice(0, 6), skills.slice(6, 12), skills.slice(12, 15)].map(
                    (group, gi) => (
                      <SwiperSlide key={gi}>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {group.map((skill, i) => (
                            <SkillCard key={i} skill={skill} />
                          ))}
                        </div>
                      </SwiperSlide>
                    )
                  )}
                </Swiper>
              </div>

              {/* Desktop Grid (lg+) */}
              <div className="hidden lg:grid lg:grid-cols-5 gap-4">
                {skills.map((skill, index) => (
                  <SkillCard key={index} skill={skill} />
                ))}
              </div>
            </div>
          </section>

        </div>
      </div>
    </section>
  );
}