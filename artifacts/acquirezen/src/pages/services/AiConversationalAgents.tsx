import { MessageSquare } from "lucide-react";
import ServicePageLayout from "@/components/ServicePageLayout";

export default function AiConversationalAgentsPage() {
  return (
    <ServicePageLayout
      title="AI Conversational Agents"
      tagline="24/7 Intelligent Sales Assistant"
      description="Deploy a custom-trained AI agent that qualifies inbound traffic, handles objections, answers questions, and books meetings directly into your calendar — while you sleep."
      icon={<MessageSquare className="w-9 h-9 text-secondary" />}
      accentColor="secondary"
      results={[
        { metric: "15–20", label: "Calls booked per week on autopilot" },
        { metric: "3 min", label: "Average response time, 24/7" },
        { metric: "68%", label: "Qualification rate from site visitors" },
      ]}
      sections={[
        {
          title: "Custom-Trained on Your Business",
          body: "Unlike generic chatbots, our AI agents are trained specifically on your offer, your objections, your pricing structure, and your ideal client profile. We feed in your sales call recordings, your FAQ documents, and your case studies — so the agent responds exactly the way your best salesperson would, every single time.",
        },
        {
          title: "Embedded Wherever Your Leads Are",
          body: "We deploy your agent across your website, landing pages, and even as an SMS-based follow-up system for inbound leads. The agent engages visitors proactively, qualifies them through a natural conversational flow, and pushes qualified leads straight into a Calendly booking — without any human involvement.",
        },
        {
          title: "Seamless Handoff to Your Team",
          body: "When a lead books, your team receives a full summary: the lead's name, company, pain points surfaced in the conversation, budget signals, and the AI's qualification score. You walk into every call already knowing the context. Unqualified leads are filtered out automatically, so your team only speaks to people worth their time.",
        },
      ]}
      benefits={[
        "Custom LLM agent trained on your brand voice, offer, and objections",
        "Website chatbot widget + SMS follow-up integration",
        "Direct calendar booking via Calendly, Cal.com, or Google Calendar",
        "Lead qualification scoring sent to your CRM on every conversation",
        "Full conversation transcripts logged for review and improvement",
        "Multi-language support available on request",
        "Handoff escalation — agent transfers to a human when needed",
        "Continuous fine-tuning based on real conversation data",
      ]}
      faqs={[
        {
          q: "How is this different from a regular chatbot?",
          a: "Traditional chatbots follow rigid scripts. Our agents use large language models fine-tuned on your business, allowing fluid, context-aware conversation that adapts to what the prospect says.",
        },
        {
          q: "What if the AI says something wrong?",
          a: "We build in guardrails and review every conversation during the first two weeks. The agent is designed to acknowledge uncertainty and escalate rather than fabricate answers.",
        },
        {
          q: "Can it handle objections like price or competitors?",
          a: "Yes — objection handling is a core part of training. We map out your top 10 objections and train the agent with responses that mirror what your best salespeople say.",
        },
        {
          q: "How long does setup take?",
          a: "Full deployment takes 1–2 weeks including training, testing, and integration. You'll be live and booking calls in under 14 days.",
        },
      ]}
    />
  );
}
