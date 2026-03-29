import { Zap } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";

export default function AiLeadGenerationPage() {
  return (
    <ServicePageLayout
      title="AI Lead Generation"
      tagline="Automated Prospecting System"
      description="Replace manual outreach with an intelligent, multi-channel prospecting engine that finds, enriches, and engages your ideal clients around the clock — without lifting a finger."
      icon={<Zap className="w-9 h-9 text-primary" />}
      accentColor="primary"
      results={[
        { metric: "+247%", label: "Average lead increase in 60 days" },
        { metric: "10x", label: "Faster than manual prospecting" },
        { metric: "85%", label: "Open rate on AI-personalized outreach" },
      ]}
      sections={[
        {
          title: "How Our AI Prospecting Engine Works",
          body: "We build a fully automated scraping and enrichment pipeline that pulls your ideal client profiles from LinkedIn, Apollo, Crunchbase, and other data sources. Each lead is enriched with firmographic data, recent signals (job changes, funding rounds, hiring activity), and intent markers. Our AI then crafts hyper-personalized messages for each prospect — not templates, but genuinely unique outreach that references specific details about each company.",
        },
        {
          title: "Multi-Channel Outreach Sequences",
          body: "Our system deploys across Email and LinkedIn simultaneously. We build smart drip sequences with intelligent reply detection — when a prospect replies, the sequence pauses and notifies your team. We warm up email domains, rotate sending infrastructure, and maintain deliverability above 95%. The result: a steady, predictable stream of replies from decision-makers landing directly in your inbox.",
        },
        {
          title: "Real-Time Reporting & Continuous Optimization",
          body: "Every campaign is tracked in a live dashboard showing opens, clicks, replies, and booked calls. Our AI continuously A/B tests subject lines, call-to-action variations, and follow-up timing based on what's actually converting. Each week, we review performance and recalibrate the system — so results compound over time rather than plateau.",
        },
      ]}
      benefits={[
        "Custom-built lead scraping & enrichment pipeline tailored to your ICP",
        "AI-personalized email and LinkedIn messages at scale",
        "Domain warm-up and deliverability infrastructure included",
        "Smart reply detection — sequences pause automatically on response",
        "Dedicated Slack channel with live reply notifications",
        "Weekly performance reviews and copy optimisation",
        "CRM integration (HubSpot, Salesforce, Pipedrive, or Notion)",
        "Full onboarding, training, and documentation for your team",
      ]}
      faqs={[
        {
          q: "How many leads can the system contact per day?",
          a: "Typically 50–150 per day per sending domain, safely within platform limits. We scale this up over time as deliverability is established.",
        },
        {
          q: "Does this work for B2B only?",
          a: "Yes — our system is optimised for B2B businesses targeting companies with 10–5000 employees. We define your ICP together in the discovery call.",
        },
        {
          q: "How long before I see replies?",
          a: "Most clients receive their first replies within 5–10 business days of the campaign going live, once warm-up is complete.",
        },
        {
          q: "What platforms do you use for LinkedIn outreach?",
          a: "We use LinkedIn Sales Navigator combined with compliant automation tools. We never violate platform terms and always use safe sending volumes.",
        },
      ]}
    />
  );
}
