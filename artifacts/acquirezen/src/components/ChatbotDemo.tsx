import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  role: "bot" | "user";
  content: string;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    role: "bot",
    content: "Hi! I'm the AcquireZen AI assistant. I can help qualify leads, answer FAQs, and book calls automatically 24/7. What would you like to know?"
  }
];

const SUGGESTED_PROMPTS = [
  "How does it work?",
  "What's the pricing?",
  "How fast can I get results?"
];

const PRE_PROGRAMMED_RESPONSES: Record<string, string> = {
  "How does it work?": "We build a custom AI infrastructure tailored to your business. It connects to your CRM, outreach channels, and calendar. The AI acts like a 24/7 SDR—finding leads, nurturing them with natural conversation, and booking them directly onto your calendar.",
  "What's the pricing?": "Our systems are custom-built, so pricing depends on your specific needs and current bottlenecks. However, most of our clients see a positive ROI within the first 45 days. Want to book a strategy call to get a precise quote?",
  "How fast can I get results?": "Implementation takes 2-3 weeks. Once live, the AI immediately begins processing your pipeline. Most clients see a 2x-3x increase in qualified booked calls within the first 30 days of deployment.",
  "default": "That's a great question. In a real deployment, I'd access your custom knowledge base to provide a specific answer. To see a full demonstration of my capabilities, I recommend booking a strategy call with our human team!"
};

export default function ChatbotDemo() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Get response
    const responseText = PRE_PROGRAMMED_RESPONSES[text] || PRE_PROGRAMMED_RESPONSES["default"];
    const botMsg: Message = { id: (Date.now() + 1).toString(), role: "bot", content: responseText };
    
    setIsTyping(false);
    setMessages(prev => [...prev, botMsg]);
  };

  return (
    <div className="w-full max-w-2xl mx-auto glass-panel rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 flex flex-col h-[600px] border border-white/10 relative">
      {/* Decorative gradients */}
      <div className="absolute top-0 -left-1/4 w-1/2 h-32 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 -right-1/4 w-1/2 h-32 bg-secondary/20 blur-[100px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-white/5 z-10">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 relative">
          <Bot className="w-5 h-5 text-primary" />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background" />
        </div>
        <div>
          <h3 className="font-display font-bold text-foreground flex items-center gap-2">
            AcquireZen AI <Sparkles className="w-3 h-3 text-primary" />
          </h3>
          <p className="text-xs text-muted-foreground">Always Online • Replies instantly</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 z-10 custom-scrollbar">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "flex max-w-[80%]",
                msg.role === "user" ? "ml-auto justify-end" : "mr-auto justify-start"
              )}
            >
              <div className={cn(
                "p-3 rounded-2xl text-sm leading-relaxed shadow-lg",
                msg.role === "user" 
                  ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-tr-sm"
                  : "bg-white/10 text-foreground border border-white/5 rounded-tl-sm"
              )}>
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex max-w-[80%] mr-auto justify-start"
          >
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 rounded-tl-sm flex items-center gap-1.5">
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      <div className="px-4 pb-2 flex flex-wrap gap-2 z-10">
        {SUGGESTED_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            onClick={() => handleSend(prompt)}
            disabled={isTyping}
            className="text-xs px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary hover:bg-primary/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/10 bg-black/20 z-10">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            disabled={isTyping}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="absolute right-2 p-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
