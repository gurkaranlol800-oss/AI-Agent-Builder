import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  Clock,
  FolderX,
  Workflow,
  Plug,
  Bell,
  BarChart3,
  Zap,
  RefreshCw,
  Database,
  Mail,
  MessageSquare,
  GitBranch,
  LayoutDashboard,
  UserCheck,
} from "lucide-react";
import Navbar from "@/components/Navbar";

/* ─────────────────────────────────────────
   Theme
───────────────────────────────────────── */
const C = {
  text:   "text-orange-400",
  bg:     "bg-orange-400/10",
  border: "border-orange-400/30",
  glow:   "shadow-[0_0_24px_rgba(251,146,60,0.35)]",
  hex:    "#fb923c",
  grad:   "from-orange-400 to-amber-500",
};

/* ─────────────────────────────────────────
   FadeIn
───────────────────────────────────────── */
function FadeIn({ children, className = "", delay = 0, direction = "up" }: {
  children: React.ReactNode; className?: string; delay?: number; direction?: "up"|"left"|"right"|"none";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref}
      variants={{ hidden: { opacity:0, y:direction==="up"?30:0, x:direction==="left"?-30:direction==="right"?30:0 }, visible:{opacity:1,y:0,x:0} }}
      initial="hidden" animate={inView?"visible":"hidden"}
      transition={{ duration:0.65, delay, ease:[0.22,1,0.36,1] }}
      className={className}
    >{children}</motion.div>
  );
}

/* ─────────────────────────────────────────
   Animated Pipeline Steps
───────────────────────────────────────── */
const PIPELINE = [
  { icon: UserCheck,       label: "Lead Enters System",      sublabel: "Form · Chat · Ads",       desc: "A new lead arrives — from a web form, ad click, or chat — and is instantly captured into your CRM with full source tracking." },
  { icon: RefreshCw,       label: "Data Synced Across Tools", sublabel: "CRM · Sheets · Notion",   desc: "The contact record, tags, and lead score are synced in real time across every connected platform — no copy-pasting, ever." },
  { icon: Mail,            label: "Follow-ups Triggered",    sublabel: "Email · SMS · LinkedIn",   desc: "Behaviour-based sequences fire automatically: welcome email, discovery questionnaire, nurture content — all timed and personalised." },
  { icon: Bell,            label: "Notifications Sent",      sublabel: "Slack · Email · SMS",      desc: "Your team receives an instant Slack or email alert with the lead's details, score, and a one-click link to their CRM record." },
  { icon: LayoutDashboard, label: "Pipeline Updated",        sublabel: "Instant · Accurate",       desc: "The deal stage, probability, and expected close date update automatically based on engagement signals — your pipeline is always live." },
];

function PipelineViz() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => setActive(p => (p + 1) % PIPELINE.length), 2000);
    return () => clearInterval(t);
  }, [inView]);

  return (
    <div ref={ref} className="w-full">
      {/* Desktop */}
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
            <div className="w-2 h-2 rounded-full bg-orange-400" />
            <span className={`font-semibold ${C.text}`}>Step {active + 1}: {PIPELINE[active].label}</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{PIPELINE[active].desc}</p>
        </motion.div>
      </div>

      {/* Mobile */}
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
   Workflow Diagram
   Nodes + animated glowing SVG connections
───────────────────────────────────────── */
type NodeDef = { id: string; label: string; sublabel: string; icon: React.ElementType; x: number; y: number; color: string };
type EdgeDef = { from: string; to: string; delay: number };

const NODES: NodeDef[] = [
  { id:"lead",     label:"Lead Arrives",   sublabel:"Form / Chat / Ad",   icon:UserCheck,      x:50,  y:50,  color:"#fb923c" },
  { id:"n8n",      label:"n8n / Zapier",   sublabel:"Automation core",    icon:Workflow,        x:250, y:50,  color:"#f59e0b" },
  { id:"crm",      label:"CRM",            sublabel:"HubSpot / Pipedrive", icon:Database,        x:450, y:50,  color:"#fb923c" },
  { id:"email",    label:"Email Sequence", sublabel:"Gmail / Outlook",     icon:Mail,            x:250, y:200, color:"#f97316" },
  { id:"slack",    label:"Slack Alert",    sublabel:"Team notifications",  icon:MessageSquare,   x:450, y:200, color:"#fb923c" },
  { id:"branch",   label:"If / Else Logic",sublabel:"Score · Tag · Route", icon:GitBranch,       x:650, y:125, color:"#f59e0b" },
  { id:"pipeline", label:"Pipeline",       sublabel:"Stage updated live",  icon:LayoutDashboard, x:850, y:125, color:"#fb923c" },
];

const EDGES: EdgeDef[] = [
  { from:"lead",  to:"n8n",      delay:0    },
  { from:"n8n",   to:"crm",      delay:0.4  },
  { from:"n8n",   to:"email",    delay:0.6  },
  { from:"crm",   to:"slack",    delay:0.9  },
  { from:"crm",   to:"branch",   delay:1.1  },
  { from:"email", to:"branch",   delay:1.3  },
  { from:"branch",to:"pipeline", delay:1.6  },
];

function getCenter(nodes: NodeDef[], id: string) {
  const n = nodes.find(x => x.id === id)!;
  return { x: n.x + 50, y: n.y + 35 };
}

function WorkflowDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [lit, setLit] = useState<Set<string>>(new Set());
  const [activeNode, setActiveNode] = useState<string | null>(null);

  useEffect(() => {
    if (!inView) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    EDGES.forEach(e => {
      const t = setTimeout(() => {
        setLit(prev => new Set([...prev, `${e.from}-${e.to}`]));
        setActiveNode(e.to);
        setTimeout(() => setActiveNode(null), 400);
      }, e.delay * 1000 + 600);
      timers.push(t);
    });
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  // SVG viewport
  const W = 960, H = 280;

  return (
    <div ref={ref} className="w-full overflow-x-auto">
      <div className="relative" style={{ minWidth: 680 }}>
        {/* SVG edges layer */}
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
        >
          <defs>
            <filter id="glow-orange">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          {EDGES.map(e => {
            const from = getCenter(NODES, e.from);
            const to   = getCenter(NODES, e.to);
            const isLit = lit.has(`${e.from}-${e.to}`);
            const mx = (from.x + to.x) / 2;

            return (
              <g key={`${e.from}-${e.to}`}>
                {/* Base dim line */}
                <path
                  d={`M ${from.x} ${from.y} C ${mx} ${from.y} ${mx} ${to.y} ${to.x} ${to.y}`}
                  fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5"
                />
                {/* Animated glow line */}
                {isLit && (
                  <motion.path
                    d={`M ${from.x} ${from.y} C ${mx} ${from.y} ${mx} ${to.y} ${to.x} ${to.y}`}
                    fill="none" stroke="#fb923c" strokeWidth="2"
                    filter="url(#glow-orange)"
                    initial={{ pathLength:0, opacity:0 }}
                    animate={{ pathLength:1, opacity:[0.5, 1, 0.7] }}
                    transition={{ duration:0.7, ease:"easeOut" }}
                  />
                )}
                {/* Traveling dot */}
                {isLit && (
                  <motion.circle r="4" fill="#fb923c" filter="url(#glow-orange)"
                    initial={{ offsetDistance:"0%", opacity:0 }}
                    animate={{ opacity:[0,1,1,0] }}
                    style={{ offsetPath:`path("M ${from.x} ${from.y} C ${mx} ${from.y} ${mx} ${to.y} ${to.x} ${to.y}")` } as React.CSSProperties}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Nodes */}
        <div className="relative" style={{ height: H }}>
          {NODES.map(node => {
            const isActive = activeNode === node.id;
            const isConnected = [...lit].some(k => k.endsWith(`-${node.id}`) || k.startsWith(`${node.id}-`));
            return (
              <motion.div
                key={node.id}
                className={`absolute flex flex-col items-center cursor-default`}
                style={{ left: node.x, top: node.y, width: 100 }}
                animate={{ scale: isActive ? 1.08 : 1 }}
                transition={{ duration: 0.25 }}
              >
                <div
                  className={`w-[100px] h-[70px] rounded-2xl border flex flex-col items-center justify-center gap-1 transition-all duration-500 ${
                    isConnected
                      ? "bg-orange-400/15 border-orange-400/50 shadow-[0_0_18px_rgba(251,146,60,0.4)]"
                      : "bg-white/[0.04] border-white/10"
                  }`}
                >
                  <node.icon className={`w-5 h-5 transition-colors duration-500 ${isConnected ? "text-orange-400" : "text-white/30"}`} />
                  <span className={`text-[11px] font-semibold text-center leading-tight transition-colors duration-500 ${isConnected ? "text-white/90" : "text-white/40"}`}>
                    {node.label}
                  </span>
                </div>
                <span className="text-[10px] text-white/25 mt-1.5 text-center">{node.sublabel}</span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 justify-center">
        {[
          { label: "Data source", color: "bg-white/10 border-white/10" },
          { label: "Automation engine", color: "bg-amber-400/15 border-amber-400/30" },
          { label: "Live connection", color: "bg-orange-400/15 border-orange-400/40" },
        ].map(l => (
          <div key={l.label} className="flex items-center gap-2 text-xs text-white/35">
            <div className={`w-3 h-3 rounded border ${l.color}`} />
            {l.label}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Main Page
───────────────────────────────────────── */
export default function CrmAutomationPage() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex flex-col justify-center pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(251,146,60,0.11),transparent)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_60%,rgba(245,158,11,0.07),transparent)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage:"linear-gradient(rgba(251,146,60,1) 1px,transparent 1px),linear-gradient(90deg,rgba(251,146,60,1) 1px,transparent 1px)", backgroundSize:"60px 60px" }} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
            <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors mb-12 group text-sm">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
            </Link>
          </motion.div>

          <div className="max-w-4xl">
            <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${C.bg} border ${C.border} ${C.text} text-xs font-semibold uppercase tracking-widest mb-6`}>
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              CRM & Pipeline Automation
            </motion.div>

            <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.2 }}
              className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight mb-6">
              Your Business.<br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${C.grad}`}>Fully Automated.</span>
            </motion.h1>

            <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.35 }}
              className="text-xl md:text-2xl text-white/55 max-w-2xl leading-relaxed mb-12">
              Connect every tool, automate every step, eliminate every minute of manual work — so your team focuses on closing, not admin.
            </motion.p>

            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5 }}
              className="flex flex-wrap gap-4 items-center">
              <Link href="/#contact"
                className={`inline-flex items-center gap-2 px-8 py-4 rounded-full bg-orange-400 text-black font-bold text-base hover:bg-orange-300 shadow-[0_0_40px_rgba(251,146,60,0.35)] transition-all hover:shadow-[0_0_60px_rgba(251,146,60,0.55)] hover:scale-105`}>
                Automate My Backend <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="#workflow" className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all">
                See the system <ChevronDown className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.7 }}
            className="mt-20 grid grid-cols-3 gap-6 max-w-2xl">
            {[
              { n:"90%",  l:"Less manual data entry" },
              { n:"3x",   l:"Faster response times" },
              { n:"Zero", l:"Leads lost to follow-up" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className={`text-3xl font-bold ${C.text} mb-1`}>{s.n}</div>
                <div className="text-xs text-white/40">{s.l}</div>
              </div>
            ))}
          </motion.div>
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Your pipeline is leaking<br />revenue every day.</h2>
            <p className="text-white/45 text-lg max-w-xl mb-16">Without automation, your CRM is out of date, leads fall through the cracks, and your team wastes hours on work a computer should do.</p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon:FolderX,      title:"Leads Get Lost",                stat:"27%",   statL:"of leads never followed up",     body:"Without automated routing and reminders, hot leads sit uncontacted until they go cold. A lead that isn't followed up in 5 minutes is 21x less likely to convert." },
              { icon:Clock,        title:"Manual Updates Waste Time",      stat:"6h/wk", statL:"wasted on manual CRM updates",   body:"Your team spends hours every week copying data between tools, updating deal stages, and chasing colleagues for status updates — none of which closes business." },
              { icon:AlertTriangle,title:"No Single Source of Truth",      stat:"68%",   statL:"of CRM data is incomplete",      body:"When data lives in spreadsheets, inboxes, and siloed tools, nothing is accurate. Decisions get made on outdated information and opportunities disappear silently." },
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
                <p className="text-xs font-semibold uppercase tracking-widest text-orange-400 mb-3">Our System</p>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">One unified backend.<br />Everything connected.</h2>
                <p className="text-white/50 text-lg leading-relaxed mb-10">
                  We audit your entire toolstack, map your existing processes, and build an automation layer that connects everything — so your CRM, email, Slack, and reporting all work as one system.
                </p>
              </FadeIn>
              <div className="space-y-5">
                {[
                  { icon:Plug,          label:"Deep Tool Integrations",       detail:"n8n, Zapier, and direct APIs connect HubSpot, Pipedrive, Salesforce, Notion, Airtable, GoHighLevel — and any other tool in your stack.",           },
                  { icon:Workflow,      label:"Automated Workflows End-to-End",detail:"Every repetitive process — data entry, follow-up, deal updates, reporting — is mapped into a workflow that runs without human input.",             },
                  { icon:RefreshCw,     label:"Real-Time Sync Across Tools",   detail:"Lead interactions trigger instant updates. An email opened, a form filled, a call booked — every event flows through the system in seconds.",      },
                  { icon:Bell,          label:"Smart Team Notifications",      detail:"Your team gets Slack pings and email alerts exactly when they need them — qualified lead arrives, deal goes cold, meeting confirmed.",               },
                  { icon:BarChart3,     label:"Live Reporting Dashboard",      detail:"A custom dashboard shows pipeline value, conversion rates, deal velocity, and revenue forecast — updated automatically, no manual pulls.",           },
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

            {/* Tool ecosystem card */}
            <FadeIn direction="right" delay={0.2}>
              <div className="relative rounded-3xl border border-orange-400/10 bg-white/[0.02] p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 to-transparent pointer-events-none rounded-3xl" />
                <div className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-5">Tools we integrate with</div>

                {/* Tool grid */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {["HubSpot","Salesforce","Pipedrive","GoHighLevel","Notion","Airtable","n8n","Zapier","Make","Gmail","Slack","Calendly","Stripe","ActiveCampaign","Typeform"].map(t => (
                    <span key={t} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium">{t}</span>
                  ))}
                </div>

                {/* Live event feed */}
                <div className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Live automation events</div>
                <div className="space-y-2.5">
                  {[
                    { ev:"Lead submitted form",      out:"HubSpot contact created + tagged",      t:"0.3s" },
                    { ev:"Email opened by prospect", out:"Deal stage updated → Follow-up queued", t:"1.1s" },
                    { ev:"Meeting booked via Cal.",   out:"Slack alert + pre-call email sent",     t:"0.8s" },
                    { ev:"Deal inactive 7 days",     out:"Re-engagement sequence triggered",       t:"auto" },
                  ].map((row, i) => (
                    <motion.div key={i} initial={{ opacity:0, x:16 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.4 + i * 0.15 }}
                      className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${i===3?"bg-orange-400 animate-pulse":"bg-green-400"}`} />
                      <span className="text-white/50 flex-1">{row.ev}</span>
                      <span className="text-orange-400/70 hidden sm:inline">→ {row.out}</span>
                      <span className="text-white/20 ml-1">{row.t}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 pt-5 border-t border-white/5 grid grid-cols-3 gap-3 text-center">
                  {[{v:"24/7",l:"Always running"},{v:"0ms",l:"Human delay"},{v:"100%",l:"Accuracy"}].map(s => (
                    <div key={s.l}>
                      <div className={`text-xl font-bold ${C.text}`}>{s.v}</div>
                      <div className="text-[11px] text-white/30">{s.l}</div>
                    </div>
                  ))}
                </div>

                <motion.div animate={{ y:[-4,4,-4] }} transition={{ duration:3, repeat:Infinity, ease:"easeInOut" }}
                  className="absolute -top-4 -right-4 px-4 py-2 rounded-full bg-green-400/15 border border-green-400/30 text-green-400 text-xs font-semibold">
                  ● All systems live
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
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-400 mb-3">How It Works</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">From lead entry to closed deal<br />— fully on autopilot.</h2>
            <p className="text-white/45 text-lg max-w-xl mx-auto">Five automated steps that replace an entire day of admin work. Every step runs without a human touching it.</p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02]">
              <PipelineViz />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── SECTION 4: WORKFLOW DIAGRAM ── */}
      <section id="workflow" className="py-28 bg-white/[0.015] border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-400 mb-3">System Architecture</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Your automation network,<br />visualised.</h2>
            <p className="text-white/45 text-lg max-w-xl mx-auto">
              Every node is a real tool in your stack. Every glowing connection is a live automation running right now — triggered by real events.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="p-8 rounded-3xl border border-orange-400/10 bg-white/[0.02] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/3 to-transparent pointer-events-none rounded-3xl" />
              <WorkflowDiagram />
            </div>
          </FadeIn>

          {/* Callout strip */}
          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            {[
              { icon:Zap,       title:"Event-Driven",   body:"Every automation fires on a real trigger — no scheduled batches, no delays." },
              { icon:GitBranch, title:"Logic Branching", body:"If/else routing sends leads down the right path based on score, source, or behaviour." },
              { icon:RefreshCw, title:"Two-Way Sync",    body:"Changes in any tool propagate to all others instantly — always one source of truth." },
            ].map((c, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className={`p-5 rounded-2xl border ${C.border} ${C.bg} flex gap-3`}>
                  <c.icon className={`w-5 h-5 ${C.text} flex-shrink-0 mt-0.5`} />
                  <div>
                    <div className={`font-semibold text-sm ${C.text} mb-1`}>{c.title}</div>
                    <div className="text-xs text-white/45 leading-relaxed">{c.body}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: RESULTS ── */}
      <section className="py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-400 mb-3">Results</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">What your business looks like<br />after automation.</h2>
            <p className="text-white/45 text-lg max-w-xl mx-auto">Clients describe it as "hiring a full-time ops person who never sleeps and never makes mistakes."</p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {[
              { icon:Workflow,  metric:"Zero",  metricLabel:"Minutes of manual data entry per day",  title:"Zero Manual Work",          body:"Every update, tag, email, and notification happens automatically. Your team opens the CRM and everything is already done — no touching required." },
              { icon:Zap,       metric:"3x",    metricLabel:"Faster response to new leads",          title:"Faster Response Times",     body:"Leads are routed, alerted, and contacted in seconds — not hours. Response time is the single biggest driver of lead conversion rates." },
              { icon:BarChart3, metric:"100%",  metricLabel:"Pipeline accuracy at all times",        title:"A Fully Organized Pipeline", body:"Every deal is in the right stage, with the right data, updated in real time. Your pipeline is a reliable forecast — not a guess." },
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
            <div className="p-8 rounded-3xl border border-orange-400/15 bg-orange-400/[0.04] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-orange-400 to-transparent rounded-l-3xl" />
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <p className="text-white/70 text-lg leading-relaxed italic mb-4">
                    "Our ops used to take 2 hours every morning — updating HubSpot, sending follow-ups, writing Slack updates. Now it all happens automatically before anyone logs in. We've saved 40+ hours a month and our pipeline is always accurate."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${C.bg} border ${C.border} flex items-center justify-center ${C.text} font-bold text-sm`}>M</div>
                    <div>
                      <div className="text-white font-semibold text-sm">Marcus T.</div>
                      <div className="text-white/35 text-xs">Operations Director, GrowthStack Agency</div>
                    </div>
                  </div>
                </div>
                <div className="md:w-48 grid grid-cols-2 gap-3 text-center">
                  {[{v:"40h",l:"Saved monthly"},{v:"0",l:"Manual updates"},{v:"3x",l:"Faster response"},{v:"100%",l:"Pipeline accuracy"}].map(s => (
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(251,146,60,0.1),transparent)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_20%_50%,rgba(245,158,11,0.06),transparent)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage:"linear-gradient(rgba(251,146,60,1) 1px,transparent 1px),linear-gradient(90deg,rgba(251,146,60,1) 1px,transparent 1px)", backgroundSize:"60px 60px" }} />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <FadeIn>
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${C.bg} border ${C.border} ${C.text} text-xs font-semibold uppercase tracking-widest mb-8`}>
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              Ready to automate?
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Automate<br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${C.grad}`}>My Backend</span>
            </h2>
            <p className="text-white/50 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
              Book a free 30-minute strategy call. We'll audit your current workflow, map out exactly where you're losing time, and show you a deployment plan.
            </p>
            <Link href="/#contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full bg-orange-400 text-black font-bold text-lg hover:bg-orange-300 shadow-[0_0_50px_rgba(251,146,60,0.4)] transition-all hover:shadow-[0_0_80px_rgba(251,146,60,0.6)] hover:scale-105">
              Book a Free Strategy Call <ArrowRight className="w-5 h-5" />
            </Link>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/30">
              {["Free workflow audit","No commitment","Live in 2 weeks","Zero manual work"].map((t, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-400/60" /> {t}
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
