"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMic, FiMicOff, FiX } from "react-icons/fi";
import { BsRobot } from "react-icons/bs";

// ── Knowledge base ────────────────────────────────────────────────────────────
const NAV_SECTIONS = {
  home:       ["home"],
  about:      ["about"],
  skills:     ["skills", "tech"],
  experience: ["experience", "work"],
  projects:   ["projects", "portfolio"],
  contact:    ["contact"],
};

const RESPONSES = {
  about:      "Soumya Ranjan Swain is a Frontend Developer from Bangalore, India, specializing in React, Next.js and modern web experiences.",
  skills:     "My skills include React JS, Next.js, JavaScript, Tailwind CSS, Node.js, MongoDB, Express and JWT authentication.",
  experience: "I have 3 plus years of experience building full-stack web applications with the MERN stack.",
  projects:   "I have built PropertyOTP, an E-Commerce platform, a Banking dashboard, and this Portfolio.",
  contact:    "You can reach me at soumyaranjan8428@gmail.com or via WhatsApp.",
  github:     "Opening GitHub profile now!",
  linkedin:   "Opening LinkedIn profile now!",
  resume:     "Downloading resume now!",
  theme:      "Switching the theme for you!",
  unknown:    "I did not catch that. Try asking about skills, projects, or say go to contact.",
};

// ── Time-based greeting ───────────────────────────────────────────────────────
function getGreeting() {
  const h = new Date().getHours();
  if (h >= 5  && h < 12) return { greeting: "Good Morning",   emoji: "🌅" };
  if (h >= 12 && h < 17) return { greeting: "Good Afternoon", emoji: "☀️" };
  if (h >= 17 && h < 21) return { greeting: "Good Evening",   emoji: "🌇" };
  return                         { greeting: "Good Night",     emoji: "🌙" };
}

function buildInitialMessages() {
  const { greeting, emoji } = getGreeting();
  return [
    { role: "ai", text: `${greeting}! ${emoji}`, id: 0, isNew: true },
    { role: "ai", text: "Hi, I'm Soumya's AI assistant.", id: 1, isNew: true },
    { role: "ai", text: "How can I help you today?", id: 2, isNew: true },
    { role: "ai", text: "Tap the mic or pick a topic below 👇", id: 3, isNew: true },
  ];
}

// ── Typing bubble ─────────────────────────────────────────────────────────────
function TypingBubble({ text, delay = 0, onDone }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(delay === 0);

  useEffect(() => {
    if (delay > 0) {
      const t = setTimeout(() => setStarted(true), delay);
      return () => clearTimeout(t);
    }
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const t = setInterval(() => {
      setDisplayed(text.slice(0, ++i));
      if (i >= text.length) { clearInterval(t); setDone(true); onDone?.(); }
    }, 22);
    return () => clearInterval(t);
  }, [started, text, onDone]);

  if (!started) return <span className="opacity-0">.</span>;

  return (
    <span>
      {displayed}
      {!done && (
        <span className="inline-block w-[2px] h-3.5 bg-purple-400 ml-0.5 animate-pulse rounded-full" />
      )}
    </span>
  );
}

// ── Message bubble ────────────────────────────────────────────────────────────
function Bubble({ role, text, isNew, typingDelay = 0, onTypingDone }) {
  const isAI = role === "ai";
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex gap-2 ${isAI ? "items-start" : "items-start flex-row-reverse"}`}
    >
      {isAI && (
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500
          flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_8px_rgba(168,85,247,0.4)]">
          <BsRobot className="text-white text-[10px]" />
        </div>
      )}
      <div className={`max-w-[82%] px-3 py-2 rounded-2xl text-xs leading-5
        ${isAI
          ? "bg-white/[0.07] border border-white/[0.08] text-gray-200 rounded-tl-sm"
          : "bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-tr-sm"}`}>
        {isAI && isNew
          ? <TypingBubble text={text} delay={typingDelay} onDone={onTypingDone} />
          : text}
      </div>
    </motion.div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function AIAssistant() {
  const [open,      setOpen]      = useState(false);
  const [listening, setListening] = useState(false);
  const [micStatus, setMicStatus] = useState("idle");
  const [messages,  setMessages]  = useState(() => buildInitialMessages());
  const [greeted,   setGreeted]   = useState(false);

  const msgEndRef    = useRef(null);
  const msgId        = useRef(10);
  const recognizerRef= useRef(null);

  // Auto-scroll
  useEffect(() => {
    msgEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Open automatically after 2s on first visit, with a spoken greeting
  useEffect(() => {
    const alreadyGreeted = sessionStorage.getItem("ai_greeted");
    if (alreadyGreeted) {
      // Already greeted this session — just mark messages as not-new
      setMessages((prev) => prev.map((m) => ({ ...m, isNew: false })));
      setGreeted(true);
      return;
    }

    const timer = setTimeout(() => {
      setOpen(true);
      setGreeted(true);
      sessionStorage.setItem("ai_greeted", "1");

      // Speak the greeting after a short pause
      const { greeting, emoji } = getGreeting();
      setTimeout(() => {
        try {
          window.speechSynthesis.cancel();
          const u = new SpeechSynthesisUtterance(
            `${greeting}! Hi, I am Soumya's AI assistant. How can I help you today?`
          );
          u.lang = "en-US"; u.rate = 0.95; u.pitch = 1.05;
          window.speechSynthesis.speak(u);
        } catch (_) {}
      }, 600);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const addMsg = useCallback((role, text) => {
    const id = msgId.current++;
    setMessages((p) => [...p, { role, text, id, isNew: role === "ai", typingDelay: 0 }]);
  }, []);

  const speak = useCallback((text) => {
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US"; u.rate = 1; u.pitch = 1.05;
      window.speechSynthesis.speak(u);
    } catch (_) {}
  }, []);

  // ── Process query ──
  const handleQuery = useCallback((raw) => {
    if (!raw?.trim()) return;
    const q = raw.toLowerCase().trim();
    addMsg("user", raw);

    // Navigate with trigger words
    const wantsNav = ["go to","open","show","navigate","take me"].some((t) => q.includes(t));
    if (wantsNav) {
      for (const [section, kws] of Object.entries(NAV_SECTIONS)) {
        if (kws.some((k) => q.includes(k))) {
          document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
          const r = `Navigating to ${section}!`;
          addMsg("ai", r); speak(r); return;
        }
      }
    }

    // Direct section name
    for (const [section, kws] of Object.entries(NAV_SECTIONS)) {
      if (kws.some((k) => q === k)) {
        document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
        const r = `Navigating to ${section}!`;
        addMsg("ai", r); speak(r); return;
      }
    }

    if (q.includes("resume") || q.includes("download") || q.includes("cv")) {
      const a = document.createElement("a");
      a.href = "/resume/Soumya_Ranjan_2026.pdf";
      a.download = "Soumya_Ranjan_2026.pdf";
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      addMsg("ai", RESPONSES.resume); speak(RESPONSES.resume); return;
    }

    if (q.includes("github")) {
      window.open("https://github.com/soumyaranjanswain2", "_blank");
      addMsg("ai", RESPONSES.github); speak(RESPONSES.github); return;
    }

    if (q.includes("linkedin")) {
      window.open("https://www.linkedin.com/in/soumya1234/", "_blank");
      addMsg("ai", RESPONSES.linkedin); speak(RESPONSES.linkedin); return;
    }

    if (q.includes("theme") || q.includes("dark mode") || q.includes("light mode")) {
      document.documentElement.classList.toggle("dark");
      addMsg("ai", RESPONSES.theme); speak(RESPONSES.theme); return;
    }

    const knowledgeMap = [
      ["about",      ["about", "who are you", "introduce", "yourself"]],
      ["skills",     ["skills", "technologies", "tech", "know", "stack"]],
      ["experience", ["experience", "work", "years", "job", "career"]],
      ["projects",   ["projects", "portfolio", "built", "made"]],
      ["contact",    ["contact", "reach", "email", "phone", "whatsapp"]],
    ];
    for (const [key, kws] of knowledgeMap) {
      if (kws.some((k) => q.includes(k))) {
        addMsg("ai", RESPONSES[key]); speak(RESPONSES[key]); return;
      }
    }

    addMsg("ai", RESPONSES.unknown); speak(RESPONSES.unknown);
  }, [addMsg, speak]);

  // ── Mic ──
  const startListening = useCallback(async () => {
    if (listening) return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      addMsg("ai", "Speech recognition is not supported. Please use Google Chrome.");
      return;
    }

    if (recognizerRef.current) {
      try { recognizerRef.current.abort(); } catch (_) {}
      recognizerRef.current = null;
      await new Promise((r) => setTimeout(r, 200));
    }

    setMicStatus("waiting");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((t) => t.stop());
    } catch (err) {
      setMicStatus("error");
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        addMsg("ai", "Microphone blocked. Click the lock icon in your browser address bar and allow microphone access.");
      } else {
        addMsg("ai", `Microphone error: ${err.message}`);
      }
      return;
    }

    await new Promise((r) => setTimeout(r, 150));
    setMicStatus("listening");
    setListening(true);

    const recognition = new SR();
    recognition.lang            = "en-US";
    recognition.continuous      = false;
    recognition.interimResults  = false;
    recognition.maxAlternatives = 1;
    recognizerRef.current       = recognition;

    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      handleQuery(transcript);
    };

    recognition.onerror = (e) => {
      setListening(false);
      setMicStatus("idle");
      recognizerRef.current = null;
      const msgs = {
        "not-allowed":   "Microphone blocked. Allow access in browser settings.",
        "no-speech":     "No speech detected. Please speak clearly after tapping.",
        "audio-capture": "No microphone found. Please connect one.",
        "network":       "Network error. Check your connection.",
      };
      if (msgs[e.error]) addMsg("ai", msgs[e.error]);
    };

    recognition.onend = () => {
      setListening(false);
      setMicStatus("idle");
      recognizerRef.current = null;
    };

    try { recognition.start(); }
    catch (err) {
      setListening(false);
      setMicStatus("error");
      recognizerRef.current = null;
      addMsg("ai", `Could not start mic: ${err.message}. Try again.`);
    }
  }, [listening, addMsg, handleQuery]);

  useEffect(() => {
    return () => {
      if (recognizerRef.current) try { recognizerRef.current.abort(); } catch (_) {}
      window.speechSynthesis.cancel();
    };
  }, []);

  const statusLabel = {
    idle:      "Tap the mic to speak",
    waiting:   "Requesting mic permission...",
    listening: "Listening... speak now!",
    error:     "Mic error — tap to retry",
  }[micStatus];

  // Typing delays for initial greeting messages (staggered)
  const GREETING_DELAYS = [0, 800, 1600, 2400];

  return (
    <>
      {/* ── Chat panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed bottom-24 right-4 sm:right-6 z-50
              w-[calc(100vw-32px)] sm:w-[340px]
              rounded-2xl overflow-hidden
              bg-[#0a0a18] border border-white/[0.08]
              shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_0_1px_rgba(168,85,247,0.08)]"
          >
            {/* Header */}
            <div className="flex items-center gap-2.5 px-4 py-3 border-b border-white/[0.07]
              bg-gradient-to-r from-purple-600/15 to-cyan-500/5">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500
                  flex items-center justify-center shrink-0
                  shadow-[0_0_14px_rgba(168,85,247,0.5)]">
                  <BsRobot className="text-white text-sm" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full
                  bg-emerald-400 border-2 border-[#0a0a18]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-semibold">Soumya AI</p>
                <p className={`text-[10px] flex items-center gap-1 transition-colors duration-200
                  ${micStatus === "listening" ? "text-red-400"
                    : micStatus === "waiting" ? "text-yellow-400"
                    : micStatus === "error"   ? "text-red-500"
                    : "text-emerald-400"}`}>
                  <span className={`w-1 h-1 rounded-full
                    ${micStatus === "listening" ? "bg-red-400 animate-ping"
                      : micStatus === "waiting" ? "bg-yellow-400 animate-pulse"
                      : micStatus === "error"   ? "bg-red-500"
                      : "bg-emerald-400 animate-pulse"}`} />
                  {statusLabel}
                </p>
              </div>
              <button onClick={() => setOpen(false)}
                className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center
                  text-gray-500 hover:text-white transition-colors shrink-0">
                <FiX size={12} />
              </button>
            </div>

            {/* Messages */}
            <div className="h-60 overflow-y-auto px-3 py-3 flex flex-col gap-2.5
              [&::-webkit-scrollbar]:w-1
              [&::-webkit-scrollbar-thumb]:rounded-full
              [&::-webkit-scrollbar-thumb]:bg-white/10">
              {messages.map((m, i) => (
                <Bubble
                  key={m.id}
                  role={m.role}
                  text={m.text}
                  isNew={m.isNew}
                  typingDelay={m.isNew && i < 4 ? GREETING_DELAYS[i] ?? 0 : 0}
                  onTypingDone={() =>
                    setMessages((prev) =>
                      prev.map((msg) => msg.id === m.id ? { ...msg, isNew: false } : msg)
                    )
                  }
                />
              ))}
              <div ref={msgEndRef} />
            </div>

            {/* Quick suggestions */}
            <div className="px-3 pb-2 flex flex-wrap gap-1.5">
              {["About me", "My skills", "Projects", "Experience", "Contact", "Download resume"].map((s) => (
                <button key={s} onClick={() => handleQuery(s)}
                  className="px-2.5 py-1 rounded-full text-[10px] font-medium
                    bg-purple-500/10 border border-purple-500/20 text-purple-300
                    hover:bg-purple-500/20 transition-colors duration-150 cursor-pointer">
                  {s}
                </button>
              ))}
            </div>

            {/* Mic button */}
            <div className="px-3 pb-3">
              <motion.button
                onClick={startListening}
                disabled={listening || micStatus === "waiting"}
                whileHover={{ scale: (listening || micStatus === "waiting") ? 1 : 1.02 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full py-3 rounded-xl flex items-center justify-center gap-2
                  text-xs font-semibold transition-all duration-200 relative overflow-hidden
                  ${listening
                    ? "bg-red-500/15 border border-red-500/30 text-red-400 cursor-not-allowed"
                    : micStatus === "waiting"
                      ? "bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 cursor-wait"
                      : micStatus === "error"
                        ? "bg-red-500/10 border border-red-500/20 text-red-400 cursor-pointer"
                        : "bg-gradient-to-r from-purple-600 to-cyan-500 text-white cursor-pointer shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_35px_rgba(168,85,247,0.5)]"}`}
              >
                {listening && (
                  <span className="absolute inset-0 bg-red-500/10 animate-pulse rounded-xl" />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {listening
                    ? <><FiMicOff size={14} className="animate-pulse" /> Listening — speak now!</>
                    : micStatus === "waiting"
                      ? <><FiMic size={14} /> Requesting permission...</>
                      : <><FiMic size={14} /> Tap to speak</>}
                </span>
              </motion.button>
              <p className="text-center text-[10px] text-gray-700 mt-2">
                Works best in Google Chrome
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FAB ── */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-6 right-4 sm:right-6 z-50 w-14 h-14 rounded-full
          bg-gradient-to-br from-purple-600 to-cyan-500 text-white
          flex items-center justify-center
          shadow-[0_0_28px_rgba(168,85,247,0.5)]
          hover:shadow-[0_0_45px_rgba(168,85,247,0.7)]
          transition-shadow duration-300"
        aria-label="Open AI assistant"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "x" : "bot"}
            initial={{ rotate: -20, opacity: 0, scale: 0.7 }}
            animate={{ rotate: 0,   opacity: 1, scale: 1   }}
            exit={{    rotate:  20, opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.15 }}
          >
            {open ? <FiX size={22} /> : <BsRobot size={22} />}
          </motion.span>
        </AnimatePresence>

        {listening && (
          <span className="absolute inset-0 rounded-full border-2 border-purple-300
            animate-ping opacity-60 pointer-events-none" />
        )}

        {/* Notification dot when closed */}
        {!open && !greeted && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full
            bg-emerald-400 border-2 border-[#050816] animate-pulse" />
        )}
      </motion.button>
    </>
  );
}