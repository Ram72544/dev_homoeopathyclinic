"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Sparkles, X, Send, User, Calendar, MessageSquareText } from "lucide-react";
import { site } from "@/lib/site-config";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

const QUICK_QUESTIONS = [
  "What health conditions are treated?",
  "How does homeopathy treat skin & hair issues?",
  "Is homeopathy safe for children & infants?",
  "How to book a consultation?",
];

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messageCounter = useRef(0);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: `Hello! 👋 I'm **${site.shortName} AI Assistant**. How can I help you with your health concerns or appointment inquiries today?`,
      timestamp: "Just now",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || input.trim();
    if (!textToSend || loading) return;

    messageCounter.current += 1;
    const userMsgId = `msg-user-${messageCounter.current}`;
    const userMessage: Message = {
      id: userMsgId,
      sender: "user",
      text: textToSend,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!customPrompt) setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: textToSend }),
      });

      const data = await res.json();
      const aiText = data.text || "Sorry, I couldn't process your request right now. Please try again.";

      messageCounter.current += 1;
      const aiMsgId = `msg-ai-${messageCounter.current}`;
      const aiMessage: Message = {
        id: aiMsgId,
        sender: "ai",
        text: aiText,
        timestamp: "Just now",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch {
      messageCounter.current += 1;
      const errorMsgId = `msg-err-${messageCounter.current}`;
      const errorMessage: Message = {
        id: errorMsgId,
        sender: "ai",
        text: "Apologies, there was a connection error. Please try again or reach us directly via WhatsApp/Phone.",
        timestamp: "Just now",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.4, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Open AI Health Assistant"
        className="fixed bottom-5 sm:bottom-6 right-20 sm:right-24 z-40 flex items-center gap-2 rounded-full bg-[#14221B] px-4 py-3 sm:py-3.5 text-white shadow-xl hover:bg-[#0E7C7B] transition-all duration-300 [transform:translate3d(0,0,0)]"
        style={{
          bottom: "calc(env(safe-area-inset-bottom, 0px) + 1.25rem)",
        }}
      >
        <div className="relative">
          <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-[#E5C583]" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34D399] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#34D399]"></span>
          </span>
        </div>
        <span className="hidden font-medium text-xs sm:text-sm tracking-wide sm:inline">Ask AI</span>
      </motion.button>

      {/* Chat Modal / Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-end p-3 sm:p-5 md:p-6 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex h-[85vh] max-h-[640px] w-full max-w-[440px] flex-col overflow-hidden rounded-3xl bg-[#FAF8F5] shadow-2xl border border-white/90 [transform:translate3d(0,0,0)]"
            >
              {/* Header */}
              <div className="flex items-center justify-between bg-gradient-to-r from-[#14221B] to-[#0E7C7B] p-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                    <Sparkles className="h-5 w-5 text-[#E5C583]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base leading-tight">AI Health Assistant</h3>
                    <p className="text-[11px] text-[#A7F3D0] flex items-center gap-1.5 mt-0.5">
                      <span className="h-2 w-2 rounded-full bg-[#34D399] animate-pulse"></span>
                      Powered by Gemini AI
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-2 text-white/80 hover:bg-white/15 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close Assistant"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F4EFE6]/40">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${
                      msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                        msg.sender === "user"
                          ? "bg-[#14221B] text-white"
                          : "bg-[#0E7C7B]/15 text-[#0E7C7B] border border-[#0E7C7B]/30"
                      }`}
                    >
                      {msg.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>
                    <div className={`max-w-[82%] space-y-1`}>
                      <div
                        className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                          msg.sender === "user"
                            ? "bg-[#14221B] text-[#FAF8F5] rounded-br-none"
                            : "bg-white text-[#14221B] border border-[#E8E1D5] shadow-xs rounded-bl-none font-light"
                        }`}
                      >
                        {msg.text.split("\n").map((paragraph, idx) => (
                          <p key={idx} className={idx > 0 ? "mt-2" : ""}>
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      <span
                        className={`block text-[10px] text-[#7A8A80] ${
                          msg.sender === "user" ? "text-right" : "text-left"
                        }`}
                      >
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex items-start gap-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0E7C7B]/15 text-[#0E7C7B] border border-[#0E7C7B]/30">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="rounded-2xl rounded-bl-none bg-white border border-[#E8E1D5] px-4 py-3 shadow-xs">
                      <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-[#0E7C7B] animate-bounce"></div>
                        <div className="h-2 w-2 rounded-full bg-[#0E7C7B] animate-bounce [animation-delay:0.2s]"></div>
                        <div className="h-2 w-2 rounded-full bg-[#0E7C7B] animate-bounce [animation-delay:0.4s]"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions Chips */}
              <div className="px-4 py-2.5 bg-white border-t border-[#EAE3DA] overflow-x-auto whitespace-nowrap scrollbar-none flex gap-2">
                {QUICK_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(q)}
                    disabled={loading}
                    className="inline-flex items-center gap-1.5 text-xs bg-[#FAF8F5] text-[#14221B] border border-[#E8E1D5] rounded-full px-3 py-1.5 hover:bg-[#0E7C7B]/10 hover:border-[#0E7C7B]/40 transition-all font-medium disabled:opacity-50 cursor-pointer"
                  >
                    <MessageSquareText className="h-3 w-3 text-[#0E7C7B]" />
                    {q}
                  </button>
                ))}
              </div>

              {/* Footer Input Form */}
              <div className="p-3 bg-white border-t border-[#EAE3DA] space-y-2">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about symptoms, remedies, timings..."
                    disabled={loading}
                    className="flex-1 rounded-full border border-[#E8E1D5] bg-[#FAF8F5] px-4 py-2.5 text-sm focus:border-[#0E7C7B] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0E7C7B]"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || loading}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#14221B] text-white hover:bg-[#0E7C7B] disabled:opacity-40 transition-all shadow-xs cursor-pointer"
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>

                {/* Appointment CTA link inside chat */}
                <div className="flex items-center justify-between text-[11px] text-[#7A8A80] pt-1 border-t border-[#F4EFE6] px-1">
                  <span>Educational AI guidance</span>
                  <a
                    href="#contact-form"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-1 font-medium text-[#0E7C7B] hover:text-[#14221B] hover:underline"
                  >
                    <Calendar className="h-3 w-3" />
                    Book Doctor Visit
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
