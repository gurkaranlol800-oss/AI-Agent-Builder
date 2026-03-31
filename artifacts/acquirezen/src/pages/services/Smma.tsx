import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ArrowRight, ChevronDown, CheckCircle2,
  TrendingDown, AlertCircle, Clock,
  Megaphone, BarChart3, Target, Zap, Brain,
  Heart, MessageCircle, Share2, Bookmark,
  Play, Image, Hash, Users,
  TrendingUp, Eye, MousePointerClick,
} from "lucide-react";
import Navbar from "@/components/Navbar";

/* ─── Theme: rose/pink ─── */
const C = {
  text:   "text-rose-400",
  bg:     "bg-rose-400/10",
  border: "border-rose-400/30",
  glow:   "shadow-[0_0_24px_rgba(251,113,133,0.35)]",
  hex:    "#fb7185",
  grad:   "from-rose-400 to-pink-500",
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
   Animated Social Feed Mockup
───────────────────────────────────────── */
const POSTS = [
  {
    platform: "Instagram",
    color: "#e1306c",
    handle: "@yourband_co",
    time: "2h ago",
    type: "reel",
    caption: "3 reasons your agency isn't growing 📈 (and how AI fixes it)",
    tags: "#SMMA #AgencyGrowth #AI",
    likes: 847,
    comments: 64,
    shares: 129,
    views: "12.4k",
  },
  {
    platform: "LinkedIn",
    color: "#0077b5",
    handle: "Your Brand",
    time: "5h ago",
    type: "carousel",
    caption: "We went from 0 → 40 qualified leads/month using one simple system. Here's exactly how (swipe →)",
    tags: "#B2B #LeadGen #Marketing",
    likes: 312,
    comments: 48,
    shares: 91,
    views: "8.7k",
  },
  {
    platform: "TikTok",
    color: "#69c9d0",
    handle: "@yourbrand",
    time: "1d ago",
    type: "video",
    caption: "POV: Your AI agent just booked 11 calls while you slept 😴",
    tags: "#AIAutomation #Business #TikTokMarketing",
    likes: 2840,
    comments: 183,
    shares: 447,
    views: "68.2k",
  },
  {
    platform: "Instagram",
    color: "#e1306c",
    handle: "@yourband_co",
    time: "2d ago",
    type: "image",
    caption: "Client result: from 3 → 34 booked calls/month in 6 weeks 🚀",
    tags: "#ClientResults #CaseStudy #Marketing",
    likes: 1203,
    comments: 97,
    shares: 218,
    views: "21.9k",
  },
];

const PLATFORM_COLORS: Record<string, string> = {
  Instagram: "#e1306c",
  LinkedIn:  "#0077b5",
  TikTok:    "#69c9d0",
};

function SocialFeedMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [visiblePosts, setVisiblePosts] = useState<number[]>([]);
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>({});

  useEffect(() => {
    if (!inView) return;
    POSTS.forEach((_, i) => {
      const t = setTimeout(() => {
        setVisiblePosts(p => [...p, i]);
        setLikeCounts(lc => ({ ...lc, [i]: POSTS[i].likes }));
      }, i * 700 + 400);
      return () => clearTimeout(t);
    });
  }, [inView]);

  const handleLike = (i: number) => {
    setLikeCounts(lc => ({ ...lc, [i]: (lc[i] || POSTS[i].likes) + 1 }));
  };

  return (
    <div ref={ref} className="w-full">
      {/* Phone chrome */}
      <div className="relative rounded-[2.5rem] border-2 border-white/10 bg-[#0d0d14] overflow-hidden shadow-[0_0_60px_rgba(251,113,133,0.12)]" style={{ maxWidth: 420, margin: "0 auto" }}>
        {/* Status bar */}
        <div className="flex items-center justify-between px-6 pt-4 pb-1 relative">
          <span className="text-white/30 text-xs">9:41 AM</span>
          <div className="w-20 h-5 rounded-full bg-black absolute top-0 left-1/2 -translate-x-1/2" />
          <div className="flex gap-1">{[1,2,3].map(i=><div key={i} className="w-1 h-1 rounded-full bg-white/30"/>)}</div>
        </div>

        {/* App header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
          <span className="text-white font-bold text-base">For You</span>
          <div className="flex gap-3">
            <Hash className="w-5 h-5 text-white/30" />
            <Megaphone className="w-5 h-5 text-white/30" />
          </div>
        </div>

        {/* Stories row */}
        <div className="flex gap-3 px-4 py-3 overflow-x-auto border-b border-white/5" style={{ scrollbarWidth: "none" }}>
          {["Your Story", "Agency", "Results", "BTS", "Tips"].map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-1 flex-shrink-0">
              <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${i === 0 ? "border-dashed border-white/20 bg-white/5" : "border-rose-400/60 bg-rose-400/10"}`}>
                <span className="text-[10px] text-white/50">{s[0]}</span>
              </div>
              <span className="text-[9px] text-white/30">{s}</span>
            </div>
          ))}
        </div>

        {/* Posts feed */}
        <div className="overflow-y-auto" style={{ height: 480 }}>
          <AnimatePresence>
            {visiblePosts.map(i => {
              const post = POSTS[i];
              const color = PLATFORM_COLORS[post.platform];
              return (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-white/5 pb-1"
                >
                  {/* Post header */}
                  <div className="flex items-center gap-2 px-4 py-2.5">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: color + "33", border: `1.5px solid ${color}60` }}>
                      {post.handle[1].toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-xs font-semibold truncate">{post.handle}</div>
                      <div className="text-white/30 text-[10px]">{post.platform} · {post.time}</div>
                    </div>
                    <div className="px-2 py-0.5 rounded-full text-[9px] font-semibold" style={{ backgroundColor: color + "20", color: color }}>
                      {post.type === "reel" ? "▶ Reel" : post.type === "carousel" ? "⊞ Slides" : post.type === "video" ? "▶ Video" : "📷 Post"}
                    </div>
                  </div>

                  {/* Post content area */}
                  <div className="mx-4 rounded-xl overflow-hidden mb-2" style={{ backgroundColor: color + "12", border: `1px solid ${color}20`, height: 160, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:8 }}>
                    {post.type === "video" || post.type === "reel"
                      ? <>
                          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                            <Play className="w-5 h-5 text-white/70 ml-0.5" />
                          </div>
                          <span className="text-white/40 text-xs">{post.views} views</span>
                        </>
                      : post.type === "carousel"
                      ? <div className="flex gap-1.5 px-4 w-full">
                          {[1,2,3].map(j => <div key={j} className="flex-1 rounded-lg" style={{ height:100, backgroundColor: color+"20", border:`1px solid ${color}30` }}/>)}
                        </div>
                      : <Image className="w-10 h-10 text-white/20" />
                    }
                  </div>

                  {/* Caption */}
                  <div className="px-4 mb-1">
                    <p className="text-white/65 text-xs leading-relaxed">{post.caption}</p>
                    <p className="text-rose-400/50 text-[10px] mt-0.5">{post.tags}</p>
                  </div>

                  {/* Engagement row */}
                  <div className="flex items-center gap-4 px-4 py-2">
                    <button onClick={() => handleLike(i)} className="flex items-center gap-1 text-white/40 hover:text-rose-400 transition-colors">
                      <Heart className="w-4 h-4" />
                      <span className="text-[10px] font-medium">{(likeCounts[i] || post.likes).toLocaleString()}</span>
                    </button>
                    <div className="flex items-center gap-1 text-white/30">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-[10px]">{post.comments}</span>
                    </div>
                    <div className="flex items-center gap-1 text-white/30">
                      <Share2 className="w-4 h-4" />
                      <span className="text-[10px]">{post.shares}</span>
                    </div>
                    <div className="ml-auto text-white/20">
                      <Bookmark className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {visiblePosts.length < POSTS.length && (
            <div className="flex items-center justify-center h-20">
              <motion.div animate={{ opacity:[0.3,1,0.3] }} transition={{ duration:1.2, repeat:Infinity }}>
                <div className="flex gap-1.5">
                  {[0,1,2].map(i=><div key={i} className="w-1.5 h-1.5 rounded-full bg-rose-400/40"/>)}
                </div>
              </motion.div>
            </div>
          )}
        </div>

        {/* Bottom nav */}
        <div className="flex items-center justify-around px-4 py-3 border-t border-white/5">
          {[Hash, Users, Play, BarChart3, Target].map((Icon, i) => (
            <button key={i} className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${i===0?"bg-rose-400/15":""}`}>
              <Icon className={`w-4 h-4 ${i===0?"text-rose-400":"text-white/25"}`} />
            </button>
          ))}
        </div>
      </div>

      {/* Live stats below phone */}
      <motion.div
        initial={{ opacity:0, y:10 }} animate={inView ? { opacity:1, y:0 }:{ opacity:0, y:10 }}
        transition={{ delay:2.5, duration:0.5 }}
        className="mt-6 grid grid-cols-3 gap-3 max-w-xs mx-auto"
      >
        {[
          { v:"+380%", l:"Reach growth" },
          { v:"2.8x",  l:"ROAS" },
          { v:"50+",   l:"Posts/mo" },
        ].map(s => (
          <div key={s.l} className={`p-3 rounded-xl ${C.bg} border ${C.border} text-center`}>
            <div className={`text-base font-bold ${C.text}`}>{s.v}</div>
            <div className="text-[10px] text-white/30">{s.l}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Metrics / Social Proof Grid
───────────────────────────────────────── */
const METRICS = [
  { platform: "Instagram", icon: "📸", reach: "+412%", followers: "+8.4k", engagement: "6.8%", period: "90 days" },
  { platform: "LinkedIn",  icon: "💼", reach: "+287%", followers: "+3.2k", engagement: "4.1%", period: "90 days" },
  { platform: "TikTok",    icon: "🎵", reach: "+890%", followers: "+22k",  engagement: "9.3%", period: "90 days" },
  { platform: "Meta Ads",  icon: "📣", reach: "2.8x",  followers: "ROAS",  engagement: "$12",  period: "Cost/Lead" },
];

function MetricsGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {METRICS.map((m, i) => (
        <motion.div key={i}
          initial={{ opacity:0, y:20, scale:0.96 }}
          animate={inView ? { opacity:1, y:0, scale:1 } : { opacity:0, y:20, scale:0.96 }}
          transition={{ duration:0.5, delay:i*0.12, ease:[0.22,1,0.36,1] }}
          className={`p-6 rounded-2xl border ${C.border} ${C.bg} relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-rose-400/5 to-transparent pointer-events-none" />
          <div className="text-2xl mb-3">{m.icon}</div>
          <div className={`text-xs font-semibold ${C.text} uppercase tracking-widest mb-4`}>{m.platform}</div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-white/40 text-xs">Reach</span>
              <span className={`text-sm font-bold ${C.text}`}>{m.reach}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/40 text-xs">Followers</span>
              <span className="text-sm font-semibold text-white/70">{m.followers}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/40 text-xs">Engagement</span>
              <span className="text-sm font-semibold text-white/70">{m.engagement}</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 text-[10px] text-white/25 text-center">{m.period}</div>
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   Pipeline Steps
───────────────────────────────────────── */
const PIPELINE = [
  { icon: Brain,           label:"Content Strategy",       sublabel:"Research · Pillars · Calendar", desc:"We audit your niche, reverse-engineer competitor content, and build a 90-day content calendar with defined pillars, posting cadences, and viral hook angles." },
  { icon: Zap,             label:"AI-Assisted Creation",   sublabel:"Scripts · Captions · Visuals",  desc:"AI drafts scripts, captions, and creative briefs. Human editors refine and approve. 50+ pieces of platform-native content produced monthly." },
  { icon: Share2,          label:"Cross-Platform Publishing",sublabel:"Insta · LinkedIn · TikTok",   desc:"Content is formatted and optimised for each platform — aspect ratios, caption length, hashtag strategy, and peak-time posting all handled automatically." },
  { icon: Target,          label:"Paid Ads + Targeting",   sublabel:"Meta · LinkedIn · Google",      desc:"We layer in paid campaigns once organic content is warming your audience — creative, targeting, budget, and A/B testing managed end-to-end." },
  { icon: BarChart3,       label:"Analytics + Optimisation",sublabel:"Weekly reports · Iteration",   desc:"A live dashboard tracks reach, engagement, CPL, and ROAS. We review weekly, kill what doesn't work, and double down on what does." },
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
            <div className="w-2 h-2 rounded-full bg-rose-400" />
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
export default function SmmaPage() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex flex-col justify-center pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(251,113,133,0.11),transparent)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_60%,rgba(236,72,153,0.07),transparent)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage:"linear-gradient(rgba(251,113,133,1) 1px,transparent 1px),linear-gradient(90deg,rgba(251,113,133,1) 1px,transparent 1px)", backgroundSize:"60px 60px" }} />

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
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                Social Media Marketing (SMMA)
              </motion.div>

              <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.2 }}
                className="text-6xl md:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6">
                Attention →<br />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${C.grad}`}>Leads → Revenue.</span>
              </motion.h1>

              <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.35 }}
                className="text-xl text-white/55 max-w-lg leading-relaxed mb-12">
                Scale your brand with AI-powered social media systems — strategy, content, ads, and analytics all handled for you, every single month.
              </motion.p>

              <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5 }}
                className="flex flex-wrap gap-4 items-center">
                <Link href="/#contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-rose-400 text-black font-bold text-base hover:bg-rose-300 shadow-[0_0_40px_rgba(251,113,133,0.35)] transition-all hover:shadow-[0_0_60px_rgba(251,113,133,0.55)] hover:scale-105">
                  Scale My Brand <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="#feed" className="inline-flex items-center gap-2 px-6 py-4 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all">
                  See it in action <ChevronDown className="w-4 h-4" />
                </a>
              </motion.div>

              <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.7 }}
                className="mt-14 grid grid-cols-3 gap-6">
                {[
                  { n:"+380%", l:"Avg reach growth in 90d" },
                  { n:"2.8x",  l:"Return on ad spend" },
                  { n:"50+",   l:"Content pieces/month" },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className={`text-3xl font-bold ${C.text} mb-1`}>{s.n}</div>
                    <div className="text-xs text-white/40">{s.l}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Hero social feed preview (mini, static) */}
            <motion.div initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.8, delay:0.4 }}
              className="hidden lg:block relative">
              <div className="rounded-3xl border border-rose-400/15 bg-white/[0.02] p-6 overflow-hidden" style={{ boxShadow:"0 0 80px rgba(251,113,133,0.08)" }}>
                <div className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">Channels managed</div>
                <div className="space-y-3">
                  {[
                    { platform:"Instagram", icon:"📸", posts:"14/mo", reach:"+412%", eng:"6.8%" },
                    { platform:"LinkedIn",  icon:"💼", posts:"20/mo", reach:"+287%", eng:"4.1%" },
                    { platform:"TikTok",    icon:"🎵", posts:"16/mo", reach:"+890%", eng:"9.3%" },
                    { platform:"Meta Ads",  icon:"📣", posts:"A/B tested", reach:"2.8x ROAS", eng:"$12 CPL" },
                  ].map((ch, i) => (
                    <motion.div key={i} initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.6 + i*0.15 }}
                      className={`flex items-center gap-3 p-3 rounded-xl ${C.bg} border ${C.border}`}>
                      <span className="text-lg">{ch.icon}</span>
                      <div className="flex-1">
                        <div className="text-white text-xs font-semibold">{ch.platform}</div>
                        <div className="text-white/35 text-[10px]">{ch.posts}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-xs font-bold ${C.text}`}>{ch.reach}</div>
                        <div className="text-white/30 text-[10px]">{ch.eng}</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-5 pt-4 border-t border-white/5">
                  <div className="text-xs text-white/30 mb-2">Monthly content output</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                      <motion.div className="h-full rounded-full bg-gradient-to-r from-rose-400 to-pink-500"
                        initial={{ width:"0%" }} animate={{ width:"84%" }}
                        transition={{ duration:1.2, delay:1, ease:[0.22,1,0.36,1] }}
                      />
                    </div>
                    <span className={`text-xs font-bold ${C.text}`}>50+ pieces</span>
                  </div>
                </div>
              </div>
              <motion.div animate={{ y:[-4,4,-4] }} transition={{ duration:3, repeat:Infinity, ease:"easeInOut" }}
                className="absolute -top-4 -right-4 px-4 py-2 rounded-full bg-green-400/15 border border-green-400/30 text-green-400 text-xs font-semibold">
                ● Publishing daily
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Posting without a system<br />is just noise.</h2>
            <p className="text-white/45 text-lg max-w-xl mb-16">Most businesses treat social media as an afterthought. Random posts, no strategy, ads that burn budget — and zero correlation to revenue.</p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon:Clock,        title:"No Consistent Content",    stat:"91%",    statL:"of businesses post inconsistently",           body:"Posting sporadically destroys algorithmic reach. Platforms reward accounts that publish consistently — without a content system, you're invisible to the algorithm and your audience." },
              { icon:TrendingDown, title:"Ads That Don't Convert",   stat:"$0.87",  statL:"wasted for every $1 spent on unoptimised ads", body:"Boosting posts and running untargeted campaigns is how businesses burn thousands with nothing to show for it. Ad creative, copy, audience targeting, and bidding all have to work together." },
              { icon:AlertCircle,  title:"Low Engagement, Low Trust",stat:"0.5%",   statL:"average engagement rate on unmanaged accounts", body:"Low engagement isn't just a vanity problem — it signals low trust. Prospects check your social proof before buying. Dormant accounts with 12 likes per post kill conversions silently." },
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
                <p className="text-xs font-semibold uppercase tracking-widest text-rose-400 mb-3">Our System</p>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Social media as<br />a revenue channel.</h2>
                <p className="text-white/50 text-lg leading-relaxed mb-10">
                  We don't manage social media for vanity metrics. Every piece of content, every ad, and every post is engineered to generate awareness, build trust, and drive qualified leads into your pipeline.
                </p>
              </FadeIn>
              <div className="space-y-5">
                {[
                  { icon:Brain,           label:"AI-Assisted Content Strategy",   detail:"We research your niche, study top-performing content in your market, and build a data-driven 90-day calendar — so every post has a purpose and an audience." },
                  { icon:Zap,             label:"Paid Ads Optimisation",           detail:"Meta, LinkedIn, TikTok, and Google — creative, copy, targeting, and budget managed with weekly iteration. We kill losing ads fast and scale winners hard." },
                  { icon:Target,          label:"Precision Audience Targeting",    detail:"Lookalike audiences, retargeting pools, interest stacks, and behavioural targeting — built from your existing customer data and refined over time." },
                  { icon:BarChart3,       label:"Analytics Dashboards",           detail:"A custom real-time dashboard showing reach, engagement, CPL, ROAS, and attribution — updated automatically, reviewed together every week." },
                  { icon:Share2,          label:"Cross-Platform Distribution",     detail:"One strategy, every platform. Instagram, LinkedIn, TikTok, X/Twitter, YouTube Shorts — all formatted, scheduled, and optimised individually." },
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

            {/* Deliverables card */}
            <FadeIn direction="right" delay={0.2}>
              <div className={`relative rounded-3xl border ${C.border} bg-white/[0.02] p-8`}>
                <div className="absolute inset-0 bg-gradient-to-br from-rose-400/5 to-transparent pointer-events-none rounded-3xl" />
                <div className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-5">What's included every month</div>
                <div className="space-y-2.5 mb-6">
                  {[
                    "90-day content strategy + calendar across all platforms",
                    "Daily/weekly posts on Instagram, LinkedIn, TikTok, X/Twitter",
                    "AI-drafted copy reviewed and approved by human editors",
                    "Short-form video scripts, reels storyboards, carousel decks",
                    "Paid Meta + LinkedIn campaign management (creative + targeting)",
                    "Community management + comment engagement",
                    "Monthly analytics report with reach, engagement + lead attribution",
                    "Bi-weekly competitor tracking and trend reports",
                  ].map((item, i) => (
                    <motion.div key={i} initial={{ opacity:0, x:16 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.3 + i*0.07 }}
                      className="flex items-center gap-2.5 text-xs text-white/55">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${C.text} flex-shrink-0`} />
                      {item}
                    </motion.div>
                  ))}
                </div>
                <div className="pt-5 border-t border-white/5">
                  <div className="text-xs text-white/30 uppercase tracking-widest mb-3">Platforms</div>
                  <div className="flex flex-wrap gap-2">
                    {["Instagram","LinkedIn","TikTok","X/Twitter","YouTube Shorts","Facebook","Meta Ads","Google Ads"].map(p => (
                      <span key={p} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/45 text-[10px] font-medium">{p}</span>
                    ))}
                  </div>
                </div>
                <motion.div animate={{ y:[-4,4,-4] }} transition={{ duration:3, repeat:Infinity, ease:"easeInOut" }}
                  className="absolute -top-4 -right-4 px-4 py-2 rounded-full bg-green-400/15 border border-green-400/30 text-green-400 text-xs font-semibold">
                  ● Publishing daily
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
            <p className="text-xs font-semibold uppercase tracking-widest text-rose-400 mb-3">How It Works</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">From strategy to revenue<br />in five steps.</h2>
            <p className="text-white/45 text-lg max-w-xl mx-auto">A complete social media operation handled from start to finish — you approve content, we do everything else.</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02]">
              <PipelineViz />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── SECTION 4: SOCIAL PROOF — ANIMATED FEED ── */}
      <section id="feed" className="py-28 bg-white/[0.015] border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <FadeIn direction="left">
                <p className="text-xs font-semibold uppercase tracking-widest text-rose-400 mb-3">Social Proof</p>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Real content.<br />Real results.</h2>
                <p className="text-white/50 text-lg leading-relaxed mb-8">
                  This is what your managed social presence looks like in practice — consistent, high-quality content across every platform, all tracked back to revenue.
                </p>
              </FadeIn>
              <FadeIn delay={0.1} direction="left">
                <MetricsGrid />
              </FadeIn>
            </div>
            <FadeIn delay={0.2} direction="right">
              <SocialFeedMockup />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: RESULTS ── */}
      <section className="py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-rose-400 mb-3">Results</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">What happens when social<br />becomes a system.</h2>
            <p className="text-white/45 text-lg max-w-xl mx-auto">Clients across B2B, coaching, and SaaS go from social media being an afterthought to their primary inbound channel within 90 days.</p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {[
              { icon:Eye,             metric:"+380%",  metricLabel:"Average reach growth in 90 days",      title:"More Visibility",       body:"Consistent, algorithm-friendly content across every channel explodes your organic reach. Clients average +380% reach growth in the first 90 days — purely from organic content and distribution strategy." },
              { icon:MousePointerClick,metric:"2.8x",  metricLabel:"Return on ad spend (ROAS)",             title:"More Leads",            body:"Paid campaigns on warm audiences who've already seen your organic content convert at 2–3x the industry average. You get more leads for the same ad budget — or the same leads for a fraction of the cost." },
              { icon:TrendingUp,      metric:"12mo",   metricLabel:"To become the #1 voice in your niche",  title:"Scalable Brand Growth", body:"Clients who stick with the system for 6–12 months consistently become the go-to brand in their category. Inbound leads, speaking opportunities, and partnership enquiries all compound over time." },
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
            <div className={`p-8 rounded-3xl border ${C.border} bg-rose-400/[0.04] relative overflow-hidden`}>
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-rose-400 to-transparent rounded-l-3xl" />
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <p className="text-white/70 text-lg leading-relaxed italic mb-4">
                    "We'd been posting sporadically for 2 years with basically no traction. Three months in with AcquireZen's system and our LinkedIn alone generates 8–12 inbound leads per week. We actually had to pause our paid ads because organic was more than enough."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${C.bg} border ${C.border} flex items-center justify-center ${C.text} font-bold text-sm`}>R</div>
                    <div>
                      <div className="text-white font-semibold text-sm">Rachel T.</div>
                      <div className="text-white/35 text-xs">Founder, Ascend Consulting — B2B Services</div>
                    </div>
                  </div>
                </div>
                <div className="md:w-48 grid grid-cols-2 gap-3 text-center">
                  {[{v:"8–12",l:"Leads/week"},{v:"+380%",l:"Reach growth"},{v:"0",l:"Paid ads needed"},{v:"90d",l:"Timeframe"}].map(s => (
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(251,113,133,0.11),transparent)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_20%_50%,rgba(236,72,153,0.07),transparent)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage:"linear-gradient(rgba(251,113,133,1) 1px,transparent 1px),linear-gradient(90deg,rgba(251,113,133,1) 1px,transparent 1px)", backgroundSize:"60px 60px" }} />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <FadeIn>
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${C.bg} border ${C.border} ${C.text} text-xs font-semibold uppercase tracking-widest mb-8`}>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
              Ready to scale?
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Scale<br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${C.grad}`}>My Brand</span>
            </h2>
            <p className="text-white/50 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
              Book a free 30-minute social audit. We'll review your current presence, show you exactly what's holding back your growth, and map out a 90-day plan.
            </p>
            <Link href="/#contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full bg-rose-400 text-black font-bold text-lg hover:bg-rose-300 shadow-[0_0_50px_rgba(251,113,133,0.4)] transition-all hover:shadow-[0_0_80px_rgba(251,113,133,0.6)] hover:scale-105">
              Book a Free Social Audit <ArrowRight className="w-5 h-5" />
            </Link>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-white/30">
              {["Free social audit","Results in 90 days","No commitment","50+ pieces/month"].map((t, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-400/60" /> {t}
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
