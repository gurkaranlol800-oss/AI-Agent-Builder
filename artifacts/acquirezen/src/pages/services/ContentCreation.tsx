import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ArrowRight, ChevronDown, CheckCircle2,
  Clock, TrendingDown, AlertCircle,
  Lightbulb, Sparkles, PenLine, CalendarDays, Send,
  FileText, Mail, Video, Image, Hash,
  BarChart3, TrendingUp, Repeat,
  Cpu, Rss, Globe,
} from "lucide-react";
import Navbar from "@/components/Navbar";

/* ─── Theme: amber/yellow ─── */
const C = {
  text:   "text-amber-400",
  bg:     "bg-amber-400/10",
  border: "border-amber-400/30",
  glow:   "shadow-[0_0_24px_rgba(251,191,36,0.35)]",
  hex:    "#fbbf24",
  grad:   "from-amber-400 to-orange-400",
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
   Content types that flow through pipeline
───────────────────────────────────────── */
const CONTENT_TYPES = [
  { label:"Blog Post",       icon:FileText, color:"#818cf8" },
  { label:"Email",           icon:Mail,     color:"#34d399" },
  { label:"Reel Script",     icon:Video,    color:"#fb7185" },
  { label:"Ad Copy",         icon:Hash,     color:"#f472b6" },
  { label:"LinkedIn Post",   icon:Rss,      color:"#60a5fa" },
  { label:"YouTube Script",  icon:Image,    color:"#f97316" },
];

/* ─────────────────────────────────────────
   Flowing Pipeline Visualization
───────────────────────────────────────── */
const PIPE_STAGES = [
  { icon: Lightbulb,   label:"Topic Gen",   color:"#fbbf24" },
  { icon: Cpu,         label:"AI Write",    color:"#818cf8" },
  { icon: PenLine,     label:"Edit",        color:"#34d399" },
  { icon: CalendarDays,label:"Schedule",    color:"#60a5fa" },
  { icon: Globe,       label:"Publish",     color:"#fb7185" },
];

interface Block {
  id: number;
  typeIdx: number;
  stage: number;
  progress: number; // 0-1 within current stage
}

function FlowingPipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [published, setPublished] = useState<{ id: number; label: string; color: string }[]>([]);
  const nextId = useRef(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;

    // Spawn a new block every 1.8s
    const spawnTimer = setInterval(() => {
      setBlocks(bs => [...bs, {
        id: nextId.current++,
        typeIdx: Math.floor(Math.random() * CONTENT_TYPES.length),
        stage: 0,
        progress: 0,
      }]);
    }, 1800);

    // Tick every 80ms — advance all blocks
    const tick = () => {
      setBlocks(bs => {
        const next: Block[] = [];
        const done: Block[] = [];
        for (const b of bs) {
          const newProgress = b.progress + 0.032;
          if (newProgress >= 1) {
            if (b.stage < PIPE_STAGES.length - 1) {
              next.push({ ...b, stage: b.stage + 1, progress: 0 });
            } else {
              done.push(b);
            }
          } else {
            next.push({ ...b, progress: newProgress });
          }
        }
        if (done.length) {
          setPublished(p => [
            ...done.map(d => ({ id: d.id, label: CONTENT_TYPES[d.typeIdx].label, color: CONTENT_TYPES[d.typeIdx].color })),
            ...p.slice(0, 5),
          ]);
        }
        return next;
      });
      frameRef.current = window.setTimeout(tick, 80);
    };
    frameRef.current = window.setTimeout(tick, 200);

    return () => {
      clearInterval(spawnTimer);
      if (frameRef.current) clearTimeout(frameRef.current);
    };
  }, [inView]);

  return (
    <div ref={ref} className="w-full">
      {/* Stage headers */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        {PIPE_STAGES.map((stage, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center border"
              style={{ backgroundColor: stage.color + "18", borderColor: stage.color + "50" }}>
              <stage.icon className="w-4 h-4" style={{ color: stage.color }} />
            </div>
            <span className="text-[10px] font-semibold text-white/50 text-center leading-tight">{stage.label}</span>
          </div>
        ))}
      </div>

      {/* Lane container */}
      <div className="relative h-28 rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden">
        {/* Stage dividers */}
        <div className="absolute inset-0 grid grid-cols-5">
          {PIPE_STAGES.map((stage, i) => (
            <div key={i} className="relative border-r border-white/5 last:border-0">
              <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${stage.color}06, transparent)` }} />
            </div>
          ))}
        </div>

        {/* Flowing particles background */}
        {inView && (
          <motion.div className="absolute inset-0 pointer-events-none"
            style={{ background: `linear-gradient(90deg, transparent, ${C.hex}04, transparent)` }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* Content blocks */}
        <AnimatePresence>
          {blocks.map(block => {
            const ct = CONTENT_TYPES[block.typeIdx];
            const stageWidth = 100 / PIPE_STAGES.length;
            const xPct = (block.stage + block.progress) * stageWidth;
            const yVariant = (block.id % 3) * 26 + 12;
            return (
              <motion.div key={block.id}
                className="absolute flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold border whitespace-nowrap"
                style={{
                  left: `${xPct}%`,
                  top: yVariant,
                  backgroundColor: ct.color + "18",
                  borderColor: ct.color + "50",
                  color: ct.color,
                  boxShadow: `0 0 8px ${ct.color}30`,
                  transform: "translateX(-50%)",
                }}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7, x: 30 }}
                transition={{ duration: 0.3 }}
              >
                <ct.icon className="w-3 h-3 flex-shrink-0" />
                {ct.label}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Published feed */}
      <div className="mt-4">
        <div className="text-[10px] font-semibold text-white/25 uppercase tracking-widest mb-2">Recently published</div>
        <div className="flex flex-wrap gap-2 min-h-[28px]">
          <AnimatePresence>
            {published.map(p => (
              <motion.div key={p.id}
                initial={{ opacity: 0, scale: 0.8, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full border text-[10px] font-medium"
                style={{ backgroundColor: p.color + "15", borderColor: p.color + "40", color: p.color }}
              >
                <span className="w-1 h-1 rounded-full bg-current animate-pulse" /> {p.label}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   AI Content Generator Terminal Preview
───────────────────────────────────────── */
const SAMPLES = [
  {
    type: "Blog Post",
    icon: FileText,
    color: "#818cf8",
    topic: "5 Ways AI Automation Saves 20h/Week",
    output: `# 5 Ways AI Automation Saves 20 Hours Per Week

Most business owners waste 20+ hours weekly on repetitive tasks that AI can handle in seconds. Here's exactly what to automate first.

**1. Email drafting and responses**
AI tools can draft 80% of your email responses. You review, tweak, and send — cutting email time from 2 hours to 25 minutes daily.

**2. Content repurposing across channels**
Turn one blog post into 10 social captions, 3 LinkedIn articles, and an email newsletter automatically...`,
  },
  {
    type: "Email Sequence",
    icon: Mail,
    color: "#34d399",
    topic: "7-Step Nurture Sequence — Cold Lead",
    output: `Subject: The #1 reason your funnel isn't converting (it's not the traffic)

Hi [First Name],

You're getting visitors. You're getting opt-ins.
But you're not getting clients.

Here's what 94% of businesses miss:

The problem isn't your offer. It's your follow-up. Most businesses abandon leads after 1–2 touchpoints. The data shows 80% of sales happen between touchpoint 5 and 12.

We built a system that changes that...`,
  },
  {
    type: "Reel Script",
    icon: Video,
    color: "#fb7185",
    topic: "Hook: AI handles my entire content calendar",
    output: `[HOOK — 0:00]
"I haven't written a single piece of content in 3 months. Here's what my AI does instead."

[PROBLEM — 0:04]
Cut to: calendar full of missed posting deadlines.
VO: "Most founders burn out creating content. It takes hours. It shows."

[SOLUTION — 0:09]
Cut to: content dashboard with 50+ pieces scheduled.
VO: "We built a pipeline. AI writes the first draft. Humans refine it. It publishes automatically."

[CTA — 0:18]
"Comment 'SYSTEM' and I'll send you the exact setup."`,
  },
];

function ContentGeneratorPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runTyping = (sampleIdx: number) => {
    const text = SAMPLES[sampleIdx].output;
    setDisplayed("");
    setIsTyping(true);
    let i = 0;
    const speed = 8;
    const tick = () => {
      i += 3;
      setDisplayed(text.slice(0, i));
      if (i < text.length) {
        typingRef.current = setTimeout(tick, speed);
      } else {
        setIsTyping(false);
      }
    };
    typingRef.current = setTimeout(tick, speed);
  };

  useEffect(() => {
    if (typingRef.current) clearTimeout(typingRef.current);
    if (inView) runTyping(selected);
    return () => { if (typingRef.current) clearTimeout(typingRef.current); };
  }, [selected, inView]);

  const sample = SAMPLES[selected];

  return (
    <div ref={ref} className="w-full">
      {/* Tab selector */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {SAMPLES.map((s, i) => {
          const isActive = selected === i;
          return (
            <button key={i} onClick={() => setSelected(i)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all"
              style={{
                backgroundColor: isActive ? s.color + "20" : "rgba(255,255,255,0.02)",
                borderColor: isActive ? s.color + "60" : "rgba(255,255,255,0.08)",
                color: isActive ? s.color : "rgba(255,255,255,0.4)",
              }}>
              <s.icon className="w-3 h-3" /> {s.type}
            </button>
          );
        })}
      </div>

      {/* Terminal */}
      <div className="rounded-2xl border border-white/10 bg-[#0a0a10] overflow-hidden">
        {/* Terminal chrome */}
        <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/5">
          <div className="flex gap-1.5">
            {["#ef4444","#f59e0b","#22c55e"].map(c => <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor:c }} />)}
          </div>
          <div className="flex-1 text-center">
            <span className="text-white/25 text-[11px] font-mono">acquirezen-ai — content-generator</span>
          </div>
          {isTyping && (
            <div className="flex items-center gap-1.5 text-amber-400 text-[10px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" /> generating...
            </div>
          )}
        </div>

        {/* Input */}
        <div className="px-5 py-3 border-b border-white/5 bg-white/[0.015]">
          <div className="flex items-center gap-3">
            <span className="text-amber-400 font-mono text-xs">$</span>
            <span className="font-mono text-xs text-white/40">generate --type=</span>
            <span className="font-mono text-xs" style={{ color: sample.color }}>{sample.type.toLowerCase().replace(" ", "-")}</span>
            <span className="font-mono text-xs text-white/40"> --topic=</span>
            <span className="font-mono text-xs text-white/60 truncate">"{sample.topic}"</span>
          </div>
        </div>

        {/* Output */}
        <div className="p-5 min-h-[260px] font-mono text-xs text-white/65 leading-relaxed whitespace-pre-wrap">
          {displayed}
          {isTyping && <span className="animate-pulse text-amber-400">▌</span>}
        </div>

        {/* Status bar */}
        <div className="px-5 py-2 border-t border-white/5 bg-white/[0.015] flex items-center gap-4 text-[10px] text-white/25 font-mono">
          <span>tokens: {Math.floor(displayed.length * 1.3)}</span>
          <span>•</span>
          <span>model: gpt-4o</span>
          <span>•</span>
          <span>voice-match: enabled</span>
          <span className="ml-auto" style={{ color: sample.color }}>✓ brand voice applied</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Pipeline Steps (How It Works)
───────────────────────────────────────── */
const PIPELINE = [
  { icon: Lightbulb,    label:"Topic Generation",   sublabel:"Research · SEO · Trends",       desc:"We research your niche, competitor gaps, and trending keywords to generate a rolling list of 30+ high-value topics monthly — sorted by search volume and conversion intent." },
  { icon: Cpu,          label:"AI Content Creation", sublabel:"GPT-4o · Brand-tuned · Draft", desc:"AI produces the first draft at scale — matching your brand voice, tone, and style guide. Blogs, scripts, captions, emails — all generated in minutes, not days." },
  { icon: PenLine,      label:"Editing & Formatting",sublabel:"Human review · Brand check",   desc:"Every piece is reviewed by a human editor for accuracy, brand alignment, and conversion quality. Nothing publishes without passing a quality check." },
  { icon: CalendarDays, label:"Scheduling",          sublabel:"Buffer · Later · CMS",          desc:"Approved content is scheduled directly into your CMS (WordPress, Webflow, HubSpot) and social queues via Buffer or Later — optimised for peak engagement times." },
  { icon: Globe,        label:"Publishing",          sublabel:"Auto-publish · Repurpose",      desc:"Content goes live automatically across every channel simultaneously. One piece becomes 10 — blog posts turn into reels, carousels, threads, and emails on autopilot." },
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
            <div className="w-2 h-2 rounded-full bg-amber-400" />
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
   Content Output Ticker
───────────────────────────────────────── */
function OutputTicker() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const items = [
    { label:"SEO Blog Post",      count:"4–8/mo",   icon:FileText, color:"#818cf8" },
    { label:"Email Newsletter",   count:"4/mo",     icon:Mail,     color:"#34d399" },
    { label:"Reel Scripts",       count:"16/mo",    icon:Video,    color:"#fb7185" },
    { label:"Social Captions",    count:"60+/mo",   icon:Hash,     color:"#f472b6" },
    { label:"LinkedIn Articles",  count:"8/mo",     icon:Rss,      color:"#60a5fa" },
    { label:"Ad Copy Variants",   count:"10+/mo",   icon:Globe,    color:"#f97316" },
    { label:"YouTube Scripts",    count:"4/mo",     icon:Image,    color:"#a78bfa" },
    { label:"Twitter Threads",    count:"20/mo",    icon:Sparkles, color:"#2dd4bf" },
  ];

  return (
    <div ref={ref} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {items.map((item, i) => (
        <motion.div key={i}
          initial={{ opacity:0, y:16 }}
          animate={inView ? { opacity:1, y:0 } : { opacity:0, y:16 }}
          transition={{ delay: i*0.07, duration:0.4, ease:[0.22,1,0.36,1] }}
          className="relative p-4 rounded-2xl border overflow-hidden"
          style={{ backgroundColor: item.color + "10", borderColor: item.color + "30" }}
        >
          <motion.div className="absolute inset-0 pointer-events-none"
            style={{ background: `linear-gradient(90deg, transparent, ${item.color}10, transparent)` }}
            animate={{ x:["-100%","200%"] }}
            transition={{ duration:3, delay:i*0.4, repeat:Infinity, repeatDelay:4 }}
          />
          <item.icon className="w-4 h-4 mb-3" style={{ color: item.color }} />
          <div className="text-xs text-white/55 font-medium leading-tight">{item.label}</div>
          <div className="text-sm font-bold mt-1" style={{ color: item.color }}>{item.count}</div>
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   Repurposing Flow Diagram
───────────────────────────────────────── */
function RepurposingFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const outputs = [
    { label:"3 LinkedIn posts",    color:"#60a5fa" },
    { label:"5 Twitter threads",   color:"#a78bfa" },
    { label:"1 Email newsletter",  color:"#34d399" },
    { label:"8 Social captions",   color:"#fb7185" },
    { label:"2 Reel scripts",      color:"#f97316" },
    { label:"1 YouTube script",    color:"#f472b6" },
  ];

  return (
    <div ref={ref} className="w-full">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Source */}
        <motion.div
          initial={{ opacity:0, scale:0.9 }}
          animate={inView ? { opacity:1, scale:1 } : { opacity:0, scale:0.9 }}
          transition={{ duration:0.6 }}
          className={`flex-shrink-0 p-6 rounded-2xl border ${C.border} ${C.bg} ${C.glow} text-center w-48`}
        >
          <FileText className={`w-8 h-8 ${C.text} mx-auto mb-3`} />
          <div className={`font-bold ${C.text} text-sm`}>1 Long-form<br />Blog Post</div>
          <div className="text-xs text-white/30 mt-1">~2,000 words</div>
        </motion.div>

        {/* Arrow / transform symbol */}
        <div className="flex flex-col items-center gap-2 flex-shrink-0">
          <motion.div
            initial={{ opacity:0 }} animate={inView ? { opacity:1 } : { opacity:0 }}
            transition={{ delay:0.4 }}
            className="relative"
          >
            <div className="hidden lg:block text-4xl text-white/10">→</div>
            <div className="lg:hidden text-4xl text-white/10">↓</div>
            <motion.div className={`absolute inset-0 flex items-center justify-center text-4xl ${C.text}`}
              animate={{ opacity:[0.3,1,0.3] }} transition={{ duration:1.5, repeat:Infinity }}>
              <Repeat className={`w-6 h-6 ${C.text}`} />
            </motion.div>
          </motion.div>
          <div className="text-xs text-amber-400/60 font-mono">auto-repurpose</div>
        </div>

        {/* Outputs grid */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
          {outputs.map((out, i) => (
            <motion.div key={i}
              initial={{ opacity:0, x:20, scale:0.9 }}
              animate={inView ? { opacity:1, x:0, scale:1 } : { opacity:0, x:20, scale:0.9 }}
              transition={{ delay: 0.3 + i*0.1, duration:0.4 }}
              className="flex items-center gap-2 p-3 rounded-xl border text-xs font-medium"
              style={{ backgroundColor: out.color + "12", borderColor: out.color + "35", color: out.color }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" />
              {out.label}
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div
        initial={{ opacity:0, y:8 }}
        animate={inView ? { opacity:1, y:0 } : { opacity:0, y:8 }}
        transition={{ delay:1 }}
        className="mt-6 text-center"
      >
        <span className="text-xs text-white/25">1 piece of content → </span>
        <span className={`text-xs font-bold ${C.text}`}>10x distribution across every channel</span>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Main Page
───────────────────────────────────────── */
export default function ContentCreationPage() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex flex-col justify-center pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(251,191,36,0.1),transparent)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_60%,rgba(251,146,60,0.07),transparent)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage:"linear-gradient(rgba(251,191,36,1) 1px,transparent 1px),linear-gradient(90deg,rgba(251,191,36,1) 1px,transparent 1px)", backgroundSize:"60px 60px" }} />

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
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                AI Content Creation
              </motion.div>

              <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.2 }}
                className="text-6xl md:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6">
                Content.<br />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${C.grad}`}>On Autopilot.</span>
              </motion.h1>

              <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.35 }}
                className="text-xl text-white/55 max-w-lg leading-relaxed mb-12">
                AI-powered systems that create and distribute content daily — blogs, reels, emails, scripts, and social posts — all without you lifting a finger.
              </motion.p>

              <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5 }}
                className="flex flex-wrap gap-4 items-center">
                <Link href="/#contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-amber-400 text-black font-bold text-base hover:bg-amber-300 shadow-[0_0_40px_rgba(251,191,36,0.35)] transition-all hover:shadow-[0_0_60px_rgba(251,191,36,0.55)] hover:scale-105">
                  Automate My Content <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="#workflow" className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all">
                  See the pipeline <ChevronDown className="w-4 h-4" />
                </a>
              </motion.div>

              <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.7 }}
                className="mt-14 grid grid-cols-3 gap-6">
                {[
                  { n:"10x",   l:"Content output vs in-house" },
                  { n:"+190%", l:"Organic traffic in 6 months" },
                  { n:"Daily", l:"Publishing cadence, always" },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className={`text-3xl font-bold ${C.text} mb-1`}>{s.n}</div>
                    <div className="text-xs text-white/40">{s.l}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Hero: live pipeline preview */}
            <motion.div initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.8, delay:0.4 }}
              className="hidden lg:block relative">
              <div className={`rounded-3xl border ${C.border} bg-white/[0.02] overflow-hidden p-6`}
                style={{ boxShadow:"0 0 80px rgba(251,191,36,0.08)" }}>
                <div className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">Content pipeline — live</div>
                <FlowingPipeline />
              </div>
              <motion.div animate={{ y:[-4,4,-4] }} transition={{ duration:3, repeat:Infinity, ease:"easeInOut" }}
                className="absolute -top-4 -right-4 px-4 py-2 rounded-full bg-green-400/15 border border-green-400/30 text-green-400 text-xs font-semibold">
                ● Auto-publishing
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Content is your biggest<br />growth lever. And your biggest bottleneck.</h2>
            <p className="text-white/45 text-lg max-w-xl mb-16">Every day without content is a day your competitors are building authority, ranking on Google, and staying top-of-mind with your customers.</p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon:Clock,        title:"Content Takes Too Much Time",   stat:"8h+",    statL:"spent per piece of quality content",       body:"The average founder spends 8+ hours per blog post — research, writing, editing, formatting, publishing. That's a full day every week just on one content type, with nothing left for strategy." },
              { icon:TrendingDown, title:"Inconsistent Posting Kills Growth", stat:"3x",  statL:"slower growth from inconsistent publishing", body:"The algorithm rewards consistency above everything else. Businesses that post sporadically grow 3x slower than those with a daily cadence — regardless of content quality." },
              { icon:AlertCircle,  title:"Low-Quality Output at Scale",   stat:"73%",    statL:"of outsourced content misses brand voice",    body:"Generic content mills produce generic content. AI without human oversight sounds robotic. Most outsourced content fails because it doesn't sound like you or speak directly to your audience." },
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
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">Our System</p>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">AI speed.<br />Human quality.</h2>
                <p className="text-white/50 text-lg leading-relaxed mb-10">
                  We don't just use AI to dump generic text. We build a tuned content system that learns your voice, your audience, and your goals — then produces and distributes content daily without your involvement.
                </p>
              </FadeIn>
              <div className="space-y-5">
                {[
                  { icon:Cpu,          label:"AI Content Pipelines",          detail:"Custom GPT-4o pipelines trained on your brand voice, past content, and audience data — producing first drafts in minutes that sound genuinely like you." },
                  { icon:FileText,     label:"Blogs, Reels, Emails & Scripts", detail:"Every content format, handled. Long-form SEO blogs, short-form reel scripts, weekly email newsletters, ad copy, LinkedIn articles, YouTube scripts — all covered." },
                  { icon:Send,         label:"Automated Publishing",           detail:"Content is formatted and pushed directly to your CMS, social scheduler, and email tool — no copy-pasting, no manual uploads. It just goes out." },
                  { icon:Repeat,       label:"1-to-10 Repurposing System",    detail:"One blog post becomes 8 social captions, 3 LinkedIn articles, an email, a reel script, and 5 Twitter threads — automatically. Every piece of content multiplies." },
                  { icon:BarChart3,    label:"SEO & Performance Tracking",    detail:"Every blog is keyword-mapped before writing. Performance data (rankings, traffic, engagement) feeds back into the content strategy monthly." },
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

            {/* Monthly output card */}
            <FadeIn direction="right" delay={0.2}>
              <div className={`relative rounded-3xl border ${C.border} bg-white/[0.02] p-8`}>
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-transparent pointer-events-none rounded-3xl" />
                <div className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">Monthly content output</div>
                <OutputTicker />
                <div className="mt-6 pt-5 border-t border-white/5 space-y-2.5">
                  <div className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Also included</div>
                  {[
                    "Brand voice guide development",
                    "SEO keyword research & content mapping",
                    "CMS + scheduler integration setup",
                    "Monthly performance report",
                    "Repurposing workflow across all formats",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-white/55">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${C.text} flex-shrink-0`} />
                      {item}
                    </div>
                  ))}
                </div>
                <motion.div animate={{ y:[-4,4,-4] }} transition={{ duration:3, repeat:Infinity, ease:"easeInOut" }}
                  className="absolute -top-4 -right-4 px-4 py-2 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-400 text-xs font-semibold">
                  ● 10x output
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
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">How It Works</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Five steps from idea<br />to published.</h2>
            <p className="text-white/45 text-lg max-w-xl mx-auto">Every piece of content follows the same engineered pipeline — from topic generation to live publication, without you managing anything.</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02]">
              <PipelineViz />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── SECTION 4: VISUAL WORKFLOW ── */}
      <section id="workflow" className="py-28 bg-white/[0.015] border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">Visual Workflow</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Watch your content<br />flow through the system.</h2>
            <p className="text-white/45 text-lg max-w-xl mx-auto">This is the live content pipeline — every type of content moving from creation to publication automatically across your channels.</p>
          </FadeIn>

          {/* Live flowing pipeline */}
          <FadeIn delay={0.1}>
            <div className="p-8 rounded-3xl border border-amber-400/10 bg-white/[0.02] mb-10">
              <div className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-6">Live content flow</div>
              <FlowingPipeline />
            </div>
          </FadeIn>

          {/* AI Generator preview */}
          <FadeIn delay={0.15} className="mb-10">
            <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02]">
              <div className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-2">AI content generator</div>
              <p className="text-white/35 text-sm mb-6">Click a content type to see the AI write it in real time, brand-tuned to your voice.</p>
              <ContentGeneratorPreview />
            </div>
          </FadeIn>

          {/* Repurposing flow */}
          <FadeIn delay={0.2}>
            <div className="p-8 rounded-3xl border border-amber-400/10 bg-white/[0.02]">
              <div className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-2">1-to-10 repurposing system</div>
              <p className="text-white/35 text-sm mb-8">One long-form piece automatically becomes content for every channel.</p>
              <RepurposingFlow />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── SECTION 5: RESULTS ── */}
      <section className="py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">Results</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">What consistent content<br />does to your business.</h2>
            <p className="text-white/45 text-lg max-w-xl mx-auto">Clients across coaching, SaaS, and B2B services see measurable results within the first 90 days of running an automated content system.</p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {[
              { icon:Sparkles,   metric:"Daily",  metricLabel:"Publishing cadence maintained forever", title:"Consistent Content, Always", body:"The biggest advantage of an AI content system is that it never has bad days, never gets writer's block, and never misses a deadline. Your brand is visible daily, across every channel, every week of the year." },
              { icon:TrendingUp, metric:"+190%",  metricLabel:"Organic search traffic in 6 months",   title:"Higher Engagement & Traffic", body:"Businesses that publish consistently see 3x more organic search traffic in 6 months. Our SEO-mapped blogs compound over time — each post generates traffic for years, not days." },
              { icon:Clock,      metric:"20h+",   metricLabel:"Per week reclaimed per founder",        title:"Your Time Back",             body:"The average founder spends 20+ hours per week on content. Our system eliminates that entirely. You approve, we execute — from brief to published in 24 hours, hands-free." },
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
            <div className={`p-8 rounded-3xl border ${C.border} bg-amber-400/[0.04] relative overflow-hidden`}>
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-400 to-transparent rounded-l-3xl" />
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <p className="text-white/70 text-lg leading-relaxed italic mb-4">
                    "I was spending every Sunday writing content for the week ahead. Now I haven't written a single post in four months. The system produces better content than I did, posts daily across four platforms, and our organic leads doubled in three months."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${C.bg} border ${C.border} flex items-center justify-center ${C.text} font-bold text-sm`}>M</div>
                    <div>
                      <div className="text-white font-semibold text-sm">Marcus J.</div>
                      <div className="text-white/35 text-xs">Founder, Meridian Strategy — B2B Consulting</div>
                    </div>
                  </div>
                </div>
                <div className="md:w-48 grid grid-cols-2 gap-3 text-center">
                  {[{v:"2x",l:"Organic leads"},{v:"20h",l:"Saved/week"},{v:"4",l:"Platforms"},{v:"Daily",l:"Publishing"}].map(s => (
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(251,191,36,0.1),transparent)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_20%_50%,rgba(251,146,60,0.07),transparent)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage:"linear-gradient(rgba(251,191,36,1) 1px,transparent 1px),linear-gradient(90deg,rgba(251,191,36,1) 1px,transparent 1px)", backgroundSize:"60px 60px" }} />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <FadeIn>
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${C.bg} border ${C.border} ${C.text} text-xs font-semibold uppercase tracking-widest mb-8`}>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Ready to automate?
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Automate<br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${C.grad}`}>My Content</span>
            </h2>
            <p className="text-white/50 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
              Book a free 30-minute content audit. We'll review what you're currently producing, where the gaps are, and show you exactly how an AI pipeline would work for your business.
            </p>
            <Link href="/#contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full bg-amber-400 text-black font-bold text-lg hover:bg-amber-300 shadow-[0_0_50px_rgba(251,191,36,0.4)] transition-all hover:shadow-[0_0_80px_rgba(251,191,36,0.6)] hover:scale-105">
              Book a Free Content Audit <ArrowRight className="w-5 h-5" />
            </Link>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/30">
              {["Free content audit","10x output","No copywriting needed","Daily publishing"].map((t, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400/60" /> {t}
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
