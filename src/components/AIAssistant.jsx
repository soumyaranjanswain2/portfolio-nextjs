"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMic, FiMicOff, FiX, FiSend } from "react-icons/fi";
import { BsRobot } from "react-icons/bs";

// ── Knowledge base ─────────────────────────────────────────────────────────
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
  experience: "I have 3+ years of experience building full-stack web applications with the MERN stack.",
  projects:   "I have built PropertyOTP, an E-Commerce platform, a Banking dashboard, and this Portfolio.",
  contact:    "You can reach me at soumyaranjan8428@gmail.com or via WhatsApp at +91 934845 2227.",
  github:     "Opening GitHub profile now!",
  linkedin:   "Opening LinkedIn profile now!",
  resume:     "Downloading resume now!",
  theme:      "Switching the theme for you!",
  hello:      "Hey there! 👋 Great to meet you. Ask me anything about Soumya's skills, projects, or experience!",
  unknown:    "I didn't catch that. Try asking about skills, projects, experience, or say 'go to contact'.",
};

// ── Time-based greeting ───────────────────────────────────────────────────
function getGreeting() {
  const h = new Date().getHours();
  if (h >= 5  && h < 12) return { greeting: "Good Morning",   emoji: "🌅" };
  if (h >= 12 && h < 17) return { greeting: "Good Afternoon", emoji: "☀️" };
  if (h >= 17 && h < 21) return { greeting: "Good Evening",   emoji: "🌇" };
  return                         { greeting: "Good Night",     emoji: "🌙" };
}

function getTimeLabel() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function buildInitialMessages() {
  const { greeting, emoji } = getGreeting();
  const t = getTimeLabel();
  return [
    { role: "ai", text: `${greeting}! ${emoji}`, id: 0, isNew: true, time: t },
    { role: "ai", text: "Hi, I'm Soumya's AI assistant.", id: 1, isNew: true, time: t },
    { role: "ai", text: "Ask me about skills, projects, experience — or say 'go to contact'.", id: 2, isNew: true, time: t },
  ];
}

// ── Typing bubble ──────────────────────────────────────────────────────────
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
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, ++i));
      if (i >= text.length) { clearInterval(interval); setDone(true); onDone?.(); }
    }, 20);
    return () => clearInterval(interval);
  }, [started, text, onDone]);

  if (!started) return <span className="opacity-0">.</span>;
  return (
    <span>
      {displayed}
      {!done && (
        <span className="inline-block w-[2px] h-3 bg-purple-400 ml-0.5 animate-pulse rounded-full" />
      )}
    </span>
  );
}

// ── Thinking dots ──────────────────────────────────────────────────────────
function ThinkingDots() {
  return (
    <div className="flex items-center gap-1 px-3 py-2.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-purple-400"
          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// ── Waveform (mic active) ──────────────────────────────────────────────────
function Waveform() {
  return (
    <div className="flex items-center gap-[3px] h-4">
      {[0.6, 1, 0.7, 1, 0.5].map((h, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-red-400"
          animate={{ scaleY: [h, 1, h * 0.4, 1, h] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
          style={{ height: "100%", transformOrigin: "center" }}
        />
      ))}
    </div>
  );
}

// ── Message bubble ─────────────────────────────────────────────────────────
function Bubble({ role, text, isNew, typingDelay = 0, onTypingDone, time }) {
  const isAI = role === "ai";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className={`flex gap-2 ${isAI ? "items-end" : "items-end flex-row-reverse"}`}
    >
      {isAI && (
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500
          flex items-center justify-center shrink-0 mb-0.5
          shadow-[0_0_10px_rgba(168,85,247,0.45)]">
          <BsRobot className="text-white text-[10px]" />
        </div>
      )}
      <div className="flex flex-col gap-0.5 max-w-[80%]" style={{ alignItems: isAI ? "flex-start" : "flex-end" }}>
        <div className={`px-3 py-2 rounded-2xl text-xs leading-5
          ${isAI
            ? "bg-white/[0.06] border border-white/[0.08] text-gray-200 rounded-bl-sm"
            : "bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-br-sm shadow-[0_0_16px_rgba(168,85,247,0.35)]"
          }`}>
          {isAI && isNew
            ? <TypingBubble text={text} delay={typingDelay} onDone={onTypingDone} />
            : text}
        </div>
        {time && (
          <span className="text-[9px] text-gray-700 px-1">{time}</span>
        )}
      </div>
    </motion.div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────
export default function AIAssistant() {
  const [open,       setOpen]      = useState(false);
  const [listening,  setListening] = useState(false);
  const [micStatus,  setMicStatus] = useState("idle");
  const [messages,   setMessages]  = useState(() => buildInitialMessages());
  const [thinking,   setThinking]  = useState(false);
  const [inputText,  setInputText] = useState("");
  const [unread,     setUnread]    = useState(3); // initial greeting msgs
  const [greeted,    setGreeted]   = useState(false);

  const msgEndRef     = useRef(null);
  const msgId         = useRef(10);
  const recognizerRef = useRef(null);
  const inputRef      = useRef(null);

  useEffect(() => {
    msgEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  // Clear unread when opened
  useEffect(() => {
    if (open) setUnread(0);
  }, [open]);

  // Auto-open on every page load, user can close manually
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
      setGreeted(true);
      setTimeout(() => {
        try {
          window.speechSynthesis.cancel();
          const { greeting } = getGreeting();
          const u = new SpeechSynthesisUtterance(
            `${greeting}! Hi, I'm Soumya's AI assistant. How can I help you today?`
          );
          u.lang = "en-US"; u.rate = 0.95; u.pitch = 1.05;
          window.speechSynthesis.speak(u);
        } catch (_) {}
      }, 600);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const speak = useCallback((text) => {
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US"; u.rate = 1; u.pitch = 1.05;
      window.speechSynthesis.speak(u);
    } catch (_) {}
  }, []);

  const addAIMessage = useCallback((text) => {
    const id = msgId.current++;
    setMessages((p) => [...p, { role: "ai", text, id, isNew: true, time: getTimeLabel() }]);
    if (!open) setUnread((n) => n + 1);
  }, [open]);

  const handleQuery = useCallback((raw) => {
    if (!raw?.trim()) return;
    const q = raw.toLowerCase().trim();
    // add user msg
    setMessages((p) => [...p, {
      role: "user", text: raw, id: msgId.current++, isNew: false, time: getTimeLabel()
    }]);

    // show thinking
    setThinking(true);
    const delay = 600 + Math.random() * 500;

    setTimeout(() => {
      setThinking(false);

      // greetings
      if (["hi","hello","hey","hii","hlo"].some((g) => q === g || q.startsWith(g + " "))) {
        addAIMessage(RESPONSES.hello); speak(RESPONSES.hello); return;
      }

      // nav
      const wantsNav = ["go to","open","show","navigate","take me"].some((t) => q.includes(t));
      if (wantsNav) {
        for (const [section, kws] of Object.entries(NAV_SECTIONS)) {
          if (kws.some((k) => q.includes(k))) {
            document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
            const r = `Navigating to ${section}!`;
            addAIMessage(r); speak(r); return;
          }
        }
      }
      for (const [section, kws] of Object.entries(NAV_SECTIONS)) {
        if (kws.some((k) => q === k)) {
          document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
          const r = `Navigating to ${section}!`;
          addAIMessage(r); speak(r); return;
        }
      }

      if (q.includes("resume") || q.includes("download") || q.includes("cv")) {
        const a = document.createElement("a");
        a.href = "/resume/Soumya_Ranjan_2026.pdf";
        a.download = "Soumya_Ranjan_2026.pdf";
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        addAIMessage(RESPONSES.resume); speak(RESPONSES.resume); return;
      }
      if (q.includes("github")) {
        window.open("https://github.com/soumyaranjanswain2", "_blank");
        addAIMessage(RESPONSES.github); speak(RESPONSES.github); return;
      }
      if (q.includes("linkedin")) {
        window.open("https://www.linkedin.com/in/soumya1234/", "_blank");
        addAIMessage(RESPONSES.linkedin); speak(RESPONSES.linkedin); return;
      }
      if (q.includes("theme") || q.includes("dark mode") || q.includes("light mode")) {
        document.documentElement.classList.toggle("dark");
        addAIMessage(RESPONSES.theme); speak(RESPONSES.theme); return;
      }

      const knowledgeMap = [
        ["about",      ["about", "who are you", "introduce", "yourself", "soumya"]],
        ["skills",     ["skills", "technologies", "tech", "know", "stack", "react", "next"]],
        ["experience", ["experience", "work", "years", "job", "career"]],
        ["projects",   ["projects", "portfolio", "built", "made", "propert"]],
        ["contact",    ["contact", "reach", "email", "phone", "whatsapp"]],
      ];
      for (const [key, kws] of knowledgeMap) {
        if (kws.some((k) => q.includes(k))) {
          addAIMessage(RESPONSES[key]); speak(RESPONSES[key]); return;
        }
      }
      addAIMessage(RESPONSES.unknown); speak(RESPONSES.unknown);
    }, delay);
  }, [addAIMessage, speak]);

  const handleSend = () => {
    const t = inputText.trim();
    if (!t) return;
    setInputText("");
    handleQuery(t);
    inputRef.current?.focus();
  };

  // ── Mic ──
  const startListening = useCallback(async () => {
    if (listening) return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { addAIMessage("Speech recognition not supported. Use Google Chrome."); return; }

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
      addAIMessage(err.name === "NotAllowedError"
        ? "Microphone blocked — click the lock icon in your browser and allow access."
        : `Microphone error: ${err.message}`);
      return;
    }
    await new Promise((r) => setTimeout(r, 150));
    setMicStatus("listening"); setListening(true);

    const rec = new SR();
    rec.lang = "en-US"; rec.continuous = false;
    rec.interimResults = false; rec.maxAlternatives = 1;
    recognizerRef.current = rec;

    rec.onresult  = (e) => handleQuery(e.results[0][0].transcript);
    rec.onerror   = (e) => {
      setListening(false); setMicStatus("idle"); recognizerRef.current = null;
      const msgs = {
        "not-allowed":   "Microphone blocked. Allow access in browser settings.",
        "no-speech":     "No speech detected. Please speak clearly.",
        "audio-capture": "No microphone found.",
        "network":       "Network error. Check your connection.",
      };
      if (msgs[e.error]) addAIMessage(msgs[e.error]);
    };
    rec.onend = () => { setListening(false); setMicStatus("idle"); recognizerRef.current = null; };
    try { rec.start(); }
    catch (err) {
      setListening(false); setMicStatus("error"); recognizerRef.current = null;
      addAIMessage(`Could not start mic: ${err.message}. Try again.`);
    }
  }, [listening, addAIMessage, handleQuery]);

  useEffect(() => {
    return () => {
      if (recognizerRef.current) try { recognizerRef.current.abort(); } catch (_) {}
      window.speechSynthesis.cancel();
    };
  }, []);

  const GREETING_DELAYS = [0, 900, 1800];

  const suggestions = ["About me", "Skills", "Projects", "Experience", "Contact", "Download CV"];

  return (
    <>
      {/* ── Chat panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.93 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: 20, scale: 0.93 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-4 sm:right-6 z-50
              w-[calc(100vw-32px)] sm:w-[360px]
              rounded-3xl overflow-hidden
              border border-white/[0.08]
              shadow-[0_24px_80px_rgba(0,0,0,0.7),0_0_0_1px_rgba(168,85,247,0.10)]"
            style={{ background: "linear-gradient(160deg,#0e0e22 0%,#09091d 60%,#0b0b1f 100%)" }}
          >
            {/* Top accent */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />

            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.06]"
              style={{ background: "linear-gradient(90deg,rgba(109,40,217,0.12) 0%,rgba(6,182,212,0.04) 100%)" }}>
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500
                  flex items-center justify-center
                  shadow-[0_0_18px_rgba(168,85,247,0.55)]">
                  <BsRobot className="text-white text-[15px]" />
                </div>
                {/* Red live dot */}
                <span className="absolute -top-0.5 -right-0.5 flex">
                  <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500
                    border border-[#0e0e22] shadow-[0_0_6px_rgba(239,68,68,0.8)]" />
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-semibold tracking-wide">Soumya AI</p>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1.5">
                  {listening ? (
                    <><Waveform /> <span className="text-red-400">Listening…</span></>
                  ) : (
                    <><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online · always here</>
                  )}
                </p>
              </div>

              <button onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-xl bg-white/[0.05] border border-white/[0.08]
                  flex items-center justify-center text-gray-500
                  hover:text-white hover:bg-white/10 transition-all duration-150 shrink-0">
                <FiX size={13} />
              </button>
            </div>

            {/* Messages */}
            <div className="h-64 overflow-y-auto px-3.5 py-3.5 flex flex-col gap-3
              [&::-webkit-scrollbar]:w-1
              [&::-webkit-scrollbar-thumb]:rounded-full
              [&::-webkit-scrollbar-thumb]:bg-white/[0.08]">
              {messages.map((m, i) => (
                <Bubble
                  key={m.id}
                  role={m.role}
                  text={m.text}
                  isNew={m.isNew}
                  time={m.time}
                  typingDelay={m.isNew && i < 3 ? GREETING_DELAYS[i] ?? 0 : 0}
                  onTypingDone={() =>
                    setMessages((prev) =>
                      prev.map((msg) => msg.id === m.id ? { ...msg, isNew: false } : msg)
                    )
                  }
                />
              ))}

              {/* Thinking indicator */}
              <AnimatePresence>
                {thinking && (
                  <motion.div
                    key="thinking"
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="flex items-end gap-2"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500
                      flex items-center justify-center shrink-0
                      shadow-[0_0_10px_rgba(168,85,247,0.45)]">
                      <BsRobot className="text-white text-[10px]" />
                    </div>
                    <div className="bg-white/[0.06] border border-white/[0.08] rounded-2xl rounded-bl-sm">
                      <ThinkingDots />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={msgEndRef} />
            </div>

            {/* Quick chips */}
            <div className="px-3.5 pb-2.5 flex flex-wrap gap-1.5">
              {suggestions.map((s) => (
                <button key={s} onClick={() => handleQuery(s)}
                  className="px-2.5 py-1 rounded-full text-[10px] font-medium
                    bg-purple-500/[0.08] border border-purple-500/20 text-purple-300
                    hover:bg-purple-500/25 hover:border-purple-400/40
                    active:scale-95 transition-all duration-150">
                  {s}
                </button>
              ))}
            </div>

            {/* Input row */}
            <div className="px-3.5 pb-3.5 flex gap-2">
              <div className="flex-1 flex items-center gap-2 px-3.5 py-2.5
                rounded-2xl bg-white/[0.04] border border-white/[0.08]
                focus-within:border-purple-500/40 focus-within:bg-white/[0.06]
                transition-all duration-200">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type a message…"
                  className="flex-1 bg-transparent text-xs text-white placeholder-gray-600
                    outline-none min-w-0"
                />
                {/* Mic icon inline */}
                <button
                  onClick={startListening}
                  disabled={listening || micStatus === "waiting"}
                  className={`shrink-0 transition-colors duration-150
                    ${listening ? "text-red-400" : "text-gray-600 hover:text-purple-400"}`}
                >
                  {listening ? <FiMicOff size={13} /> : <FiMic size={13} />}
                </button>
              </div>

              {/* Send button */}
              <motion.button
                onClick={handleSend}
                whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.93 }}
                disabled={!inputText.trim()}
                className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0
                  bg-gradient-to-br from-purple-600 to-cyan-500 text-white
                  shadow-[0_0_16px_rgba(168,85,247,0.35)]
                  hover:shadow-[0_0_28px_rgba(168,85,247,0.55)]
                  disabled:opacity-30 disabled:cursor-not-allowed
                  transition-shadow duration-200"
              >
                <FiSend size={13} className="translate-x-px -translate-y-px" />
              </motion.button>
            </div>

            {/* Bottom accent */}
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FAB ── */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-50">
        {/* Rotating orbit ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-5px] rounded-full pointer-events-none"
          style={{
            background: "conic-gradient(from 0deg, transparent 60%, rgba(168,85,247,0.55) 80%, rgba(6,182,212,0.55) 95%, transparent 100%)",
            borderRadius: "50%",
          }}
        />
        {/* Outer halo */}
        <div className="absolute inset-[-5px] rounded-full bg-transparent
          border border-white/[0.06] pointer-events-none" />

        <motion.button
          onClick={() => setOpen((v) => !v)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          className="relative w-14 h-14 rounded-full
            bg-gradient-to-br from-purple-600 to-cyan-500 text-white
            flex items-center justify-center
            shadow-[0_0_28px_rgba(168,85,247,0.55)]
            hover:shadow-[0_0_50px_rgba(168,85,247,0.75)]
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

          {/* Listening ping ring */}
          {listening && (
            <span className="absolute inset-0 rounded-full border-2 border-red-400
              animate-ping opacity-50 pointer-events-none" />
          )}

          {/* RED notification dot — always visible when chat is closed & has unread */}
          <AnimatePresence>
            {!open && unread > 0 && (
              <motion.span
                key="badge"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1
                  rounded-full bg-red-500 border-2 border-[#050816]
                  flex items-center justify-center
                  shadow-[0_0_10px_rgba(239,68,68,0.7)]"
              >
                {/* Double-ping effect */}
                <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-60" />
                <span className="relative text-[9px] font-bold text-white leading-none">
                  {unread > 9 ? "9+" : unread}
                </span>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}