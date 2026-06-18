"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt } from "react-icons/fa";
import {
  SiNextdotjs, SiTailwindcss, SiMongodb,
  SiJavascript, SiJsonwebtokens, SiExpress,
} from "react-icons/si";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { FiExternalLink, FiGithub, FiArrowUpRight } from "react-icons/fi";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// ── Data ──────────────────────────────────────────────────────────────────────
const propertyOtpImages = [
  "/images/projects-1.png",
  "/images/projects-2.png",
  "/images/projects-3.png",
  "/images/projects-5.png",
];

const projects = [
  {
    title: "E-Commerce Platform",
    category: "MERN Stack",
    description: "Full-stack shopping platform with cart, admin dashboard, payment gateway and order tracking.",
    image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=800&q=80",
    demo: "https://ecommerce-demo.vercel.app",
    github: "https://github.com/soumyaranjanswain2",
    tech: ["React", "Node.js", "MongoDB"],
    accent: "from-purple-500 to-pink-500",
  },
  {
    title: "Banking Management System",
    category: "Web Application",
    description: "Secure banking dashboard with account management, transaction history and analytics.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    demo: "https://banking-demo.vercel.app",
    github: "https://github.com/soumyaranjanswain2",
    tech: ["React", "Express", "MongoDB"],
    accent: "from-cyan-500 to-blue-500",
  },
  {
    title: "Portfolio Website",
    category: "Frontend Development",
    description: "Modern developer portfolio with animations, dark theme and responsive design.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    demo: "https://soumya-portfolio.vercel.app",
    github: "https://github.com/soumyaranjanswain2",
    tech: ["Next.js", "Tailwind"],
    accent: "from-emerald-500 to-teal-500",
  },
];

const featuredTech = ["Next.js", "React", "Tailwind", "Node.js", "MongoDB", "JWT"];

const stats = [
  { value: "5+",   label: "Projects",     color: "text-purple-400",  glow: "rgba(168,85,247,0.4)" },
  { value: "15+",  label: "Technologies", color: "text-cyan-400",    glow: "rgba(34,211,238,0.4)" },
  { value: "100%", label: "Responsive",   color: "text-emerald-400", glow: "rgba(52,211,153,0.4)" },
];

const featuredFeatures = [
  { icon: "🏠", label: "Property Listings" },
  { icon: "🔐", label: "JWT Auth" },
  { icon: "📊", label: "Dashboard Analytics" },
  { icon: "📱", label: "Mobile Responsive" },
];

const featuredStats = [
  { value: "15+",  label: "Pages",     color: "text-purple-400"  },
  { value: "100%", label: "Responsive",color: "text-cyan-400"    },
  { value: "JWT",  label: "Secure",    color: "text-emerald-400" },
];

// ── Skill icon getter (function, not object literal with JSX) ─────────────────
function getSkillIcon(tech) {
  const map = {
    "React":      <FaReact         className="text-cyan-400   text-xs" />,
    "Next.js":    <SiNextdotjs     className="text-white      text-xs" />,
    "Tailwind":   <SiTailwindcss   className="text-sky-400    text-xs" />,
    "MongoDB":    <SiMongodb       className="text-green-500  text-xs" />,
    "Node.js":    <FaNodeJs        className="text-green-400  text-xs" />,
    "JavaScript": <SiJavascript    className="text-yellow-400 text-xs" />,
    "Express":    <SiExpress       className="text-gray-300   text-xs" />,
    "HTML":       <FaHtml5         className="text-orange-500 text-xs" />,
    "CSS":        <FaCss3Alt       className="text-blue-500   text-xs" />,
    "JWT":        <SiJsonwebtokens className="text-pink-400   text-xs" />,
  };
  return map[tech] ?? null;
}

// ── Tech Pill ─────────────────────────────────────────────────────────────────
function TechPill({ tech, size = "sm" }) {
  return (
    <motion.span
      whileHover={{ scale: 1.08, y: -2 }}
      className={`inline-flex items-center gap-1.5 rounded-full
        bg-white/5 border border-white/10 text-gray-300 font-medium
        hover:bg-purple-500/15 hover:border-purple-400/40 hover:text-purple-200
        transition-all duration-200 select-none
        ${size === "sm" ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-xs sm:text-sm"}`}
    >
      {getSkillIcon(tech)}
      {tech}
    </motion.span>
  );
}

// ── 3D Tilt Card ──────────────────────────────────────────────────────────────
function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ── Fade-in on scroll ─────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Project Card ──────────────────────────────────────────────────────────────
function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <FadeIn delay={index * 0.1}>
      <TiltCard
        className="group relative overflow-hidden rounded-2xl bg-[#0d0d1a] border border-white/[0.07]
          hover:border-purple-500/30 transition-all duration-300 flex flex-col h-full"
      >
        {/* Hover glow */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 pointer-events-none
            bg-gradient-to-br ${project.accent}
            [mask-image:radial-gradient(ellipse_at_top,black_0%,transparent_70%)]`}
          style={{ opacity: hovered ? 0.07 : 0 }}
        />

        {/* Image */}
        <div
          className="relative h-44 sm:h-48 overflow-hidden shrink-0"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d1a] via-black/20 to-transparent" />

          <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full
            bg-black/60 backdrop-blur-md border border-white/10
            text-[10px] font-semibold uppercase tracking-widest
            bg-gradient-to-r ${project.accent} bg-clip-text text-transparent`}>
            {project.category}
          </span>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md
              border border-white/20 flex items-center justify-center"
          >
            <FiArrowUpRight className="text-white text-sm" />
          </motion.div>
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-base sm:text-lg font-bold text-white leading-tight">{project.title}</h3>
          <p className="text-gray-500 text-sm leading-6 mt-2 flex-1">{project.description}</p>

          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.tech.map((t) => <TechPill key={t} tech={t} />)}
          </div>

          <div className="flex items-center gap-4 mt-5 pt-4 border-t border-white/5">
            <a href={project.demo} target="_blank" rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide
                bg-gradient-to-r ${project.accent} bg-clip-text text-transparent
                hover:opacity-80 transition-opacity duration-200`}>
              <FiExternalLink className="text-purple-400 text-sm" /> Live Demo
            </a>
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide
                text-gray-500 hover:text-white transition-colors duration-200">
              <FiGithub className="text-sm" /> GitHub
            </a>
          </div>
        </div>
      </TiltCard>
    </FadeIn>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Projects() {
  return (
    <section
      id="projects"
      className="relative w-full bg-[#050816] text-white py-16 lg:py-18 overflow-hidden"
    >
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-700/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-700/8 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* Heading */}
        <FadeIn className="text-center mb-10">
          <p className="inline-flex items-center gap-2 text-purple-400 uppercase tracking-[5px] text-[11px] font-semibold mb-4">
            <span className="w-6 h-px bg-purple-400/60" />
            My Work
            <span className="w-6 h-px bg-purple-400/60" />
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
            Featured{" "}
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto mt-5 text-sm sm:text-base leading-7">
            Production-ready web apps built with modern stack — React, Next.js, Node.js and MongoDB.
          </p>
        </FadeIn>

        {/* Stats */}
        <FadeIn delay={0.1} className="flex justify-center gap-8 sm:gap-16 mb-16">
          {stats.map(({ value, label, color, glow }) => (
            <motion.div
              key={label}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="text-center"
            >
              <p className={`text-2xl sm:text-3xl font-bold ${color}`}
                style={{ textShadow: `0 0 20px ${glow}` }}>{value}</p>
              <p className="text-gray-600 text-xs sm:text-sm mt-1 uppercase tracking-widest">{label}</p>
            </motion.div>
          ))}
        </FadeIn>

        {/* Featured Card */}
        <FadeIn delay={0.15} className="mb-14">
          <TiltCard className="overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0a0a18]
            hover:border-purple-500/30 hover:shadow-[0_0_100px_rgba(168,85,247,0.12)]
            transition-all duration-500">

            <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr]">

              {/* Swiper */}
              <div className="relative h-[230px] sm:h-[300px] md:h-[380px] lg:h-[480px] bg-[#07070f] overflow-hidden">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  navigation
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 3200, disableOnInteraction: false }}
                  loop
                  className="h-full swiper-premium"
                >
                  {propertyOtpImages.map((img, i) => (
                    <SwiperSlide key={i}>
                      <div className="h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
                        <div className="w-full h-full rounded-xl overflow-hidden bg-[#0f1423]
                          border border-white/[0.06] shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex flex-col">
                          <div className="h-7 shrink-0 bg-[#1a2035] flex items-center px-3 gap-1.5 border-b border-white/5">
                            <div className="w-2 h-2 rounded-full bg-red-500/80" />
                            <div className="w-2 h-2 rounded-full bg-yellow-400/80" />
                            <div className="w-2 h-2 rounded-full bg-green-500/80" />
                            <div className="flex-1 mx-3 h-3.5 rounded bg-white/5 text-[8px] text-gray-600
                              flex items-center justify-center tracking-wide">
                              propertyotp.vercel.app
                            </div>
                          </div>
                          <img src={img} alt={`PropertyOTP screenshot ${i + 1}`} className="w-full flex-1 object-contain" />
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-center"
                style={{ transform: "translateZ(20px)" }}>

                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-[10px] text-purple-400 uppercase tracking-[3px] font-semibold">
                    Featured Project
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20
                    text-emerald-400 text-[10px] font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                  PropertyOTP
                </h3>

                <p className="text-gray-500 mt-3 text-sm sm:text-base leading-7">
                  A modern real estate platform with smart property listings, advanced filters,
                  admin dashboards, JWT authentication and a fully responsive UI built for speed.
                </p>

                <div className="grid grid-cols-2 gap-2.5 mt-6">
                  {featuredFeatures.map(({ icon, label }) => (
                    <div key={label} className="flex items-center gap-2 px-3 py-2 rounded-xl
                      bg-white/[0.03] border border-white/[0.06] text-xs text-gray-400">
                      <span>{icon}</span>
                      {label}
                    </div>
                  ))}
                </div>

                <div className="flex gap-6 mt-6 pt-5 border-t border-white/[0.06]">
                  {featuredStats.map(({ value, label, color }) => (
                    <div key={label}>
                      <p className={`text-lg sm:text-xl font-bold ${color}`}>{value}</p>
                      <p className="text-[11px] text-gray-600 uppercase tracking-widest mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mt-5">
                  {featuredTech.map((t) => <TechPill key={t} tech={t} size="md" />)}
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-7">
                  <motion.a
                    href="https://propertyotp-demo.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                      bg-gradient-to-r from-purple-600 to-cyan-500 text-white
                      shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_45px_rgba(168,85,247,0.5)]
                      transition-shadow duration-300"
                  >
                    Live Demo <FiExternalLink className="text-base" />
                  </motion.a>
                  <motion.a
                    href="https://github.com/soumyaranjanswain2"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                      bg-white/[0.04] border border-white/10 text-gray-300
                      hover:border-purple-500/30 hover:text-white transition-all duration-200"
                  >
                    <FiGithub className="text-base" /> GitHub
                  </motion.a>
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
          </TiltCard>
        </FadeIn>

        {/* Divider */}
        <FadeIn delay={0.05} className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/10" />
          <span className="text-gray-600 text-xs uppercase tracking-[4px] font-medium">More Projects</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/10" />
        </FadeIn>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* CTA */}
        <FadeIn delay={0.2} className="text-center mt-14">
          <motion.a
            href="https://github.com/soumyaranjanswain2"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl text-sm font-semibold
              border border-white/10 text-gray-400 hover:text-white hover:border-purple-500/40
              hover:bg-purple-500/5 transition-all duration-300"
          >
            <FiGithub className="text-base" />
            View All on GitHub
            <FiArrowUpRight className="text-base" />
          </motion.a>
        </FadeIn>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .swiper-premium .swiper-button-next,
        .swiper-premium .swiper-button-prev {
          color: white;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 50%;
          width: 36px;
          height: 36px;
          backdrop-filter: blur(8px);
          transition: background 0.2s, border-color 0.2s;
        }
        .swiper-premium .swiper-button-next:hover,
        .swiper-premium .swiper-button-prev:hover {
          background: rgba(168,85,247,0.2);
          border-color: rgba(168,85,247,0.4);
        }
        .swiper-premium .swiper-button-next::after,
        .swiper-premium .swiper-button-prev::after {
          font-size: 12px;
          font-weight: 700;
        }
        .swiper-premium .swiper-pagination-bullet {
          background: rgba(255,255,255,0.25);
          opacity: 1;
          transition: background 0.2s, transform 0.2s;
        }
        .swiper-premium .swiper-pagination-bullet-active {
          background: #a855f7;
          transform: scale(1.3);
        }
      `}} />
    </section>
  );
}