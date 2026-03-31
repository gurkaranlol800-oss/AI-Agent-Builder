import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ArrowRight, ChevronDown, CheckCircle2,
  TrendingDown, LayoutTemplate, AlertCircle, Eye,
  Video, Brain, Zap, Mail, Users, BarChart3,
  Target, Layers, MousePointerClick, RefreshCw,
  X, Check, TrendingUp,
} from "lucide-react";
import Navbar from "@/components/Navbar";

/* ─── Theme: emerald/green ─── */
const C = {
  text:   "text-emerald-400",
  bg:     "bg-emerald-400/10",
  border: "border-emerald-400/30",
  glow:   "shadow-[0_0_24px_rgba(52,211,153,0.35)]",
  hex:    "#34d399",
  grad:   "from-emerald-400 to-teal-500",
};

/* ─── FadeIn ─── */
function FadeIn({ children, className = "", delay = 0, direction = "up" }: {
  children: React.ReactNode; className?: string; delay?: number; direction?: "up"|"left"|"right"|"none";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref}
      variants={{ hidden:{ opacity:0, y:direction==="up"?30:0, x:direction==="left"?-30:direction==="right"?30:0 }, visible:{ opacity:1,y:0,x:0 } }}
      initial="hidden" animate={inView?"visible":"hidden"}
      transition={{ duration:0.65, delay, ease:[0.22,1,0.36,1] }}
      className={className}
    >{children}</motion.div>
  );
}

/* ─────────────────────────────────────────
   Animated Funnel Visualization
   Tapering stages with flowing particles
───────────────────────────────────────── */
const FUNNEL_STAGES = [
  { label: "Traffic Enters",      sublabel: "Ads · SEO · Social",   pct: 100, color: "#34d399", people: 1000, icon: Users },
  { label: "Landing Page",        sublabel: "Hooks & value prop",    pct: 62,  color: "#2dd4bf", people: 620,  icon: LayoutTemplate },
  { label: "Lead Captured",       sublabel: "Form · VSL · CTA",      pct: 34,  color: "#22d3ee", people: 340,  icon: MousePointerClick },
  { label: "Nurture Sequence",    sublabel: "Email · SMS · Retarget", pct: 18,  color: "#60a5fa", people: 180,  icon: Mail },
  { label: "Client Conversion",   sublabel: "Call booked · Deal won", pct: 8,   color: "#818cf8", people: 80,   icon: Target },
];

function FunnelViz() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState<number | null>(null);
  const [particles, setParticles] = useState<{ id:number; stage:number; y:number; x:number }[]>([]);

  // Spawn particles periodically when in view
  useEffect(() => {
    if (!inView) return;
    let id = 0;
    const spawn = () => {
      const stage = 0;
      setParticles(p => [...p.slice(-18), { id: id++, stage, y: 0, x: 45 + Math.random() * 10 }]);
    };
    const interval = setInterval(spawn, 600);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <div ref={ref} className="w-full">
      <div className="grid lg:grid-cols-2 gap-10 items-center">

        {/* Funnel shape */}
        <div className="relative space-y-1">
          {FUNNEL_STAGES.map((stage, i) => {
            const isActive = active === i;
            const widthPct = 40 + (stage.pct / 100) * 60; // 40–100%
            return (
              <div key={i} className="flex flex-col items-center">
                <motion.button
                  onClick={() => setActive(active === i ? null : i)}
                  className="w-full flex justify-center"
                  whileHover={{ scale: 1.01 }}
                >
                  <motion.div
                    className={`relative h-14 rounded-xl border flex items-center justify-between px-5 cursor-pointer transition-all overflow-hidden ${
                      isActive
                        ? "border-emerald-400/60 shadow-[0_0_20px_rgba(52,211,153,0.3)]"
                        : "border-white/8 hover:border-white/20"
                    }`}
                    style={{ width: `${widthPct}%`, backgroundColor: `${stage.color}15` }}
                    initial={{ width: "0%", opacity: 0 }}
                    animate={inView ? { width: `${widthPct}%`, opacity: 1 } : { width: "0%", opacity: 0 }}
                    transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Glow line top */}
                    <div className="absolute top-0 left-0 right-0 h-px" style={{ backgroundColor: stage.color, opacity: isActive ? 0.8 : 0.2 }} />

                    <div className="flex items-center gap-3">
                      <stage.icon className="w-4 h-4 flex-shrink-0" style={{ color: stage.color }} />
                      <div className="text-left">
                        <div className="text-white text-sm font-semibold leading-none">{stage.label}</div>
                        <div className="text-white/35 text-[11px] mt-0.5">{stage.sublabel}</div>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-bold" style={{ color: stage.color }}>{stage.people.toLocaleString()}</div>
                      <div className="text-white/30 text-[10px]">{stage.pct}%</div>
                    </div>

                    {/* Animated fill shimmer */}
                    {inView && (
                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: `linear-gradient(90deg, transparent, ${stage.color}18, transparent)` }}
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 2.5, delay: i * 0.2 + 0.5, repeat: Infinity, repeatDelay: 4 }}
                      />
                    )}
                  </motion.div>
                </motion.button>

                {/* Drop arrow */}
                {i < FUNNEL_STAGES.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: i * 0.15 + 0.4 }}
                    className="flex flex-col items-center my-0.5"
                  >
                    <div className="w-px h-3 bg-white/10" />
                    <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-white/10" />
                  </motion.div>
                )}
              </div>
            );
          })}

          {/* Conversion label at bottom */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 1 }}
            className="text-center mt-4"
          >
            <span className="text-xs text-white/30">Starting with 1,000 visitors · </span>
            <span className="text-xs text-emerald-400 font-semibold">8% average client conversion</span>
          </motion.div>
        </div>

        {/* Stage detail panel */}
        <div className="space-y-4">
          <div className="text-white/40 text-sm mb-2">
            {active !== null ? "Selected stage" : "Click any stage to explore ↓"}
          </div>

          <AnimatePresence mode="wait">
            {active !== null ? (
              <motion.div key={active}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="p-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.05]"
              >
                <div className="flex items-center gap-3 mb-4">
                  {(() => { const S = FUNNEL_STAGES[active]; return <S.icon className="w-5 h-5" style={{ color: S.color }} />; })()}
                  <span className="font-bold text-white">{FUNNEL_STAGES[active].label}</span>
                  <span className="ml-auto text-2xl font-bold" style={{ color: FUNNEL_STAGES[active].color }}>
                    {FUNNEL_STAGES[active].pct}%
                  </span>
                </div>
                {[
                  "We use proven hooks and pain-point messaging to grab attention before the bounce.",
                  "Landing page above-the-fold is 100% optimised: headline, subheadline, and single CTA.",
                  "AI-written copy is tested and refined to match your exact audience's language.",
                  "Psychological triggers — urgency, social proof, authority — are woven in precisely.",
                  "Every element is A/B tested. We don't guess; we measure and improve continuously.",
                ][active]}
              </motion.div>
            ) : (
              <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="space-y-3">
                {FUNNEL_STAGES.map((s, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-24 text-[11px] text-white/35 text-right">{s.people.toLocaleString()} people</div>
                    <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                      <motion.div className="h-full rounded-full"
                        style={{ backgroundColor: s.color }}
                        initial={{ width: "0%" }}
                        animate={inView ? { width: `${s.pct}%` } : { width: "0%" }}
                        transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                    <div className="w-8 text-[11px] font-semibold" style={{ color: s.color }}>{s.pct}%</div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stats strip */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            {[
              { v: "4.2x", l: "Conversion lift" },
              { v: "72h",  l: "Build time" },
              { v: "8%",   l: "Avg client CVR" },
            ].map(s => (
              <div key={s.l} className={`p-3 rounded-xl ${C.bg} border ${C.border} text-center`}>
                <div className={`text-lg font-bold ${C.text}`}>{s.v}</div>
                <div className="text-[10px] text-white/30">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Before / After Comparison
───────────────────────────────────────── */
type Side = "before" | "after";
const BA_ROWS = [
  { label: "Landing page CVR",  before: "1.2%",            after: "6.8%",           good: true  },
  { label: "Time on page",       before: "0:22 avg",        after: "3:14 avg",       good: true  },
  { label: "Lead capture rate",  before: "4%",              after: "28%",            good: true  },
  { label: "Email open rate",    before: "11%",             after: "46%",            good: true  },
  { label: "Cost per lead",      before: "$94",             after: "$19",            good: false },
  { label: "Calls booked/mo",    before: "3–5",             after: "28–40",          good: true  },
  { label: "Revenue predictability", before: "Unpredictable", after: "Fully forecast", good: true },
];

const BA_PROBLEMS = [
  { before: "Generic headline with no pain-point hook",       after: "Precision headline addressing exact frustration" },
  { before: "Wall of text — no visual hierarchy",             after: "Scannable structure with benefit bullets + social proof" },
  { before: "Buried CTA below the fold",                      after: "Primary CTA above fold + secondary CTA at scroll depth" },
  { before: "No lead magnet — visitors leave empty-handed",   after: "High-value lead magnet captures email before exit" },
  { before: "No follow-up after opt-in",                      after: "7-step email + SMS nurture sequence auto-triggers" },
  { before: "No retargeting for unconverted traffic",         after: "Pixel setup + retargeting across Meta, Google, YouTube" },
];

function BeforeAfter() {
  const [view, setView] = useState<Side>("before");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="w-full">
      {/* Toggle */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1">
          {(["before", "after"] as Side[]).map(s => (
            <button key={s} onClick={() => setView(s)}
              className={`px-8 py-2.5 rounded-full text-sm font-semibold transition-all ${
                view === s
                  ? s === "before"
                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                    : "bg-emerald-400/20 text-emerald-400 border border-emerald-400/30"
                  : "text-white/40 hover:text-white/70"
              }`}>
              {s === "before" ? "❌ Before AcquireZen" : "✅ After AcquireZen"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Metrics table */}
        <div className="space-y-3">
          <div className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">Funnel metrics</div>
          {BA_ROWS.map((row, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5"
            >
              <span className="text-sm text-white/55">{row.label}</span>
              <AnimatePresence mode="wait">
                <motion.span key={`${view}-${i}`}
                  initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                  className={`text-sm font-bold ${view === "before" ? "text-red-400" : "text-emerald-400"}`}
                >
                  {view === "before" ? row.before : row.after}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Page element breakdown */}
        <div className="space-y-3">
          <div className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">Page element breakdown</div>
          {BA_PROBLEMS.map((row, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: 16 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className={`flex gap-3 p-3 rounded-xl border transition-all ${
                view === "before"
                  ? "border-red-500/10 bg-red-500/[0.04]"
                  : "border-emerald-400/15 bg-emerald-400/[0.05]"
              }`}
            >
              <div className="flex-shrink-0 mt-0.5">
                <AnimatePresence mode="wait">
                  <motion.div key={view} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }} transition={{ duration: 0.2 }}>
                    {view === "before"
                      ? <X className="w-4 h-4 text-red-400" />
                      : <Check className="w-4 h-4 text-emerald-400" />
                    }
                  </motion.div>
                </AnimatePresence>
              </div>
              <AnimatePresence mode="wait">
                <motion.p key={`${view}-${i}`}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`text-sm leading-relaxed ${view === "before" ? "text-white/50" : "text-white/70"}`}
                >
                  {view === "before" ? row.before : row.after}
                </motion.p>
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Summary bar */}
      <AnimatePresence mode="wait">
        <motion.div key={view}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
          className={`mt-8 p-5 rounded-2xl border text-center ${
            view === "before"
              ? "border-red-500/15 bg-red-500/[0.04]"
              : "border-emerald-400/15 bg-emerald-400/[0.05]"
          }`}
        >
          <div className={`text-2xl font-bold mb-1 ${view === "before" ? "text-red-400" : "text-emerald-400"}`}>
            {view === "before" ? "3–5 calls/month" : "28–40 calls/month"}
          </div>
          <div className="text-white/40 text-sm">
            {view === "before"
              ? "What a typical unoptimised funnel delivers"
              : "What our engineered funnel system consistently generates"}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────
   Pipeline Steps
───────────────────────────────────────── */
const PIPELINE = [
  { icon: Users,           label: "Traffic Enters Funnel",  sublabel: "Paid · Organic · Direct",     desc: "Visitors arrive from your ads, SEO, or social channels and land on a strategically built entry point — matched to the traffic temperature." },
  { icon: LayoutTemplate,  label: "Engaging Landing Page",  sublabel: "Hook · Value · CTA",          desc: "They hit a landing page engineered for one purpose: getting the click. Above-fold hook, authority proof, and a single high-converting CTA." },
  { icon: MousePointerClick,label:"Lead Captured",          sublabel: "Form · VSL · Pop-up",          desc: "The visitor opts in via a form, watches a VSL, or triggers an exit pop-up. Their data enters your CRM and the automation chain begins." },
  { icon: Mail,            label: "Email/SMS Nurture",      sublabel: "7-step sequence · Retarget",   desc: "An automated sequence delivers value, handles objections, and builds trust over 7–14 days — across email, SMS, and retargeting ads." },
  { icon: Target,          label: "Conversion to Client",   sublabel: "Call booked · Deal won",       desc: "A warm, pre-educated prospect books a call or buys directly. Close rates on funnel-nurtured leads average 3x higher than cold outreach." },
];

function PipelineViz() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => setActive(p => (p + 1) % PIPELINE.length), 2100);
    return () => clearInterval(t);
  }, [inView]);

  return (
    <div ref={ref} className="w-full">
      <div className="hidden lg:block">
        <div className="relative flex items-start justify-between">
          {PIPELINE.map((step, i) => {
            const isActive = active === i;
            return (
              <div key={i} className="relative flex flex-col items-center flex-1">
                {i < PIPELINE.length - 1 && (
                  <div className="absolute top-10 left-[60%] right-0 h-px z-0 overflow-hidden">
                    <div className="h-full bg-white/10 w-full" />
                    <motion.div className="absolute inset-y-0 left-0 h-full" style={{ backgroundColor: C.hex }}
                      initial={{ width:"0%" }}
                      animate={inView ? { width: active > i ? "100%" : active === i ? "50%" : "0%" } : { width:"0%" }}
                      transition={{ duration:0.9, ease:"easeInOut" }}
                    />
                    {active === i && (
                      <motion.div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full" style={{ backgroundColor: C.hex }}
                        initial={{ left:"0%", opacity:0 }}
                        animate={{ left:"100%", opacity:[0,1,1,0] }}
                        transition={{ duration:1.6, ease:"easeInOut", repeat:Infinity }}
                      />
                    )}
                  </div>
                )}
                <motion.button onClick={() => setActive(i)}
                  className={`relative z-10 w-20 h-20 rounded-2xl border flex items-center justify-center cursor-pointer ${C.bg} ${C.border} ${isActive ? C.glow : ""}`}
                  animate={{ scale: isActive ? 1.1 : 1 }} transition={{ duration:0.3 }}
                >
                  <step.icon className={`w-7 h-7 ${C.text}`} />
                </motion.button>
                <div className="mt-4 text-center px-1">
                  <div className={`text-sm font-semibold ${isActive ? C.text : "text-white/70"} transition-colors`}>{step.label}</div>
                  <div className="text-xs text-white/40 mt-0.5">{step.sublabel}</div>
                </div>
                <div className={`absolute -top-3 -left-1 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center transition-all ${isActive ? `${C.bg} ${C.text} border ${C.border}` : "bg-white/5 text-white/30 border border-white/10"}`}>
                  {i + 1}
                </div>
              </div>
            );
          })}
        </div>
        <motion.div key={active} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }}
          className={`mt-10 p-5 rounded-2xl border ${C.bg} ${C.border} ${C.glow}`}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className={`font-semibold ${C.text}`}>Step {active + 1}: {PIPELINE[active].label}</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{PIPELINE[active].desc}</p>
        </motion.div>
      </div>

      <div className="lg:hidden space-y-4">
        {PIPELINE.map((step, i) => {
          const isActive = active === i;
          return (
            <button key={i} onClick={() => setActive(i)}
              className={`w-full flex items-start gap-4 p-4 rounded-2xl border text-left transition-all ${isActive ? `${C.bg} ${C.border} ${C.glow}` : "bg-white/[0.02] border-white/10"}`}>
              <div className={`w-12 h-12 rounded-xl ${C.bg} border ${C.border} flex items-center justify-center flex-shrink-0`}>
                <step.icon className={`w-5 h-5 ${C.text}`} />
              </div>
              <div>
                <div className={`font-semibold text-sm ${isActive ? C.text : "text-white/70"}`}>
                  <span className="text-white/30 mr-2">0{i+1}</span>{step.label}
                </div>
                <div className="text-xs text-white/40 mt-0.5">{step.sublabel}</div>
                {isActive && <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{step.desc}</p>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Main Page
───────────────────────────────────────── */
export default function ConversionFunnelsPage() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex flex-col justify-center pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(52,211,153,0.11),transparent)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_60%_,rgba(20,184,166,0.07),transparent)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage:"linear-gradient(rgba(52,211,153,1) 1px,transparent 1px),linear-gradient(90deg,rgba(52,211,153,1) 1px,transparent 1px)", backgroundSize:"60px 60px" }} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
            <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors mb-12 group text-sm">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${C.bg} border ${C.border} ${C.text} text-xs font-semibold uppercase tracking-widest mb-6`}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Conversion Funnels
              </motion.div>

              <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.2 }}
                className="text-6xl md:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6">
                Turn Visitors<br />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${C.grad}`}>Into Clients.</span>
              </motion.h1>

              <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.35 }}
                className="text-xl text-white/55 max-w-lg leading-relaxed mb-12">
                High-converting funnels designed to capture, nurture, and convert — engineered with psychology, AI copywriting, and proven frameworks.
              </motion.p>

              <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5 }}
                className="flex flex-wrap gap-4 items-center">
                <Link href="/#contact"
                  className={`inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emerald-400 text-black font-bold text-base hover:bg-emerald-300 shadow-[0_0_40px_rgba(52,211,153,0.35)] transition-all hover:shadow-[0_0_60px_rgba(52,211,153,0.55)] hover:scale-105`}>
                  Build My Funnel <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="#before-after" className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all">
                  See the results <ChevronDown className="w-4 h-4" />
                </a>
              </motion.div>

              <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.7 }}
                className="mt-14 grid grid-cols-3 gap-6">
                {[
                  { n:"4.2x", l:"CVR improvement" },
                  { n:"72h",  l:"Funnel build time" },
                  { n:"$180k",l:"Revenue recovered via retargeting" },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className={`text-3xl font-bold ${C.text} mb-1`}>{s.n}</div>
                    <div className="text-xs text-white/40">{s.l}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Hero funnel preview */}
            <motion.div initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.8, delay:0.4 }}
              className="hidden lg:block relative">
              <div className={`rounded-3xl border ${C.border} bg-white/[0.02] overflow-hidden p-6`}
                style={{ boxShadow:"0 0 80px rgba(52,211,153,0.08)" }}>
                <div className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-5">Funnel performance snapshot</div>
                <div className="space-y-3">
                  {FUNNEL_STAGES.map((s, i) => (
                    <motion.div key={i} initial={{ opacity:0, x:16 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.6 + i*0.12 }}
                      className="flex items-center gap-3">
                      <div className="w-28 text-[11px] text-white/40 text-right">{s.label}</div>
                      <div className="flex-1 h-2.5 rounded-full bg-white/5 overflow-hidden">
                        <motion.div className="h-full rounded-full" style={{ backgroundColor: s.color }}
                          initial={{ width:"0%" }} animate={{ width:`${s.pct}%` }}
                          transition={{ duration:0.8, delay:0.8 + i*0.12, ease:[0.22,1,0.36,1] }}
                        />
                      </div>
                      <span className="text-xs font-bold w-8" style={{ color: s.color }}>{s.pct}%</span>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <div className={`text-2xl font-bold ${C.text}`}>8%</div>
                    <div className="text-[11px] text-white/30">Client conversion rate</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">vs 1.2%</div>
                    <div className="text-[11px] text-white/30">Industry average</div>
                  </div>
                </div>
              </div>
              <motion.div animate={{ y:[-4,4,-4] }} transition={{ duration:3, repeat:Infinity, ease:"easeInOut" }}
                className="absolute -top-4 -right-4 px-4 py-2 rounded-full bg-emerald-400/15 border border-emerald-400/30 text-emerald-400 text-xs font-semibold">
                ● 4.2x avg lift
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" animate={{ y:[0,8,0] }} transition={{ duration:2, repeat:Infinity }}>
          <ChevronDown className="w-5 h-5 text-white/20" />
        </motion.div>
      </section>

      {/* ── SECTION 1: THE PROBLEM ── */}
      <section className="py-28 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-widest text-red-400/80 mb-3">The Problem</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Traffic without a funnel<br />is money down the drain.</h2>
            <p className="text-white/45 text-lg max-w-xl mb-16">Most businesses send paid traffic to a homepage or a basic page with no structure. Up to 98% of those visitors leave without doing anything.</p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon:TrendingDown, title:"Traffic Doesn't Convert",        stat:"98%",    statL:"of paid traffic leaves without converting",  body:"Without a properly engineered funnel, visitors bounce within seconds. No hook, no urgency, no structure — just a generic page asking them to 'contact us'." },
              { icon:AlertCircle,  title:"Weak, Generic Landing Pages",    stat:"1.2%",   statL:"average landing page conversion rate",        body:"The average landing page converts at just 1.2%. That means 98.8 of every 100 visitors you pay for disappear — not because your offer is bad, but because the page doesn't do its job." },
              { icon:Eye,          title:"No Clear Funnel Structure",       stat:"73%",    statL:"of businesses have no defined funnel",        body:"Without a defined journey from awareness to booking, prospects drop off at every stage. There's no nurture, no retargeting, no sequence to re-engage them — they're just gone." },
            ].map((card, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <div className="relative h-full p-8 rounded-3xl border border-red-500/10 bg-red-500/[0.04] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent pointer-events-none" />
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
                    <card.icon className="w-5 h-5 text-red-400" />
                  </div>
                  <div className="text-4xl font-bold text-red-400 mb-1">{card.stat}</div>
                  <div className="text-xs text-white/30 mb-5">{card.statL}</div>
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
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-3">Our System</p>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Conversion engineering,<br />not web design.</h2>
                <p className="text-white/50 text-lg leading-relaxed mb-10">
                  We don't build pretty pages. We build selling machines — structured around buyer psychology, tested frameworks, and AI-powered copy that speaks your prospect's language exactly.
                </p>
              </FadeIn>
              <div className="space-y-5">
                {[
                  { icon:LayoutTemplate,   label:"Conversion-Optimised Landing Pages",  detail:"Built on AIDA, PAS, and BAB frameworks. Every headline, CTA, and proof element placed with precision — not aesthetics." },
                  { icon:Video,            label:"VSL (Video Sales Letter) Funnels",    detail:"We script, storyboard, and structure VSLs that hold attention and pre-sell your offer before the call. Clients see 2–4x higher show rates." },
                  { icon:Brain,            label:"AI-Driven Copywriting",               detail:"GPT-4 trained on your voice, market, and offer writes high-converting copy — then tested and refined with heatmap and A/B data." },
                  { icon:Zap,              label:"Psychological Triggers",              detail:"Urgency, scarcity, social proof, authority, and reciprocity — woven in at exactly the right moments in the buyer journey." },
                  { icon:RefreshCw,        label:"Retargeting & Nurture Sequences",     detail:"7-step email + SMS sequences. Facebook/Google pixel setup. Retargeting audiences built from every visitor who didn't convert." },
                ].map((item, i) => (
                  <FadeIn key={i} delay={i * 0.08} direction="left">
                    <div className={`flex gap-4 p-5 rounded-2xl border ${C.border} ${C.bg}`}>
                      <div className={`w-10 h-10 rounded-xl ${C.bg} border ${C.border} flex items-center justify-center flex-shrink-0`}>
                        <item.icon className={`w-4 h-4 ${C.text}`} />
                      </div>
                      <div>
                        <div className={`font-semibold text-sm ${C.text} mb-1`}>{item.label}</div>
                        <div className="text-xs text-white/45 leading-relaxed">{item.detail}</div>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            {/* Platform & tools */}
            <FadeIn direction="right" delay={0.2}>
              <div className={`relative rounded-3xl border ${C.border} bg-white/[0.02] p-8`}>
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-transparent pointer-events-none rounded-3xl" />
                <div className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-5">Platforms we build on</div>
                <div className="flex flex-wrap gap-2 mb-8">
                  {["ClickFunnels","GoHighLevel","Webflow","Framer","Custom Code","Unbounce","Systeme.io","Kajabi"].map(t => (
                    <span key={t} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">{t}</span>
                  ))}
                </div>
                <div className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">What's included in every build</div>
                <div className="space-y-2.5">
                  {[
                    "Funnel strategy session + architecture map",
                    "High-converting landing page (designed + dev)",
                    "AI-written copy — headline, body, CTA, VSL script",
                    "Lead magnet creation (PDF, checklist, mini-course)",
                    "7-step email + SMS nurture sequence",
                    "Facebook Pixel + Google Tag Manager setup",
                    "Retargeting audience creation across Meta + Google",
                    "A/B testing framework + monthly optimisation calls",
                  ].map((item, i) => (
                    <motion.div key={i} initial={{ opacity:0, x:16 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.3 + i*0.08 }}
                      className="flex items-center gap-2.5 text-xs text-white/55">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${C.text} flex-shrink-0`} />
                      {item}
                    </motion.div>
                  ))}
                </div>
                <motion.div animate={{ y:[-4,4,-4] }} transition={{ duration:3, repeat:Infinity, ease:"easeInOut" }}
                  className="absolute -top-4 -right-4 px-4 py-2 rounded-full bg-emerald-400/15 border border-emerald-400/30 text-emerald-400 text-xs font-semibold">
                  ● Live in 72h
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: HOW IT WORKS ── */}
      <section className="py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-3">How It Works</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Five stages. One seamless<br />journey to conversion.</h2>
            <p className="text-white/45 text-lg max-w-xl mx-auto">Every stage of the funnel is designed to move the prospect closer to a yes — automatically, with no manual intervention from your team.</p>
          </FadeIn>
          <div className="mb-14">
            <FadeIn delay={0.1}>
              <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02]">
                <PipelineViz />
              </div>
            </FadeIn>
          </div>

          {/* Animated funnel viz */}
          <FadeIn delay={0.2} className="text-center mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-2">Funnel flow</p>
            <p className="text-white/40 text-sm">Click any stage to see what we do there</p>
          </FadeIn>
          <FadeIn delay={0.25}>
            <div className="p-8 rounded-3xl border border-emerald-400/10 bg-white/[0.02]">
              <FunnelViz />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── SECTION 4: BEFORE vs AFTER ── */}
      <section id="before-after" className="py-28 bg-white/[0.015] border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-3">Before vs After</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">The transformation<br />in your numbers.</h2>
            <p className="text-white/45 text-lg max-w-xl mx-auto">Toggle between before and after to see exactly how your funnel metrics change when built right.</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <BeforeAfter />
          </FadeIn>
        </div>
      </section>

      {/* ── SECTION 5: RESULTS ── */}
      <section className="py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mb-3">Results</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">What happens when your<br />funnel actually works.</h2>
            <p className="text-white/45 text-lg max-w-xl mx-auto">Real outcomes across B2B service businesses, agencies, and SaaS companies that replaced their basic pages with engineered funnels.</p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {[
              { icon:TrendingUp,  metric:"4.2x",  metricLabel:"Average conversion rate improvement",  title:"Higher Conversion Rates",    body:"The average client sees their conversion rate jump from 1–2% to 6–8% within 30 days of deploying an engineered funnel. More conversions from the same traffic means immediate ROI." },
              { icon:BarChart3,   metric:"6.8x",  metricLabel:"Return on ad spend improvement",       title:"Better ROI on Every £ Spent", body:"When your funnel converts properly, every pound you spend on ads works harder. Cost per lead drops, cost per booked call drops, and the revenue from each visitor climbs." },
              { icon:Layers,      metric:"28–40", metricLabel:"Calls booked per month (avg client)",  title:"Predictable, Scalable Growth", body:"Instead of sporadic results, clients operate with a predictable number of calls booked monthly — a number they can plan around, staff around, and scale with confidence." },
            ].map((card, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <div className={`relative h-full p-8 rounded-3xl border ${C.border} ${C.bg} overflow-hidden`}>
                  <div className={`w-12 h-12 rounded-xl ${C.bg} border ${C.border} flex items-center justify-center mb-5`}>
                    <card.icon className={`w-5 h-5 ${C.text}`} />
                  </div>
                  <div className={`text-4xl font-bold ${C.text} mb-1`}>{card.metric}</div>
                  <div className="text-xs text-white/30 mb-5">{card.metricLabel}</div>
                  <h3 className="text-lg font-bold text-white mb-3">{card.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{card.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Testimonial */}
          <FadeIn delay={0.3}>
            <div className={`p-8 rounded-3xl border ${C.border} bg-emerald-400/[0.04] relative overflow-hidden`}>
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-400 to-transparent rounded-l-3xl" />
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <p className="text-white/70 text-lg leading-relaxed italic mb-4">
                    "We were spending £8,000/month on ads and booking 4–5 calls. After AcquireZen rebuilt our funnel, the same budget now books 34 calls a month. The funnel paid for itself in week one."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${C.bg} border ${C.border} flex items-center justify-center ${C.text} font-bold text-sm`}>L</div>
                    <div>
                      <div className="text-white font-semibold text-sm">Liam H.</div>
                      <div className="text-white/35 text-xs">CEO, Pinnacle Coaching — High-Ticket B2B</div>
                    </div>
                  </div>
                </div>
                <div className="md:w-48 grid grid-cols-2 gap-3 text-center">
                  {[{v:"34",l:"Calls/month"},{v:"4.2x",l:"CVR lift"},{v:"£8k",l:"Same ad spend"},{v:"Wk1",l:"ROI recovered"}].map(s => (
                    <div key={s.l} className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className={`text-sm font-bold ${C.text}`}>{s.v}</div>
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(52,211,153,0.1),transparent)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_20%_50%,rgba(20,184,166,0.06),transparent)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage:"linear-gradient(rgba(52,211,153,1) 1px,transparent 1px),linear-gradient(90deg,rgba(52,211,153,1) 1px,transparent 1px)", backgroundSize:"60px 60px" }} />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <FadeIn>
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${C.bg} border ${C.border} ${C.text} text-xs font-semibold uppercase tracking-widest mb-8`}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Ready to convert?
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Build My<br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${C.grad}`}>Funnel</span>
            </h2>
            <p className="text-white/50 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
              Book a free 30-minute strategy call. We'll audit your current funnel, show you exactly where it's leaking, and map out your conversion system.
            </p>
            <Link href="/#contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full bg-emerald-400 text-black font-bold text-lg hover:bg-emerald-300 shadow-[0_0_50px_rgba(52,211,153,0.4)] transition-all hover:shadow-[0_0_80px_rgba(52,211,153,0.6)] hover:scale-105">
              Book a Free Strategy Call <ArrowRight className="w-5 h-5" />
            </Link>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/30">
              {["Free funnel audit","Live in 72h","No commitment","4.2x avg CVR lift"].map((t, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400/60" /> {t}
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
