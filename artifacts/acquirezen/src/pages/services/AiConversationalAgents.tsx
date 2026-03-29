import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Clock,
  TrendingDown,
  UserX,
  Bot,
  Smartphone,
  Brain,
  Shield,
  Calendar,
  Globe,
  CheckCircle2,
  ChevronDown,
  BarChart3,
  Zap,
  Users,
  User,
} from "lucide-react";
import Navbar from "@/components/Navbar";

/* ─────────────────────────────────────────
   Utility: fade-in on scroll
───────────────────────────────────────── */
function FadeIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 30 : 0,
      x: direction === "left" ? -30 : direction === "right" ? 30 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };
  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Pipeline Steps
───────────────────────────────────────── */
const PIPELINE_STEPS = [
  {
    icon: Globe,
    label: "Visitor Lands",
    sublabel: "Site · Ad · Link",
    color: "purple",
    description: "A prospect arrives on your website, landing page, or clicks a link from any channel — at any hour.",
  },
  {
    icon: Zap,
    label: "AI Engages Instantly",
    sublabel: "< 1 second response",
    color: "violet",
    description: "The AI agent greets the visitor within 1 second — warm, natural, and perfectly on-brand.",
  },
  {
    icon: Brain,
    label: "Qualifies with Logic",
    sublabel: "Budget · Fit · Intent",
    color: "purple",
    description: "Smart qualification flow captures budget, timeline, and fit through natural conversation — no forms, no friction.",
  },
  {
    icon: Shield,
    label: "Handles Objections",
    sublabel: "Trained on your FAQs",
    color: "violet",
    description: "Every common objection — price, timing, competitor comparisons — handled using your approved messaging.",
  },
  {
    icon: Calendar,
    label: "Books the Meeting",
    sublabel: "Calendly · Cal.com",
    color: "purple",
    description: "Qualified leads get a booking link inline. They pick a slot and confirm — no human required.",
  },
];

const colorMap: Record<string, { text: string; bg: string; border: string; glow: string; hex: string }> = {
  purple: {
    text: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/30",
    glow: "shadow-[0_0_20px_rgba(192,132,252,0.3)]",
    hex: "#c084fc",
  },
  violet: {
    text: "text-violet-400",
    bg: "bg-violet-400/10",
    border: "border-violet-400/30",
    glow: "shadow-[0_0_20px_rgba(167,139,250,0.3)]",
    hex: "#a78bfa",
  },
};

function PipelineViz() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % PIPELINE_STEPS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <div ref={ref} className="w-full">
      {/* Desktop */}
      <div className="hidden lg:block">
        <div className="relative flex items-start justify-between">
          {PIPELINE_STEPS.map((step, i) => {
            const c = colorMap[step.color];
            const isActive = active === i;
            return (
              <div key={i} className="relative flex flex-col items-center flex-1">
                {i < PIPELINE_STEPS.length - 1 && (
                  <div className="absolute top-10 left-[60%] right-0 h-px z-0 overflow-hidden">
                    <div className="h-full bg-white/10 w-full" />
                    <motion.div
                      className="absolute inset-y-0 left-0 h-full"
                      style={{ backgroundColor: c.hex }}
                      initial={{ width: "0%" }}
                      animate={inView ? { width: active > i ? "100%" : active === i ? "50%" : "0%" } : { width: "0%" }}
                      transition={{ duration: 0.9, ease: "easeInOut" }}
                    />
                    {active === i && (
                      <motion.div
                        className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                        style={{ backgroundColor: c.hex }}
                        initial={{ left: "0%", opacity: 0 }}
                        animate={{ left: "100%", opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }}
                      />
                    )}
                  </div>
                )}
                <motion.button
                  onClick={() => setActive(i)}
                  className={`relative z-10 w-20 h-20 rounded-2xl border flex items-center justify-center transition-all cursor-pointer ${c.bg} ${c.border} ${isActive ? c.glow : ""}`}
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <step.icon className={`w-7 h-7 ${c.text}`} />
                </motion.button>
                <div className="mt-4 text-center px-1">
                  <div className={`text-sm font-semibold ${isActive ? c.text : "text-white/70"} transition-colors`}>{step.label}</div>
                  <div className="text-xs text-white/40 mt-0.5">{step.sublabel}</div>
                </div>
                <div className={`absolute -top-3 -left-1 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${isActive ? `${c.bg} ${c.text} border ${c.border}` : "bg-white/5 text-white/30 border border-white/10"} transition-all`}>
                  {i + 1}
                </div>
              </div>
            );
          })}
        </div>
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`mt-10 p-5 rounded-2xl border ${colorMap[PIPELINE_STEPS[active].color].bg} ${colorMap[PIPELINE_STEPS[active].color].border} ${colorMap[PIPELINE_STEPS[active].color].glow}`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-purple-400" />
            <span className={`font-semibold ${colorMap[PIPELINE_STEPS[active].color].text}`}>
              Step {active + 1}: {PIPELINE_STEPS[active].label}
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{PIPELINE_STEPS[active].description}</p>
        </motion.div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden space-y-4">
        {PIPELINE_STEPS.map((step, i) => {
          const c = colorMap[step.color];
          const isActive = active === i;
          return (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-full flex items-start gap-4 p-4 rounded-2xl border transition-all ${isActive ? `${c.bg} ${c.border} ${c.glow}` : "bg-white/[0.02] border-white/10"}`}
            >
              <div className={`w-12 h-12 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center flex-shrink-0`}>
                <step.icon className={`w-5 h-5 ${c.text}`} />
              </div>
              <div className="text-left">
                <div className={`font-semibold text-sm ${isActive ? c.text : "text-white/70"}`}>
                  <span className="text-white/30 mr-2">0{i + 1}</span>{step.label}
                </div>
                <div className="text-xs text-white/40 mt-0.5">{step.sublabel}</div>
                {isActive && <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{step.description}</p>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Live Chat Simulation
───────────────────────────────────────── */
type ChatMsg = {
  role: "ai" | "user";
  text: string;
  delay: number;
  typing?: number;
};

const CHAT_SCRIPT: ChatMsg[] = [
  { role: "ai",   text: "Hey there! 👋 I'm Zen, your AcquireZen assistant. What brings you in today?",                                                                           delay: 800,  typing: 900  },
  { role: "user", text: "I need more leads for my agency.",                                                                                                                      delay: 3000 },
  { role: "ai",   text: "Great — you're in the right place. Are you looking to generate leads for your own agency, or build a lead gen system for clients?",                      delay: 4200, typing: 1200 },
  { role: "user", text: "For my own agency. We do B2B SaaS.",                                                                                                                    delay: 7000 },
  { role: "ai",   text: "Perfect. What's your current monthly revenue range? This helps me point you to the right package.",                                                      delay: 8200, typing: 1000 },
  { role: "user", text: "Around $15k/month right now.",                                                                                                                          delay: 11200 },
  { role: "ai",   text: "Nice — you're at the ideal stage to scale. Based on your profile, our AI Lead Engine would add an estimated 20–40 qualified calls per month. Want to see a quick demo?", delay: 12400, typing: 1400 },
  { role: "user", text: "Yes, absolutely.",                                                                                                                                      delay: 16000 },
  { role: "ai",   text: "🎉 Great choice! Let me get you booked with our strategy team. Pick a time that works for you:",                                                         delay: 17000, typing: 800  },
  { role: "ai",   text: "📅 Book your free call →  cal.com/acquirezen/strategy",                                                                                                 delay: 18200, typing: 0    },
];

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-purple-400/70"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

function LiveChatSim() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [visibleMsgs, setVisibleMsgs] = useState<ChatMsg[]>([]);
  const [typing, setTyping] = useState(false);
  const [done, setDone] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const runSimulation = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setVisibleMsgs([]);
    setTyping(false);
    setDone(false);

    CHAT_SCRIPT.forEach((msg, i) => {
      if (msg.role === "ai" && msg.typing) {
        const t1 = setTimeout(() => setTyping(true), msg.delay);
        const t2 = setTimeout(() => {
          setTyping(false);
          setVisibleMsgs((prev) => [...prev, msg]);
        }, msg.delay + msg.typing);
        timeoutsRef.current.push(t1, t2);
      } else {
        const t = setTimeout(() => {
          setVisibleMsgs((prev) => [...prev, msg]);
          if (i === CHAT_SCRIPT.length - 1) setDone(true);
        }, msg.delay);
        timeoutsRef.current.push(t);
      }
    });
  };

  useEffect(() => {
    if (inView) runSimulation();
    return () => timeoutsRef.current.forEach(clearTimeout);
  }, [inView]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleMsgs, typing]);

  return (
    <div ref={ref} className="w-full max-w-lg mx-auto">
      {/* Phone frame */}
      <div className="relative rounded-[2.5rem] border-2 border-white/10 bg-[#0d0d14] overflow-hidden shadow-[0_0_80px_rgba(157,78,221,0.15)]">
        {/* Status bar */}
        <div className="flex items-center justify-between px-6 pt-4 pb-2 relative">
          <span className="text-white/30 text-xs">9:41 AM</span>
          <div className="w-20 h-5 rounded-full bg-black absolute top-0 left-1/2 -translate-x-1/2" />
          <div className="flex gap-1">
            {[1, 2, 3].map((i) => <div key={i} className="w-1 h-1 rounded-full bg-white/30" />)}
          </div>
        </div>

        {/* Chat header */}
        <div className="flex items-center gap-3 px-5 py-3 border-b border-white/5 bg-white/[0.02]">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-white text-sm font-semibold">Zen — AcquireZen AI</div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/35 text-xs">Online · Replies instantly</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="px-4 py-4 space-y-3 overflow-y-auto" style={{ height: 400 }}>
          <AnimatePresence>
            {visibleMsgs.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {msg.role === "ai" && (
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center flex-shrink-0 mb-1">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                )}
                {msg.role === "user" && (
                  <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 mb-1">
                    <User className="w-3 h-3 text-white/60" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "ai"
                      ? msg.text.startsWith("📅")
                        ? "bg-purple-400/10 border border-purple-400/40 text-purple-300 font-medium rounded-bl-sm"
                        : "bg-purple-500/15 border border-purple-500/20 text-white/80 rounded-bl-sm"
                      : "bg-white/8 border border-white/10 text-white/70 rounded-br-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}

            {typing && (
              <motion.div
                key="typing"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-end gap-2"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-3 h-3 text-white" />
                </div>
                <div className="bg-purple-500/15 border border-purple-500/20 rounded-2xl rounded-bl-sm">
                  <TypingDots />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input bar */}
        <div className="px-4 pb-6 pt-3 border-t border-white/5">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10">
            <span className="text-white/20 text-sm flex-1">Type a message…</span>
            <div className="w-7 h-7 rounded-full bg-purple-500/30 border border-purple-500/40 flex items-center justify-center">
              <ArrowRight className="w-3 h-3 text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {done && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mt-5">
          <button
            onClick={runSimulation}
            className="text-xs text-purple-400/70 hover:text-purple-400 transition-colors border border-purple-400/20 hover:border-purple-400/40 px-4 py-1.5 rounded-full"
          >
            ↺ Replay conversation
          </button>
        </motion.div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   Main Page
───────────────────────────────────────── */
export default function AiConversationalAgentsPage() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex flex-col justify-center pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(157,78,221,0.13),transparent)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_60%,rgba(0,240,255,0.05),transparent)] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(157,78,221,1) 1px,transparent 1px),linear-gradient(90deg,rgba(157,78,221,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors mb-12 group text-sm">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-400/10 border border-purple-400/20 text-purple-400 text-xs font-semibold uppercase tracking-widest mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                AI Conversational Agents
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-6xl md:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6"
              >
                Never Miss<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-500">
                  a Lead Again.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="text-xl text-white/55 max-w-lg leading-relaxed mb-12"
              >
                AI agents that respond instantly, qualify prospects, and book meetings automatically — 24 hours a day, 7 days a week, across every channel.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4 items-center"
              >
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-purple-500 text-white font-bold text-base hover:bg-purple-400 shadow-[0_0_40px_rgba(157,78,221,0.4)] transition-all hover:shadow-[0_0_60px_rgba(157,78,221,0.6)] hover:scale-105"
                >
                  Deploy Your AI Agent <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="#simulation"
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-white/10 text-white/60 text-base hover:text-white hover:border-white/30 transition-all"
                >
                  See it live <ChevronDown className="w-4 h-4" />
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-14 grid grid-cols-3 gap-6"
              >
                {[
                  { n: "< 1s", l: "Response time" },
                  { n: "+38%", l: "Avg conversion lift" },
                  { n: "24/7", l: "Always active" },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-1">{s.n}</div>
                    <div className="text-xs text-white/40">{s.l}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Hero chat preview (decorative, static) */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:block relative"
            >
              <div className="rounded-3xl border border-purple-400/15 bg-white/[0.02] overflow-hidden p-6 shadow-[0_0_80px_rgba(157,78,221,0.1)]">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 to-violet-400/5 pointer-events-none" />
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">Zen — AI Agent</div>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-white/35 text-xs">Online now</span>
                    </div>
                  </div>
                </div>
                {[
                  { role: "ai",   text: "Hey! 👋 I can help you book 20–40 extra calls per month. What's your business?" },
                  { role: "user", text: "B2B SaaS agency, around $15k/month." },
                  { role: "ai",   text: "Perfect fit. Want me to show you how? I can book a free strategy call right now." },
                  { role: "user", text: "Yes, let's do it." },
                  { role: "ai",   text: "🎉 Excellent! Here's your booking link: cal.com/acquirezen/strategy" },
                ].map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.2 }}
                    className={`flex mb-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${m.role === "ai" ? "bg-purple-500/15 border border-purple-500/20 text-white/75 rounded-bl-sm" : "bg-white/8 border border-white/10 text-white/60 rounded-br-sm"}`}>
                      {m.text}
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-3 -right-3 px-4 py-2 rounded-full bg-green-400/15 border border-green-400/30 text-green-400 text-xs font-semibold"
              >
                ● Responding now
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown className="w-5 h-5 text-white/20" />
        </motion.div>
      </section>

      {/* ── SECTION 1: THE PROBLEM ── */}
      <section className="py-28 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-widest text-red-400/80 mb-3">The Problem</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Slow responses are<br />costing you booked calls.
            </h2>
            <p className="text-white/45 text-lg max-w-xl mb-16">
              Studies show leads are 100x more likely to convert if you respond within 5 minutes. Most businesses respond in hours — or never at all.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Clock,
                title: "Slow Response Times Kill Deals",
                body: "The average business takes 47 hours to respond to a web lead. By then, the prospect has already signed with a competitor who answered in minutes.",
                stat: "47h",
                statLabel: "avg business response time",
              },
              {
                icon: TrendingDown,
                title: "Leads Go Cold in Minutes",
                body: "A prospect's intent to buy peaks the moment they reach out. Every minute without a response drops conversion probability by ~10%. After 30 minutes — the lead is effectively dead.",
                stat: "78%",
                statLabel: "of leads buy from the first responder",
              },
              {
                icon: UserX,
                title: "Teams Can't Reply 24/7",
                body: "Evenings, weekends, bank holidays — leads don't respect working hours. Without a 24/7 system, you hand warm prospects to competitors who are always available.",
                stat: "42%",
                statLabel: "of leads reach out outside business hours",
              },
            ].map((card, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <div className="relative h-full p-8 rounded-3xl border border-red-500/10 bg-red-500/[0.04] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent pointer-events-none" />
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
                    <card.icon className="w-5 h-5 text-red-400" />
                  </div>
                  <div className="text-4xl font-bold text-red-400 mb-1">{card.stat}</div>
                  <div className="text-xs text-white/30 mb-5">{card.statLabel}</div>
                  <h3 className="text-lg font-bold text-white mb-3">{card.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{card.body}</p>
                  <div className="absolute top-5 right-5 w-5 h-5 rounded-full bg-red-500/15 flex items-center justify-center">
                    <span className="text-red-400 text-xs font-bold">✕</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 2: OUR SYSTEM ── */}
      <section className="py-28 bg-white/[0.015] border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <FadeIn direction="left">
                <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">Our System</p>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  A custom AI agent<br />built for your business.
                </h2>
                <p className="text-white/50 text-lg leading-relaxed mb-10">
                  We don't hand you a generic chatbot. We build, train, and deploy a custom AI agent — trained on your offers, objections, tone of voice, and qualification criteria.
                </p>
              </FadeIn>

              <div className="space-y-5">
                {[
                  { icon: Brain,         label: "Trained on Your Business Data",   detail: "Fed your service pages, FAQs, case studies, objection scripts, and pricing — every response is on-brand and accurate.",                              color: "purple" },
                  { icon: Smartphone,    label: "Website · WhatsApp · SMS",         detail: "One agent, every channel. Embedded on your site, connected to WhatsApp Business and SMS — leads reach you however they prefer.",                    color: "violet" },
                  { icon: MessageCircle, label: "Natural, Human-Like Responses",    detail: "Not scripted bot menus. Real conversational AI that feels like chatting with your best salesperson.",                                                color: "purple" },
                  { icon: Shield,        label: "Objection Handling Built In",      detail: "Every common objection — price, timing, competitors — handled intelligently with your approved messaging.",                                          color: "violet" },
                  { icon: Calendar,      label: "Automatic Meeting Booking",        detail: "Qualified leads get a booking link inline. Unqualified leads are tagged and added to a nurture sequence. No humans needed.",                         color: "purple" },
                ].map((item, i) => {
                  const c = colorMap[item.color];
                  return (
                    <FadeIn key={i} delay={i * 0.08} direction="left">
                      <div className={`flex gap-4 p-5 rounded-2xl border ${c.border} ${c.bg}`}>
                        <div className={`w-10 h-10 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center flex-shrink-0`}>
                          <item.icon className={`w-4 h-4 ${c.text}`} />
                        </div>
                        <div>
                          <div className={`font-semibold text-sm ${c.text} mb-1`}>{item.label}</div>
                          <div className="text-xs text-white/45 leading-relaxed">{item.detail}</div>
                        </div>
                      </div>
                    </FadeIn>
                  );
                })}
              </div>
            </div>

            {/* Channels visual */}
            <FadeIn direction="right" delay={0.2}>
              <div className="relative rounded-3xl border border-purple-400/10 bg-white/[0.02] p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 to-transparent pointer-events-none rounded-3xl" />
                <div className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-6">Coverage across every channel</div>
                <div className="space-y-4">
                  {[
                    { channel: "Website Chat",      icon: Globe,          convRate: "34% CVR", color: "purple" },
                    { channel: "WhatsApp Business", icon: MessageCircle,  convRate: "41% CVR", color: "violet" },
                    { channel: "SMS Follow-up",     icon: Smartphone,     convRate: "29% CVR", color: "purple" },
                  ].map((ch, i) => {
                    const c = colorMap[ch.color];
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.2 }}
                        className={`flex items-center gap-4 p-4 rounded-2xl border ${c.border} ${c.bg}`}
                      >
                        <div className={`w-10 h-10 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center`}>
                          <ch.icon className={`w-4 h-4 ${c.text}`} />
                        </div>
                        <div className="flex-1">
                          <div className="text-white text-sm font-semibold">{ch.channel}</div>
                          <div className="text-white/35 text-xs">{ch.convRate}</div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                          <span className="text-green-400 text-xs">Active</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-6 pt-5 border-t border-white/5">
                  <div className="text-xs text-white/30 mb-3 font-semibold uppercase tracking-widest">Last 24h activity</div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    {[
                      { v: "87", l: "Conversations" },
                      { v: "31", l: "Qualified" },
                      { v: "14", l: "Calls Booked" },
                    ].map((s) => (
                      <div key={s.l} className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                        <div className="text-xl font-bold text-purple-400">{s.v}</div>
                        <div className="text-[11px] text-white/30">{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 px-4 py-2 rounded-full bg-green-400/15 border border-green-400/30 text-green-400 text-xs font-semibold"
                >
                  ● Running 24/7
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: HOW IT WORKS ── */}
      <section id="how-it-works" className="py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">How It Works</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              From visitor to booked call<br />in 5 automated steps.
            </h2>
            <p className="text-white/45 text-lg max-w-xl mx-auto">Every step happens in seconds. You wake up to a calendar full of qualified calls.</p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02]">
              <PipelineViz />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── SECTION 4: LIVE SIMULATION ── */}
      <section id="simulation" className="py-28 bg-white/[0.015] border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">Live Simulation</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Watch it qualify a lead<br />in real time.
            </h2>
            <p className="text-white/45 text-lg max-w-xl mx-auto">
              This is a real example of how your custom AI agent engages, qualifies, and books a prospect — zero humans involved.
            </p>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn delay={0.1}>
              <LiveChatSim />
            </FadeIn>

            <div className="space-y-5">
              <FadeIn direction="right" delay={0.2}>
                <h3 className="text-2xl font-bold text-white mb-4">What's happening behind the scenes</h3>
              </FadeIn>
              {[
                { step: "01", title: "Instant greeting",       body: "The agent fires within 1 second of page load — before the visitor can scroll or leave.",                                                      color: "purple" },
                { step: "02", title: "Intent detection",       body: "NLP identifies what the visitor wants and adapts the conversation flow — lead gen, automation, or general inquiry.",                          color: "violet" },
                { step: "03", title: "Qualification scoring",  body: "Budget, timeline, and business type are captured naturally through conversation — no forms, no friction.",                                      color: "purple" },
                { step: "04", title: "Objection resolution",   body: "If the prospect pushes back on price or timing, the agent uses your approved rebuttals — calmly and convincingly.",                           color: "violet" },
                { step: "05", title: "Booking + CRM sync",     body: "Qualified leads get a booking link inline. The conversation, contact info, and qualification score are instantly synced to your CRM.",        color: "purple" },
              ].map((item, i) => {
                const c = colorMap[item.color];
                return (
                  <FadeIn key={i} delay={0.25 + i * 0.08} direction="right">
                    <div className="flex gap-4">
                      <div className={`w-8 h-8 rounded-lg ${c.bg} border ${c.border} flex items-center justify-center flex-shrink-0 text-xs font-bold ${c.text} mt-0.5`}>
                        {item.step}
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm mb-1">{item.title}</div>
                        <div className="text-white/45 text-sm leading-relaxed">{item.body}</div>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: RESULTS ── */}
      <section className="py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">Results</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What clients experience<br />after deployment.
            </h2>
            <p className="text-white/45 text-lg max-w-xl mx-auto">
              Real outcomes from businesses that replaced manual follow-up with an always-on AI agent.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {[
              { icon: BarChart3, metric: "+38%", metricLabel: "Average conversion rate increase",  title: "Higher Conversion Rate",        body: "Instant, personalised responses convert more visitors into booked calls. Clients average a 38% lift within the first 30 days of deployment.",                                                      color: "purple" },
              { icon: Zap,       metric: "< 1s",  metricLabel: "Response time, any hour",          title: "Never Lose a Hot Lead",          body: "The agent responds before a human could unlock their phone. Every lead — at 2am Sunday or 9am Monday — gets an immediate, intelligent reply.",                                               color: "violet" },
              { icon: Users,     metric: "24/7",  metricLabel: "Active sales coverage",            title: "A Sales Team That Never Sleeps", body: "Your agent handles unlimited simultaneous conversations — no burnout, no sick days, no training. Your most consistent and scalable salesperson.",                                         color: "purple" },
            ].map((card, i) => {
              const c = colorMap[card.color];
              return (
                <FadeIn key={i} delay={i * 0.12}>
                  <div className={`relative h-full p-8 rounded-3xl border ${c.border} ${c.bg} overflow-hidden`}>
                    <div className={`w-12 h-12 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center mb-5`}>
                      <card.icon className={`w-5 h-5 ${c.text}`} />
                    </div>
                    <div className={`text-4xl font-bold ${c.text} mb-1`}>{card.metric}</div>
                    <div className="text-xs text-white/30 mb-5">{card.metricLabel}</div>
                    <h3 className="text-lg font-bold text-white mb-3">{card.title}</h3>
                    <p className="text-white/45 text-sm leading-relaxed">{card.body}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          {/* Testimonial */}
          <FadeIn delay={0.3}>
            <div className="p-8 rounded-3xl border border-purple-400/15 bg-purple-400/[0.04] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-400 to-transparent rounded-l-3xl" />
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <p className="text-white/70 text-lg leading-relaxed italic mb-4">
                    "We were missing leads every weekend and evening. Since deploying the AI agent, we haven't missed a single qualified lead. It booked 11 calls in the first week — without anyone on our team doing anything."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-400/20 border border-purple-400/30 flex items-center justify-center text-purple-400 font-bold text-sm">S</div>
                    <div>
                      <div className="text-white font-semibold text-sm">Sarah M.</div>
                      <div className="text-white/35 text-xs">CEO, Apex Digital Agency</div>
                    </div>
                  </div>
                </div>
                <div className="md:w-48 grid grid-cols-2 gap-3 text-center">
                  {[
                    { v: "11",   l: "Calls — week 1" },
                    { v: "0h",   l: "Team effort" },
                    { v: "+38%", l: "CVR lift" },
                    { v: "24/7", l: "Coverage" },
                  ].map((s) => (
                    <div key={s.l} className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="text-sm font-bold text-purple-400">{s.v}</div>
                      <div className="text-[10px] text-white/30">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── SECTION 6: CTA ── */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(157,78,221,0.12),transparent)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_20%_50%,rgba(0,240,255,0.05),transparent)] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(157,78,221,1) 1px,transparent 1px),linear-gradient(90deg,rgba(157,78,221,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }}
        />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-400/10 border border-purple-400/20 text-purple-400 text-xs font-semibold uppercase tracking-widest mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              Ready to go live?
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Deploy Your<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-500">
                AI Agent
              </span>
            </h2>
            <p className="text-white/50 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
              Book a free 30-minute call. We'll walk through your current lead flow, identify exactly where you're losing leads, and show you how the agent will fix it.
            </p>

            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full bg-purple-500 text-white font-bold text-lg hover:bg-purple-400 shadow-[0_0_50px_rgba(157,78,221,0.4)] transition-all hover:shadow-[0_0_80px_rgba(157,78,221,0.6)] hover:scale-105"
            >
              Book a Free Strategy Call <ArrowRight className="w-5 h-5" />
            </Link>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/30">
              {["Free strategy call", "Live in 5 days", "No commitment", "Works while you sleep"].map((t, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400/60" /> {t}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <footer className="py-6 border-t border-white/5 text-center text-white/20 text-sm">
        © 2024 AcquireZen. All rights reserved.
      </footer>
    </div>
  );
}
