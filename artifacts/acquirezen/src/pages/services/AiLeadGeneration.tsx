import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Database,
  Filter,
  Sparkles,
  Send,
  LayoutDashboard,
  Clock,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  BarChart3,
  Repeat2,
  Layers,
  ChevronDown,
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
   Animated Pipeline Visualization
───────────────────────────────────────── */
const PIPELINE_STEPS = [
  {
    icon: Database,
    label: "Data Scraping",
    sublabel: "LinkedIn · Apollo · Web",
    color: "cyan",
    description: "Automated scrapers pull verified prospect data from 20+ sources based on your ICP filters.",
  },
  {
    icon: Filter,
    label: "Data Cleaning",
    sublabel: "Dedup · Verify · Enrich",
    color: "blue",
    description: "Raw data is deduplicated, email-verified, and enriched with firmographic and intent signals.",
  },
  {
    icon: Sparkles,
    label: "AI Personalization",
    sublabel: "GPT-4 · Custom prompts",
    color: "purple",
    description: "Our AI engine writes a unique, research-backed opening line for every single prospect.",
  },
  {
    icon: Send,
    label: "Outreach Automation",
    sublabel: "Email · LinkedIn · SMS",
    color: "violet",
    description: "Sequences deploy across channels with smart timing, reply detection, and auto-pausing.",
  },
  {
    icon: LayoutDashboard,
    label: "CRM Update",
    sublabel: "HubSpot · Pipedrive · GHL",
    color: "cyan",
    description: "Every reply, click, and booking is logged automatically — your pipeline stays up to date.",
  },
];

const colorMap: Record<string, { text: string; bg: string; border: string; glow: string; connector: string }> = {
  cyan: {
    text: "text-cyan-400",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/30",
    glow: "shadow-[0_0_20px_rgba(34,211,238,0.3)]",
    connector: "#22d3ee",
  },
  blue: {
    text: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/30",
    glow: "shadow-[0_0_20px_rgba(96,165,250,0.3)]",
    connector: "#60a5fa",
  },
  purple: {
    text: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/30",
    glow: "shadow-[0_0_20px_rgba(192,132,252,0.3)]",
    connector: "#c084fc",
  },
  violet: {
    text: "text-violet-400",
    bg: "bg-violet-400/10",
    border: "border-violet-400/30",
    glow: "shadow-[0_0_20px_rgba(167,139,250,0.3)]",
    connector: "#a78bfa",
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
    }, 1800);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <div ref={ref} className="w-full">
      {/* Desktop: horizontal pipeline */}
      <div className="hidden lg:block">
        <div className="relative flex items-start justify-between gap-0">
          {PIPELINE_STEPS.map((step, i) => {
            const c = colorMap[step.color];
            const isActive = active === i;
            return (
              <div key={i} className="relative flex flex-col items-center flex-1">
                {/* Connector line between steps */}
                {i < PIPELINE_STEPS.length - 1 && (
                  <div className="absolute top-10 left-[60%] right-0 h-px z-0 overflow-hidden">
                    <div className="h-full bg-white/10 w-full" />
                    <motion.div
                      className="absolute inset-y-0 left-0 h-full"
                      style={{ backgroundColor: colorMap[PIPELINE_STEPS[i].color].connector }}
                      initial={{ width: "0%" }}
                      animate={inView ? { width: active > i ? "100%" : active === i ? "50%" : "0%" } : { width: "0%" }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                    {/* Traveling dot */}
                    {active === i && (
                      <motion.div
                        className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                        style={{ backgroundColor: c.connector }}
                        initial={{ left: "0%", opacity: 0 }}
                        animate={{ left: "100%", opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
                      />
                    )}
                  </div>
                )}

                {/* Step node */}
                <motion.button
                  onClick={() => setActive(i)}
                  className={`relative z-10 w-20 h-20 rounded-2xl border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${c.bg} ${c.border} ${isActive ? c.glow : ""}`}
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <step.icon className={`w-7 h-7 ${c.text}`} />
                </motion.button>

                {/* Step label */}
                <div className="mt-4 text-center px-1">
                  <div className={`text-sm font-semibold ${isActive ? c.text : "text-white/70"} transition-colors`}>
                    {step.label}
                  </div>
                  <div className="text-xs text-white/40 mt-0.5">{step.sublabel}</div>
                </div>

                {/* Step number */}
                <div className={`absolute -top-3 -left-1 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${isActive ? `${c.bg} ${c.text} border ${c.border}` : "bg-white/5 text-white/30 border border-white/10"} transition-all`}>
                  {i + 1}
                </div>
              </div>
            );
          })}
        </div>

        {/* Active step detail card */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`mt-10 p-5 rounded-2xl border ${colorMap[PIPELINE_STEPS[active].color].bg} ${colorMap[PIPELINE_STEPS[active].color].border} ${colorMap[PIPELINE_STEPS[active].color].glow}`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-2 h-2 rounded-full ${colorMap[PIPELINE_STEPS[active].color].text.replace("text-", "bg-")}`} />
            <span className={`font-semibold ${colorMap[PIPELINE_STEPS[active].color].text}`}>
              Step {active + 1}: {PIPELINE_STEPS[active].label}
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{PIPELINE_STEPS[active].description}</p>
        </motion.div>
      </div>

      {/* Mobile: vertical pipeline */}
      <div className="lg:hidden space-y-4">
        {PIPELINE_STEPS.map((step, i) => {
          const c = colorMap[step.color];
          const isActive = active === i;
          return (
            <div key={i} className="relative">
              {/* Vertical connector */}
              {i < PIPELINE_STEPS.length - 1 && (
                <div className="absolute left-8 top-16 w-px h-6 overflow-hidden">
                  <div className="h-full w-full bg-white/10" />
                  <motion.div
                    className="absolute inset-x-0 top-0"
                    style={{ backgroundColor: c.connector }}
                    initial={{ height: "0%" }}
                    animate={inView ? { height: active > i ? "100%" : "0%" } : { height: "0%" }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              )}
              <button
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
                  {isActive && (
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{step.description}</p>
                  )}
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Main Page
───────────────────────────────────────── */
export default function AiLeadGenerationPage() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex flex-col justify-center pt-24 pb-20 overflow-hidden">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(0,240,255,0.12),transparent)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_60%,rgba(157,78,221,0.08),transparent)] pointer-events-none" />

        {/* Animated grid lines */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(0,240,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,240,255,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors mb-12 group text-sm">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </motion.div>

          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              AI Lead Generation System
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight mb-6"
            >
              Predictable Leads.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                On Autopilot.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-xl md:text-2xl text-white/55 max-w-2xl leading-relaxed mb-12"
            >
              AI-powered systems that find, qualify, and convert leads while you sleep. No manual outreach. No guesswork. Just a steady, scalable pipeline.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-cyan-400 text-black font-bold text-base hover:bg-cyan-300 shadow-[0_0_40px_rgba(34,211,238,0.35)] transition-all hover:shadow-[0_0_60px_rgba(34,211,238,0.5)] hover:scale-105"
              >
                Deploy Your Lead Engine <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-white/10 text-white/60 text-base hover:text-white hover:border-white/30 transition-all"
              >
                See how it works <ChevronDown className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Stat strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-20 grid grid-cols-3 gap-6 max-w-2xl"
          >
            {[
              { n: "+247%", l: "More qualified leads" },
              { n: "85%", l: "Email open rate" },
              { n: "< 14d", l: "To first replies" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-1">{s.n}</div>
                <div className="text-xs text-white/40">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 text-white/20" />
        </motion.div>
      </section>

      {/* ── SECTION 1: THE PROBLEM ── */}
      <section className="py-28 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-widest text-red-400/80 mb-3">The Problem</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Manual outreach is<br />killing your growth.</h2>
            <p className="text-white/45 text-lg max-w-xl mb-16">The old way of generating leads is slow, expensive, and completely unpredictable. Here's what it's costing you.</p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Clock,
                title: "Hours Wasted Scraping",
                body: "Your team spends 10–20 hours per week manually finding prospects, copying data into spreadsheets, and verifying emails — time that should go toward closing deals.",
                accent: "red",
              },
              {
                icon: TrendingDown,
                title: "Painfully Low Reply Rates",
                body: "Generic copy-paste outreach gets ignored. When everyone sounds the same, nobody replies. Average cold email reply rates sit at 1–3% — that's 97 ignored emails for every 100 sent.",
                accent: "orange",
              },
              {
                icon: AlertCircle,
                title: "Zero Consistency",
                body: "Outreach happens in bursts — heavily when you're slow, never when you're busy. There's no system, no cadence, and no predictability. Revenue follows the same unpredictable pattern.",
                accent: "red",
              },
            ].map((card, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <div className="relative h-full p-8 rounded-3xl border border-red-500/10 bg-red-500/[0.04] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent pointer-events-none" />
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-5">
                    <card.icon className="w-5 h-5 text-red-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{card.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{card.body}</p>
                  {/* X mark */}
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
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <FadeIn direction="left">
                <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-3">Our System</p>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  A fully automated<br />acquisition engine.
                </h2>
                <p className="text-white/50 text-lg leading-relaxed mb-10">
                  We build a custom, end-to-end outreach infrastructure using best-in-class automation tools — tailored to your ICP and running 24/7 without your involvement.
                </p>
              </FadeIn>

              <div className="space-y-5">
                {[
                  {
                    label: "Workflow Automation",
                    detail: "Built on n8n and Zapier — enterprise-grade automation without the enterprise price tag.",
                    icon: Repeat2,
                    color: "cyan",
                  },
                  {
                    label: "Multi-Source Data Scraping",
                    detail: "LinkedIn Sales Navigator, Apollo, Hunter.io, and web scraping for hyper-targeted prospect lists.",
                    icon: Database,
                    color: "blue",
                  },
                  {
                    label: "Lead Enrichment",
                    detail: "Each prospect is enriched with firmographic data, recent signals, and contact verification.",
                    icon: Layers,
                    color: "purple",
                  },
                  {
                    label: "AI Personalization Engine",
                    detail: "GPT-4 writes a unique, research-backed opening for every prospect — not templates, real personalization.",
                    icon: Sparkles,
                    color: "violet",
                  },
                  {
                    label: "Multi-Channel Outreach",
                    detail: "Coordinated Email + LinkedIn sequences with smart reply detection and automatic follow-up.",
                    icon: Send,
                    color: "cyan",
                  },
                ].map((item, i) => {
                  const c = colorMap[item.color];
                  return (
                    <FadeIn key={i} delay={i * 0.08} direction="left">
                      <div className={`flex gap-4 p-5 rounded-2xl border ${c.border} ${c.bg} transition-all hover:${c.glow}`}>
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

            {/* Visual: system diagram */}
            <FadeIn direction="right" delay={0.2}>
              <div className="relative">
                <div className="rounded-3xl border border-cyan-400/10 bg-white/[0.02] p-8 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-purple-400/5 pointer-events-none" />

                  <div className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-6">System Overview</div>

                  {/* Tool logos row */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {["n8n", "Zapier", "Apollo", "LinkedIn", "GPT-4", "HubSpot"].map((tool) => (
                      <span key={tool} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">
                        {tool}
                      </span>
                    ))}
                  </div>

                  {/* Simulated activity feed */}
                  <div className="space-y-3">
                    {[
                      { status: "success", msg: "42 new leads scraped from LinkedIn" },
                      { status: "success", msg: "38 emails verified & enriched" },
                      { status: "success", msg: "AI personalization complete — 38/38" },
                      { status: "active", msg: "Outreach sequence running…" },
                      { status: "success", msg: "3 replies received → CRM updated" },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5"
                      >
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${item.status === "active" ? "bg-cyan-400 animate-pulse" : "bg-green-400"}`} />
                        <span className="text-xs text-white/55">{item.msg}</span>
                        {item.status === "active" && (
                          <span className="ml-auto text-[10px] text-cyan-400 font-medium">LIVE</span>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/5 grid grid-cols-3 gap-3 text-center">
                    {[
                      { v: "142", l: "Prospects" },
                      { v: "31", l: "Replies" },
                      { v: "9", l: "Calls Booked" },
                    ].map((s) => (
                      <div key={s.l}>
                        <div className="text-xl font-bold text-cyan-400">{s.v}</div>
                        <div className="text-[11px] text-white/30">{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating badge */}
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

      {/* ── SECTION 3: HOW IT WORKS (PIPELINE) ── */}
      <section id="how-it-works" className="py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-3">How It Works</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              From zero to booked calls<br />in 5 automated steps.
            </h2>
            <p className="text-white/45 text-lg max-w-xl mx-auto">
              Every step is fully automated. You review replies and take calls — nothing else.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02]">
              <PipelineViz />
            </div>
          </FadeIn>

          {/* Step detail cards (always visible on mobile/tablet) */}
          <div className="mt-10 grid md:grid-cols-5 gap-4 hidden md:grid lg:hidden">
            {PIPELINE_STEPS.map((step, i) => {
              const c = colorMap[step.color];
              return (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className={`p-4 rounded-2xl border ${c.border} ${c.bg} h-full`}>
                    <step.icon className={`w-5 h-5 ${c.text} mb-3`} />
                    <div className={`text-xs font-semibold ${c.text} mb-1`}>{step.label}</div>
                    <p className="text-[11px] text-white/40 leading-relaxed">{step.description}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: RESULTS ── */}
      <section className="py-28 bg-white/[0.015] border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-3">Results</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">What happens when<br />you deploy the system.</h2>
            <p className="text-white/45 text-lg max-w-xl mx-auto">These aren't projections. They're outcomes from real clients who replaced manual outreach with our system.</p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {[
              {
                icon: BarChart3,
                title: "More Replies, Consistently",
                body: "AI-personalized outreach generates 5–10x more replies than generic templates. Clients typically see their first replies within 7–10 business days.",
                metric: "+247%",
                metricLabel: "Average reply rate increase",
                color: "cyan",
              },
              {
                icon: Repeat2,
                title: "A Consistent Pipeline",
                body: "The system runs every day, regardless of how busy you are. Your pipeline stays full even when you're delivering client work, on holiday, or scaling.",
                metric: "Zero",
                metricLabel: "Manual effort required daily",
                color: "blue",
              },
              {
                icon: Layers,
                title: "Infinitely Scalable",
                body: "Unlike a human SDR team, our system scales with a few config changes — new verticals, new regions, higher volume. No hiring, no training, no management.",
                metric: "10x",
                metricLabel: "Output vs. human outreach team",
                color: "purple",
              },
            ].map((card, i) => {
              const c = colorMap[card.color];
              return (
                <FadeIn key={i} delay={i * 0.12}>
                  <div className={`relative h-full p-8 rounded-3xl border ${c.border} ${c.bg} overflow-hidden`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.color === "cyan" ? "from-cyan-400/5" : card.color === "blue" ? "from-blue-400/5" : "from-purple-400/5"} to-transparent pointer-events-none`} />
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
            <div className="p-8 rounded-3xl border border-cyan-400/15 bg-cyan-400/[0.04] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-transparent rounded-l-3xl" />
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <p className="text-white/70 text-lg leading-relaxed italic mb-4">
                    "We went from manually sending 50 emails a week with a 1% reply rate to running a fully automated system that sends 400 personalised emails daily with a 12% reply rate. The pipeline is completely predictable now."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-400/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400 font-bold text-sm">J</div>
                    <div>
                      <div className="text-white font-semibold text-sm">James R.</div>
                      <div className="text-white/35 text-xs">Founder, ScalePro — B2B SaaS</div>
                    </div>
                  </div>
                </div>
                <div className="md:w-48 grid grid-cols-2 gap-3 text-center">
                  {[
                    { v: "400/day", l: "Emails sent" },
                    { v: "12%", l: "Reply rate" },
                    { v: "+247%", l: "More leads" },
                    { v: "0h", l: "Manual work" },
                  ].map((s) => (
                    <div key={s.l} className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className="text-sm font-bold text-cyan-400">{s.v}</div>
                      <div className="text-[10px] text-white/30">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── SECTION 5: CTA ── */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(0,240,255,0.1),transparent)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_50%,rgba(157,78,221,0.07),transparent)] pointer-events-none" />

        {/* Animated grid */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(0,240,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,240,255,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }}
        />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Ready to scale?
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Deploy Your<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Lead Engine</span>
            </h2>
            <p className="text-white/50 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
              Book a free 30-minute strategy call. We'll map out your ideal client profile, show you the exact system, and give you a deployment timeline.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full bg-cyan-400 text-black font-bold text-lg hover:bg-cyan-300 shadow-[0_0_50px_rgba(34,211,238,0.4)] transition-all hover:shadow-[0_0_80px_rgba(34,211,238,0.6)] hover:scale-105"
              >
                Book a Free Strategy Call <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/30">
              {["Free strategy call", "No commitment", "Live in under 2 weeks", "Results guaranteed"].map((t, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400/60" /> {t}
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
