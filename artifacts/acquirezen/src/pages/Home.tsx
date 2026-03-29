import { useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";
import { 
  ArrowRight, 
  Clock, 
  AlertTriangle, 
  TrendingDown, 
  XCircle, 
  CheckCircle2, 
  Zap, 
  MessageSquare, 
  Workflow, 
  LayoutTemplate,
  BarChart3,
  Users,
  Target,
  Hexagon,
  Megaphone,
  PenLine
} from "lucide-react";
import Navbar from "@/components/Navbar";
import ThreeScene from "@/components/ThreeScene";
import ChatbotDemo from "@/components/ChatbotDemo";
import FAQ from "@/components/FAQ";
import { useCreateLead, type LeadInput } from "@/hooks/use-leads";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadSchema } from "@/hooks/use-leads";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Reusable animated section wrapper
function FadeInSection({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const { toast } = useToast();
  const leadMutation = useCreateLead();

  const form = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      email: "",
      businessType: "",
      message: "",
    },
  });

  function onSubmit(data: LeadInput) {
    leadMutation.mutate(data, {
      onSuccess: (res) => {
        toast({
          title: "Request Received",
          description: res.message,
        });
        form.reset();
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong. Please try again.",
        });
      }
    });
  }

  // Typewriter effect variants
  const sentence = "Double Your Clients. Automatically.";
  const letters = sentence.split("");

  return (
    <div className="min-h-screen relative selection:bg-primary/30 selection:text-white">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <ThreeScene />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-4xl mx-auto text-center">
            {/* Pill badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-primary/30 text-primary mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-semibold tracking-wide uppercase">AI Automation Agency</span>
            </motion.div>

            {/* Typewriter Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold text-white mb-6 leading-[1.1]">
              {letters.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 + 0.5 }}
                >
                  {char}
                </motion.span>
              ))}
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="text-lg md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto"
            >
              AcquireZen builds bespoke AI automation systems that generate leads, qualify prospects, and book calls — while you sleep.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a 
                href="#contact"
                className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-lg bg-primary text-primary-foreground shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:shadow-[0_0_50px_rgba(0,240,255,0.6)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Book Free Strategy Call <ArrowRight className="w-5 h-5" />
              </a>
              <a 
                href="#how-it-works"
                className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                See How It Works
              </a>
            </motion.div>
          </div>
        </div>
        
        {/* Bottom fade out to background */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-0" />
      </section>

      {/* --- TRUST BANNER --- */}
      <section className="py-10 border-y border-white/5 bg-white/[0.01] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-6 text-center">
          <p className="text-sm font-semibold tracking-widest text-muted-foreground uppercase">Trusted by forward-thinking companies</p>
        </div>
        <div className="flex w-full overflow-hidden mask-edges relative">
          <div className="flex whitespace-nowrap animate-marquee items-center gap-24 py-4 px-12">
            {/* Duplicated for infinite scroll effect */}
            {[1, 2].map((group) => (
              <div key={group} className="flex gap-24 items-center min-w-max">
                <span className="text-2xl font-display font-bold text-white/30">TECH<span className="text-white/50">CORP</span></span>
                <span className="text-2xl font-display font-bold text-white/30">GROWTH<span className="text-white/50">CO</span></span>
                <span className="text-2xl font-display font-bold text-white/30">SCALE<span className="text-white/50">PRO</span></span>
                <span className="text-2xl font-display font-bold text-white/30">VENTURE<span className="text-white/50">X</span></span>
                <span className="text-2xl font-display font-bold text-white/30">NEXUS<span className="text-white/50">AI</span></span>
                <span className="text-2xl font-display font-bold text-white/30">PULSE<span className="text-white/50">MEDIA</span></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PAIN POINTS --- */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Still doing it the hard way?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Manual acquisition limits your growth. If you relate to these, your business is capped.</p>
          </FadeInSection>

          <div className="grid md:grid-cols-3 gap-8">
            <FadeInSection delay={0.1}>
              <div className="glass-panel rounded-3xl p-8 h-full relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-[50px] rounded-full group-hover:bg-accent/20 transition-colors duration-500" />
                <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 text-accent">
                  <Clock className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Manual Lead Generation</h3>
                <p className="text-muted-foreground leading-relaxed">Hours wasted searching for prospects, verifying emails, and sending personalized messages one by one.</p>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <div className="glass-panel rounded-3xl p-8 h-full relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-[50px] rounded-full group-hover:bg-accent/20 transition-colors duration-500" />
                <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 text-accent">
                  <AlertTriangle className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Inconsistent Follow-Up</h3>
                <p className="text-muted-foreground leading-relaxed">Leads falling through the cracks because you or your sales team can't reply fast enough to keep them warm.</p>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.3}>
              <div className="glass-panel rounded-3xl p-8 h-full relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-[50px] rounded-full group-hover:bg-accent/20 transition-colors duration-500" />
                <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 text-accent">
                  <TrendingDown className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Unpredictable Revenue</h3>
                <p className="text-muted-foreground leading-relaxed">Without a reliable system, your pipeline is a rollercoaster. You hustle for a month, get clients, deliver, and dry up.</p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* --- SOLUTION (Before/After) --- */}
      <section className="py-24 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[500px] bg-primary/5 blur-[120px] rounded-[100%] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeInSection className="text-center mb-16">
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">The Solution</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">Meet the <span className="text-gradient">AcquireZen</span> System</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">A done-for-you automation infrastructure that runs 24/7 without complaints, sick days, or hesitation.</p>
          </FadeInSection>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* BEFORE */}
            <FadeInSection delay={0.1}>
              <div className="rounded-3xl p-8 border border-accent/20 bg-accent/5 backdrop-blur-sm relative h-full">
                <div className="absolute -top-4 left-8 px-4 py-1 bg-accent border border-accent-foreground/20 rounded-full text-sm font-bold text-white shadow-lg">
                  BEFORE
                </div>
                <ul className="mt-6 space-y-5">
                  {[
                    "Manual, soul-crushing outreach",
                    "Leads going cold due to slow replies",
                    "Scattered data across spreadsheets",
                    "Feast or famine revenue cycles",
                    "Spending 40% of time on admin tasks"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <XCircle className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                      <span className="text-white/80 text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInSection>

            {/* AFTER */}
            <FadeInSection delay={0.3}>
              <div className="rounded-3xl p-8 border border-primary/40 bg-primary/10 backdrop-blur-sm relative h-full shadow-[0_0_40px_rgba(0,240,255,0.1)]">
                <div className="absolute -top-4 left-8 px-4 py-1 bg-primary border border-primary-foreground/20 rounded-full text-sm font-bold text-background shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                  AFTER (WITH ACQUIREZEN)
                </div>
                <ul className="mt-6 space-y-5">
                  {[
                    "AI-powered hyper-personalized outreach at scale",
                    "Instant automated follow-ups 24/7",
                    "Seamless CRM and pipeline tracking",
                    "Predictable, overflow-ready pipeline",
                    "100% of time spent closing and delivering"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
                      <span className="text-white font-medium text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* --- SERVICES --- */}
      <section id="services" className="py-32 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">What We Build For You</h2>
            <p className="text-xl text-muted-foreground max-w-2xl">End-to-end acquisition infrastructure tailored to your business model.</p>
          </FadeInSection>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Service 1 */}
            <FadeInSection delay={0.1}>
              <div className="glass-panel-hover glass-panel rounded-3xl p-8 h-full group relative overflow-hidden flex flex-col">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-primary group-hover:drop-shadow-[0_0_10px_rgba(0,240,255,0.8)] transition-all" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">AI Lead Generation</h3>
                <p className="text-muted-foreground mb-6 flex-1">Automated multi-channel prospecting engines that scrape data, enrich it, and deploy hyper-personalized messaging at scale across Email & LinkedIn.</p>
                <div className="flex items-center gap-5 flex-wrap">
                  <a href="#contact" className="inline-flex items-center text-primary font-semibold hover:text-white transition-colors">
                    Deploy this system <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <Link href="/services/ai-lead-generation" className="inline-flex items-center px-4 py-1.5 rounded-full border border-primary/30 text-primary/80 text-sm font-medium hover:bg-primary/10 hover:text-primary transition-all">
                    Learn More
                  </Link>
                </div>
              </div>
            </FadeInSection>

            {/* Service 2 */}
            <FadeInSection delay={0.2}>
              <div className="glass-panel-hover glass-panel rounded-3xl p-8 h-full group relative overflow-hidden flex flex-col">
                <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mb-6">
                  <MessageSquare className="w-6 h-6 text-secondary group-hover:drop-shadow-[0_0_10px_rgba(157,78,221,0.8)] transition-all" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">AI Conversational Agents</h3>
                <p className="text-muted-foreground mb-6 flex-1">Custom-trained LLM assistants deployed on your website or SMS that qualify traffic, answer objections, and book qualified appointments directly.</p>
                <div className="flex items-center gap-5 flex-wrap">
                  <a href="#contact" className="inline-flex items-center text-secondary font-semibold hover:text-white transition-colors">
                    Deploy this system <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <Link href="/services/ai-conversational-agents" className="inline-flex items-center px-4 py-1.5 rounded-full border border-secondary/30 text-secondary/80 text-sm font-medium hover:bg-secondary/10 hover:text-secondary transition-all">
                    Learn More
                  </Link>
                </div>
              </div>
            </FadeInSection>

            {/* Service 3 */}
            <FadeInSection delay={0.3}>
              <div className="glass-panel-hover glass-panel rounded-3xl p-8 h-full group relative overflow-hidden flex flex-col">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Workflow className="w-6 h-6 text-primary group-hover:drop-shadow-[0_0_10px_rgba(0,240,255,0.8)] transition-all" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">CRM & Pipeline Automation</h3>
                <p className="text-muted-foreground mb-6 flex-1">Seamless API integrations (Zapier/Make) that connect your entire toolstack. When a lead replies, your CRM updates, slack notifies, and sequences pause.</p>
                <div className="flex items-center gap-5 flex-wrap">
                  <a href="#contact" className="inline-flex items-center text-primary font-semibold hover:text-white transition-colors">
                    Deploy this system <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <Link href="/services/crm-automation" className="inline-flex items-center px-4 py-1.5 rounded-full border border-primary/30 text-primary/80 text-sm font-medium hover:bg-primary/10 hover:text-primary transition-all">
                    Learn More
                  </Link>
                </div>
              </div>
            </FadeInSection>

            {/* Service 4 */}
            <FadeInSection delay={0.4}>
              <div className="glass-panel-hover glass-panel rounded-3xl p-8 h-full group relative overflow-hidden flex flex-col">
                <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mb-6">
                  <LayoutTemplate className="w-6 h-6 text-secondary group-hover:drop-shadow-[0_0_10px_rgba(157,78,221,0.8)] transition-all" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Conversion Funnels</h3>
                <p className="text-muted-foreground mb-6 flex-1">High-converting landing pages and VSL funnels designed specifically to turn cold automated traffic into highly educated, ready-to-buy prospects.</p>
                <div className="flex items-center gap-5 flex-wrap">
                  <a href="#contact" className="inline-flex items-center text-secondary font-semibold hover:text-white transition-colors">
                    Deploy this system <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <Link href="/services/conversion-funnels" className="inline-flex items-center px-4 py-1.5 rounded-full border border-secondary/30 text-secondary/80 text-sm font-medium hover:bg-secondary/10 hover:text-secondary transition-all">
                    Learn More
                  </Link>
                </div>
              </div>
            </FadeInSection>

            {/* Service 5 */}
            <FadeInSection delay={0.5}>
              <div className="glass-panel-hover glass-panel rounded-3xl p-8 h-full group relative overflow-hidden flex flex-col">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Megaphone className="w-6 h-6 text-primary group-hover:drop-shadow-[0_0_10px_rgba(0,240,255,0.8)] transition-all" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Social Media Marketing (SMMA)</h3>
                <p className="text-muted-foreground mb-6 flex-1">Full-service social media management powered by AI tools — organic growth, paid ad campaigns, audience targeting, and analytics dashboards that scale your brand across every platform.</p>
                <div className="flex items-center gap-5 flex-wrap">
                  <a href="#contact" className="inline-flex items-center text-primary font-semibold hover:text-white transition-colors">
                    Deploy this system <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <Link href="/services/smma" className="inline-flex items-center px-4 py-1.5 rounded-full border border-primary/30 text-primary/80 text-sm font-medium hover:bg-primary/10 hover:text-primary transition-all">
                    Learn More
                  </Link>
                </div>
              </div>
            </FadeInSection>

            {/* Service 6 */}
            <FadeInSection delay={0.6}>
              <div className="glass-panel-hover glass-panel rounded-3xl p-8 h-full group relative overflow-hidden flex flex-col">
                <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mb-6">
                  <PenLine className="w-6 h-6 text-secondary group-hover:drop-shadow-[0_0_10px_rgba(157,78,221,0.8)] transition-all" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Content Creation</h3>
                <p className="text-muted-foreground mb-6 flex-1">AI-assisted content pipelines that produce SEO blogs, short-form video scripts, email sequences, and ad copy — published on autopilot to keep your brand top-of-mind every single day.</p>
                <div className="flex items-center gap-5 flex-wrap">
                  <a href="#contact" className="inline-flex items-center text-secondary font-semibold hover:text-white transition-colors">
                    Deploy this system <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <Link href="/services/content-creation" className="inline-flex items-center px-4 py-1.5 rounded-full border border-secondary/30 text-secondary/80 text-sm font-medium hover:bg-secondary/10 hover:text-secondary transition-all">
                    Learn More
                  </Link>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section id="how-it-works" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">From Chaos to Clarity in 3 Steps</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">We don't just give you software. We build the entire infrastructure.</p>
          </FadeInSection>

          <div className="relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent -translate-y-1/2 z-0" />
            
            <div className="grid md:grid-cols-3 gap-12 relative z-10">
              {[
                {
                  num: "01",
                  title: "Analyze & Architect",
                  desc: "We audit your current acquisition process, identify bottlenecks, and map out a custom automation blueprint tailored to your exact offer and audience."
                },
                {
                  num: "02",
                  title: "Build & Integrate",
                  desc: "Our engineers build your infrastructure: writing scripts, setting up domains, configuring AI agents, and integrating everything with your CRM."
                },
                {
                  num: "03",
                  title: "Automate & Scale",
                  desc: "We flip the switch. The system goes live, generating leads and booking calls while you focus entirely on sales and delivery."
                }
              ].map((step, i) => (
                <FadeInSection key={i} delay={i * 0.2} className="relative">
                  <div className="bg-background rounded-2xl p-8 border border-white/10 text-center relative z-10 hover:border-primary/50 transition-colors duration-500 shadow-xl">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-card border-4 border-background flex items-center justify-center text-2xl font-bold text-gradient shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                      {step.num}
                    </div>
                    <h3 className="text-2xl font-bold text-white mt-6 mb-4">{step.title}</h3>
                    <p className="text-muted-foreground">{step.desc}</p>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- SOCIAL PROOF & RESULTS --- */}
      <section id="results" className="py-32 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Real Results from Real Clients</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">When intelligence meets automation, scaling becomes math, not magic.</p>
          </FadeInSection>

          {/* Metric Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <FadeInSection delay={0.1}>
              <div className="glass-panel p-8 rounded-3xl text-center border-t-4 border-t-primary">
                <BarChart3 className="w-8 h-8 text-primary mx-auto mb-4" />
                <h4 className="text-5xl font-display font-bold text-white mb-2">+247%</h4>
                <p className="font-semibold text-lg text-primary mb-2">More Qualified Leads</p>
                <p className="text-sm text-muted-foreground">SaaS company scaled from 20 to 69 booked demos per month within 45 days.</p>
              </div>
            </FadeInSection>
            
            <FadeInSection delay={0.2}>
              <div className="glass-panel p-8 rounded-3xl text-center border-t-4 border-t-secondary">
                <Target className="w-8 h-8 text-secondary mx-auto mb-4" />
                <h4 className="text-5xl font-display font-bold text-white mb-2">8x ROI</h4>
                <p className="font-semibold text-lg text-secondary mb-2">In First 90 Days</p>
                <p className="text-sm text-muted-foreground">E-commerce brand automated cart recovery via SMS AI and recovered $180k.</p>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.3}>
              <div className="glass-panel p-8 rounded-3xl text-center border-t-4 border-t-primary">
                <Users className="w-8 h-8 text-primary mx-auto mb-4" />
                <h4 className="text-5xl font-display font-bold text-white mb-2">Zero</h4>
                <p className="font-semibold text-lg text-primary mb-2">Manual Outreach</p>
                <p className="text-sm text-muted-foreground">B2B consulting firm fully automated prospecting across LinkedIn & Email.</p>
              </div>
            </FadeInSection>
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "AcquireZen completely transformed how we generate clients. We went from hustling for leads to having a waitlist.",
                name: "James R.",
                role: "Founder, ScalePro",
                avatar: `${import.meta.env.BASE_URL}images/avatar-1.png`
              },
              {
                quote: "The AI chatbot alone books 15-20 calls per week without us lifting a finger. Incredible ROI. Best investment this year.",
                name: "Sarah M.",
                role: "CEO, NexusGrowth",
                avatar: `${import.meta.env.BASE_URL}images/avatar-2.png`
              },
              {
                quote: "We were skeptical at first, but the results speak for themselves. Our sales pipeline is finally predictable.",
                name: "David K.",
                role: "Director, VentureX",
                avatar: `${import.meta.env.BASE_URL}images/avatar-3.png`
              }
            ].map((t, i) => (
              <FadeInSection key={i} delay={0.2 + (i*0.1)}>
                <div className="glass-panel p-8 rounded-2xl h-full flex flex-col">
                  {/* testomial stars */}
                  <div className="flex gap-1 mb-6">
                    {[1,2,3,4,5].map(star => (
                      <svg key={star} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-lg text-white/90 italic mb-8 flex-1">"{t.quote}"</p>
                  <div className="flex items-center gap-4">
                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border border-white/20 object-cover bg-muted" />
                    <div>
                      <h5 className="font-bold text-white">{t.name}</h5>
                      <p className="text-sm text-primary">{t.role}</p>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* --- AI DEMO CHATBOT --- */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-[600px] bg-secondary/10 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeInSection>
              <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-2 block">Interactive Demo</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">See Our AI Agents <br/>In Action</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Try out a simplified version of the conversational agents we build for our clients. In reality, these are connected directly to your calendar, CRM, and extensive knowledge base.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-white/80">
                  <div className="w-2 h-2 rounded-full bg-secondary" /> Handles objections naturally
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <div className="w-2 h-2 rounded-full bg-secondary" /> Qualifies leads based on your criteria
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <div className="w-2 h-2 rounded-full bg-secondary" /> Books meetings directly
                </li>
              </ul>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <ChatbotDemo />
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* --- ABOUT --- */}
      <section className="py-24 border-y border-white/5 bg-background">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <FadeInSection>
            <h2 className="text-3xl font-display font-bold text-white mb-6">Built by Growth Obsessives</h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              AcquireZen was founded by a team with deep expertise in AI systems, digital marketing, and business automation. We don't just sell software; we engineer predictable growth. We've helped dozens of businesses replace "hustle" with intelligent systems that scale infinitely.
            </p>
            <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-12">
              <div>
                <h4 className="text-3xl font-display font-bold text-white mb-2">50+</h4>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Clients Served</p>
              </div>
              <div>
                <h4 className="text-3xl font-display font-bold text-white mb-2">$10M+</h4>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Revenue Generated</p>
              </div>
              <div>
                <h4 className="text-3xl font-display font-bold text-white mb-2">3.2x</h4>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Average ROI</p>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section id="faq" className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Common Questions</h2>
            <p className="text-xl text-muted-foreground">Everything you need to know about partnering with AcquireZen.</p>
          </FadeInSection>
          
          <FadeInSection delay={0.2}>
            <FAQ />
          </FadeInSection>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section id="contact" className="py-32 relative overflow-hidden">
        {/* Complex dynamic background for final CTA */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/10" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[400px] bg-primary/20 blur-[150px] rounded-t-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="glass-panel p-8 md:p-16 rounded-[2.5rem] border border-white/20 shadow-2xl relative overflow-hidden">
            {/* Decorative element */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Let AI Work While You Sleep</h2>
              <p className="text-xl text-muted-foreground">Join forward-thinking businesses that have replaced manual hustle with intelligent automation. Book your free strategy session below.</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" className="bg-black/40 border-white/10 text-white placeholder:text-white/30 h-12 rounded-xl focus-visible:ring-primary focus-visible:border-primary" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white/80">Work Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john@company.com" className="bg-black/40 border-white/10 text-white placeholder:text-white/30 h-12 rounded-xl focus-visible:ring-primary focus-visible:border-primary" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="businessType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/80">Business Type</FormLabel>
                      <FormControl>
                        <select 
                          className="flex h-12 w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                          {...field}
                        >
                          <option value="" disabled className="bg-card text-muted-foreground">Select your industry</option>
                          <option value="saas" className="bg-card">SaaS / Software</option>
                          <option value="agency" className="bg-card">Agency / Marketing</option>
                          <option value="consulting" className="bg-card">Consulting / Coaching</option>
                          <option value="ecommerce" className="bg-card">E-Commerce</option>
                          <option value="other" className="bg-card">Other B2B Service</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/80">Current Bottleneck (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us what you're struggling with right now..." 
                          className="bg-black/40 border-white/10 text-white placeholder:text-white/30 rounded-xl min-h-[120px] focus-visible:ring-primary focus-visible:border-primary resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <button 
                  type="submit" 
                  disabled={leadMutation.isPending}
                  className="w-full h-14 rounded-xl font-bold text-lg bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 mt-8"
                >
                  {leadMutation.isPending ? "Submitting..." : "Request Strategy Call"} 
                  {!leadMutation.isPending && <ArrowRight className="w-5 h-5" />}
                </button>
              </form>
            </Form>
            
            <div className="mt-8 text-center">
              <a href="#" className="text-muted-foreground hover:text-white transition-colors text-sm flex items-center justify-center gap-2">
                Prefer to talk first? Schedule directly on our calendar <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-white/10 bg-black pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative flex items-center justify-center w-8 h-8">
                <Hexagon className="w-8 h-8 text-primary" />
                <div className="w-3 h-3 bg-secondary rounded-full absolute" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">
                Acquire<span className="text-primary">Zen</span>
              </span>
            </Link>
            
            <div className="flex gap-8 text-sm font-medium text-muted-foreground">
              <a href="#services" className="hover:text-primary transition-colors">Services</a>
              <a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a>
              <a href="#results" className="hover:text-primary transition-colors">Case Studies</a>
              <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} AcquireZen. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
