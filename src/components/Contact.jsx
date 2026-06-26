"use client";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import { FaReact, FaNodeJs, FaWhatsapp } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss } from "react-icons/si";

// ── Data ─────────────────────────────────────────────────────────────────────
const contactInfo = [
  { icon: FiMail,   label: "Email",    value: "soumyaranjan8428@gmail.com", copyable: true  },
  { icon: FiPhone,  label: "Phone",    value: "+91 934845 2227",             copyable: false },
  { icon: FiMapPin, label: "Location", value: "Bangalore, India",            copyable: false },
];

const floatingIcons = [
  { Icon: FaReact,       color: "text-cyan-400",  pos: "left-6 top-20",     dur: 4, rot: 6  },
  { Icon: SiNextdotjs,   color: "text-white",     pos: "right-6 top-36",    dur: 5, rot: -6 },
  { Icon: FaNodeJs,      color: "text-green-400", pos: "left-14 bottom-20", dur: 6, rot: 6  },
  { Icon: SiTailwindcss, color: "text-sky-400",   pos: "right-14 bottom-20",dur: 7, rot: -6 },
];

// ── FadeIn wrapper ────────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, x = 0, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, x, y: x === 0 ? 22 : 0 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Floating-label input ──────────────────────────────────────────────────────
function FloatingField({ type = "text", label, rows, name, value, onChange }) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  const inputCls =
    "peer w-full bg-transparent pt-6 pb-2 px-0 text-sm text-white outline-none " +
    "border-b border-white/10 focus:border-purple-400 transition-colors duration-300 resize-none";

  return (
    <div className="relative">
      {rows ? (
        <textarea
          rows={rows} name={name} value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          className={inputCls}
        />
      ) : (
        <input
          type={type} name={name} value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          className={inputCls}
        />
      )}
      <span className={`absolute left-0 pointer-events-none font-medium transition-all duration-300 ${
        lifted ? "top-0 text-[10px] tracking-widest uppercase text-purple-400/80" : "top-5 text-sm text-gray-600"
      }`}>
        {label}
      </span>
      <span className={`absolute bottom-0 left-0 h-px bg-gradient-to-r from-purple-400 to-cyan-400
        transition-all duration-500 ${focused ? "w-full" : "w-0"}`} />
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function Contact() {
  const [copied,  setCopied]  = useState(false);
  const [success, setSuccess] = useState(false);
  const [error,   setError]   = useState("");   // ← shows exact error to user
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleCopy = (val) => {
    navigator.clipboard.writeText(val);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const sendEmail = async () => {
    // ── Client-side validation ──
    if (!formData.name.trim())    { setError("Please enter your name.");    return; }
    if (!formData.email.trim())   { setError("Please enter your email.");   return; }
    if (!formData.message.trim()) { setError("Please enter your message."); return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) { setError("Please enter a valid email address."); return; }

    setError("");
    setLoading(true);

    // ── Step 1: EmailJS (primary — always runs) ──
    try {
      const serviceId  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      // Guard: warn if env vars are missing
      if (!serviceId || !templateId || !publicKey) {
        throw new Error(
          "EmailJS env vars missing. Check NEXT_PUBLIC_EMAILJS_SERVICE_ID, " +
          "NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, NEXT_PUBLIC_EMAILJS_PUBLIC_KEY in .env.local"
        );
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,      // match your EmailJS template variables
          from_email: formData.email,
          message: formData.message,
          reply_to: formData.email,
        },
        publicKey
      );
    } catch (emailErr) {
      console.error("EmailJS error:", emailErr);
      setError(`Email failed: ${emailErr?.text || emailErr?.message || "Unknown error"}. Check console.`);
      setLoading(false);
      return;  // stop here — don't pretend success
    }

    // ── Step 2: MongoDB API (optional — don't block on failure) ──
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (!result.success) {
        // Log but don't show error — email already sent
        console.warn("MongoDB save failed:", result.message);
      }
    } catch (dbErr) {
      // Non-fatal — email already delivered
      console.warn("MongoDB API error:", dbErr.message);
    }

    // ── Success ──
    setSuccess(true);
    setFormData({ name: "", email: "", message: "" });
    setLoading(false);
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <section
      id="contact"
      className="relative bg-[#050816] text-white py-20 lg:py-28 overflow-hidden"
    >
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[-60px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-purple-700/[0.08] blur-[150px] rounded-full" />
        <div className="absolute bottom-[-40px] right-[-60px] w-[420px] h-[420px] bg-cyan-700/[0.06] blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-[-60px] w-[320px] h-[320px] bg-fuchsia-700/[0.05] blur-[100px] rounded-full" />
      </div>

      {/* Floating tech icons */}
      {floatingIcons.map(({ Icon, color, pos, dur, rot }) => (
        <motion.div
          key={pos}
          animate={{ y: [0, -16, 0], rotate: [0, rot, 0] }}
          transition={{ duration: dur, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute ${pos} hidden xl:block pointer-events-none`}
        >
          <Icon className={`${color} text-5xl opacity-[0.09]`} />
        </motion.div>
      ))}

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <FadeIn className="text-center mb-16">
          <p className="inline-flex items-center gap-2 text-purple-400 uppercase tracking-[5px] text-[11px] font-semibold mb-5">
            <span className="w-7 h-px bg-purple-400/40" />Get In Touch<span className="w-7 h-px bg-purple-400/40" />
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[52px] font-bold tracking-tight leading-tight">
            Let&apos;s{" "}
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-300 to-cyan-400 bg-clip-text text-transparent">
              Work Together
            </span>
          </h2>
          <p className="text-gray-500 max-w-sm mx-auto mt-4 text-sm leading-7">
            Have a project in mind? Reach out and let&apos;s build something great.
          </p>
        </FadeIn>

        {/* Grid */}
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-5 lg:gap-6 items-stretch">

          {/* LEFT panel */}
          <FadeIn x={-24} delay={0.1} className="flex flex-col">
            <div className="flex flex-col h-full rounded-3xl border border-white/[0.07] bg-[#0a0a1c] p-7 sm:p-8 gap-7">
              <div className="flex items-center gap-2 w-fit px-3.5 py-1.5 rounded-full bg-emerald-500/[0.08] border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-xs font-semibold tracking-wide">Available For Hire</span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-snug">
                  Let&apos;s Start a<br />
                  <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Conversation</span>
                </h3>
                <p className="text-gray-500 text-sm leading-6">
                  I&apos;m always open to discussing new projects, creative ideas, or opportunities.
                </p>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

              <div className="flex flex-col gap-3">
                {contactInfo.map(({ icon: Icon, label, value, copyable }) => (
                  <div key={value} className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.025] border border-white/[0.05]">
                    <div className="w-9 h-9 rounded-xl bg-purple-500/[0.08] border border-purple-500/20 flex items-center justify-center shrink-0">
                      <Icon className="text-purple-400 text-sm" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-0.5">{label}</p>
                      <p className="text-gray-300 text-sm truncate">{value}</p>
                    </div>
                    {copyable && (
                      <button onClick={() => handleCopy(value)}
                        className="shrink-0 text-[10px] px-2.5 py-1 rounded-lg bg-purple-500/[0.08] border border-purple-500/20 text-purple-400 hover:bg-purple-500/20 transition-colors duration-150">
                        {copied ? "✓" : "Copy"}
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

              <div className="flex flex-wrap gap-3 mt-auto">
                <motion.a href="https://wa.me/919348452227" target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-emerald-500/[0.08] border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-all duration-200">
                  <FaWhatsapp className="text-base" /> WhatsApp
                </motion.a>
                <motion.a href="/resume/Soumya_Ranjan_2026.pdf" download
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-purple-500/[0.08] border border-purple-500/20 text-purple-400 hover:bg-purple-500/20 transition-all duration-200">
                  ↓ Resume
                </motion.a>
              </div>
            </div>
          </FadeIn>

          {/* RIGHT: form panel */}
          <FadeIn x={24} delay={0.15} className="flex flex-col">
            <div className="relative flex flex-col h-full rounded-3xl overflow-hidden border border-white/[0.06]">

              {/* Background */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[#08081e]" />
                <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-purple-600/20 blur-[80px]" />
                <div className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full bg-cyan-500/10 blur-[70px]" />
                <div className="absolute inset-0 opacity-[0.025]"
                  style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
              </div>

              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent" />

              <div className="relative z-10 flex flex-col h-full p-7 sm:p-10 gap-8">

                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl sm:text-[26px] font-bold text-white tracking-tight mb-1">Send a Message</h3>
                    <p className="text-gray-600 text-xs flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      Usually replies within 2–4 hours
                    </p>
                  </div>
                  <div className="hidden sm:flex items-center justify-center w-11 h-11 rounded-2xl bg-purple-500/10 border border-purple-500/20 shrink-0">
                    <FiMail className="text-purple-400 text-lg" />
                  </div>
                </div>

                {/* Fields */}
                <div className="flex flex-col gap-8 flex-1">
                  <div className="grid sm:grid-cols-2 gap-8">
                    <FloatingField label="Your Name"      name="name"    value={formData.name}    onChange={handleChange} />
                    <FloatingField label="Email Address"  name="email"   value={formData.email}   onChange={handleChange} type="email" />
                  </div>
                  <FloatingField label="Your Message" name="message" value={formData.message} onChange={handleChange} rows={5} />
                </div>

                {/* Bottom */}
                <div className="flex flex-col gap-4 pt-2">
                  <p className="text-[11px] text-gray-700 leading-5">
                    Your details are kept private and never shared with third parties.
                  </p>

                  {/* Error banner */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        key="error"
                        initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="flex items-start gap-2.5 bg-red-500/[0.08] border border-red-500/25 rounded-2xl py-3 px-4"
                      >
                        <span className="text-red-400 text-sm mt-px shrink-0">⚠</span>
                        <span className="text-red-400 text-xs leading-5">{error}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Send button */}
                  <motion.button
                    type="button" onClick={sendEmail} disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.015 }}
                    whileTap={{ scale: loading ? 1 : 0.975 }}
                    className="relative w-full py-4 rounded-2xl font-semibold text-sm text-white overflow-hidden group disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-cyan-500 group-hover:opacity-90 transition-opacity duration-300" />
                    <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12" />
                    <span className="relative flex items-center justify-center gap-2.5">
                      {loading ? (
                        <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending…</>
                      ) : (
                        <>Send Message <FiSend className="text-base group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" /></>
                      )}
                    </span>
                  </motion.button>

                  {/* Success */}
                  <AnimatePresence>
                    {success && (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.97 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-center justify-center gap-3 bg-emerald-500/[0.08] border border-emerald-500/20 rounded-2xl py-3.5 px-4"
                      >
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs shrink-0">✓</span>
                        <span className="text-emerald-400 text-sm font-medium">Message sent! I&apos;ll get back to you soon.</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}