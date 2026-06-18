"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload, FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { useTheme } from "./ThemeContext";

const NAV_LINKS = ["home", "about", "skills", "experience", "projects", "contact"];

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [active,     setActive]     = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);

  // Scroll shadow
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Active section tracker
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { threshold: 0.25, rootMargin: "-80px 0px -80px 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, []);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const fn = () => window.innerWidth >= 1024 && setMobileOpen(false);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const headerBg = scrolled
    ? isDark
      ? "bg-[#050816]/90 backdrop-blur-xl border-b border-white/8 shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
      : "bg-white/90 backdrop-blur-xl border-b border-black/8 shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
    : "bg-transparent border-b border-transparent";

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${headerBg}`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <a href="#home" onClick={() => setActive("home")}
          className="flex items-center gap-2 shrink-0 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500
            flex items-center justify-center
            shadow-[0_0_14px_rgba(168,85,247,0.4)]
            group-hover:shadow-[0_0_22px_rgba(168,85,247,0.65)]
            transition-shadow duration-300">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className={`font-bold text-lg transition-colors duration-200
            ${isDark ? "text-white group-hover:text-purple-400" : "text-gray-900 group-hover:text-purple-600"}`}>
            Soumya<span className="text-purple-400">.</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8 text-sm">
          {NAV_LINKS.map((item) => (
            <a key={item} href={`#${item}`} onClick={() => setActive(item)}
              className={`relative capitalize font-medium transition-colors duration-200
                ${active === item
                  ? "text-purple-400"
                  : isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"}`}>
              {item}
              {active === item && (
                <motion.span
                  layoutId="nav-underline"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="absolute left-0 -bottom-1 h-[2px] w-full rounded-full
                    bg-gradient-to-r from-purple-500 to-cyan-400
                    shadow-[0_0_8px_rgba(168,85,247,0.7)]"
                />
              )}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">

         
        {/* Resume */}
<motion.a
  href="/resume/Soumya_Ranjan_2026.pdf"
  download
  whileHover={{ scale: 1.04 }}
  whileTap={{ scale: 0.96 }}
  className={`hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full
    text-sm font-semibold border transition-all duration-300
    hover:-translate-y-0.5
    ${isDark
      ? "bg-white/5 border-purple-500/30 text-white hover:border-purple-400 hover:shadow-[0_0_28px_rgba(168,85,247,0.6)]"
      : "bg-purple-50 border-purple-300 text-purple-700 hover:border-purple-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"}`}
>
  <FiDownload className={`text-sm ${isDark ? "text-purple-400" : "text-purple-600"}`} />
  <span className="hidden lg:inline">Resume</span>
</motion.a>

          {/* Theme toggle */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Toggle theme"
            className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm border
              transition-all duration-200
              ${isDark
                ? "bg-white/5 border-white/10 text-yellow-400 hover:bg-white/10"
                : "bg-black/5 border-black/10 text-gray-600 hover:bg-black/10"}`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isDark ? "sun" : "moon"}
                initial={{ rotate: -30, opacity: 0, scale: 0.7 }}
                animate={{ rotate: 0,   opacity: 1, scale: 1   }}
                exit={{    rotate:  30, opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.18 }}
              >
                {isDark ? <FiSun /> : <FiMoon />}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          {/* Hamburger */}
          <motion.button
            onClick={() => setMobileOpen((v) => !v)}
            whileTap={{ scale: 0.92 }}
            aria-label="Toggle menu"
            className={`lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-sm border
              transition-all duration-200
              ${isDark
                ? "bg-white/5 border-white/10 text-white hover:bg-white/10"
                : "bg-black/5 border-black/10 text-gray-800 hover:bg-black/10"}`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileOpen ? "x" : "menu"}
                initial={{ rotate: -20, opacity: 0 }}
                animate={{ rotate: 0,   opacity: 1 }}
                exit={{    rotate:  20, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {mobileOpen ? <FiX size={18} /> : <FiMenu size={18} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1,  y:  0 }}
            exit={{    opacity: 0,  y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`lg:hidden border-t
              ${isDark
                ? "bg-[#050816]/98 backdrop-blur-xl border-white/8"
                : "bg-white/98 backdrop-blur-xl border-black/8"}`}
          >
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1,  x:   0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => { setActive(item); setMobileOpen(false); }}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl capitalize text-sm font-medium
                    transition-all duration-150
                    ${active === item
                      ? isDark
                        ? "text-purple-400 bg-purple-500/10 border border-purple-500/20"
                        : "text-purple-600 bg-purple-50 border border-purple-200"
                      : isDark
                        ? "text-gray-400 hover:text-white hover:bg-white/5"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}
                >
                  {active === item && (
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                  )}
                  {item}
                </motion.a>
              ))}

              {/* Resume in mobile */}
              <motion.a
                href="/resume/Soumya_Ranjan_2026.pdf"
                download
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1,  x:   0 }}
                transition={{ delay: NAV_LINKS.length * 0.04 }}
                className="flex items-center gap-2 px-3 py-3 mt-1 rounded-xl
                  text-sm font-semibold text-white
                  bg-gradient-to-r from-purple-600 to-cyan-500
                  shadow-[0_0_18px_rgba(168,85,247,0.2)]"
              >
                <FiDownload /> Download Resume
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}