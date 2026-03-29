import { Megaphone } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";

export default function SmmaPage() {
  return (
    <ServicePageLayout
      title="Social Media Marketing (SMMA)"
      tagline="AI-Powered Brand Growth"
      description="Full-service social media management driven by AI tools — from content strategy and organic growth to paid campaigns that reliably generate leads from every major platform."
      icon={<Megaphone className="w-9 h-9 text-primary" />}
      accentColor="primary"
      results={[
        { metric: "+380%", label: "Average organic reach growth in 90 days" },
        { metric: "2.8x", label: "Return on ad spend (ROAS) for managed campaigns" },
        { metric: "50+", label: "Content pieces produced per month per client" },
      ]}
      sections={[
        {
          title: "Strategy First, Content Second",
          body: "We start by reverse-engineering what's already working in your market — studying competitor content, analysing top-performing formats, and identifying the content angles your audience responds to most. From that research, we build a 90-day content calendar with defined pillars, posting cadences, and campaign hooks. Every post has a purpose tied to a business objective.",
        },
        {
          title: "AI-Assisted Content Production at Scale",
          body: "Our team uses a suite of AI tools to accelerate content creation without sacrificing quality. Scripts are drafted with AI and refined by human editors. Visuals are generated and designed by our creative team. Carousels, reels scripts, LinkedIn posts, Twitter threads — all produced at a volume most agencies charge 3x for. You approve the calendar, we handle everything else.",
        },
        {
          title: "Paid Social That Scales Predictably",
          body: "Once organic content is warming up your audience, we layer in paid campaigns on Meta and LinkedIn designed to capture demand and generate measurable leads. We manage creative, targeting, budget allocation, and optimisation. Every campaign is connected back to your CRM so you can see exactly which social touchpoints are producing revenue — not just vanity metrics.",
        },
      ]}
      benefits={[
        "90-day content strategy and calendar across all key platforms",
        "Daily/weekly posting on Instagram, LinkedIn, TikTok, Twitter/X",
        "AI-assisted copywriting reviewed and approved by human editors",
        "Short-form video scripts and reels storyboards",
        "Paid Meta and LinkedIn campaign management",
        "Community management and engagement growth",
        "Monthly analytics report with reach, engagement, and lead attribution",
        "Competitor tracking and trend reporting every two weeks",
      ]}
      faqs={[
        {
          q: "Which platforms do you manage?",
          a: "We manage Instagram, LinkedIn, TikTok, Facebook, Twitter/X, and YouTube Shorts. We prioritise platforms based on where your ideal clients spend time.",
        },
        {
          q: "Do I need to create any content myself?",
          a: "No. We handle everything from ideation to publishing. If you want to be the face of the brand, we coordinate a simple monthly recording session — otherwise we produce everything independently.",
        },
        {
          q: "How long before social media starts generating leads?",
          a: "Organic growth typically shows traction at 60–90 days. Paid campaigns can generate leads within the first week once creatives are live.",
        },
        {
          q: "Can you manage social for a personal brand as well as a company?",
          a: "Yes — we work with both B2B company accounts and personal brand accounts for founders, consultants, and executives.",
        },
      ]}
    />
  );
}
