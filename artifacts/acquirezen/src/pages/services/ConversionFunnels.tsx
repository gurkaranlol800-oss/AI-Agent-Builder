import { LayoutTemplate } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";

export default function ConversionFunnelsPage() {
  return (
    <ServicePageLayout
      title="Conversion Funnels"
      tagline="High-Converting Acquisition Systems"
      description="We design and build sales funnels that turn cold traffic into booked calls and paying clients — with every element optimised for conversion, not just looks."
      icon={<LayoutTemplate className="w-9 h-9 text-secondary" />}
      accentColor="secondary"
      results={[
        { metric: "4.2x", label: "Average conversion rate improvement" },
        { metric: "$180k", label: "Revenue recovered via retargeting funnels" },
        { metric: "72h", label: "Average funnel build time" },
      ]}
      sections={[
        {
          title: "Funnel Strategy That Matches Your Traffic",
          body: "Not all funnels are built the same way. Cold paid traffic requires a different funnel structure than warm organic traffic from content. We start by mapping your traffic sources and customer awareness levels, then engineer the funnel architecture accordingly — whether that's a VSL funnel, a webinar funnel, a lead magnet sequence, or a direct application funnel. No guesswork, just conversion engineering.",
        },
        {
          title: "Landing Pages Built to Convert, Not to Impress",
          body: "Every element of our landing pages is built around conversion psychology: headlines that speak to the exact pain your prospect is experiencing, social proof positioned at the moments of highest doubt, CTAs designed to reduce friction and create urgency without feeling pushy. We use proven frameworks (AIDA, PAS, Before/After/Bridge) and adapt them to your specific market.",
        },
        {
          title: "Post-Click Automation & Retargeting",
          body: "Getting a click is only step one. We build the full journey: confirmation pages, email nurture sequences, SMS reminders, and retargeting pixel setup so that leads who don't convert immediately are re-engaged across Facebook, Instagram, and Google. We track every step in a unified analytics dashboard so you know exactly where your funnel is leaking and what to fix.",
        },
      ]}
      benefits={[
        "Funnel strategy session and architecture planning",
        "High-converting landing page design and development",
        "VSL scripting and storyboard support",
        "Lead magnet creation (PDF, mini-course, checklist)",
        "Post-click email and SMS nurture sequence",
        "Facebook Pixel and Google Tag Manager setup",
        "Retargeting audience setup across Meta and Google",
        "A/B testing framework with monthly optimisation reports",
      ]}
      faqs={[
        {
          q: "Do you run the ads as well or just build the funnel?",
          a: "We build and optimise the funnel. For paid media management, we partner with vetted media buyers we can recommend — or work alongside your existing agency.",
        },
        {
          q: "What platform do you build funnels on?",
          a: "We work with ClickFunnels, GoHighLevel, Webflow, Framer, and custom-coded solutions depending on your needs and existing stack.",
        },
        {
          q: "How do you measure funnel success?",
          a: "We track cost per lead, cost per booked call, show rate, and close rate. Your dashboard updates in real time and we review KPIs together every two weeks.",
        },
        {
          q: "Can you rebuild an existing funnel that isn't converting?",
          a: "Yes. Funnel audits and rebuilds are a core service. We review your current assets, identify the conversion bottlenecks, and rebuild what's needed.",
        },
      ]}
    />
  );
}
