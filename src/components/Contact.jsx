"use client";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiSend, FiStar } from "react-icons/fi";
import { FaReact, FaNodeJs, FaWhatsapp } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss } from "react-icons/si";

// ── Data ──────────────────────────────────────────────────────────────────────
const contactInfo = [
  { icon: FiMail,   value: "soumyaranjan8428@gmail.com", copyable: true  },
  { icon: FiPhone,  value: "+91 934845 2227",             copyable: false },
  { icon: FiMapPin, value: "Bangalore, India",            copyable: false },
];

const floatingIcons = [
  { Icon: FaReact,      color: "text-cyan-400",  pos: "left-8 top-16",    dur: 4, rot: 5  },
  { Icon: SiNextdotjs,  color: "text-white",     pos: "right-8 top-32",   dur: 5, rot: -5 },
  { Icon: FaNodeJs,     color: "text-green-400", pos: "left-16 bottom-16",dur: 6, rot: 5  },
  { Icon: SiTailwindcss,color: "text-sky-400",   pos: "right-16 bottom-16",dur:7, rot: -5 },
];

const reviews = [
  { name: "Rahul M.",   rating: 5, text: "Outstanding work, delivered ahead of schedule!" },
  { name: "Priya S.",   rating: 5, text: "Clean code, great communication throughout."    },
  { name: "Alex K.",    rating: 5, text: "Best developer I've worked with. Highly recommend!" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, x = 0, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, x, y: x === 0 ? 24 : 0 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <FiStar
          key={s}
          className={`text-xs ${s <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`}
          style={{ fill: s <= rating ? "currentColor" : "none" }}
        />
      ))}
    </div>
  );
}

function InputField({
  type = "text",
  placeholder,
  rows,
  name,
  value,
  onChange,
}) {
  const base = `
    w-full
    bg-[#0d0d1a]
    border border-white/[0.08]
    rounded-xl
    px-4 py-3
    text-sm
    text-white
    placeholder-gray-600
    outline-none
    focus:border-purple-500/60
    focus:bg-[#111827]
    transition-all duration-200
  `;

  return rows ? (
    <textarea
      rows={rows}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${base} resize-none`}
    />
  ) : (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={base}
    />
  );
}

// ── Interactive Star Rating widget ───────────────────────────────────────────
function StarRatingInput({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map((s) => (
        <motion.button
          key={s}
          type="button"
          whileHover={{ scale: 1.25 }}
          whileTap={{ scale: 0.9 }}
          onMouseEnter={() => setHovered(s)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(s)}
          className="focus:outline-none"
        >
          <FiStar
            className={`text-xl transition-colors duration-150
              ${s <= (hovered || value) ? "text-yellow-400" : "text-gray-600"}`}
            style={{ fill: s <= (hovered || value) ? "currentColor" : "none" }}
          />
        </motion.button>
      ))}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Contact() {
  const [copied, setCopied]   = useState(false);
  const [success, setSuccess] = useState(false);
  const [rating, setRating]   = useState(0);
  const [ratingDone, setRatingDone] = useState(false);
  const [loading, setLoading] = useState(false);

const [formData, setFormData] = useState({
  name: "",
  email: "",
  subject: "",
  message: "",
});

  const handleCopy = (val) => {
    navigator.clipboard.writeText(val);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = () => {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3500);
  };

  const handleRatingSubmit = () => {
    if (rating > 0) setRatingDone(true);
  };
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const sendEmail = async () => {
  setLoading(true);

  try {
    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    );

    setSuccess(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    setTimeout(() => {
      setSuccess(false);
    }, 3000);

  } catch (error) {
    console.error(error);
    alert("Failed to send message");
  }

  setLoading(false);
};
  return (
    <section
      id="contact"
      className="relative bg-[#050816] text-white py-16 lg:py-20 overflow-hidden"
    >
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-700/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-cyan-700/8 blur-[100px] rounded-full" />
      </div>

      {/* Floating tech icons */}
      {floatingIcons.map(({ Icon, color, pos, dur, rot }) => (
        <motion.div
          key={pos}
          animate={{ y: [0, -14, 0], rotate: [0, rot, 0] }}
          transition={{ duration: dur, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute ${pos} hidden lg:block pointer-events-none`}
        >
          <Icon className={`${color} text-5xl opacity-[0.12]`} />
        </motion.div>
      ))}

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <FadeIn className="text-center mb-14">
          <p className="inline-flex items-center gap-2 text-purple-400 uppercase tracking-[5px] text-[11px] font-semibold mb-4">
            <span className="w-6 h-px bg-purple-400/60" />
            Get In Touch
            <span className="w-6 h-px bg-purple-400/60" />
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Let&apos;s{" "}
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              Work Together
            </span>
          </h2>
          <p className="text-gray-500 max-w-md mx-auto mt-4 text-sm sm:text-base leading-7">
            Have a project in mind or want to discuss opportunities? Reach out anytime.
          </p>
        </FadeIn>

        {/* Main grid */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">

          {/* ── Left panel ── */}
          <FadeIn x={-28} delay={0.1}>
            <div className="rounded-3xl border border-white/[0.08] bg-[#0a0a18] p-6 sm:p-8 h-full">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/40 to-transparent mb-8" />

              {/* Available badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                bg-emerald-500/10 border border-emerald-500/20 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-xs font-semibold">Available For Hire</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Contact Info</h3>
              <p className="text-gray-500 text-sm leading-6 mb-7">
                Feel free to reach out through any of the channels below.
              </p>

              {/* Contact info rows */}
              <div className="space-y-4 mb-8">
                {contactInfo.map(({ icon: Icon, value, copyable }) => (
                  <div key={value} className="flex items-center gap-3 p-3 rounded-xl
                    bg-white/[0.03] border border-white/[0.06]">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20
                      flex items-center justify-center shrink-0">
                      <Icon className="text-purple-400 text-sm" />
                    </div>
                    <span className="text-gray-300 text-sm flex-1 truncate">{value}</span>
                    {copyable && (
                      <button
                        onClick={() => handleCopy(value)}
                        className="text-[10px] px-2 py-1 rounded-lg bg-purple-500/10
                          border border-purple-500/20 text-purple-400
                          hover:bg-purple-500/20 transition-colors duration-150 shrink-0"
                      >
                        {copied ? "✓ Copied" : "Copy"}
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3 mb-8">
                <motion.a
                  href="https://wa.me/919348452227"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold
                    bg-emerald-500/10 border border-emerald-500/20 text-emerald-400
                    hover:bg-emerald-500/20 transition-all duration-200"
                >
                  <FaWhatsapp className="text-base" /> WhatsApp
                </motion.a>
                <motion.a
                  href="/resume/Soumya_Ranjan_2026.pdf"
                  download
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold
                    bg-purple-500/10 border border-purple-500/20 text-purple-400
                    hover:bg-purple-500/20 transition-all duration-200"
                >
                  ↓ Resume
                </motion.a>
              </div>

              {/* ── Star Rating widget ── */}
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                <p className="text-xs text-gray-500 uppercase tracking-[3px] mb-3">Rate My Work</p>
                {!ratingDone ? (
                  <>
                    <StarRatingInput value={rating} onChange={setRating} />
                    <p className="text-xs text-gray-600 mt-2 mb-3">
                      {rating === 0 && "Tap a star to rate"}
                      {rating === 1 && "Needs improvement"}
                      {rating === 2 && "Below average"}
                      {rating === 3 && "Good work"}
                      {rating === 4 && "Great work!"}
                      {rating === 5 && "Excellent! ⭐"}
                    </p>
                    <motion.button
                      onClick={handleRatingSubmit}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      disabled={rating === 0}
                      className="px-4 py-2 rounded-xl text-xs font-semibold
                        bg-gradient-to-r from-purple-600 to-cyan-500 text-white
                        disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
                    >
                      Submit Rating
                    </motion.button>
                  </>
                ) : (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-yellow-400 text-lg">⭐</span>
                    <span className="text-sm text-gray-300 font-medium">Thanks for rating!</span>
                    <StarRating rating={rating} />
                  </motion.div>
                )}
              </div>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent mt-8" />
            </div>
          </FadeIn>

          {/* ── Right panel ── */}
          <div className="flex flex-col gap-6">

            {/* Review cards */}
            <FadeIn x={28} delay={0.1}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {reviews.map((r, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -3 }}
                    className="rounded-2xl border border-white/[0.06] bg-[#0a0a18] p-4"
                  >
                    <StarRating rating={r.rating} />
                    <p className="text-gray-400 text-xs leading-5 mt-2">&ldquo;{r.text}&rdquo;</p>
                    <p className="text-purple-400 text-[11px] font-semibold mt-2">— {r.name}</p>
                  </motion.div>
                ))}
              </div>
            </FadeIn>

            {/* Contact form */}
            <FadeIn x={28} delay={0.15}>
              <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0a0a18] p-6 sm:p-8">
                <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/40 to-transparent mb-8" />

                {/* Subtle inner glow */}
                <div className="absolute -top-12 right-8 w-40 h-40 bg-purple-500/10 blur-[60px] pointer-events-none" />

                <h3 className="text-lg sm:text-xl font-bold text-white mb-1">Send a Message</h3>
                <p className="text-gray-600 text-xs mb-6 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  Usually replies within 2–4 hours
                </p>

                <div className="relative z-10 space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                   <InputField
  placeholder="Your Name"
  name="name"
  value={formData.name}
  onChange={handleChange}
/>

<InputField
  type="email"
  placeholder="Your Email"
  name="email"
  value={formData.email}
  onChange={handleChange}
/>

<InputField
  placeholder="Subject"
  name="subject"
  value={formData.subject}
  onChange={handleChange}
/>

<InputField
  placeholder="Your Message"
  rows={4}
  name="message"
  value={formData.message}
  onChange={handleChange}
/>
</div>
                  <motion.button
                    type="button"
                    onClick={sendEmail}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-3 rounded-xl font-semibold text-sm text-white
                      bg-gradient-to-r from-purple-600 to-cyan-500
                      shadow-[0_0_30px_rgba(168,85,247,0.25)]
                      hover:shadow-[0_0_45px_rgba(168,85,247,0.45)]
                      flex items-center justify-center gap-2 transition-shadow duration-300"
                  >
                   <>
  {loading ? "Sending..." : "Send Message"}
  <FiSend />
</>
                  </motion.button>
                </div>

                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 flex items-center justify-center gap-2
                      text-emerald-400 text-sm font-medium"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/30
                      flex items-center justify-center text-xs">✓</span>
                    Message sent successfully!
                  </motion.div>
                )}

                <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent mt-8" />
              </div>
            </FadeIn>

          </div>
        </div>
      </div>
    </section>
  );
}