import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How long does it take to set up?",
    answer: "2-3 weeks for full implementation. We handle everything from strategy and copywriting to technical deployment and CRM integration."
  },
  {
    question: "How much does it cost?",
    answer: "Investment varies based on the scope of the automation required. We build bespoke systems tailored to your specific bottlenecks. Book a call to get a custom quote for your business."
  },
  {
    question: "Do I need technical knowledge?",
    answer: "None at all. We handle 100% of the technical setup. Once deployed, we provide a clean dashboard and train your team on how to manage the incoming flow of leads."
  },
  {
    question: "What results can I expect?",
    answer: "Most clients see significant improvements in lead volume and booked calls within 30-60 days of launch. The systems work 24/7, effectively multiplying your outreach volume while increasing quality."
  },
  {
    question: "Which industries do you work with?",
    answer: "We work primarily with B2B service businesses, SaaS companies, specialized agencies, high-ticket consultants, and premium e-commerce brands."
  },
  {
    question: "What if it doesn't work for my business?",
    answer: "We offer a strict performance guarantee. If we don't hit the mutually agreed-upon targets within the specified timeframe, we work for free until we do."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {faqs.map((faq, index) => (
        <div 
          key={index}
          className="glass-panel border border-white/5 rounded-2xl overflow-hidden transition-colors hover:border-white/10"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
          >
            <span className="font-display font-semibold text-lg text-foreground pr-8">
              {faq.question}
            </span>
            <ChevronDown 
              className={cn(
                "w-5 h-5 text-primary shrink-0 transition-transform duration-300",
                openIndex === index ? "rotate-180" : ""
              )} 
            />
          </button>
          
          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="px-6 pb-5 pt-0 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
