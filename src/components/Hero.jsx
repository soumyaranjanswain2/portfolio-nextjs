"use client";

import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { FiArrowRight } from "react-icons/fi";
import { FiSend } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiJavascript, SiTailwindcss } from "react-icons/si";
import { SiNextdotjs, SiMongodb } from "react-icons/si";
import { FaGithub, FaLinkedinIn, FaTwitter, FaEnvelope } from "react-icons/fa";

export default function Hero() {
  return (
    <section
  id="home"
  className="relative w-full overflow-hidden min-h-[calc(100vh-80px)] flex items-center bg-[#050816] text-white"
>
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] lg:w-[700px] h-[300px] sm:h-[500px] lg:h-[600px] bg-purple-700/20 blur-[120px] lg:blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
          {/* LEFT SECTION */}
          <div>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white mb-2 w-fit mx-auto lg:mx-0">
              👋 Hi, I'm
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold leading-tight text-center lg:text-left mt-2">
              <span className="animated-gradient-text">
                Soumya Ranjan Swain
              </span>
            </h1>

            <div className="h-[50px] sm:h-[60px] flex items-center justify-center lg:justify-start">
              <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-center lg:text-left">
                <TypeAnimation
                  sequence={[
                    "Frontend Developer",
                    2000,
                    "React Developer",
                    2000,
                    "Next.js Developer",
                    2000,
                    "UI Developer",
                    2000,
                    "Full Stack Developer",
                    2000,
                    "MERN Stack Developer",
                    2000,
                  ]}
                  speed={60}
                  repeat={Infinity}
                  cursor={false}
                  wrapper="span"
                />

                <span className="ml-1 text-purple-400 animate-pulse">|</span>
              </h2>
            </div>

            <p className="text-gray-400 mt-4 max-w-xl leading-7 text-center lg:text-left mx-auto lg:mx-0 text-sm sm:text-base">
              I build modern, responsive and high-performance web applications
              using React, Next.js, Tailwind CSS and modern technologies.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
              <button
  onClick={() => {
    document
      .getElementById("projects")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }}
  className="
    group relative overflow-hidden flex items-center justify-center gap-3
    px-6 sm:px-8 py-3 sm:py-4 rounded-xl
    bg-gradient-to-r from-purple-600 via-violet-500 to-purple-700
    shadow-[0_12px_35px_rgba(168,85,247,0.45)]
    hover:shadow-[0_0_40px_rgba(168,85,247,0.9)]
    hover:-translate-y-1
    transition-all duration-300
  "
>
  <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

  <span className="relative z-10 font-medium text-sm sm:text-base">
    View My Work
  </span>

  <FiArrowRight className="relative z-10 text-lg sm:text-xl group-hover:translate-x-2 transition-transform duration-300" />
</button>

              <button
  onClick={() => {
    document
      .getElementById("contact")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }}
  className="
    group relative overflow-hidden flex items-center justify-center gap-3
    px-6 sm:px-8 py-3 sm:py-4 rounded-xl
    border border-white/10 bg-white/5 backdrop-blur-xl
    shadow-[0_10px_30px_rgba(0,0,0,0.35)]
    hover:shadow-[0_0_35px_rgba(168,85,247,0.7)]
    hover:-translate-y-1
    transition-all duration-300
  "
>
  <span className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-500/20 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

  <FiSend className="relative z-10 text-lg text-purple-400 group-hover:translate-x-1 transition-transform" />

  <span className="relative z-10 font-medium text-sm sm:text-base">
    Hire Me
  </span>
</button>
            </div>

            <div className="mt-3 sm:mt-4">
              <p className="text-gray-400 mb-4 text-center lg:text-left">Connect with me</p>
              <div className="flex justify-center lg:justify-start gap-4 flex-wrap">
                <a
                  href="https://github.com/soumyaranjanswain2"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0f172a] border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_25px_rgba(168,85,247,0.8)] hover:border-white/40"
                >
                  <FaGithub />
                </a>

                <a
                  href="https://www.linkedin.com/in/soumya1234/"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0f172a] border border-white/10 text-blue-400 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_25px_rgba(168,85,247,0.8)]"
                >
                  <FaLinkedinIn />
                </a>

                <a
                  href="#"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0f172a] border border-white/10 text-cyan-400 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_25px_rgba(168,85,247,0.8)]"
                >
                  <FaTwitter />
                </a>

                <a
                  href="mailto:soumyaranjan8428@gmail.com"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0f172a] border border-white/10 text-pink-400 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_25px_rgba(168,85,247,0.8)]"
                >
                  <FaEnvelope />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          {/* RIGHT SECTION */}
<div className="relative flex justify-center items-center h-[380px] sm:h-[480px] md:h-[560px] lg:h-[620px] -mt-16 sm:-mt-8 md:-mt-4 lg:mt-0">
            {/* Glow Rings */}
            <div className="absolute w-[260px] sm:w-[360px] md:w-[460px] lg:w-[580px] h-[260px] sm:h-[360px] md:h-[460px] lg:h-[580px] rounded-full border border-purple-500/30" />
            <div className="absolute w-[190px] sm:w-[280px] md:w-[370px] lg:w-[470px] h-[190px] sm:h-[280px] md:h-[370px] lg:h-[470px] rounded-full border border-purple-500/20" />
            <div className="absolute w-[150px] sm:w-[220px] md:w-[290px] lg:w-[360px] h-[150px] sm:h-[220px] md:h-[290px] lg:h-[360px] rounded-full border border-purple-500/20" />

            {/* Floating Skills */}
            {/* React */}
            <motion.div
  animate={{ y: [0, -15, 0] }}
  transition={{ duration: 3, repeat: Infinity }}
  className="
  absolute
  top-[25%]
  left-[20%]

  sm:top-[15%]
  sm:left-[20%]

  lg:top-[10%]
  lg:left-[22%]

  w-11 h-11
  sm:w-14 sm:h-14
  md:w-16 md:h-16

  rounded-full
  bg-gradient-to-br from-cyan-500/20 to-cyan-900/30
  border border-cyan-400/40
  backdrop-blur-xl
  shadow-[0_0_30px_rgba(34,211,238,0.5)]
  flex items-center justify-center
"
>
  <FaReact className="text-cyan-400 text-2xl sm:text-3xl md:text-5xl" />
</motion.div>

            {/* Next */}
            <motion.div
  animate={{ y: [0, -15, 0] }}
  transition={{ duration: 4, repeat: Infinity }}
  className="
  absolute
  top-[25%]
  right-[20%]

  sm:top-[15%]
  sm:right-[20%]

  lg:top-[10%]
  lg:right-[22%]

  w-11 h-11
  sm:w-14 sm:h-14
  md:w-16 md:h-16

  rounded-full
  bg-gradient-to-br from-gray-500/20 to-black/40
  border border-white/20
  backdrop-blur-xl
  shadow-[0_0_30px_rgba(255,255,255,0.2)]
  flex items-center justify-center
"
>
  <SiNextdotjs className="text-white text-xl sm:text-2xl md:text-4xl" />
</motion.div>

            {/* Node */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute bottom-32 left-12 sm:bottom-36 sm:left-16 md:bottom-40 md:left-12 w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full
                bg-gradient-to-br from-green-500/20 to-green-900/30
                border border-green-400/40 backdrop-blur-xl
                shadow-[0_0_30px_rgba(34,197,94,0.5)]
                flex items-center justify-center"
            >
              <FaNodeJs className="text-green-400 text-2xl sm:text-3xl md:text-5xl drop-shadow-[0_0_10px_#22c55e]" />
            </motion.div>

            {/* JS */}
            <motion.div
              whileHover={{ scale: 1.15 }}
              animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-36 left-4 sm:left-8 sm:top-44 sm:left-10 md:top-52 md:left-0 w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full
                bg-gradient-to-br from-yellow-500/20 to-yellow-900/30
                border border-yellow-400/40 backdrop-blur-xl
                shadow-[0_0_30px_rgba(250,204,21,0.5)]
                flex items-center justify-center"
            >
              <SiJavascript className="text-yellow-400 text-2xl sm:text-3xl md:text-5xl" />
            </motion.div>

            {/* Mongo */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute bottom-28 right-10 sm:bottom-32 sm:right-12 md:bottom-38 md:right-8 w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full
                bg-gradient-to-br from-emerald-500/20 to-emerald-900/30
                border border-emerald-400/40 backdrop-blur-xl
                shadow-[0_0_30px_rgba(16,185,129,0.5)]
                flex items-center justify-center"
            >
              <SiMongodb className="text-emerald-400 text-2xl sm:text-3xl md:text-5xl drop-shadow-[0_0_10px_#10b981]" />
            </motion.div>

            {/* Tailwind */}
            <motion.div
              whileHover={{ scale: 1.15, rotate: 10 }}
              animate={{
                y: [0, -15, 0],
                boxShadow: [
                  "0 0 20px rgba(56,189,248,0.4)",
                  "0 0 40px rgba(56,189,248,0.8)",
                  "0 0 20px rgba(56,189,248,0.4)",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-36 right-8 sm:top-44 sm:right-10 md:top-52 md:right-0 w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full
                bg-gradient-to-br from-sky-500/20 to-sky-900/30
                border border-sky-400/40 backdrop-blur-xl
                flex items-center justify-center"
            >
              <SiTailwindcss className="text-sky-400 text-2xl sm:text-3xl md:text-5xl" />
            </motion.div>

            {/* Purple Glow */}
            <div className="absolute w-[260px] sm:w-[340px] md:w-[420px] h-[260px] sm:h-[340px] md:h-[420px] bg-purple-500/20 blur-[120px] rounded-full" />

            {/* Profile Image */}
            <Image
              src="/images/profile.png"
              alt="Soumya"
              width={520}
              height={650}
              priority
            className="
relative
z-10
object-contain
w-[190px]
sm:w-[240px]
md:w-[320px]
lg:w-[360px]
h-auto
"
            />

            {/* Stats Card */}
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="
                absolute bottom-6 sm:bottom-6 md:bottom-8
                z-20
                w-[92%] sm:w-[88%] md:w-[85%] lg:w-[520px]
                overflow-hidden rounded-3xl
                bg-gradient-to-br from-purple-900/20 via-[#101528]/95 to-cyan-900/20
                backdrop-blur-2xl
                border border-purple-500/20
                shadow-[0_20px_60px_rgba(0,0,0,0.45)]
              "
            >
              {/* Top Glow */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent" />

              {/* Background Glow */}
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[180px] h-[180px] bg-purple-500/10 blur-[80px]" />

              <div className="relative grid grid-cols-3 text-center px-2 sm:px-4 md:px-6 py-3 sm:py-5 md:py-6">
                {/* Experience */}
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]">
                    3+
                  </h3>
                  <p className="text-[10px] sm:text-xs md:text-sm text-gray-400 mt-1 sm:mt-2">Experience</p>
                </div>

                {/* Projects */}
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]">
                    15+
                  </h3>
                  <p className="text-[10px] sm:text-xs md:text-sm text-gray-400 mt-1 sm:mt-2">Projects</p>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-green-400 drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]">
                    10+
                  </h3>
                  <p className="text-[10px] sm:text-xs md:text-sm text-gray-400 mt-1 sm:mt-2">Technologies</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}