"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaArrowUp, FaWhatsapp, FaReact, FaNodeJs, FaHtml5, FaCss3Alt } from "react-icons/fa";
import { FiMail, FiMapPin, FiCode, FiExternalLink } from "react-icons/fi";
import { SiNextdotjs, SiTailwindcss, SiMongodb, SiExpress, SiJsonwebtokens } from "react-icons/si";

// ── Data ──────────────────────────────────────────────────────────────────────
const navLinks = [
  { label: "About",      href: "#about"      },
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects"   },
  { label: "Contact",    href: "#contact"    },
];

const socials = [
  {
    icon: FaGithub, href: "https://github.com/soumyaranjanswain2", label: "GitHub",
    color: "hover:border-purple-500/60 hover:text-purple-400 hover:bg-purple-500/5 hover:shadow-[0_0_16px_rgba(168,85,247,0.3)]",
  },
  {
    icon: FaLinkedinIn, href: "https://www.linkedin.com/in/soumya1234/", label: "LinkedIn",
    color: "hover:border-blue-500/60 hover:text-blue-400 hover:bg-blue-500/5 hover:shadow-[0_0_16px_rgba(59,130,246,0.3)]",
  },
  {
    icon: FiMail, href: "mailto:soumyaranjan8428@gmail.com", label: "Email",
    color: "hover:border-cyan-500/60 hover:text-cyan-400 hover:bg-cyan-500/5 hover:shadow-[0_0_16px_rgba(34,211,238,0.3)]",
  },
  {
    icon: FaWhatsapp, href: "https://wa.me/919348452227", label: "WhatsApp",
    color: "hover:border-green-500/60 hover:text-green-400 hover:bg-green-500/5 hover:shadow-[0_0_16px_rgba(74,222,128,0.3)]",
  },
];

const stats = [
  { value: "5+",   label: "Projects",     color: "text-purple-400",  glow: "rgba(168,85,247,0.5)"  },
  { value: "15+",  label: "Technologies", color: "text-cyan-400",    glow: "rgba(34,211,238,0.5)"  },
  { value: "3+",   label: "Years Exp.",   color: "text-emerald-400", glow: "rgba(52,211,153,0.5)"  },
  { value: "100%", label: "Responsive",   color: "text-pink-400",    glow: "rgba(244,114,182,0.5)" },
];

const techStack = [
  { name: "Next.js",  Icon: SiNextdotjs,     color: "text-white"       },
  { name: "React",    Icon: FaReact,          color: "text-cyan-400"    },
  { name: "Tailwind", Icon: SiTailwindcss,    color: "text-sky-400"     },
  { name: "Node.js",  Icon: FaNodeJs,         color: "text-green-400"   },
  { name: "MongoDB",  Icon: SiMongodb,        color: "text-green-500"   },
  { name: "Express",  Icon: SiExpress,        color: "text-gray-300"    },
  { name: "JWT",      Icon: SiJsonwebtokens,  color: "text-pink-400"    },
  { name: "HTML",     Icon: FaHtml5,          color: "text-orange-400"  },
  { name: "CSS",      Icon: FaCss3Alt,        color: "text-blue-400"    },
];

// ── Fade-in helper ────────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, y = 20, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Footer() {
  const [showTop, setShowTop]     = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total    = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(total > 0 ? Math.round((scrolled / total) * 100) : 0);
      setShowTop(scrolled > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <footer className="relative bg-[#050816] text-white overflow-hidden">

        {/* Ambient orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 -translate-x-1/2 -top-10 w-[600px] h-[300px] bg-purple-700/10 blur-[130px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-[350px] h-[200px] bg-cyan-700/8 blur-[90px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[250px] h-[200px] bg-fuchsia-700/6 blur-[80px] rounded-full" />
        </div>

        {/* Top accent line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />

        {/* ── CTA Banner ── */}
        <div className="relative z-10 border-b border-white/[0.05]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">

            <FadeIn>
              <span className="inline-flex items-center gap-2 text-purple-400 text-[11px] uppercase tracking-[5px] font-semibold mb-5">
                <span className="w-5 h-px bg-purple-400/60" />
                Open To Opportunities
                <span className="w-5 h-px bg-purple-400/60" />
              </span>
            </FadeIn>

            <FadeIn delay={0.08}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-3">
                Let&apos;s Build Something
              </h2>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-8">
                <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                  Amazing Together
                </span>{" "}🚀
              </h2>
            </FadeIn>

            <FadeIn delay={0.14}>
              <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto mb-8 leading-7">
                Have a project idea or want to collaborate? I&apos;m always open to exciting opportunities.
              </p>
            </FadeIn>

            <FadeIn delay={0.2} className="flex flex-wrap justify-center gap-3">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold text-white
                  bg-gradient-to-r from-purple-600 to-cyan-500
                  shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_55px_rgba(168,85,247,0.55)]
                  transition-shadow duration-300"
              >
                Get In Touch <FiExternalLink className="text-sm" />
              </motion.a>
              <motion.a
                href="/resume/Soumya_Ranjan_2026.pdf"
                download
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold
                  border border-white/10 text-gray-300
                  hover:border-purple-500/40 hover:text-white hover:bg-purple-500/5
                  transition-all duration-200"
              >
                ↓ Download Resume
              </motion.a>
            </FadeIn>

          </div>
        </div>

        {/* ── Stats strip ── */}
        <div className="relative z-10 border-b border-white/[0.05]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {stats.map(({ value, label, color, glow }, i) => (
                <FadeIn key={label} delay={i * 0.06}>
                  <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 400 }}>
                    <p
                      className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${color}`}
                      style={{ textShadow: `0 0 24px ${glow}` }}
                    >
                      {value}
                    </p>
                    <p className="text-gray-600 text-[11px] uppercase tracking-[3px] mt-1.5">{label}</p>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>

        {/* ── Main grid ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

            {/* Brand */}
            <FadeIn className="sm:col-span-2 lg:col-span-1">
              <div>
                <h2 className="text-2xl font-bold mb-3">
                  <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    Soumya.
                  </span>
                </h2>
                <p className="text-gray-500 text-sm leading-6 max-w-[220px]">
                  Frontend Developer crafting modern, responsive web experiences with clean code.
                </p>

                <div className="flex flex-col gap-3 mt-6">
                  <div className="inline-flex items-center gap-2 w-fit px-3 py-1.5 rounded-full
                    bg-emerald-500/10 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-emerald-400 text-xs font-semibold">Available For Hire</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-gray-600 text-xs">
                    <FiMapPin className="shrink-0" />
                    Bangalore, India
                  </div>

                  <div className="flex items-center gap-1.5 text-gray-600 text-xs">
                    <FiCode className="shrink-0 text-purple-400" />
                    <span className="text-gray-500">15+ open source repos</span>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Navigation */}
            <FadeIn delay={0.05}>
              <div>
                <h3 className="text-white text-xs font-semibold uppercase tracking-[4px] mb-6">
                  Navigation
                </h3>
                <ul className="space-y-3.5">
                  {navLinks.map(({ label, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        className="group flex items-center gap-2 text-sm text-gray-500
                          hover:text-purple-400 transition-colors duration-200"
                      >
                        <span className="w-0 group-hover:w-4 h-px bg-gradient-to-r from-purple-400 to-cyan-400
                          transition-all duration-300 rounded-full" />
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* Tech Stack */}
            <FadeIn delay={0.1}>
              <div>
                <h3 className="text-white text-xs font-semibold uppercase tracking-[4px] mb-6">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.map(({ name, Icon, color }) => (
                    <motion.div
                      key={name}
                      whileHover={{ y: -2, scale: 1.05 }}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium
                        bg-white/[0.03] border border-white/[0.07] text-gray-400
                        hover:border-purple-500/30 hover:text-gray-200
                        transition-all duration-150 cursor-default"
                    >
                      <Icon className={`text-xs ${color}`} />
                      {name}
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Connect */}
            <FadeIn delay={0.15}>
              <div>
                <h3 className="text-white text-xs font-semibold uppercase tracking-[4px] mb-6">
                  Connect
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {socials.map(({ icon: Icon, href, label, color }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-[11px] font-medium
                        bg-white/[0.03] border border-white/[0.07] text-gray-500
                        transition-all duration-200 ${color}`}
                    >
                      <Icon className="text-sm shrink-0" />
                      {label}
                    </motion.a>
                  ))}
                </div>

                {/* Email direct */}
                <div className="mt-3 px-3 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <p className="text-[10px] text-gray-700 uppercase tracking-widest mb-0.5">Email</p>
                  <p className="text-gray-400 text-xs truncate">soumyaranjan8428@gmail.com</p>
                </div>
              </div>
            </FadeIn>

          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent my-12" />

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-700 text-xs text-center sm:text-left">
              © 2026 Soumya Ranjan Swain · Crafted with ❤️ using Next.js &amp; Tailwind CSS
            </p>
            <div className="flex items-center gap-3 text-gray-700 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-purple-500/60" />
                Designed &amp; Built by Soumya
              </span>
              <span className="text-gray-800">·</span>
              <span className="text-gray-700">v2.0</span>
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
      </footer>

      {/* ── Scroll-to-top FAB + progress ring ── */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 10 }}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full
              bg-[#0a0a18] border border-purple-500/30
              flex items-center justify-center
              shadow-[0_0_20px_rgba(168,85,247,0.3)]"
            aria-label="Scroll to top"
          >
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(168,85,247,0.12)" strokeWidth="2" />
              <circle
                cx="24" cy="24" r="20" fill="none"
                stroke="url(#ring)" strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 20}`}
                strokeDashoffset={`${2 * Math.PI * 20 * (1 - scrollPct / 100)}`}
                style={{ transition: "stroke-dashoffset 0.15s ease" }}
              />
              <defs>
                <linearGradient id="ring" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
            </svg>
            <FaArrowUp className="text-white text-[11px] relative z-10" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}