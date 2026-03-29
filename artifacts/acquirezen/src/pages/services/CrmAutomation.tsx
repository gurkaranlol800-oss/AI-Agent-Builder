import { Workflow } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";

export default function CrmAutomationPage() {
  return (
    <ServicePageLayout
      title="CRM & Pipeline Automation"
      tagline="Intelligent Workflow Infrastructure"
      description="Stop updating spreadsheets and chasing tasks manually. We connect your entire toolstack and build intelligent workflows that move leads through your pipeline automatically."
      icon={<Workflow className="w-9 h-9 text-primary" />}
      accentColor="primary"
      results={[
        { metric: "90%", label: "Reduction in manual data entry" },
        { metric: "3x", label: "Faster lead response time" },
        { metric: "Zero", label: "Leads lost to follow-up gaps" },
      ]}
      sections={[
        {
          title: "A Single Source of Truth for Your Pipeline",
          body: "We audit your current tools and build an integrated system where every lead touchpoint — from first contact to closed deal — is tracked automatically. Whether you use HubSpot, Salesforce, Pipedrive, or Notion, we connect everything via Zapier, Make (Integromat), or custom API integrations. You get a live view of your entire pipeline without touching it manually.",
        },
        {
          title: "Smart Triggers & Automated Follow-Up",
          body: "We build event-driven workflows triggered by real actions: a lead opens your email → CRM stage updates and a follow-up task is created. A prospect books a call → Slack notification fires, confirmation email goes out, and a pre-call questionnaire is sent. A deal goes cold for 7 days → re-engagement sequence activates automatically. Every scenario your team currently handles manually becomes a rule the system runs on its own.",
        },
        {
          title: "Reporting That Actually Means Something",
          body: "We build a real-time reporting dashboard that shows your most important metrics: pipeline value by stage, conversion rates at each step, average deal cycle, and revenue forecast. Instead of pulling reports manually each week, you wake up to a Slack summary with everything you need to make decisions. No more end-of-month surprises.",
        },
      ]}
      benefits={[
        "Full audit of existing tools and workflow gaps",
        "CRM setup or optimisation (HubSpot, Salesforce, Pipedrive, Notion)",
        "Custom Zapier / Make automation workflows built for your process",
        "Automated lead scoring based on engagement signals",
        "Slack and email notification system for key pipeline events",
        "Drip follow-up sequences triggered by lead behaviour",
        "Live reporting dashboard with revenue forecasting",
        "Team training and full documentation on every workflow",
      ]}
      faqs={[
        {
          q: "What CRMs do you work with?",
          a: "We work with HubSpot, Salesforce, Pipedrive, GoHighLevel, Notion, and Airtable. We can also build custom solutions using Make or Zapier as the backbone.",
        },
        {
          q: "Do I need to switch my existing CRM?",
          a: "No. We optimise and automate within your existing stack wherever possible. We only recommend changes if your current tool is fundamentally limiting.",
        },
        {
          q: "How long does it take to set up?",
          a: "Core workflows are live within 2 weeks. Complex multi-tool integrations may take 3–4 weeks depending on the number of systems involved.",
        },
        {
          q: "Can this work if my team is not technical?",
          a: "Absolutely. We design workflows that require zero technical knowledge to operate. Your team just does their job and the system handles everything else.",
        },
      ]}
    />
  );
}
