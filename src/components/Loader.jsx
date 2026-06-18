"use client";

import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#050816] flex items-center justify-center overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute w-[400px] h-[400px] bg-purple-600/20 blur-[160px] rounded-full" />

      <div className="relative z-10 text-center">
        
        {/* Logo */}
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="
            text-8xl
            sm:text-9xl
            font-extrabold
            bg-gradient-to-r
            from-purple-500
            via-fuchsia-500
            to-cyan-400
            bg-clip-text
            text-transparent
          "
        >
          S
        </motion.h1>

        {/* Name */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-white text-3xl sm:text-4xl font-bold mt-4"
        >
          Soumya.
        </motion.h2>

        {/* Role */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-gray-400 mt-2"
        >
          Frontend Developer
        </motion.p>

        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
          className="
            inline-flex
            items-center
            gap-2
            mt-6
            px-4
            py-2
            rounded-full
            bg-green-500/10
            border
            border-green-500/20
          "
        >
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-green-400 text-sm">
            Available For Hire
          </span>
        </motion.div>

        {/* Loading Line */}
        <div className="w-56 h-[3px] bg-white/10 rounded-full mt-8 overflow-hidden mx-auto">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2 }}
            className="
              h-full
              bg-gradient-to-r
              from-purple-500
              via-fuchsia-500
              to-cyan-400
            "
          />
        </div>
      </div>
    </div>
  );
}