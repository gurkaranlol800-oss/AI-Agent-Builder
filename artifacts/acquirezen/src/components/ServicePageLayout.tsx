import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";

export interface ServicePageSection {
  title: string;
  body: string;
}

export interface ServicePageProps {
  title: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  accentColor: "primary" | "secondary";
  sections: ServicePageSection[];
  benefits: string[];
  results: { metric: string; label: string }[];
  faqs: { q: string; a: string }[];
}

function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function ServicePageLayout({
  title,
  tagline,
  description,
  icon,
  accentColor,
  sections,
  benefits,
  results,
  faqs,
}: ServicePageProps) {
  const isPrimary = accentColor === "primary";
  const glowClass = isPrimary
    ? "drop-shadow-[0_0_20px_rgba(0,240,255,0.6)]"
    : "drop-shadow-[0_0_20px_rgba(157,78,221,0.6)]";
  const textAccent = isPrimary ? "text-primary" : "text-secondary";
  const borderAccent = isPrimary ? "border-primary/30" : "border-secondary/30";
  const bgAccent = isPrimary ? "bg-primary/10" : "bg-secondary/10";
  const gradientFrom = isPrimary
    ? "from-cyan-500/20"
    : "from-purple-500/20";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className={`relative pt-36 pb-24 overflow-hidden`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} via-transparent to-transparent pointer-events-none`} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,240,255,0.05)_0%,transparent_60%)] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors mb-10 group text-sm font-medium">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>

            <div className={`w-20 h-20 rounded-2xl ${bgAccent} border ${borderAccent} flex items-center justify-center mb-8 ${glowClass}`}>
              {icon}
            </div>

            <p className={`text-sm font-semibold uppercase tracking-widest ${textAccent} mb-4`}>{tagline}</p>
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">{title}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">{description}</p>

            <Link href="/#contact" className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-all ${isPrimary ? "bg-primary text-black hover:bg-primary/90 shadow-[0_0_30px_rgba(0,240,255,0.3)]" : "bg-secondary text-white hover:bg-secondary/90 shadow-[0_0_30px_rgba(157,78,221,0.3)]"}`}>
              Get This System Built <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Results bar */}
      <section className="py-12 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-6">
            {results.map((r, i) => (
              <FadeIn key={i} delay={i * 0.1} className="text-center">
                <div className={`text-4xl font-bold ${textAccent} mb-1`}>{r.metric}</div>
                <div className="text-sm text-muted-foreground">{r.label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {sections.map((s, i) => (
            <FadeIn key={i} delay={0.1}>
              <div className={`glass-panel rounded-3xl p-10 border ${borderAccent}`}>
                <h2 className="text-2xl font-bold text-white mb-4">{s.title}</h2>
                <p className="text-muted-foreground leading-relaxed text-base">{s.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl font-bold text-white mb-10">What You Get</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-4">
            {benefits.map((b, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className={`flex items-start gap-3 glass-panel rounded-2xl p-5 border ${borderAccent}`}>
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${isPrimary ? "bg-primary" : "bg-secondary"}`} />
                  <p className="text-muted-foreground text-sm leading-relaxed">{b}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <h2 className="text-3xl font-bold text-white mb-10">Frequently Asked Questions</h2>
            </FadeIn>
            <div className="space-y-4">
              {faqs.map((f, i) => (
                <FadeIn key={i} delay={i * 0.07}>
                  <div className={`glass-panel rounded-2xl p-6 border ${borderAccent}`}>
                    <h3 className="text-white font-semibold mb-2">{f.q}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{f.a}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} via-transparent to-transparent pointer-events-none`} />
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <FadeIn>
            <h2 className="text-4xl font-bold text-white mb-4">Ready to deploy this system?</h2>
            <p className="text-muted-foreground mb-8">Book a free strategy call and we'll map out exactly how this works for your business.</p>
            <Link href="/#contact" className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-all ${isPrimary ? "bg-primary text-black hover:bg-primary/90 shadow-[0_0_30px_rgba(0,240,255,0.3)]" : "bg-secondary text-white hover:bg-secondary/90 shadow-[0_0_30px_rgba(157,78,221,0.3)]"}`}>
              Book a Free Strategy Call <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Footer strip */}
      <footer className="py-6 border-t border-white/5 text-center text-muted-foreground text-sm">
        © 2024 AcquireZen. All rights reserved.
      </footer>
    </div>
  );
}
