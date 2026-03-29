import { PenLine } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";

export default function ContentCreationPage() {
  return (
    <ServicePageLayout
      title="Content Creation"
      tagline="AI-Powered Content Pipelines"
      description="We build fully automated content systems that produce SEO blogs, video scripts, email sequences, and ad copy — published on autopilot to keep your brand visible every single day."
      icon={<PenLine className="w-9 h-9 text-secondary" />}
      accentColor="secondary"
      results={[
        { metric: "10x", label: "Content output vs. in-house teams" },
        { metric: "+190%", label: "Organic search traffic in 6 months" },
        { metric: "Daily", label: "Consistent publishing cadence maintained" },
      ]}
      sections={[
        {
          title: "Content That Attracts and Converts",
          body: "Most content is created without a strategy — posts go out inconsistently, blogs target the wrong keywords, emails lack clear calls to action. We fix all of this. We begin with a full content audit and SEO keyword research to identify what your audience is searching for and what gaps your competitors haven't filled. Every content piece is mapped to a stage in the buyer journey.",
        },
        {
          title: "The Automated Production Pipeline",
          body: "We build a semi-automated content production pipeline using AI tools combined with expert human review. Our system produces first drafts at scale, which are then refined by our editors for accuracy, brand voice, and persuasion. SEO blog posts, LinkedIn articles, email newsletters, YouTube scripts, and short-form social copy — all produced, edited, and scheduled without you managing a team of freelancers.",
        },
        {
          title: "Distribution and Repurposing at Scale",
          body: "A single piece of long-form content becomes ten short-form pieces. A podcast episode becomes a blog, three LinkedIn posts, five Twitter threads, and an email. We build repurposing workflows that maximise the value of every piece of content you produce. Combined with automated scheduling and distribution, your brand stays top-of-mind across every channel simultaneously.",
        },
      ]}
      benefits={[
        "Full content strategy and SEO keyword mapping",
        "4–8 long-form SEO blog posts per month (1500–3000 words)",
        "Email newsletter written and sent weekly or bi-weekly",
        "Short-form social content (captions, threads, carousels) daily",
        "YouTube script writing and video description SEO",
        "Ad copy for Meta, Google, and LinkedIn campaigns",
        "Content repurposing workflows across all formats",
        "Monthly content performance report with traffic and engagement data",
      ]}
      faqs={[
        {
          q: "How do you ensure the content sounds like us?",
          a: "We conduct a brand voice interview and analyse your existing content before writing a word. We also produce a 'voice guide' that the AI and editors follow for every piece.",
        },
        {
          q: "Do you handle publishing or just hand us drafts?",
          a: "We handle end-to-end — writing, editing, formatting, and publishing directly to your CMS (WordPress, Webflow, HubSpot, etc.) and scheduling social posts via Buffer or Later.",
        },
        {
          q: "Is the content AI-generated?",
          a: "AI is used to accelerate production, but every piece goes through human editorial review before publishing. You get AI speed with human quality.",
        },
        {
          q: "How long until we see SEO results?",
          a: "SEO is a long-term play — most clients see measurable traffic growth at 3–6 months. Social content and email typically drive engagement and leads much sooner.",
        },
      ]}
    />
  );
}
